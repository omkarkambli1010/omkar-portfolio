import React from 'react';
import styles from './Tag.module.scss';

interface TagProps {
  children: React.ReactNode;
  size?: 'sm' | 'md';
}

export default function Tag({ children, size = 'md' }: TagProps) {
  return (
    <span className={`${styles.tag} ${size === 'sm' ? styles['tag--sm'] : ''}`}>
      {children}
    </span>
  );
}
