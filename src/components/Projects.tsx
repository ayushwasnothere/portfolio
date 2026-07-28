import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { projects } from '../data/projects';

gsap.registerPlugin(ScrollTrigger);

const GitHubIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const ExternalLinkIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const Projects = () => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>('.project-card');

      gsap.from(cards, {
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cards[0],
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    },
    { scope: containerRef }
  );

  const [featured, ...rest] = projects;

  return (
    <section id="projects" className="section" ref={containerRef}>
      <div className="container">
        <div className="section-header">
          <span className="section-label">// projects</span>
          <h2 className="section-title">Things I've Built</h2>
        </div>

        <div className="projects-grid">
          {/* Featured project */}
          <div
            className="project-card project-card-featured"
            style={{ '--card-accent': featured.accent } as React.CSSProperties}
          >
            <div>
              <span className="project-number">01</span>
              <h3 className="project-name">{featured.name}</h3>
              <p className="project-tagline">{featured.tagline}</p>
            </div>
            <div>
              <p className="project-description">{featured.description}</p>
              <div className="project-stack">
                {featured.stack.map((tech) => (
                  <span key={tech} className="pill">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="project-links">
                <a
                  href={featured.repoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link"
                >
                  <GitHubIcon />
                  Code
                </a>
                {featured.liveLink && (
                  <a
                    href={featured.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                  >
                    <ExternalLinkIcon />
                    Live
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Remaining projects */}
          {rest.map((project, index) => (
            <div
              key={project.name}
              className="project-card"
              style={{ '--card-accent': project.accent } as React.CSSProperties}
            >
              <span className="project-number">
                {String(index + 2).padStart(2, '0')}
              </span>
              <h3 className="project-name">{project.name}</h3>
              <p className="project-tagline">{project.tagline}</p>
              <p className="project-description">{project.description}</p>
              <div className="project-stack">
                {project.stack.map((tech) => (
                  <span key={tech} className="pill">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="project-links">
                <a
                  href={project.repoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link"
                >
                  <GitHubIcon />
                  Code
                </a>
                {project.liveLink && (
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                  >
                    <ExternalLinkIcon />
                    Live
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
