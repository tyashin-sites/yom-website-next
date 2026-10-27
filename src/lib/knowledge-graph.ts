import { siteConfig } from '@/config/site';
import { legalEntities, legalContact } from '@/config/legal';
import { SITE, siteUrl } from '@/lib/seo';

/**
 * One interlinked schema.org @graph per page (addendum §3b). The edge adds a
 * baseline only for @types this graph does not already declare.
 */

const ORIGIN = SITE.url;
const ORG_ID = `${ORIGIN}/#organization`;
const SITE_ID = `${ORIGIN}/#website`;
const APP_ID = `${ORIGIN}/#software`;
const ORG_IN_ID = `${ORIGIN}/#org-india`;
const ORG_CA_ID = `${ORIGIN}/#org-canada`;
const ORG_EE_ID = `${ORIGIN}/#org-estonia`;

type Node = Record<string, unknown>;

function organization(): Node {
  return {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: `${siteConfig.name} (${siteConfig.longName})`,
    alternateName: siteConfig.longName,
    url: siteUrl('/'),
    logo: siteUrl('/brand/mark-512.png'),
    email: siteConfig.contact.email,
    telephone: siteConfig.contact.phone.replace(/\s+/g, ''),
    description: siteConfig.description,
    parentOrganization: [{ '@id': ORG_IN_ID }, { '@id': ORG_EE_ID }, { '@id': ORG_CA_ID }],
    address: {
      '@type': 'PostalAddress',
      addressLocality: siteConfig.company.hq.city,
      addressRegion: siteConfig.company.hq.regionCode,
      addressCountry: siteConfig.company.hq.country,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: siteConfig.contact.email,
      telephone: siteConfig.contact.phone.replace(/\s+/g, ''),
      areaServed: ['US', 'CA', 'IN'],
      availableLanguage: ['en'],
    },
    knowsAbout: [
      'first-party analytics',
      'consent-aware analytics',
      'Global Privacy Control',
      'cookieless analytics',
      'conversion tracking',
      'server-side event collection',
      'multi-tenant analytics',
      'embedded analytics',
      'signed webhooks',
      'GA4 event taxonomy',
    ],
    ...(siteConfig.sameAs.length ? { sameAs: siteConfig.sameAs } : {}),
  };
}

/** The three group companies that run YOM (PUBLISH-KIT K1 v2.0): India, EU and UK, everywhere else. */
function legalOrganizations(): Node[] {
  const { india: IN, estonia: EE, canada: CA } = legalEntities;
  return [
    {
      '@type': 'Organization',
      '@id': ORG_IN_ID,
      name: IN.name,
      legalName: IN.name,
      alternateName: siteConfig.company.builder,
      identifier: { '@type': 'PropertyValue', propertyID: 'CIN', value: IN.cin },
      email: legalContact.email,
      telephone: IN.phone.replace(/\s+/g, ''),
      areaServed: IN.countryCode,
      address: {
        '@type': 'PostalAddress',
        streetAddress: IN.registeredOffice.street,
        addressLocality: IN.registeredOffice.locality,
        postalCode: IN.registeredOffice.postalCode,
        addressCountry: IN.countryCode,
      },
      location: {
        '@type': 'Place',
        name: 'Principal place of business',
        address: {
          '@type': 'PostalAddress',
          streetAddress: IN.principalOffice.street,
          addressLocality: IN.principalOffice.locality,
          addressRegion: IN.principalOffice.region,
          postalCode: IN.principalOffice.postalCode,
          addressCountry: IN.countryCode,
        },
      },
    },
    {
      '@type': 'Organization',
      '@id': ORG_CA_ID,
      name: CA.name,
      legalName: CA.name,
      alternateName: siteConfig.company.builder,
      email: legalContact.email,
      telephone: CA.phone.replace(/\s+/g, ''),
      address: {
        '@type': 'PostalAddress',
        addressLocality: CA.locality,
        addressRegion: CA.regionCode,
        addressCountry: CA.countryCode,
      },
    },
    {
      '@type': 'Organization',
      '@id': ORG_EE_ID,
      name: EE.name,
      legalName: EE.name,
      alternateName: siteConfig.company.builder,
      identifier: { '@type': 'PropertyValue', propertyID: 'Estonian registry code', value: EE.registryCode },
      vatID: EE.vat,
      email: legalContact.email,
      areaServed: ['EU', 'GB'],
      address: {
        '@type': 'PostalAddress',
        streetAddress: EE.street,
        addressLocality: EE.locality,
        postalCode: EE.postalCode,
        addressCountry: EE.countryCode,
      },
    },
  ];
}

