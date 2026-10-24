import { describe, expect, it } from 'vitest';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';
import reserved from '@/config/router-paths.json';
import { siteConfig } from '@/config/site';
import { getSiteRoutes } from '@/lib/site-routes';

/**
 * yom.aapastech.com is shared with the YOM dashboard through a path router.
 * This site must never own (or link to as if it owned) a dashboard path.
 * The crawl-time half of this gate lives in scripts/check-routes.mjs.
 */
const root = path.resolve(__dirname, '..');

function isReserved(p: string): boolean {
  const clean = p.split(/[?#]/)[0].replace(/\/+$/, '') || '/';
  if (reserved.exact.includes(clean)) return true;
  return reserved.prefix.some((pre) => clean === pre || clean.startsWith(`${pre}/`));
}

function walk(dir: string, prefix = ''): string[] {
  const out: string[] = [];
  for (const f of readdirSync(dir)) {
    const p = path.join(dir, f);
    if (statSync(p).isDirectory()) out.push(prefix + '/' + f, ...walk(p, `${prefix}/${f}`));
    else out.push(`${prefix}/${f}`);
  }
  return out;
}

describe('router path reservations', () => {
  it('the matcher behaves', () => {
    expect(isReserved('/docs')).toBe(true);
    expect(isReserved('/docs/sdk')).toBe(true);
    expect(isReserved('/portal/acme')).toBe(true);
    expect(isReserved('/developers')).toBe(false);
    expect(isReserved('/applications')).toBe(false);
    expect(isReserved('/security/disclosure')).toBe(false);
    expect(isReserved('/blog')).toBe(false);
    expect(isReserved('/blog/ga4-thresholding')).toBe(false);
  });

  it('no app route sits at or under a dashboard path', () => {
    const appRoutes = walk(path.join(root, 'src/app'))
      .filter((p) => !p.includes('.') || /\/route\.ts$|\/page\.tsx$/.test(p))
      .map((p) => p.replace(/\/(page\.tsx|route\.ts)$/, '') || '/');
    expect(appRoutes.filter(isReserved)).toEqual([]);
  });

  it('no public/ file is served at a dashboard path', () => {
    expect(walk(path.join(root, 'public')).filter(isReserved)).toEqual([]);
  });

  it('no indexable route is a dashboard path', () => {
    expect(getSiteRoutes().map((r) => r.path).filter(isReserved)).toEqual([]);
  });

  it('sign-up and log-in are same-host relative links the router owns', () => {
    expect(siteConfig.app.signUp).toBe('/signup');
    expect(siteConfig.app.logIn).toBe('/login');
    expect(reserved.allowedLinks).toEqual(expect.arrayContaining([siteConfig.app.signUp, siteConfig.app.logIn]));
  });

  it('source code links to no dashboard path except the allowed CTAs', () => {
    const files = walk(path.join(root, 'src')).filter((p) => /\.(tsx?|json)$/.test(p) && !p.endsWith('router-paths.json'));
    const bad: string[] = [];
    for (const f of files) {
      const src = readFileSync(path.join(root, 'src', f), 'utf8');
      for (const m of src.matchAll(/(?:href=|href:\s*)["'`](\/[^"'`]*)["'`]/g)) {
        if (isReserved(m[1]) && !reserved.allowedLinks.includes(m[1])) bad.push(`${f}: ${m[1]}`);
      }
    }
    expect(bad).toEqual([]);
  });
});
