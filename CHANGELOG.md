# Changelog

This file previously held the upstream Minimal Mistakes theme changelog (v3.x–v4.x
by Michael Rose). It was replaced when the theme and the rest of the Jekyll
toolchain were removed; the old contents remain in git history.

## 2026-09-23 — Astro migration

Rebuilt the site on Astro 7 (TypeScript, content collections, static output),
replacing Jekyll 4.3 + Minimal Mistakes. Every URL the Jekyll site published
still resolves, verified against the last `_site/` build: 82/82 sitemap URLs,
65 published posts, 0 problems.

Landed in five review-gated phases; see `git log` for the per-phase commits.

### Added

- `src/content/blog/` — 73 posts migrated from `_posts/*/_posts/` and `drafts/`,
  flattened, with the historical URL pinned in a required `slug` field.
- `src/standalone-posts/` — the 2 Jupyter notebook HTML exports, routed verbatim
  at their original URLs so they stay in the sitemap and post listings.
- Routes for all 11 former `_pages/`: homepage, five category archives, `/tags/`,
  `/categories/`, `/about/`, `/portfolio/`, `/projects/`, `/404.html`, plus a real
  paginated archive at `/page2/`…`/page7/`.
- `/feed.xml` (RSS 2.0, replaces jekyll-feed), `sitemap-index.xml` (replaces
  jekyll-sitemap), per-page SEO/OG/Twitter/JSON-LD (replaces jekyll-seo-tag),
  `rel=prev`/`rel=next`.
- Components: `SiteNav`, `SiteFooter`, `AuthorBio` (byline/card/full),
  `TableOfContents`, `SeriesNav`, `Comments` (Giscus), `Analytics` (GA4),
  `AdSense` + `AdSenseLoader`, `Demo`, `ProjectTables`.
- `scripts/verify-parity.mjs` — diffs `dist/` against `_site/` (URLs, math mode
  counts, heading anchors, TOC entries, prose word counts, every link).
- `.github/workflows/deploy.yml` (GitHub Pages) and `amplify.yml` (AWS Amplify).

### Removed

- Ruby toolchain: `Gemfile`, `.ruby-version`, `.bundle/`, `vendor/`,
  `_config.yml`, `_config-dev.yml`, `_data/`, `_includes/`, `_layouts/`,
  `_pages/`, `_posts/`, `drafts/`, `social-feeds/`, root `index.html`.
- Theme assets: `assets/` and `images/` (copies live in `public/`).
- jQuery, FitVids, gulp and node-sass pipeline.
- Universal Analytics `UA-78154345-1` (dead since 2023) and the shut-down Google
  `fixurl.js` 404 widget.
- Dead Google+ profile link from the JSON-LD `sameAs` list.
- All Liquid: `{% include series.html %}`, `{% include demo/*.html %}`,
  `{{ site.url }}` / `{{ site.baseurl }}`, and kramdown `* TOC` / `{:toc}` and
  `{#HEADING}` markers.
- Every `cdn.mathjax.org` reference. Math now renders server-side with
  remark-math + rehype-katex. (That host is not quite dead — it serves a shim
  that rewrites the tag to cdnjs MathJax 2.7.1 — but the two notebook exports now
  point straight at a maintained 2.7.9 build.)

### Changed behaviour

Deliberate deviations from the Jekyll site, each decided during the migration:

- **Canonical host is `www`.** Production 302-redirects the bare domain, so the
  old non-www canonicals pointed at a redirect.
- **`/page2/`…`/page13/` were homepage duplicates.** `index.html` never used
  `paginator`, so jekyll-paginate emitted twelve identical copies of the
  homepage. They are now real 10-post slices, `noindex` and out of the sitemap.
  With 65 posts there are only 7 pages, so `/page8/`…`/page13/` are not emitted.
- **`/feed.xml` is RSS 2.0** (was Atom) and carries all 54 published non-tools
  posts. jekyll-feed's limit of 10 meant the feed contained nothing but tools
  announcements, and it ignored the `feed: false` set for `_posts/tools`.
- **`/sitemap.xml` is now `/sitemap-index.xml`** — `@astrojs/sitemap` hardcodes
  that filename. `robots.txt` points at the new one; Search Console may need
  resubmitting.
- **`/categories/` has content.** It rendered as a bare heading before
  (`layout: archive` with an empty body).
- **`/misc/` describes itself correctly.** `_pages/misc.md` repeated
  `investment_notes`' `description`/`keywords`/`excerpt` keys after its own, and
  YAML takes the last, so the page advertised itself as value-investing content.
- **`/projects/` tables** keep search and click-to-sort via ~1 KB of inlined
  vanilla JS instead of jQuery 3.1.1 + Bootstrap 3 + jquery.dataTables.
- **Series panels** render only when a series has 2+ published parts, rather than
  showing "Part 1 in a 1-Part Series".
- **Tables of contents** are built from Astro's heading data rather than
  remark-toc, which emitted an empty list when a post's headings were all deeper
  than the TOC heading, and nested `<a>` inside `<a>` for the WordPress-exported
  `<span id>` headings. All 25 TOC posts now match the Jekyll output
  entry-for-entry.
- **Post pages link their tags** to `/tags/#<tag>` anchors. The Jekyll post
  template rendered no tag links at all, so this is new.
- **Three unfinished book notes** from `drafts/` are carried into the collection
  as `draft: true`. They were never published (absent from `_site/`, the sitemap
  and production).
- **Ads are off by default locally** but on in both deploy pipelines, matching the
  Jekyll site's `ads.enabled: true`.
- **Comments moved from Disqus to Giscus** (GitHub Discussions), loaded lazily on
  scroll. Inert until the two repository IDs are configured.
