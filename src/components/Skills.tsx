import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { skills } from '../data/skills';

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const categories = gsap.utils.toArray<HTMLElement>('.skill-category');

      gsap.from(categories, {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: categories[0],
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section id="skills" className="section" ref={containerRef}>
      <div className="container">
        <div className="section-header">
          <span className="section-label">// skills</span>
          <h2 className="section-title">Technologies &amp; Tools</h2>
        </div>

        <div className="skills-grid">
          {skills.map((category) => (
            <div key={category.name} className="skill-category">
              <h3 className="skill-category-name">{category.name}</h3>
              <div className="skill-items">
                {category.items.map((item) => (
                  <span key={item} className="pill">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
