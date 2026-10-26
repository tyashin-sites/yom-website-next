import { pageMetadata } from '@/lib/seo';
import { JsonLd } from '@/components/ui/JsonLd';
import { LegalPage } from '@/components/LegalPage';
import { legalEntities, legalOfficer } from '@/config/legal';
import { EntityBlock } from '@/components/LegalEntities';

const TITLE = 'Terms of Service';
const DESCRIPTION =
  'The terms for using YOM (Your Own Metrics), offered by Aapastech Private Limited in India and 14818032 Canada Inc. everywhere else: plans and fees, your data, YOM Intent, consent, liability limits, termination, and Indian or Ontario law.';
export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: '/terms' });

const TOC = [
  { id: 'agreement', label: 'The agreement' },
  { id: 'definitions', label: 'Definitions' },
  { id: 'accounts', label: 'Accounts and access' },
  { id: 'service', label: 'The Service, plans and limits' },
  { id: 'fees', label: 'Fees, billing and taxes' },
  { id: 'customer-data', label: 'Customer Data and privacy' },
  { id: 'responsibilities', label: 'Your responsibilities, including consent' },
  { id: 'acceptable-use', label: 'Acceptable use' },
  { id: 'suspension', label: 'Suspension' },
  { id: 'early-access', label: 'Early-access, beta and coming-soon features' },
  { id: 'third-parties', label: 'Destinations and third-party services' },
  { id: 'ip', label: 'Intellectual property and feedback' },
  { id: 'confidentiality', label: 'Confidentiality' },
  { id: 'warranties', label: 'Disclaimer of warranties' },
  { id: 'liability', label: 'Limitation of liability' },
  { id: 'indemnity', label: 'Indemnity' },
  { id: 'termination', label: 'Term, termination and your data' },
  { id: 'service-levels', label: 'No service-level commitment' },
  { id: 'changes', label: 'Changes to the Service and these Terms' },
  { id: 'law', label: 'Governing law and disputes' },
  { id: 'consumers', label: 'Consumers and non-waivable rights' },
  { id: 'general', label: 'General' },
  { id: 'contact', label: 'Contact' },
];

