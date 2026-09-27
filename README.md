# Seeking Wisdom

Personal blog of Sanjay Meena, published at [sanjaymeena.io](https://www.sanjaymeena.io).

An Astro 7 static site, migrated from Jekyll 4 + Minimal Mistakes in September
2026 with every published URL preserved. See [CHANGELOG.md](CHANGELOG.md).

## Requirements

Node >= 22.12 (Astro 7's minimum), then `npm ci`.

## Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | dev server on `localhost:4321` |
| `npm run build` | static build into `dist/` |
| `npm run preview` | serve `dist/` locally |
| `npm run check` | `astro check` — TypeScript and Astro diagnostics |
| `npm run verify` | parity check against the last Jekyll build (see below) |
| `npm run migrate` | one-time Jekyll → Astro content migration (see below) |

## Layout

```
src/content.config.ts   Zod schema for the blog collection
src/content/blog/       73 posts. Filenames are for humans; the URL comes from
                        the required `slug` field.
src/standalone-posts/   2 Jupyter notebook HTML exports + manifest.json
src/pages/              routes: one file per page, plus two dynamic routes
src/layouts/            BaseLayout (SEO head + chrome), PostLayout, PageLayout
src/components/         SiteNav, SiteFooter, AuthorBio, TableOfContents,
                        SeriesNav, Comments, Analytics, AdSense(+Loader),
                        Demo, ProjectTables
src/lib/                site.ts (config), posts.ts (queries), standalone.ts,
                        integrations.ts (env gating)
src/styles/global.css   design tokens and all styling
public/                 served verbatim: images/, assets/, robots.txt, ads.txt
scripts/                migration tooling + verify-parity.mjs
```

## URLs

Post URLs are **not** derived from filenames or directories. Each post pins its
historical path in a required `slug` frontmatter field:

```yaml
slug: tech/nlp/introduction-to-linguistics   # -> /tech/nlp/introduction-to-linguistics/
slug: books/book_notes_48_laws_of_power      # -> /books/book_notes_48_laws_of_power/
```

`src/pages/[...slug].astro` emits that path verbatim, so the casing and nesting
of the old permalinks survive. **Do not edit a `slug` without adding a redirect**
— these are live, indexed URLs.

Each category has three different names, which is the main thing to keep straight:

| | example |
| --- | --- |
| old `_posts/` directory | `book_notes` |
| frontmatter `categories` | `books` |
| post URL prefix | `/books/…` |
| archive page | `/book_notes/` |

`CATEGORY_LINKS` and `ARCHIVES` in `src/lib/site.ts` map between them.

## Adding a post

Create `src/content/blog/YYYY-MM-DD-title.md`:

```yaml
---
title: My New Post
slug: tech/my-new-post   # required — this becomes the URL
date: 2026-09-23
description: One sentence for the meta tag and list views.
categories: [tech]
tags: [NLP, Deep Learning]
draft: false             # omit or false to publish
---
```

Optional fields: `series` (groups multi-part posts and renders a "Part N of M"
panel), `toc: true` (renders a table of contents from the post's headings),
`keywords`, `excerpt` (list views, falls back to `description`), `demo`,
`header.teaser` / `header.image`.

Math uses `$$…$$`: on its own paragraph it renders as display math, inside a
sentence as inline. A single `$` is literal text, so currency is safe.

## Environment

Both third-party integrations are off unless enabled at build time, and both are
production-builds-only. See [`.env.example`](.env.example).

| Variable | Effect |
| --- | --- |
| `PUBLIC_GA4_ID` | GA4 Measurement ID. Unset → no analytics at all. |
| `PUBLIC_ADSENSE_ENABLED` | Set to `true` to render AdSense units. |

`PUBLIC_ADSENSE_ENABLED=true` is set in both pipelines (`amplify.yml` and
`deploy.yml`), so ads render on both production origins — matching the old
Jekyll site's `ads.enabled: true`. Local builds and `npm run dev` never include
them.

`PUBLIC_GA4_ID` is `G-C381Y5N6L` (the "sanjaymeenaio" GA4 property) on both
origins: a repository variable for the Pages workflow, inline in `amplify.yml`
for CloudFront. A measurement id is not a secret — gtag.js ships it in public
page source — which is why the two origins may set it differently. The dead
Universal Analytics property `UA-78154345-1` is deliberately not carried over.

Comments are Giscus (GitHub Discussions). They stay inert until `repoId` and
`categoryId` are filled into `COMMENTS` in `src/lib/site.ts` — the steps are in
that comment.

## Deployment

Two independent origins serve this repo, and both build `dist/`:

| Origin | Pipeline |
| --- | --- |
| `sanjaymeena.github.io` | `.github/workflows/deploy.yml` → GitHub Pages |
| `www.sanjaymeena.io` | `amplify.yml` → AWS Amplify → S3 + CloudFront |

There is deliberately **no `CNAME` file**: `www` DNS points at CloudFront, not at
GitHub, so a CNAME would make Pages claim a domain it cannot serve.

The Astro migration is **live on both origins** (pushed to `master` September
2026). GitHub Pages' build source is already switched to **GitHub Actions** — do
not switch it back to "Deploy from a branch", or Pages will try to run a Jekyll
build against a repo that no longer has a `Gemfile`.

All one-time setup is complete: Pages builds from the workflow, the Amplify app
is connected to `master`, and both origins have AdSense and GA4 enabled.

This repository is **not a fork**. It replaced a 2016 fork of
`barryclark/jekyll-now` in September 2026 to drop the inherited fork badge and
About text; it starts from a single commit, so `git log` does not reach the
Jekyll era. The full prior history, including the `v1.0.0`–`v1.2.0` tags, is
preserved in a local mirror backup rather than on GitHub.

## Verification

`npm run verify` diffs `dist/` against `_site/`, the last Jekyll build, which is
kept locally (untracked, gitignored) purely as a parity baseline. Per published
post it checks: the URL was emitted, display-vs-inline math counts match,
heading anchors survive, table-of-contents entries match, prose word counts
match, and every root-relative reference resolves — then it checks the whole
sitemap and every link on every built page.

`_site/` can no longer be regenerated, because the Jekyll source is gone. Delete
it whenever you are satisfied with the migration; `npm run verify` then reduces
to sitemap and link self-checks.

## Migration tooling

`scripts/migrate.mjs` and `scripts/copy-assets.mjs` are the one-time Jekyll →
Astro converters. Their inputs (`_posts/`, `drafts/`, `images/`, `assets/`) have
been deleted, so they exit with an explanation rather than running; they are kept
for provenance and can be re-run against an earlier commit.
`scripts/migration-report.md` is the report from the final run.

## License

Content © Sanjay Meena. Site code is MIT licensed (see [LICENSE](LICENSE)),
inherited from the [Minimal Mistakes](https://github.com/mmistakes/minimal-mistakes)
Jekyll theme this site ran on before the Astro migration.
