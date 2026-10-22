'use client';

import { useEffect, useState } from 'react';
import { primaryNav, siteConfig } from '@/config/site';

export function MobileNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border"
      >
        <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
        <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true" fill="none">
          {open ? (
            <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          ) : (
            <path d="M2 5h14M2 9h14M2 13h9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          )}
        </svg>
      </button>
      {open ? (
        <div id="mobile-menu" className="fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto bg-background">
          <nav aria-label="Mobile" className="container-y py-8">
            <ul className="space-y-1">
              {primaryNav.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="block border-b border-border py-4 font-heading text-3xl">
                    {n.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="/contact" className="block border-b border-border py-4 font-heading text-3xl">
                  Contact
                </a>
              </li>
            </ul>
            <div className="mt-8 flex flex-col gap-3">
              <a href={siteConfig.app.signUp} className="btn btn-primary">
                {siteConfig.cta.primary}
              </a>
              <a href={siteConfig.app.logIn} className="btn btn-ghost">
                Log in
              </a>
            </div>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
