import { describe, expect, it } from 'vitest';
import {
  GRIEVANCE_CATEGORIES,
  GRIEVANCE_COPY,
  grievanceLogFields,
  parseGrievance,
  toContactSubmission,
} from '@/lib/grievance';

const valid = {
  name: 'Asha',
  email: 'asha@example.com',
  category: 'intimate-or-impersonation',
  contentUrl: 'https://example.com/p/1',
  message: 'Someone posted a morphed photo of me.',
};

describe('grievance form', () => {
  it('maps each category to the IT Rules clock', () => {
    const clocks = Object.fromEntries(GRIEVANCE_CATEGORIES.map((c) => [c.id, c.clock.en]));
    expect(clocks).toEqual({
      'intimate-or-impersonation': '2 hours',
      'unlawful-content': '36 hours',
      'ip-or-ownership': '7 days',
      'personal-data': '1 month',
      other: '7 days',
    });
  });

  it('has Hindi copy for every English string and category', () => {
    expect(Object.keys(GRIEVANCE_COPY.hi).sort()).toEqual(Object.keys(GRIEVANCE_COPY.en).sort());
    expect(Object.keys(GRIEVANCE_COPY.hi.errors).sort()).toEqual(Object.keys(GRIEVANCE_COPY.en.errors).sort());
    for (const c of GRIEVANCE_CATEGORIES) {
      expect(c.label.hi.length).toBeGreaterThan(0);
      expect(c.clock.hi.length).toBeGreaterThan(0);
    }
  });

  it('accepts a complete complaint and trims it', () => {
    const r = parseGrievance({ ...valid, name: '  Asha  ', lang: 'hi', renderedAt: 123 });
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.value).toMatchObject({ name: 'Asha', categoryId: 'intimate-or-impersonation', lang: 'hi', renderedAt: 123 });
    }
  });

  it('rejects missing or bad fields', () => {
    expect(parseGrievance({ ...valid, name: '' }).ok).toBe(false);
    expect(parseGrievance({ ...valid, email: 'nope' }).ok).toBe(false);
    expect(parseGrievance({ ...valid, category: 'made-up' }).ok).toBe(false);
    expect(parseGrievance({ ...valid, contentUrl: 'javascript:alert(1)' }).ok).toBe(false);
    expect(parseGrievance({ ...valid, message: '   ' }).ok).toBe(false);
  });

  it('returns validation errors in the visitor language', () => {
    const en = parseGrievance({ ...valid, name: '' });
    const hi = parseGrievance({ ...valid, name: '', lang: 'hi' });
    expect(en).toMatchObject({ ok: false, code: 'name', error: GRIEVANCE_COPY.en.errors.name });
    expect(hi).toMatchObject({ ok: false, code: 'name', error: GRIEVANCE_COPY.hi.errors.name });
  });

  it('log fields carry no name, email, link or complaint text', () => {
    const r = parseGrievance(valid);
    if (!r.ok) throw new Error('expected valid');
    const logged = JSON.stringify(grievanceLogFields(r.value));
    expect(logged).not.toContain(valid.name);
    expect(logged).not.toContain(valid.email);
    expect(logged).not.toContain(valid.contentUrl);
    expect(logged).not.toContain(valid.message);
    expect(grievanceLogFields(r.value)).toEqual({ category: 'intimate-or-impersonation', lang: 'en', hasContentUrl: true });
  });

  it('allows an empty content link', () => {
    expect(parseGrievance({ ...valid, contentUrl: '' }).ok).toBe(true);
  });

  it('builds a contact-plugin submission tagged as a grievance with its clock', () => {
    const r = parseGrievance(valid);
    if (!r.ok) throw new Error('expected valid');
    const s = toContactSubmission(r.value, 'yom.aapastech.com', 'https://yom.aapastech.com/grievance');
    expect(s.source).toBe('grievance-form');
    expect(s.subject).toBe('[Grievance, 2 hours] yom.aapastech.com');
    expect(s.category).toMatch(/^Grievance: /);
    expect(s.message).toContain('Content: https://example.com/p/1');
    expect(s.message).toContain(valid.message);
    expect(s.metadata).toMatchObject({ grievance: true, category: 'intimate-or-impersonation', clock: '2 hours' });
  });
});
