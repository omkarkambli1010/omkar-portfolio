'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import MagneticButton from '@/components/ui/MagneticButton/MagneticButton';
import Button from '@/components/ui/Button/Button';
import styles from './Hero.module.scss';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const blobRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  // Page load intro animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Stagger reveal name words
      tl.fromTo(
        `.${styles.nameWord}`,
        { y: '110%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 0.9, stagger: 0.1 },
        0
      )
        .fromTo(
          subtitleRef.current,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 },
          0.5
        )
        .fromTo(
          taglineRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 },
          0.7
        )
        .fromTo(
          statusRef.current,
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          0.85
        )
        .fromTo(
          ctaRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 },
          0.95
        )
        .fromTo(
          scrollIndicatorRef.current,
          { y: 12, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          1.3
        );

      // Bouncing scroll indicator
      gsap.to(scrollIndicatorRef.current, {
        y: 10,
        duration: 1.2,
        ease: 'power1.inOut',
        repeat: -1,
        yoyo: true,
        delay: 2,
      });

      // Blob floating animation
      gsap.to(blobRef.current, {
        y: -40,
        x: 20,
        scale: 1.08,
        duration: 6,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Parallax on scroll
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(blobRef.current, {
        yPercent: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        },
      });

      gsap.to(headingRef.current, {
        yPercent: 20,
        opacity: 0.3,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Mouse parallax on blob
  useEffect(() => {
    const section = sectionRef.current;
    const blob = blobRef.current;
    if (!section || !blob) return;

    const quickX = gsap.quickTo(blob, 'x', { duration: 1.5, ease: 'power2.out' });
    const quickY = gsap.quickTo(blob, 'y', { duration: 1.5, ease: 'power2.out' });

    const onMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 60;
      const y = (e.clientY / innerHeight - 0.5) * 40;
      quickX(x);
      quickY(y);
    };

    section.addEventListener('mousemove', onMove);
    return () => section.removeEventListener('mousemove', onMove);
  }, []);

  const scrollToProjects = () => {
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={sectionRef} className={styles.hero} id="hero" aria-label="Introduction">
      {/* Ambient background blob */}
      <div ref={blobRef} className={styles.blob} aria-hidden="true" />
      <div className={styles.blobSecondary} aria-hidden="true" />

      {/* Grid pattern overlay */}
      <div className={styles.grid} aria-hidden="true" />

      <div className={`${styles.content} container`}>
        {/* Status badge */}
        <div ref={statusRef} className={styles.status}>
          <span className={styles.statusDot} aria-hidden="true" />
          Open to new opportunities · Mumbai, India
        </div>

        {/* Main heading */}
        <h1 ref={headingRef} className={styles.name} aria-label="Omkar Kambli">
          <span className={styles.nameWrap}>
            <span className={styles.nameWord}>Hi, I&apos;m</span>
          </span>{' '}
          <span className={styles.nameWrap}>
            <span className={`${styles.nameWord} ${styles.nameAccent}`}>Omkar</span>
          </span>
        </h1>

        {/* Role */}
        <p ref={subtitleRef} className={styles.subtitle}>
          <span className={styles.subtitleGradient}>Frontend Developer</span>
          {' '}& UI/UX Engineer
        </p>

        {/* Tagline */}
        <p ref={taglineRef} className={styles.tagline}>
          I build responsive, pixel-perfect web experiences with a sharp eye for design —
          turning Figma wireframes into fast, accessible, and engaging interfaces.
        </p>

        {/* CTA Buttons */}
        <div ref={ctaRef} className={styles.cta}>
          <MagneticButton>
            <Button variant="primary" size="lg" onClick={scrollToProjects}>
              View My Work
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden="true" width={18} height={18}>
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Button>
          </MagneticButton>
          <MagneticButton>
            <Button variant="outline" size="lg" onClick={scrollToContact}>
              Contact Me
            </Button>
          </MagneticButton>
        </div>

        {/* Tech pills */}
        <div className={styles.stack}>
          {['Angular', 'React', 'HTML/CSS', 'Figma'].map((tech) => (
            <span key={tech} className={styles.stackPill}>
              {tech}
            </span>
          ))}
          <span className={styles.stackMore}>+8 more</span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div ref={scrollIndicatorRef} className={styles.scrollIndicator} aria-hidden="true">
        <div className={styles.scrollLine} />
        <span className={styles.scrollLabel}>scroll</span>
      </div>
    </section>
  );
}
