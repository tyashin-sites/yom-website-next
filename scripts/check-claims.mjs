#!/usr/bin/env node
/**
 * Claims gate: every capability the site mentions must have a verified row in
 * docs/CLAIMS-LEDGER.md.
 *
 * The ledger holds two tables:
 *   1. Claims   | ID | Claim | Pages | Evidence | Status |
 *   2. Keyword gate | Keyword (regex) | Rows |
 *
 * For each keyword regex that matches visitor-facing text in src/ (comments
 * stripped), every row it points to must exist and allow the mention:
 *   VERIFIED-IN-PROD, EXTERNAL-SOURCE   pass anywhere
 *   SHIPPED-NOT-DEPLOYED                pass only when the line, one of the 6 lines
 *                                       above it or 2 below it says Coming soon / Early access
 *   PARTIAL, NOT-TRUE, missing row      fail, naming the file and line
 *
 *   npm run claims:check               scan src/
 *   npm run claims:check -- --live     also scan the rendered pages on the live host
 *   npm run claims:check -- --file x   scan an extra text/markdown/html file (blog drafts)
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const LEDGER = path.join(root, 'docs/CLAIMS-LEDGER.md');
const PASS = new Set(['VERIFIED-IN-PROD', 'EXTERNAL-SOURCE']);
const LABELLED = new Set(['SHIPPED-NOT-DEPLOYED']);
const LABEL = /coming ?soon|'soon'|\bsoon: \[|early access|'early'|not shipped|not built/i;
const WINDOW = 6; // lines above a match that may carry its label (2 below are checked too)
const LIVE_HOST = 'https://yom.aapastech.com';

/** Split a markdown table row into trimmed cells (handles escaped pipes). */
function cells(line) {
  return line
    .trim()
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split(/(?<!\\)\|/)
    .map((c) => c.replace(/\\\|/g, '|').trim());
}

/** Rows of the first table after a heading that starts with `heading`. */
function table(md, heading) {
  const lines = md.split('\n');
  const start = lines.findIndex((l) => l.startsWith(heading));
  if (start < 0) throw new Error(`ledger: no "${heading}" section`);
  const rows = [];
  let header = null;
  for (let i = start + 1; i < lines.length; i++) {
    const l = lines[i];
    if (/^#{1,3} /.test(l)) break;
    if (!l.trim().startsWith('|')) {
      if (header && rows.length) break;
      continue;
    }
    const c = cells(l);
    if (!header) header = c;
    else if (!/^:?-+:?$/.test(c[0])) rows.push(Object.fromEntries(header.map((h, j) => [h, c[j] ?? ''])));
  }
  return rows;
}

export function parseLedger(md) {
  const claims = new Map();
  for (const r of table(md, '## Claims')) {
    if (!r.ID) continue;
    if (claims.has(r.ID)) throw new Error(`ledger: duplicate row ${r.ID}`);
    claims.set(r.ID, { status: (r.Status.replace(/[*`]/g, '').match(/^[A-Z-]+/) ?? [''])[0], claim: r.Claim });
  }
  const gate = table(md, '## Keyword gate').map((r) => {
    const src = r['Keyword (regex)'].replace(/^`|`$/g, '');
    return { src, re: new RegExp(src, 'i'), rows: r.Rows.split(/[,\s]+/).filter(Boolean) };
  });
  return { claims, gate };
}

/** Same stripping as tests/copy-tells.test.ts: drop code comments, keep URLs. */
function stripComments(src) {
  return src
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, '')
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/(^|[^:'"`\\])\/\/.*$/gm, '$1');
}

function files(dir) {
  return readdirSync(dir).flatMap((f) => {
    const p = path.join(dir, f);
    if (statSync(p).isDirectory()) return files(p);
    return /\.(tsx?|json|txt)$/.test(f) ? [p] : [];
  });
}

function htmlText(html) {
  return html
    .replace(/<script(?![^>]*application\/ld\+json)[\s\S]*?<\/script>/g, ' ')
    .replace(/<style[\s\S]*?<\/style>/g, ' ')
    .replace(/<\/(p|li|h[1-6]|tr|td|th|dd|dt|div|section|pre)>|<br\s*\/?>/g, '\n')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n\s*\n+/g, '\n');
}

export function check(ledger, docs) {
  const failures = [];
  const hits = new Map();
  for (const { name, text } of docs) {
    const lines = text.split('\n');
    for (const k of ledger.gate) {
      lines.forEach((line, i) => {
        if (!k.re.test(line)) return;
        hits.set(k.src, (hits.get(k.src) ?? 0) + 1);
        const labelled = lines.slice(Math.max(0, i - WINDOW), i + 3).some((l) => LABEL.test(l));
        for (const id of k.rows) {
          const row = ledger.claims.get(id);
          if (!row) failures.push(`${name}:${i + 1}  /${k.src}/ → ${id}: no such ledger row`);
          else if (PASS.has(row.status) || (LABELLED.has(row.status) && labelled)) continue;
          else
            failures.push(
              `${name}:${i + 1}  /${k.src}/ → ${id} is ${row.status}${LABELLED.has(row.status) ? ' (needs a Coming soon label)' : ''}: ${row.claim.slice(0, 90)}`,
            );
        }
      });
    }
  }
  return { failures, hits };
}

async function main() {
  const args = process.argv.slice(2);
  const ledger = parseLedger(readFileSync(LEDGER, 'utf8'));
  const docs = files(path.join(root, 'src')).map((f) => ({
    name: path.relative(root, f),
    text: stripComments(readFileSync(f, 'utf8')),
  }));
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--file') {
      const f = path.resolve(args[++i]);
      const raw = readFileSync(f, 'utf8');
      docs.push({ name: path.relative(root, f), text: /\.html?$/.test(f) ? htmlText(raw) : raw });
    }
  }
  if (args.includes('--live')) {
    const xml = await (await fetch(`${LIVE_HOST}/sitemap-pages.xml`)).text();
    const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
    urls.push(`${LIVE_HOST}/llms.txt`);
    for (const u of urls) {
      const res = await fetch(u);
      const body = await res.text();
      docs.push({ name: u, text: u.endsWith('.txt') ? body : htmlText(body) });
    }
  }
  const { failures, hits } = check(ledger, docs);
  const unused = ledger.gate.filter((k) => !hits.has(k.src)).map((k) => k.src);
  console.log(
    `claims:check: ${ledger.claims.size} ledger rows, ${ledger.gate.length} keywords, ${docs.length} files scanned`,
  );
  if (unused.length) console.log(`  (keywords not on any page: ${unused.length})`);
  if (failures.length) {
    console.error(`\n${failures.length} claim(s) without a verified ledger row:\n  ${failures.join('\n  ')}`);
    console.error('\nFix the copy, or verify the claim and update docs/CLAIMS-LEDGER.md (see "How to add a row").');
    process.exit(1);
  }
  console.log('  every gated capability maps to a VERIFIED-IN-PROD or EXTERNAL-SOURCE row.');
}

if (import.meta.url === `file://${process.argv[1]}`) main();
