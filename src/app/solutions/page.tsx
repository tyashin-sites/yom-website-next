import { pageMetadata } from '@/lib/seo';
import { solutions } from '@/config/site';
import { JsonLd } from '@/components/ui/JsonLd';
import { PageHero } from '@/components/ui/PageHero';
import { CtaBand } from '@/components/ui/CtaBand';

const TITLE = 'Solutions';
const DESCRIPTION =
  'How YOM fits e-commerce and DTC brands, agencies running many clients, SaaS platforms embedding analytics, and privacy-sensitive teams.';

export const metadata = pageMetadata({ title: 'Solutions', description: DESCRIPTION, path: '/solutions' });

export default function SolutionsPage() {
  return (
    <>
      <JsonLd page={{ path: '/solutions', title: TITLE, description: DESCRIPTION, type: 'CollectionPage' }} />
      <PageHero
        eyebrow="Solutions"
        title="Same measurement layer. Four very different jobs."
        lead="Pick the situation closest to yours. Each page lists what ships today and what's still on the roadmap."
        trail={[{ name: TITLE, path: '/solutions' }]}
      />
      <section className="container-y pb-24">
        <ul className="grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-2">
          {solutions.map((s, i) => (
            <li key={s.slug} className="bg-background">
              <a href={s.href} className="group flex h-full flex-col p-8 transition-colors hover:bg-paper sm:p-10">
                <span className="tt-num text-sm text-primary">0{i + 1}</span>
                <h2 className="tt-h2 mt-4">{s.label}</h2>
                <p className="mt-3 max-w-md text-muted">{s.blurb}</p>
                <span className="link-arrow mt-8 text-sm">Read more →</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
      <CtaBand />
    </>
  );
}
