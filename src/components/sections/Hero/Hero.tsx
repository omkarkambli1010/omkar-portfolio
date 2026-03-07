'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from '@/lib/gsap';
import MagneticButton from '@/components/ui/MagneticButton/MagneticButton';
import Button from '@/components/ui/Button/Button';
import styles from './Hero.module.scss';

const PROFILE_IMAGE =
  'https://media.licdn.com/dms/image/v2/D4D03AQHezSmKIwiQVg/profile-displayphoto-scale_400_400/B4DZkqV99nH0Ag-/0/1757352037108?e=1774483200&v=beta&t=7H5N26R4cRmPC5kH4ICJMdPx1EDVhTo9-7cEf_6FtRE';

export default function Hero() {
  const sectionRef   = useRef<HTMLElement>(null);
  const statusRef    = useRef<HTMLDivElement>(null);
  const introRef     = useRef<HTMLParagraphElement>(null);
  const row1Ref      = useRef<HTMLSpanElement>(null);
  const row2Ref      = useRef<HTMLSpanElement>(null);
  const photoRef     = useRef<HTMLDivElement>(null);
  const subRowRef    = useRef<HTMLDivElement>(null);
  const ctaRef       = useRef<HTMLDivElement>(null);
  const stackRef     = useRef<HTMLDivElement>(null);
  const scrollRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl
        .fromTo(statusRef.current, { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, 0)
        .fromTo(introRef.current,  { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55 }, 0.1)
        .fromTo(row1Ref.current,   { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 0.85 }, 0.22)
        .fromTo(row2Ref.current,   { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 0.85 }, 0.36)
        .fromTo(
          photoRef.current,
          { clipPath: 'inset(0 0 100% 0)', opacity: 0 },
          { clipPath: 'inset(0 0 0% 0)',   opacity: 1, duration: 1.1, ease: 'power4.out' },
          0.18
        )
        .fromTo(subRowRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6  }, 0.75)
        .fromTo(ctaRef.current,    { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55 }, 0.9)
        .fromTo(stackRef.current,  { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5  }, 1.05)
        .fromTo(scrollRef.current, { opacity: 0 },        { opacity: 1, duration: 0.5 },        1.5);

      gsap.to(scrollRef.current, {
        y: 10, duration: 1.2, ease: 'power1.inOut', repeat: -1, yoyo: true, delay: 2,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollTo = (id: string) =>
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section ref={sectionRef} className={styles.hero} id="hero" aria-label="Introduction">
      <div className={styles.gridBg} aria-hidden="true" />

      {/*
       * .inner is position:relative — the photo is position:absolute inside it.
       * On desktop, .inner gets padding-right = photo width + gap so text never
       * slides under the photo.
       */}
      <div className={`${styles.inner} container`}>

        {/* Status */}
        <div ref={statusRef} className={styles.status}>
          <span className={styles.statusDot} aria-hidden="true" />
          Available for work · Mumbai, India
        </div>

        {/* Intro line */}
        <p ref={introRef} className={styles.intro}>
          Hi, my name is <strong>Omkar</strong> and I am a
        </p>

        {/* Big text — each row clips the span for slide-up reveal */}
        <div className={styles.nameRow}>
          <span ref={row1Ref} className={`${styles.bigText} ${styles.bigOutline}`}>
            Software
          </span>
        </div>

        <div className={styles.nameRow}>
          <span ref={row2Ref} className={`${styles.bigText} ${styles.bigFilled}`}>
            Developer.
          </span>
        </div>

        {/* Sub row */}
        <div ref={subRowRef} className={styles.subRow}>
          <span className={styles.amp}>&amp;</span>
          <span className={styles.subRole}>UI/UX Engineer</span>
          <span className={styles.sep} aria-hidden="true">—</span>
          <span className={styles.location}>based in Mumbai, India.</span>
        </div>

        {/* CTAs */}
        <div ref={ctaRef} className={styles.cta}>
          <MagneticButton>
            <Button variant="primary" size="lg" onClick={() => scrollTo('#projects')}>
              View My Work
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden="true" width={18} height={18}>
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Button>
          </MagneticButton>
          <MagneticButton>
            <Button variant="outline" size="lg" onClick={() => scrollTo('#contact')}>
              Let&apos;s Talk
            </Button>
          </MagneticButton>
        </div>

        {/* Tech pills */}
        <div ref={stackRef} className={styles.stack}>
          {['Angular', 'React', 'HTML/CSS', 'Figma', 'TypeScript'].map((t) => (
            <span key={t} className={styles.pill}>{t}</span>
          ))}
          <span className={styles.pillMore}>+7 more</span>
        </div>

        {/* ── Photo — positioned absolute within .inner ──────────
         *  Sits on the RIGHT, spanning the vertical space of the
         *  intro + big text block. Text content is protected by
         *  padding-right on .inner (desktop only).
         */}
        <div ref={photoRef} className={styles.photo}>
          <Image
            src={PROFILE_IMAGE}
            alt="Omkar Kambli — Software Developer & UI/UX Engineer"
            fill
            className={styles.photoImg}
            priority
            sizes="(max-width: 1024px) 0vw, 370px"
          />
          <div className={styles.photoFade} aria-hidden="true" />
        </div>
      </div>

      {/* Scroll cue */}
      <div ref={scrollRef} className={styles.scrollCue} aria-hidden="true">
        <div className={styles.scrollLine} />
        <span className={styles.scrollLabel}>scroll</span>
      </div>
    </section>
  );
}
