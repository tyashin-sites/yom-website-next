import { getCloudflareContext } from '@opennextjs/cloudflare';
import { siteConfig } from '@/config/site';

/**
 * Native blog data (addendum §2 + §3d/§3e/§3g). Posts are written in Tyashin
 * (Blog plugin, Editorial Desk) and read here at request time.
 *
 *  - Gate: `/_tyashin/blog/meta` on the slug host → `{ active, hasPosts }`.
 *    `active` is false until the Blog plugin is installed + enabled, and the
 *    blog stays dormant (empty /blog, 404 posts) until it is true.
 *  - Posts: the public Blog API (`TYASHIN_API_URL`, `X-API-Key`), which also
 *    carries categories. Without the key we fall back to the keyless,
 *    same-origin data API (`/_tyashin/blog/posts`), which has no categories.
 *
 * Every fetch has a 5-minute data-cache TTL. The blog routes render on request
 * rather than through page ISR: this site's OpenNext config has no revalidation
 * queue, so an ISR page would never refresh.
 */

export const BLOG_REVALIDATE = 300;
export const POSTS_PER_PAGE = 12;

export interface BlogPost {
  slug: string;
  title: string;
  excerpt?: string;
  content?: string;
  contentFormat?: 'html' | 'markdown';
  featuredImage?: string;
  authorName?: string;
  categoryId?: string;
  tags: string[];
  pinned?: boolean;
  readTime?: number;
  publishedAt?: string;
  updatedAt?: string;
  seo?: { metaTitle?: string; metaDescription?: string; ogImage?: string };
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface BlogStatus {
  active: boolean;
  hasPosts: boolean;
}

/** Slug host for the blog data API. TYASHIN_BLOG_ORIGIN overrides it for local fixture tests only. */
function dataHost(): string {
  return (process.env.TYASHIN_BLOG_ORIGIN || siteConfig.tyashinHost).replace(/\/+$/, '');
}

function apiEnv(): { url: string; key: string } {
  let e: Record<string, unknown> = {};
  try {
    e = getCloudflareContext().env as Record<string, unknown>;
  } catch {
    /* next build / next start: no Cloudflare context */
  }
  // An explicit process env wins so a local run can point at fixtures; on the
  // Worker both come from the same bindings (wrangler vars + the API key secret).
  const url = (process.env.TYASHIN_API_URL ?? e.TYASHIN_API_URL ?? 'https://website-api.tyashin.com') as string;
  const key = (process.env.TYASHIN_API_KEY ?? e.TYASHIN_API_KEY ?? '') as string;
  return { url: url.replace(/\/+$/, ''), key: typeof key === 'string' ? key : '' };
}

/**
 * Cold platform calls can take 2 to 3 s (an Atlas connect on Tyashin's side),
 * and the YOM router gives the whole page 8 s. Every blog fetch is therefore
 * raced against a deadline: on timeout the page renders without that piece
 * and the fetch keeps running to warm the data cache. The race (not an
 * AbortSignal) keeps Next's fetch cache and dedupe in play.
 */
const FETCH_DEADLINE_MS = 4000;
/** Optional extras (categories, the status check) get a shorter leash. */
const OPTIONAL_DEADLINE_MS = 1500;
/** A definite "no such post" from the API, distinct from an error or timeout. */
const GONE = Object.freeze({ gone: true });

async function getJson<T>(
  url: string,
  init: RequestInit & { next?: { revalidate?: number } } = {},
  deadlineMs = FETCH_DEADLINE_MS,
  notFoundIsAnswer = false,
): Promise<T | null> {
  const run = (async () => {
    try {
      const res = await fetch(url, {
        next: { revalidate: BLOG_REVALIDATE },
        ...init,
        headers: { accept: 'application/json', ...(init.headers || {}) },
      });
      if (res.status === 404 && notFoundIsAnswer) return GONE as T;
      if (!res.ok) return null;
      return (await res.json()) as T;
    } catch {
      return null;
    }
  })();
  let timer: ReturnType<typeof setTimeout> | undefined;
  const deadline = new Promise<null>((resolve) => {
    timer = setTimeout(() => resolve(null), deadlineMs);
  });
  try {
    return await Promise.race([run, deadline]);
  } finally {
    clearTimeout(timer);
  }
}

function normalise(p: Record<string, unknown>): BlogPost | null {
  if (typeof p?.slug !== 'string' || typeof p?.title !== 'string') return null;
  return {
    slug: p.slug,
    title: p.title,
    excerpt: (p.excerpt as string) || undefined,
    content: (p.content as string) || undefined,
    contentFormat: p.contentFormat === 'markdown' ? 'markdown' : 'html',
    featuredImage: (p.featuredImage as string) || undefined,
    authorName: (p.authorName as string) || undefined,
    categoryId: (p.categoryId as string) || undefined,
    tags: Array.isArray(p.tags) ? (p.tags as unknown[]).filter((t): t is string => typeof t === 'string') : [],
    pinned: Boolean(p.pinned),
    readTime: typeof p.readTime === 'number' ? p.readTime : undefined,
    publishedAt: (p.publishedAt as string) || undefined,
    updatedAt: (p.updatedAt as string) || undefined,
    seo: (p.seo as BlogPost['seo']) || undefined,
  };
}

/**
 * Is the Blog plugin on, and is anything published? Never throws. `known` is
 * false when the platform didn't answer in time (a cold /_tyashin hop): the
 * caller then decides from the posts it fetched in parallel.
 */
export async function getBlogStatus(): Promise<BlogStatus & { known: boolean }> {
  const data = await getJson<Partial<BlogStatus>>(`${dataHost()}/_tyashin/blog/meta`, {}, OPTIONAL_DEADLINE_MS);
  return { active: data?.active === true, hasPosts: data?.hasPosts === true, known: data !== null };
}

/** Live = plugin on with posts. If the status call timed out, trust the post list. */
export function blogIsLive(status: BlogStatus & { known: boolean }, postsFound: number): boolean {
  return status.known ? status.active && status.hasPosts : postsFound > 0;
}

/**
 * The same check, frozen at build time. Header, footer, sitemap and llms.txt
 * are static, so they link the blog only once a build has seen a published
 * post (redeploy after the first posts go live). Separate URL so it never
 * shares a cache entry with the request-time check above.
 */
export async function getBlogStatusAtBuild(): Promise<BlogStatus> {
  const data = await getJson<Partial<BlogStatus>>(`${dataHost()}/_tyashin/blog/meta?at=build`, {
    cache: 'force-cache',
    next: {},
  });
  return { active: data?.active === true, hasPosts: data?.hasPosts === true };
}

export async function listPosts(opts: { page?: number; category?: string; limit?: number } = {}): Promise<{
  posts: BlogPost[];
  total: number;
  totalPages: number;
  page: number;
}> {
  const page = Math.max(1, Math.floor(opts.page || 1));
  const limit = opts.limit || POSTS_PER_PAGE;
  const { url, key } = apiEnv();
  type Out = { posts: BlogPost[]; total: number; totalPages: number; page: number };
  const empty: Out = { posts: [], total: 0, totalPages: 1, page };

  if (key) {
    const q = new URLSearchParams({ page: String(page), limit: String(limit) });
    if (opts.category) q.set('category', opts.category);
    const json = await getJson<{ data?: Record<string, unknown>[]; meta?: { total?: number; totalPages?: number } }>(
      `${url}/api/v1/public/blog/posts?${q}`,
      { headers: { 'X-API-Key': key } },
    );
    if (json) {
      const posts = (json.data || []).map(normalise).filter((p): p is BlogPost => p !== null);
      return { posts, total: json.meta?.total ?? posts.length, totalPages: Math.max(1, json.meta?.totalPages ?? 1), page };
    }
  }
  if (opts.category) return empty; // the keyless API cannot filter by category
  const json = await getJson<{ posts?: Record<string, unknown>[]; total?: number; totalPages?: number }>(
    `${dataHost()}/_tyashin/blog/posts?page=${page}&limit=${limit}`,
  );
  if (!json) return empty;
  const posts = (json.posts || []).map(normalise).filter((p): p is BlogPost => p !== null);
  return { posts, total: json.total ?? posts.length, totalPages: Math.max(1, json.totalPages ?? 1), page };
}

export async function getPost(slug: string): Promise<BlogPost | null> {
  if (!/^[a-z0-9][a-z0-9-]{0,190}$/i.test(slug)) return null;
  const { url, key } = apiEnv();
  if (key) {
    const json = await getJson<{ data?: Record<string, unknown>; gone?: true }>(
      `${url}/api/v1/public/blog/posts/${slug}`,
      { headers: { 'X-API-Key': key } },
      FETCH_DEADLINE_MS,
      true,
    );
    if (json?.data) return normalise(json.data);
    // The API answered "no such post": that's final. Only an error or a
    // timeout falls back to the keyless API (a second cold hop).
    if (json?.gone) return null;
  }
  const json = await getJson<{ post?: Record<string, unknown> | null }>(
    `${dataHost()}/_tyashin/blog/posts/${slug}`,
  );
  return json?.post ? normalise(json.post) : null;
}

export async function listCategories(): Promise<BlogCategory[]> {
  const { url, key } = apiEnv();
  if (!key) return [];
  // Not edge-cached on the platform, so a cold call costs a Mongo connect; the
  // chips are optional, so they get the short deadline.
  const json = await getJson<{ data?: BlogCategory[] }>(
    `${url}/api/v1/public/blog/categories`,
    { headers: { 'X-API-Key': key } },
    OPTIONAL_DEADLINE_MS,
  );
  return (json?.data || []).filter((c) => c && c.id && c.name && c.slug);
}

/** Up to `count` other posts, most shared tags first, then newest (mirrors the platform blog). */
export function pickRelated(current: BlogPost, candidates: BlogPost[], count = 3): BlogPost[] {
  const mine = new Set(current.tags.map((t) => t.toLowerCase()));
  return candidates
    .filter((p) => p.slug !== current.slug)
    .map((p, i) => ({ p, i, overlap: p.tags.filter((t) => mine.has(t.toLowerCase())).length }))
    .sort((a, b) => b.overlap - a.overlap || a.i - b.i)
    .slice(0, count)
    .map((x) => x.p);
}

function clampAtWord(text: string, max: number): string {
  const t = text.trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max - 1);
  const space = cut.lastIndexOf(' ');
  return `${(space > max * 0.6 ? cut.slice(0, space) : cut).replace(/[\s,;:.-]+$/, '')}…`;
}

