/**
 * Every third-party fact on the site comes from this registry, which mirrors
 * the citations in YOM-POSITIONING-RESEARCH.md (prepared 2026-10-21). Pages
 * reference sources by id; <Footnotes> renders the numbered list. If a fact is
 * not in here, it does not go on the site.
 *
 * `thirdParty: true` marks figures that come from trackers/estimators rather
 * than the vendor itself — the page must say so.
 */

export const LAST_VERIFIED = '2026-10-21';
export const LAST_VERIFIED_LABEL = '21 October 2026';

export interface Source {
  id: string;
  publisher: string;
  title: string;
  url: string;
  thirdParty?: boolean;
}

export const SOURCES: Record<string, Source> = {
  ga4Thresholds: {
    id: 'ga4Thresholds',
    publisher: 'Google Analytics Help',
    title: 'About data thresholds',
    url: 'https://support.google.com/analytics/answer/9383630?hl=en',
  },
  ga4Modeling: {
    id: 'ga4Modeling',
    publisher: 'Google Analytics Help',
    title: 'Behavioral modeling for consent mode',
    url: 'https://support.google.com/analytics/answer/11161109?hl=en',
  },
  ga4Export: {
    id: 'ga4Export',
    publisher: 'Google Analytics Help',
    title: 'BigQuery Export limits',
    url: 'https://support.google.com/analytics/answer/9358801',
  },
  ga4Retention: {
    id: 'ga4Retention',
    publisher: 'Momentic',
    title: 'Understanding GA4 data retention',
    url: 'https://momenticmarketing.com/blog/understanding-ga4-data-retention',
  },
  lookerQuota: {
    id: 'lookerQuota',
    publisher: 'Databloo',
    title: 'GA4 API quota limits in Looker Studio',
    url: 'https://www.databloo.com/blog/ga4-quota-limits',
  },
  mixpanelPricing: {
    id: 'mixpanelPricing',
    publisher: 'Mixpanel',
    title: 'Pricing',
    url: 'https://mixpanel.com/pricing/',
  },
  amplitudePricing: {
    id: 'amplitudePricing',
    publisher: 'Amplitude',
    title: 'Pricing',
    url: 'https://amplitude.com/pricing.md',
  },
  segmentPricing: {
    id: 'segmentPricing',
    publisher: 'Hardal',
    title: 'Segment pricing',
    url: 'https://usehardal.com/blog/segment-pricing',
    thirdParty: true,
  },
  rudderstackPricing: {
    id: 'rudderstackPricing',
    publisher: 'RudderStack docs',
    title: 'Billing and plans',
    url: 'https://www.rudderstack.com/docs/dashboard-guides/billings-plans/',
  },
  agencyAnalytics: {
    id: 'agencyAnalytics',
    publisher: 'AgencyAnalytics',
    title: 'Pricing',
    url: 'https://agencyanalytics.com/pricing',
  },
  stateLaws: {
    id: 'stateLaws',
    publisher: 'MultiState',
    title: 'All of the comprehensive privacy laws that take effect in 2026',
    url: 'https://www.multistate.us/insider/2026/2/4/all-of-the-comprehensive-privacy-laws-that-take-effect-in-2026',
  },
  healthline: {
    id: 'healthline',
    publisher: 'Hunton Andrews Kurth',
    title: 'California AG reaches record $1.55 million settlement with Healthline.com',
    url: 'https://www.hunton.com/privacy-and-information-security-law/california-ag-reaches-record-1-55-million-settlement-with-healthline-com-for-alleged-ccpa-violations',
  },
  tractorSupply: {
    id: 'tractorSupply',
    publisher: 'White & Case',
    title: 'CPPA issues record $1.35 million fine against Tractor Supply',
    url: 'https://www.whitecase.com/insight-alert/california-privacy-protection-agency-issues-record-135-million-fine-against-tractor',
  },
  cppaHonda: {
    id: 'cppaHonda',
    publisher: 'California Privacy Protection Agency',
    title: 'CPPA enforcement announcement, 6 May 2025',
    url: 'https://cppa.ca.gov/announcements/2025/20250506.html',
  },
  toddSnyder: {
    id: 'toddSnyder',
    publisher: 'TrustArc',
    title: 'Lessons from CCPA enforcement actions',
    url: 'https://trustarc.com/resource/lessons-ccpa-enforcement-actions/',
  },
  gpcSweep: {
    id: 'gpcSweep',
    publisher: 'California Office of the Attorney General',
    title: 'Multi-state investigative sweep on Global Privacy Control',
    url: 'https://oag.ca.gov/node/608320',
  },
  adBlock: {
    id: 'adBlock',
    publisher: 'Backlinko (GWI data)',
    title: 'Ad blocker usage statistics',
    url: 'https://backlinko.com/ad-blockers-users',
  },
  safariItp: {
    id: 'safariItp',
    publisher: 'WebKit',
    title: 'Intelligent Tracking Prevention 2.1',
    url: 'https://webkit.org/blog/8613/intelligent-tracking-prevention-2-1/',
  },
  chromeCookies: {
    id: 'chromeCookies',
    publisher: 'The Register',
    title: 'Google abandons plan to deprecate third-party cookies',
    url: 'https://www.theregister.com/2025/04/22/google_privacy_sandbox/',
  },
  sgtmBlocked: {
    id: 'sgtmBlocked',
    publisher: 'PPC Land',
    title: 'Ad blockers are now targeting server-side GTM subdomains by name',
    url: 'https://ppc.land/ad-blockers-are-now-targeting-server-side-gtm-subdomains-by-name/',
  },
  aiAdobe: {
    id: 'aiAdobe',
    publisher: 'eCommerceNews (Adobe data)',
    title: 'Adobe sees surge in AI-driven traffic and conversions',
    url: 'https://ecommercenews.com.au/story/adobe-sees-surge-in-ai-driven-traffic-conversions',
  },
  aiReferrals: {
    id: 'aiReferrals',
    publisher: 'Practical Ecommerce',
    title: 'Mixed reports on AI ecommerce traffic',
    url: 'https://www.practicalecommerce.com/mixed-reports-on-ai-ecommerce-traffic',
  },
  aiDirect: {
    id: 'aiDirect',
    publisher: 'Clickport',
    title: 'ChatGPT traffic shows up as Direct in GA4',
    url: 'https://clickport.io/blog/chatgpt-direct-traffic-ga4',
  },
  gaMcp: {
    id: 'gaMcp',
    publisher: 'PPC Land',
    title: 'Google Analytics launches MCP server',
    url: 'https://ppc.land/google-analytics-launches-mcp-server-for-ai-powered-data-conversations/',
  },
  embeddedDashboards: {
    id: 'embeddedDashboards',
    publisher: 'Luzmo (vendor survey)',
    title: 'Dashboards: dead, dying or evolving?',
    url: 'https://www.luzmo.com/blog/dashboards-dead-dying-or-evolving',
    thirdParty: true,
  },
  kaiser: {
    id: 'kaiser',
    publisher: 'BankInfoSecurity',
    title: 'Kaiser Permanente to pay up to $47.5M in web tracker lawsuit',
    url: 'https://www.bankinfosecurity.com/kaiser-permanente-to-pay-up-to-475m-in-web-tracker-lawsuit-a-30180',
  },
  sb690: {
    id: 'sb690',
    publisher: 'Crowell & Moring',
    title: 'California governor signs SB 690',
    url: 'https://www.crowell.com/en/insights/client-alerts/california-governor-signs-sb-690-limiting-private-right-of-action-under-cipas-pen-register-and-trap-and-trace-provisions',
  },
  quebecLaw25: {
    id: 'quebecLaw25',
    publisher: 'McCarthy Tétrault',
    title: "Quebec's Law 25 and cookies: not so cookie-cutter",
    url: 'https://mccarthy.ca/en/insights/blogs/techlex/quebecs-law-25-and-cookies-not-so-cookie-cutter',
  },
};

export type SourceId = keyof typeof SOURCES;
