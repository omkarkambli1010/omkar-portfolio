'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import SectionHeading from '@/components/ui/SectionHeading/SectionHeading';
import TimelineItemComponent from './TimelineItem';
import { EXPERIENCE } from '@/lib/constants';
import styles from './Experience.module.scss';

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Draw timeline line as you scroll
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 70%',
            end: 'bottom 60%',
            scrub: 1,
          },
        }
      );

      // Stagger each timeline card
      gsap.fromTo(
        timelineRef.current?.querySelectorAll(`.${styles.card}`) ?? [],
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Dots pop in
      gsap.fromTo(
        timelineRef.current?.querySelectorAll(`.${styles.dot}`) ?? [],
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          stagger: 0.2,
          ease: 'back.out(2)',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="experience" className={styles.experience} aria-label="Experience">
      <div className="container">
        <SectionHeading
          label="04. Experience"
          title="Where I've worked"
          subtitle="My professional journey and the impact I've made along the way."
        />

        <div ref={timelineRef} className={styles.timeline}>
          {/* Vertical line */}
          <div className={styles.lineWrap} aria-hidden="true">
            <div ref={lineRef} className={styles.line} />
          </div>

          {/* Items */}
          {EXPERIENCE.map((item, index) => (
            <TimelineItemComponent key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
