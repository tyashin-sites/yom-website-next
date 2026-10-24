import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { pageMetadata, siteUrl } from '@/lib/seo';
import { cache } from 'react';
import { formatPostDate, getBlogStatus, getPost, listCategories, listPosts, pickRelated, postBodyHtml, postSeo } from '@/lib/blog';
import { JsonLd } from '@/components/ui/JsonLd';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { CtaBand } from '@/components/ui/CtaBand';
import { PostRows, categoryName } from '@/components/blog/PostList';

/*
 * /blog/[slug] — one post from the Tyashin Blog plugin. Rendered per request
 * (data cached 5 min). 404 while the blog is dormant or the slug isn't
 * published. Posts are not in /sitemap-pages.xml: the platform lists them in
 * /sitemap-content.xml (addendum §3g).
 */
export const dynamic = 'force-dynamic';

type Params = Promise<{ slug: string }>;

/** Status, the post, related candidates and categories in parallel; shared by metadata and page. */
const load = cache(async (slug: string) => {
  const [status, post, recent, categories] = await Promise.all([
    getBlogStatus(),
    getPost(slug),
    listPosts({ limit: 24 }),
    listCategories(),
  ]);
  // Plugin switched off → dormant, even if the API still has the row.
  if (!post || (status.known && !status.active)) return null;
  return { post, recent: recent.posts, categories };
});

function absolute(src?: string): string | undefined {
  if (!src) return undefined;
  return /^https?:\/\//.test(src) ? src : siteUrl(src);
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const post = (await load(slug))?.post;
  if (!post) return { title: 'Article not found', robots: { index: false, follow: true } };
  const { title, description } = postSeo(post);
  const meta = pageMetadata({
    title,
    description,
    path: `/blog/${post.slug}`,
    image: absolute(post.seo?.ogImage || post.featuredImage),
    type: 'article',
  });
  return {
    ...meta,
    openGraph: {
      ...meta.openGraph,
      type: 'article',
      ...(post.publishedAt ? { publishedTime: post.publishedAt } : {}),
      ...(post.updatedAt ? { modifiedTime: post.updatedAt } : {}),
      ...(post.authorName ? { authors: [post.authorName] } : {}),
      ...(post.tags.length ? { tags: post.tags } : {}),
    },
    alternates: { ...meta.alternates, types: { 'application/rss+xml': [{ url: '/blog/rss.xml', title: 'YOM blog' }] } },
  };
}

export default async function BlogPost({ params }: { params: Params }) {
  const { slug } = await params;
  const loaded = await load(slug);
  if (!loaded) notFound();
  const { post, recent, categories } = loaded;
  const related = pickRelated(post, recent);
  const { description } = postSeo(post);
  const category = categoryName(post, categories);
  const body = postBodyHtml(post);
  // Generated posts often inline the featured image at the top of the body.
  const hero = post.featuredImage && !(post.content || '').includes(post.featuredImage) ? post.featuredImage : undefined;
  const meta = [post.authorName, post.readTime ? `${post.readTime} min read` : undefined].filter(Boolean).join(' · ');

  return (
    <>
      <JsonLd
        page={{
          path: `/blog/${post.slug}`,
          title: post.title,
          description,
          crumbs: [
            { name: 'Blog', path: '/blog' },
            { name: post.title, path: `/blog/${post.slug}` },
          ],
          article: {
            headline: post.title,
            description,
            image: absolute(post.seo?.ogImage || post.featuredImage),
            datePublished: post.publishedAt,
            dateModified: post.updatedAt,
            authorName: post.authorName,
            keywords: post.tags,
            section: category,
          },
        }}
      />

      <article>
        <header className="container-y pt-10 pb-10 sm:pt-14">
          <Breadcrumbs
            trail={[
              { name: 'Blog', path: '/blog' },
              { name: post.title, path: `/blog/${post.slug}` },
            ]}
          />
          <div className="mt-10 max-w-3xl">
            {category ? <p className="eyebrow">{category}</p> : null}
            <h1 className="tt-h1 mt-4 text-balance">{post.title}</h1>
            {post.excerpt ? <p className="tt-lead mt-6 text-pretty">{post.excerpt}</p> : null}
            <p className="mt-7 font-mono text-[0.78rem] text-muted">
              <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time>
              {meta ? ` · ${meta}` : ''}
            </p>
          </div>
        </header>

        {hero ? (
          <div className="container-y">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={hero}
              alt=""
              className="aspect-[16/9] w-full max-w-5xl rounded-lg border border-border object-cover"
              fetchPriority="high"
              decoding="async"
            />
          </div>
        ) : null}

        <div className="container-y pt-10 pb-16">
          <div className="prose-y post-body max-w-3xl" dangerouslySetInnerHTML={{ __html: body }} />
          {post.tags.length ? (
            <ul aria-label="Tags" className="mt-10 flex max-w-3xl flex-wrap gap-2 border-t border-border pt-6">
              {post.tags.map((t) => (
                <li key={t} className="rounded-full border border-border px-3 py-1 font-mono text-[0.72rem] text-muted">
                  {t}
                </li>
              ))}
            </ul>
          ) : null}
          <p className="mt-10">
            <a href="/blog" className="link-arrow text-sm">
              ← All articles
            </a>
          </p>
        </div>
      </article>

      {related.length ? (
        <section aria-labelledby="related-h" className="bg-surface">
          <div className="container-y section-tight">
            <p className="eyebrow">Keep reading</p>
            <h2 id="related-h" className="tt-h2 mt-4">
              More from the blog
            </h2>
            <div className="mt-10">
              <PostRows posts={related} categories={categories} />
            </div>
          </div>
        </section>
      ) : null}

      <CtaBand />
    </>
  );
}
