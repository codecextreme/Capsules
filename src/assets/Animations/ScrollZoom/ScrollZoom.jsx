import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
import Lenis from "@studio-freight/lenis";
import "./ScrollZoom.css";
import img from "../../Media/Images/cap2.png";

gsap.registerPlugin(ScrollTrigger, CustomEase);

const ScrollAnimation = () => {
  const videoContainerRef = useRef(null);
  const videoRef = useRef(null);
  const videoOverlayRef = useRef(null);
  const overlayCaptionRef = useRef(null);
  const overlayContentRef = useRef(null);
  const movingTextRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));

    // Moving background text animation
    gsap.to(movingTextRef.current, {
      x: "-100%",
      repeat: -1,
      duration: 120,
      ease: "linear",
    });

    const overlay = document.createElement("div");
    Object.assign(overlay.style, {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0,0,0,0)",
      pointerEvents: "none",
      zIndex: 1,
    });
    videoContainerRef.current?.appendChild(overlay);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".scroll-container",
        start: "top top",
        end: "+=300%",
        scrub: true,
        pin: true,
        anticipatePin: 1,
      },
    });

    tl.fromTo(
      videoContainerRef.current,
      { width: "45vw", height: "40vh", borderRadius: "100px", zIndex: 2 },
      {
        y: 0,
        width: "99%",
        height: "98vh",
        borderRadius: 40,
        ease: "power6.out",
        zIndex: 2, // keep image above moving text
      },
      0
    )
      .to(videoRef.current, { scale: 1.15, ease: "power6.out" }, 0)
      .to(overlay, { backgroundColor: "rgba(0,0,0,0.4)" }, 0)
      .to(
        videoOverlayRef.current,
        {
          clipPath: "inset(0% 0 0 0)",
          backdropFilter: "blur(8px)",
          ease: "power6.out",
        },
        0.9
      )
      .to(
        overlayCaptionRef.current,
        {
          y: 0,
          opacity: 1,
          ease: "power6.out",
        },
        0.9
      )
      .to(
        overlayContentRef.current,
        {
          filter: "blur(0px)",
          scale: 1,
          opacity: 1,
          ease: "power3.out",
        },
        0.6
      );

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="scroll-animation" style={{ position: "relative" }}>
      <div className="scroll-container" style={{ position: "relative" }}>
        {/* Moving background text behind video */}
        <div className="moving-text" ref={movingTextRef}>
          <h1>
            Capsules® Capsules® Capsules® Capsules® Capsules® Capsules®
            Capsules® Capsules® Capsules®

            
          </h1>
        </div>

        <div className="video-wrapper">
          <div
            id="video-container"
            ref={videoContainerRef}
            style={{ position: "relative" }}
          >
            <img
              ref={videoRef}
              src={img}
              alt="Descriptive text for accessibility"
              style={{
                objectFit: "cover",
                width: "100%",
                height: "100%",
              }}
            />
            <div className="video-overlay" ref={videoOverlayRef}>
              <div className="caption" ref={overlayCaptionRef}>
                THOUGHT VESSEL 01
              </div>
              <div className="content" ref={overlayContentRef}>
                <h2>Clarity in Silence</h2>
                <p>
                  Design emerges from emptiness. Mental clarity precedes visual
                  harmony.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollAnimation;
