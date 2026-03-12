'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { Project } from '@/types/project';
import Tag from '@/components/ui/Tag/Tag';
import styles from './Projects.module.scss';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const { title, description, tags, liveUrl, repoUrl, imageSrc, logoSrc, featured } = project;
  const [imgError, setImgError] = useState(false);

  const showImage = imageSrc && !imgError;

  return (
    <article className={`${styles.card} ${featured ? styles['card--featured'] : ''}`}>
      {/* Image */}
      <div className={styles.cardImage}>
        <div className={styles.cardImageInner}>
          {showImage ? (
            <Image
              src={imageSrc}
              alt={`${title} screenshot`}
              fill
              className={styles.cardImg}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className={styles.cardImagePlaceholder} aria-hidden="true" />
          )}
        </div>

        {featured && <span className={styles.featuredBadge}>Featured</span>}

        {/* Logo banner — bottom-left of the image */}
        {logoSrc && (
          <div className={styles.logoBanner}>
            <div className={styles.logoBannerImg}>
              <Image
                src={logoSrc}
                alt={`${title} logo`}
                fill
                className={styles.cardLogoImg}
                sizes="120px"
              />
            </div>
          </div>
        )}

        {/* Overlay with links */}
        <div className={styles.cardOverlay} aria-hidden="true">
          <div className={styles.overlayLinks}>
            {repoUrl && (
              <a
                href={repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.overlayBtn}
                aria-label={`View ${title} source code`}
                tabIndex={-1}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" width={20} height={20} aria-hidden="true">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                </svg>
              </a>
            )}
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.overlayBtn}
                aria-label={`View ${title} live demo`}
                tabIndex={-1}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} width={20} height={20} aria-hidden="true">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className={styles.cardBody}>
        <div className={styles.cardTags}>
          {tags.slice(0, 4).map((tag) => (
            <Tag key={tag} size="sm">{tag}</Tag>
          ))}
        </div>
        <h3 className={styles.cardTitle}>{title}</h3>
        <p className={styles.cardDesc}>{description}</p>

        <div className={styles.cardFooter}>
          {repoUrl && (
            <a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.cardLink}
              aria-label={`${title} source code`}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width={16} height={16} aria-hidden="true">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              Code
            </a>
          )}
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.cardLink}
              aria-label={`${title} live demo`}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} width={16} height={16} aria-hidden="true">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              Live Demo
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
