import { footerNav, siteConfig, withBlog } from '@/config/site';
import { getBlogStatusAtBuild } from '@/lib/blog';
import { Wordmark } from './brand/Mark';

export async function Footer() {
  const year = new Date().getFullYear();
  const { hasPosts } = await getBlogStatusAtBuild();
  const columns = footerNav.map((col) => (col.heading === 'Company' ? { ...col, links: withBlog(col.links, hasPosts) } : col));
  return (
    <footer className="site-footer rule-top bg-surface">
      <div className="container-y grid gap-12 py-16 lg:grid-cols-[1.3fr_2fr]">
        <div className="max-w-sm">
          <a href="/" aria-label="YOM home">
            <Wordmark />
          </a>
          <p className="mt-5 font-heading text-2xl leading-snug">{siteConfig.tagline}</p>
          <p className="mt-4 text-sm text-muted">
            {siteConfig.longName} is built by {siteConfig.company.builder}. {siteConfig.company.legalName},
            headquartered in {siteConfig.company.hq.city}, {siteConfig.company.hq.region}.
          </p>
          <ul className="mt-6 space-y-1.5 text-sm">
            <li>
              <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-primary">
                {siteConfig.contact.email}
              </a>
            </li>
            <li>
              <a href={siteConfig.contact.phoneHref} className="tt-num hover:text-primary">
                {siteConfig.contact.phone}
              </a>
            </li>
          </ul>
        </div>
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 xl:grid-cols-5">
          {columns.map((col) => (
            <nav key={col.heading} aria-label={col.heading}>
              <h2 className="eyebrow">{col.heading}</h2>
              <ul className="mt-4 space-y-2.5 text-sm">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className="text-muted transition-colors hover:text-foreground">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>
      <div className="container-y flex flex-col gap-3 border-t border-border py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {siteConfig.company.legalName}. {siteConfig.name} is built by {siteConfig.company.builder}.
        </p>
        <p className="flex gap-5">
          <a href={siteConfig.app.logIn} className="hover:text-foreground">
            Log in
          </a>
          <a href={siteConfig.app.signUp} className="hover:text-foreground">
            Sign up
          </a>
        </p>
      </div>
      <div className="border-t border-border py-5 text-center text-xs text-muted">
        Powered by{' '}
        <a href="https://tyashin.com" target="_blank" rel="noopener" className="hover:text-primary hover:underline">
          Tyashin
        </a>
      </div>
    </footer>
  );
}
