'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import type { Skill } from '@/types/skill';
import styles from './Skills.module.scss';

export default function SkillBar({ name, level }: Pick<Skill, 'name' | 'level'>) {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        barRef.current,
        { width: '0%' },
        {
          width: `${level}%`,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: barRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    return () => ctx.revert();
  }, [level]);

  return (
    <div className={styles.skillBar}>
      <div className={styles.skillBarHeader}>
        <span className={styles.skillBarName}>{name}</span>
        <span className={styles.skillBarLevel}>{level}%</span>
      </div>
      <div className={styles.skillBarTrack} role="progressbar" aria-valuenow={level} aria-valuemin={0} aria-valuemax={100} aria-label={`${name} proficiency ${level}%`}>
        <div ref={barRef} className={styles.skillBarFill} />
      </div>
    </div>
  );
}
