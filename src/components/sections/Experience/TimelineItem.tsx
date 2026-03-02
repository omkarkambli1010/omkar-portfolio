import type { TimelineItem } from '@/types/experience';
import Tag from '@/components/ui/Tag/Tag';
import styles from './Experience.module.scss';

interface TimelineItemProps {
  item: TimelineItem;
  index: number;
}

export default function TimelineItemComponent({ item, index }: TimelineItemProps) {
  const { company, role, period, location, description, technologies } = item;
  const isRight = index % 2 === 1;

  return (
    <div
      className={`${styles.item} ${isRight ? styles['item--right'] : ''}`}
    >
      {/* Timeline dot */}
      <div className={styles.dot} aria-hidden="true">
        <div className={styles.dotInner} />
      </div>

      {/* Card */}
      <div className={styles.card}>
        <div className={styles.cardMeta}>
          <span className={styles.period}>{period}</span>
          <span className={styles.location}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} width={12} height={12} aria-hidden="true">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {location}
          </span>
        </div>
        <h3 className={styles.role}>{role}</h3>
        <p className={styles.company}>{company}</p>
        <ul className={styles.descList}>
          {description.map((point, i) => (
            <li key={i} className={styles.descItem}>
              <span className={styles.descArrow} aria-hidden="true">▸</span>
              {point}
            </li>
          ))}
        </ul>
        <div className={styles.techList}>
          {technologies.map((tech) => (
            <Tag key={tech} size="sm">{tech}</Tag>
          ))}
        </div>
      </div>
    </div>
  );
}
