'use client';

import { useEffect, RefObject } from 'react';
import { gsap } from '@/lib/gsap';

interface StaggerOptions {
  y?: number;
  x?: number;
  stagger?: number;
  duration?: number;
  start?: string;
  delay?: number;
  ease?: string;
}

/**
 * Applies a scroll-triggered stagger fade+translate animation to child elements
 * matching the given CSS selector inside the container.
 */
export function useStaggerReveal(
  containerRef: RefObject<Element | null>,
  itemSelector: string,
  options: StaggerOptions = {}
) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const items = container.querySelectorAll(itemSelector);
      if (!items.length) return;

      gsap.fromTo(
        items,
        {
          y: options.y ?? 40,
          x: options.x ?? 0,
          opacity: 0,
        },
        {
          y: 0,
          x: 0,
          opacity: 1,
          duration: options.duration ?? 0.7,
          ease: options.ease ?? 'power2.out',
          stagger: options.stagger ?? 0.1,
          delay: options.delay ?? 0,
          scrollTrigger: {
            trigger: container,
            start: options.start ?? 'top 78%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, containerRef as RefObject<Element>);

    return () => ctx.revert();
  }, [itemSelector, options.y, options.x, options.stagger, options.duration, options.start, options.delay, options.ease]);
}
