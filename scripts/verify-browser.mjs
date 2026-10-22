// Driven-browser verification of the PROD build (`next start`), luxury skill §6.3/§6.5.
// Screenshots: docs/audits/screenshots/. Assertions printed and written to
// docs/audits/browser-checks.json. Usage: BASE=http://localhost:3300 node scripts/verify-browser.mjs
import puppeteer from 'puppeteer-core';
import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const BASE = process.env.BASE || 'http://localhost:3300';
const CHROME = process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const outDir = path.join(root, 'docs/audits/screenshots');
mkdirSync(outDir, { recursive: true });

const PAGES = [
  '/', '/why-yom', '/product', '/solutions', '/solutions/ecommerce', '/solutions/agencies', '/solutions/platforms',
  '/solutions/regulated', '/compare', '/pricing', '/developers', '/security', '/about', '/contact', '/faq', '/privacy',
  '/terms', '/this-page-does-not-exist',
];
const FULL = new Set(['/', '/pricing', '/product', '/compare']);
const VIEWPORTS = {
  desktop: { width: 1440, height: 900, deviceScaleFactor: 1 },
  mobile: { width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
};
const slug = (p) => (p === '/' ? 'home' : p.slice(1).replace(/\//g, '_'));
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await puppeteer.launch({ executablePath: CHROME, headless: true });
const results = { base: BASE, checks: [], screenshots: [] };
const check = (name, pass, detail = '') => {
  results.checks.push({ name, pass, detail });
  console.log(`${pass ? 'PASS' : 'FAIL'}  ${name}${detail ? ` — ${detail}` : ''}`);
};

async function scrollThrough(page) {
  const h = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < h; y += 450) {
    await page.evaluate((y) => window.scrollTo(0, y), y);
    await sleep(140);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await sleep(300);
}

// 1. Screenshots: every page × desktop/mobile × light/dark
for (const scheme of ['light', 'dark']) {
  for (const [vpName, vp] of Object.entries(VIEWPORTS)) {
    const page = await browser.newPage();
    await page.setViewport(vp);
    await page.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: scheme }]);
    for (const p of PAGES) {
      const full = FULL.has(p);
      if (scheme === 'dark' && !full && p !== '/this-page-does-not-exist') continue; // dark: key pages only
      await page.goto(BASE + p, { waitUntil: 'networkidle0' });
      await page.evaluate(() => document.fonts.ready);
      if (full) await scrollThrough(page); // let below-fold reveals fire before a full-page capture
      await sleep(3200); // hero ledger scan + needle settle
      const file = `${slug(p)}--${vpName}--${scheme}.png`;
      await page.screenshot({ path: path.join(outDir, file), fullPage: full });
      results.screenshots.push(file);
    }
    // horizontal overflow check on mobile
    if (vpName === 'mobile' && scheme === 'light') {
      for (const p of PAGES) {
        await page.goto(BASE + p, { waitUntil: 'networkidle0' });
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
        check(`no horizontal scroll on mobile ${p}`, overflow <= 0, `overflow ${overflow}px`);
      }
    }
    await page.close();
  }
}

