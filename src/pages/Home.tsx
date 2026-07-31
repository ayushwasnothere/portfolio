import { useEffect } from 'react';
import { useLenis } from 'lenis/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero from '../components/Hero';
import About from '../components/About';
import TechStack from '../components/TechStack';
import Experience from '../components/Experience';
import ProjectList from '../components/ProjectList';
import BlogSection from '../components/BlogSection';
import Contact from '../components/Contact';
import MiniTerminal from '../components/MiniTerminal';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const lenis = useLenis();

  useEffect(() => {
    const isNavigating = sessionStorage.getItem('portfolio_is_navigating');
    const savedY = sessionStorage.getItem('portfolio_project_scroll_y');

    if (isNavigating === 'true' && savedY) {
      // Returning from project detail page -> restore scroll position
      const targetY = parseInt(savedY, 10);
      sessionStorage.removeItem('portfolio_is_navigating');

      const restore = () => {
        window.scrollTo(0, targetY);
        if (lenis) {
          lenis.scrollTo(targetY, { immediate: true });
        }
        ScrollTrigger.refresh();
      };

      restore();
      requestAnimationFrame(restore);
      setTimeout(restore, 100);
    } else {
      // Refresh or fresh website visit -> ALWAYS map to 0 (#home)
      sessionStorage.removeItem('portfolio_project_scroll_y');
      sessionStorage.removeItem('portfolio_is_navigating');

      window.scrollTo(0, 0);
      if (lenis) {
        lenis.scrollTo(0, { immediate: true });
      }
      requestAnimationFrame(() => ScrollTrigger.refresh());
    }
  }, [lenis]);

  return (
    <>
      <Hero />
      <About />
      <TechStack />
      <Experience />
      <ProjectList />
      <BlogSection />
      <MiniTerminal />
      <Contact />
    </>
  );
}
