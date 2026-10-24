import { describe, expect, it } from 'vitest';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
// @ts-expect-error plain .mjs script, no types
import { check, parseLedger } from '../scripts/check-claims.mjs';

const LEDGER = `
## Claims

| ID | Claim | Pages | Evidence | Status |
|---|---|---|---|---|
| A1 | MCP server | x | y | VERIFIED-IN-PROD (note) |
| A2 | Audit logs | x | y | NOT-TRUE. Copy removed |
| A3 | Warehouse exports | x | y | SHIPPED-NOT-DEPLOYED |
| A4 | Team invites | x | y | BUILD-PENDING (team, until 2026-11-07) |

## Keyword gate

| Keyword (regex) | Rows |
|---|---|
| \`MCP\\|agents\` | A1 |
| \`audit log\` | A2 |
| \`warehouse\` | A3 |
| \`invite\` | A4 |
| \`ghost\` | A9 |
`;

const run = (text: string, today = '2026-10-24') =>
  check(parseLedger(LEDGER), [{ name: 'page', text }], today).failures as string[];

describe('claims gate', () => {
  it('passes a verified capability and reads the status before any note', () => {
    expect(run('An MCP server for agents.')).toEqual([]);
  });

  it('fails a NOT-TRUE claim wherever it appears', () => {
    expect(run('Audit logs on pay-as-you-go.')).toHaveLength(1);
  });

  it('allows a SHIPPED-NOT-DEPLOYED feature only next to a Coming soon label', () => {
    expect(run('Warehouse exports to S3.')).toHaveLength(1);
    expect(run('Warehouse exports to S3. <ComingSoon />')).toEqual([]);
    expect(run("## Coming soon\n- one\n- Warehouse exports")).toEqual([]);
  });

  it('allows a BUILD-PENDING claim until its date, then fails', () => {
    expect(run('Invite your team.', '2026-11-07')).toEqual([]);
    expect(run('Invite your team.', '2026-11-08')[0]).toMatch(/expired 2026-11-07/);
  });

  it('fails a keyword whose row is missing', () => {
    expect(run('a ghost feature')[0]).toMatch(/no such ledger row/);
  });

  it('the real site passes against docs/CLAIMS-LEDGER.md', () => {
    const out = execFileSync('node', [path.resolve(__dirname, '../scripts/check-claims.mjs')], { encoding: 'utf8' });
    expect(out).toMatch(/every gated capability maps to a passing row/);
  });
});
