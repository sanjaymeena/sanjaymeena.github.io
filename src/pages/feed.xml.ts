import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPublishedList } from '../lib/posts';
import { SITE, isFeedExcluded } from '../lib/site';

/**
 * Replaces jekyll-feed at the same path, /feed.xml.
 *
 * Two deliberate changes from the old feed:
 * - It was Atom; this is RSS 2.0, which is what @astrojs/rss emits. Feed readers
 *   detect both, but the `type` on the autodiscovery <link> changes accordingly.
 * - jekyll-feed's default limit of 10 meant the feed contained nothing but the
 *   eleven tools pages, and it ignored the `feed: false` that _config.yml sets
 *   for _posts/tools. This emits every published post except tools.
 */
export async function GET(context: APIContext) {
  const posts = await getPublishedList();
  const site = context.site ?? new URL(SITE.url);
  const feedUrl = new URL(SITE.feed.path, site).toString();

  return rss({
    title: SITE.title,
    description: SITE.description,
    site,
    xmlns: { atom: 'http://www.w3.org/2005/Atom' },
    // The old Atom feed carried a self link; feed validators warn when an RSS 2.0
    // channel omits it.
    customData: [
      `<atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />`,
      `<language>en-us</language>`,
      `<managingEditor>${SITE.author.email} (${SITE.author.name})</managingEditor>`,
      `<webMaster>${SITE.author.email} (${SITE.author.name})</webMaster>`,
    ].join(''),
    items: posts
      .filter((post) => !isFeedExcluded(post.category))
      .map((post) => ({
        title: post.title,
        description: post.excerpt,
        pubDate: post.date,
        link: new URL(post.url, site).toString(),
        categories: post.tags,
        author: SITE.author.email,
      })),
  });
}
