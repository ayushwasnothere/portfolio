import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
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
    // 2. Exit to top (held visible during middle of section scroll)
    .to(
      elements,
      { y: -120, opacity: 0, stagger: 0.02, duration: 1, ease: 'power1.in' },
      '>+1.2'
    );
  }, { scope: container });

  return (
    <section id="about" className="pb-section">
      <div className="container" ref={container}>
        <h2 className="text-4xl md:text-6xl font-thin mb-20 slide-up-and-fade leading-tight">
          I believe in a user centered design approach, ensuring that every project I work on is tailored to meet the specific needs of its users.
        </h2>

        <p className="pb-3 border-b border-border text-muted-foreground slide-up-and-fade">
          This is me.
        </p>

        <div className="grid md:grid-cols-12 mt-9 gap-6">
          <div className="md:col-span-5">
            <p className="text-5xl slide-up-and-fade">
              Hi, I'm Ayush.
            </p>
          </div>
          <div className="md:col-span-7">
            <div className="text-lg text-muted-foreground max-w-[450px]">
              <p className="slide-up-and-fade">
                I'm a software engineer dedicated to turning ideas into creative solutions. I specialize in building autonomous AI agents, high-performance systems, and robotic control pipelines.
              </p>
              <p className="mt-3 slide-up-and-fade">
                Currently interning at Roboparadigm, where I develop motion planning algorithms for industrial manipulators using ROS 2, MoveIt Task Constructor, and Gazebo.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
