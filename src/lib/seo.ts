import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';

/**
 * src/lib/seo.ts — addendum §3 helper. Every page's metadata goes through
 * pageMetadata(); canonicals, OG and the sitemap all derive from SITE.url.
 */
export const SITE = {
  name: siteConfig.name,
  url: siteConfig.url,
  defaultOgImage: '/og/default.png',
  locale: 'en_US',
  twitter: '',
};

export function siteUrl(path = '/'): string {
  const p = path === '/' ? '' : `/${path.replace(/^\/+/, '')}`;
  return `${SITE.url}${p}`;
}

export function pageMetadata(opts: {
  title?: string;
  description: string;
  path: string;
  image?: string;
  type?: 'website' | 'article';
  noindex?: boolean;
}): Metadata {
  const url = siteUrl(opts.path);
  const image = opts.image || SITE.defaultOgImage;
  const ogTitle = opts.title ? `${opts.title} · ${SITE.name}` : `${SITE.name} — ${siteConfig.tagline}`;
  return {
    ...(opts.title ? { title: opts.title } : {}),
    description: opts.description,
    alternates: { canonical: url },
    openGraph: {
      type: opts.type || 'website',
      url,
      siteName: SITE.name,
      title: ogTitle,
      description: opts.description,
      locale: SITE.locale,
      images: [{ url: image, width: 1200, height: 630, alt: `${SITE.name}: ${siteConfig.tagline}` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description: opts.description,
      images: [image],
    },
    ...(opts.noindex ? { robots: { index: false, follow: true } } : {}),
  };
}