function website(): Node {
  return {
    '@type': 'WebSite',
    '@id': SITE_ID,
    url: siteUrl('/'),
    name: siteConfig.name,
    description: siteConfig.tagline,
    publisher: { '@id': ORG_ID },
    inLanguage: 'en',
  };
}

function software(): Node {
  return {
    '@type': 'SoftwareApplication',
    '@id': APP_ID,
    name: siteConfig.name,
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: 'Web analytics',
    operatingSystem: 'Web',
    url: siteUrl('/'),
    publisher: { '@id': ORG_ID },
    offers: {
      '@type': 'Offer',
      name: 'Free',
      price: '0',
      priceCurrency: 'USD',
      description: '100,000 events per month included; no credit card required.',
      url: siteUrl('/pricing'),
    },
  };
}

export interface GraphPage {
  path: string;
  title: string;
  description: string;
  /** Breadcrumb trail AFTER Home, e.g. [{name:'Solutions', path:'/solutions'}, ...]. */
  crumbs?: { name: string; path: string }[];
  faq?: { q: string; a: string }[];
  type?: 'WebPage' | 'AboutPage' | 'ContactPage' | 'FAQPage' | 'CollectionPage';
  /** BCP 47 language of the page body when it is not English (e.g. 'hi'). */
  inLanguage?: string;
  /** A blog post: adds a BlogPosting node (the page's main entity). */
  article?: {
    headline: string;
    description: string;
    image?: string;
    datePublished?: string;
    dateModified?: string;
    authorName?: string;
    keywords?: string[];
    section?: string;
  };
  /** A listing: adds an ItemList of these URLs (e.g. the blog index). */
  items?: { name: string; path: string }[];
}

export function buildGraph(page?: GraphPage): { '@context': string; '@graph': Node[] } {
  const nodes: Node[] = [organization(), ...legalOrganizations(), website(), software()];
  if (page) {
    const url = siteUrl(page.path);
    const isHome = page.path === '/';
    const webPage: Node = {
      '@type': page.type ?? 'WebPage',
      '@id': `${url}#webpage`,
      url,
      name: page.title,
      description: page.description,
      isPartOf: { '@id': SITE_ID },
      about: { '@id': isHome ? APP_ID : ORG_ID },
      inLanguage: page.inLanguage ?? 'en',
    };
    if (!isHome) {
      const trail = [{ name: 'Home', path: '/' }, ...(page.crumbs ?? [{ name: page.title, path: page.path }])];
      webPage.breadcrumb = { '@id': `${url}#breadcrumb` };
      nodes.push(webPage, {
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumb`,
        itemListElement: trail.map((c, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: c.name,
          item: siteUrl(c.path),
        })),
      });
    } else {
      nodes.push(webPage);
    }
    if (page.article) {
      const a = page.article;
      const iso = (d?: string) => (d && !Number.isNaN(Date.parse(d)) ? new Date(d).toISOString() : undefined);
      const article: Node = {
        '@type': 'BlogPosting',
        '@id': `${url}#article`,
        headline: a.headline.slice(0, 110),
        description: a.description,
        url,
        mainEntityOfPage: { '@id': `${url}#webpage` },
        isPartOf: { '@id': `${url}#webpage` },
        publisher: { '@id': ORG_ID },
        author: a.authorName ? { '@type': 'Person', name: a.authorName } : { '@id': ORG_ID },
        inLanguage: 'en',
        ...(a.image ? { image: [a.image] } : {}),
        ...(iso(a.datePublished) ? { datePublished: iso(a.datePublished) } : {}),
        ...(iso(a.dateModified ?? a.datePublished) ? { dateModified: iso(a.dateModified ?? a.datePublished) } : {}),
        ...(a.keywords?.length ? { keywords: a.keywords.join(', ') } : {}),
        ...(a.section ? { articleSection: a.section } : {}),
      };
      webPage['mainEntity'] = { '@id': `${url}#article` };
      nodes.push(article);
    }
    if (page.items?.length) {
      const list: Node = {
        '@type': 'ItemList',
        '@id': `${url}#itemlist`,
        itemListElement: page.items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, url: siteUrl(it.path) })),
      };
      webPage['mainEntity'] = { '@id': `${url}#itemlist` };
      nodes.push(list);
    }
    if (page.faq?.length) {
      webPage['mainEntity'] = page.faq.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      }));
    }
  }
  return { '@context': 'https://schema.org', '@graph': nodes };
}

/** Serialise safely for a <script> tag (escape < and >). */
export function graphJson(page?: GraphPage): string {
  return JSON.stringify(buildGraph(page)).replace(/</g, '\\u003c').replace(/>/g, '\\u003e');
}
