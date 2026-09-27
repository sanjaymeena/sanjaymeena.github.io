#!/usr/bin/env node
/**
 * Verifies the Astro build in dist/ against the Jekyll build in _site/.
 *
 * For every non-draft post in src/content/blog/ it checks:
 *   1. the page was emitted at its original URL
 *   2. display vs inline math counts match the kramdown/MathJax original
 *   3. every heading anchor id from the original still exists (deep links)
 *   4. no leftover Liquid, no cdn.mathjax.org, no MathJax in Markdown posts
 *   5. every root-relative link/asset the page references resolves on disk
 *
 * Usage:
 *   node scripts/verify-parity.mjs            check all migrated posts
 *   node scripts/verify-parity.mjs --quiet    only print failures
 */

import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import { load as yamlLoad } from 'js-yaml';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const BLOG = path.join(ROOT, 'src', 'content', 'blog');
const DIST = path.join(ROOT, 'dist');
const SITE = path.join(ROOT, '_site');
const PUBLIC = path.join(ROOT, 'public');
const quiet = process.argv.includes('--quiet');

// Heading anchors expected to be absent from the new build: kramdown's
// `{#HEADING}` heading-id syntax set the same id on nine headings of one post
// (invalid duplicate ids). The markers are stripped and Astro generates unique
// slugs; the anchors readers actually use are explicit <span id="..."> elements
// inside those headings, which are preserved.
const EXPECTED_MISSING_IDS = new Set(['HEADING']);

const read = (p) => (fs.existsSync(p) ? fs.readFileSync(p, 'utf8') : null);
const count = (s, re) => (s ? (s.match(re) || []).length : 0);

function splitFrontmatter(raw) {
  const end = raw.indexOf('\n---', 3);
  if (!raw.startsWith('---') || end === -1) return { data: {}, body: raw };
  return { data: yamlLoad(raw.slice(3, end)) ?? {}, body: raw.slice(end + 4) };
}

