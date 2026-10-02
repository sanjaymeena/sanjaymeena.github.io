import { getCollection, type CollectionEntry } from 'astro:content';
import { SITE } from './site';
import { getStandalonePosts } from './standalone';

export type Post = CollectionEntry<'blog'>;

/**
 * A post as a listing needs it. Both Markdown posts and the two standalone
 * Jupyter HTML exports appear in the homepage and archive lists, so listings are
 * driven by this shape rather than by `Post`.
 */
export interface ListedPost {
  title: string;
  url: string;
  date: Date;
  excerpt: string;
  /** Lowercased frontmatter category, e.g. "books", "investing". */
  category: string;
  tags: string[];
}

/** Every post URL on this site is `/<slug>/`, taken verbatim from frontmatter. */
export function postUrl(post: Post): string {
  return `/${post.data.slug}/`;
}

/** Newest first, drafts excluded. */
export async function getPublishedPosts(): Promise<Post[]> {
  const posts = await getCollection('blog', (entry) => !entry.data.draft);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

/** Oldest first, matching Jekyll's `{% for post in site.posts reversed %}`. */
export function chronological(posts: Post[]): Post[] {
  return [...posts].sort((a, b) => a.data.date.valueOf() - b.data.date.valueOf());
}

export async function getSeriesPosts(series: string): Promise<Post[]> {
  const posts = await getCollection(
    'blog',
    (entry) => !entry.data.draft && entry.data.series === series,
  );
  return chronological(posts);
}

/**
 * Everything a list view needs, newest first, Markdown posts and standalone HTML
 * posts together. Jekyll's `site.posts` included both.
 */
export async function getPublishedList(): Promise<ListedPost[]> {
  const posts = await getPublishedPosts();
  const merged: ListedPost[] = posts.map((post) => ({
    title: post.data.title,
    url: postUrl(post),
    date: post.data.date,
    excerpt: listExcerpt(post.data.excerpt, post.data.description),
    category: post.data.categories[0] ?? archiveOf(post),
    tags: post.data.tags,
  }));

  for (const entry of getStandalonePosts()) {
    merged.push({
      title: entry.title,
      url: `/${entry.slug}/`,
      date: new Date(entry.date),
      excerpt: listExcerpt(entry.excerpt, entry.description),
      category: entry.categories[0] ?? entry.slug.split('/')[0] ?? '',
      tags: entry.tags,
    });
  }

  return merged.sort((a, b) => b.date.valueOf() - a.date.valueOf());
}

/** Jekyll used the frontmatter `excerpt` in lists, falling back to `description`. */
function listExcerpt(excerpt: string, description: string): string {
  return excerpt || description;
}

export async function getPostsByCategory(category: string): Promise<ListedPost[]> {
  const all = await getPublishedList();
  return all.filter((post) => post.category === category);
}

/**
 * Tags that place a post in the AI/ML Engineering lane (/ai/). Matching is case-
 * and separator-insensitive (see normalizeTag) because the existing frontmatter
 * is inconsistent: "NLP"/"nlp", "Deep Learning"/"deep-learning", "Sentiment"/
 * "Sentiment Analysis". New AI/ML/engineering posts — including Kubernetes/MLOps
 * framed via ML — should carry one of these tags so they surface in the lane.
 */
export const AI_ML_TAGS = [
  'NLP',
  'Deep Learning',
  'Machine Learning',
  'Neural Networks',
  'Statistics',
  'Word Embeddings',
  'Sentiment',
  'Sentiment Analysis',
] as const;

/** Lowercase with hyphens/underscores folded to spaces, so "Deep Learning" == "deep-learning". */
function normalizeTag(tag: string): string {
  return tag.trim().toLowerCase().replace(/[-_]+/g, ' ');
}

/**
 * Published posts whose tags intersect `tagSet`, newest first. Tag comparison is
 * case- and separator-insensitive. Generic and reusable — the AI/ML lane adds the
 * `ai`-category rule on top via getAiMlPosts().
 */
export async function getPostsByTags(tagSet: readonly string[]): Promise<ListedPost[]> {
  const wanted = new Set(tagSet.map(normalizeTag));
  const all = await getPublishedList();
  return all.filter((post) => post.tags.some((tag) => wanted.has(normalizeTag(tag))));
}

/**
 * The AI/ML Engineering lane: every post matching AI_ML_TAGS, plus anything in a
 * new `ai` category (forward-looking — no such post exists yet). Tag-driven on
 * purpose so the existing ML posts keep their current /tech/ URLs; changing a
 * post's `categories` would change its permalink and 404 the indexed URL.
 */
export async function getAiMlPosts(): Promise<ListedPost[]> {
  const all = await getPublishedList();
  const wanted = new Set(AI_ML_TAGS.map(normalizeTag));
  return all.filter(
    (post) =>
      post.tags.some((tag) => wanted.has(normalizeTag(tag))) || normalizeTag(post.category) === 'ai',
  );
}

/** Groups a newest-first list into `{ year, posts }` buckets, newest year first. */
export function groupByYear(posts: ListedPost[]): Array<{ year: number; posts: ListedPost[] }> {
  const groups: Array<{ year: number; posts: ListedPost[] }> = [];
  for (const post of posts) {
    const year = post.date.getUTCFullYear();
    const last = groups[groups.length - 1];
    if (last && last.year === year) last.posts.push(post);
    else groups.push({ year, posts: [post] });
  }
  return groups;
}

/**
 * Tag index: every tag with its posts, sorted the way the Jekyll /tags/ page was
 * (`| sort` on the tag string, which is ASCII order — uppercase before lowercase).
 */
export async function getTags(): Promise<Array<{ tag: string; posts: ListedPost[] }>> {
  const all = await getPublishedList();
  const byTag = new Map<string, ListedPost[]>();
  for (const post of all) {
    for (const tag of post.tags) {
      const list = byTag.get(tag);
      if (list) list.push(post);
      else byTag.set(tag, [post]);
    }
  }
  return [...byTag.entries()]
    .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))
    .map(([tag, posts]) => ({ tag, posts }));
}

