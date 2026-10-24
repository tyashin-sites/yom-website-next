import { pageMetadata } from '@/lib/seo';
import { SolutionPage, type SolutionContent } from '@/components/SolutionPage';
import { ConsentStream } from '@/components/signature/ConsentStream';

const c: SolutionContent = {
  slug: 'regulated',
  name: 'Privacy-sensitive teams',
  description:
    'Privacy-first analytics by design for regulated teams: no third-party pixels, cookieless by default, GPC honoured, PII scrubbed. For counsel review.',
  eyebrow: 'For privacy-sensitive teams',
  title: 'Privacy-first by design, ready for your counsel to review.',
  lead: 'YOM avoids the patterns behind recent enforcement: third-party pixels, identifiers that survive an opt-out, full URLs with personal data in them. Whether it meets your obligations is for your legal team to decide. This page gives them the facts.',
  secondary: { href: '/contact', label: 'Talk to us' },
  painsTitle: 'The exposure your counsel is weighing',
  pains: [
    { stat: '$47.5M', text: 'upper bound of Kaiser Permanente’s settlement over trackers on logged-in pages', source: 'kaiser' },
    { stat: '§631', text: 'CIPA wiretap claims remain available after SB 690, signed 30 September 2026', source: 'sb690' },
    { stat: 'Opt-in', text: 'consent for non-essential trackers, analytics included, under Quebec’s Law 25', source: 'quebecLaw25' },
  ],
  showcaseTitle: 'The identity is dropped before it’s stored.',
  showcaseLead:
    'GPC, DNT, denied or undecided consent all lead to the same place: no visitor id, nothing in browser storage, nothing forwarded. You can go further and drop those events entirely.',
  showcase: <ConsentStream />,
  today: [
    { title: 'No third-party pixels', body: 'YOM loads none. Optional forwarding to your own GA4 or Meta Pixel runs only with marketing consent, and you can leave it off.' },
    { title: 'Cookieless by default', body: 'No persistent id and no storage writes until analytics consent is granted; enforced server-side too.' },
    { title: 'GPC & DNT at the edge', body: 'Treated as denied: cookieless by default, or dropped if you set the policy to drop.' },
    { title: 'PII scrubbing', body: 'Params named like personal data (email, phone, name, address, card and similar) are removed from browser events, as are values that look like an email address or a card number.' },
    { title: 'Path-only URLs', body: 'Pages are recorded by path: the SDK drops the query string and fragment before sending. Click ids aren’t stored; they only decide the channel.' },
    { title: 'Access controls', body: 'Google sign-in and TOTP multi-factor authentication for your team.' },
    { title: 'Opt-out evidence report', body: 'Every event records its consent state, GPC, DNT, and whether it was kept cookieless, scrubbed or held back from forwarding; the report totals them. Evidence for your own review, not a compliance certificate.' },
  ],
  soon: [],
  note: (
    <div className="rounded-lg border border-border bg-paper p-7">
      <h3 className="tt-h3">What we don&rsquo;t offer today</h3>
      <p className="mt-3 max-w-3xl text-muted">
        YOM does not currently hold third-party security attestations, does not sign business associate agreements,
        and makes no commitment about the geographic location of stored data. Don&rsquo;t send YOM data that your
        obligations require to be covered by those, such as health information from authenticated patient pages.
        See <a href="/security" className="underline">security</a> for the full picture.
      </p>
      <p className="mt-4 max-w-3xl text-sm text-muted">
        Nothing on this site is legal advice. Privacy law varies by jurisdiction and changes often; have qualified
        counsel review your use of any analytics tool, including YOM.
      </p>
    </div>
  ),
};

export const metadata = pageMetadata({ title: 'Privacy-first analytics for regulated teams', description: c.description, path: '/solutions/regulated' });

export default function Page() {
  return <SolutionPage c={c} />;
}
