import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Smooth springs for cursor position
  const mouseX = useSpring(0, { stiffness: 400, damping: 28 });
  const mouseY = useSpring(0, { stiffness: 400, damping: 28 });

  // Smooth springs for outer aura ring position
  const auraX = useSpring(0, { stiffness: 120, damping: 20 });
  const auraY = useSpring(0, { stiffness: 120, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      auraX.set(e.clientX);
      auraY.set(e.clientY);
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Event delegation for interactive elements
    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const hoverable = target.closest('[data-cursor]') as HTMLElement;

      if (hoverable) {
        const text = hoverable.getAttribute('data-cursor') || '';
        setCursorText(text);
        setIsHovered(true);
      } else {
        setIsHovered(false);
        setCursorText('');
      }
    };

    window.addEventListener('mouseover', handleElementHover);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mouseover', handleElementHover);
    };
  }, [mouseX, mouseY, auraX, auraY, isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Small dot */}
      <motion.div
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-indigo-400 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference hidden md:block"
        style={{ x: mouseX, y: mouseY }}
        animate={{
          scale: isHovered ? 0 : 1,
          opacity: isHovered ? 0 : 1,
        }}
        transition={{ duration: 0.2 }}
      />

      {/* Outer magnetic aura / text tooltip container */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full border border-indigo-500/30 bg-indigo-500/10 backdrop-blur-[2px] hidden md:flex"
        style={{ x: auraX, y: auraY }}
        animate={{
          width: isHovered ? (cursorText ? 80 : 48) : 34,
          height: isHovered ? (cursorText ? 80 : 48) : 34,
          borderColor: isHovered ? 'rgba(99, 102, 241, 0.6)' : 'rgba(99, 102, 241, 0.25)',
          backgroundColor: isHovered ? 'rgba(99, 102, 241, 0.18)' : 'rgba(99, 102, 241, 0.05)',
        }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      >
        {cursorText && (
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="font-mono text-[10px] font-bold uppercase tracking-widest text-white text-center px-1"
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>
    </>
  );
};
