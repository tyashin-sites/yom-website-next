import { pageMetadata } from '@/lib/seo';
import { SolutionPage, type SolutionContent } from '@/components/SolutionPage';
import { HeroLedger } from '@/components/signature/HeroLedger';

const c: SolutionContent = {
  slug: 'ecommerce',
  name: 'E-commerce & DTC',
  description:
    'Analytics for DTC and e-commerce brands: exact, deduplicated purchase and refund counts that reconcile with your order system, plus server-side conversions.',
  eyebrow: 'For e-commerce & DTC brands',
  title: 'Revenue that matches the order system.',
  lead: 'When analytics says one number and your order system says another, the order system wins. YOM is built to agree with it, order by order.',
  secondary: { href: '/pricing', label: 'See pricing' },
  painsTitle: 'Why the numbers drift',
  pains: [
    { stat: '32.5%', text: 'of US internet users ran an ad blocker in Q2 2025', source: 'adBlock' },
    { stat: '7 days', text: 'Safari’s cap on script-writable storage without user interaction', source: 'safariItp' },
    { stat: 'Hidden', text: 'GA4 withholds report rows under thresholds you can’t adjust', source: 'ga4Thresholds' },
  ],
  showcaseTitle: 'Every purchase and every refund, counted once.',
  showcaseLead:
    'Use the order id as the event id. A checkout page that fires twice, or a webhook your backend retries, still counts once, so the total lines up with your order list.',
  showcase: <HeroLedger />,
  today: [
    { title: 'Exact purchase & refund counts', body: 'Deduplicated on the event id, never sampled or thresholded.' },
    { title: 'Conversions from your backend', body: 'Send purchases to /v2/events with a secret key or HMAC signature; ad blockers never see them.' },
    { title: 'Ecommerce auto-capture', body: 'The browser SDK captures GA4-style ecommerce events and can detect common storefront platforms.' },
    { title: 'Ecommerce report', body: 'View item → add to cart → checkout → purchase, revenue, AOV and item-level revenue.' },
    { title: 'Channel attribution', body: 'First-, last- or any-touch by channel from UTM and referrer. A statistical estimate, labelled as one.' },
    { title: 'Consent-gated forwarding', body: 'Browser forwarding to your own GA4 or Meta Pixel, or server-side Meta CAPI and GA4 Measurement Protocol, only with explicit marketing consent and no GPC.' },
    { title: 'Revenue reconciliation', body: 'Send your orders by API or CSV; YOM matches each order id to its purchase event and lists what’s missing or extra.' },
    { title: 'Shopify & WooCommerce', body: 'A Shopify app and a WooCommerce plugin, in early access: not yet in the app stores, so we install them with you.' },
  ],
  soon: ['Shopify App Store and wordpress.org listings', 'Google Ads Enhanced Conversions'],
};

export const metadata = pageMetadata({ title: 'Analytics for e-commerce & DTC brands', description: c.description, path: '/solutions/ecommerce' });

export default function Page() {
  return <SolutionPage c={c} />;
}
