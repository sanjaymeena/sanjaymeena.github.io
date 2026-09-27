// @ts-check
import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// https://astro.build/config
export default defineConfig({
  // Production 302-redirects the bare domain to www, so canonicals, og:url and
  // the sitemap all use www. _config.yml had the bare domain, which meant every
  // canonical pointed at a URL that redirected.
  site: 'https://www.sanjaymeena.io',

  // Static site generation only — every page is prerendered into dist/.
  output: 'static',

  // Jekyll emitted directory URLs (/tech/some-post/). Keeping the slash
  // "ignored" means both /tech/foo and /tech/foo/ resolve to the same
  // dist/tech/foo/index.html, so every pre-existing inbound link still works.
  trailingSlash: 'ignore',

  integrations: [
    mdx(),
    sitemap({
      // /404.html is not a real destination, and the paginated archive slices are
      // marked noindex (their posts all appear on the homepage too), so neither
      // belongs in the sitemap.
      filter: (page) => !/\/404\.html$/.test(page) && !/\/page\d+\/?$/.test(page),
    }),
  ],

  markdown: {
    // Astro 7 defaults to the native "Sätteri" processor, which cannot run
    // remark/rehype plugins. remark-math, rehype-katex and remark-toc all need
    // the unified pipeline, so opt into it explicitly via
    // `@astrojs/markdown-remark` (the top-level `markdown.remarkPlugins` form is
    // deprecated in Astro 7).
    processor: unified({
      remarkPlugins: [
        // singleDollarTextMath: false means inline math needs `$$...$$`, which is
        // exactly the delimiter these posts already use (they were written for
        // MathJax). It also keeps a lone `$` — currency in the investing posts —
        // as literal text instead of opening a math span.
        [remarkMath, { singleDollarTextMath: false }],
      ],
      rehypePlugins: [rehypeKatex],
    }),
    shikiConfig: {
      // Dual themes with defaultColor:false make Shiki emit --shiki-light /
      // --shiki-dark per token and apply no colour itself, so global.css can
      // follow the site theme — including a manual data-theme override —
      // instead of the code being pinned to github-light forever.
      themes: { light: 'github-light', dark: 'github-dark' },
      defaultColor: false,
      wrap: true,
    },
  },
});
