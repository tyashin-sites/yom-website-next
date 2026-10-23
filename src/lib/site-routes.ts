import { solutions } from '@/config/site';

/**
 * ONE source of truth for every indexable route (addendum §3g). Drives
 * /sitemap-pages.xml and /llms.txt. The coverage gate in
 * scripts/check-routes.mjs fails if a page.tsx exists that is missing here.
 */
export interface SiteRoute {
  path: string;
  title: string;
  priority: number;
  changeFrequency: 'weekly' | 'monthly' | 'yearly';
}

export function getSiteRoutes(): SiteRoute[] {
  return [
    { path: '/', title: 'Home', priority: 1, changeFrequency: 'weekly' },
    { path: '/why-yom', title: 'Why YOM', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/product', title: 'Product', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/pricing', title: 'Pricing', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/compare', title: 'Compare', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/developers', title: 'Developers', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/solutions', title: 'Solutions', priority: 0.7, changeFrequency: 'monthly' },
    ...solutions.map((s) => ({
      path: s.href,
      title: s.label,
      priority: 0.8,
      changeFrequency: 'monthly' as const,
    })),
    { path: '/security', title: 'Security', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/faq', title: 'FAQ', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/about', title: 'About', priority: 0.5, changeFrequency: 'yearly' },
    { path: '/contact', title: 'Contact', priority: 0.6, changeFrequency: 'yearly' },
    { path: '/security/disclosure', title: 'Vulnerability disclosure policy', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/terms', title: 'Terms of Service', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/privacy', title: 'Privacy Policy', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/dpa', title: 'Data Processing Addendum', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/acceptable-use', title: 'Acceptable Use Policy', priority: 0.2, changeFrequency: 'yearly' },
    { path: '/cookies', title: 'Cookie Policy', priority: 0.2, changeFrequency: 'yearly' },
    { path: '/subprocessors', title: 'Sub-processors', priority: 0.3, changeFrequency: 'monthly' },
  ];
}
