import { pageMetadata } from '@/lib/seo';
import { JsonLd } from '@/components/ui/JsonLd';
import { LegalPage } from '@/components/LegalPage';
import { EntityBlock } from '@/components/LegalEntities';
import { legalEntities } from '@/config/legal';

/**
 * YOM Intent Addendum v1.0: yom-legal-pack/01-yom-intent-dpa-addendum.md as
 * settled by COUNSEL-DETERMINATIONS.md (A1, B6, B7, B12, C13, C14, D17, E23,
 * G37, G38, G39). Facts about how Intent behaves trace to docs/intent.md on
 * the yourownmetrics Intent branch; see docs/LEGAL-SOURCES.md.
 */
const TITLE = 'YOM Intent Addendum';
const DESCRIPTION =
  'The processing terms for YOM Intent: interest profiles, segments, hot leads and audience exports to your own Meta, Google Ads and Klaviyo accounts, with consent rules, the CCPA third-party terms, retention and excluded regions (EEA, UK, Switzerland, Quebec).';
export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: '/intent-addendum' });

const TOC = [
  { id: 'scope', label: 'Who this addendum is with and when it applies' },
  { id: 'definitions', label: '1. Definitions' },
  { id: 'roles', label: '2. Roles' },
  { id: 'instructions', label: '3. Your instructions' },
  { id: 'own-purposes', label: '4. YOM’s own purposes: none' },
  { id: 'your-obligations', label: '5. Your obligations' },
  { id: 'safeguards', label: '6. YOM’s safeguards for Intent' },
  { id: 'shopify', label: '7. Shopify-Sourced Data' },
  { id: 'deletion', label: '8. Withdrawal, deletion and audiences' },
  { id: 'breach', label: '9. Breach notice' },
  { id: 'rights', label: '10. Rights requests' },
  { id: 'us', label: '11. US state laws' },
  { id: 'excluded-regions', label: '12. EEA, UK, Switzerland and Quebec' },
  { id: 'subprocessors', label: '13. Sub-processors' },
  { id: 'schedule-1', label: 'Schedule 1: CCPA third-party terms' },
  { id: 'annex-1', label: 'Annex 1: Details of processing' },
  { id: 'annex-2', label: 'Annex 2: Excluded Categories' },
];

