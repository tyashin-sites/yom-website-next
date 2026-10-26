import { legalEntities, legalOfficer } from '@/config/legal';

const { india: IN, canada: CA } = legalEntities;

/**
 * PUBLISH-KIT K1 (regional entity block), verbatim with {Brand} = YOM. Every
 * legal document that names a contracting party renders this, so the two
 * entities read the same everywhere.
 */
export function EntityBlock() {
  return (
    <>
      <p>
        YOM is run by two companies in the same group. If you are in India, your contract is with{' '}
        <strong>{IN.name}</strong> (CIN {IN.cin}, {IN.address}), which is also the data fiduciary for your personal
        data. Everywhere else, your contract is with <strong>{CA.name}</strong> of {CA.place}, which is the controller
        of your personal data. The two companies share engineering, hosting and support, and each processes data for
        the other under a written intra-group agreement. In this document &ldquo;YOM&rdquo;, &ldquo;we&rdquo; and
        &ldquo;us&rdquo; mean whichever of them you deal with.
      </p>
      <p>
        If you pay through {IN.payments}, you are dealing with {IN.name}; if you pay through {CA.payments}, with{' '}
        {CA.name}.
      </p>
    </>
  );
}

/** The group officer and the roles she holds (determinations A2 and §1). */
export function OfficerBlock() {
  const o = legalOfficer;
  return (
    <p>
      {o.name} is our Grievance Officer for India, our Privacy Officer for {CA.name}, and the person in charge of the
      protection of personal information for Quebec. Write to her at{' '}
      <a href={`mailto:${o.email}?subject=Privacy`}>{o.email}</a> or call {o.phoneIndia} (India) or {o.phoneCanada}{' '}
      (Canada). How we handle complaints, and how fast, is set out on the <a href="/grievance">Grievance Officer</a>{' '}
      page.
    </p>
  );
}
