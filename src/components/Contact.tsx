import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TransitionLink from './TransitionLink';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const container = useRef<HTMLDivElement>(null);

  // Cascading Entrance Animation (Scroll Down: elements move UP from y:120 & fade IN)
  useGSAP(() => {
    const elements = container.current?.querySelectorAll('.slide-up-and-fade');
    if (!elements || elements.length === 0) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: 'top 90%',
        end: 'top 30%',
        scrub: 0.5,
      },
    });

    tl.fromTo(
      elements,
      { y: 120, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.05, ease: 'power1.out' }
    );
  }, { scope: container });

  return (
    <section id="contact" className="pb-section">
      <div className="container" ref={container}>
        <p className="text-muted-foreground mb-8 slide-up-and-fade">GET IN TOUCH</p>
        <h2 className="text-5xl md:text-7xl lg:text-8xl font-anton slide-up-and-fade">
          LET'S WORK<br/>
          <span className="text-primary">TOGETHER</span>
        </h2>
        <div className="mt-12 grid md:grid-cols-12 gap-8">
          <div className="md:col-span-5">
            <a href="mailto:ayushwasnothere@gmail.com" className="text-xl md:text-2xl hover:text-primary transition-colors slide-up-and-fade">
              ayushwasnothere@gmail.com
            </a>
          </div>
          <div className="md:col-span-7">
            <p className="text-muted-foreground mb-6 slide-up-and-fade">SOCIAL</p>
            <ul className="space-y-3">
              <li className="slide-up-and-fade">
                <a href="https://github.com/ayushwasnothere" target="_blank" rel="noreferrer" className="text-lg capitalize hover:underline">GitHub</a>
              </li>
              <li className="slide-up-and-fade">
                <a href="https://linkedin.com/in/ayushwasnothere" target="_blank" rel="noreferrer" className="text-lg capitalize hover:underline">LinkedIn</a>
              </li>
              <li className="slide-up-and-fade">
          <TransitionLink
            to="/blog"
            className="text-lg capitalize hover:underline">
            Blog
          </TransitionLink>

              </li>
            </ul>
          </div>
        </div>
        <div className="mt-20 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground slide-up-and-fade">© 2026 Ayush Shah. All rights reserved.</p>
        </div>
      </div>
    </section>
  );
}
