#!/usr/bin/env node
/**
 * One-time static asset migration: copies the Jekyll site's static files into
 * Astro's `public/` directory, which is served verbatim from the site root.
 *
 * `public/` is committed to git — the Jekyll source directories were deleted at
 * the end of the migration, so this is a migration step, not a build step, and it
 * now exits with an explanation instead of running.
 *
 * Usage:
 *   node scripts/copy-assets.mjs
 *   node scripts/copy-assets.mjs --dry-run
 */

import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PUBLIC_DIR = path.join(ROOT, 'public');
const dryRun = process.argv.includes('--dry-run');

/** [source relative to repo root, destination relative to public/] */
const COPIES = [
  // Post and page imagery (~33MB), referenced as /images/...
  ['images', 'images'],
  // Still referenced by the legacy demo includes and the dataTables posts.
  // Dropped along with the rest of jQuery once those posts are modernised.
  ['assets/js1', 'assets/js1'],
  ['assets/css1', 'assets/css1'],
  // Plain static files that Jekyll served from the repo root.
  // robots.txt is excluded: it contains Liquid and is rebuilt in Phase 3.
  ['ads.txt', 'ads.txt'],
  ['BingSiteAuth.xml', 'BingSiteAuth.xml'],
];

let copied = 0;
let missing = 0;

// The Jekyll tree this copies from was deleted once the migration was signed off,
// so the script is kept for provenance rather than for re-running.
if (!COPIES.some(([src]) => fs.existsSync(path.join(ROOT, src)))) {
  console.error(
    [
      'Nothing to copy: images/ and assets/ no longer exist.',
      '',
      'The Jekyll source was deleted after the migration completed, so this',
      'one-time script has no input. Its output is already committed under',
      'public/ — check out an earlier commit to re-run it.',
    ].join('\n'),
  );
  process.exit(1);
}

for (const [src, dest] of COPIES) {
  const from = path.join(ROOT, src);
  const to = path.join(PUBLIC_DIR, dest);
  if (!fs.existsSync(from)) {
    console.log(`skip  ${src} (not found)`);
    missing++;
    continue;
  }
  const isDir = fs.statSync(from).isDirectory();
  const size = isDir ? dirSize(from) : fs.statSync(from).size;
  console.log(`${dryRun ? 'would copy' : 'copy'}  ${src} -> public/${dest}  (${formatBytes(size)})`);
  if (!dryRun) {
    fs.mkdirSync(path.dirname(to), { recursive: true });
    fs.cpSync(from, to, { recursive: true });
  }
  copied++;
}

function dirSize(dir) {
  let total = 0;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    total += entry.isDirectory() ? dirSize(p) : fs.statSync(p).size;
  }
  return total;
}

function formatBytes(n) {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / 1024 / 1024).toFixed(1)} MB`;
}

console.log(`\n${copied} copied, ${missing} missing${dryRun ? ' (dry run)' : ''}`);
