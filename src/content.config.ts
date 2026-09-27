import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

// NOTE on location: the brief asked for `src/content/config.ts`. That path was
// removed in Astro 6 — Astro 7 only reads `src/content.config.{ts,mjs,js,mts}`
// (see node_modules/astro/dist/content/utils.js -> searchConfig/searchLegacyConfig;
// the old location now requires `experimental.legacy.contentCollections`).
// This file therefore lives at src/content.config.ts.

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),

    // The exact path this post was published at on the Jekyll site, without
    // leading/trailing slash — e.g. "tech/nlp/introduction-to-linguistics".
    // Jekyll's permalink was /:categories/:title/ where :categories came from the
    // *frontmatter* categories (lowercased, joined with "/") and :title kept the
    // filename's casing, so the shape varies per post ("books/...", "tech/nlp/...",
    // "tech/100-Numpy-Exercises"). Required rather than derived so that a
    // migration slip can never silently change a live URL.
    slug: z.string().min(1),

    // From the filename's date prefix, or the `date:` frontmatter when present.
    date: z.coerce.date(),

    description: z.string().default(''),

    // Jekyll's `post.excerpt` — what the homepage and archive lists actually
    // showed. Distinct from `description` (the meta tag): 67 posts carry both and
    // they are not always the same string.
    excerpt: z.string().default(''),

    categories: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    keywords: z.array(z.string()).default([]),

    // Groups multi-part articles; drives <SeriesNav />.
    series: z.string().optional(),

    // True when the Jekyll post carried a kramdown `* TOC` / `{:toc}` marker, so
    // <TableOfContents /> renders for exactly the posts that had one before.
    toc: z.boolean().default(false),

    // Jekyll semantics: `published: false` hides a post, a missing `published`
    // keeps it live. 11 posts omit the key entirely and all 11 are published.
    draft: z.boolean().default(false),

    // Name of a legacy Jekyll demo include (`{% include demo/<name>.html %}`),
    // rendered by <Demo /> in the post layout instead of inline in the body.
    demo: z.string().optional(),

    // Per-post Disqus opt-out (the old _config.yml disabled comments for tools).
    comments: z.boolean().optional(),

    // Minimal Mistakes teaser/hero image, paths relative to /images/.
    header: z
      .object({
        teaser: z.string().optional(),
        image: z.string().optional(),
        overlay_image: z.string().optional(),
        overlay_filter: z.union([z.number(), z.string()]).optional(),
      })
      .optional(),
  }),
});

export const collections = { blog };
