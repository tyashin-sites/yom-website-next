import { getSiteRoutes } from '@/lib/site-routes';
import { siteUrl } from '@/lib/seo';

/**
 * /sitemap-pages.xml — the site's own route sitemap (addendum §3g). The
 * platform's /sitemap.xml becomes an index that references this file. Origin
 * = the SAME canonical constant as every <link rel=canonical> (SITE_URL).
 */
export const dynamic = 'force-static';

const esc = (v: string) =>
  v.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');

export function GET(): Response {
  const lastmod = new Date().toISOString().slice(0, 10);
  const urls = getSiteRoutes()
    .map(
      (r) =>
        `  <url>\n    <loc>${esc(siteUrl(r.path))}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${r.changeFrequency}</changefreq>\n    <priority>${r.priority.toFixed(1)}</priority>\n  </url>`,
    )
    .join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  return new Response(xml, {
    headers: { 'content-type': 'application/xml; charset=utf-8', 'cache-control': 'public, max-age=3600, s-maxage=86400' },
  });
}
