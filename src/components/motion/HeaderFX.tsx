'use client';

import { useEffect } from 'react';

/** Toggles .is-scrolled on the sticky header (class only; height never changes). */
export function HeaderFX() {
  useEffect(() => {
    const header = document.querySelector<HTMLElement>('header.site-header');
    if (!header) return;
    let ticking = false;
    const update = () => {
      ticking = false;
      header.classList.toggle('is-scrolled', window.scrollY > 12);
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return null;
}
