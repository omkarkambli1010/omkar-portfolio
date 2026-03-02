'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import SectionHeading from '@/components/ui/SectionHeading/SectionHeading';
import ProjectCard from './ProjectCard';
import { PROJECTS } from '@/lib/constants';
import styles from './Projects.module.scss';

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stagger cards on scroll
      gsap.fromTo(
        gridRef.current?.querySelectorAll('article') ?? [],
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: { amount: 0.5, from: 'start' },
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
  }, []);

  return (
    <section ref={sectionRef} id="projects" className={styles.projects} aria-label="Projects">
      <div className="container">
        <SectionHeading
          label="02. Projects"
          title="Things I've built"
          subtitle="A selection of projects I'm proud of — ranging from full-stack products to creative experiments."
        />

        <div ref={gridRef} className={styles.grid}>
          {PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
