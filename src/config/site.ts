/**
 * src/config/site.ts — THE single source of brand + contact strings
 * (addendum: all brand strings in ONE file). Every hard fact here comes from
 * the build brief; anything not supplied is a placeholder tracked in
 * docs/ASSET-DEBT.md. Never hard-code any of these values elsewhere.
 */

export const siteConfig = {
  name: 'YOM',
  longName: 'Your Own Metrics',
  /** One line, used for <meta description> defaults and llms.txt. */
  tagline: 'The measurement layer you can prove.',
  description:
    'YOM (Your Own Metrics) is first-party, consent-aware analytics. Conversion counts are exact and reconcile with your order system, collection stays cookieless after an opt-out, and one org can serve many clients.',

  /** Canonical origin — build-time env (SITE_URL). Production domain decided 2026-10-23. */
  url: (process.env.NEXT_PUBLIC_SITE_URL || 'https://yom.aapastech.com').replace(/\/+$/, ''),
  /** Tyashin project id — build-time env (PROJECT_ID). Placeholder: ASSET-DEBT #1. */
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID || '',
  projectSlug: 'yom-website',
  /**
   * The project's Tyashin slug host. The platform serves its own paths here
   * (robots, sitemap, RSS, brand kit) and the same-origin blog data API
   * (/_tyashin/blog/*), resolving the project from this hostname.
   */
  tyashinHost: 'https://yom-website-mvlhzjda.sites.tyashin.com',

  company: {
    builder: 'Aapastech',
    legalName: '14818032 Canada Inc.',
    hq: { city: 'Burlington', region: 'Ontario', regionCode: 'ON', country: 'CA', countryName: 'Canada' },
  },

  contact: {
    phone: '+1 437 800 0190',
    phoneHref: 'tel:+14378000190',
    email: 'contact@aapastech.com',
  },

  /**
   * The dashboard shares this host: the yom.aapastech.com path router sends
   * these paths (and everything in src/config/router-paths.json) to the app.
   * Relative on purpose — same host, never owned by this site.
   */
  app: {
    signUp: '/signup',
    logIn: '/login',
  },

  /** Real SDK facts (npm `latest`, verified 2026-10-23). */
  sdk: {
    package: '@yourownmetric/sdk',
    version: '0.3.0',
    ingestUrl: 'https://ingest.yourownmetrics.aapastech.com',
  },

  cta: {
    primary: 'Start free, no credit card',
  },

  /** Social profiles — none supplied (ASSET-DEBT #7). Empty array = omit sameAs. */
  sameAs: [] as string[],
} as const;

export type NavItem = { label: string; href: string };

export const primaryNav: NavItem[] = [
  { label: 'Product', href: '/product' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'Why YOM', href: '/why-yom' },
  { label: 'Compare', href: '/compare' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Developers', href: '/developers' },
];

export const solutions = [
  {
    slug: 'ecommerce',
    label: 'E-commerce & DTC',
    href: '/solutions/ecommerce',
    blurb: 'Purchase counts that match your order system, deduplicated on the order ID.',
  },
  {
    slug: 'agencies',
    label: 'Agencies',
    href: '/solutions/agencies',
    blurb: 'One org, every client as a scoped sub-tenant, keys and embed tokens per client.',
  },
  {
    slug: 'platforms',
    label: 'SaaS platforms',
    href: '/solutions/platforms',
    blurb: 'Per-customer analytics you can embed in your product and re-bill by usage.',
  },
  {
    slug: 'regulated',
    label: 'Privacy-sensitive teams',
    href: '/solutions/regulated',
    blurb: 'Cookieless by default, GPC honoured, PII scrubbed, path-only URLs.',
  },
] as const;

/** Shown in the header and footer only once a build has seen a published post. */
export const blogNavItem: NavItem = { label: 'Blog', href: '/blog' };

export function withBlog(items: NavItem[], hasPosts: boolean): NavItem[] {
  return hasPosts ? [...items, blogNavItem] : items;
}

export const footerNav: { heading: string; links: NavItem[] }[] = [
  {
    heading: 'Product',
    links: [
      { label: 'Overview', href: '/product' },
      { label: 'Exact conversions', href: '/product#conversions' },
      { label: 'Consent & privacy', href: '/product#privacy' },
      { label: 'Multi-tenant', href: '/product#multi-tenant' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Developers', href: '/developers' },
    ],
  },
  {
    heading: 'Solutions',
    links: [
      { label: 'All solutions', href: '/solutions' },
      { label: 'E-commerce & DTC', href: '/solutions/ecommerce' },
      { label: 'Agencies', href: '/solutions/agencies' },
      { label: 'SaaS platforms', href: '/solutions/platforms' },
      { label: 'Privacy-sensitive teams', href: '/solutions/regulated' },
    ],
  },
  {
    heading: 'Evaluate',
    links: [
      { label: 'Why YOM', href: '/why-yom' },
      { label: 'Compare', href: '/compare' },
      { label: 'Security', href: '/security' },
      { label: 'FAQ', href: '/faq' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Terms', href: '/terms' },
      { label: 'Privacy', href: '/privacy' },
      { label: 'DPA', href: '/dpa' },
      { label: 'Acceptable use', href: '/acceptable-use' },
      { label: 'Cookies', href: '/cookies' },
      { label: 'Sub-processors', href: '/subprocessors' },
      { label: 'Security disclosure', href: '/security/disclosure' },
    ],
  },
];
