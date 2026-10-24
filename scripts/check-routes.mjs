// Coverage + link gate (addendum §3d/§3e/§3g), run against the PROD build
// served by `next start` (BASE env, default http://localhost:3300):
//  1. every app/**/page.tsx (except not-found) is listed in getSiteRoutes()
//  2. crawl from "/" following internal <a href>; every link resolves 200
//  3. every listed route is reached by the crawl (no orphans), and has ≥1 inbound link from another page
//  4. every in-page #anchor exists on its target page
//  6. copy guard: no em/en dash in rendered visitor-facing text or meta/alt/aria
//     strings (a table cell that is exactly "—" means "no value" and is allowed)
//  5. router collisions: no app route, listed route or crawled internal link
//     at/under a dashboard path (src/config/router-paths.json), except the
//     allowed sign-up / log-in CTAs, which are not crawled (the router owns them)
import { readdirSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';

const BASE = process.env.BASE || 'http://localhost:3300';
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const appDir = path.join(root, 'src/app');

function pages(dir, prefix = '') {
  const out = [];
  for (const f of readdirSync(dir)) {
    const p = path.join(dir, f);
    if (statSync(p).isDirectory()) out.push(...pages(p, `${prefix}/${f}`));
    else if (f === 'page.tsx') out.push(prefix || '/');
  }
  return out;
}
const fsRoutes = pages(appDir).sort();
const listed = [...readFileSync(path.join(root, 'src/lib/site-routes.ts'), 'utf8').matchAll(/path: '([^']+)'/g)].map((m) => m[1]);
const solutionHrefs = [...readFileSync(path.join(root, 'src/config/site.ts'), 'utf8').matchAll(/href: '(\/solutions\/[^']+)'/g)].map((m) => m[1]);
const routeList = new Set([...listed, ...solutionHrefs]);
const reserved = JSON.parse(readFileSync(path.join(root, 'src/config/router-paths.json'), 'utf8'));
const isReserved = (p) => {
  const clean = p.split(/[?#]/)[0].replace(/\/+$/, '') || '/';
  return reserved.exact.includes(clean) || reserved.prefix.some((pre) => clean === pre || clean.startsWith(`${pre}/`));
};
let fail = 0;
for (const r of [...fsRoutes, ...routeList]) if (isReserved(r)) { console.log('ROUTER COLLISION (route):', r); fail++; }
let ctaLinks = 0;
for (const r of fsRoutes) if (!routeList.has(r)) { console.log('NOT IN getSiteRoutes():', r); fail++; }

const seen = new Map(); // path -> html
const inbound = new Map();
const queue = ['/'];
const anchors = [];
while (queue.length) {
  const p = queue.shift();
  if (seen.has(p)) continue;
  const res = await fetch(BASE + p, { redirect: 'manual' });
  const html = await res.text();
  seen.set(p, html);
  if (res.status !== 200) { console.log('STATUS', res.status, p); fail++; continue; }
  const visible = html
    .replace(/<script[\s\S]*?<\/script>/g, '')
    .replace(/<style[\s\S]*?<\/style>/g, '')
    .replace(/<(td|dd)[^>]*>\s*—\s*<\/\1>/g, '');
  const attrText = [...visible.matchAll(/(?:content|alt|aria-label|title|placeholder)="([^"]*)"/g)].map((m) => m[1]).join(' ');
  const bodyText = visible.replace(/<[^>]+>/g, ' ');
  for (const m of `${bodyText} ${attrText}`.matchAll(/.{0,40}[—–].{0,40}/g)) {
    console.log(`DASH IN COPY on ${p}: …${m[0].replace(/\s+/g, ' ').trim()}…`);
    fail++;
  }
  for (const m of html.matchAll(/<a[^>]+href="([^"]+)"/g)) {
    const href = m[1].replace(/&amp;/g, '&');
    if (/^(https?:|mailto:|tel:)/.test(href)) continue;
    if (href === '#' || href === '') { console.log('GHOST LINK on', p); fail++; continue; }
    if (isReserved(href)) {
      if (reserved.allowedLinks.includes(href.split(/[?#]/)[0])) { ctaLinks++; continue; }
      console.log(`ROUTER COLLISION (link) ${href} on ${p}`); fail++; continue;
    }
    const [pathPart, hash] = href.split('#');
    const target = pathPart === '' ? p : pathPart;
    if (hash) anchors.push([target, hash, p]);
    if (target !== p) {
      if (!inbound.has(target)) inbound.set(target, new Set());
      inbound.get(target).add(p);
    }
    if (!seen.has(target) && !queue.includes(target)) queue.push(target);
  }
}
for (const [target, hash, from] of anchors) {
  const html = seen.get(target) || '';
  if (!html.includes(`id="${hash}"`)) { console.log(`MISSING ANCHOR #${hash} on ${target} (linked from ${from})`); fail++; }
}
for (const r of routeList) {
  if (!seen.has(r)) { console.log('ORPHAN (not reached by crawl):', r); fail++; }
  else if (r !== '/' && !(inbound.get(r)?.size)) { console.log('NO INBOUND LINK:', r); fail++; }
}
console.log(`pages crawled: ${seen.size}, app routes: ${fsRoutes.length}, listed: ${routeList.size}, sign-up/log-in CTA links: ${ctaLinks}, failures: ${fail}`);
process.exit(fail ? 1 : 0);
