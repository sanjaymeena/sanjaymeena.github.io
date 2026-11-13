#!/usr/bin/env node
/**
 * Migrate the "Kubernetes by Example" series from draft/ into the standalone
 * post pipeline.
 *
 * The drafts are body-fragment HTML files (no <!DOCTYPE>/<head>/<body>) that
 * each carry their own complete design system: Google Fonts links, an inline
 * <style> block, a sticky series topbar, interactive SVG stages and inline
 * <script>s. They cannot render inside PostLayout, so they are wrapped into
 * full HTML documents and served verbatim by src/pages/[...slug].astro, the
 * same mechanism used for the two Jupyter notebook exports.
 *
 * Per page this script:
 *   1. splits the fragment at the first </style> — the leading <link>/<style>
 *      run becomes <head> content, the rest becomes the <body>;
 *   2. rewrites inter-chapter links (../00-index.html, ./NN-slug/index.html)
 *      to their published URLs (/tech/kubernetes-by-example/NN-slug/);
 *   3. wraps everything in a document with charset, viewport, <title>,
 *      meta description (from the .lede paragraph) and a canonical URL;
 *   4. writes it to src/standalone-posts/ using the slug-to-filename
 *      convention of migrate.mjs ("/" -> "__").
 *
 * It also:
 *   - copies each chapter's manifests/ folder to
 *     public/tech/kubernetes-by-example/<chapter>/manifests/, mirroring the
 *     chapter URLs, so the `kubectl apply -f manifests/foo.yaml` paths in the
 *     prose resolve as real relative downloads;
 *   - writes src/standalone-posts/manifest.series.json, the routing/listing
 *     table for the series. It is deliberately NOT manifest.json: that file is
 *     regenerated from the Jekyll sources by `npm run migrate` (which would
 *     drop these entries) and is used by verify-parity.mjs as the parity
 *     baseline against _site (which never contained the series).
 *
 * Re-running is idempotent: outputs are overwritten from the drafts.
 *
 * Usage: npm run migrate:k8s-series
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DRAFT_DIR = path.join(ROOT, 'draft', 'kubernetes-by-example');
const OUT_DIR = path.join(ROOT, 'src', 'standalone-posts');
const PUBLIC_DIR = path.join(ROOT, 'public', 'tech', 'kubernetes-by-example');

const SITE_URL = 'https://www.sanjaymeena.io';
const SITE_TITLE = 'Seeking Wisdom'; // src/lib/site.ts SITE.title
const SERIES_SLUG = 'tech/kubernetes-by-example';
const SERIES_TITLE = 'Kubernetes by Example';

// Single publication date for the whole series; listings sort stably, so the
// manifest order (index first, then chapters 01..14) is preserved among ties.
const PUBLISH_DATE = '2026-11-13';

const TAGS = ['Kubernetes', 'MLOps'];
const CATEGORIES = ['tech'];

/** Plain text from an HTML fragment: tags stripped, entities decoded, whitespace collapsed. */
function textOf(html) {
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function escapeAttr(text) {
  return text.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/** Collect the series pages: the index file plus every NN-slug chapter directory, in order. */
function collectPages() {
  const chapters = fs
    .readdirSync(DRAFT_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && /^\d{2}-/.test(entry.name))
    .map((entry) => entry.name)
    .sort();

  return [
    { dir: null, source: path.join(DRAFT_DIR, '00-index.html'), chapter: null },
    ...chapters.map((chapter) => ({
      dir: chapter,
      source: path.join(DRAFT_DIR, chapter, 'index.html'),
      chapter,
    })),
  ];
}

/** Rewrite the relative inter-chapter hrefs the drafts use to published site URLs. */
function rewriteLinks(html) {
  let count = 0;
  const bumped = (result) => {
    count += 1;
    return result;
  };
  let out = html.replace(/href="(?:\.\.?\/)?00-index\.html(#[^"]*)?"/g, (_m, hash) =>
    bumped(`href="/${SERIES_SLUG}/${hash ?? ''}"`),
  );
  out = out.replace(/href="(?:\.\.?\/)?(\d{2}-[a-z0-9-]+)\/index\.html(#[^"]*)?"/g, (_m, dir, hash) =>
    bumped(`href="/${SERIES_SLUG}/${dir}/${hash ?? ''}"`),
  );
  return { html: out, count };
}

