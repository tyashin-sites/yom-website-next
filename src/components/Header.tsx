import { primaryNav, siteConfig, withBlog } from '@/config/site';
import { getBlogStatusAtBuild } from '@/lib/blog';
import { Wordmark } from './brand/Mark';
import { MobileNav } from './MobileNav';
import { HeaderFX } from './motion/HeaderFX';

/** Sticky header. Height is constant (CLS LAW); .is-scrolled only adds a shadow + scales the lockup. */
export async function Header() {
  const nav = withBlog(primaryNav, (await getBlogStatusAtBuild()).hasPosts);
  return (
    <header className="site-header sticky top-0 z-50">
      <div className="container-y flex h-16 items-center justify-between gap-6">
        <a href="/" aria-label="YOM home" className="shrink-0">
          <Wordmark />
        </a>
        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-7 text-[0.92rem] font-medium">
            {nav.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="text-muted transition-colors hover:text-foreground">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="hidden items-center gap-5 lg:flex">
          <a href={siteConfig.app.logIn} className="text-[0.92rem] font-medium text-muted hover:text-foreground">
            Log in
          </a>
          <a href={siteConfig.app.signUp} className="btn btn-primary !min-h-[2.4rem] !px-4 !py-2 text-[0.88rem]">
            Start free
          </a>
        </div>
        <MobileNav nav={nav} />
      </div>
      <HeaderFX />
    </header>
  );
}
