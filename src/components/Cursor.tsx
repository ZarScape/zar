import { useEffect, useRef } from 'react';

const Cursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const cursorPos = useRef({ x: 0, y: 0 });
  const lastAngle = useRef(0);
  const speed = 0.15;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      if (!cursorRef.current) return;

      const distX = mousePos.current.x - cursorPos.current.x;
      const distY = mousePos.current.y - cursorPos.current.y;

      cursorPos.current.x += distX * speed;
      cursorPos.current.y += distY * speed;

      let angle = lastAngle.current;
      if (Math.abs(distX) > 0.5 || Math.abs(distY) > 0.5) {
        angle = (Math.atan2(distY, distX) * 180) / Math.PI + 90;
        lastAngle.current = angle;
      }

      cursorRef.current.style.transform = `translate3d(${cursorPos.current.x - 15}px, ${cursorPos.current.y - 15}px, 0) rotate(${angle}deg)`;

      requestAnimationFrame(animate);
    };

    const rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return <div id="cursor" ref={cursorRef} className="fixed top-0 left-0 w-[30px] h-[30px] pointer-events-none z-[9999] will-change-transform drop-shadow-[0_0_15px_var(--accent)]" />;
};

export default Cursor;
