import type { BlogCategory, BlogPost } from '@/lib/blog';
import { formatPostDate } from '@/lib/blog';

export function categoryName(post: BlogPost, categories: BlogCategory[]): string | undefined {
  return post.categoryId ? categories.find((c) => c.id === post.categoryId)?.name : undefined;
}

function Meta({ post, category }: { post: BlogPost; category?: string }) {
  const parts = [category, post.readTime ? `${post.readTime} min read` : undefined].filter(Boolean);
  return parts.length ? <p className="font-mono text-[0.72rem] uppercase tracking-[0.12em] text-muted">{parts.join(' · ')}</p> : null;
}

/** The first post on page 1: wide, with its image when it has one. */
export function FeaturedPost({ post, categories }: { post: BlogPost; categories: BlogCategory[] }) {
  return (
    <a
      href={`/blog/${post.slug}`}
      className="group grid overflow-hidden rounded-lg border border-border bg-paper transition-colors hover:border-foreground md:grid-cols-[1.1fr_1fr]"
    >
      {post.featuredImage ? (
        <div className="relative aspect-[16/10] bg-surface md:aspect-auto md:min-h-[20rem]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.featuredImage}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            fetchPriority="high"
            decoding="async"
          />
        </div>
      ) : (
        <div aria-hidden="true" className="ink-band hidden md:block">
          <div className="flex h-full flex-col justify-end p-9 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-on-ink-muted">
            <span className="tt-num text-5xl normal-case tracking-normal text-on-ink">{formatPostDate(post.publishedAt).split(',')[0]}</span>
            <span className="mt-2">{formatPostDate(post.publishedAt).split(', ')[1]}</span>
          </div>
        </div>
      )}
      <div className="flex flex-col justify-center p-7 sm:p-10">
        <Meta post={post} category={categoryName(post, categories)} />
        <h2 className="tt-h2 mt-4 text-balance group-hover:text-primary">{post.title}</h2>
        {post.excerpt ? <p className="mt-4 line-clamp-3 text-muted">{post.excerpt}</p> : null}
        <p className="mt-6 font-mono text-[0.78rem] text-muted">
          <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time>
          {post.authorName ? ` · ${post.authorName}` : ''}
        </p>
      </div>
    </a>
  );
}

/** Ledger rows: date column, title, excerpt. Used by the index and "Keep reading". */
export function PostRows({ posts, categories, listProps = {} }: { posts: BlogPost[]; categories: BlogCategory[]; listProps?: Record<string, string> }) {
  return (
    <ol className="rule-top" {...listProps}>
      {posts.map((post) => (
        <li key={post.slug} className="border-b border-border">
          <a href={`/blog/${post.slug}`} className="group grid gap-2 py-7 sm:grid-cols-[10rem_1fr_auto] sm:gap-8">
            <time dateTime={post.publishedAt} className="tt-num pt-1 font-mono text-[0.78rem] text-muted">
              {formatPostDate(post.publishedAt)}
            </time>
            <div className="min-w-0">
              <Meta post={post} category={categoryName(post, categories)} />
              <h3 className="mt-2 font-heading text-[1.65rem] leading-[1.15] text-balance group-hover:text-primary">{post.title}</h3>
              {post.excerpt ? <p className="mt-2 line-clamp-2 max-w-3xl text-muted">{post.excerpt}</p> : null}
            </div>
            <span aria-hidden="true" className="hidden self-center text-muted transition-transform group-hover:translate-x-1 group-hover:text-primary sm:block">
              →
            </span>
          </a>
        </li>
      ))}
    </ol>
  );
}
