import { pageMetadata } from '@/lib/seo';
import { SolutionPage, type SolutionContent } from '@/components/SolutionPage';
import { FanOut } from '@/components/signature/FanOut';

const c: SolutionContent = {
  slug: 'agencies',
  name: 'Agencies',
  description:
    'Multi-client analytics for agencies: one YOM org, every client a scoped sub-tenant with its own keys and embed tokens, usage per client for re-billing.',
  eyebrow: 'For agencies',
  title: 'Every client in one org. Every number scoped.',
  lead: 'Stop stitching together separate properties and per-client tools. Each client is a sub-tenant of your org, with keys and tokens that can only see that client.',
  secondary: { href: '/contact', label: 'Talk to us' },
  painsTitle: 'What agencies are working around',
  pains: [
    { stat: '$20', text: 'per client per month is a common price for agency reporting tools (annual billing)', source: 'agencyAnalytics' },
    { stat: 'Quota', text: 'errors when Looker Studio reports pull from the GA4 API', source: 'lookerQuota' },
    { stat: 'Hidden', text: 'GA4 rows withheld under thresholds, which hits small clients hardest', source: 'ga4Thresholds' },
  ],
  showcaseTitle: 'One login for you. One fence per client.',
  showcaseLead:
    'Create a sub-tenant per client, bind a key or embed token to it, and that principal is forced to its own data. Ask for another client’s data and the API answers 403.',
  showcase: <FanOut orgLabel="Your agency" />,
  today: [
    { title: 'Sub-tenants', body: 'Open (created on first event) or registered, inside one project.' },
    { title: 'Scoped keys & embed tokens', body: 'Bound to one client; embed tokens also carry report and origin allow-lists.' },
    { title: 'Usage by client', body: 'Event volume per sub-tenant, so you can re-bill at your own margin.' },
    { title: 'White-label webhooks', body: 'Your header prefix and user agent on every signed delivery.' },
    { title: 'Unlimited seats & projects', body: 'On pay-as-you-go, add your whole team and every client project.' },
    { title: 'Exact client conversions', body: 'Leads and purchases counted exactly, even for low-traffic clients.' },
    { title: 'White-label client portals', body: 'A branded portal per client with read-only logins. Your own domain, without “Powered by”, on pay-as-you-go.' },
    { title: 'Scheduled email reports', body: 'Weekly or monthly digests to each client, with a CSV attachment on pay-as-you-go.' },
  ],
  soon: [],
};

export const metadata = pageMetadata({ title: 'Multi-client analytics for agencies', description: c.description, path: '/solutions/agencies' });

export default function Page() {
  return <SolutionPage c={c} />;
}
