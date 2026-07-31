import { useRef } from 'react';
import TransitionLink from './TransitionLink';
import { getAllBlogs } from '../lib/blogs';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Calendar, Clock, ArrowUpRight, BookOpen } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function BlogSection() {
  const container = useRef<HTMLElement>(null);
  const blogs = getAllBlogs().slice(0, 3); // Display latest 3 articles

  useGSAP(
    () => {
      const elements = container.current?.querySelectorAll('.slide-up-and-fade');
      if (!elements || elements.length === 0) return;

      gsap.fromTo(
        elements,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: container.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    },
    { scope: container }
  );

  return (
    <section id="blog" className="pb-section relative" ref={container}>
      <div className="container">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-6 pb-8 mb-12 border-b border-border/40">
          <div>
            <span className="text-xs font-mono text-primary uppercase tracking-widest block mb-2 slide-up-and-fade">
              // WRITINGS & ARTICLES
            </span>
            <h2 className="text-4xl sm:text-6xl font-anton slide-up-and-fade">
              LATEST <span className="text-primary">THOUGHTS</span>
            </h2>
          </div>

          {/* CTA Button to enter Blog Page */}
          <TransitionLink
            to="/blog"
            className="btn-primary slide-up-and-fade self-start sm:self-auto"
          >
            <span className="btn-bg"></span>
            <span className="btn-text flex items-center gap-2">
              View All Articles <BookOpen className="w-4 h-4" />
            </span>
          </TransitionLink>
        </div>

        {/* Featured Blogs Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <TransitionLink
              key={blog.slug}
              to={`/blog/${blog.slug}`}
              className="group flex flex-col justify-between p-6 rounded-2xl border border-border/40 bg-background-light/30 hover:bg-background-light/60 hover:border-primary/40 transition-all duration-300 shadow-xl slide-up-and-fade"
            >
              <div>
                {/* Meta info & tags */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex flex-wrap gap-1.5">
                    {blog.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-primary/10 text-primary border border-primary/20"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <span className="text-[11px] font-mono text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3 text-primary/70" />
                    {blog.readTime}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-anton text-foreground group-hover:text-primary transition-colors mb-3 line-clamp-2">
                  {blog.title}
                </h3>

                {/* Summary */}
                <p className="text-xs sm:text-sm text-muted-foreground line-clamp-3 leading-relaxed mb-6">
                  {blog.summary}
                </p>
              </div>

              {/* Card Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-border/30 text-xs font-mono text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-primary/70" />
                  {blog.date}
                </span>

                <div className="w-8 h-8 rounded-full border border-border/50 flex items-center justify-center group-hover:bg-primary group-hover:border-primary group-hover:text-background transition-all duration-300">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </TransitionLink>
          ))}
        </div>
      </div>
    </section>
  );
}
