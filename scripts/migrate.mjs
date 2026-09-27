#!/usr/bin/env node
/**
 * Jekyll -> Astro content migration (one-time; its inputs have been deleted).
 *
 * Reads _posts/<category>/_posts/*.md (and *.html) plus root-level drafts/,
 * rewrites the Jekyll-isms that would break a Markdown parser (Liquid includes,
 * kramdown TOC markers, cdn.mathjax.org script tags, {{ site.url }}
 * interpolation), maps the frontmatter onto src/content.config.ts, and writes
 * flat files into src/content/blog/.
 *
 * URLs are *derived* from Jekyll's own permalink rule (/_config.yml:
 * `permalink: /:categories/:title/`, where :categories is the lowercased
 * frontmatter categories joined with "/" and :title is the filename minus its
 * date prefix with whitespace collapsed to "-", casing preserved) and then
 * cross-checked against the URLs actually present in _site/sitemap.xml.
 * Every divergence is reported rather than silently resolved.
 *
 * Usage:
 *   node scripts/migrate.mjs --all                 migrate every post
 *   node scripts/migrate.mjs --only stat,word-emb  migrate matching filenames
 *   node scripts/migrate.mjs --all --dry-run       report only, write nothing
 *   node scripts/migrate.mjs --all --report        also write migration-report.md
 */

import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import { load as yamlLoad, dump as yamlDump } from 'js-yaml';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const POSTS_DIR = path.join(ROOT, '_posts');
const SITEMAP = path.join(ROOT, '_site', 'sitemap.xml');
const OUT_DIR = path.join(ROOT, 'src', 'content', 'blog');
const STANDALONE_DIR = path.join(ROOT, 'src', 'standalone-posts');
const MANIFEST_PATH = path.join(STANDALONE_DIR, 'manifest.json');
const REPORT_PATH = path.join(ROOT, 'scripts', 'migration-report.md');

// Maintained MathJax 2 build on the CDN that cdn.mathjax.org's own shim
// redirects to. Only used by the two standalone Jupyter HTML posts; Markdown
// posts render math with remark-math + rehype-katex instead.
const MATHJAX_CDN = 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.9/MathJax.js';

// ---------------------------------------------------------------- cli args --

const argv = process.argv.slice(2);
const has = (flag) => argv.includes(flag);
const valueOf = (flag) => {
  const i = argv.indexOf(flag);
  return i === -1 ? undefined : argv[i + 1];
};

const migrateAll = has('--all');
const dryRun = has('--dry-run');
const writeReport = has('--report');
const onlyFilters = (valueOf('--only') ?? '')
  .split(',')
  .map((s) => s.trim().toLowerCase())
  .filter(Boolean);

// ------------------------------------------------------------ post source --

/** `_posts/tech/_posts/2017-06-06-statistical-inference.md` -> structured info. */
function collectFrom(dir, label) {
  const found = [];
  if (!fs.existsSync(dir)) return found;
  for (const file of fs.readdirSync(dir).sort()) {
    if (file.startsWith('.')) continue; // .jekyll-cache
    const ext = path.extname(file).toLowerCase();
    if (ext !== '.md' && ext !== '.html' && ext !== '.markdown') continue;
    const full = path.join(dir, file);
    if (!fs.statSync(full).isFile()) continue;
    found.push(describeSource(full, label, file, ext));
  }
  return found;
}

function collectPosts() {
  const posts = [];
  for (const dirCategory of fs.readdirSync(POSTS_DIR).sort()) {
    const inner = path.join(POSTS_DIR, dirCategory, '_posts');
    if (!fs.existsSync(inner) || !fs.statSync(inner).isDirectory()) continue;
    posts.push(...collectFrom(inner, dirCategory));
  }

  // The root `drafts/` directory held three unfinished book notes. Jekyll never
  // built them (no _site/drafts, absent from the sitemap, 404 in production) and
  // all three carry `published: false`, but they are real writing, so they are
  // carried into the collection as `draft: true` rather than deleted along with
  // the Jekyll tree.
  posts.push(...collectFrom(path.join(ROOT, 'drafts'), 'drafts'));

  return posts;
}

const DATE_PREFIX = /^(\d{2,4})-(\d{1,2})-(\d{1,2})-(.+)$/;

