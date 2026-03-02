import { NAV_LINKS, SOCIAL_LINKS } from '@/lib/constants';
import styles from './Footer.module.scss';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`${styles.inner} container`}>
        <div className={styles.top}>
          {/* Brand */}
          <div className={styles.brand}>
            <span className={styles.logo}>omkar<span aria-hidden="true">.</span></span>
            <p className={styles.tagline}>
              Building digital experiences with code & creativity.
            </p>
          </div>

          {/* Nav links */}
          <nav className={styles.links} aria-label="Footer navigation">
            {NAV_LINKS.map(({ label, href }) => (
              <a key={href} href={href} className={styles.link}>
                {label}
              </a>
            ))}
          </nav>

          {/* Social */}
          <div className={styles.social}>
            {SOCIAL_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label={label}
              >
                {label}
              </a>
            ))}
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copy}>
            © {year} Omkar. Designed & built with{' '}
            <span aria-label="love">♥</span> in React.
          </p>
          <p className={styles.stack}>
            Next.js · SCSS · GSAP · TypeScript
          </p>
        </div>
      </div>
    </footer>
  );
}