function buildDocument({ headExtra, body, title, description, canonical }) {
  return [
    '<!DOCTYPE html>',
    '<html lang="en">',
    '<head>',
    '<meta charset="utf-8">',
    '<meta name="viewport" content="width=device-width, initial-scale=1">',
    `<title>${escapeAttr(title)}</title>`,
    `<meta name="description" content="${escapeAttr(description)}">`,
    `<link rel="canonical" href="${canonical}">`,
    headExtra.trimEnd(),
    '</head>',
    '<body>',
    body.trim(),
    '</body>',
    '</html>',
    '',
  ].join('\n');
}

function migratePage({ dir, source, chapter }) {
  const fragment = fs.readFileSync(source, 'utf8');

  // The fragment opens with <link rel=preconnect>... <link rel=stylesheet><style>...;
  // everything through the first </style> is head material, the rest is body.
  const splitAt = fragment.indexOf('</style>');
  if (splitAt === -1) {
    throw new Error(`No </style> found in ${source} — unexpected fragment shape.`);
  }
  const headExtra = fragment.slice(0, splitAt + '</style>'.length);
  let body = fragment.slice(splitAt + '</style>'.length);

  // Each fragment carries its own <title> just after the style run (after a
  // second <style> block in 00-index.html). The wrapper supplies the full
  // "<title> - Kubernetes by Example - Seeking Wisdom" one, so drop the
  // fragment's to keep exactly one per document. Every fragment has exactly
  // one <title>, always inside this body half.
  const titleMatches = body.match(/<title>[\s\S]*?<\/title>/g) ?? [];
  if (titleMatches.length !== 1) {
    throw new Error(`Expected exactly one <title> in the body of ${source}, found ${titleMatches.length}.`);
  }
  body = body.replace(/<title>[\s\S]*?<\/title>\s*/, '');

  const h1 = fragment.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
  const lede = fragment.match(/<p class="lede"[^>]*>([\s\S]*?)<\/p>/);
  if (!h1 || !lede) {
    throw new Error(`Missing <h1> or .lede in ${source}.`);
  }
  const h1Text = textOf(h1[1]);
  const description = textOf(lede[1]);

  const slug = chapter === null ? SERIES_SLUG : `${SERIES_SLUG}/${chapter}`;
  // Rewrite on the body only; headExtra holds just font links and CSS.
  const rewrittenBody = rewriteLinks(body);

  const listingTitle =
    chapter === null ? SERIES_TITLE : `${SERIES_TITLE} ${chapter.slice(0, 2)}: ${h1Text}`;
  const documentTitle =
    chapter === null
      ? `${SERIES_TITLE} - ${SITE_TITLE}`
      : `${h1Text} - ${SERIES_TITLE} - ${SITE_TITLE}`;

  const document = buildDocument({
    headExtra,
    body: rewrittenBody.html,
    title: documentTitle,
    description,
    canonical: `${SITE_URL}/${slug}/`,
  });

  const fileName = `${slug.replaceAll('/', '__')}.html`;
  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.writeFileSync(path.join(OUT_DIR, fileName), document);

  // Mirror the chapter's manifests/ under public/ at the same relative position
  // the prose assumes (`kubectl apply -f manifests/tuner.yaml`).
  let manifestFiles = 0;
  if (dir !== null) {
    const manifests = path.join(DRAFT_DIR, dir, 'manifests');
    if (fs.existsSync(manifests)) {
      const dest = path.join(PUBLIC_DIR, dir, 'manifests');
      fs.rmSync(dest, { recursive: true, force: true });
      fs.cpSync(manifests, dest, { recursive: true });
      manifestFiles = fs.readdirSync(dest, { recursive: true }).filter((f) => fs.statSync(path.join(dest, f)).isFile()).length;
    }
  }

  return {
    entry: {
      slug,
      file: fileName,
      title: listingTitle,
      date: PUBLISH_DATE,
      description,
      excerpt: description,
      categories: CATEGORIES,
      tags: TAGS,
      draft: false,
    },
    linksRewritten: rewrittenBody.count,
    manifestFiles,
  };
}

function main() {
  const pages = collectPages();
  const results = pages.map((page) => migratePage(page));

  const manifestPath = path.join(OUT_DIR, 'manifest.series.json');
  fs.writeFileSync(manifestPath, `${JSON.stringify(results.map((r) => r.entry), null, 2)}\n`);

  console.log(`migrated ${results.length} pages -> src/standalone-posts/ (+ manifest.series.json)`);
  for (const r of results) {
    console.log(
      `  ${r.entry.slug}  [${r.linksRewritten} links rewritten` +
        (r.manifestFiles ? `, ${r.manifestFiles} manifest files -> public/tech/${SERIES_SLUG.slice('tech/'.length)}/` : '') +
        ']',
    );
  }
}

main();
