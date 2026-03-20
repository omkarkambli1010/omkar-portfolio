import type { Metadata } from 'next';
import { ThemeProvider, themeScript } from '@/providers/ThemeProvider';
import { LenisProvider } from '@/providers/LenisProvider';
import Navbar from '@/components/layout/Navbar/Navbar';
import Footer from '@/components/layout/Footer/Footer';
import GlobalBackgroundLoader from '@/components/layout/GlobalBackground/GlobalBackgroundLoader';
import './globals.scss';

const SITE_URL = 'https://omkarkambli.dev';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Omkar Kambli — Software Developer & UI/UX Engineer',
    template: '%s | Omkar Kambli',
  },
  description:
    'Software Developer & UI/UX Engineer in Mumbai, India — crafting responsive, pixel-perfect web experiences with Angular, React, TypeScript and Figma.',
  keywords: [
    'Omkar Kambli', 'Software Developer', 'UI/UX Engineer', 'portfolio',
    'Angular', 'React', 'HTML', 'CSS', 'Bootstrap', 'Figma', 'JavaScript',
    'TypeScript', 'Mumbai', 'India', 'web developer', 'frontend developer',
  ],
  authors: [{ name: 'Omkar Kambli', url: SITE_URL }],
  creator: 'Omkar Kambli',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'Omkar Kambli Portfolio',
    title: 'Omkar Kambli — Software Developer & UI/UX Engineer',
    description:
      'Software Developer & UI/UX Engineer based in Mumbai, crafting responsive and pixel-perfect web experiences.',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'Omkar Kambli — Portfolio' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Omkar Kambli — Software Developer & UI/UX Engineer',
    description: 'Software Developer & UI/UX Engineer based in Mumbai, crafting responsive and pixel-perfect web experiences.',
    images: ['/images/og-image.jpg'],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Omkar Kambli',
  url: SITE_URL,
  jobTitle: 'Software Developer & UI/UX Engineer',
  description: 'Software Developer & UI/UX Engineer based in Mumbai, India',
  address: { '@type': 'PostalAddress', addressLocality: 'Mumbai', addressCountry: 'IN' },
  knowsAbout: ['Angular', 'React', 'TypeScript', 'HTML', 'CSS', 'Figma', 'Bootstrap', 'JavaScript'],
  sameAs: [
    'https://www.linkedin.com/in/omkar-kambli',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Prevents FOUC — runs synchronously before React hydration */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {/* JSON-LD structured data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <ThemeProvider>
          <LenisProvider>
            {/* Full-page aurora parallax — fixed, z-index: -1 */}
            <GlobalBackgroundLoader />
            {/* Subtle noise texture for premium feel */}
            <div className="noise-overlay" aria-hidden="true" />
            <Navbar />
            <main id="main-content" tabIndex={-1}>
              {children}
            </main>
            <Footer />
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
