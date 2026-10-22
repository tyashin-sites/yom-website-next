'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { reduced } from './reduced';

/**
 * Sitewide declarative motion (DESIGN-SPEC §6), ~1 KB, no animation library.
 *
 *   data-fx="rise"   one-shot rise on entering the viewport. ONLY elements
 *                    that are below the fold at wiring time are ever hidden
 *                    (LCP LAW) — above-fold content is never touched.
 *   data-fx="fan"    scroll-linked progress (--p 0→1) for the sub-tenant
 *                    fan-out SVG; CSS turns --p into stroke-dashoffset.
 *
 * Reduced motion → nothing is wired; CSS shows final states.
 */
export function MotionFX() {
  const pathname = usePathname();

  useEffect(() => {
    if (reduced()) return;
    const vh = window.innerHeight;

    // 1. Rise
    const rise = Array.from(document.querySelectorAll<HTMLElement>('[data-fx="rise"]')).filter(
      (el) => el.getBoundingClientRect().top > vh * 0.92,
    );
    rise.forEach((el) => el.classList.add('fx-pending'));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const el = e.target as HTMLElement;
          el.classList.add('fx-in');
          el.classList.remove('fx-pending');
          io.unobserve(el);
        }
      },
      { rootMargin: '0px 0px -8% 0px' },
    );
    rise.forEach((el) => io.observe(el));
    // Safety net: a fast jump (anchor link, scroll restoration, fling) must never
    // leave content hidden — anything at or above the viewport bottom is shown.
    const reveal = (el: HTMLElement) => {
      if (!el.classList.contains('fx-pending')) return;
      el.classList.add('fx-in');
      el.classList.remove('fx-pending');
      io.unobserve(el);
    };
    let riseRaf = 0;
    const sweep = () => {
      riseRaf = 0;
      const h = window.innerHeight;
      rise.forEach((el) => el.getBoundingClientRect().top < h && reveal(el));
    };
    const onRiseScroll = () => {
      if (!riseRaf) riseRaf = requestAnimationFrame(sweep);
    };
    window.addEventListener('scroll', onRiseScroll, { passive: true });

    // 2. Fan-out progress (scroll-linked, rAF-coalesced, only while visible)
    const fans = Array.from(document.querySelectorAll<HTMLElement>('[data-fx="fan"]'));
    const visible = new Set<HTMLElement>();
    let raf = 0;
    const paint = () => {
      raf = 0;
      const h = window.innerHeight;
      visible.forEach((el) => {
        const r = el.getBoundingClientRect();
        // 0 when the top enters at 90% viewport, 1 when the centre reaches 45%.
        const start = h * 0.9;
        const end = h * 0.45 - r.height / 2;
        const p = Math.min(1, Math.max(0, (start - r.top) / (start - end)));
        el.style.setProperty('--p', p.toFixed(3));
      });
    };
    const onScroll = () => {
      if (!raf && visible.size) raf = requestAnimationFrame(paint);
    };
    const fio = new IntersectionObserver((entries) => {
      for (const e of entries) {
        const el = e.target as HTMLElement;
        if (e.isIntersecting) visible.add(el);
        else visible.delete(el);
      }
      onScroll();
    });
    fans.forEach((el) => {
      el.style.setProperty('--p', el.getBoundingClientRect().top > vh ? '0' : '1');
      fio.observe(el);
    });
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      io.disconnect();
      fio.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('scroll', onRiseScroll);
      if (riseRaf) cancelAnimationFrame(riseRaf);
      if (raf) cancelAnimationFrame(raf);
      rise.forEach((el) => el.classList.remove('fx-pending'));
    };
  }, [pathname]);

  return null;
}