export default function IntentAddendumPage() {
  const { india: IN, estonia: EE, canada: CA } = legalEntities;
  return (
    <>
      <JsonLd page={{ path: '/intent-addendum', title: TITLE, description: DESCRIPTION }} />
      <LegalPage
        title={TITLE}
        path="/intent-addendum"
        toc={TOC}
        intro={
          <p>
            Version 1.0. This YOM Intent Addendum (&ldquo;Intent Addendum&rdquo;) adds to the{' '}
            <a href="/dpa">Data Processing Addendum</a> (&ldquo;DPA&rdquo;) and the <a href="/terms">Terms of Service</a>.
            It covers the processing YOM Intent needs: per-customer profiles, interest scores, segments, hot leads,
            on-site personalisation, assisted-conversion reports and audience exports to your own accounts. It applies
            only if you turn on YOM Intent. YOM Intent is not yet available to customers; once it is, it stays off
            unless you turn it on. It is not offered to customers of {EE.name} (customers in the European Union and the
            United Kingdom).
          </p>
        }
      >
        <h2 id="scope">Who this addendum is with and when it applies</h2>
        <EntityBlock />
        <p>
          This Intent Addendum is between that company and the customer (&ldquo;Customer&rdquo;, &ldquo;you&rdquo;), which
          means {IN.name} or {CA.name}: YOM Intent is not offered to customers of {EE.name}, and this Intent Addendum does
          not apply to them. It applies when you turn on any YOM Intent feature, and only to the processing those
          features do. If it conflicts
          with the DPA about that processing, this Intent Addendum wins. Words defined in the DPA or the Terms have the
          same meaning here. It does not create any pooled data: your Profiles are yours alone.
        </p>

        <h2 id="definitions">1. Definitions</h2>
        <ul>
          <li>
            <strong>Intent Features</strong>: the features of YOM Intent, such as profiles, interest scores, stages,
            Segments, Hot Leads, on-site personalisation, assisted-conversion reports and Audience Exports, as each
            becomes available.
          </li>
          <li>
            <strong>Intent Data</strong>: Customer Personal Data processed for Intent Features.
          </li>
          <li>
            <strong>Profile</strong>: a record, held for you alone, that groups events from your own properties about
            one visitor or customer under an identifier scoped to you, with interest scores per product category, a
            purchase stage, recency and consent state.
          </li>
          <li>
            <strong>Segment</strong>: a set of Profiles you define or select (for example &ldquo;considering sofas, last
            14 days&rdquo;).
          </li>
          <li>
            <strong>Hot Lead</strong>: a Profile linked to a lead or account you hold (for example a lead form
            submission), ranked by how engaged that person has been since.
          </li>
          <li>
            <strong>Audience Export</strong>: sending a Segment to a Destination Account, as Hashed Identifiers (ad
            platforms and CSV files) or as your own user ids with segment properties (email and CRM tools such as
            Klaviyo).
          </li>
          <li>
            <strong>Destination Account</strong>: an advertising, email or CRM account that <strong>you</strong> hold
            and connect to YOM (for example Meta Ads, Google Ads or Klaviyo), or a CSV file you download.
          </li>
          <li>
            <strong>Hashed Identifier</strong>: a SHA-256 hash of a normalised email address (trimmed, lower-cased) or
            phone number (E.164).
          </li>
          <li>
            <strong>Excluded Categories</strong>: the categories in <a href="#annex-2">Annex 2</a>.
          </li>
          <li>
            <strong>Excluded Regions</strong>: the European Economic Area, the United Kingdom, Switzerland and the
            Canadian province of Quebec.
          </li>
        </ul>

        <h2 id="roles">2. Roles</h2>
        <p>
          <strong>2.1</strong> For Intent Data you are the controller, data fiduciary and &ldquo;business&rdquo;. For
          building Profiles, scores, Segments and Hot Leads, for on-site personalisation and for reports, YOM is your
          processor, data processor and &ldquo;service provider&rdquo; (Cal. Civ. Code §1798.140(ag)). Where you act for
          your own client, YOM is your sub-processor.
        </p>
        <p>
          <strong>2.2 Audience Exports.</strong> Under the California regulations, sending a customer list to an
          advertising platform so that it can find those people and show them ads is cross-context behavioural
          advertising, which a service provider cannot provide (11 CCR §7050(b)). So for Audience Exports, and for the
          CCPA and similar US state laws only, YOM acts as a <strong>third party</strong> to which you make personal
          information available, and <a href="#schedule-1">Schedule 1</a> sets out the contract terms 11 CCR §7053
          requires. Under every other law YOM remains your processor for Audience Exports too.
        </p>
        <p>
          <strong>2.3</strong> Each Destination Account is a recipient you choose under your own agreement with its
          provider. Meta, Google, Klaviyo and similar services are not YOM&rsquo;s sub-processors (as in DPA section 6).
        </p>
        <p>
          <strong>2.4</strong> Under India&rsquo;s Digital Personal Data Protection Act, 2023, this Intent Addendum and
          the DPA are the contract section 8(2) requires for YOM to process Intent Data on your behalf.
        </p>

        <h2 id="instructions">3. Your instructions</h2>
        <p>You instruct YOM to:</p>
        <ul>
          <li>(a) build Profiles from events your own properties and connectors send to your YOM projects;</li>
          <li>
            (b) score interest per product category and assign stages, using the event weights and decay settings shown
            in the dashboard;
          </li>
          <li>(c) build the Segments and Hot Leads you define;</li>
          <li>(d) personalise content on your own properties using your Profiles;</li>
          <li>(e) send Audience Exports to the Destination Accounts you connect, on the schedule you set;</li>
          <li>(f) report assisted conversions across your own properties;</li>
          <li>(g) delete Profiles and stop exporting people as clause 8 sets out.</li>
        </ul>

        <h2 id="own-purposes">4. YOM&rsquo;s own purposes: none</h2>
        <p>
          <strong>4.1</strong> YOM processes Intent Data only to provide the Intent Features to you. YOM will not:
        </p>
        <ul>
          <li>
            (a) use Intent Data for YOM&rsquo;s own advertising, for any other customer&rsquo;s advertising, or for any
            media product of YOM&rsquo;s or its affiliates;
          </li>
          <li>
            (b) add Intent Data to any dataset shared across customers, unless you have separately agreed to that in
            writing and the visitor has chosen to take part;
          </li>
          <li>
            (c) combine Intent Data with personal data from any other customer or from YOM&rsquo;s own interactions with
            people, or link your Profiles to another customer&rsquo;s Profiles (Cal. Civ. Code §1798.140(e)(6); 11 CCR
            §7050(a));
          </li>
          <li>
            (d) sell or share Intent Data, or disclose it to anyone except your Destination Accounts and YOM&rsquo;s
            sub-processors;
          </li>
          <li>(e) use Intent Data to train or tune any model used for another customer.</li>
        </ul>
        <p>
          <strong>4.2</strong> YOM may use statistics about how Intent performs (for example match rates, or how quickly
          interest decays in a product category) only as aggregated, de-identified data under section 6 of the{' '}
          <a href="/terms#aggregated-data">Terms</a>, and never from Shopify-Sourced Data.
        </p>

        <h2 id="your-obligations">5. Your obligations</h2>
        <p>
          <strong>5.1 Notice and consent.</strong> Before Intent Data is collected, your privacy notice tells people that
          you build interest profiles from their activity on your properties and use them to personalise your site; that
          you score how engaged your leads are, if you use Hot Leads; and that you send their email address or phone
          number in scrambled (hashed) form to the advertising and marketing services you use, naming each of Meta,
          Google and Klaviyo that you use, so they can show those people your ads or messages. You obtain the consent the
          law requires:
        </p>
        <ul>
          <li>
            India: explicit, specific consent to personalisation before profiling, and to advertising before export
            (Digital Personal Data Protection Act, 2023, section 6), through YOM&rsquo;s consent features or an equivalent
            consent you record;
          </li>
          <li>
            United States: you offer the opt-out of &ldquo;sale&rdquo; and &ldquo;sharing&rdquo; (or targeted
            advertising) that applies, including a &ldquo;Do Not Sell or Share My Personal Information&rdquo; link where
            the CCPA requires one, and honour Global Privacy Control (Cal. Civ. Code §1798.120, §1798.135; 11 CCR §7025);
          </li>
          <li>
            Canada outside Quebec: express consent before profiling for advertising and before sending hashed lists to ad
            platforms (PIPEDA Schedule 1, clause 4.3; the federal Privacy Commissioner found in 2023 that a retailer
            sharing hashed emails with Meta needed express consent and could not rely on its privacy policy, PIPEDA
            Findings #2023-001).
          </li>
        </ul>
        <p>
          <strong>5.2 Platform terms.</strong> You accept Meta&rsquo;s Customer List Custom Audiences Terms (in effect
          from 3 December 2025), Google&rsquo;s Customer Match policy, Klaviyo&rsquo;s terms and any equivalent terms of
          other Destination Accounts, and you keep your accounts in good standing. Those terms make you represent that you
          have the rights and lawful basis to use the data, require you to exclude people who opted out, and forbid
          audiences based on children&rsquo;s, health or financial data. Google allows Customer Match targeting only for
          accounts with 90 days of history and more than USD 50,000 lifetime spend; smaller accounts can use lists only
          for observation and exclusions, so a Google export may not let you target anyone.
        </p>
        <p>
          <strong>5.3 US opt-out display.</strong> If you sell or share personal information, California&rsquo;s
          regulations require you to show visitors whether you honoured their opt-out preference signal (11 CCR
          §7025(c)(6)). Showing that message is your responsibility.
        </p>
        <p>
          <strong>5.4 What you don&rsquo;t send.</strong> You do not send data in the Excluded Categories, data about
          anyone you know to be under 18 in India, under 16 in the US or a child under COPPA, or government identifiers,
          card numbers or passwords (<a href="/acceptable-use">Acceptable Use Policy</a>).
        </p>
        <p>
          <strong>5.5 Health-sector customers.</strong> If you are a health-sector business (Annex 2, part 2), you may
          use Profiles for analytics and on-site content, but you may not export Segments that reflect health interest.
          YOM blocks every export from a project you mark as a health-sector site.
        </p>
        <p>
          <strong>5.6 Excluded Regions.</strong> You do not use Intent Features for people you know to be in an Excluded
          Region (clause 12).
        </p>

        <h2 id="safeguards">6. YOM&rsquo;s safeguards for Intent</h2>
        <p>
          <strong>6.1 Consent gating.</strong> A Profile is built and scored only from events that carry the
          person&rsquo;s consent to analytics and to personalisation, in every region. An Audience Export includes only
          people whose latest stored consent grants advertising (seen within the previous 180 days), who were active in
          the previous 180 days, and who have no Global Privacy Control signal, opt-out or withdrawal on record. A Global
          Privacy Control signal, opt-out or withdrawal seen on any browser or device linked to a Profile applies to the
          whole Profile, including a logged-in person&rsquo;s other devices (11 CCR §7025(c)(1) covers &ldquo;any
          consumer profile associated with that browser or device, including pseudonymous profiles&rdquo;). From then on
          the Profile is left out of every export and its scores stop changing. You can require explicit (not
          regional-default) advertising consent for any export.
        </p>
        <p>
          <strong>6.2 Hashed identifiers only.</strong> Emails and phone numbers reach YOM already hashed (SHA-256) in the
          browser or on your server. YOM&rsquo;s ingest rejects any value that is not a SHA-256 digest, so raw
          identifiers are refused and not stored. If a YOM connector ever receives raw values from a platform (for
          example an order notification), it hashes them in memory on receipt and never stores or logs the raw value.
          Hashed Identifiers are still personal data and are treated as such. They are shown only to your owners and
          admins, and a CSV export file is kept for at most 7 days.
        </p>
        <p>
          <strong>6.3 No fingerprinting for identity.</strong> Profiles never use a device fingerprint, IP address or
          similar signal as an identifier.
        </p>
        <p>
          <strong>6.4 Excluded Categories.</strong> YOM blocks the Annex 2 taxonomy nodes from scoring, Segments and
          exports, and refuses Segment rules that target them.
        </p>
        <p>
          <strong>6.5 Minimum export size.</strong> YOM does not send an Audience Export of fewer than 100 people, counted
          after every rule in clause 6.1, so a single person can&rsquo;t be singled out in an ad account. If a run would
          send fewer, nothing is sent and the Destination Account is left unchanged.
        </p>
        <p>
          <strong>6.6 Separation.</strong> Profiles are stored per customer project, keyed by identifiers scoped to you,
          and are never joined with another customer&rsquo;s data.
        </p>
        <p>
          <strong>6.7 Excluded Regions.</strong> YOM leaves out of Profiles, scores, Segments and Audience Exports the
          events it locates in an Excluded Region from the country and region of the request.
        </p>
        <p>
          <strong>6.8 Records.</strong> YOM records every Audience Export run: when it ran, the Segment, the Destination
          Account, how many people were sent, and what the platform reported back, such as match counts or audience size.
          Creating, changing, running and deleting an export are written to your audit log with the user who did it.
        </p>

        <h2 id="shopify">7. Shopify-Sourced Data</h2>
        <p>
          <strong>7.1</strong> Data YOM obtains through Shopify APIs, webhooks, web pixels, app proxies or app extensions
          (&ldquo;Shopify-Sourced Data&rdquo;) is used only for that merchant&rsquo;s own Intent Features.
        </p>
        <p>
          <strong>7.2</strong> Shopify-Sourced Data never enters benchmarks, any dataset shared across customers, or any
          model used for another merchant.
        </p>
        <p>
          <strong>7.3</strong> Intent scoring is rule-based: it uses the event weights and decay settings shown in your
          dashboard and does not train a model on Shopify-Sourced Data. We will update this clause, with notice under the
          Terms, before any learned weights use Shopify-Sourced Data.
        </p>

        <h2 id="deletion">8. Withdrawal, deletion and audiences in your accounts</h2>
        <p>
          <strong>8.1</strong> When a person withdraws consent to analytics or personalisation, or is deleted at your
          request, YOM erases every Profile linked to them. When a person opts out of advertising or sends a Global
          Privacy Control signal, YOM keeps them out of every later export. Meta and Google audiences are replaced on
          every run, so the person leaves them at the next run of that export. Klaviyo lists are only added to, so you
          remove the person from a Klaviyo list yourself.
        </p>
        <p>
          <strong>8.2</strong> When you turn YOM Intent off, YOM stops building and scoring Profiles at once. On your
          written request YOM deletes your Profiles within 30 days; otherwise they are deleted as clause 8.3 sets out.
          Audiences already in your Destination Accounts belong to you; on request, before you disconnect them, YOM
          deletes the audiences it created there.
        </p>
        <p>
          <strong>8.3</strong> Profiles are deleted when they have had no activity for the Intent retention period: 180
          days by default. You can change it, but it is never longer than your project&rsquo;s retention period or 13
          months, whichever is shorter.
        </p>
        <p>
          <strong>8.4</strong> DPA section 13 (return and deletion after termination) also applies to Intent Data,
          including its exception for copies the law requires us to keep. For people in India, from 13 May 2027 Indian
          law will also require us to keep personal data, related traffic data and processing logs for one year from
          processing. From then, when we delete Intent Data from our systems we will keep a sealed copy for the rest of
          that year, which nobody uses except to meet that legal duty, and then destroy it.
        </p>
        <p>
          <strong>8.5</strong> Consent receipts (records of what a person chose, when and on which page) are kept for
          your project&rsquo;s retention period, like other events. If you need to keep them longer, export them before
          that period ends.
        </p>

        <h2 id="breach">9. Breach notice</h2>
        <p>
          DPA section 8 applies to Intent Data. YOM will notify you of a Personal Data Breach affecting Intent Data
          without undue delay and in any case within 24 hours of becoming aware of it, with the details the Digital
          Personal Data Protection Rules, 2025 require you to give the Data Protection Board of India (Rule 7) as far as
          YOM knows them, and updates as they become available.
        </p>

        <h2 id="rights">10. Rights requests</h2>
        <p>
          YOM&rsquo;s data-subject request tools cover Intent Data: an access request includes the person&rsquo;s
          Profiles (scores, stages, consent and linked identifiers), and an erasure deletes every Profile linked to the
          person&rsquo;s visitor ids, user id or hashed email. For anything those tools do not do, such as correcting a
          Profile, YOM acts on your written request within 10 business days, so that you can answer within the times the
          law sets (DPDP Rules, Rule 14; CCPA 45 days, Cal. Civ. Code §1798.130; PIPEDA 30 days, section 8(3)).
        </p>

        <h2 id="us">11. US state laws (adds to DPA section 12)</h2>
        <p>
          <strong>11.1</strong> For Intent processing other than Audience Exports, YOM is your service provider and DPA
          section 12 applies.
        </p>
        <p>
          <strong>11.2</strong> For Audience Exports, YOM is a third party (clause 2.2) and Schedule 1 applies. You treat
          each Audience Export as a sale or sharing of personal information (or targeted advertising, under other state
          laws) and give the notices and opt-out rights those laws require.
        </p>
        <p>
          <strong>11.3</strong> YOM will not combine the personal information of people who opted out of sale or sharing
          with personal information from any other source.
        </p>
        <p>
          <strong>11.4</strong> YOM certifies that it understands and will comply with these restrictions.
        </p>

        <h2 id="excluded-regions">12. EEA, UK, Switzerland and Quebec</h2>
        <p>
          YOM Intent is not available for End Users in the European Economic Area, the United Kingdom, Switzerland or
          Quebec. This
          Intent Addendum gives YOM no instructions for their personal data, and clauses 5.6 and 6.7 keep them out. If
          that changes, we will update this Intent Addendum first, with notice under the Terms, and for Quebec we will
          offer French versions of these terms before you accept them.
        </p>

        <h2 id="subprocessors">13. Sub-processors</h2>
        <p>
          The sub-processors on our <a href="/subprocessors">sub-processors page</a> apply, including our group companies{' '}
          {IN.name} and {CA.name}. YOM Intent runs on Cloudflare (Durable Objects, R2 and Queues), which is already
          listed.
        </p>

        <h2 id="schedule-1">Schedule 1: CCPA third-party terms (11 CCR §7053)</h2>
        <p>
          This schedule applies to Audience Exports where the CCPA applies. It is the contract 11 CCR §7053(a) and Cal.
          Civ. Code §1798.100(d) require between a business that sells or shares personal information and the third party
          that receives it.
        </p>
        <ol>
          <li>
            <strong>Purpose.</strong> You make Intent Data available to YOM only for one limited and specified purpose:
            to send the Segments you choose from your own Profiles to the Destination Accounts you connect, on the
            schedule you set, so that you can show your own advertising and marketing to the people in them.
          </li>
          <li>
            <strong>Use only for that purpose.</strong> YOM uses that personal information only for the purpose in
            paragraph 1. It does not sell or share it onward, or disclose it to anyone except your Destination Accounts
            and YOM&rsquo;s sub-processors.
          </li>
          <li>
            <strong>Same level of protection.</strong> YOM complies with all applicable sections of the CCPA and its
            regulations and, for the personal information you make available to it, provides the same level of privacy
            protection that the CCPA and its regulations require of businesses. In particular, YOM honours every request
            to opt out of sale or sharing that you forward to it (and treats a Global Privacy Control signal as clause
            6.1 describes), and keeps reasonable security procedures and practices appropriate to the nature of the
            personal information, as Cal. Civ. Code §1798.81.5 requires.
          </li>
          <li>
            <strong>Your right to check.</strong> For the personal information you make available to YOM, you may take
            reasonable and appropriate steps to ensure that YOM uses it in a manner consistent with your obligations
            under the CCPA and its regulations, for example by requiring YOM to attest that it treats that information
            as you are obliged to treat it, or by asking for the export records in clause 6.8.
          </li>
          <li>
            <strong>Your right to stop and remediate.</strong> On notice, you may take reasonable and appropriate steps to
            stop and remediate unauthorised use of the personal information you made available to YOM, including turning
            off or deleting an export, requiring YOM to stop the processing, and requiring documentation that verifies
            YOM no longer keeps or uses the personal information of people whose opt-outs you forwarded.
          </li>
          <li>
            <strong>Notice if YOM cannot comply.</strong> YOM will notify you after it determines that it can no longer
            meet its obligations under the CCPA and its regulations.
          </li>
        </ol>

        <h2 id="annex-1">Annex 1: Details of processing (Intent)</h2>
        <ul>
          <li><strong>Subject matter:</strong> the Intent Features.</li>
          <li><strong>Duration:</strong> while YOM Intent is on, then deletion under clause 8.</li>
          <li>
            <strong>Nature and purpose:</strong> collecting, scoring, segmenting, personalising, hashing, exporting to
            Destination Accounts and measuring assisted conversions, all for your own marketing.
          </li>
          <li>
            <strong>Data subjects:</strong> visitors, customers and leads of your own properties, outside the Excluded
            Regions.
          </li>
          <li>
            <strong>Categories of data:</strong> Hashed Identifiers; visitor ids scoped to you; your own user or lead
            ids; product-category interest scores and stages; event types and times (page, 3D view, configure, dimension
            check, AR launch, add to cart, checkout, lead, purchase); order ids and values; approximate location
            (country); device class; consent state and receipts. Hot Leads also link to the lead&rsquo;s name and email
            in your own CRM or lead store, which are not copied into YOM unless you send them.
          </li>
          <li><strong>Special categories:</strong> none; Excluded Categories are blocked (Annex 2).</li>
          <li>
            <strong>Retention:</strong> Profiles 180 days after last activity by default, at most 13 months or your
            project&rsquo;s retention period (clause 8.3); consent receipts for your project&rsquo;s retention period
            (clause 8.5); CSV export files 7 days; export run records while the export exists; audit records for your
            plan&rsquo;s audit-log period.
          </li>
          <li><strong>Recipients:</strong> your Destination Accounts; YOM&rsquo;s sub-processors.</li>
        </ul>

        <h2 id="annex-2">Annex 2: Excluded Categories and health-sector rule</h2>
        <p>
          <strong>Part 1, never scored, segmented or exported:</strong> health, medical conditions, disability,
          pregnancy, reproductive or sexual health, mental health; religion or beliefs; sexual orientation, sex life,
          gender identity; political opinions or affiliations; trade-union membership; racial or ethnic origin, caste or
          tribe; financial hardship, credit, debt or insurance status; criminal history; biometric or genetic data;
          government identifiers; precise geolocation; children.
        </p>
        <p>
          YOM blocks these Google Product Taxonomy nodes and all their descendants: Health Care (491), Business &amp;
          Industrial &gt; Medical (2496), Mature (772, including Erotic and Weapons), Religious &amp; Ceremonial (5605),
          Religious Ceremonial Clothing (5483), Maternity Belts &amp; Support Bands (502987), Breast Pumps (565), Breast
          Pump Accessories (505366) and Breast Milk Storage (7234). You can add nodes but never remove these. Categories
          that relate to finances, politics or the other Part 1 topics have no product node today; Segment rules that
          target them are refused. We review the list every quarter.
        </p>
        <p>
          <strong>Part 2, health-sector businesses:</strong> hospitals, clinics, physiotherapy and other providers,
          pharmacies, telehealth, medical devices and diagnostics, health insurers, and wellness businesses whose
          products relate to a health condition. Analytics and on-site use only; no health-interest exports.
        </p>
      </LegalPage>
    </>
  );
}
