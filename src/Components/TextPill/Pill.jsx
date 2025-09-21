import React, { useRef, useEffect } from "react";
import "./Pill.css";


const HoverPill = ({ children }) => {
  const containerRef = useRef(null);
  const pillRef = useRef(null);
  const rafRef = useRef(null);

  // math state stored in refs to avoid re-renders
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const visible = useRef(false);

  // tweak easing (0.05 - slower & smoother, 0.25 - snappier)
  const ease = 0.3;

  useEffect(() => {
    // animation loop
    const tick = () => {
      // lerp toward the target
      current.current.x += (target.current.x - current.current.x) * ease;
      current.current.y += (target.current.y - current.current.y) * ease;

      if (pillRef.current) {
        // translate3d is GPU-friendly -> smooth
        pillRef.current.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0) translate(-50%, -50%)`;
        // show/hide via opacity (only change style here for performance)
        pillRef.current.style.opacity = visible.current ? "1" : "0";
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // update target coords relative to the inline container
  const handleMouseMove = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    target.current.x = e.clientX - rect.left;
    target.current.y = e.clientY - rect.top;
  };

  const handleEnter = (e) => {
    visible.current = true;
    // set immediate target so pill appears near pointer
    handleMouseMove(e);
  };

  const handleLeave = () => {
    visible.current = false;
  };

  return (
    <span
      className="hover-target"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {children}

      {/* pill is absolute inside the span, left/top at 0 and we move it with transform */}
      <span className="hover-pill" ref={pillRef} aria-hidden="true">
        <span className="pill-text">Show the Map</span>
        <span className="pill-icon">↗</span>
      </span>
    </span>
  );
};

export default HoverPill;
