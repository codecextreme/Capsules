import React, { useEffect, useRef } from "react";
import "./Gaint.css";

export default function GaintText() {
  const text = "Capsules®";
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // add animate class when visible
            entry.target.classList.add("animate");
          } else {
            // remove so it can replay next time
            entry.target.classList.remove("animate");
          }
        });
      },
      { threshold: 0.4 } // adjust how much needs to be visible
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, []);

  return (
    <div className="landing-container1">
      <h1
        className="giant-title"
        aria-hidden="true"
        ref={containerRef}
      >
        {text.split("").map((char, i) => (
          <span
            key={i}
            className={`giant-letter ${char === " " ? "space" : ""} ${
              char === "®" ? "reg" : ""
            }`}
            style={{ animationDelay: `${i * 0.12}s` }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </h1>

      {/* Accessible text for screen readers */}
      <span className="sr-only">{text}</span>
    </div>
  );
}
