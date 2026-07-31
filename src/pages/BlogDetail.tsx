import { useParams } from 'react-router-dom';
import { useRef, useState } from 'react';
import { useLenis } from 'lenis/react';
import TransitionLink from '../components/TransitionLink';
import { getBlogBySlug } from '../lib/blogs';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ArrowLeft, Calendar, Clock, Share2, Check, ExternalLink, Copy, Terminal } from 'lucide-react';

export default function BlogDetail() {
  const { slug } = useParams<{ slug: string }>();
  const containerRef = useRef<HTMLDivElement>(null);
  const blog = getBlogBySlug(slug || '');
  const [copied, setCopied] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

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
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.05,
          duration: 0.7,
          ease: 'power2.out',
        }
      );
    },
    { scope: containerRef, dependencies: [blog] }
  );

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyCode = (codeText: string) => {
    navigator.clipboard.writeText(codeText);
    setCopiedCode(codeText);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  if (!blog) {
    return (
      <div className="container min-h-screen flex items-center justify-center pt-24">
        <div className="text-center">
          <h1 className="font-anton text-6xl mb-4">404</h1>
          <p className="text-muted-foreground text-lg mb-8">Article not found.</p>
          <TransitionLink to="/blog" className="btn-primary">
            <span className="btn-bg"></span>
            <span className="btn-text">Back to Blogs</span>
          </TransitionLink>
        </div>
      </div>
    );
  }

  return (
    <article className="pt-28 pb-24 min-h-screen" ref={containerRef}>
      <div className="container max-w-4xl mx-auto">
        {/* Back Link */}
        <TransitionLink
          to="/blog"
          className="mb-10 inline-flex gap-2 items-center text-muted-foreground hover:text-foreground transition-colors font-mono text-sm slide-up-and-fade group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 group-hover:text-primary transition-all duration-300" />
          Back to all blogs
        </TransitionLink>

        {/* Article Header */}
        <header className="mb-12 pb-8 border-b border-border/40">
          <div className="flex flex-wrap gap-2 mb-4 slide-up-and-fade">
            {blog.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-mono px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary"
              >
                #{tag}
              </span>
            ))}
          </div>

          <h1 className="text-4xl sm:text-6xl font-anton text-foreground leading-tight mb-6 slide-up-and-fade">
            {blog.title}
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-muted-foreground mb-8 slide-up-and-fade">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-primary" />
                {blog.date}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-primary" />
                {blog.readTime}
              </span>
            </div>

            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg border border-border/60 hover:border-primary hover:text-primary transition-all text-xs bg-background-light/40"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-green-400" />
                  Copied Link!
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  Share Post
                </>
              )}
            </button>
          </div>

          {/* Optional Cover Image */}
          {blog.coverImage && (
            <div className="slide-up-and-fade relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-border/50 bg-background-light/60 shadow-2xl mb-8">
              <img
                src={blog.coverImage}
                alt={blog.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </header>

        {/* High-End Article Body Typography & Custom Renderer */}
        <div className="slide-up-and-fade space-y-6 text-foreground/90 font-normal">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              // Headings
              h1: ({ children }) => (
                <h1 className="text-3xl sm:text-5xl font-anton text-foreground tracking-wide mt-12 mb-6 border-b border-border/40 pb-4">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-2xl sm:text-4xl font-anton text-foreground tracking-wide mt-12 mb-5 flex items-center gap-3">
                  <span className="w-2 h-6 rounded-full bg-primary inline-block" />
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-xl sm:text-2xl font-mono text-primary font-semibold mt-8 mb-4">
                  {children}
                </h3>
              ),

              // Paragraphs
              p: ({ children }) => (
                <p className="text-base sm:text-lg text-foreground/85 leading-relaxed sm:leading-[1.85] my-6 font-sans">
                  {children}
                </p>
              ),

              // Code Blocks with Terminal Window Chrome & Copy Button
              code: ({ className, children, ...props }) => {
                const match = /language-(\w+)/.exec(className || '');
                const isInline = !match && !String(children).includes('\n');
                const codeString = String(children).replace(/\n$/, '');

                if (isInline) {
                  return (
                    <code
                      className="font-mono text-xs sm:text-sm px-2 py-0.5 rounded-md bg-primary/10 text-primary border border-primary/20"
                      {...props}
                    >
                      {children}
                    </code>
                  );
                }

                return (
                  <div className="my-8 rounded-2xl overflow-hidden border border-border/60 bg-[#0b0d14] shadow-2xl">
                    {/* Header bar */}
                    <div className="flex items-center justify-between px-4 py-2.5 bg-background-light/60 border-b border-border/40 text-xs font-mono text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Terminal className="w-3.5 h-3.5 text-primary" />
                        <span>{match ? match[1].toUpperCase() : 'CODE'}</span>
                      </div>
                      <button
                        onClick={() => handleCopyCode(codeString)}
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 hover:text-foreground transition-all"
                      >
                        {copiedCode === codeString ? (
                          <>
                            <Check className="w-3 h-3 text-green-400" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                    {/* Code Container */}
                    <pre className="p-5 overflow-x-auto text-xs sm:text-sm font-mono text-emerald-300 leading-relaxed">
                      <code>{children}</code>
                    </pre>
                  </div>
                );
              },

              // Blockquotes
              blockquote: ({ children }) => (
                <blockquote className="my-8 p-6 rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-l-4 border-primary text-foreground/90 text-base sm:text-lg italic shadow-inner">
                  {children}
                </blockquote>
              ),

              // Lists
              ul: ({ children }) => <ul className="my-6 space-y-3 pl-2">{children}</ul>,
              ol: ({ children }) => <ol className="my-6 space-y-3 list-decimal pl-6 text-primary">{children}</ol>,
              li: ({ children }) => (
                <li className="flex items-start gap-3 text-base sm:text-lg text-foreground/85">
                  <span className="w-2 h-2 rounded-full bg-primary mt-2.5 shrink-0" />
                  <div>{children}</div>
                </li>
              ),

              // Horizontal Rule
              hr: () => (
                <hr className="my-12 border-0 h-[1px] bg-gradient-to-r from-transparent via-border to-transparent" />
              ),

              // Links
              a: ({ href, children }) => (
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary underline underline-offset-4 font-medium hover:text-primary/80 transition-colors"
                >
                  {children}
                </a>
              ),

              // Images
              img: ({ src, alt }) => (
                <figure className="my-8 group relative rounded-2xl overflow-hidden border border-border/50 bg-background-light/60 shadow-2xl">
                  <img
                    src={src}
                    alt={alt || 'Blog Image'}
                    className="w-full h-auto max-h-[550px] object-cover transition-transform duration-300 group-hover:scale-[1.01]"
                  />
                  {alt && (
                    <figcaption className="p-3 text-center text-xs font-mono text-muted-foreground bg-background-light/80 border-t border-border/40">
                      {alt}
                    </figcaption>
                  )}
                  {src && (
                    <a
                      href={src}
                      target="_blank"
                      rel="noreferrer"
                      className="absolute top-4 right-4 bg-background/80 text-foreground p-2.5 rounded-xl border border-white/10 opacity-0 group-hover:opacity-100 hover:bg-primary hover:text-background transition-all shadow-md"
                      title="View Full Resolution Image"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </figure>
              ),
            }}
          >
            {blog.content}
          </ReactMarkdown>
        </div>
      </div>
    </article>
  );
}
