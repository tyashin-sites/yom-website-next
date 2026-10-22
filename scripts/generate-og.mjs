// Generates public/og/default.png (1200×630) and public/brand/mark-512.png from
// hand-made HTML/SVG using the locally installed Chrome via puppeteer-core. No network,
// no paid image generation (ai-cost-gate). Run: npm run og
import puppeteer from 'puppeteer-core';
import { readFileSync } from 'node:fs';
import path from 'node:path';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const CHROME = process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const font = (f) => `data:font/woff2;base64,${readFileSync(path.join(root, 'src/fonts', f)).toString('base64')}`;

const css = `
@font-face{font-family:IS;src:url(${font('instrument-serif-latin-400.woff2')})}
@font-face{font-family:ISI;font-style:italic;src:url(${font('instrument-serif-latin-400-italic.woff2')})}
@font-face{font-family:SG;src:url(${font('schibsted-grotesk-latin.woff2')});font-weight:400 700}
@font-face{font-family:GM;src:url(${font('geist-mono-latin.woff2')});font-weight:400 600}
*{margin:0;box-sizing:border-box}`;

const mark = (size, ring = '#ECE8DF') => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="${ring}" stroke-width="1.75"/><path d="M5 12h14" stroke="#D2B06A" stroke-width="1.25" stroke-linecap="round"/><path d="M12 2.9v2.5M12 18.6v2.5" stroke="${ring}" stroke-width="1.5" stroke-linecap="round"/><circle cx="12" cy="12" r="2.4" fill="#FF6B3D"/></svg>`;

const og = `<!doctype html><html><head><meta charset="utf-8"><style>${css}
body{width:1200px;height:630px;background:#14171C;color:#ECE8DF;font-family:SG;position:relative;overflow:hidden;
background-image:radial-gradient(rgba(236,232,223,.06) 1px,transparent 1px);background-size:10px 10px}
.wrap{position:absolute;inset:64px 72px}
.lock{display:flex;align-items:center;gap:16px;font-weight:600;letter-spacing:.06em;font-size:34px}
h1{font-family:IS;font-weight:400;font-size:96px;line-height:1.02;letter-spacing:-.015em;margin-top:70px;max-width:900px}
em{font-family:ISI;font-style:italic;color:#FF6B3D}
.foot{position:absolute;left:0;right:0;bottom:0;display:flex;justify-content:space-between;align-items:flex-end;font-family:GM;font-size:20px;color:#A3A69F}
.delta{font-family:GM;text-align:right}.delta b{display:block;font-size:64px;color:#ECE8DF;font-weight:400}
.rule{position:absolute;left:72px;right:72px;top:150px;height:1px;background:rgba(236,232,223,.14)}
</style></head><body><div class="rule"></div><div class="wrap">
<div class="lock">${mark(46)}<span>YOM</span></div>
<h1>The measurement layer you can <em>prove</em>.</h1>
<div class="foot"><span>Your Own Metrics · first-party analytics</span><span class="delta">Δ<b>0.00</b></span></div>
</div></body></html>`;

const logo = `<!doctype html><html><head><meta charset="utf-8"><style>${css}body{width:512px;height:512px;background:#14171C;display:grid;place-items:center}</style></head><body>${mark(400)}</body></html>`;

const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ['--allow-file-access-from-files'] });
async function shoot(html, out, w, h) {
  const page = await browser.newPage();
  await page.setViewport({ width: w, height: h, deviceScaleFactor: 1 });
  await page.setContent(html, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: path.join(root, out) });
  await page.close();
  console.log('wrote', out);
}
await shoot(og, 'public/og/default.png', 1200, 630);
await shoot(logo, 'public/brand/mark-512.png', 512, 512);
await browser.close();
