import React from 'react';
import styles from './SectionHeading.module.scss';

interface SectionHeadingProps {
  label: string;   // Small eyebrow text e.g. "01. About"
  title: string;   // Main heading
  subtitle?: string;
  align?: 'left' | 'center';
}

export default function SectionHeading({
  label,
  title,
  subtitle,
  align = 'left',
}: SectionHeadingProps) {
  return (
    <div className={`${styles.heading} ${align === 'center' ? styles['heading--center'] : ''}`}>
      <span className={styles.label}>{label}</span>
      <h2 className={styles.title}>{title}</h2>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </div>
  );
}
