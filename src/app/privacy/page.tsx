import { pageMetadata } from '@/lib/seo';
import { siteConfig } from '@/config/site';
import { JsonLd } from '@/components/ui/JsonLd';
import { LegalDraft } from '@/components/LegalDraft';

const DESCRIPTION = 'Draft privacy notice for the YOM website and service, pending legal review.';
export const metadata = pageMetadata({ title: 'Privacy notice (draft)', description: DESCRIPTION, path: '/privacy' });

export default function PrivacyPage() {
  const { company, contact } = siteConfig;
  return (
    <>
      <JsonLd page={{ path: '/privacy', title: 'Privacy', description: DESCRIPTION }} />
      <LegalDraft title="Privacy" path="/privacy" updated="21 October 2026">
        <h2>Who we are</h2>
        <p>
          YOM (Your Own Metrics) is built by {company.builder}. In North America it is offered by {company.legalName},
          headquartered in {company.hq.city}, {company.hq.region}, {company.hq.countryName}. You can reach us at{' '}
          <a href={`mailto:${contact.email}`}>{contact.email}</a> or {contact.phone}.
        </p>

        <h2>Two different roles</h2>
        <p>
          This notice covers personal information we handle about visitors to this website and about our own
          customers. When a customer uses YOM to measure their own website or app, that customer decides what is
          collected about their visitors; for that data we act on the customer&rsquo;s instructions. Their visitors
          should read that customer&rsquo;s privacy notice.
        </p>

        <h2>What we collect on this website</h2>
        <ul>
          <li>Details you send through the contact form: name, email, company, topic, approximate event volume and your message.</li>
          <li>Basic technical logs needed to operate and secure the site.</li>
          <li>
            If analytics are enabled on this website, they use YOM&rsquo;s default configuration: cookieless unless you
            consent, with Global Privacy Control and Do Not Track honoured.
          </li>
        </ul>

        <h2>What we collect from customers</h2>
        <ul>
          <li>Account details: name, email, sign-in method and multi-factor settings.</li>
          <li>Billing details processed by our payment providers.</li>
          <li>Service data you send to YOM, handled according to your configuration and our terms.</li>
        </ul>

        <h2>How we use it</h2>
        <p>
          To reply to you, to provide and secure the service, to bill for it, and to meet legal obligations.
        </p>

        <h2>Your choices and rights</h2>
        <p>
          Depending on where you live, including under Canadian federal and provincial law and US state privacy laws,
          you may have rights to access, correct, delete or port your personal information, and to opt out of certain
          processing. Contact us to exercise them.
        </p>

        <h2>Retention</h2>
        <p>
          Contact-form messages are kept as long as needed to handle your request. Customer service data follows the
          retention of the customer&rsquo;s plan (90 days on Free, 365 days on pay-as-you-go) unless deleted earlier.
        </p>

        <h2>Changes</h2>
        <p>We&rsquo;ll post updates here and change the date above.</p>
      </LegalDraft>
    </>
  );
}
