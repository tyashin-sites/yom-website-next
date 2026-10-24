import { siteConfig, solutions } from '@/config/site';
import { siteUrl } from '@/lib/seo';
import { EVENT_TIERS, formatRate } from '@/lib/pricing';
import { getBlogStatusAtBuild } from '@/lib/blog';

/**
 * /llms.txt — clean, machine-first summary for LLMs and AI search. Same facts
 * as the pages; nothing here that isn't on the site. (The platform may serve
 * its own /llms.txt once SEO Co-Pilot is installed — docs/ASSET-DEBT.md #14.)
 */
export const dynamic = 'force-static';

export async function GET() {
  const { company, contact, app, sdk } = siteConfig;
  const { hasPosts } = await getBlogStatusAtBuild();
  const rates = EVENT_TIERS.filter((t) => t.perK.USD > 0)
    .map((t) => `- ${t.label} events: ${formatRate(t.perK.USD, 'USD')} per 1,000 (${formatRate(t.perK.CAD, 'CAD')})`)
    .join('\n');

  const body = `# ${siteConfig.name} (${siteConfig.longName})

> ${siteConfig.description}

${siteConfig.name} is built by ${company.builder}. North American legal entity: ${company.legalName}, headquartered in ${company.hq.city}, ${company.hq.region}, ${company.hq.countryName}.

## What ships today
- Exact, deduplicated counts for purchase, refund, generate_lead, form_submit and sign_up (deduplicated on the event id).
- Cookieless-by-default, consent-aware collection; DNT and Global Privacy Control honoured (cookieless by default, or drop).
- PII scrubbing on browser events; path-only URLs (query strings never sent); click ids recorded only as present or absent (with marketing consent and Meta CAPI configured, the Meta click id is passed to Meta for matching).
- First-party edge ingest: text/plain batches via sendBeacon, no CORS preflight.
- Server events to /v2/events with a secret key or HMAC signature.
- Bot filtering at the edge.
- Sub-tenants for agencies and platforms, with scoped keys and embed tokens; usage by sub-tenant.
- Signed realtime or batched webhooks with retries (about 24 hours), a delivery log and redelivery.
- Goals, funnels, attribution, retention, realtime, CSV/NDJSON export and a raw archive.
- GA4-aligned event taxonomy.
- Google sign-in and multi-factor authentication.
- MCP server for Claude and other AI agents: 13 read-only report tools, authorised by a read-scoped secret key or a short-lived embed token.
- AI-assistant traffic channel (12 assistants including ChatGPT, Perplexity, Claude and Gemini) and an AI-crawler report (last 88 days; sees crawlers that reach YOM through server-side tracking or the pixel).
- Server-side Meta Conversions API and GA4 Measurement Protocol forwarding (pay-as-you-go), sent only with explicit marketing consent and no GPC signal.
- White-label client portals with read-only client logins, scheduled weekly/monthly email reports, and the <yom-report> embeddable web component (@yourownmetric/embed).
- Warehouse exports (pay-as-you-go): hourly files to S3, Google Cloud Storage or R2 (NDJSON or Parquet), or BigQuery; Snowflake reads the S3 export through an external stage.
- Revenue reconciliation (orders by API or CSV matched to purchase events by order id) and an opt-out evidence report.
- GA4 migration: a gtag shim in the SDK and an import of daily totals from a GA4 BigQuery export.
- Partner API: management keys create and suspend projects and mint keys; they cannot read analytics data.

## Early access
- Shopify app and WooCommerce plugin (not yet listed in the Shopify App Store or on wordpress.org).
- Looker Studio community connector (self-deployed; not in the public gallery).

## Exact vs estimated
Only conversion counts are exact. Funnels, attribution and unique-visitor counts are statistical estimates.

## Coming soon (not shipped)
- Google Ads Enhanced Conversions

## Not offered
Session replay, feature flags and experiments.

## Pricing
- Free: no credit card required; 100,000 events per month (at most 20,000 a day); 1 project; 1 team member; 180-day retention.
- Pay-as-you-go: first 100,000 events free each month, then graduated (each rate applies only to events in its band):
${rates}
- Pay-as-you-go includes unlimited projects and team members, 395-day retention by default (adjustable up to five years), custom events, API access, funnels, embedded dashboards, webhooks/destinations and audit logs.
- Example: 1,000,000 events per month = $90.00.

## Developers
- SDK: npm install ${sdk.package} (browser, React and Node).
- Ingest: ${sdk.ingestUrl} (POST /v2/collect from browsers, POST /v2/events from servers).

## Pages
- Home: ${siteUrl('/')}
- Why YOM (cited case): ${siteUrl('/why-yom')}
- Product: ${siteUrl('/product')}
- Compare (vs GA4, Mixpanel/Amplitude, Segment/RudderStack): ${siteUrl('/compare')}
- Pricing and calculator: ${siteUrl('/pricing')}
- Developers: ${siteUrl('/developers')}
${solutions.map((s) => `- ${s.label}: ${siteUrl(s.href)}`).join('\n')}
- Security: ${siteUrl('/security')}
- FAQ: ${siteUrl('/faq')}
${hasPosts ? `- Blog: ${siteUrl('/blog')}\n` : ''}- About: ${siteUrl('/about')}
- Contact: ${siteUrl('/contact')}

## Legal
- Terms of Service: ${siteUrl('/terms')}
- Privacy Policy: ${siteUrl('/privacy')}
- Data Processing Addendum: ${siteUrl('/dpa')}
- Acceptable Use Policy: ${siteUrl('/acceptable-use')}
- Cookie Policy: ${siteUrl('/cookies')}
- Sub-processors: ${siteUrl('/subprocessors')}
- Vulnerability disclosure policy: ${siteUrl('/security/disclosure')}

## Contact
- Email: ${contact.email}
- Phone: ${contact.phone}
- Sign up: ${siteUrl(app.signUp)}
- Log in: ${siteUrl(app.logIn)}
`;
  return new Response(body, {
    headers: { 'content-type': 'text/plain; charset=utf-8', 'cache-control': 'public, max-age=3600' },
  });
}
