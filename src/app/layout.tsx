import type { Metadata } from 'next';
import { ThemeProvider, themeScript } from '@/providers/ThemeProvider';
import { LenisProvider } from '@/providers/LenisProvider';
import Navbar from '@/components/layout/Navbar/Navbar';
import Footer from '@/components/layout/Footer/Footer';
import './globals.scss';

export const metadata: Metadata = {
  title: {
    default: 'Omkar Kambli — Software Developer & UI/UX Engineer',
    template: '%s | Omkar Kambli',
  },
  description:
    'Software Developer & UI/UX Engineer based in Mumbai, India — specializing in Angular, React, HTML/CSS, Figma and Bootstrap to craft responsive, pixel-perfect web experiences.',
  keywords: [
    'Omkar Kambli', 'Software Developer', 'UI/UX engineer', 'portfolio',
    'angular', 'react', 'html', 'css', 'bootstrap', 'figma', 'javascript',
    'mumbai', 'india', 'web developer',
  ],
  authors: [{ name: 'Omkar Kambli' }],
  creator: 'Omkar Kambli',
  openGraph: {
    type: 'website',
    locale: 'en_US',
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
  robots: { index: true, follow: true },
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
      </head>
      <body>
        <ThemeProvider>
          <LenisProvider>
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
