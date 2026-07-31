import { useRef, useState, useEffect } from 'react';
import TransitionLink from './TransitionLink';
import TechIcon from './TechIcon';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { projects } from '../data/projects';

gsap.registerPlugin(ScrollTrigger);

export default function ProjectList() {
  const container = useRef<HTMLElement>(null);
  const projectListRef = useRef<HTMLDivElement>(null);
  const imageContainer = useRef<HTMLDivElement>(null);
  const [activeProject, setActiveProject] = useState<number>(0);
  const lastScrollY = useRef<number>(window.scrollY);

  // Continuously track scroll position in a ref (only runs while Home is mounted)
  useEffect(() => {
    const onScroll = () => {
      lastScrollY.current = window.scrollY;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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

  // Tajmirul window mousemove tracking: smooth hover card tracking during mouse move & scroll
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!projectListRef.current || !imageContainer.current || window.innerWidth < 768) {
        return;
      }

      const containerRect = projectListRef.current.getBoundingClientRect();
      const imageRect = imageContainer.current.getBoundingClientRect();

      // If cursor is outside the project list section (above, below, left, right), fade out cleanly
      if (
        e.clientY < containerRect.top ||
        e.clientY > containerRect.bottom ||
        e.clientX < containerRect.left ||
        e.clientX > containerRect.right
      ) {
        gsap.to(imageContainer.current, {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.out',
        });
        return;
      }

      const offsetTop = e.clientY - containerRect.top;

      // Position hover card smoothly alongside cursor as user moves or scrolls
      gsap.to(imageContainer.current, {
        y: offsetTop - imageRect.height / 2,
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out',
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleProjectClick = () => {
    const currentScrollY = window.lastRecordedScrollY ?? window.scrollY;
    sessionStorage.setItem('portfolio_project_scroll_y', String(currentScrollY));
    sessionStorage.setItem('portfolio_is_navigating', 'true');
  };

  const currentProject = projects[activeProject] || projects[0];

  return (
    <section id="projects" className="pb-section relative" ref={container}>
      <div className="container">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 pb-8 mb-12 border-b border-border/40">
          <div>
            <span className="text-xs font-mono text-primary uppercase tracking-widest block mb-2 slide-up-and-fade">
              // SELECTED WORK
            </span>
            <h2 className="text-4xl sm:text-6xl font-anton slide-up-and-fade">
              FEATURED <span className="text-primary">PROJECTS</span>
            </h2>
          </div>
          <span className="text-sm font-mono text-muted-foreground slide-up-and-fade">
            {projects.length} PRODUCTION REPOSITORIES
          </span>
        </div>

        <div ref={projectListRef} className="relative">
          {/* Floating Hover Preview Card (Always renders active content, opacity controlled by window mouse tracking) */}
          <div
            ref={imageContainer}
            className="fixed md:absolute right-6 w-[340px] h-[220px] pointer-events-none opacity-0 z-30 rounded-2xl overflow-hidden shadow-2xl border border-white/10 backdrop-blur-xl hidden md:block"
          >
            <div
              className="w-full h-full p-6 flex flex-col justify-between relative overflow-hidden transition-all duration-300"
              style={{
                background: `linear-gradient(135deg, ${currentProject.accent}30 0%, #0d0f15 100%)`,
              }}
            >
              <div className="flex justify-between items-start">
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/10 text-white backdrop-blur-md">
                  {currentProject.category}
                </span>
                <span className="text-xs font-mono text-white/60">
                  {currentProject.year}
                </span>
              </div>

              <div>
                <h4 className="font-anton text-4xl text-white mb-1">
                  {currentProject.name}
                </h4>
                <p className="text-xs text-white/70 line-clamp-2">
                  {currentProject.tagline}
                </p>
              </div>

              <div className="flex gap-2">
                {currentProject.stack.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className="text-[10px] px-2.5 py-0.5 rounded-full bg-white/10 text-white/90"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Project Rows */}
          <div className="divide-y divide-border/30">
            {projects.map((project, index) => (
              <TransitionLink
                key={project.slug}
                to={`/project/${project.slug}`}
                onClick={handleProjectClick}
                className="group flex flex-col md:flex-row md:items-center justify-between py-8 px-4 sm:px-6 rounded-2xl transition-all duration-300 hover:bg-white/[0.03] slide-up-and-fade cursor-pointer"
                onMouseEnter={() => setActiveProject(index)}
              >
                {/* Number & Name */}
                <div className="flex items-baseline gap-6 mb-4 md:mb-0">
                  <span className="font-anton text-2xl sm:text-3xl text-muted-foreground/60 group-hover:text-primary transition-colors">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="text-2xl sm:text-4xl font-anton tracking-wide flex items-center gap-3">
                      <span className="project-title-fill">{project.name}</span>
                      <span className="text-lg font-mono text-muted-foreground font-normal md:hidden">
                        ({project.year})
                      </span>
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1 max-w-md line-clamp-1">
                      {project.tagline}
                    </p>
                  </div>
                </div>

                {/* Tech Pills & Arrow */}
                <div className="flex items-center justify-between md:justify-end gap-6">
                  {/* Tech stack icons */}
                  <div className="hidden sm:flex items-center gap-2">
                    {project.stack.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="p-2 rounded-lg bg-background-light/60 border border-border/40 group-hover:border-primary/40 transition-colors"
                        title={tech}
                      >
                        <TechIcon name={tech} className="w-4 h-4" />
                      </span>
                    ))}
                  </div>

                  {/* Arrow Indicator */}
                  <div className="w-12 h-12 rounded-full border border-border/40 flex items-center justify-center group-hover:border-primary group-hover:bg-primary group-hover:text-background transition-all duration-300 transform group-hover:translate-x-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </div>
                </div>
              </TransitionLink>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
