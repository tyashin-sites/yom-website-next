import { describe, expect, it } from 'vitest';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';

/**
 * Copy guard: no em dash (—) or en dash (–) in anything a visitor can read.
 * Every page, component, metadata string, llms.txt and config string lives in
 * src/, so the scan covers src/ with code comments stripped. The one allowed
 * use is a table cell that is exactly '—' (meaning "no value"). The crawl-time
 * half of this gate (rendered HTML) lives in scripts/check-routes.mjs.
 */
const root = path.resolve(__dirname, '..');

function files(dir: string): string[] {
  return readdirSync(dir).flatMap((f) => {
    const p = path.join(dir, f);
    if (statSync(p).isDirectory()) return files(p);
    return /\.(tsx?|json|mdx?|txt)$/.test(f) ? [p] : [];
  });
}

/** Drop block comments, JSX comments and // line comments (not the // in "https://"). */
export function stripComments(src: string): string {
  return src
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, '')
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/(^|[^:'"`\\])\/\/.*$/gm, '$1');
}

/** The allowed placeholder: a string or JSX text that is only the dash. */
function stripPlaceholders(src: string): string {
  return src.replace(/(['"`])—\1/g, '').replace(/>\s*—\s*</g, '><');
}

function offenders(): string[] {
  const out: string[] = [];
  for (const f of files(path.join(root, 'src'))) {
    const clean = stripPlaceholders(stripComments(readFileSync(f, 'utf8')));
    clean.split('\n').forEach((line, i) => {
      if (/[—–]/.test(line)) out.push(`${path.relative(root, f)}:${i + 1}: ${line.trim().slice(0, 120)}`);
    });
  }
  return out;
}

describe('copy tells', () => {
  it('the comment stripper keeps URLs and drops comments', () => {
    expect(stripComments("const u = 'https://x.y'; // note — here")).toBe("const u = 'https://x.y'; ");
    expect(stripComments('a /* x — y */ b {/* JSX — c */}')).toBe('a  b ');
    expect(stripPlaceholders(`{active ? fmt(x) : '—'}`)).toBe('{active ? fmt(x) : }');
  });

  it('no em or en dash in visitor-facing strings (table placeholder excepted)', () => {
    expect(offenders()).toEqual([]);
  });
});
