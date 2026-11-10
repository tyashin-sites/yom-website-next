import { pageMetadata } from '@/lib/seo';
import { JsonLd } from '@/components/ui/JsonLd';
import { PageHero } from '@/components/ui/PageHero';
import { SectionHead } from '@/components/ui/Section';
import { FaqList, type Faq } from '@/components/ui/FaqList';
import { CtaBand } from '@/components/ui/CtaBand';
import { GhostLink, PrimaryCta } from '@/components/ui/Cta';

const PATH = '/wordpress';
const TITLE = 'WordPress & WooCommerce plugin';
const WPORG = 'https://wordpress.org/plugins/yom-analytics/';
const DESCRIPTION =
  'YOM Analytics, the free YOM plugin on wordpress.org: privacy-first WordPress analytics, form leads and server-side WooCommerce order tracking that matches your real sales. Connect in one click.';

export const metadata = pageMetadata({
  title: 'WordPress & WooCommerce analytics plugin',
  description: DESCRIPTION,
  path: PATH,
});

const TRACKS: { title: string; body: string }[] = [
  {
    title: 'Any WordPress site',
    body: 'Page views, engagement, errors and Core Web Vitals. Cookieless until the visitor consents; with a WP Consent API banner, YOM follows the visitor’s choice.',
  },
  {
    title: 'Form leads, from your server',
    body: 'Contact Form 7, Gravity Forms, WPForms and Fluent Forms submissions count as leads, even when scripts are blocked. Only ids, the form title and the page are used, never the fields.',
  },
  {
    title: 'WooCommerce orders and refunds',
    body: 'Sent from your server when an order reaches a status you choose. The order id is the event id, so every order counts exactly once, whatever the retries or thank-you page reloads.',
  },
  {
    title: 'Consent on every order',
    body: 'The shopper’s checkout consent and Global Privacy Control signal travel with the server purchase. A missing choice stays “unknown” and is never treated as consent.',
  },
];

const STEPS: { title: string; body: string }[] = [
  { title: 'Install', body: 'In WordPress, go to Plugins → Add New, search for “YOM Analytics” and click Install, then Activate.' },
  { title: 'Connect', body: 'Open Settings → YOM Analytics (WooCommerce → YOM Analytics on stores) and click Connect YOM. Sign in or create a free account and pick a project. No keys to copy.' },
  { title: 'Check', body: 'The settings page shows the connection, what is tracked and the last server event. Your first page views show up in the YOM dashboard’s realtime view.' },
];

const FAQ: Faq[] = [
  {
    q: 'What is YOM Analytics for WordPress?',
    a: 'YOM Analytics is the official WordPress plugin for YOM (Your Own Metrics), first-party analytics by Aapastech. It adds privacy-first page analytics to any WordPress site and server-side purchase, refund and lead tracking to WooCommerce, so the revenue in your analytics matches the revenue in your orders. It is free on wordpress.org.',
  },
  {
    q: 'Is the plugin free?',
    a: 'Yes. The plugin is free and open source (GPLv2 or later), and the free YOM plan includes 100,000 events a month with no credit card. Above that, pay-as-you-go pricing applies.',
  },
  {
    q: 'Is YOM a Google Analytics alternative for WordPress?',
    a: 'Yes. YOM gives you traffic, conversions, funnels and attribution without Google’s tag, cookieless until a visitor consents. You can also keep GA4 and let YOM forward server-side purchases to it, only with the shopper’s marketing consent.',
  },
  {
    q: 'Does it track WooCommerce orders when the visitor uses an ad blocker?',
    a: 'Yes. Purchases, refunds and form leads are sent from your server, so browser filter lists never see them. Browser page views follow the visitor’s settings.',
  },
  {
    q: 'Does it work with WooCommerce HPOS, block checkout and page caching?',
    a: 'Yes. It supports High-Performance Order Storage and the cart and checkout blocks, and it prints nothing shopper-specific into cached pages.',
  },
  {
    q: 'Does it help with GDPR and cookie consent?',
    a: 'It is built for it: cookieless until consent, the visitor’s choice read from any WP Consent API banner, Global Privacy Control honoured, and no names, emails or form fields sent from your server. Compliance still depends on your own setup, so have your counsel review it.',
  },
  {
    q: 'Can an agency use it across client sites?',
    a: 'Yes. One YOM organisation can run many client sites. Give each its own project or sub-tenant, then share white-label client portals and scheduled email reports.',
  },
];

export default function WordPressPage() {
  return (
    <>
      <JsonLd
        page={{
          path: PATH,
          title: TITLE,
          description: DESCRIPTION,
          type: 'FAQPage',
          faq: FAQ,
          plugin: {
            name: 'YOM Analytics',
            description: DESCRIPTION,
            downloadUrl: WPORG,
            operatingSystem: 'WordPress',
            requirements: 'WordPress 6.3 or later, PHP 7.4 or later; WooCommerce 8.0 or later for store features',
          },
        }}
      />
      <PageHero
        eyebrow="WordPress & WooCommerce plugin"
        title="WordPress analytics that matches your WooCommerce orders."
        lead="YOM Analytics is free on wordpress.org. One click connects your site: page analytics without cookies until consent, form leads from your server, and every WooCommerce order counted exactly once."
        trail={[{ name: TITLE, path: PATH }]}
      >
        <PrimaryCta id="wordpress-start" />
        <GhostLink href={WPORG}>Get it on wordpress.org</GhostLink>
      </PageHero>

      <section aria-labelledby="tracks-h" className="container-y pb-20">
        <SectionHead id="tracks-h" eyebrow="What it tracks" title="Pages, leads and orders, each from the right place." />
        <ul className="mt-10 grid gap-5 sm:grid-cols-2">
          {TRACKS.map((t) => (
            <li key={t.title} className="card p-7">
              <h3 className="tt-h3">{t.title}</h3>
              <p className="mt-3 text-muted text-pretty">{t.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="install-h" className="container-y pb-20">
        <SectionHead id="install-h" eyebrow="Install" title="Live in about two minutes." />
        <ol className="mt-10 grid gap-5 lg:grid-cols-3">
          {STEPS.map((s, i) => (
            <li key={s.title} className="card p-7">
              <p className="font-mono text-sm text-muted">0{i + 1}</p>
              <h3 className="tt-h3 mt-2">{s.title}</h3>
              <p className="mt-3 text-muted text-pretty">{s.body}</p>
            </li>
          ))}
        </ol>
        <p className="mt-8 text-muted">
          Building your own integration instead? Read the <a href="/developers" className="underline">developer guide</a>, or see{' '}
          <a href="/solutions/ecommerce" className="underline">YOM for e-commerce</a> and{' '}
          <a href="/solutions/agencies" className="underline">YOM for agencies</a>.
        </p>
      </section>

      <section aria-labelledby="faq-h" className="container-y grid gap-8 pb-24 lg:grid-cols-[0.7fr_1.3fr]">
        <h2 id="faq-h" className="tt-h2">Questions about the plugin</h2>
        <FaqList items={FAQ} />
      </section>
      <CtaBand />
    </>
  );
}
