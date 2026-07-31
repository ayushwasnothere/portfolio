import { useParams } from 'react-router-dom';
import { useRef } from 'react';
import { useLenis } from 'lenis/react';
import TransitionLink from '../components/TransitionLink';
import TechIcon from '../components/TechIcon';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { projects } from '../data/projects';
import { ExternalLink, ArrowLeft } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const containerRef = useRef<HTMLDivElement>(null);
  const project = projects.find((p) => p.slug === slug);

  // Scroll to top via Lenis on mount
  const lenis = useLenis();
  if (lenis) {
    lenis.scrollTo(0, { immediate: true });
  }

  // Entrance reveal animation
  useGSAP(
    () => {
      if (!containerRef.current) return;

      gsap.set('.fade-in-later', {
        autoAlpha: 0,
        y: 30,
      });

      const tl = gsap.timeline({ delay: 0.2 });

      tl.to('.fade-in-later', {
        autoAlpha: 1,
        y: 0,
        stagger: 0.08,
        duration: 0.6,
        ease: 'power2.out',
      });
    },
    { scope: containerRef, dependencies: [project] }
  );

  // Tajmirul reference: Blur info div and scale down on scroll as #images comes into view
  useGSAP(
    () => {
      if (!containerRef.current || !project?.images || project.images.length === 0) return;
      if (window.innerWidth < 992) return;

      gsap.to('#info', {
        filter: 'blur(6px)',
        autoAlpha: 0,
        scale: 0.88,
        scrollTrigger: {
          trigger: '#info',
          start: 'top top+=60',
          end: 'bottom top+=250',
          pin: true,
          pinSpacing: false,
          scrub: 0.5,
        },
      });
    },
    { scope: containerRef, dependencies: [project] }
  );

  // Tajmirul reference: Parallax background-position effect on showcase images
  useGSAP(
    () => {
      if (!containerRef.current || !project?.images || project.images.length === 0) return;

      gsap.utils
        .toArray<HTMLDivElement>('#images > div')
        .forEach((imageDiv, i) => {
          gsap.to(imageDiv, {
            backgroundPosition: 'center 0%',
            ease: 'none',
            scrollTrigger: {
              trigger: imageDiv,
              start: () => (i ? 'top bottom' : 'top 60%'),
              end: 'bottom top',
              scrub: true,
            },
          });
        });
    },
    { scope: containerRef, dependencies: [project] }
  );

  if (!project) {
    return (
      <div className="container min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-anton text-6xl mb-4">404</h1>
          <p className="text-muted-foreground text-lg mb-8">Project not found.</p>
          <TransitionLink to="/" className="btn-primary">
            <span className="btn-bg"></span>
            <span className="btn-text">Go Home</span>
          </TransitionLink>
        </div>
      </div>
    );
  }

  const hasImages = Boolean(project.images && project.images.length > 0);

  return (
    <section className={`pt-6 ${hasImages ? 'pb-[45vh]' : 'pb-20'}`}>
      <div className="container" ref={containerRef}>
        {/* Back Link */}
        <TransitionLink
          to="/"
          className="mb-6 inline-flex gap-2 items-center group h-10 text-muted-foreground hover:text-foreground transition-colors font-mono text-sm"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 group-hover:text-primary transition-all duration-300" />
          Back
        </TransitionLink>

        {/* #info Section */}
        <div
          id="info"
          className="top-0 min-h-[60vh] flex flex-col justify-center py-6"
        >
          <div className="relative w-full max-w-[800px] mx-auto">
            {/* Title & Action Icons */}
            <div className="flex items-start justify-between gap-6 mb-8 pb-6 border-b border-border/40">
              <div>
                <span className="fade-in-later text-xs font-mono text-primary uppercase tracking-widest block mb-2">
                  // {project.category}
                </span>
                <h1 className="fade-in-later font-anton text-4xl sm:text-6xl md:text-7xl leading-tight">
                  {project.name}
                </h1>
              </div>

              {/* External Links */}
              <div className="fade-in-later flex gap-3 pt-2">
                {project.repoLink && (
                  <a
                    href={project.repoLink}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3.5 rounded-xl border border-border/60 bg-background-light/40 hover:border-primary hover:text-primary transition-all shadow-sm flex items-center justify-center"
                    title="Source Code"
                  >
                    <svg
                      className="w-6 h-6"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                      <path d="M9 18c-4.51 2-5-2-7-2" />
                    </svg>
                  </a>
                )}
                {project.liveLink && (
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3.5 rounded-xl border border-border/60 bg-background-light/40 hover:border-primary hover:text-primary transition-all shadow-sm flex items-center justify-center"
                    title="Live Demo"
                  >
                    <ExternalLink className="w-6 h-6" />
                  </a>
                )}
              </div>
            </div>

            {/* Details Stack */}
            <div className="space-y-6">
              {/* Year */}
              <div className="fade-in-later">
                <p className="text-muted-foreground font-mono text-xs uppercase tracking-widest mb-1.5">
                  Year
                </p>
                <p className="text-lg font-semibold">{project.year}</p>
              </div>

              {/* Tech Stack */}
              <div className="fade-in-later">
                <p className="text-muted-foreground font-mono text-xs uppercase tracking-widest mb-2.5">
                  Tech & Technique
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-3.5 py-1.5 rounded-lg bg-background-light border border-border/50 text-foreground flex items-center gap-2"
                    >
                      <TechIcon name={tech} className="w-4 h-4" />
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="fade-in-later">
                <p className="text-muted-foreground font-mono text-xs uppercase tracking-widest mb-1.5">
                  Description
                </p>
                <p className="text-lg text-foreground/90 leading-relaxed">
                  {project.longDescription}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* #images Section */}
        {hasImages && (
          <div
            id="images"
            className="fade-in-later relative flex flex-col gap-10 max-w-[800px] mx-auto mt-8 z-20"
          >
            {project.images!.map((image, idx) => (
              <div
                key={idx}
                className="group relative w-full aspect-[750/420] rounded-2xl overflow-hidden bg-background-light border border-border/50 shadow-2xl"
                style={{
                  backgroundImage: `url(${image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center 50%',
                  backgroundRepeat: 'no-repeat',
                }}
              >
                <a
                  href={image}
                  target="_blank"
                  rel="noreferrer"
                  className="absolute top-4 right-4 bg-background/80 text-foreground p-3 rounded-xl border border-white/10 opacity-0 group-hover:opacity-100 hover:bg-primary hover:text-background transition-all shadow-lg"
                  title="View Full Resolution Image"
                >
                  <ExternalLink className="w-5 h-5" />
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