function describeSource(full, dirCategory, file, ext) {
  const stem = path.basename(file, ext);
  const m = DATE_PREFIX.exec(stem);
  if (!m) {
    return { full, dirCategory, file, ext, stem, date: null, fileSlug: stem, malformed: true };
  }
  const [, y, mo, d, rest] = m;
  const pad = (n) => String(n).padStart(2, '0');
  const date = `${y.padStart(4, '0')}-${pad(mo)}-${pad(d)}`;
  // Jekyll turns whitespace in the filename into "-" but preserves casing
  // (e.g. "2016-06-08-100 Numpy Exercises.md" -> /tech/100-Numpy-Exercises/).
  const fileSlug = rest.replace(/\s+/g, '-');
  return {
    full,
    dirCategory,
    file,
    ext,
    stem,
    date,
    fileSlug,
    malformed: false,
    outName: `${date}-${fileSlug}${ext === '.html' ? '.html' : '.md'}`,
  };
}

// --------------------------------------------------------------- sitemaps --

/** Paths actually published by the Jekyll build, e.g. "/tech/word-embeddings/". */
function readSitemapPaths() {
  if (!fs.existsSync(SITEMAP)) return null;
  const xml = fs.readFileSync(SITEMAP, 'utf8');
  const paths = new Set();
  for (const m of xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)) {
    let href = m[1].trim();
    href = href.replace(/^https?:\/\/[^/]+/, '');
    if (!href.startsWith('/')) continue;
    paths.add(href.replace(/\/+$/, ''));
  }
  return paths;
}

/**
 * Jekyll's `permalink: /:categories/:title/`.
 * :categories -> frontmatter categories, lowercased, joined with "/"
 * :title      -> filename minus date prefix, whitespace -> "-", case preserved
 */
function deriveUrl(post, data) {
  const categories = toArray(data.categories).map((c) => String(c).toLowerCase().trim()).filter(Boolean);
  return [...categories, post.fileSlug].join('/');
}

// ------------------------------------------------------------ frontmatter --

function splitFrontmatter(raw) {
  if (!raw.startsWith('---')) return { data: {}, body: raw, hadFrontmatter: false };
  const end = raw.indexOf('\n---', 3);
  if (end === -1) return { data: {}, body: raw, hadFrontmatter: false };
  const fmText = raw.slice(3, end).replace(/^\r?\n/, '');
  const body = raw.slice(end + 4).replace(/^\r?\n/, '');
  let data = {};
  try {
    // `json: true` lets a duplicate mapping key override instead of throwing.
    // Jekyll's Psych parser tolerates duplicates, and one post has `sitemap:`
    // twice — a hard failure here silently degraded to empty frontmatter, which
    // in turn produced a URL with no category segment.
    data = yamlLoad(fmText, { json: true }) ?? {};
  } catch (err) {
    return { data: {}, body, hadFrontmatter: true, yamlError: String(err.message ?? err) };
  }
  return { data, body, hadFrontmatter: true };
}

function toArray(v) {
  if (v === undefined || v === null) return [];
  return Array.isArray(v) ? v : [v];
}

