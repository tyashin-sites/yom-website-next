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
- PII scrubbing on browser events (params named like personal data, and values that look like an email address or card number); pages recorded by path (the SDK drops the query string); click ids not stored, only used for the channel (with marketing consent and Meta CAPI configured, the Meta click id is passed to Meta for matching).
- Edge ingest on YOM's domain: text/plain batches via sendBeacon, no CORS preflight. A custom ingest domain is not offered yet.
- Server events to /v2/events with a secret key or HMAC signature.
- Bot filtering at the edge.
- Sub-tenants for agencies and platforms, with scoped keys and embed tokens; usage by sub-tenant.
- Signed realtime or batched webhooks with retries (about 24 hours), a delivery log and redelivery.
- Goals, funnels, attribution, retention, realtime, and CSV/NDJSON export over the API (last 88 days).
- GA4-aligned event taxonomy.
- Google sign-in and multi-factor authentication.
- MCP server for Claude and other AI agents: 13 read-only report tools, authorised by a read-scoped secret key or a short-lived embed token.
- AI-assistant traffic channel (12 assistants including ChatGPT, Perplexity, Claude and Gemini) and an AI-crawler report in the API and MCP server (last 88 days; sees crawlers that reach YOM through server-side tracking or the pixel).
- Server-side Meta Conversions API and GA4 Measurement Protocol forwarding (pay-as-you-go), sent only with explicit marketing consent and no GPC signal.
- White-label client portals with read-only client logins.
- Revenue reconciliation (orders by API or CSV matched to purchase events by order id) and an opt-out evidence report.
- GA4 migration: a gtag shim in the SDK and an import API (with a script you run) for daily totals from a GA4 BigQuery export.
- Partner API: management keys create and suspend projects and mint keys; they cannot call the report API themselves.

## Early access
- WooCommerce plugin (not yet on wordpress.org; we install it with you).
- Looker Studio community connector (self-deployed; not in the public gallery).

## Exact vs estimated
Only conversion counts are exact. Funnels, attribution and unique-visitor counts are statistical estimates.

## Coming soon (not shipped)
- Google Ads Enhanced Conversions
- Shopify app (built; not yet installable)
- Warehouse exports (S3, GCS, R2, BigQuery)
- Scheduled email reports
- Client portals on your own domain
- The <yom-report> embeddable web component (@yourownmetric/embed)

## Not offered
Session replay, feature flags and experiments.

## Pricing
- Free: no credit card required; 100,000 events per month (at most 20,000 a day); 1 project; up to 3 sub-tenants; 180-day retention.
- Pay-as-you-go: first 100,000 events free each month, then graduated (each rate applies only to events in its band):
${rates}
- Pay-as-you-go adds: no event cap, unlimited projects and sub-tenants, 395-day retention by default (adjustable up to five years), realtime webhooks (up to 25 destinations per project), Meta CAPI and GA4 Measurement Protocol forwarding, embed tokens, and portals without the "Powered by" line. Billing is in USD; CAD rates are published for estimates.
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
