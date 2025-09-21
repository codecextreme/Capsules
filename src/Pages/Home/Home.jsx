import React, { useEffect, useRef } from "react";
import "./Home.css";
import LandingPage from "../../Components/LandingPage/LandingPage";
import Lenis from "@studio-freight/lenis";
import ScrollZoom from "../../assets/Animations/ScrollZoom/ScrollZoom";
import ScrollReveal from "../../assets/Animations/ScrollReveal/ScrollReveal";
import TwoPic from "../../Components/TwoPic/TwoPic";
import Pill from "../../Components/TextPill/Pill";
import Footer from '../../Components/Footer/Footer'
import Stats from '../../Components/Stats/Stats'
import Cap from '../../Components/HomeScreenCapsules/Cap'

export default function Home() {
  const descriptionRef1 = useRef(null);
  const overlayRef1 = useRef(null);

  const topTextRef = useRef(null);
  const bottomTextRef = useRef(null);
  const textRevealRef = useRef(null);

  
   useEffect(() => {
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });

  // expose globally so ScrollTrigger can use it
  window.lenis = lenis;

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  return () => {
    lenis.destroy();
    delete window.lenis;
  };
}, []);


useEffect(() => {
  // --- overlay update (same idea as before) ---
  const updateOverlay = (container, overlay) => {
    if (!container || !overlay) return;
    const rect = container.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    let progress = 1 - Math.max(0, Math.min(1, rect.top / windowHeight));
    overlay.style.height = `${100 - progress * 100}%`;
  };

  const handleScrollOverlay = () => {
    updateOverlay(descriptionRef1.current, overlayRef1.current);
  };

  window.addEventListener("scroll", handleScrollOverlay, { passive: true });
  window.addEventListener("resize", handleScrollOverlay);
  handleScrollOverlay();

  // --- text reveal using IntersectionObserver (more robust than scroll-only) ---
  const el = textRevealRef.current;
  const topNode = topTextRef.current;
  const bottomNode = bottomTextRef.current;

  if (!el || !topNode || !bottomNode) {
    // cleanup only overlay listeners if text elements aren't present
    return () => {
      window.removeEventListener("scroll", handleScrollOverlay);
      window.removeEventListener("resize", handleScrollOverlay);
    };
  }

  let rafId = null;

  const updateFromEntry = (entry) => {
    const rect = entry.boundingClientRect;
    const windowHeight = window.innerHeight;
    const centerY = windowHeight / 2;
    const elementCenter = rect.top + rect.height / 2;
    const absDist = Math.abs(centerY - elementCenter);

    // tuning values:
    const holdZone = Math.max(rect.height * 0.7, windowHeight * 0.18); // center "safe" zone radius
    const maxDist = windowHeight / 2 + rect.height / 2; // distance where center is fully off-screen
    const edgeThreshold = 0.12; // intersectionRatio threshold to consider "leaving" the screen

    let maskPercent;

    // if element not visible or barely visible -> fully hidden
    if (!entry.isIntersecting || entry.intersectionRatio <= edgeThreshold) {
      maskPercent = 100;
    } else if (absDist <= holdZone) {
      // inside center hold-zone -> fully revealed
      maskPercent = 0;
    } else {
      // smooth falloff from holdZone -> maxDist
      const denom = Math.max(0.0001, maxDist - holdZone);
      const norm = Math.min(Math.max((absDist - holdZone) / denom, 0), 1); // 0..1
      const progress = 1 - norm; // 1 -> 0
      maskPercent = 100 - progress * 100; // 100..0
    }

    // Apply to CSS custom property
    topNode.style.setProperty("--mask-height", `${maskPercent}%`);
    bottomNode.style.setProperty("--mask-height", `${maskPercent}%`);
  };

  const intersectionCallback = (entries) => {
    entries.forEach((entry) => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => updateFromEntry(entry));
    });
  };

  const thresholds = Array.from({ length: 101 }, (_, i) => i / 100);
  const observer = new IntersectionObserver(intersectionCallback, {
    threshold: thresholds,
  });

  observer.observe(el);

  // initial set based on current bounds (helps on page load)
  updateFromEntry({
    isIntersecting: true,
    intersectionRatio: 1,
    boundingClientRect: el.getBoundingClientRect(),
  });

  return () => {
    observer.disconnect();
    if (rafId) cancelAnimationFrame(rafId);
    window.removeEventListener("scroll", handleScrollOverlay);
    window.removeEventListener("resize", handleScrollOverlay);
  };
}, []);



  return (
    <div className="home">
      <div className="landing-page">
        <LandingPage />
      </div>

      <div className="description" ref={descriptionRef1}>
        <div className="overlay" ref={overlayRef1} />
        <h1>
          Welcome to a world of wild California desert with Capsules®, where you
          will discover exquisite nature observing it from capsule houses,
          nestled in one of the most breathtaking destinations in the United
          States.
        </h1>
      </div>

      <TwoPic />

      {/* Split text reveal */}
      <div className="text-reveal" ref={textRevealRef}>
        <div className="text-line top" ref={topTextRef}>
          <h1>Choose the one</h1>
        </div>
        <div className="text-line bottom" ref={bottomTextRef}>
          <h1>you like best</h1>
        </div>
      </div>
      <Cap/>

      
      <ScrollReveal />

      <div className="description2">
        <p class="hover-text">
          Our Capsules® are located <br />
          near Los Angeles with easy
        </p>
        <p class="hover-text pill-effect">
          <Pill>access by road. </Pill>
        </p>
      </div>

      {/* <div class="marquee">
        <div class="marquee-content">
          <span>Why Capsules®?* Why Capsules®?* Why Capsules®?* Why Capsules®?* </span>
          <span>Why Capsules®?* Why Capsules®?* Why Capsules®?* Why Capsules®?*</span>
        </div>
      </div> */}
      <ScrollZoom />
      
      <Stats/>
      <Footer/>

    </div>
  );
}
