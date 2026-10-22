import type { NextConfig } from 'next';
import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';

initOpenNextCloudflareForDev();

// The project's Tyashin slug host — where the platform serves its own paths.
// In production through Tyashin dispatch these rewrites are no-ops (dispatch
// intercepts first); they only matter for direct *.workers.dev access.
const SLUG_HOST = 'https://yom-website.sites.tyashin.com';

const nextConfig: NextConfig = {
  typescript: { ignoreBuildErrors: false },
  eslint: { ignoreDuringBuilds: true },
  poweredByHeader: false,
  env: {
    // Build-time constants (inlined). SITE_URL is the canonical origin used by
    // metadataBase, canonicals, the sitemap and JSON-LD — one source.
    NEXT_PUBLIC_SITE_URL: process.env.SITE_URL || 'https://yom-website.sites.tyashin.com',
    NEXT_PUBLIC_PROJECT_ID: process.env.PROJECT_ID || '',
  },
  async rewrites() {
    return [
      { source: '/brand-kit.css', destination: `${SLUG_HOST}/brand-kit.css` },
      { source: '/tyashin-runtime.js', destination: `${SLUG_HOST}/tyashin-runtime.js` },
      { source: '/sitemap.xml', destination: `${SLUG_HOST}/sitemap.xml` },
      { source: '/robots.txt', destination: `${SLUG_HOST}/robots.txt` },
      { source: '/blog/rss.xml', destination: `${SLUG_HOST}/blog/rss.xml` },
      { source: '/rss.xml', destination: `${SLUG_HOST}/rss.xml` },
      { source: '/feed', destination: `${SLUG_HOST}/feed` },
      { source: '/feed.xml', destination: `${SLUG_HOST}/feed.xml` },
    ];
  },
};

export default nextConfig;
