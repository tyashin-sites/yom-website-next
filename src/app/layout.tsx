import type { Metadata, Viewport } from 'next';
import { bodyFont, displayFont, monoFont } from '@/lib/fonts';
import { SITE, siteUrl } from '@/lib/seo';
import { siteConfig } from '@/config/site';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { MotionFX } from '@/components/motion/MotionFX';
import './globals.css';

/*
 * ROBOTS_NOINDEX canary (port skill pitfall #13). Baked at BUILD time for
 * prerendered pages — export it in the build env and rebuild at cutover.
 * Emits only `robots` (no googleBot pair) so the platform edge's leftover-canary
 * strip does not remove a deliberate preview noindex.
 */
const NOINDEX = process.env.ROBOTS_NOINDEX === 'true';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl('/')),
  title: { default: `${SITE.name}: ${siteConfig.tagline}`, template: `%s · ${SITE.name}` },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  openGraph: {
    type: 'website',
    siteName: SITE.name,
    locale: SITE.locale,
    url: siteUrl('/'),
    title: `${SITE.name}: ${siteConfig.tagline}`,
    images: [{ url: SITE.defaultOgImage, width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image' },
  formatDetection: { telephone: false },
  ...(NOINDEX ? { robots: { index: false, follow: false } } : {}),
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F4F1EA' },
    { media: '(prefers-color-scheme: dark)', color: '#0F1215' },
  ],
};

/*
 * Canonical LIGHT palette at html:root (0,1,1): beats any plain `:root{}`
 * brand kit the platform edge may inject, whatever the order. Dark values
 * live once in globals.css at (0,2,0). First-frame paint: html/body take the
 * ground before the CSS bundle arrives — scheme-aware, no white flash.
 */
const CANONICAL_BRAND_CSS = `
html,body{background-color:var(--brand-bg)}
html:root{--brand-bg:#F4F1EA;--brand-surface:#ECE7DC;--brand-paper:#FBF9F4;--brand-ink:#14171C;--brand-text:#14171C;--brand-text-muted:#575B61;--brand-primary:#B8360F;--brand-primary-deep:#962B0B;--brand-primary-contrast:#FFFFFF;--brand-match:#2A45B0;--brand-brass:#8A6A2C;--brand-border:rgba(20,23,28,.12);--brand-radius-sm:4px;--brand-radius-md:6px;--brand-radius-lg:10px;--brand-radius-full:999px}
@media (prefers-color-scheme:dark){html:root:not([data-theme="light"]){--brand-bg:#0F1215}}
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-CA" className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable}`}>
      <head>
        <style dangerouslySetInnerHTML={{ __html: CANONICAL_BRAND_CSS }} />
      </head>
      <body className="bg-background font-body text-foreground antialiased">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Header />
        <main id="main" tabIndex={-1} className="min-h-screen overflow-x-clip outline-none">
          {children}
        </main>
        <Footer />
        <MotionFX />
      </body>
    </html>
  );
}
