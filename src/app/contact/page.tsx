import { pageMetadata } from '@/lib/seo';
import { siteConfig } from '@/config/site';
import { JsonLd } from '@/components/ui/JsonLd';
import { PageHero } from '@/components/ui/PageHero';
import { ContactForm } from '@/components/ContactForm';

const TITLE = 'Contact';
const DESCRIPTION = 'Book a YOM demo or ask about pricing, agencies, platforms or privacy. Email contact@aapastech.com or call +1 437 800 0190.';

export const metadata = pageMetadata({ title: 'Contact & demo', description: DESCRIPTION, path: '/contact' });

export default function ContactPage() {
  const { contact, company, app } = siteConfig;
  return (
    <>
      <JsonLd page={{ path: '/contact', title: TITLE, description: DESCRIPTION, type: 'ContactPage' }} />
      <PageHero
        eyebrow="Contact"
        title="Ask us anything. Including the awkward questions."
        lead="Demos, pricing at your volume, agency or platform setups, privacy reviews. Or skip the conversation and start free."
        trail={[{ name: TITLE, path: '/contact' }]}
      />
      <section className="container-y grid gap-12 pb-24 lg:grid-cols-[1.4fr_0.6fr]">
        <ContactForm />
        <aside className="space-y-8" aria-label="Direct contact">
          <div>
            <p className="eyebrow">Email</p>
            <a href={`mailto:${contact.email}`} className="mt-2 block text-lg font-semibold underline">
              {contact.email}
            </a>
          </div>
          <div>
            <p className="eyebrow">Phone</p>
            <a href={contact.phoneHref} className="tt-num mt-2 block text-lg font-semibold underline">
              {contact.phone}
            </a>
          </div>
          <div>
            <p className="eyebrow">Headquarters</p>
            <p className="mt-2 text-lg">
              {company.hq.city}, {company.hq.region}
            </p>
            <p className="text-sm text-muted">{company.legalName}</p>
          </div>
          <div className="rounded-lg border border-border p-5">
            <p className="font-semibold">Already have an account?</p>
            <a href={app.logIn} className="link-arrow mt-2 inline-block text-sm">Log in →</a>
          </div>
        </aside>
      </section>
    </>
  );
}
