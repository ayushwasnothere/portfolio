import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { skills } from '../data/skills';
import TechIcon from './TechIcon';

gsap.registerPlugin(ScrollTrigger);

export default function TechStack() {
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
      { y: 0, opacity: 1, stagger: 0.04, duration: 1, ease: 'power1.out' }
    )
    // 2. Exit to top
    .to(
      elements,
      { y: -120, opacity: 0, stagger: 0.02, duration: 1, ease: 'power1.in' },
      '>+1.2'
    );
  }, { scope: container });

  return (
    <section id="my-stack" className="pb-section">
      <div className="container" ref={container}>
        <div className="flex items-center gap-4 mb-10 slide-up-and-fade">
          <h2 className="text-xl uppercase leading-none">My Stack</h2>
        </div>
        <div className="space-y-16">
          {skills.map(category => (
            <div key={category.name} className="grid sm:grid-cols-12 gap-4">
              <div className="sm:col-span-5">
                <p className="slide-up-and-fade text-4xl md:text-5xl font-anton text-muted-foreground">
                  {category.name}
                </p>
              </div>
              <div className="sm:col-span-7 flex gap-x-8 gap-y-6 flex-wrap">
                {category.items.map(item => (
                  <div
                    key={item}
                    className="slide-up-and-fade flex gap-3 items-center px-4 py-2.5 rounded-xl bg-background-light/60 border border-border/60 hover:border-primary/50 transition-colors"
                  >
                    <TechIcon name={item} className="w-6 h-6 shrink-0" />
                    <span className="text-xl font-medium text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
