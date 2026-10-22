import { siteConfig, solutions } from '@/config/site';
import { siteUrl } from '@/lib/seo';
import { EVENT_TIERS, formatRate } from '@/lib/pricing';

/**
 * /llms.txt — clean, machine-first summary for LLMs and AI search. Same facts
 * as the pages; nothing here that isn't on the site. (The platform may serve
 * its own /llms.txt once SEO Co-Pilot is installed — docs/ASSET-DEBT.md #14.)
 */
export const dynamic = 'force-static';

export function GET() {
  const { company, contact, app, sdk } = siteConfig;
  const rates = EVENT_TIERS.filter((t) => t.perK.USD > 0)
    .map((t) => `- ${t.label} events: ${formatRate(t.perK.USD, 'USD')} per 1,000 (${formatRate(t.perK.CAD, 'CAD')})`)
    .join('\n');

  const body = `# ${siteConfig.name} (${siteConfig.longName})

> ${siteConfig.description}

${siteConfig.name} is built by ${company.builder}. North American legal entity: ${company.legalName}, headquartered in ${company.hq.city}, ${company.hq.region}, ${company.hq.countryName}.

## What ships today
- Exact, deduplicated counts for purchase, refund, generate_lead, form_submit and sign_up (deduplicated on the event id).
- Cookieless-by-default, consent-aware collection; DNT and Global Privacy Control honoured (cookieless by default, or drop).
- PII scrubbing on browser events; path-only URLs (query strings never sent); click ids never stored.
- First-party edge ingest: text/plain batches via sendBeacon, no CORS preflight.
- Server events to /v2/events with a secret key or HMAC signature.
- Bot filtering at the edge.
- Sub-tenants for agencies and platforms, with scoped keys and embed tokens; usage by sub-tenant.
- Signed realtime or batched webhooks with retries (about 24 hours), a delivery log and redelivery.
- Goals, funnels, attribution, retention, realtime, CSV/NDJSON export and a raw archive.
- GA4-aligned event taxonomy.
- Google sign-in and multi-factor authentication.

## Exact vs estimated
Only conversion counts are exact. Funnels, attribution and unique-visitor counts are statistical estimates.

## Coming soon (not shipped)
- MCP server for Claude and other AI agents
- AI-assistant traffic channel and AI-crawler report
- Server-side Meta CAPI and GA4 Measurement Protocol forwarding
- White-label client portal
- Shopify app
- Warehouse sync
- Revenue reconciliation report
- Opt-out evidence report

## Not offered
Session replay, feature flags and experiments.

## Pricing
- Free: no credit card required; 100,000 events per month; 1 project; 1 team member; 90-day retention.
- Pay-as-you-go: first 100,000 events free each month, then graduated (each rate applies only to events in its band):
${rates}
- Pay-as-you-go includes unlimited projects and team members, 365-day retention, custom events, API access, funnels, embedded dashboards, webhooks/destinations and audit logs.
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
- About: ${siteUrl('/about')}
- Contact: ${siteUrl('/contact')}

## Contact
- Email: ${contact.email}
- Phone: ${contact.phone}
- Sign up: ${app.signUp}
- Log in: ${app.logIn}
`;
  return new Response(body, {
    headers: { 'content-type': 'text/plain; charset=utf-8', 'cache-control': 'public, max-age=3600' },
  });
}
