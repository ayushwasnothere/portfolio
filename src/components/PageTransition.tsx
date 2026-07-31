import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function PageTransition() {
  const location = useLocation();
  const curtainRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  // Set initial position out of view above screen
  useEffect(() => {
    if (curtainRef.current) {
      gsap.set(curtainRef.current, { yPercent: -100 });
    }
  }, []);

  useEffect(() => {
    // Skip initial page load so Preloader handles site opening cleanly
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (!curtainRef.current) return;

    // Refresh ScrollTrigger positions whenever route changes
    ScrollTrigger.refresh();

    // Reset curtain position to bottom before sweeping
    gsap.set(curtainRef.current, { yPercent: 100 });

    // Sweep up from bottom (100%), cover screen (0%), slide out to top (-100%)
    const tl = gsap.timeline();
    tl.to(curtainRef.current, {
      yPercent: 0,
      duration: 0.35,
      ease: 'power2.inOut',
    }).to(curtainRef.current, {
      yPercent: -100,
      duration: 0.35,
      ease: 'power2.inOut',
      delay: 0.1,
    });
  }, [location.pathname]);

  return (
    <div
      ref={curtainRef}
      className="page-transition-curtain fixed inset-0 z-[90] bg-primary pointer-events-none"
      style={{ transform: 'translateY(-100%)' }}
    />
  );
}
