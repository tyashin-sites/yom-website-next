import type { Metadata } from 'next';
import { Mark } from '@/components/brand/Mark';
import { PrimaryCta } from '@/components/ui/Cta';

export const metadata: Metadata = { title: 'No reading', robots: { index: false, follow: true } };

export default function NotFound() {
  return (
    <section className="container-y flex min-h-[70vh] flex-col items-start justify-center py-20">
      <div className="flex items-center gap-5">
        <Mark size={72} dotClassName="nf-dot" />
        <p className="font-mono text-sm text-muted">404 · signal lost</p>
      </div>
      <h1 className="tt-h1 mt-8 max-w-3xl text-balance">No reading at this address.</h1>
      <p className="tt-lead mt-5 max-w-xl">
        The page you asked for doesn&rsquo;t exist, or it moved. Every other number on this site checks out.
      </p>
      <div className="mt-9 flex flex-wrap gap-3">
        <a href="/" className="btn btn-ghost">Back to the home page</a>
        <PrimaryCta id="404" />
      </div>
      <nav aria-label="Popular pages" className="mt-12">
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {[
            ['/product', 'Product'],
            ['/pricing', 'Pricing'],
            ['/developers', 'Developers'],
            ['/faq', 'FAQ'],
            ['/contact', 'Contact'],
          ].map(([h, l]) => (
            <li key={h}><a href={h} className="link-arrow">{l}</a></li>
          ))}
        </ul>
      </nav>
    </section>
  );
}
