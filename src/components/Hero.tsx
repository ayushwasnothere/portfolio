import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Hero = () => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from('.hero-greeting', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 0.2,
        ease: 'power3.out',
      });

      gsap.from('.hero-name', {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 0.4,
        ease: 'power3.out',
      });

      gsap.from('.hero-title', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 0.6,
        ease: 'power3.out',
      });

      gsap.from('.hero-cta .btn', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
      });

      gsap.from('.hero-scroll-indicator', {
        opacity: 0,
        duration: 1,
        delay: 1.2,
        ease: 'power2.out',
      });
    },
    { scope: containerRef }
  );

  const scrollToProjects = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="hero section" ref={containerRef}>
      {/* Animated gradient background orbs */}
      <div className="hero-bg">
        <div className="hero-gradient-orb" />
        <div className="hero-gradient-orb" />
        <div className="hero-gradient-orb" />
      </div>

      <div className="container">
        <div className="hero-content">
          <p className="hero-greeting">// hello, world</p>

          <h1 className="hero-name">
            <span className="gradient-text">Ayush</span> Shah
          </h1>

          <p className="hero-title">
            Software Engineer building AI agents, high-performance systems, and
            robotic control pipelines.
          </p>

          <div className="hero-cta">
            <a className="btn btn-primary" href="#projects" onClick={scrollToProjects}>
              View Projects
            </a>
            <a
              className="btn btn-outline"
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              Download Resume
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll-indicator">
        scroll
        <span className="scroll-line" />
      </div>
    </section>
  );
};

export default Hero;
