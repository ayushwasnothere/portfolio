import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    lastRecordedScrollY?: number;
  }
}

export default function ScrollProgress() {
  const scrollBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollHeight, clientHeight } = document.documentElement;
      const scrollableHeight = scrollHeight - clientHeight;
      if (scrollableHeight <= 0) return;

      const scrollY = window.scrollY;
      window.lastRecordedScrollY = scrollY;

      const scrollProgress = (scrollY / scrollableHeight) * 100;

      if (scrollBarRef.current) {
        scrollBarRef.current.style.transform = `translateY(-${100 - scrollProgress}%)`;
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-[50svh] right-[2%] -translate-y-1/2 w-1.5 h-[100px] rounded-full bg-background-light overflow-hidden z-40 pointer-events-none">
      <div
        className="w-full bg-primary rounded-full h-full"
        ref={scrollBarRef}
      />
    </div>
  );
}
