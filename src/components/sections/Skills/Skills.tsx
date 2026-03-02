'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/gsap';
import SectionHeading from '@/components/ui/SectionHeading/SectionHeading';
import SkillBar from './SkillBar';
import { SKILLS } from '@/lib/constants';
import type { SkillCategory } from '@/types/skill';
import styles from './Skills.module.scss';

const CATEGORIES: { value: SkillCategory | 'all'; label: string }[] = [
  { value: 'all',      label: 'All'      },
  { value: 'frontend', label: 'Frontend' },
  { value: 'design',   label: 'Design'   },
  { value: 'devops',   label: 'Tools'    },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<SkillCategory | 'all'>('all');

  const filtered = activeCategory === 'all'
    ? SKILLS
    : SKILLS.filter((s) => s.category === activeCategory);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        gridRef.current?.querySelectorAll(`.${styles.skillBar}`) ?? [],
        { x: -20, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [activeCategory]);

  // Animate on category change
  const handleCategory = (cat: SkillCategory | 'all') => {
    setActiveCategory(cat);
    if (!gridRef.current) return;
    gsap.fromTo(
      gridRef.current.querySelectorAll(`.${styles.skillBar}`),
      { x: -16, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.4, stagger: 0.06, ease: 'power2.out', delay: 0.05 }
    );
  };

  return (
    <section ref={sectionRef} id="skills" className={styles.skills} aria-label="Skills">
      <div className="container">
        <SectionHeading
          label="03. Skills"
          title="What I work with"
          subtitle="Tools and technologies I use to bring ideas to life."
        />

        {/* Category tabs */}
        <div className={styles.tabs} role="tablist" aria-label="Skill categories">
          {CATEGORIES.map(({ value, label }) => (
            <button
              key={value}
              role="tab"
              aria-selected={activeCategory === value}
              className={`${styles.tab} ${activeCategory === value ? styles['tab--active'] : ''}`}
              onClick={() => handleCategory(value)}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Skill bars */}
        <div ref={gridRef} className={styles.grid} role="tabpanel">
          {filtered.map((skill) => (
            <SkillBar key={skill.name} name={skill.name} level={skill.level} />
          ))}
        </div>
      </div>
    </section>
  );
}
