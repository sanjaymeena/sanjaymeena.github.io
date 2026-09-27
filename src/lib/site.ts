/**
 * Site-wide constants and taxonomy data, ported from _config.yml, _pages/ and
 * _data/navigation.yml.
 */

export const SITE = {
  title: 'Seeking Wisdom',
  titleSeparator: '-',
  description: 'Blog on Equities, Tech, Books',
  // Production 302-redirects the bare domain to www, so canonicals use www and
  // stop pointing at a URL that redirects. _config.yml had the bare domain.
  url: 'https://www.sanjaymeena.io',
  locale: 'en-US',

  author: {
    name: 'Sanjay Meena',
    bio: 'Machine Learning Engineer',
    location: 'Melbourne, Australia',
    avatar: '/images/bio.jpg',
    email: 'sanjaymeena@gmail.com',
    github: 'sanjaymeena',
    twitter: 'sanjaymeena',
    linkedin: 'sanjay-meena-7546058',
  },

  // _config.yml: words_per_minute
  wordsPerMinute: 200,

  /**
   * Google AdSense, ported from `_config.yml: ads`. Off by default — see
   * adsEnabled() in src/lib/integrations.ts.
   */
  adsense: {
    /** Publisher id as it appears in public/ads.txt; the ad client is `ca-` + this. */
    client: 'pub-8491284845992193',
    slots: {
      inArticle: '6122908108',
      displayBottom: '8104307257',
      // Present in _config.yml, but the Jekyll theme had no include that used
      // them, so they never rendered. Kept so the slot ids are not lost.
      displayTop: '9600254158',
      displayMiddle: '5078555211',
    },
  },

  feed: {
    path: '/feed.xml',
    // _config.yml sets `feed: false` for _posts/tools. jekyll-feed ignored it,
    // which is why the old feed contained nothing but tools announcements.
    excludeCategories: ['tools'],
  },

  pagination: {
    // _config.yml: paginate / paginate_path
    perPage: 10,
    pathPrefix: 'page',
  },
} as const;

export interface CommentsConfig {
  provider: 'giscus';
  /** owner/repo hosting the Discussions — known, not a placeholder. */
  repo: string;
  /** The giscus `data-repo-id`. */
  repoId: string;
  /** Discussion category name; must be the one `categoryId` came from. */
  category: string;
  /** The giscus `data-category-id`. */
  categoryId: string;
  /** How a page maps to a thread. `pathname` keys threads by URL path. */
  mapping: 'pathname' | 'title' | 'og:title' | 'specific' | 'number';
  lang: string;
}

/**
 * Giscus comments, backed by GitHub Discussions on the site repo.
 * Replaces the old Disqus embed (shortname `sanjaymeenaio`).
 *
 * TODO(sanjay): fill in `repoId` and `categoryId`. They come from
 * https://giscus.app once you have:
 *   1. enabled Discussions under repo Settings, and
 *   2. installed the giscus app (https://github.com/apps/giscus) with
 *      Discussions read/write on sanjaymeena/sanjaymeena.github.io.
 * In the configurator choose category "Announcements" (or "General") and mapping
 * "pathname", then copy `data-repo-id` and `data-category-id` here.
 *
 * <Comments /> renders nothing while either ID is empty, so the site ships with
 * comments inert rather than broken. No fabricated IDs are checked in.
 */
export const COMMENTS: CommentsConfig = {
  provider: 'giscus',
  repo: 'sanjaymeena/sanjaymeena.github.io',
  repoId: '',
  category: 'Announcements',
  categoryId: '',
  mapping: 'pathname',
  lang: 'en',
};

export interface Archive {
  /** URL path segment: "tech" publishes at /tech/. */
  path: string;
  /** Lowercased frontmatter category this archive lists. */
  category: string;
  title: string;
  description: string;
  keywords: string[];
  /** Prose shown above the listing, where the Jekyll page body had any. */
  intro?: string;
  /** Hero image, relative to /images/. */
  hero?: string;
}

