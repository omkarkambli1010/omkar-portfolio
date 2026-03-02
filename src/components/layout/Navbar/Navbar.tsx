'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from '@/lib/gsap';
import { NAV_LINKS } from '@/lib/constants';
import ThemeToggle from '@/components/ui/ThemeToggle/ThemeToggle';
import styles from './Navbar.module.scss';

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const lastScroll = useRef(0);

  // Hide/show navbar on scroll direction
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const handleScroll = () => {
      const current = window.scrollY;
      const diff = current - lastScroll.current;

      if (current < 80) {
        gsap.to(nav, { y: 0, duration: 0.3, ease: 'power2.out' });
      } else if (diff > 4) {
        gsap.to(nav, { y: '-100%', duration: 0.3, ease: 'power2.in' });
      } else if (diff < -4) {
        gsap.to(nav, { y: 0, duration: 0.4, ease: 'power2.out' });
      }

      lastScroll.current = current;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Active section tracking
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
      setMenuOpen(false);
    },
    []
  );

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <header ref={navRef} className={styles.nav}>
        <div className={`${styles.inner} container`}>
          {/* Logo */}
          <a
            href="#"
            className={styles.logo}
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            aria-label="Back to top"
          >
            <span className={styles.logoText}>omkar</span>
            <span className={styles.logoDot} aria-hidden="true" />
          </a>

          {/* Desktop links */}
          <nav className={styles.links} aria-label="Main navigation">
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                onClick={(e) => handleNavClick(e, href)}
                className={`${styles.link} ${activeSection === href ? styles['link--active'] : ''}`}
              >
                {label}
              </a>
            ))}
          </nav>

          <div className={styles.actions}>
            <ThemeToggle />
            <a href="#contact" className={styles.cta} onClick={(e) => handleNavClick(e, '#contact')}>
              Hire Me
            </a>

            {/* Hamburger */}
            <button
              className={`${styles.hamburger} ${menuOpen ? styles['hamburger--open'] : ''}`}
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={`${styles.drawer} ${menuOpen ? styles['drawer--open'] : ''}`}
        aria-hidden={!menuOpen}
      >
        <nav aria-label="Mobile navigation">
          {NAV_LINKS.map(({ label, href }, i) => (
            <a
              key={href}
              href={href}
              onClick={(e) => handleNavClick(e, href)}
              className={styles.drawerLink}
              style={{ transitionDelay: `${i * 0.06}s` }}
            >
              <span className={styles.drawerIndex}>0{i + 1}</span>
              {label}
            </a>
          ))}
        </nav>
      </div>

      {/* Backdrop */}
      {menuOpen && (
        <div
          className={styles.backdrop}
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}
