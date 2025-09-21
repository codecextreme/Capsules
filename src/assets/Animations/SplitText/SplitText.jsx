// src/assets/Animations/SplitText/SplitText.jsx
import React, { useLayoutEffect, useRef, memo } from "react";
import { gsap } from "gsap";

function SplitText({
  text,
  className = "",
  duration = 0.8,
  stagger = 0.05,
  ease = "power3.out",
  from = { y: "100%", opacity: 0 },
  to = { y: "0%", opacity: 1 },
  threshold = 0.2,
  rootMargin = "0px 0px -10% 0px",
}) {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const spans = el.querySelectorAll("span.split-char");

    // 1) Set initial state BEFORE paint to avoid the “flash then hide” issue
    gsap.set(spans, { ...from });

    // 2) Observe and animate once when in view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.to(spans, {
              ...to,
              duration,
              ease,
              stagger,
              overwrite: "auto",
              // Keep final state (no reverse/toggle)
            });
            observer.disconnect();
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      gsap.killTweensOf(spans);
    };
  }, [
    text,
    duration,
    stagger,
    ease,
    threshold,
    rootMargin,
    // stringify objects so dependency array is stable
    JSON.stringify(from),
    JSON.stringify(to),
  ]);

  return (
    <span ref={containerRef} className={className} style={{ display: "inline-block" }}>
      {text.split("").map((ch, i) => (
        <span key={i} className="split-char" style={{ display: "inline-block" }}>
          {ch === " " ? "\u00A0" : ch}
        </span>
      ))}
    </span>
  );
}

export default memo(SplitText);
