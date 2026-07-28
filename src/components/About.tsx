import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { number: '8+', label: 'Projects' },
  { number: '6+', label: 'Languages' },
  { number: '1+', label: 'Years Experience' },
];

const About = () => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from('.about-image-wrapper', {
        x: -50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '#about',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      gsap.from('.about-text', {
        x: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '#about',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      gsap.from('.stat-item', {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.about-stats',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section id="about" className="section" ref={containerRef}>
      <div className="container">
        <div className="section-header">
          <span className="section-label">// about me</span>
        </div>

        <div className="about-grid">
          {/* Profile image with accent overlays */}
          <div className="about-image-wrapper">
            <img
              className="about-image"
              src="/pic.jpg"
              alt="Ayush Shah"
              loading="lazy"
            />
            <div className="about-image-border" />
            <div className="about-image-accent" />
          </div>

          {/* Bio content */}
          <div className="about-text">
            <h2>
              Building things that <span className="gradient-text">matter</span>
            </h2>

            <p>
              I'm a <strong>Software Engineer</strong> with a deep passion for
              building intelligent systems at the intersection of{' '}
              <strong>AI, robotics, and high-performance computing</strong>. From
              training <strong>autonomous agents</strong> to designing{' '}
              <strong>real-time control pipelines</strong>, I love tackling
              problems where precision and creativity collide.
            </p>

            <p>
              When I'm not writing code, you'll find me exploring new
              frameworks, contributing to open-source, or diving into research
              papers on <strong>reinforcement learning</strong> and{' '}
              <strong>robotic manipulation</strong>.
            </p>

            {/* Stat counters */}
            <div className="about-stats">
              {stats.map((stat) => (
                <div key={stat.label} className="stat-item">
                  <div className="stat-number gradient-text">{stat.number}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
