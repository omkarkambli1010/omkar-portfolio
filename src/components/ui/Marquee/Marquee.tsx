'use client';

import styles from './Marquee.module.scss';

interface MarqueeProps {
  items: string[];
  speed?: number; // seconds per full loop
  direction?: 'left' | 'right';
  theme?: 'dark' | 'accent' | 'light';
  size?: 'sm' | 'md' | 'lg';
}

export default function Marquee({
  items,
  speed = 30,
  direction = 'left',
  theme = 'accent',
  size = 'md',
}: MarqueeProps) {
  const separator = ' · ';
  const text = items.join(separator) + separator;

  return (
    <div
      className={[
        styles.marquee,
        styles[`marquee--${theme}`],
        styles[`marquee--${size}`],
      ].join(' ')}
      aria-hidden="true"
    >
      <div
        className={styles.track}
        style={{
          animationDuration: `${speed}s`,
          animationDirection: direction === 'right' ? 'reverse' : 'normal',
        }}
      >
        {/* Two copies for seamless infinite loop */}
        <span className={styles.content}>{text}</span>
        <span className={styles.content} aria-hidden="true">{text}</span>
      </div>
    </div>
  );
}
