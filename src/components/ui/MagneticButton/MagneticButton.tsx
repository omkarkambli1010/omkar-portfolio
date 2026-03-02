'use client';

import { useRef, useCallback } from 'react';
import { gsap } from '@/lib/gsap';
import styles from './MagneticButton.module.scss';

interface MagneticButtonProps {
  children: React.ReactNode;
  strength?: number;
}

export default function MagneticButton({
  children,
  strength = 0.4,
}: MagneticButtonProps) {
  const wrapRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = wrapRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const offsetX = e.clientX - rect.left - rect.width / 2;
      const offsetY = e.clientY - rect.top - rect.height / 2;

      gsap.to(el, {
        x: offsetX * strength,
        y: offsetY * strength,
        duration: 0.3,
        ease: 'power2.out',
      });
    },
    [strength]
  );

  const handleMouseLeave = useCallback(() => {
    gsap.to(wrapRef.current, {
      x: 0,
      y: 0,
      duration: 0.7,
      ease: 'elastic.out(1, 0.3)',
    });
  }, []);

  return (
    <div
      ref={wrapRef}
      className={styles.magnetic}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}