// 2. Motion / signature assertions (desktop, light, motion allowed)
{
  const page = await browser.newPage();
  await page.setViewport(VIEWPORTS.desktop);
  await page.goto(BASE + '/', { waitUntil: 'networkidle0' });
  const h1Visible = await page.evaluate(() => {
    const h = document.querySelector('h1');
    const cs = getComputedStyle(h);
    return cs.opacity === '1' && cs.visibility === 'visible';
  });
  check('hero h1 visible at first paint (LCP law)', h1Visible);
  await sleep(900);
  check('ledger scan running', await page.evaluate(() => !!document.querySelector('.ledger-scan.is-running')));
  await sleep(2600);
  check('ledger rows pinged', await page.evaluate(() => document.querySelectorAll('.ledger-row.is-pinged').length === 6));
  check('Δ reads 0.00', await page.evaluate(() => document.body.innerText.includes('0.00')));

  const pendingBefore = await page.evaluate(() => document.querySelectorAll('.fx-pending').length);
  check('below-fold reveals armed', pendingBefore > 0, `${pendingBefore} pending`);
  const aboveFoldHidden = await page.evaluate(
    () => [...document.querySelectorAll('.fx-pending')].filter((el) => el.getBoundingClientRect().top < window.innerHeight * 0.9).length,
  );
  check('no above-fold element hidden', aboveFoldHidden === 0);

  await page.evaluate(() => window.scrollTo(0, 200));
  await sleep(300);
  check('header .is-scrolled after scroll', await page.evaluate(() => document.querySelector('header.site-header').classList.contains('is-scrolled')));
  const headerH = await page.evaluate(() => document.querySelector('header.site-header').getBoundingClientRect().height);
  await page.evaluate(() => window.scrollTo(0, 0));
  await sleep(300);
  const headerH0 = await page.evaluate(() => document.querySelector('header.site-header').getBoundingClientRect().height);
  check('header height constant (CLS law)', headerH === headerH0, `${headerH0} → ${headerH}`);

  // Consent stream: scroll it into view, wait for a new row
  const firstKey = await page.evaluate(() => {
    const el = document.querySelector('.stream-row');
    el.scrollIntoView({ block: 'center' });
    return el.textContent;
  });
  await sleep(2400);
  const newKey = await page.evaluate(() => document.querySelector('.stream-row').textContent);
  check('consent stream advances while visible', newKey !== firstKey);
  check('cookieless rows rendered', await page.evaluate(() => document.body.innerText.includes('cookieless')));

  // Fan-out: --p rises from 0 as it scrolls in
  const fanStart = await page.evaluate(() => {
    const f = document.querySelector('[data-fx="fan"]');
    window.scrollTo(0, f.getBoundingClientRect().top + window.scrollY - window.innerHeight);
    return f.style.getPropertyValue('--p');
  });
  await sleep(400);
  await page.evaluate(() => {
    const f = document.querySelector('[data-fx="fan"]');
    f.scrollIntoView({ block: 'center' });
  });
  await sleep(600);
  const fanEnd = await page.evaluate(() => document.querySelector('[data-fx="fan"]').style.getPropertyValue('--p'));
  check('fan-out draws on scroll', Number(fanEnd) > Number(fanStart || 0) && Number(fanEnd) > 0.6, `--p ${fanStart} → ${fanEnd}`);
  await page.close();
}

// 3. Reduced motion: nothing hidden, no scan
{
  const page = await browser.newPage();
  await page.setViewport(VIEWPORTS.desktop);
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  await page.goto(BASE + '/', { waitUntil: 'networkidle0' });
  await sleep(800);
  check('reduced motion: no pending reveals', await page.evaluate(() => document.querySelectorAll('.fx-pending').length === 0));
  check('reduced motion: scan not running', await page.evaluate(() => !document.querySelector('.ledger-scan.is-running')));
  check('reduced motion: fan fully drawn', await page.evaluate(() => {
    const f = document.querySelector('[data-fx="fan"]');
    return !f.style.getPropertyValue('--p') || f.style.getPropertyValue('--p') === '1';
  }));
  await page.screenshot({ path: path.join(outDir, 'home--desktop--light--reduced-motion.png'), fullPage: true });
  results.screenshots.push('home--desktop--light--reduced-motion.png');
  await page.close();
}

// 4. Pricing calculator behaviour in the real UI
{
  const page = await browser.newPage();
  await page.setViewport(VIEWPORTS.desktop);
  await page.goto(BASE + '/pricing', { waitUntil: 'networkidle0' });
  const read = () => page.evaluate(() => document.querySelector('[aria-live="polite"] .tt-num')?.textContent);
  await page.evaluate(() => [...document.querySelectorAll('button')].find((b) => b.textContent === '1M')?.click());
  await sleep(150);
  check('calculator 1M USD = $90.00', (await read()) === '$90.00', await read());
  await page.evaluate(() => [...document.querySelectorAll('button[role="radio"]')].find((b) => b.textContent === 'CAD')?.click());
  await sleep(150);
  check('calculator 1M CAD = CA$126.00', (await read()) === 'CA$126.00', await read());
  await page.evaluate(() => [...document.querySelectorAll('button')].find((b) => b.textContent === '100K')?.click());
  await sleep(150);
  check('calculator 100K = free', (await read()) === 'CA$0.00', await read());
  await page.close();
}

// 5. Contact form round-trip (local: logs LEAD, no platform key → log-only)
{
  const page = await browser.newPage();
  await page.setViewport(VIEWPORTS.desktop);
  await page.goto(BASE + '/contact', { waitUntil: 'networkidle0' });
  await page.type('#c-name', 'Verification Bot');
  await page.type('#c-email', 'qa@example.com');
  await page.click('button[type="submit"]');
  await sleep(1200);
  check('contact form submits (200 + thank-you state)', await page.evaluate(() => document.body.innerText.includes('A person will read this')));
  await page.close();
}

await browser.close();
writeFileSync(path.join(root, 'docs/audits/browser-checks.json'), JSON.stringify(results, null, 2));
const failed = results.checks.filter((c) => !c.pass).length;
console.log(`\n${results.checks.length - failed}/${results.checks.length} checks passed; ${results.screenshots.length} screenshots`);
process.exit(failed ? 1 : 0);
