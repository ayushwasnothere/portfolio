import { useState, useRef } from 'react';
import { useLenis } from 'lenis/react';
import TransitionLink from '../components/TransitionLink';
import { getAllBlogs } from '../lib/blogs';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Search, ArrowLeft, Clock, Calendar, ArrowUpRight } from 'lucide-react';

export default function BlogList() {
  const containerRef = useRef<HTMLDivElement>(null);
  const blogs = getAllBlogs();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Scroll to top on mount
  const lenis = useLenis();
  if (lenis) {
    lenis.scrollTo(0, { immediate: true });
  }

  // Entrance animations
  useGSAP(
    () => {
      if (!containerRef.current) return;
      const elements = containerRef.current.querySelectorAll('.slide-up-and-fade');
      gsap.fromTo(
        elements,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.06,
          duration: 0.7,
          ease: 'power2.out',
        }
      );
    },
    { scope: containerRef }
  );

  // Filter all unique tags
  const allTags = Array.from(new Set(blogs.flatMap((b) => b.tags)));

  // Filtered blogs
  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = selectedTag ? blog.tags.includes(selectedTag) : true;
    return matchesSearch && matchesTag;
  });

  return (
    <section className="pt-28 pb-20 min-h-screen" ref={containerRef}>
      <div className="container max-w-5xl mx-auto">
        {/* Back Link */}
        <TransitionLink
          to="/"
          className="mb-8 inline-flex gap-2 items-center text-muted-foreground hover:text-foreground transition-colors font-mono text-sm slide-up-and-fade group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 group-hover:text-primary transition-all duration-300" />
          Back to Home
        </TransitionLink>

        {/* Header */}
        <div className="mb-12 pb-8 border-b border-border/40">
          <span className="text-xs font-mono text-primary uppercase tracking-widest block mb-2 slide-up-and-fade">
            // THOUGHTS & ARTICLES
          </span>
          <h1 className="text-5xl sm:text-7xl font-anton slide-up-and-fade mb-4">
            WRITINGS <span className="text-primary">& BLOG</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl slide-up-and-fade">
            Articles on AI agents, robotics, high-throughput backend architecture, and software engineering.
          </p>
        </div>

        {/* Search & Tag Filter Bar */}
        <div className="mb-12 space-y-6 slide-up-and-fade">
          {/* Search Input */}
          <div className="relative max-w-md">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search articles by title or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-background-light/50 border border-border/60 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary transition-all text-sm"
            />
          </div>

          {/* Tag Pills */}
          {allTags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setSelectedTag(null)}
                className={`text-xs px-3.5 py-1.5 rounded-lg border transition-all ${
                  selectedTag === null
                    ? 'bg-primary text-background font-semibold border-primary'
                    : 'bg-background-light/40 border-border/40 text-muted-foreground hover:text-foreground'
                }`}
              >
                All Topics
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                  className={`text-xs px-3.5 py-1.5 rounded-lg border transition-all ${
                    selectedTag === tag
                      ? 'bg-primary text-background font-semibold border-primary'
                      : 'bg-background-light/40 border-border/40 text-muted-foreground hover:text-foreground'
                  }`}
                >
                  #{tag}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Articles List */}
        {filteredBlogs.length === 0 ? (
          <div className="text-center py-16 border border-border/30 rounded-2xl bg-background-light/20">
            <p className="text-muted-foreground text-lg mb-2">No articles found matching your filter.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedTag(null);
              }}
              className="text-sm font-mono text-primary hover:underline"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredBlogs.map((blog) => (
              <TransitionLink
                key={blog.slug}
                to={`/blog/${blog.slug}`}
                className="group block p-6 sm:p-8 rounded-2xl border border-border/40 bg-background-light/30 hover:bg-background-light/60 hover:border-primary/40 transition-all duration-300 shadow-lg slide-up-and-fade"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {blog.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-primary"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Metadata */}
                  <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-primary/70" />
                      {blog.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-primary/70" />
                      {blog.readTime}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-anton text-foreground group-hover:text-primary transition-colors mb-2">
                      {blog.title}
                    </h2>
                    <p className="text-muted-foreground text-sm sm:text-base leading-relaxed line-clamp-2">
                      {blog.summary}
                    </p>
                  </div>

                  <div className="w-10 h-10 rounded-full border border-border/50 flex items-center justify-center group-hover:bg-primary group-hover:border-primary group-hover:text-background transition-all duration-300 shrink-0">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>
              </TransitionLink>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
