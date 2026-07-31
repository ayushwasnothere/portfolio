import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

const GLITCH_CHARS = '#$%&@!*?/<>{}=+~X';
const TARGET_TEXT = 'AYUSH SHAH';

export default function Preloader({ onComplete }: { onComplete?: () => void }) {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const [displayText, setDisplayText] = useState('');
  const [isDone, setIsDone] = useState(false);

  // Matrix character scramble decode effect
  useEffect(() => {
    let iteration = 0;
    const maxIterations = TARGET_TEXT.length * 4;

    const interval = setInterval(() => {
      setDisplayText(() => {
        return TARGET_TEXT.split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < Math.floor(iteration / 4)) {
              return TARGET_TEXT[index];
            }
            return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
          })
          .join('');
      });

      iteration++;

      if (iteration >= maxIterations) {
        setDisplayText(TARGET_TEXT);
        clearInterval(interval);
      }
    }, 35);

    return () => clearInterval(interval);
  }, []);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: { ease: 'power2.inOut' },
        onComplete: () => {
          setIsDone(true);
          if (onComplete) onComplete();
        },
      });

      // 1. Fade in matrix scramble container
      tl.to('.matrix-scramble-container', {
        opacity: 1,
        y: 0,
        duration: 0.3,
      });

      // 2. Wait for text scramble decode to finish (approx 1.2s total)
      tl.to('.matrix-scramble-text', {
        scale: 1.05,
        duration: 0.3,
        delay: 1.1,
      });

      // 3. Glitch text fade out
      tl.to('.matrix-scramble-container', {
        opacity: 0,
        scale: 0.95,
        duration: 0.25,
      });

      // 4. Slide 10 shutter bars down to reveal home section
      tl.to('.preloader-item', {
        y: '100%',
        duration: 0.6,
        stagger: 0.04,
        ease: 'power3.inOut',
      }, '-=0.1');

      // 5. Hide entire preloader overlay
      tl.to(preloaderRef.current, {
        autoAlpha: 0,
        duration: 0.2,
      });
    },
    { scope: preloaderRef }
  );

  if (isDone) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex overflow-hidden pointer-events-none"
      ref={preloaderRef}
    >
      {/* 10 Shutter Curtain Bars */}
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className="preloader-item h-full w-[10%] bg-background-light border-r border-border/20"
        />
      ))}

      {/* Retro Matrix Glitch Scramble Decoding Container */}
      <div className="matrix-scramble-container opacity-0 translate-y-2 absolute inset-0 flex flex-col items-center justify-center p-6 z-10">
        <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground mb-3">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span>INITIALIZING SYSTEM // SECURITY HANDSHAKE</span>
        </div>

        {/* Matrix Scramble Text */}
        <h2 className="matrix-scramble-text font-mono text-3xl sm:text-5xl lg:text-6xl text-primary tracking-[0.35em] font-medium text-center drop-shadow-[0_0_15px_rgba(99,102,241,0.5)]">
          {displayText}
        </h2>

        <p className="mt-4 text-[11px] font-mono text-muted-foreground/60 tracking-widest uppercase">
          [ ACCESS GRANTED ]
        </p>
      </div>
    </div>
  );
}
