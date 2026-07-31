import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // Smoothly animate scale whenever isHovering state changes
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    gsap.to(cursor, {
      scale: isHovering ? 2.8 : 1,
      duration: 0.25,
      ease: 'power2.out',
    });
  }, [isHovering]);

  useEffect(() => {
    // Check if mobile
    if (window.innerWidth < 768 || 'ontouchstart' in window) {
      setIsMobile(true);
      return;
    }

    const cursor = cursorRef.current;
    if (!cursor) return;

    const isInteractive = (el: HTMLElement | null): boolean => {
      if (!el) return false;

      const tagName = el.tagName ? el.tagName.toLowerCase() : '';
      if (
        tagName === 'a' ||
        tagName === 'button' ||
        tagName === 'input' ||
        tagName === 'select' ||
        el.getAttribute('role') === 'button' ||
        Boolean(el.closest('a')) ||
        Boolean(el.closest('button')) ||
        Boolean(el.closest('[data-cursor-hover]')) ||
        Boolean(el.closest('.cursor-pointer'))
      ) {
        return true;
      }

      try {
        const computedCursor = window.getComputedStyle(el).cursor;
        if (computedCursor === 'pointer') return true;
      } catch {
        // ignore
      }

      return false;
    };

    // Smooth mouse follower & continuous hover state detection
    const onMouseMove = (e: MouseEvent) => {
      if (cursor.style.opacity === '0' || cursor.style.opacity === '') {
        gsap.to(cursor, { opacity: 1, duration: 0.3 });
      }

      gsap.to(cursor, {
        x: e.clientX - 10,
        y: e.clientY - 10,
        duration: 0.15,
        ease: 'power2.out',
      });

      const target = e.target as HTMLElement | null;
      const hovered = isInteractive(target);
      setIsHovering(hovered);
    };

    const handleMouseLeave = () => {
      gsap.to(cursor, { opacity: 0, duration: 0.3 });
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  if (isMobile) return null;

  return (
    <div
      ref={cursorRef}
      className={`custom-cursor ${isHovering ? 'hovering' : ''}`}
      style={{ opacity: 0 }}
    />
  );
};

export default CustomCursor;