/** `keywords` is a comma string in most posts, an array in a few. */
function toKeywordList(v) {
  if (v === undefined || v === null) return [];
  if (Array.isArray(v)) return v.map((s) => String(s).trim()).filter(Boolean);
  return String(v)
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

function toDateValue(post, data) {
  if (data.date !== undefined && data.date !== null && data.date !== '') {
    const d = data.date instanceof Date ? data.date : new Date(String(data.date));
    if (!Number.isNaN(d.getTime())) {
      return d.toISOString().slice(0, 10);
    }
    return { unresolved: String(data.date) };
  }
  return post.date ?? { unresolved: 'no date in filename or frontmatter' };
}

// --------------------------------------------------------- body transform --

function transformBody(body) {
  const notes = [];
  const note = (kind, msg) => notes.push({ kind, msg });
  // 31 of the 70 posts use CRLF. Normalise first so the blank-line collapsing
  // below (and every line-anchored regex) actually matches.
  let out = body.replace(/\r\n/g, '\n');
  const demos = [];
  let sawTocMarker = false;

  // 1. Jekyll excerpt separator.
  out = out.replace(/^[ \t]*<!--\s*more\s*-->[ \t]*\r?\n?/gim, () => {
    note('cleanup', 'removed `<!--more-->` excerpt marker');
    return '';
  });

  // 2. {% include series.html %} -> rendered by <SeriesNav /> from frontmatter.
  {
    const matches = out.match(/\{%\s*include\s+series\.html\s*%\}/g);
    if (matches) {
      note(
        'series',
        `removed ${matches.length}x \`{% include series.html %}\` — series is now rendered by <SeriesNav /> from the \`series\` frontmatter field`,
      );
      out = out.replace(/[ \t]*\{%\s*include\s+series\.html\s*%\}[ \t]*\r?\n?/g, '');
    }
  }

  // 3. {% include demo/<name>.html %} -> `demo:` frontmatter + <Demo /> component.
  out = out.replace(/[ \t]*\{%\s*include\s+demo\/([\w.-]+)\.html\s*%\}[ \t]*\r?\n?/g, (_m, name) => {
    demos.push(name);
    note('demo', `\`{% include demo/${name}.html %}\` -> \`demo: ${name}\` frontmatter (rendered by <Demo />)`);
    return '';
  });

  // 4. Dead cdn.mathjax.org script tags (math is now remark-math + rehype-katex).
  {
    const before = out;
    out = out.replace(
      /[ \t]*<script[^>]*\bcdn\.mathjax\.org\b[^>]*>[\s\S]*?<\/script>[ \t]*\r?\n?/gi,
      () => '',
    );
    out = out.replace(/[ \t]*<script[^>]*\bcdn\.mathjax\.org\b[^>]*\/>[ \t]*\r?\n?/gi, () => '');
    if (before !== out) {
      note('math', 'removed dead `cdn.mathjax.org` <script> tag(s) — math now renders via remark-math + rehype-katex');
    }
  }

  // 5. kramdown TOC: "<b> Table of Content </b>" + "* TOC" + "{:toc}".
  //    The markers are dropped and `toc: true` is set instead; <TableOfContents />
  //    renders the list from Astro's own heading data.
  {
    out = out.replace(/^[ \t]*(?:<b>)?[ \t]*Table of Contents?[ \t]*(?:<\/b>)?[ \t]*$/gim, () => {
      sawTocMarker = true;
      return '';
    });
    out = out.replace(/^[ \t]*\{:\s*\.?toc\s*\}[ \t]*$/gim, () => {
      sawTocMarker = true;
      return '';
    });
    out = out.replace(/^[ \t]*[*+-][ \t]+TOC[ \t]*$/gm, () => {
      sawTocMarker = true;
      return '';
    });
    if (sawTocMarker) {
      note('toc', 'kramdown `* TOC` / `{:toc}` markers removed -> `toc: true` (rendered by <TableOfContents />)');
    }
  }

  // 6. kramdown's `{#custom-id}` heading attribute. Markdown has no such syntax,
  //    so remark renders it as literal text on the page. All 18 occurrences are
  //    the WordPress-export placeholder `{#HEADING}`, which also produced nine
  //    duplicate id="HEADING" attributes on the old site. The anchors readers
  //    actually link to are explicit <span id="..."> elements inside those same
  //    headings — raw HTML, so they survive untouched.
  {
    const before = out;
    out = out.replace(/^(\s{0,3}#{1,6}[ \t]+.*?)[ \t]*\{#[^}]*\}[ \t]*$/gm, '$1');
    if (before !== out) {
      note(
        'cleanup',
        'stripped kramdown `{#HEADING}` heading-id markers (the real `<span id="...">` anchors are preserved)',
      );
    }
  }

  // 7. Liquid interpolation -> root-relative URLs.
  {
    const before = out;
    out = out.replace(/\{\{\s*(?:site\.url|site\.baseurl|base_url|base_path)\s*\}\}/g, '');
    if (before !== out) {
      note('liquid', 'replaced `{{ site.url }}` / `{{ site.baseurl }}` / `{{base_url}}` with root-relative paths');
    }
  }

  // 8. Own-line `$$ ... $$` must be split into block-math form, otherwise
  //    remark-math renders it inline (see normalizeBlockMath).
  {
    const math = normalizeBlockMath(out);
    out = math.text;
    if (math.blockMathCount > 0) {
      note(
        'math',
        `${math.blockMathCount} own-line \`$$ … $$\` formula(s) split into block-math form so they render as display math (kramdown emitted \\[…\\]); mid-sentence \`$$ … $$\` left inline (kramdown emitted \\(…\\))`,
      );
    }
  }

  // 9. An HTML tag on its own line swallows the Markdown that follows it.
  {
    const sep = separateHtmlFromMarkdown(out);
    out = sep.text;
    if (sep.inserted > 0) {
      note(
        'markdown',
        `${sep.inserted} blank line(s) inserted after standalone HTML tags so the following Markdown is parsed (CommonMark treats \`<hr>\` as an HTML block that runs to the next blank line; kramdown was lenient)`,
      );
    }
    if (sep.unbalancedFence) {
      note('MANUAL', 'unbalanced code fence (odd number of ``` / ~~~ markers) — content after it may not parse');
    }
  }

  // 10. ``` image — a Stanford parse tree fenced with a language Shiki does not
  //     have, which warns on every build. It is plain text.
  {
    const before = out;
    out = out.replace(/^([ \t]{0,3}(?:`{3,}|~{3,}))[ \t]+image[ \t]*$/gm, '$1text');
    if (before !== out) {
      note('cleanup', '``` image -> ```text (a parse tree fenced with a language Shiki does not know)');
    }
  }

  // 11. Collapse the blank-line debris left by the removals above.
  out = out.replace(/\n{3,}/g, '\n\n').replace(/^\n+/, '').replace(/\s+$/, '\n');

  // 12. Anything Liquid still left in the body is a manual fix.
  for (const m of out.matchAll(/\{%[\s\S]*?%\}/g)) {
    note('MANUAL', `leftover Liquid tag: \`${m[0].slice(0, 80).replace(/\n/g, ' ')}\``);
  }
  for (const m of out.matchAll(/\{\{[\s\S]*?\}\}/g)) {
    note('MANUAL', `leftover Liquid expression: \`${m[0].slice(0, 80).replace(/\n/g, ' ')}\``);
  }
  if (/\bMathJax\b/i.test(out)) {
    note('MANUAL', 'body still mentions MathJax');
  }
  for (const m of out.matchAll(/^\s{0,3}#{1,6}[ \t]+.*\{[#.][^}]*\}[ \t]*$/gm)) {
    note('MANUAL', `unstripped kramdown attribute on heading: \`${m[0].trim().slice(0, 80)}\``);
  }

  return { body: out, notes, demos, toc: sawTocMarker };
}

/**
 * Insert a blank line between a line containing nothing but an HTML tag and the
 * Markdown line that follows it.
 *
 * CommonMark treats `<hr>` as the start of an HTML block that runs until the
 * next blank line, so an `<hr>` immediately followed by `## Heading` swallows the
 * heading as raw text and it never renders. kramdown was lenient and parsed it
 * anyway — 82 such lines across 9 posts, which is why six headings went missing
 * from /investing/analyze_banks_nbfcs/ alone.
 *
 * Fenced code blocks are skipped so HTML shown as an example is left alone.
 *
 * @returns {{ text: string, inserted: number, unbalancedFence: boolean }}
 */
function separateHtmlFromMarkdown(text) {
  const lines = text.split('\n');
  const out = [];
  let inserted = 0;
  let inFence = false;
  const isHtmlOnlyLine = (l) => /^\s{0,3}<\/?[a-zA-Z][^>]*>\s*$/.test(l);
  const isFence = (l) => /^\s{0,3}(?:`{3,}|~{3,})/.test(l);

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (isFence(line)) inFence = !inFence;
    out.push(line);
    if (inFence) continue;
    const next = lines[i + 1];
    if (next !== undefined && isHtmlOnlyLine(line) && next.trim() !== '' && !/^\s*</.test(next)) {
      out.push('');
      inserted++;
    }
  }

  return { text: out.join('\n'), inserted, unbalancedFence: inFence };
}

/**
 * Normalise `$$ ... $$` math so remark-math classifies it the same way kramdown
 * did.
 *
 * Evidence from the Jekyll build (_site/tech/statistical-inference/index.html):
 * kramdown emitted `\[ ... \]` (display) for a `$$ ... $$` line that starts its
 * own paragraph, and `\( ... \)` (inline) for every other `$$ ... $$` — the ones
 * inside sentences, plus one that directly follows a prose line with no blank
 * between them.
 *
 * micromark-extension-math only treats `$$` as *block* math when the closing
 * delimiter sits on its own line, so a single-line `$$ x $$` always falls
 * through to inline math. Splitting the paragraph-initial ones onto three lines
 * restores display mode; every other `$$ ... $$` is left byte-for-byte alone.
 *
 * @returns {{ text: string, blockMathCount: number }}
 */
function normalizeBlockMath(text) {
  const lines = text.split('\n');
  const out = [];
  let blockMathCount = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    const startsOwnParagraph = out.length === 0 || out[out.length - 1].trim() === '';

    const inner =
      trimmed.startsWith('$$') && trimmed.endsWith('$$') && trimmed.length > 4
        ? trimmed.slice(2, -2)
        : null;
    // More than one `$$...$$` span on a line means prose carrying inline math.
    const isDisplayCandidate = inner !== null && !inner.includes('$$') && inner.trim() !== '';

    if (isDisplayCandidate && startsOwnParagraph) {
      out.push('$$', inner.trim(), '$$');
      const next = lines[i + 1];
      if (next !== undefined && next.trim() !== '') out.push('');
      blockMathCount++;
      continue;
    }

    out.push(line);
  }

  return { text: out.join('\n'), blockMathCount };
}

// ------------------------------------------------------------------ output --

function buildFrontmatter(post, data, slug, toc) {
  const out = {
    title: String(data.title ?? post.fileSlug).trim(),
    slug,
    date: toDateValue(post, data),
    description: String(data.description ?? data.excerpt ?? '').trim(),
    excerpt: String(data.excerpt ?? '').trim(),
    categories: toArray(data.categories).map((c) => String(c).trim().toLowerCase()).filter(Boolean),
    tags: toArray(data.tags).map((t) => String(t).trim()).filter(Boolean),
  };

  const keywords = toKeywordList(data.keywords);
  if (keywords.length) out.keywords = keywords;

  if (typeof data.series === 'string' && data.series.trim()) out.series = data.series.trim();

  if (toc) out.toc = true;

  // Jekyll publishes unless told otherwise; `published: single` (a typo in one
  // post) is truthy and that post is indeed live.
  out.draft = data.published === false;

  if (data.header && typeof data.header === 'object') out.header = data.header;
  if (typeof data.comments === 'boolean') out.comments = data.comments;

  return out;
}

function dumpFrontmatter(obj) {
  return yamlDump(obj, { lineWidth: -1, noRefs: true, sortKeys: false, quotingType: '"' });
}

// -------------------------------------------------------------------- main --

/**
 * Copies `_includes/demo/*.html` to `src/components/demos/`, stripping the
 * Liquid `{{ site.baseurl }}` interpolation so the script srcs become
 * root-relative. Rendered by src/components/Demo.astro.
 */
function copyDemoPartials() {
  const src = path.join(ROOT, '_includes', 'demo');
  const dest = path.join(ROOT, 'src', 'components', 'demos');
  const copied = [];
  if (!fs.existsSync(src)) return copied;

  for (const file of fs.readdirSync(src).sort()) {
    if (!file.endsWith('.html')) continue;
    let html = fs.readFileSync(path.join(src, file), 'utf8');
    html = html.replace(/\{\{\s*(?:site\.url|site\.baseurl|base_url|base_path)\s*\}\}/g, '');
    const leftovers = [...html.matchAll(/\{%[\s\S]*?%\}|\{\{[\s\S]*?\}\}/g)].map((m) => m[0].slice(0, 60));
    if (!dryRun) {
      fs.mkdirSync(dest, { recursive: true });
      fs.writeFileSync(path.join(dest, file), html, 'utf8');
    }
    copied.push({ file, leftovers });
  }
  return copied;
}

function main() {
  // The Jekyll tree this reads from was deleted once the migration was signed
  // off, so the script is kept for provenance rather than for re-running.
  if (!fs.existsSync(POSTS_DIR)) {
    console.error(
      [
        'Nothing to migrate: _posts/ no longer exists.',
        '',
        'The Jekyll source was deleted after the migration completed, so this',
        'one-time converter has no input. It is kept for provenance — check out',
        'an earlier commit to re-run it against the original tree.',
        '',
        'The report from the final run is scripts/migration-report.md.',
      ].join('\n'),
    );
    process.exit(1);
  }

  const sitemapPaths = readSitemapPaths();
  const posts = collectPosts();
  const results = [];
  const usedOutNames = new Map();
  const standalone = [];
  const demoPartials = copyDemoPartials();

  for (const post of posts) {
    if (onlyFilters.length && !onlyFilters.some((f) => post.file.toLowerCase().includes(f))) continue;
    if (!migrateAll && onlyFilters.length === 0) continue;

    const raw = fs.readFileSync(post.full, 'utf8');
    const { data, body, hadFrontmatter, yamlError } = splitFrontmatter(raw);
    const notes = [];
    if (!hadFrontmatter) notes.push({ kind: 'MANUAL', msg: 'no frontmatter block found' });
    if (yamlError) notes.push({ kind: 'MANUAL', msg: `frontmatter YAML failed to parse: ${yamlError}` });
    if (post.malformed) notes.push({ kind: 'MANUAL', msg: 'filename has no YYYY-MM-DD prefix' });

    const derived = deriveUrl(post, data);
    const inSitemap = sitemapPaths ? sitemapPaths.has(`/${derived}`) : null;
    if (toArray(data.categories).length === 0) {
      notes.push({
        kind: 'MANUAL',
        msg: 'no `categories` in frontmatter, so the derived URL has no archive segment and is almost certainly wrong',
      });
    }
    if (sitemapPaths && !inSitemap && data.published !== false) {
      notes.push({
        kind: 'MANUAL',
        msg: `derived URL \`/${derived}/\` is NOT in _site/sitemap.xml — verify before publishing`,
      });
    }

    // .html posts are full Jupyter notebook exports (own <!DOCTYPE html>,
    // inlined Bootstrap CSS), not Markdown. They cannot be rendered inside the
    // post layout, so they are emitted as standalone documents and served
    // verbatim by src/pages/[...slug].astro. Routing them (rather than dropping
    // them in public/) keeps them in the sitemap, in post listings, and
    // previewable by `astro dev`.
    if (post.ext === '.html') {
      let html = body.replace(/^\s+/, '');
      // cdn.mathjax.org is a deprecated shim that rewrites the tag at runtime to
      // cdnjs MathJax 2.7.1. Point straight at a maintained 2.x build on the
      // same CDN instead; the `?config=...` query is outside the match.
      const before = html;
      html = html.replace(
        /https?:\/\/cdn\.mathjax\.org\/mathjax\/latest\/MathJax\.js/g,
        MATHJAX_CDN,
      );
      if (before !== html) {
        notes.push({ kind: 'math', msg: `rewrote cdn.mathjax.org -> ${MATHJAX_CDN}` });
      }
      if (/cdn\.mathjax\.org/.test(html)) {
        notes.push({ kind: 'MANUAL', msg: 'still references cdn.mathjax.org after rewrite' });
      }

      const fileName = `${derived.replace(/\//g, '__')}.html`;
      const dest = path.join(STANDALONE_DIR, fileName);
      if (!dryRun) {
        fs.mkdirSync(STANDALONE_DIR, { recursive: true });
        fs.writeFileSync(dest, html, 'utf8');
      }

      const date = toDateValue(post, data);
      if (typeof date === 'object') {
        notes.push({ kind: 'MANUAL', msg: `unresolved date: ${date.unresolved}` });
      }
      standalone.push({
        slug: derived,
        file: fileName,
        title: String(data.title ?? post.fileSlug).trim(),
        date: typeof date === 'object' ? (post.date ?? '1970-01-01') : date,
        description: String(data.description ?? data.excerpt ?? '').trim(),
        excerpt: String(data.excerpt ?? '').trim(),
        categories: toArray(data.categories).map((c) => String(c).trim().toLowerCase()).filter(Boolean),
        tags: toArray(data.tags).map((t) => String(t).trim()).filter(Boolean),
        draft: data.published === false,
      });
      notes.push({ kind: 'html-post', msg: `standalone document -> src/standalone-posts/${fileName}` });
      results.push({ post, notes, derived, inSitemap, skipped: 'html-post', data, dest });
      continue;
    }

    const transformed = transformBody(body);
    notes.push(...transformed.notes);

    const fm = buildFrontmatter(post, data, derived, transformed.toc);
    if (transformed.demos.length) fm.demo = transformed.demos[0];
    if (transformed.demos.length > 1) {
      notes.push({ kind: 'MANUAL', msg: `multiple demo includes (${transformed.demos.join(', ')}) — only first wired up` });
    }
    if (typeof fm.date === 'object') {
      notes.push({ kind: 'MANUAL', msg: `unresolved date: ${fm.date.unresolved}` });
      fm.date = post.date ?? '1970-01-01';
    }
    if (!fm.description) notes.push({ kind: 'note', msg: 'no description/excerpt in frontmatter' });

    const doc = `---\n${dumpFrontmatter(fm).trimEnd()}\n---\n\n${transformed.body}`;

    if (usedOutNames.has(post.outName)) {
      notes.push({ kind: 'MANUAL', msg: `output filename collides with ${usedOutNames.get(post.outName)}` });
    }
    usedOutNames.set(post.outName, post.file);

    const dest = path.join(OUT_DIR, post.outName);
    if (!dryRun) {
      fs.mkdirSync(OUT_DIR, { recursive: true });
      fs.writeFileSync(dest, doc, 'utf8');
    }
    results.push({ post, notes, derived, inSitemap, data, fm, dest, written: !dryRun });
  }

  // The manifest is the routing table for standalone (non-Markdown) posts; it is
  // rewritten on every run, so `--all` is the canonical migration invocation.
  if (!dryRun) {
    fs.mkdirSync(STANDALONE_DIR, { recursive: true });
    const sorted = standalone.sort((a, b) => a.slug.localeCompare(b.slug));
    fs.writeFileSync(MANIFEST_PATH, `${JSON.stringify(sorted, null, 2)}\n`, 'utf8');
  }

  printSummary(results, sitemapPaths, demoPartials, standalone);
  if (writeReport) writeReportFile(results, sitemapPaths, demoPartials);
}

function printSummary(results, sitemapPaths, demoPartials, standalone) {
  const migrated = results.filter((r) => !r.skipped);
  const manual = results.filter((r) => r.notes.some((n) => n.kind === 'MANUAL'));
  console.log(`\nsource posts seen : ${results.length}`);
  console.log(`migrated          : ${migrated.length}${dryRun ? ' (dry run, nothing written)' : ''}`);
  console.log(`drafts            : ${migrated.filter((r) => r.fm?.draft).length}`);
  console.log(`standalone (.html): ${standalone.length} -> src/standalone-posts/ (+ manifest.json)`);
  console.log(`needing manual fix: ${manual.length}`);
  console.log(
    `sitemap check     : ${
      sitemapPaths ? `${migrated.filter((r) => r.inSitemap).length}/${migrated.length} derived URLs confirmed in _site/sitemap.xml` : 'skipped (_site/sitemap.xml not found)'
    }`,
  );
  if (demoPartials.length) {
    console.log(`demo partials     : ${demoPartials.length} -> src/components/demos/`);
    for (const d of demoPartials) {
      if (d.leftovers.length) console.log(`  ! ${d.file}: leftover Liquid ${JSON.stringify(d.leftovers)}`);
    }
  }

  if (manual.length) {
    console.log('\n--- posts flagged for manual review ---');
    for (const r of manual) {
      console.log(`\n${r.post.file}`);
      for (const n of r.notes.filter((n) => n.kind === 'MANUAL')) console.log(`  ! ${n.msg}`);
    }
  }

  if (migrated.length) {
    console.log('\n--- migrated ---');
    for (const r of migrated) {
      const flags = [];
      if (r.fm.draft) flags.push('DRAFT');
      for (const kind of ['series', 'math', 'toc', 'demo', 'liquid']) {
        if (r.notes.some((n) => n.kind === kind)) flags.push(kind);
      }
      console.log(`  ${r.inSitemap === true ? 'ok ' : r.inSitemap === false ? '?? ' : '-- '} /${r.derived}/  ${flags.length ? `[${flags.join(' ')}]` : ''}`);
    }
  }
  console.log('');
}

function writeReportFile(results, sitemapPaths, demoPartials) {
  const migrated = results.filter((r) => !r.skipped);
  const lines = [];
  lines.push('# Jekyll -> Astro migration report');
  lines.push('');
  lines.push(`Generated by \`npm run migrate\` on ${new Date().toISOString().slice(0, 10)}.`);
  lines.push('');
  lines.push(`- source posts seen: **${results.length}**`);
  lines.push(`- migrated to \`src/content/blog/\`: **${migrated.length}**`);
  lines.push(`- of which drafts (\`published: false\`): **${migrated.filter((r) => r.fm?.draft).length}**`);
  lines.push(
    `- standalone HTML posts, served verbatim rather than converted: **${results.filter((r) => r.skipped).length}**`,
  );
  if (sitemapPaths) {
    lines.push(
      `- derived URLs confirmed present in \`_site/sitemap.xml\`: **${migrated.filter((r) => r.inSitemap).length}/${migrated.length}**`,
    );
  } else {
    lines.push('- `_site/sitemap.xml` not found, so URLs could not be cross-checked');
  }
  lines.push('');

  lines.push('## Legacy demo includes');
  lines.push('');
  if (!demoPartials.length) lines.push('_None found._');
  for (const d of demoPartials) {
    lines.push(
      `- \`_includes/demo/${d.file}\` -> \`src/components/demos/${d.file}\`${
        d.leftovers.length ? ` — **leftover Liquid:** ${JSON.stringify(d.leftovers)}` : ''
      }`,
    );
  }
  lines.push('');

  const htmlPosts = results.filter((r) => r.skipped === 'html-post');
  lines.push(`## Standalone HTML posts, not converted to Markdown (${htmlPosts.length})`);
  lines.push('');
  lines.push(
    'These are full Jupyter notebook HTML exports (their own `<!DOCTYPE html>`, inlined Bootstrap CSS). They are not converted to Markdown; they are written to `src/standalone-posts/` with their metadata recorded in `manifest.json`, and served verbatim at their original URL by `src/pages/[...slug].astro`. Their dead `cdn.mathjax.org` script tag is repointed at a maintained MathJax 2 build.',
  );
  lines.push('');
  if (!htmlPosts.length) lines.push('_None found._');
  for (const r of htmlPosts) {
    lines.push(`- \`${r.post.file}\` -> \`/${r.derived}/\`${r.data.published === false ? ' _(draft)_' : ''}`);
  }
  lines.push('');

  const manual = results.filter((r) => r.notes.some((n) => n.kind === 'MANUAL'));
  lines.push(`## Needs manual attention (${manual.length})`);
  lines.push('');
  if (!manual.length) lines.push('_None._');
  for (const r of manual) {
    lines.push(`### \`${r.post.file}\``);
    for (const n of r.notes.filter((n) => n.kind === 'MANUAL')) lines.push(`- ${n.msg}`);
    lines.push('');
  }

  lines.push('## Transformations applied');
  lines.push('');
  lines.push('| post | url | transforms |');
  lines.push('| --- | --- | --- |');
  for (const r of migrated) {
    const kinds = [...new Set(r.notes.filter((n) => n.kind !== 'MANUAL').map((n) => n.kind))];
    lines.push(`| \`${r.post.file}\` | \`/${r.derived}/\`${r.fm.draft ? ' _(draft)_' : ''} | ${kinds.join(', ') || '—'} |`);
  }
  lines.push('');

  lines.push('## Detail');
  lines.push('');
  for (const r of results) {
    if (!r.notes.length) continue;
    lines.push(`### \`${r.post.file}\``);
    for (const n of r.notes) lines.push(`- **${n.kind}**: ${n.msg}`);
    lines.push('');
  }

  fs.mkdirSync(path.dirname(REPORT_PATH), { recursive: true });
  fs.writeFileSync(REPORT_PATH, lines.join('\n'), 'utf8');
  console.log(`report written to ${path.relative(ROOT, REPORT_PATH)}`);
}

main();
