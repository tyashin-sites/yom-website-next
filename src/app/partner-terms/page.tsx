import { pageMetadata } from '@/lib/seo';
import { JsonLd } from '@/components/ui/JsonLd';
import { LegalPage } from '@/components/LegalPage';
import { EntityBlock } from '@/components/LegalEntities';
import { LEGAL_UPDATED_10_NOV } from '@/config/legal';

/**
 * YOM Partner Terms, version 2026-11-09: yom-legal-pack/17-yom-partner-terms.md.
 * The version string must match PARTNER_TERMS_VERSION in yourownmetrics (partner
 * program, PR #135), which records it when an owner joins. Facts about how the
 * partner program behaves trace to docs/partner-program.md and docs/partner-api.md.
 */
const TITLE = 'YOM Partner Terms';
const DESCRIPTION =
  'The terms for the YOM partner program: opening analytics accounts for your own customers, embedding their reports in your product, claim links, billing for managed organizations, key security, suspension and leaving.';
export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: '/partner-terms' });

const TOC = [
  { id: 'scope', label: 'Who these terms are with' },
  { id: 'what', label: '1. What the partner program lets you do' },
  { id: 'data', label: '2. Your customers and their data' },
  { id: 'claimed', label: '3. Claimed accounts' },
  { id: 'billing', label: '4. Billing' },
  { id: 'keys', label: '5. Keys and security' },
  { id: 'not-allowed', label: '6. What you must not do' },
  { id: 'leaving', label: '7. Suspension and leaving' },
  { id: 'changes', label: '8. Changes' },
  { id: 'everything-else', label: '9. Everything else' },
];

export default function PartnerTermsPage() {
  return (
    <>
      <JsonLd page={{ path: '/partner-terms', title: TITLE, description: DESCRIPTION }} />
      <LegalPage
        title={TITLE}
        path="/partner-terms"
        updated={LEGAL_UPDATED_10_NOV}
        toc={TOC}
        intro={
          <p>
            Version 2026-11-09. These Partner Terms apply when the owner of a YOM organization turns on the partner
            program. They add to the <a href="/terms">Terms of Service</a> and the{' '}
            <a href="/dpa">Data Processing Addendum</a>. If they conflict, these Partner Terms win for partner features
            only.
          </p>
        }
      >
        <h2 id="scope">Who these terms are with</h2>
        <EntityBlock />
        <p>
          &ldquo;We&rdquo; means that company. &ldquo;You&rdquo; means the organization whose owner accepted these
          Partner Terms.
        </p>

        <h2 id="what">1. What the partner program lets you do</h2>
        <p>A partner can use the YOM partner API to:</p>
        <ul>
          <li>
            open and manage YOM organizations for its own customers (&ldquo;managed organizations&rdquo;) and create
            projects in them;
          </li>
          <li>send server events into those projects;</li>
          <li>
            show a managed organization&rsquo;s reports inside the partner&rsquo;s own product, using short-lived embed
            tokens;
          </li>
          <li>
            send a managed organization&rsquo;s owner a sign-in link so they can take over the account (&ldquo;claim&rdquo;
            it);
          </li>
          <li>read daily usage totals for its managed organizations.</li>
        </ul>
        <p>
          You turn the program on and off yourself in Settings. Only an owner of an organization on the pay-as-you-go
          plan can accept these terms, and that owner must use two-step sign-in.
        </p>

        <h2 id="data">2. Your customers and their data</h2>
        <p>
          You are responsible for your relationship with your own customers. Before you open a managed organization
          for a customer, you must have their permission to do so under your agreement with them, and you must tell them
          that their analytics run on YOM.
        </p>
        <p>For data in a managed organization:</p>
        <ul>
          <li>your customer is the controller of their visitors&rsquo; data;</li>
          <li>
            you act for your customer, and we act for you, as processors under the{' '}
            <a href="/dpa">Data Processing Addendum</a>;
          </li>
          <li>
            once your customer claims the account, they also have a direct relationship with us under the{' '}
            <a href="/terms">Terms of Service</a>, and our Data Processing Addendum applies between us and them.
          </li>
        </ul>
        <p>
          You must not send us more personal data than your customers&rsquo; analytics need. Do not put names, email
          addresses, phone numbers or message text into event properties. You are responsible for any consent your
          customers&rsquo; visitors must give under the law that applies to them, and for honouring their choices.
        </p>

        <h2 id="claimed">3. Claimed accounts</h2>
        <p>
          When your customer claims a managed organization, they become its owner. They can see everything in it,
          export it, and remove your access in Settings. If they remove your access, your partner keys stop working for
          that organization at once. The organization and its data stay with your customer.
        </p>
        <p>
          You may not stop a customer from claiming their account, and you may not use a claimed account against its
          owner&rsquo;s instructions.
        </p>

        <h2 id="billing">4. Billing</h2>
        <p>
          Usage in your managed organizations is billed to your organization, at your plan&rsquo;s rates, until the
          managed organization moves to its own paid plan. You set the monthly event limit for each managed organization
          within your own allowance. If you leave the partner program, you still pay for usage in managed organizations
          that remain under your account, up to the limits you set, until you lower those limits or your customers move
          to their own plans.
        </p>

        <h2 id="keys">5. Keys and security</h2>
        <p>
          Keep your partner keys secret and on your servers. Never put them in a browser, a mobile app or a public
          repository. Tell us at <a href="mailto:contact@aapastech.com">contact@aapastech.com</a> within 72 hours if you
          believe a key has leaked, and revoke it in Settings straight away. Every partner action is recorded in the
          audit log of both your organization and the managed organization.
        </p>

        <h2 id="not-allowed">6. What you must not do</h2>
        <p>You must not:</p>
        <ul>
          <li>open managed organizations for people who have not asked for your product;</li>
          <li>
            use the partner API to read, copy or combine data across your customers&rsquo; accounts, except through the
            daily totals we provide;
          </li>
          <li>
            resell YOM as a standalone analytics product under your own brand without a separate written agreement with
            us;
          </li>
          <li>try to get around plan limits, rate limits or security controls.</li>
        </ul>

        <h2 id="leaving">7. Suspension and leaving</h2>
        <p>
          You can leave the partner program at any time in Settings. Your managed organizations, their data and their
          owners are not affected; your partner keys stop working for partner actions.
        </p>
        <p>
          We may suspend your partner access if you break these terms, if your account is unpaid, or if we need to
          protect your customers, their visitors or YOM. When we do, we email your organization&rsquo;s owners and tell
          them why, unless the law stops us. Suspension does not delete any data. We will lift it once the problem is
          fixed.
        </p>

        <h2 id="changes">8. Changes</h2>
        <p>
          We may update these Partner Terms. We will give owners at least 30 days&rsquo; notice by email and in the
          product before a change that reduces your rights takes effect, and we will ask you to accept the new version.
          If you do not accept it, you can leave the program.
        </p>

        <h2 id="everything-else">9. Everything else</h2>
        <p>
          The <a href="/terms">Terms of Service</a> govern everything these Partner Terms do not cover, including
          liability limits, warranties, governing law and disputes. Questions:{' '}
          <a href="mailto:contact@aapastech.com">contact@aapastech.com</a>.
        </p>
      </LegalPage>
    </>
  );
}