export function stripHtml(html: string): string {
  return html
    .replace(/<(script|style)[\s\S]*?<\/\1>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Title + description for a post, resolved once so the <title>, OG card and
 * JSON-LD agree. Same rules as the platform blog: a metaTitle that is only a
 * truncated prefix of the title loses to the title; WordPress "[…]" excerpts
 * are ignored.
 */
export function postSeo(post: BlogPost): { title: string; description: string } {
  const full = post.title.trim();
  const meta = (post.seo?.metaTitle || '').trim();
  const truncated = Boolean(meta) && meta.length < full.length && full.startsWith(meta.replace(/\s*…\s*$/, '').trim());
  const title = (!meta || truncated ? full : meta) || 'Article';
  const auto = (s: string) => /\[\s*(?:…|\.\.\.|&hellip;)\s*\]\s*$/.test(s);
  const md = (post.seo?.metaDescription || '').trim();
  const ex = (post.excerpt || '').trim();
  const description = (md && !auto(md) ? md : '') || (ex && !auto(ex) ? ex : '') || clampAtWord(stripHtml(post.content || ''), 155);
  return { title, description: clampAtWord(description, 300) };
}

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Small Markdown subset for posts stored as markdown (headings, lists, quotes, links, emphasis, code). */
export function markdownToHtml(md: string): string {
  const inline = (s: string) =>
    esc(s)
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/!\[([^\]]*)\]\(([^)\s]+)\)/g, '<img src="$2" alt="$1" loading="lazy">')
      .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '<a href="$2">$1</a>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/(^|[^*])\*([^*]+)\*/g, '$1<em>$2</em>');
  const out: string[] = [];
  let list: 'ul' | 'ol' | null = null;
  let para: string[] = [];
  const flush = () => {
    if (para.length) out.push(`<p>${inline(para.join(' '))}</p>`);
    para = [];
  };
  const close = () => {
    if (list) out.push(`</${list}>`);
    list = null;
  };
  for (const raw of md.replace(/\r\n/g, '\n').split('\n')) {
    const line = raw.trimEnd();
    const h = line.match(/^(#{1,4})\s+(.*)$/);
    const ul = line.match(/^\s*[-*]\s+(.*)$/);
    const ol = line.match(/^\s*\d+[.)]\s+(.*)$/);
    if (!line.trim()) {
      flush();
      close();
    } else if (h) {
      flush();
      close();
      const level = Math.min(4, h[1].length + 1); // the page owns the h1
      out.push(`<h${level}>${inline(h[2])}</h${level}>`);
    } else if (ul || ol) {
      flush();
      const kind = ul ? 'ul' : 'ol';
      if (list !== kind) {
        close();
        out.push(`<${kind}>`);
        list = kind;
      }
      out.push(`<li>${inline((ul || ol)![1])}</li>`);
    } else if (line.startsWith('>')) {
      flush();
      close();
      out.push(`<blockquote><p>${inline(line.replace(/^>\s?/, ''))}</p></blockquote>`);
    } else {
      close();
      para.push(line.trim());
    }
  }
  flush();
  close();
  return out.join('\n');
}

/**
 * Post bodies come from the project's own CMS, but they are still rendered as
 * raw HTML, so strip anything executable: script/style/iframe/object/embed/
 * form elements, inline event handlers and javascript: URLs. A body <h1> is
 * demoted (the page title is the only h1).
 */
export function sanitizePostHtml(html: string): string {
  return html
    .replace(/<(script|style|iframe|object|embed|form|noscript|template)\b[\s\S]*?<\/\1\s*>/gi, '')
    .replace(/<(script|style|iframe|object|embed|form|link|meta|base)\b[^>]*\/?>/gi, '')
    .replace(/\s+on[a-z]+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, '')
    .replace(/(href|src|xlink:href|action)\s*=\s*(["']?)\s*(?:javascript|vbscript|data:text\/html)[^"'\s>]*\2/gi, '$1="#removed"')
    .replace(/<h1(\s[^>]*)?>/gi, '<h2$1>')
    .replace(/<\/h1>/gi, '</h2>');
}

export function postBodyHtml(post: BlogPost): string {
  const raw = post.content || '';
  return sanitizePostHtml(post.contentFormat === 'markdown' ? markdownToHtml(raw) : raw);
}

export function formatPostDate(iso?: string): string {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
}