/**
 * The five category archives from _pages/. The category names are the
 * frontmatter values, which are not the _posts/ directory names and not the URL
 * prefixes either: _posts/book_notes/ carries `categories: [Books]` and publishes
 * at /books/<slug>/, but its archive page is /book_notes/.
 */
export const ARCHIVES: Archive[] = [
  {
    path: 'tech',
    category: 'tech',
    title: 'Tech Posts',
    description:
      'Posts related to Natural Language Processing, Data Science, Deep Learning, Programming',
    keywords: [
      'NLP',
      'natural language processing',
      'deep learning',
      'machine learning',
      'technology',
    ],
    hero: 'machine-learning.jpg',
  },
  {
    path: 'investment_notes',
    category: 'investing',
    title: 'Investment Notes',
    description: 'Section for value investing, financial analysis',
    keywords: ['value investing', 'pharma', 'stocks', 'financial analysis'],
    hero: 'finance.jpg',
  },
  {
    path: 'book_notes',
    category: 'books',
    title: 'Book Notes',
    description:
      'This section is for the book notes i made on books from various disciplines of value investing, psychology etc.',
    keywords: ['value investing', 'behavioural finance', 'psychology'],
    hero: 'book-notes.jpg',
  },
  {
    // _pages/misc.md repeats investment_notes' description/keywords/excerpt keys
    // after its own; Jekyll's YAML takes the last one, so /misc/ currently
    // advertises itself as "Section for value investing, financial analysis".
    // Using the Misc copy that was clearly intended.
    path: 'misc',
    category: 'misc',
    title: 'Miscellaneous Posts',
    description: 'This section is for the Misc posts related to food, travel etc.',
    keywords: ['Food', 'Travel'],
  },
  {
    path: 'tools',
    category: 'tools',
    title: 'Developer Tools',
    description: 'A collection of free online developer tools to help with everyday coding tasks.',
    // _pages/tools.md had this sentence as visible body text above the listing.
    intro: 'A collection of free online developer tools to help with everyday coding tasks.',
    keywords: ['json', 'yaml', 'csv', 'base64', 'url encoder', 'jwt', 'developer tools'],
  },
];

/** The archive page a post's category belongs to, if it has one. */
export function archiveForCategory(category: string): Archive | undefined {
  return ARCHIVES.find((archive) => archive.category === category);
}

/**
 * Where a post's category label links to. `demos` posts have no archive page of
 * their own — /projects/ is the hand-written page that lists them.
 */
export const CATEGORY_LINKS: Record<string, string> = {
  tech: '/tech/',
  investing: '/investment_notes/',
  books: '/book_notes/',
  misc: '/misc/',
  tools: '/tools/',
  demos: '/projects/',
};

/** _data/navigation.yml `main`. */
export const NAV: ReadonlyArray<{ title: string; url: string; external?: boolean }> = [
  { title: 'Investing', url: '/investment_notes/' },
  { title: 'Developer Tools', url: 'https://tools.sanjaymeena.io', external: true },
  { title: 'Books', url: '/book_notes/' },
  { title: 'Tech', url: '/tech/' },
  { title: 'Projects', url: '/projects/' },
  { title: 'Misc', url: '/misc/' },
  { title: 'About', url: '/about/' },
];

/** `_config.yml: title_separator` -> "Page Title - Seeking Wisdom" */
export function pageTitle(title?: string): string {
  if (!title) return SITE.title;
  return `${title} ${SITE.titleSeparator} ${SITE.title}`;
}

/** Whether a post's category is excluded from the RSS feed. */
export function isFeedExcluded(category: string): boolean {
  return (SITE.feed.excludeCategories as readonly string[]).includes(category);
}

/**
 * Author social profile URLs, derived from SITE.author so the footer and the
 * author bio cannot drift apart. No Google+ — that network is gone.
 */
export function socialLinks(): ReadonlyArray<{ label: string; url: string }> {
  const { github, twitter, linkedin } = SITE.author;
  return [
    { label: 'GitHub', url: `https://github.com/${github}` },
    { label: 'Twitter', url: `https://twitter.com/${twitter}` },
    { label: 'LinkedIn', url: `https://www.linkedin.com/in/${linkedin}` },
  ];
}
