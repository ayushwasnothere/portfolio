import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { experience } from '../data/experience';

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const container = useRef<HTMLDivElement>(null);

  // Single unified scrubbed timeline: Entrance -> Hold -> Exit
  useGSAP(() => {
    const elements = container.current?.querySelectorAll('.slide-up-and-fade');
    if (!elements || elements.length === 0) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: 'top 85%',
        end: 'bottom 15%',
        scrub: 0.5,
      },
    });

    // 1. Entrance from bottom
    tl.fromTo(
      elements,
      { y: 120, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.05, duration: 1, ease: 'power1.out' }
    )
    // 2. Exit to top
    .to(
      elements,
      { y: -120, opacity: 0, stagger: 0.02, duration: 1, ease: 'power1.in' },
      '>+1.2'
    );
  }, { scope: container });

  return (
    <section id="experience" className="pb-section">
      <div className="container" ref={container}>
        <div className="flex items-center gap-4 mb-10 slide-up-and-fade">
          <h2 className="text-xl uppercase leading-none">Experience</h2>
        </div>
        <div className="space-y-12">
          {experience.map(exp => (
            <div key={exp.company} className="grid md:grid-cols-12 gap-6">
              <div className="md:col-span-5">
                <p className="text-3xl md:text-4xl font-anton text-muted-foreground slide-up-and-fade">
                  {exp.company}
                </p>
                <p className="text-muted-foreground mt-2 slide-up-and-fade">{exp.period}</p>
              </div>
              <div className="md:col-span-7">
                <p className="text-2xl mb-2 slide-up-and-fade">{exp.role}</p>
                <p className="text-sm text-muted-foreground mb-4 slide-up-and-fade">{exp.location}</p>
                <ul className="space-y-2 text-muted-foreground">
                  {exp.bullets.map((bullet, i) => (
                    <li key={i} className="slide-up-and-fade">— {bullet}</li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2 mt-4">
                  {exp.techBadges.map(badge => (
                    <span key={badge} className="text-xs px-3 py-1 border border-border rounded-full text-muted-foreground slide-up-and-fade">
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
