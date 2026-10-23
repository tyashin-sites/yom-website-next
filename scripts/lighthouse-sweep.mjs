// Lighthouse mobile sweep of every route against the PROD build (`next start`).
// Writes docs/audits/lighthouse/summary.json. Usage: BASE=http://localhost:3300 node scripts/lighthouse-sweep.mjs
// Note: SEO scores are depressed when built with ROBOTS_NOINDEX=true (preview)
// (is-crawlable) and the absent robots.txt (platform-owned, proxied to the slug host).
import { execFileSync } from 'node:child_process';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import os from 'node:os';

const BASE = process.env.BASE || 'http://localhost:3300';
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const out = path.join(root, 'docs/audits/lighthouse');
mkdirSync(out, { recursive: true });
const PAGES = (process.env.PAGES || '/,/why-yom,/product,/solutions,/solutions/ecommerce,/solutions/agencies,/solutions/platforms,/solutions/regulated,/compare,/pricing,/developers,/security,/about,/contact,/faq,/terms,/privacy,/dpa,/acceptable-use,/cookies,/subprocessors,/security/disclosure').split(',');
process.env.CHROME_PATH ||= '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

const rows = [];
for (const p of PAGES) {
  const tmp = path.join(os.tmpdir(), `lh-${Date.now()}.json`);
  execFileSync('npx', ['lighthouse', BASE + p, '--form-factor=mobile', '--only-categories=performance,accessibility,best-practices,seo', '--output=json', `--output-path=${tmp}`, '--chrome-flags=--headless=new', '--quiet'], { stdio: 'ignore' });
  const r = JSON.parse(readFileSync(tmp, 'utf8'));
  const s = (k) => Math.round(r.categories[k].score * 100);
  const row = {
    path: p,
    performance: s('performance'),
    accessibility: s('accessibility'),
    bestPractices: s('best-practices'),
    seo: s('seo'),
    lcp: r.audits['largest-contentful-paint'].displayValue,
    cls: r.audits['cumulative-layout-shift'].numericValue,
    tbt: r.audits['total-blocking-time'].displayValue,
    lcpElement: r.audits['largest-contentful-paint-element']?.details?.items?.[0]?.items?.[0]?.node?.nodeLabel?.slice(0, 60) ?? '',
  };
  rows.push(row);
  console.log(`${p.padEnd(24)} perf ${row.performance}  a11y ${row.accessibility}  bp ${row.bestPractices}  seo ${row.seo}  LCP ${row.lcp}  CLS ${row.cls.toFixed(3)}  TBT ${row.tbt}`);
}
writeFileSync(path.join(out, 'summary.json'), JSON.stringify({ base: BASE, date: new Date().toISOString(), loadavg: os.loadavg(), rows }, null, 2));
const min = (k) => Math.min(...rows.map((r) => r[k]));
console.log(`\nmin perf ${min('performance')} · min a11y ${min('accessibility')} · max CLS ${Math.max(...rows.map((r) => r.cls)).toFixed(3)}`);