/**
 * Fragment id for a tag, matching Liquid's `cgi_escape` used by the old
 * /tags/ page: "Deep Learning" -> "Deep+Learning". Preserves existing
 * /tags/#Deep+Learning deep links.
 */
export function tagAnchor(tag: string): string {
  return encodeURIComponent(tag).replace(/%20/g, '+');
}

export interface AdjacentLink {
  url: string;
  title: string;
}

/**
 * Chronologically adjacent published posts, for `rel=prev`/`rel=next`.
 * Matches jekyll-seo-tag: `next` is the newer post, `prev` the older one.
 */
export async function getAdjacentPosts(
  url: string,
): Promise<{ prev?: AdjacentLink; next?: AdjacentLink }> {
  const all = await getPublishedList(); // newest first
  const at = all.findIndex((post) => post.url === url);
  if (at === -1) return {};
  const pick = (post?: ListedPost): AdjacentLink | undefined =>
    post ? { url: post.url, title: post.title } : undefined;
  return { next: pick(all[at - 1]), prev: pick(all[at + 1]) };
}

/**
 * The archive a post belongs to, i.e. the first segment of its URL:
 * "tech/nlp/foo" -> "tech", "books/foo" -> "books".
 */
export function archiveOf(post: Post): string {
  return post.data.slug.split('/')[0] ?? '';
}

export function readingTimeMinutes(body: string | undefined): number {
  const words = (body ?? '').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / SITE.wordsPerMinute));
}

/** "September 15, 2013" — the format Minimal Mistakes rendered on post pages. */
export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

/** "15 Sep" — the format the Jekyll list views used (`date:"%d %b"`). */
export function formatDateShort(date: Date): string {
  return date
    .toLocaleDateString('en-GB', { day: '2-digit', month: 'short', timeZone: 'UTC' })
    .replace(/^0/, '');
}
