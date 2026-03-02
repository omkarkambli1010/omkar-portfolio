'use client';

// ============================================================
// GSAP SETUP — plugin registration + Lenis proxy config
// Import this module ONLY on the client side.
// ============================================================
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import type Lenis from 'lenis';

// Register plugins once
gsap.registerPlugin(ScrollTrigger, TextPlugin);

/**
 * Connects Lenis smooth scroll to GSAP's ScrollTrigger.
 * Must be called after Lenis is initialized (in LenisProvider).
 */
export function configureLenisWithGSAP(lenis: Lenis) {
  // Keep ScrollTrigger in sync with Lenis scroll position
  lenis.on('scroll', () => ScrollTrigger.update());

  // Drive Lenis via GSAP's ticker (single RAF loop)
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  // Prevent GSAP from skipping frames after tab focus loss
  gsap.ticker.lagSmoothing(0);

  // Tell ScrollTrigger to use Lenis for scroll position
  ScrollTrigger.scrollerProxy(document.documentElement, {
    scrollTop(value) {
      if (arguments.length && value !== undefined) {
        lenis.scrollTo(value as number);
      }
      return lenis.scroll;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
  });

  ScrollTrigger.refresh();
}

export { gsap, ScrollTrigger };
