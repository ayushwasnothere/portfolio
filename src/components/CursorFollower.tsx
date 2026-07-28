import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CursorFollower = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    if (!cursor || !cursorDot) return;

    // Use quickSetter for high-performance updates
    const xSetter = gsap.quickSetter(cursor, 'x', 'px');
    const ySetter = gsap.quickSetter(cursor, 'y', 'px');
    const xDotSetter = gsap.quickSetter(cursorDot, 'x', 'px');
    const yDotSetter = gsap.quickSetter(cursorDot, 'y', 'px');

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      // Dot follows instantly
      xDotSetter(mouseX);
      yDotSetter(mouseY);
    };

    // Smooth follow with lerp
    const tick = () => {
      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;
      xSetter(cursorX);
      ySetter(cursorY);
      requestAnimationFrame(tick);
    };

    // Scale up on interactive elements
    const onEnterInteractive = () => {
      gsap.to(cursor, { scale: 2.5, opacity: 0.6, duration: 0.3 });
      gsap.to(cursorDot, { scale: 0, duration: 0.3 });
    };

    const onLeaveInteractive = () => {
      gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.3 });
      gsap.to(cursorDot, { scale: 1, duration: 0.3 });
    };

    window.addEventListener('mousemove', onMouseMove);
    requestAnimationFrame(tick);

    // Attach hover listeners to all interactive elements
    const interactiveElements = document.querySelectorAll(
      'a, button, .project-card, .pill, .contact-link'
    );

    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', onEnterInteractive);
      el.addEventListener('mouseleave', onLeaveInteractive);
    });

    // Hide cursor on touch devices
    const isTouchDevice = 'ontouchstart' in window;
    if (isTouchDevice) {
      cursor.style.display = 'none';
      cursorDot.style.display = 'none';
    }

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', onEnterInteractive);
        el.removeEventListener('mouseleave', onLeaveInteractive);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          border: '1px solid rgba(168, 85, 247, 0.5)',
          pointerEvents: 'none',
          zIndex: 10000,
          transform: 'translate(-50%, -50%)',
          mixBlendMode: 'difference',
          transition: 'width 0.3s, height 0.3s',
        }}
      />
      <div
        ref={cursorDotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          background: '#a855f7',
          pointerEvents: 'none',
          zIndex: 10001,
          transform: 'translate(-50%, -50%)',
        }}
      />
    </>
  );
};

export default CursorFollower;
