import { pageMetadata } from '@/lib/seo';
import { siteConfig } from '@/config/site';
import { JsonLd } from '@/components/ui/JsonLd';
import { PageHero } from '@/components/ui/PageHero';
import { PrimaryCta, GhostLink } from '@/components/ui/Cta';
import { SectionHead } from '@/components/ui/Section';
import { FaqList, type Faq } from '@/components/ui/FaqList';
import { CtaBand } from '@/components/ui/CtaBand';
import { PricingCalculator } from '@/components/PricingCalculator';
import { EVENT_TIERS, formatRate } from '@/lib/pricing';

const TITLE = 'Pricing';
const DESCRIPTION =
  'Start free with 100,000 events a month, no credit card. Then pay as you go from $0.10 per 1,000 events, graduated down to $0.015. USD and CAD calculator included.';

export const metadata = pageMetadata({ title: 'Pricing: 100,000 events free every month', description: DESCRIPTION, path: '/pricing' });

const FAQ: Faq[] = [
  {
    q: 'Do I need a credit card to start?',
    a: 'No. The Free plan needs no credit card and includes 100,000 events every month (at most 20,000 in one day), one project and 180 days of data retention.',
  },
  {
    q: 'How does graduated pricing work?',
    a: 'Like tax brackets. The first 100,000 events each month are free. Events from 100,000 to 1 million cost $0.10 per 1,000, from 1 million to 10 million $0.06, from 10 million to 100 million $0.03, and above 100 million $0.015. Each rate applies only to the events inside its band, so 2 million events cost $90 for the first band plus $60 for the second: $150.',
  },
  {
    q: 'What is an event?',
    a: 'One tracked action, such as a page_view, add_to_cart, purchase or a custom event you define. Events can come from the browser SDK or from your server.',
  },
  {
    q: 'What does pay-as-you-go add over Free?',
    a: 'No daily or monthly event cap, unlimited projects and sub-tenants, 395-day retention by default (adjustable up to five years), realtime webhooks with up to 25 destinations per project, Meta CAPI and GA4 Measurement Protocol forwarding, embed tokens, and client portals without the “Powered by” line. The first 100,000 events each month are still free.',
  },
  {
    q: 'Do you publish prices in Canadian dollars?',
    a: 'We publish CAD rates so you can estimate in Canadian dollars: CA$0.14, CA$0.08, CA$0.04 and CA$0.02 per 1,000 events for the same four bands, after the same 100,000 free events. Use the currency switch in the calculator. Pay-as-you-go is billed in US dollars.',
  },
  {
    q: 'Are conversion counts priced differently?',
    a: 'No. Purchases, leads and sign-ups are events like any other on the rate card. They are also the events YOM counts exactly.',
  },
  {
    q: 'Do the estimates include tax?',
    a: 'No. The calculator shows the usage cost before any applicable taxes.',
  },
];

export default function PricingPage() {
  return (
    <>
      <JsonLd page={{ path: '/pricing', title: TITLE, description: DESCRIPTION, faq: FAQ }} />
      <PageHero
        eyebrow="Pricing"
        title="The first 100,000 events are free every month."
        lead="Two plans, one public rate card, no sales call at any volume. Pay only for the events you send."
        trail={[{ name: TITLE, path: '/pricing' }]}
      />

      <section aria-label="Plans" className="container-y pb-16">
        <div className="grid gap-5 lg:grid-cols-2">
          <article className="card flex flex-col p-7 sm:p-9">
            <p className="eyebrow">Free</p>
            <p className="mt-5 flex items-baseline gap-2">
              <span className="font-heading text-6xl">$0</span>
              <span className="text-muted">no credit card required</span>
            </p>
            <ul className="mt-8 space-y-3 text-[0.97rem]">
              {[
                '100,000 events a month included (at most 20,000 a day)',
                '1 project and up to 3 sub-tenants',
                '180-day data retention',
                'Cookieless, consent-aware tracking',
                'Reports, funnels, custom events and API access',
                'One batched webhook destination',
              ].map((t) => (
                <li key={t} className="flex gap-3">
                  <span aria-hidden="true" className="mt-[0.6rem] h-1.5 w-1.5 shrink-0 rounded-full bg-foreground" />
                  {t}
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-9">
              <PrimaryCta id="plan-free" className="w-full sm:w-auto" />
            </div>
          </article>

          <article className="ink-panel on-ink flex flex-col p-7 sm:p-9">
            <p className="eyebrow">Pay as you go</p>
            <p className="mt-5 flex flex-wrap items-baseline gap-2">
              <span className="text-on-ink-muted">from</span>
              <span className="font-heading text-6xl">$0.10</span>
              <span className="text-on-ink-muted">per 1,000 events after the first 100,000</span>
            </p>
            <ul className="mt-8 space-y-3 text-[0.97rem]">
              {[
                'Everything in Free, and the first 100,000 events still free',
                'No daily or monthly event cap',
                'Unlimited projects and sub-tenants',
                '395-day data retention by default, up to five years',
                'Realtime webhooks, up to 25 destinations per project',
                'Meta CAPI and GA4 Measurement Protocol forwarding',
                'Embed tokens and client portals without “Powered by”',
              ].map((t) => (
                <li key={t} className="flex gap-3">
                  <span aria-hidden="true" className="mt-[0.6rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--on-ink-signal)]" />
                  {t}
                </li>
              ))}
            </ul>
            <div className="mt-auto flex flex-wrap gap-3 pt-9">
              <PrimaryCta id="plan-payg" />
              <GhostLink href="/contact">Talk to us</GhostLink>
            </div>
          </article>
        </div>
      </section>

      <section aria-labelledby="rates-h" className="rule-top">
        <div className="container-y section grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionHead
              id="rates-h"
              eyebrow="Rate card"
              title="Graduated like tax brackets."
              lead="Each rate applies only to the events inside its band, so your price per event falls as you grow."
            />
            <div className="mt-8 overflow-x-auto rounded-lg border border-border bg-paper">
              <table className="data-table">
                <caption className="sr-only">Pay-as-you-go rates per 1,000 events by monthly volume band</caption>
                <thead>
                  <tr>
                    <th scope="col">Monthly events</th>
                    <th scope="col" className="text-right">USD / 1K</th>
                    <th scope="col" className="text-right">CAD / 1K</th>
                  </tr>
                </thead>
                <tbody className="font-mono">
                  {EVENT_TIERS.map((t) => (
                    <tr key={t.label}>
                      <th scope="row" className="font-normal">{t.label}</th>
                      <td className="text-right">{t.perK.USD === 0 ? 'Free' : formatRate(t.perK.USD, 'USD')}</td>
                      <td className="text-right">{t.perK.CAD === 0 ? 'Free' : formatRate(t.perK.CAD, 'CAD')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div id="calculator" className="scroll-mt-24">
            <PricingCalculator />
          </div>
        </div>
      </section>

      <section aria-labelledby="pfaq-h" className="bg-surface">
        <div className="container-y section grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHead id="pfaq-h" eyebrow="Pricing questions" title="Plain answers." lead={<>More in the <a href="/faq" className="underline">FAQ</a>, or write to {siteConfig.contact.email}.</>} />
          <FaqList items={FAQ} />
        </div>
      </section>

      <CtaBand title="Start on the free tier and grow into the rate card." secondary={{ href: '/compare', label: 'Compare costs' }} />
    </>
  );
}
