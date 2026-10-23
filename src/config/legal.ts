/**
 * Legal documents. Drafted 2026-10-23 under the user's delegation ("do your
 * best to protect Aapastech and publish"); not yet reviewed by a lawyer
 * (recommended, not blocking — docs/ASSET-DEBT.md). Every data-handling
 * statement traces to the YOM codebase; see docs/LEGAL-SOURCES.md.
 */
export const LEGAL_UPDATED = '23 October 2026';
export const LEGAL_UPDATED_ISO = '2026-10-23';

export const legalDocs = [
  { href: '/terms', label: 'Terms of Service' },
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/dpa', label: 'Data Processing Addendum' },
  { href: '/acceptable-use', label: 'Acceptable Use Policy' },
  { href: '/cookies', label: 'Cookie Policy' },
  { href: '/subprocessors', label: 'Sub-processors' },
  { href: '/security/disclosure', label: 'Security disclosure' },
] as const;

/** The contracting entity, as named in every legal document. */
export const legalEntity = {
  name: '14818032 Canada Inc.',
  operatingAs: 'Aapastech',
  place: 'Burlington, Ontario, Canada',
  email: 'contact@aapastech.com',
  phone: '+1 437 800 0190',
  privacyOfficer: 'Privacy Officer',
} as const;