function headingIds(html) {
  return new Set([...html.matchAll(/<h[1-6][^>]*\bid="([^"]+)"/g)].map((m) => m[1]));
}

function mathModes(html) {
  // Old build: kramdown emitted \[...\] for display and \(...\) for inline.
  // The lookbehind skips `\\[` / `\\(` — an escaped bracket inside embedded
  // JavaScript (the legacy demo partials contain regex character classes) is
  // not a LaTeX delimiter.
  const oldDisplay = count(html, /(?<!\\)\\\[/g);
  const oldInline = count(html, /(?<!\\)\\\(/g);
  // New build: rehype-katex wraps display math in <span class="katex-display">.
  const newDisplay = count(html, /<span class="katex-display">/g);
  const newTotal = count(html, /<annotation encoding="application\/x-tex">/g);
  return {
    oldDisplay,
    oldInline,
    oldTotal: oldDisplay + oldInline,
    newDisplay,
    newInline: newTotal - newDisplay,
    newTotal,
  };
}

/**
 * Inner HTML of the first `<tag class="... cls ...">` element, tracking nesting
 * so inner tags of the same name do not truncate it.
 */
function extractByClass(html, tag, cls) {
  const open = new RegExp(`<${tag}\\b[^>]*\\bclass="[^"]*\\b${cls}\\b[^"]*"[^>]*>`, 'i');
  const m = open.exec(html);
  if (!m) return null;
  const start = m.index + m[0].length;
  const re = new RegExp(`<${tag}\\b|</${tag}>`, 'gi');
  re.lastIndex = start;
  let depth = 1;
  let match;
  while ((match = re.exec(html)) !== null) {
    depth += match[0].startsWith('</') ? -1 : 1;
    if (depth === 0) return html.slice(start, match.index);
  }
  return null;
}

/**
 * Word count of rendered HTML.
 *
 * Block-level element boundaries become whitespace, but inline tags are removed
 * outright. rouge and Shiki wrap syntax tokens in spans differently, so treating
 * every tag as a word boundary inflates the count for code-heavy posts
 * (100-Numpy-Exercises measured 75% instead of ~100%); concatenating everything
 * instead merges table cells into one word (all-developer-tools measured 86%).
 */
function countWords(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, '\n')
    .replace(/<style[\s\S]*?<\/style>/gi, '\n')
    .replace(
      /<\/?(?:p|div|li|ul|ol|dl|dt|dd|td|th|tr|table|thead|tbody|h[1-6]|section|article|aside|header|footer|pre|blockquote|figure|figcaption|hr|br)\b[^>]*>/gi,
      ' ',
    )
    .replace(/<[^>]+>/g, '')
    .replace(/&[a-zA-Z#0-9]+;/g, ' ')
    .replace(/[ \t]+/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

/**
 * Prose word count of the post body only.
 *
 * The Jekyll body (`<section class="page__content">`) also contained the Liquid
 * series panel, the kramdown table of contents and any demo include. The Astro
 * layout renders all three outside the prose container, so the panel is dropped
 * from the old side and the TOC plus demo are added to the new side. This is the
 * check that catches Markdown silently swallowing content — it is what surfaced
 * the truncated table of contents on 100-Numpy-Exercises.
 */
function bodyWordCount(html, kind) {
  if (kind === 'old') {
    const body = extractByClass(html, 'section', 'page__content');
    if (body === null) return null;
    return countWords(body.replace(/<div class="panel seriesNote">[\s\S]*?<\/div>/g, '\n'));
  }
  const prose = extractByClass(html, 'div', 'prose');
  if (prose === null) return null;
  const toc = extractByClass(html, 'nav', 'toc') ?? '';
  const demo = extractByClass(html, 'div', 'legacy-demo') ?? '';
  return countWords(`${toc}\n${prose}\n${demo}`);
}

function decodeEntities(value) {
  return value
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(Number(dec)))
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'");
}

/**
 * Ordered table-of-contents entry texts.
 *
 * The Jekyll build emitted `<ul id="markdown-toc">`, the Astro build emits
 * `<nav class="toc">`. The two serializers also encode entities differently
 * (`&amp;` vs `&#x26;`), so both sides are decoded before comparing. Returns
 * null when the page has no TOC at all.
 */
function tocEntries(html, kind) {
  const marker = kind === 'old' ? '<ul id="markdown-toc">' : '<nav class="toc"';
  const start = html.indexOf(marker);
  if (start === -1) return null;
  const listStart = html.indexOf('<ul', start);
  if (listStart === -1) return [];

  const re = /<ul\b|<\/ul>/g;
  re.lastIndex = listStart;
  let depth = 0;
  let match;
  while ((match = re.exec(html)) !== null) {
    depth += match[0] === '</ul>' ? -1 : 1;
    if (depth === 0) {
      const segment = html.slice(listStart, match.index);
      return [...segment.matchAll(/<a href="#[^"]*"[^>]*>([\s\S]*?)<\/a>/g)]
        .map((m) => decodeEntities(m[1].replace(/<[^>]+>/g, '')).trim())
        .filter(Boolean);
    }
  }
  return [];
}

/** Root-relative references made by a page, excluding fragments-only links. */
function localRefs(html) {
  const refs = new Set();
  for (const m of html.matchAll(/(?:href|src)="(\/[^"#?]*)/g)) {
    if (m[1] === '/') continue;
    refs.add(m[1]);
  }
  return [...refs];
}

function resolvesOnDisk(ref) {
  const rel = ref.replace(/^\//, '');
  const candidates = [
    path.join(DIST, rel),
    path.join(DIST, rel, 'index.html'),
    path.join(PUBLIC, rel),
    path.join(PUBLIC, rel, 'index.html'),
  ];
  // A bare directory is not a resolvable URL — dist/tech/ existing because a
  // post lives at dist/tech/nlp/foo/ does not mean /tech/ is a page.
  return candidates.some((c) => fs.existsSync(c) && fs.statSync(c).isFile());
}

/**
 * Routes that later phases of the migration will build. Reported separately so
 * they do not mask a genuinely broken reference. Empty as of Phase 3: every page
 * the Jekyll site published now has an Astro route.
 */
const PENDING_ROUTE_PREFIXES = [];

const isPending = (ref) => PENDING_ROUTE_PREFIXES.some((p) => ref.startsWith(p));

/**
 * True when the Jekyll build served this file. A reference that is missing here
 * but present in _site/ is a genuine migration regression; one that is missing
 * from both was already broken on the live site. Four WordPress `srcset` entries
 * in create-gate-plugins point at full-size originals that were never uploaded.
 */
function resolvesInOldSite(ref) {
  if (!fs.existsSync(SITE)) return true; // no baseline to compare against
  const rel = ref.replace(/^\//, '');
  return [path.join(SITE, rel), path.join(SITE, rel, 'index.html')].some(
    (c) => fs.existsSync(c) && fs.statSync(c).isFile(),
  );
}

/**
 * URLs deliberately not carried over from the Jekyll sitemap.
 *
 * /page8/ … /page13/ were jekyll-paginate artifacts: `index.html` never used
 * `paginator`, so all twelve /pageN/ pages were byte-identical copies of the
 * homepage. With `paginate: 10` over 65 posts there are only 7 pages of real
 * content, so the paginated archive now stops at /page7/.
 */
const INTENTIONALLY_DROPPED = [/^\/page(?:[89]|1[0-3])\/?$/];

const normalizePath = (href) => href.replace(/^https?:\/\/[^/]+/, '').replace(/\/+$/, '') || '/';

function sitemapPaths(file) {
  const xml = read(file);
  if (xml === null) return null;
  return new Set(
    [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)]
      .map((m) => normalizePath(m[1].trim()))
      .filter((p) => p.startsWith('/')),
  );
}

/**
 * Compares the whole published URL set, not just posts.
 *
 * The invariant that matters is "does the URL still resolve", tested against
 * dist/ on disk — not sitemap membership. The paginated archive is served but
 * deliberately kept out of the sitemap (it is noindex: every post on it also
 * appears in the homepage's full year-grouped listing), so membership alone
 * would report those six as broken.
 */
function checkSitemap() {
  const oldPaths = sitemapPaths(path.join(SITE, 'sitemap.xml'));
  const newPaths = sitemapPaths(path.join(DIST, 'sitemap-0.xml'));
  if (!oldPaths || !newPaths) {
    console.log('\nsitemap: skipped (_site/sitemap.xml or dist/sitemap-0.xml not found)');
    return;
  }

  const isDropped = (p) => INTENTIONALLY_DROPPED.some((re) => re.test(p));
  const candidates = [...oldPaths].filter((p) => !isDropped(p));
  const unserved = candidates.filter((p) => !resolvesOnDisk(p)).sort();
  const unsitemapped = candidates.filter((p) => resolvesOnDisk(p) && !newPaths.has(p)).sort();
  const added = [...newPaths].filter((p) => !oldPaths.has(p)).sort();

  console.log(
    `\nsitemap: ${newPaths.size} URLs listed (Jekyll listed ${oldPaths.size}); ` +
      `${candidates.length - unserved.length}/${candidates.length} Jekyll URLs still resolve`,
  );
  if (unserved.length) {
    console.log(`  BROKEN — ${unserved.length} published URL(s) with no route:`);
    for (const p of unserved) console.log(`    ${p}`);
    sitemapFailed++;
  }
  if (unsitemapped.length) {
    console.log(`  served but excluded from the sitemap by design: ${unsitemapped.join(', ')}`);
  }
  if (added.length) {
    console.log(`  new URLs (${added.length}): ${added.join(', ')}`);
  }
}

// --------------------------------------------------------------------- run --

if (!fs.existsSync(DIST)) {
  console.error('dist/ not found — run `npm run build` first.');
  process.exit(1);
}

const files = fs.existsSync(BLOG) ? fs.readdirSync(BLOG).filter((f) => f.endsWith('.md')) : [];
let checked = 0;
let failed = 0;
let sitemapFailed = 0;
let linkFailed = 0;
const brokenRefs = new Map();
const pendingRefs = new Map();
const preExistingRefs = new Map();

for (const file of files.sort()) {
  const { data } = splitFrontmatter(read(path.join(BLOG, file)));
  if (data.draft) continue;

  const slug = data.slug;
  const problems = [];
  const distPage = path.join(DIST, slug, 'index.html');
  const newHtml = read(distPage);

  if (!newHtml) {
    problems.push(`not built: expected dist/${slug}/index.html`);
    report(file, slug, problems);
    failed++;
    continue;
  }
  checked++;

  // 4. leftovers
  if (/\{%|{{\s*site\./.test(newHtml)) problems.push('leftover Liquid in output');
  if (/cdn\.mathjax\.org/.test(newHtml)) problems.push('still references cdn.mathjax.org');

  // 5. local refs
  for (const ref of localRefs(newHtml)) {
    if (resolvesOnDisk(ref)) continue;
    const bucket = isPending(ref)
      ? pendingRefs
      : resolvesInOldSite(ref)
        ? brokenRefs
        : preExistingRefs;
    if (!bucket.has(ref)) bucket.set(ref, []);
    bucket.get(ref).push(slug);
    if (bucket === brokenRefs) problems.push(`broken ref ${ref}`);
  }

  // Compare against the Jekyll build when we have it.
  const oldHtml = read(path.join(SITE, slug, 'index.html'));
  if (!oldHtml) {
    if (!quiet) console.log(`~  /${slug}/  built (no _site original to compare)`);
    continue;
  }

  // 2. math parity
  const m = mathModes(newHtml);
  const o = mathModes(oldHtml);
  if (o.oldTotal > 0 && (o.oldTotal !== m.newTotal || o.oldDisplay !== m.newDisplay)) {
    problems.push(
      `math mismatch: original ${o.oldDisplay} display / ${o.oldInline} inline, now ${m.newDisplay} display / ${m.newInline} inline`,
    );
  }

  // 2b. prose fidelity
  const oldWords = bodyWordCount(oldHtml, 'old');
  const newWords = bodyWordCount(newHtml, 'new');
  let words = null;
  if (oldWords !== null && newWords !== null && oldWords > 0) {
    words = { was: oldWords, now: newWords, ratio: newWords / oldWords };
    if (words.ratio < 0.9) {
      problems.push(
        `body text shrank to ${(words.ratio * 100).toFixed(0)}% of the original (${oldWords} -> ${newWords} words) — Markdown may have swallowed content`,
      );
    }
  }

  // 2c. table of contents
  const oldToc = tocEntries(oldHtml, 'old');
  const newToc = tocEntries(newHtml, 'new');
  if (oldToc !== null && newToc === null) {
    problems.push(`original had a ${oldToc.length}-entry table of contents; the new page has none`);
  } else if (oldToc === null && newToc !== null) {
    problems.push(`new page has a ${newToc.length}-entry table of contents the original did not render`);
  } else if (oldToc !== null && newToc !== null && oldToc.join('\u0000') !== newToc.join('\u0000')) {
    const at = oldToc.findIndex((entry, i) => entry !== newToc[i]);
    problems.push(
      `table of contents differs (${oldToc.length} -> ${newToc.length} entries)` +
        (at >= 0
          ? `; first difference at #${at + 1}: ${JSON.stringify(oldToc[at])} vs ${JSON.stringify(newToc[at])}`
          : ''),
    );
  }

  // 3. anchors preserved
  const oldIds = headingIds(oldHtml);
  const newIds = headingIds(newHtml);
  const missingIds = [...oldIds].filter((id) => !newIds.has(id) && !EXPECTED_MISSING_IDS.has(id));
  if (missingIds.length) problems.push(`missing heading anchors: ${missingIds.join(', ')}`);

  report(file, slug, problems, m, o, words);
  if (problems.length) failed++;
}

// Standalone (non-Markdown) posts: Jupyter HTML exports routed verbatim. There
// is no server-rendered math or heading structure to diff — the original was
// wrapped in the Minimal Mistakes layout — so these are checked structurally.
const manifestPath = path.join(ROOT, 'src', 'standalone-posts', 'manifest.json');
const standalone = fs.existsSync(manifestPath) ? JSON.parse(read(manifestPath)) : [];
for (const entry of standalone) {
  if (entry.draft) continue;
  checked++;
  const problems = [];
  const html = read(path.join(DIST, entry.slug, 'index.html'));
  if (!html) {
    problems.push(`not built: expected dist/${entry.slug}/index.html`);
  } else {
    if (/cdn\.mathjax\.org/.test(html)) problems.push('still references cdn.mathjax.org');
    if (!html.trimStart().startsWith('<!DOCTYPE')) {
      problems.push('not emitted as a standalone document (was a layout wrapped around it?)');
    }
    if (!html.includes('</html>')) problems.push('document looks truncated (no closing </html>)');
  }
  report(entry.file, entry.slug, problems);
  if (problems.length) failed++;
}

function report(file, slug, problems, m, o, words) {
  if (problems.length) {
    console.log(`\nFAIL  /${slug}/   (${file})`);
    for (const p of problems) console.log(`        - ${p}`);
  } else if (!quiet) {
    const math = m && m.newTotal
      ? `  math ${m.newDisplay}d/${m.newInline}i==${o.oldDisplay}d/${o.oldInline}i`
      : '';
    const text = words ? `  words ${words.now}/${words.was} (${(words.ratio * 100).toFixed(0)}%)` : '';
    console.log(`ok    /${slug}/${math}${text}`);
  }
}

/**
 * Every root-relative reference on every built page, not just posts. This is
 * what catches a nav, archive or pagination link pointing at a route that was
 * never created — the post-level check above only sees post bodies.
 */
function checkAllPageLinks() {
  const pages = [];
  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (entry.name !== '_astro') walk(full);
      } else if (entry.name.endsWith('.html')) {
        pages.push(full);
      }
    }
  };
  walk(DIST);

  const broken = new Map();
  for (const file of pages) {
    const html = read(file);
    const rel = `/${path.relative(DIST, file).replace(/(^|\/)index\.html$/, '$1')}`;
    for (const ref of localRefs(html)) {
      if (resolvesOnDisk(ref)) continue;
      if (!resolvesInOldSite(ref)) {
        // Already broken upstream; the post-level check reports these.
        continue;
      }
      if (!broken.has(ref)) broken.set(ref, []);
      broken.get(ref).push(rel);
    }
  }

  console.log(`\nlinks: scanned ${pages.length} built page(s)`);
  if (broken.size) {
    let total = 0;
    for (const refs of broken.values()) total += refs.length;
    console.log(`  BROKEN — ${total} reference(s) to ${broken.size} distinct path(s):`);
    for (const [ref, pages] of [...broken].sort()) {
      console.log(`    ${ref}  (from ${pages.length} page${pages.length > 1 ? 's' : ''}, e.g. ${pages[0]})`);
    }
    linkFailed++;
  } else {
    console.log('  every root-relative reference resolves');
  }
}

checkSitemap();
checkAllPageLinks();

console.log(
  `\nchecked ${checked} published post(s): ${failed} with problems; ` +
    `sitemap: ${sitemapFailed} broken URL group(s); links: ${linkFailed} broken path group(s)`,
);
if (brokenRefs.size) {
  console.log('\ndistinct BROKEN local refs:');
  for (const [ref, slugs] of [...brokenRefs].sort()) {
    console.log(`  ${ref}  (referenced by ${slugs.length} page${slugs.length > 1 ? 's' : ''})`);
  }
}
if (preExistingRefs.size) {
  console.log(
    `\nalready broken before the migration (missing from _site/ too) — ${preExistingRefs.size} distinct:`,
  );
  for (const [ref, slugs] of [...preExistingRefs].sort()) {
    console.log(`  ${ref}  (on /${slugs[0]}/)`);
  }
}
if (pendingRefs.size) {
  console.log(`\nlocal refs pointing at routes a later phase will build (${pendingRefs.size} distinct):`);
  for (const [ref, slugs] of [...pendingRefs].sort()) {
    console.log(`  ${ref}  (${slugs.length} page${slugs.length > 1 ? 's' : ''})`);
  }
}
process.exit(failed || sitemapFailed || linkFailed ? 1 : 0);
