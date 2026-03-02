import Hero from '@/components/sections/Hero/Hero';
import About from '@/components/sections/About/About';
import Projects from '@/components/sections/Projects/Projects';
import Skills from '@/components/sections/Skills/Skills';
import Experience from '@/components/sections/Experience/Experience';
import Contact from '@/components/sections/Contact/Contact';
import ScrollToTop from '@/components/ui/ScrollToTop/ScrollToTop';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Experience />
      <Contact />
      <ScrollToTop />
    </>
  );
}
