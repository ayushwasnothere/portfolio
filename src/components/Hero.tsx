import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const container = useRef<HTMLElement>(null);
  const [timeStr, setTimeStr] = useState('');

  // Live Local Time Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatted = now.toLocaleTimeString('en-US', {
        hour12: true,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short',
      });
      setTimeStr(formatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Tajmirul Banner approach: elements start visible, only scrub exit on scroll
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: 'bottom 70%',
        end: 'bottom 10%',
        scrub: 1,
      },
    });

    tl.fromTo(
      '.slide-up-and-fade',
      { y: 0, opacity: 1 },
      { y: -150, opacity: 0, stagger: 0.02 },
    );
  }, { scope: container });

  return (
    <section id="home" className="relative overflow-hidden" ref={container}>
      <div className="container h-[100svh] min-h-[530px] flex flex-col justify-between py-12">
        {/* Top Status & Local Time Bar */}
        <div className="flex justify-between items-center text-xs sm:text-sm text-muted-foreground pt-4 pb-8 border-b border-border/30">
          <div className="flex items-center gap-2.5 slide-up-and-fade">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Available for opportunities</span>
          </div>
          <div className="flex items-center gap-3 font-mono slide-up-and-fade">
            <span>HYDERABAD, IN</span>
            <span>•</span>
            <span className="text-foreground font-semibold">{timeStr || '12:00:00 PM'}</span>
          </div>
        </div>

        {/* Main Hero Content */}
        <div className="grow flex items-center py-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center w-full">
            {/* Left Hero Text */}
            <div className="lg:col-span-8">
              <h1 className="font-anton text-6xl sm:text-[80px] lg:text-[100px] leading-[0.95] slide-up-and-fade">
                <span className="text-primary">SOFTWARE</span><br />
                <span className="ml-4 text-foreground">ENGINEER</span>
              </h1>

              <p className="slide-up-and-fade mt-6 text-lg sm:text-xl text-muted-foreground max-w-xl">
                Hi! I'm <span className="font-medium text-foreground">Ayush Shah</span>. 
                A creative engineer building autonomous AI agents, high-performance systems, and robotic control pipelines.
              </p>

              <div className="slide-up-and-fade mt-9 flex flex-wrap items-center gap-4">
                <a href="#projects" className="btn-primary">
                  <span className="btn-bg"></span>
                  <span className="btn-text">View Projects</span>
                </a>
                <a
                  href="https://github.com/ayushwasnothere"
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3 border border-border rounded-lg text-sm font-semibold hover:border-primary hover:text-primary transition-colors"
                >
                  GitHub ↗
                </a>
              </div>
            </div>

            {/* Right Statistics Panel */}
            <div className="lg:col-span-4 flex lg:flex-col justify-between gap-4 lg:gap-8 text-center lg:text-right">
              <div className="slide-up-and-fade">
                <h5 className="text-3xl sm:text-4xl font-anton text-primary mb-1.5">8+</h5>
                <p className="text-muted-foreground">Projects Shipped</p>
              </div>
              <div className="slide-up-and-fade">
                <h5 className="text-3xl sm:text-4xl font-anton text-primary mb-1.5">6+</h5>
                <p className="text-muted-foreground">Languages</p>
              </div>
              <div className="slide-up-and-fade">
                <h5 className="text-3xl sm:text-4xl font-anton text-primary mb-1.5">1+</h5>
                <p className="text-muted-foreground">Years Experience</p>
                <div className="mt-3 pt-3 border-t border-border/20 flex justify-center lg:justify-end">
                  <a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-primary hover:underline transition-colors tracking-wider uppercase font-semibold"
                  >
                    Resume ↗
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Scroll Indicator */}
        <div className="flex justify-between items-center text-xs text-muted-foreground pt-4 border-t border-border/20">
          <span className="font-mono slide-up-and-fade">// SCROLL TO EXPLORE</span>
          <span className="font-mono slide-up-and-fade">2026 EDITION</span>
        </div>
      </div>
    </section>
  );
}