export default function TermsPage() {
  const e = legalEntities.canada;
  const mail = <a href={`mailto:${legalOfficer.email}`}>{legalOfficer.email}</a>;
  return (
    <>
      <JsonLd page={{ path: '/terms', title: TITLE, description: DESCRIPTION }} />
      <LegalPage
        title={TITLE}
        path="/terms"
        toc={TOC}
        intro={
          <p>
            Please read these terms carefully. They limit our liability and make you responsible for consent on your
            own sites and apps. For disputes they set Indian law and arbitration in New Delhi if you are in India, and
            Ontario law and the courts of Toronto everywhere else.
          </p>
        }
      >
        <h2 id="agreement">1. The agreement</h2>
        <EntityBlock />
        <p>
          These Terms of Service (the &ldquo;Terms&rdquo;) are an agreement between that company and the person or
          organisation that creates an account or uses YOM (Your Own Metrics) (&ldquo;you&rdquo;, &ldquo;Customer&rdquo;).
          If you accept these Terms for an organisation, you confirm you have authority to bind it, and &ldquo;you&rdquo;
          means that organisation.
        </p>
        <p>
          The agreement is made up of: any order form or other document signed by both parties (an &ldquo;Order&rdquo;);
          the <a href="/dpa">Data Processing Addendum</a> (&ldquo;DPA&rdquo;), together with the{' '}
          <a href="/intent-addendum">YOM Intent Addendum</a> if you turn on YOM Intent; these Terms; and the{' '}
          <a href="/acceptable-use">Acceptable Use Policy</a>. If they conflict, that order applies, except that the DPA
          (and, for YOM Intent, the Intent Addendum) controls on the processing of personal data. You accept these Terms
          by creating an account, clicking to accept them, or using the Service.
        </p>
        <p>
          YOM is a business service. You must be at least 18 and use it for your trade, business, craft or profession.
          Section 21 explains how consumer-protection law applies if you are not a business.
        </p>

        <h2 id="definitions">2. Definitions</h2>
        <ul>
          <li>
            <strong>Service</strong>: the YOM platform, including the dashboard, APIs, ingest endpoints, SDKs, MCP server,
            client portals, embeds, email reports, connectors, plugins and documentation we make available, as updated
            from time to time.
          </li>
          <li>
            <strong>Customer Data</strong>: data you, your users or your sites and apps submit to the Service, including
            events about your end users (&ldquo;End Users&rdquo;) and the reports derived from them.
          </li>
          <li>
            <strong>Account Data</strong>: information about you and your authorised users that we need to run the
            account, such as names, emails, sign-in and billing details.
          </li>
          <li>
            <strong>Authorised Users</strong>: your employees, contractors, clients and other people you allow to use the
            Service under your account, including through keys, tokens or client portals.
          </li>
          <li>
            <strong>Fees</strong>: the amounts payable for the Service under your plan or an Order.
          </li>
        </ul>

        <h2 id="accounts">3. Accounts and access</h2>
        <ul>
          <li>Give us accurate account information and keep it current.</li>
          <li>
            Keep passwords, secret keys, management keys and embed tokens confidential. Only publishable keys may be put
            in client-side code. Anything done with your credentials is treated as done by you.
          </li>
          <li>Tell us promptly at {legalOfficer.email} if you suspect unauthorised use of your account or keys.</li>
          <li>
            You are responsible for your Authorised Users&rsquo; compliance with these Terms, and for the access you give
            them, including client-portal logins and sub-tenant keys.
          </li>
        </ul>

        <h2 id="service">4. The Service, plans and limits</h2>
        <p>
          Subject to these Terms and payment of applicable Fees, we grant you a non-exclusive, non-transferable right,
          during the term, to use the Service for your internal business purposes and, where your plan allows, to provide
          reports and portals to your own clients and customers.
        </p>
        <p>
          Each plan has quotas and limits, such as event volume, data retention, export windows, destinations,
          sub-tenants, portals and scheduled reports. Limits are shown in the product and on our{' '}
          <a href="/pricing">pricing page</a>. Rate limits and fair-use limits also apply to protect the Service for
          everyone. If you exceed a limit, we may throttle, queue, sample, drop or refuse the excess, or ask you to move
          to a suitable plan. On a free plan, events over the monthly allowance may not be processed.
        </p>
        <p>
          Some numbers YOM reports, such as funnels, attribution and unique-visitor counts, are statistical estimates.
          Conversion counts are deduplicated on the event id you send. The accuracy of any report depends on the data
          your sites and apps send, the consent your End Users give, and factors outside our control such as ad blockers
          and network failures.
        </p>
        <p>
          We may change, add or remove features. We will not materially reduce the core functionality of a paid plan
          during a billing period you have already paid for, except where needed for security, legal compliance or a
          third-party change outside our control.
        </p>

        <h2 id="fees">5. Fees, billing and taxes</h2>
        <ul>
          <li>
            The Free plan has no Fees. Pay-as-you-go Fees are calculated on the graduated rates published on our pricing
            page when the usage occurs, and are billed in arrears unless an Order says otherwise.
          </li>
          <li>
            Payments are processed by our payment providers. You authorise us and them to charge your payment method for
            Fees when due. Fees are non-refundable except where these Terms or the law require a refund.
          </li>
          <li>
            Fees exclude taxes. You pay all applicable sales, use, goods and services, harmonized, value-added and similar
            taxes, other than taxes on our net income.
          </li>
          <li>
            If a payment fails or is overdue, we may suspend paid features or the account after giving you at least 7
            days&rsquo; notice. Overdue amounts may carry interest at 1% per month (12% per year) or the highest rate the
            law allows, whichever is lower.
          </li>
          <li>
            We may change prices with at least 30 days&rsquo; notice. Changes apply from your next billing period. If you
            don&rsquo;t agree, you can stop using the paid plan before the change takes effect.
          </li>
          <li>Dispute a charge in good faith within 60 days of the invoice, or it is final.</li>
        </ul>

        <h2 id="customer-data">6. Customer Data and privacy</h2>
        <p>
          As between you and us, you own Customer Data. You grant us a worldwide, non-exclusive, royalty-free licence to
          host, copy, process, transmit and display Customer Data as needed to provide, secure and support the Service,
          to deliver it to the destinations you configure, and as described in the DPA. We process personal data in
          Customer Data as your processor or service provider, under the <a href="/dpa">DPA</a>, which forms part of
          these Terms. For YOM Intent audience exports, the <a href="/intent-addendum">Intent Addendum</a> sets out our
          role.
        </p>
        <p id="aggregated-data">
          We may create aggregated or de-identified data from the operation of the Service and from Customer Data, and
          use it to run, secure and improve the Service and to publish benchmarks and industry reports, which we may
          share with others. A statistic never names you, your End Users or any individual, and is never presented in a
          way that would let someone identify them. Every statistic we publish or share comes from at least 100 people
          and at least 5 customers, and no single customer makes up more than a quarter of it. It uses data at least 30
          days old and includes no prices and no forward-looking figures. It contains no personal data. We take
          reasonable technical and organisational steps so it can&rsquo;t be linked back to anyone, we won&rsquo;t try to
          re-identify anyone, and anyone we share it with must agree not to try either. We never use data received
          through Shopify&rsquo;s APIs, webhooks, pixels or app extensions, or data about people in Quebec, for this.
        </p>
        <p>
          We will not sell Customer Data. We do not use it to build profiles of End Users or for advertising, except
          when you turn on YOM Intent. Then we build interest profiles and send audiences for you alone, from your own
          sites and apps and on your instructions, under the <a href="/intent-addendum">YOM Intent Addendum</a>, which
          becomes part of these Terms when you turn YOM Intent on. YOM Intent is off unless you turn it on.
        </p>
        <p>
          Our handling of Account Data and of website visitors&rsquo; information is described in our{' '}
          <a href="/privacy">Privacy Policy</a>.
        </p>

        <h2 id="responsibilities">7. Your responsibilities, including consent</h2>
        <p>You are solely responsible for:</p>
        <ul>
          <li>
            <strong>Lawful basis and consent.</strong> Having a lawful basis, and obtaining any consent required, for
            every piece of data your sites and apps send to YOM and for every destination you forward data to, under all
            laws that apply to you and your End Users (including India&rsquo;s Digital Personal Data Protection Act,
            2023, PIPEDA, Quebec&rsquo;s Law 25, Canada&rsquo;s anti-spam legislation, the GDPR and UK GDPR, the
            ePrivacy rules, and US state privacy laws).
          </li>
          <li>
            <strong>Notices.</strong> Telling End Users about your use of analytics and of any destination, in a privacy
            notice and, where required, a consent banner you control.
          </li>
          <li>
            <strong>Configuration.</strong> Choosing settings that fit your legal obligations, such as the consent mode,
            the Global Privacy Control and Do Not Track policy, PII scrubbing, retention, and which destinations receive
            which events. YOM&rsquo;s privacy defaults are safeguards, not legal advice, and they do not make your use
            compliant on their own.
          </li>
          <li>
            <strong>Server events.</strong> The content of events you send from your servers, which YOM does not scrub.
          </li>
          <li>
            <strong>Sensitive data.</strong> Not sending data the <a href="/acceptable-use">Acceptable Use Policy</a>{' '}
            prohibits, including health information and other sensitive categories, unless we have agreed otherwise in a
            signed document.
          </li>
          <li>
            <strong>End-User requests.</strong> Responding to requests from your End Users. We will help as the DPA
            describes.
          </li>
          <li>
            <strong>Your clients.</strong> Where you use YOM to serve your own clients (for example as an agency or
            platform), having your own agreements with them that permit the processing.
          </li>
        </ul>

        <h2 id="acceptable-use">8. Acceptable use</h2>
        <p>
          You must comply with the <a href="/acceptable-use">Acceptable Use Policy</a>, which is part of these Terms.
        </p>
        <p>
          You must not use YOM to collect or store data you have no right to collect, to track children, or for anything
          unlawful. If you do, we can suspend or end your access and delete the data, and we will report offences that
          the law requires us to report.
        </p>

        <h2 id="suspension">9. Suspension</h2>
        <p>
          We may suspend all or part of your access to the Service, or disable specific keys, tokens, portals or
          destinations, if we reasonably believe: you have breached these Terms or the Acceptable Use Policy; your use
          poses a security risk to the Service or others, or could expose us or others to liability; your use is
          unlawful or we are required by law to do so; or Fees are overdue as described in section 5. We will give notice
          where practical and lawful, limit the suspension to what is reasonably needed, and lift it once the cause is
          resolved. Suspension does not relieve you of Fees for usage that occurred.
        </p>

        <h2 id="early-access">10. Early-access, beta and coming-soon features</h2>
        <p>
          Features labelled &ldquo;early access&rdquo;, &ldquo;beta&rdquo;, &ldquo;preview&rdquo; or similar (including,
          at the date above, the Shopify app, the WooCommerce plugin and the Looker Studio connector) are provided{' '}
          <strong>&ldquo;as is&rdquo; and &ldquo;as available&rdquo;</strong>, may be changed or withdrawn at any time, may
          have limited support, and are excluded from any warranty, support or service commitment. Features described as
          &ldquo;coming soon&rdquo; or on a roadmap are not part of the Service until released, and you should not rely on
          them when deciding to buy.
        </p>

        <h2 id="third-parties">11. Destinations and third-party services</h2>
        <p>
          The Service can send Customer Data to services you choose, such as webhooks, Meta, Google Analytics, cloud
          storage buckets, data warehouses, Shopify, WooCommerce and Looker Studio (&ldquo;Third-Party Services&rdquo;).
          When you configure a destination or connector, you instruct us to send that data, and the Third-Party
          Service&rsquo;s own terms and privacy practices govern what it does with it. Third-Party Services are not our
          sub-processors and we are not responsible for them, their availability, or changes to their APIs that affect
          the Service. You are responsible for having the right to send the data and for the credentials you give us.
        </p>

        <h2 id="ip">12. Intellectual property and feedback</h2>
        <p>
          We and our licensors own the Service, including its software, SDKs, designs, documentation and all improvements,
          and all intellectual property rights in them. Except for the rights expressly granted in these Terms, no rights
          are granted to you. Open-source components are licensed under their own licences, which prevail for those
          components.
        </p>
        <p>
          If you give us suggestions, ideas or other feedback, you grant us a perpetual, irrevocable, worldwide,
          royalty-free licence to use it for any purpose without obligation to you. You are not required to give
          feedback.
        </p>
        <p>
          You may refer to YOM in the ordinary course. We may identify you as a customer only with your permission.
        </p>

        <h2 id="confidentiality">13. Confidentiality</h2>
        <p>
          Each party will protect the other&rsquo;s non-public information that is marked or reasonably understood as
          confidential with at least reasonable care, use it only to perform this agreement, and disclose it only to
          people who need to know it and are bound by similar duties, or where the law requires (with notice where
          lawful). This does not apply to information that is public through no fault of the recipient, already known to
          it, independently developed, or rightfully received from someone else. Customer Data is also protected by the
          DPA.
        </p>

        <h2 id="warranties">14. Disclaimer of warranties</h2>
        <p className="caps">
          To the maximum extent permitted by law, the Service, including all reports, estimates, AI-generated outputs,
          connectors and early-access features, is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo;. We and our
          suppliers disclaim all warranties and conditions, express, implied or statutory, including merchantability,
          merchantable quality, fitness for a particular purpose, title, non-infringement, and any arising from course
          of dealing or usage of trade. We do not warrant that the Service will be uninterrupted, error-free or secure,
          that data will not be lost or delayed, that reports will be accurate or complete, or that use of the Service
          will make you compliant with any law. Nothing we say on our website or in support is legal advice.
        </p>

        <h2 id="liability">15. Limitation of liability</h2>
        <p className="caps">
          To the maximum extent permitted by law: (a) neither party will be liable for any indirect, incidental, special,
          consequential, exemplary or punitive damages, or for loss of profits, revenue, business, goodwill, anticipated
          savings, or data (other than our obligation to restore from available backups), however caused and even if
          advised of the possibility; and (b) each party&rsquo;s total aggregate liability arising out of or relating to
          this agreement will not exceed the Fees paid and payable by you to us for the Service in the 12 months before
          the event giving rise to the liability, or, if you have paid no Fees in that period, CAD $100.
        </p>
        <p>
          The limits in this section do not apply to: your obligation to pay Fees; your indemnity obligations; your breach
          of section 7 or the Acceptable Use Policy; either party&rsquo;s infringement or misappropriation of the
          other&rsquo;s intellectual property; or liability that cannot be limited by law, such as for fraud, wilful
          misconduct, or death or personal injury caused by negligence. These limits apply to all claims together, in
          contract, tort (including negligence), statute or otherwise, and are an essential basis of our pricing.
        </p>

        <h2 id="indemnity">16. Indemnity</h2>
        <p>
          You will defend, indemnify and hold harmless us, our affiliates (including the other company named in section
          1), and their directors, officers, employees
          and agents from and against any third-party claim, regulatory investigation or proceeding, and resulting
          losses, damages, fines, penalties, costs and reasonable legal fees, arising out of or relating to: (a) Customer
          Data, including any claim that its collection, use or forwarding infringed a person&rsquo;s privacy or other
          rights or lacked a lawful basis or consent; (b) your sites, apps, products and services; (c) your use of the
          Service, including use by your Authorised Users and clients; (d) your configuration of destinations and
          Third-Party Services; or (e) your breach of these Terms or of law. We will notify you promptly of a claim, let you
          control its defence (you may not settle it in a way that admits fault by us or imposes obligations on us
          without our consent), and give reasonable help at your expense. We may take part with our own counsel at our own
          cost.
        </p>

        <h2 id="termination">17. Term, termination and your data</h2>
        <ul>
          <li>These Terms apply from when you first accept them until your account is closed.</li>
          <li>
            You may stop using the Service and close your account at any time by asking us at {legalOfficer.email} or, where available, using the
            controls in the product. Fees for usage up to closing remain payable.
          </li>
          <li>
            We may terminate for convenience with at least 30 days&rsquo; notice. We may terminate immediately on notice
            if you materially breach these Terms and do not cure the breach within 15 days of notice (or at once if it
            cannot be cured), if you repeatedly breach the Acceptable Use Policy, or if you become insolvent. We may close
            free accounts that have had no activity for 12 months, after giving notice.
          </li>
          <li>
            <strong>Export before you go.</strong> While your account is active you can export Customer Data with the
            tools in the Service, within the export windows of your plan. For 30 days after termination (other than
            termination for your breach of the Acceptable Use Policy or for legal reasons), you may ask us in writing to
            give you an export of Customer Data that we still hold, in a commonly used format.
          </li>
          <li>
            <strong>Deletion.</strong> After that 30-day period we may delete Customer Data at any time, and we will delete
            it within 180 days after termination as described in the DPA, except where the law requires us to keep it.
            Before termination, data is kept and deleted according to your plan&rsquo;s retention and your settings.
          </li>
          <li>
            Sections that by their nature should survive termination survive, including sections 5 (for amounts owed), 6,
            12 to 16, 17, and 20 to 22.
          </li>
        </ul>

        <h2 id="service-levels">18. No service-level commitment</h2>
        <p>
          We work to keep the Service available and fast, but we do not offer an uptime or response-time commitment,
          service credits or a specific support response time unless an Order signed by both parties says so. Planned
          maintenance and outages of our infrastructure providers can interrupt the Service.
        </p>

        <h2 id="changes">19. Changes to the Service and these Terms</h2>
        <p>
          Section 4 covers changes to the Service. We may change these Terms. If a change matters to you, we will tell you
          by email or in the product at least 30 days before it takes effect, unless the change is required by law
          sooner. Using YOM after a change takes effect means you accept it. If you do not agree, you can cancel before
          that date and we will refund any prepaid Fees for the unused period. The &ldquo;Last updated&rdquo; date shows
          the current version. Changes do not apply retroactively to disputes already notified.
        </p>

        <h2 id="law">20. Governing law and disputes</h2>
        <p>
          Before starting proceedings, the party with a dispute will notify the other in writing and both will try in good
          faith to resolve it for 30 days. Any claim must be brought within one year after the cause of action arises, to
          the extent the law allows. The United Nations Convention on Contracts for the International Sale of Goods does
          not apply.
        </p>
        <p>
          <strong>If you are in India</strong> (your contract is with {legalEntities.india.name}), these Terms are governed
          by the laws of India. A dispute that is not resolved in those 30 days will be settled by arbitration under the
          Arbitration and Conciliation Act, 1996, before a sole arbitrator appointed by agreement of the parties (or,
          failing agreement, under that Act). The seat of arbitration is New Delhi and the language is English. Subject to
          that, the courts at Delhi have exclusive jurisdiction, including over interim relief and applications about the
          arbitration.
        </p>
        <p>
          <strong>Everywhere else</strong> (your contract is with {e.name}), these Terms are governed by the laws of the
          Province of Ontario and the federal laws of Canada that apply there, without regard to conflict-of-laws rules.
          The courts located in Toronto, Ontario have exclusive jurisdiction over any dispute arising out of or relating to
          these Terms or the Service, and each party submits to them. The parties may agree in writing to resolve a
          particular dispute by arbitration instead.
        </p>
        <p>
          In either case, either party may seek urgent injunctive relief, or relief to protect its intellectual property
          or confidential information, in any court of competent jurisdiction.
        </p>

        <h2 id="consumers">21. Consumers and non-waivable rights</h2>
        <p>
          The Service is intended for businesses. If, despite that, you use it as a consumer, or the law of the place you
          live gives you rights that cannot be excluded or limited by contract (including consumer-protection law in
          India, Quebec or elsewhere in Canada), nothing in these Terms excludes or limits those rights, and any provision that
          would do so (including on governing law, choice of courts, warranties, liability or notice of changes) applies
          only to the extent the law permits. Residents of Quebec who are consumers may bring proceedings in the courts of
          Quebec.
        </p>

        <h2 id="general">22. General</h2>
        <ul>
          <li>
            <strong>Entire agreement.</strong> The documents listed in section 1 are the entire agreement on their subject
            and replace prior discussions. Terms in your purchase orders or other documents do not apply, even if we
            accept them.
          </li>
          <li>
            <strong>Assignment.</strong> You may not assign this agreement without our written consent. We may assign it
            to an affiliate or in connection with a merger, acquisition or sale of assets, with notice.
          </li>
          <li>
            <strong>Force majeure.</strong> Neither party is liable for delay or failure caused by events beyond its
            reasonable control, such as outages of internet or cloud infrastructure providers, natural disasters, war,
            labour disputes or acts of government, other than payment obligations.
          </li>
          <li>
            <strong>Notices.</strong> We may send notices to the email address of the account owner or in the product. You
            send notices to {legalOfficer.email}. Email notices are received when sent, unless a bounce is received.
          </li>
          <li>
            <strong>Sanctions and export.</strong> You confirm you are not on a Canadian, US, UK or EU sanctions list and will
            not use the Service in breach of export or sanctions laws.
          </li>
          <li>
            <strong>Relationship.</strong> The parties are independent contractors. There are no third-party
            beneficiaries.
          </li>
          <li>
            <strong>Severability and waiver.</strong> If a provision is unenforceable, it is limited to the minimum extent
            needed and the rest stays in effect. Failing to enforce a provision is not a waiver.
          </li>
          <li>
            <strong>Language.</strong> The parties have required that this agreement and all related documents be drawn
            up in English. <span lang="fr">Les parties ont exigé que la présente entente et tous les documents connexes
            soient rédigés en anglais.</span> A French version is available on request from {legalOfficer.email}.
          </li>
        </ul>

        <h2 id="contact">23. Contact</h2>
        <p>
          In India: {legalEntities.india.name}, {legalEntities.india.address}, {legalEntities.india.country},{' '}
          {legalEntities.india.phone}. Everywhere else: {e.name}, {e.address}, {e.phone}. Email for both: {mail}.
        </p>
        <p>
          Complaints about YOM, about content or data we hold, or about how we handle personal data go to our{' '}
          <a href="/grievance">Grievance Officer</a>, {legalOfficer.name}.
        </p>
      </LegalPage>
    </>
  );
}
