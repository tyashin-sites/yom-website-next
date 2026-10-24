import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { cache } from 'react';
import { blogIsLive, getBlogStatus, listCategories, listPosts } from '@/lib/blog';
import { JsonLd } from '@/components/ui/JsonLd';
import { PageHero } from '@/components/ui/PageHero';
import { GhostLink } from '@/components/ui/Cta';
import { CtaBand } from '@/components/ui/CtaBand';
import { FeaturedPost, PostRows } from '@/components/blog/PostList';
import { LoadMore } from '@/components/blog/LoadMore';

/*
 * /blog — native index over the Tyashin Blog plugin (src/lib/blog.ts).
 * Rendered per request (data cached 5 min). Dormant until the plugin is on and
 * a post is published: an empty, noindex page, never an error. The platform's
 * own /blog must be switched to `storefront` ownership for this route to serve
 * (docs/BLOG.md).
 */
export const dynamic = 'force-dynamic';

const TITLE = 'Blog';
const DESCRIPTION =
  'Notes on first-party analytics for US and Canadian teams: consent enforcement, conversion counts that match your orders, and what changed in GA4.';

type Search = Promise<{ page?: string; category?: string }>;

function parse(sp: { page?: string; category?: string }) {
  const page = Math.max(1, parseInt(sp.page || '1', 10) || 1);
  const category = sp.category && /^[a-z0-9-]{1,80}$/i.test(sp.category) ? sp.category : undefined;
  return { page, category };
}

/** Status, posts and categories in parallel (one cold platform hop, not three in a row). Shared by metadata and page. */
const loadIndex = cache(async (page: number, category: string | undefined) => {
  const [status, list, categories] = await Promise.all([getBlogStatus(), listPosts({ page, category }), listCategories()]);
  const live = blogIsLive(status, list.total);
  return { status, live, posts: live ? list.posts : [], totalPages: live ? list.totalPages : 1, categories: live ? categories : [] };
});

export async function generateMetadata({ searchParams }: { searchParams: Search }): Promise<Metadata> {
  const { page, category } = parse(await searchParams);
  const { live } = await loadIndex(page, category);
  const path = page > 1 && !category ? `/blog?page=${page}` : '/blog';
  const meta = pageMetadata({
    title: page > 1 ? `${TITLE}, page ${page}` : TITLE,
    description: DESCRIPTION,
    path,
    // Dormant, or a category filter (a view of /blog, not its own page).
    noindex: !live || Boolean(category),
  });
  return live ? { ...meta, alternates: { ...meta.alternates, types: { 'application/rss+xml': [{ url: '/blog/rss.xml', title: 'YOM blog' }] } } } : meta;
}

export default async function BlogIndex({ searchParams }: { searchParams: Search }) {
  const { page, category } = parse(await searchParams);
  const { live, posts, totalPages, categories } = await loadIndex(page, category);

  const featured = page === 1 && !category ? posts[0] : undefined;
  const rows = featured ? posts.slice(1) : posts;
  const activeCategory = categories.find((c) => c.slug === category);
  const qs = (p: number) => {
    const q = new URLSearchParams();
    if (category) q.set('category', category);
    if (p > 1) q.set('page', String(p));
    const s = q.toString();
    return s ? `/blog?${s}` : '/blog';
  };

  return (
    <>
      <JsonLd
        page={{
          path: '/blog',
          title: TITLE,
          description: DESCRIPTION,
          type: 'CollectionPage',
          crumbs: [{ name: TITLE, path: '/blog' }],
          items: posts.map((p) => ({ name: p.title, path: `/blog/${p.slug}` })),
        }}
      />
      <PageHero
        eyebrow="Blog"
        title="Notes on measurement you can check."
        lead="How first-party analytics works in practice for teams in the US and Canada: consent signals, conversion counts that match your orders, and what changed in GA4."
        trail={[{ name: TITLE, path: '/blog' }]}
      />

      <section className="container-y pb-20" aria-label="Articles">
        {!live || posts.length === 0 ? (
          <div className="card max-w-3xl p-8 sm:p-10">
            <h2 className="tt-h3">{category ? 'No articles are filed here yet.' : 'No articles are published yet.'}</h2>
            <p className="mt-3 max-w-xl text-muted">
              Until they&rsquo;re up, the cited case for first-party measurement is on Why YOM, and the comparison with
              GA4, Mixpanel and Segment is on Compare.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <GhostLink href={category ? '/blog' : '/why-yom'}>{category ? 'All articles' : 'Why YOM'}</GhostLink>
              <GhostLink href="/compare">Compare</GhostLink>
            </div>
          </div>
        ) : (
          <>
            {categories.length > 1 ? (
              <nav aria-label="Categories" className="mb-10">
                <ul className="flex flex-wrap gap-2">
                  {[{ slug: '', name: 'All' }, ...categories].map((c) => {
                    const on = (c.slug || undefined) === category;
                    return (
                      <li key={c.slug || 'all'}>
                        <a
                          href={c.slug ? `/blog?category=${c.slug}` : '/blog'}
                          aria-current={on ? 'page' : undefined}
                          className={`inline-block rounded-full border px-3.5 py-1.5 text-sm ${on ? 'border-foreground text-foreground' : 'border-border text-muted hover:border-foreground hover:text-foreground'}`}
                        >
                          {c.name}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            ) : null}
            {activeCategory?.description ? <p className="tt-lead mb-10 max-w-2xl">{activeCategory.description}</p> : null}

            {featured ? <FeaturedPost post={featured} categories={categories} /> : null}
            {rows.length ? (
              <div className={featured ? 'mt-14' : ''}>
                <PostRows posts={rows} categories={categories} listProps={{ 'data-blog-list': '' }} />
              </div>
            ) : (
              <ol data-blog-list="" />
            )}

            {totalPages > 1 ? (
              <nav aria-label="Pagination" data-blog-pager="" className="mt-12 flex flex-wrap items-center justify-between gap-4 font-mono text-[0.8rem] text-muted">
                {page > 1 ? (
                  <a href={qs(page - 1)} className="link-arrow" rel="prev">
                    ← Newer
                  </a>
                ) : (
                  <span />
                )}
                <span className="tt-num">
                  Page {page} of {totalPages}
                </span>
                {page < totalPages ? (
                  <a href={qs(page + 1)} className="link-arrow" rel="next" data-blog-next="">
                    Older →
                  </a>
                ) : (
                  <span />
                )}
              </nav>
            ) : null}
            <LoadMore />
          </>
        )}
      </section>

      <CtaBand />
    </>
  );
}
