// GSAPScrollSlider.jsx
import React, { useRef, useLayoutEffect } from "react";
import "./SmoothScroll.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import img1 from "../../Media/Images/cap1.png";
import img2 from "../../Media/Images/cap2.png";
import img3 from "../../Media/Images/cap3.png";

gsap.registerPlugin(ScrollTrigger);

const images = [img1, img2, img3];

const texts = [
  {
    title: "Enjoy the view through—the wide panoramic glass window",
    desc: "Get closer to the desert nature than ever before and admire this unique, breathtaking landscape.",
  },
  {
    title: "Experience the tranquility of untouched landscapes",
    desc: "Stay surrounded by nature with a view that constantly transforms with the sunlight.",
  },
  {
    title: "Modern comfort meets timeless wilderness",
    desc: "Relax in futuristic spaces while admiring ancient sceneries outside your window.",
  },
];

export default function GSAPScrollSlider() {
  const containerRef = useRef(null);
  const leftTrackRef = useRef(null);
  const imgRefs = useRef([]);

  const setImgRef = (el, i) => {
    imgRefs.current[i] = el;
  };

  useLayoutEffect(() => {
    const total = images.length;
    if (!containerRef.current) return;

    // init positions
    imgRefs.current.forEach((el, i) => {
      gsap.set(el, {
        y: i === 0 ? "0%" : "100%",
        x: "0%",
        zIndex: total - i,
      });
    });
    gsap.set(leftTrackRef.current, { y: "0%" });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=" + (total - 1) * window.innerHeight,
        scrub: true,
        pin: true,
        anticipatePin: 1,
        markers: false, // set true for debugging
      },
    });

    for (let i = 0; i < total - 1; i++) {
      tl.to(imgRefs.current[i], { x: "-100%", duration: 1, ease: "power2.inOut" });
      tl.to(imgRefs.current[i + 1], { y: "0%", duration: 1, ease: "power2.inOut" }, "<");
      tl.to(leftTrackRef.current, { y: `-${(i + 1) * 100}vh`, duration: 1, ease: "power2.inOut" }, "<");
    }

    ScrollTrigger.refresh();

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section className="smooth-wrapper"> {/* ✅ wrapper to isolate */}
      <div className="gsap-slider" ref={containerRef}>
        <div className="gsap-inner">
          <div className="left-side">
            <div className="left-track" ref={leftTrackRef}>
              {texts.map((t, i) => (
                <div className="left-slide" key={i}>
                  <div className="left-content">
                    <h1>{t.title}</h1>
                    <p>{t.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="right-side">
            {images.map((src, i) => (
              <div
                key={i}
                className="right-image"
                ref={(el) => setImgRef(el, i)}
                style={{ backgroundImage: `url(${src})` }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
