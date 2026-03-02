'use client';

import { useEffect, RefObject } from 'react';
import { gsap } from '@/lib/gsap';

/**
 * Splits text into word-level spans and animates them in with a stagger reveal.
 * No paid GSAP plugins required.
 *
 * @param ref - Ref to the heading element
 * @param delay - Optional initial delay in seconds (default: 0)
 * @param triggerScroll - If true, animate on scroll; if false, animate immediately on mount
 */
export function useTextReveal(
  ref: RefObject<HTMLElement | null>,
  delay = 0,
  triggerScroll = false
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const text = el.textContent ?? '';
    const words = text.trim().split(/\s+/);

    el.innerHTML = words
      .map(
        (w) =>
          `<span style="display:inline-block;overflow:hidden;vertical-align:bottom"><span class="gsap-word" style="display:inline-block">${w}</span></span>`
      )
      .join(' ');

    const wordEls = el.querySelectorAll<HTMLElement>('.gsap-word');

    const ctx = gsap.context(() => {
      const fromVars = { y: '110%', opacity: 0 };
      const toVars = {
        y: '0%',
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.07,
        delay,
      };

      if (triggerScroll) {
        gsap.fromTo(wordEls, fromVars, {
          ...toVars,
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        });
      } else {
        gsap.fromTo(wordEls, fromVars, toVars);
      }
    }, el);

    return () => ctx.revert();
  }, [delay, triggerScroll]);
}
