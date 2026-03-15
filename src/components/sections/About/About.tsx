"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import SectionHeading from "@/components/ui/SectionHeading/SectionHeading";
import { TECH_STACK } from "@/lib/constants";
import styles from "./About.module.scss";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef   = useRef<HTMLDivElement>(null);
  const bioRef     = useRef<HTMLDivElement>(null);
  const gridRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Bio text paragraphs fade up
      gsap.fromTo(
        bioRef.current?.querySelectorAll("p") ?? [],
        { y: 32, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power2.out",
          scrollTrigger: { trigger: bioRef.current, start: "top 80%", toggleActions: "play none none reverse" },
        },
      );

      // Image clip-path reveal
      gsap.fromTo(
        imageRef.current,
        { clipPath: "inset(100% 0 0 0)", opacity: 0 },
        {
          clipPath: "inset(0% 0 0 0)", opacity: 1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: imageRef.current, start: "top 80%", toggleActions: "play none none reverse" },
        },
      );

      // Tech stack stagger
      gsap.fromTo(
        gridRef.current?.querySelectorAll(`.${styles.techItem}`) ?? [],
        { y: 20, opacity: 0, scale: 0.9 },
        {
          y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.05, ease: "back.out(1.5)",
          scrollTrigger: { trigger: gridRef.current, start: "top 85%", toggleActions: "play none none reverse" },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className={styles.about}
      aria-label="About me"
    >
      <div className="container">
        <SectionHeading
          label="01. About"
          title="A bit about me"
          subtitle="A Software Developer who bridges the gap between design and code."
        />

        <div className={styles.grid}>
          {/* Image column */}
          <div className={styles.imageCol}>
            <div ref={imageRef} className={styles.imageWrap}>
              <Image
                src="/images/IMG_5343.jpeg"
                alt="Omkar Kambli"
                fill
                className={styles.profileImage}
                priority
              />
              <div className={styles.imageFrame} aria-hidden="true" />
            </div>
          </div>

          {/* Bio column */}
          <div ref={bioRef} className={styles.bioCol}>
            <p>
              I&apos;m Omkar Kambli, a Software Developer &amp; UI/UX Engineer based
              in Mumbai, India. With 5+ years of professional experience, I
              specialise in building responsive, pixel-perfect web applications
              and bringing Figma &amp; Adobe XD designs to life using Angular,
              React, CSS, SCSS with backend integration using GOLANG and MSSQL.
            </p>
            <p>
              I started my career as an intern at Myrsa Technologies, progressed
              through Motilal Oswal Finance Pvt Ltd, and most recently joined
              SBI Securities as a Senior Software Developer, where I built and
              launched a Union Budget 2026-27 webpage praised for its
              performance and clarity.
            </p>

            {/* Stats */}
            <div className={styles.stats}>
              {[
                { value: "5+", label: "Years Experience" },
                { value: "30+", label: "Projects Delivered" },
                { value: "4",   label: "Companies" },
              ].map(({ value, label }) => (
                <div key={label} className={styles.stat}>
                  <span className={styles.statValue}>{value}</span>
                  <span className={styles.statLabel}>{label}</span>
                </div>
              ))}
            </div>

            {/* Tech stack */}
            <div className={styles.techSection}>
              <h3 className={styles.techTitle}>Technologies I work with</h3>
              <div ref={gridRef} className={styles.techGrid}>
                {TECH_STACK.map((tech) => (
                  <span key={tech} className={styles.techItem}>
                    <span className={styles.techDot} aria-hidden="true">▸</span>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
