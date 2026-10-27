import { k1, k1Summary, legalEntities, legalOfficer } from '@/config/legal';

const { estonia: EE, canada: CA } = legalEntities;

/**
 * PUBLISH-KIT K1 v2.0 (regional entity block), verbatim with {Brand} = YOM,
 * rendered from the shared text in config/legal.ts. Every legal document that
 * names a contracting party renders this.
 */
export function EntityBlock() {
  return (
    <>
      <p>{k1.intro}</p>
      <ul>
        {k1.regions.map((r) => (
          <li key={r.key}>
            <strong>{r.label}:</strong> {r.text}
          </li>
        ))}
      </ul>
      <p>
        {k1.shared} {k1.meaning}
      </p>
    </>
  );
}

/** One-sentence K1 summary for the footer and short notices. */
export function EntityLine({ className }: { className?: string }) {
  return <p className={className}>{k1Summary}</p>;
}

/** Hindi summary of K1 for /grievance/hi (Claude's translation; the English K1 prevails). */
export function EntityLineHindi() {
  const [IN, EEr, CAr] = k1.regions;
  return (
    <p>
      YOM को एक ही समूह की तीन कंपनियाँ चलाती हैं: भारत में <span lang="en">{IN.name}</span>, यूरोपीय संघ और यूनाइटेड
      किंगडम में <span lang="en">{EEr.name}</span>, और बाकी सभी जगह <span lang="en">{CAr.name}</span>। आप किससे जुड़े
      हैं, यह आपके स्थान पर निर्भर करता है; व्यावसायिक खाते के लिए यह व्यवसाय के बिलिंग पते का देश है। पूरा विवरण{' '}
      <a href="/terms#agreement" hrefLang="en">
        हमारी शर्तों
      </a>{' '}
      में है।
    </p>
  );
}

/** The group officer and the roles she holds (determinations A2 and §1, K2 v2.0). */
export function OfficerBlock() {
  const o = legalOfficer;
  return (
    <p>
      {o.name} is our Grievance Officer for India, our Privacy Officer for {CA.name}, the person in charge of the
      protection of personal information for Quebec, and the privacy contact for {EE.name}. Write to her at{' '}
      <a href={`mailto:${o.email}?subject=Privacy`}>{o.email}</a> or call {o.phoneIndia} (India) or {o.phoneCanada}{' '}
      (Canada). How we handle complaints, and how fast, is set out on the <a href="/grievance">Grievance Officer</a>{' '}
      page.
    </p>
  );
}
