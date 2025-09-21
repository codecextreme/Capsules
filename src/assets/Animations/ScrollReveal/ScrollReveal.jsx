import React, { useEffect, useRef } from "react";
import "./ScrollReveal.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalSlider() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const sections = gsap.utils.toArray(".slide");

    gsap.to(sections, {
      xPercent: -93 * (sections.length - 1), // move slides left
      ease: "none",
      scrollTrigger: {
        trigger: container,
        pin: true, // stop vertical scroll
        scrub: 1, // smooth scroll
        snap: 1 / (sections.length - 1), // snap per slide
        end: () => "+=" + container.offsetWidth, // scroll distance
      },
    });
  }, []);

  return (
    <div className="slider-container" ref={containerRef}>
      <section className="slide slide1">
        <div className="top-content">
          <p>
            Buggy tours <br />
            in the desert
          </p>
          <div className="easy">Easy</div>
        </div>
        <div className="bottom-content">
          <p>
            Explore the terrein on guided buggy tour that takes <br />
            you through the dessert's vast and open landscapes.
          </p>
          <div className="counts">
            <div className="count1">01</div>
            <div className="count2">03</div>
          </div>
        </div>
      </section>

      <section className="slide slide2">
         <div className="top-content">
          <p>
            Breathtaking<br />
            desert hikes
          </p>
          <div className="easy">Medium</div>
        </div>
        <div className="bottom-content">
          <p>
            Explore the terrein on guided buggy tour that takes <br />
            you through the dessert's vast and open landscapes.
          </p>
          <div className="counts">
            <div className="count1">02</div>
            <div className="count2">03</div>
          </div>
        </div>
      </section>

      <section className="slide slide3">
         <div className="top-content">
          <p>
            Exciting group<br />
            rock climbing
          </p>
          <div className="easy">Hard</div>
        </div>
        <div className="bottom-content">
          <p>
            Explore the terrein on guided buggy tour that takes <br />
            you through the dessert's vast and open landscapes.
          </p>
          <div className="counts">
            <div className="count1">03</div>
            <div className="count2">03</div>
          </div>
        </div>
      </section>
    </div>
  );
}
