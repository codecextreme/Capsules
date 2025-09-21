import React, { useEffect, useState, useRef } from "react";
import "./LandingPage.css";
import { FiArrowUpRight } from "react-icons/fi";
import gsap from "gsap";
import {
  FaInstagram,
  FaLinkedin,
  FaDribbble,
  FaBehance,
} from "react-icons/fa";

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const menuLinksRef = useRef([]);
  const circleIconsRef = useRef([]);
  const rightMenuRef = useRef(null);

  useEffect(() => {
    const heroBg = document.querySelector(".hero-bg");
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const scale = 1 + scrollY / 7000;
      if (heroBg) {
        heroBg.style.transform = `scale(${scale})`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("no-scroll", menuOpen);
  }, [menuOpen]);

  // Animate menu links + circles + right panel
  useEffect(() => {
    const allTargets = [...menuLinksRef.current, ...circleIconsRef.current];

    if (menuOpen && !closing) {
      // animate IN
      gsap.fromTo(
        allTargets,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: "power4.out",
        }
      );

      gsap.fromTo(
        rightMenuRef.current,
        { x: "100%", opacity: 0 },
        {
          x: "0%",
          opacity: 1,
          duration: 0.8,
          ease: "power4.out",
          delay: 0.6,
        }
      );
    }

    if (closing) {
      // animate OUT
      gsap.to(allTargets, {
        y: 100,
        opacity: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: "power4.in",
      });

      gsap.to(rightMenuRef.current, {
        x: "100%",
        opacity: 0,
        duration: 0.6,
        ease: "power4.in",
      });
    }
  }, [menuOpen, closing]);

  const handleMenuToggle = () => {
    if (menuOpen) {
      // Closing process
      setClosing(true);
      setTimeout(() => {
        setMenuOpen(false);
        setClosing(false);
      }, 1000); // wait 1s before actually closing
    } else {
      // Open instantly
      setMenuOpen(true);
    }
  };

  const menuItems = [
    "Welcome",
    "Introduction",
    "Houses",
    "Why Capsules",
    "Activities",
    "Feedback",
  ];

  return (
    <div className="landing">
      <section className="hero">
        <div className="hero-bg"></div>

        <div style={{ display: "flex" }}>
          <h1 className="hero-title">
            Capsules
            <span
              style={{
                fontSize: 96,
                marginTop: 94,
                marginLeft: 10,
                position: "absolute",
              }}
            >
              ®
            </span>
          </h1>

          <button className="reserve-btn">
            <div className="reserve-text">
              <span className="reserve-word first">Reserve</span>
              <span className="reserve-word second">Coming Soon</span>
            </div>
            <div className="reserve-icon">
              <FiArrowUpRight size={25} color="white" />
            </div>
          </button>
        </div>

        <p className="hero-tagline">
          Closer to <br /> Nature — Closer <br /> to Yourself
        </p>

        {/* Menu Button */}
        <button
          className={`menu-btn ${menuOpen ? "open" : ""}`}
          onClick={handleMenuToggle}
        >
          <span className="menu-label">Menu</span>
          <div className="menu-icon-wrapper">
            <div className="menu-icon">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </button>

        {/* Background overlay */}
        {(menuOpen || closing) && <div className="overlay" />}

        {/* Expanding Menu */}
        <div className={`expanding-menu ${menuOpen || closing ? "open" : ""}`}>
          {/* Left Side */}
          <div className="left-menu">
            <ul className="menu-links">
              {menuItems.map((text, i) => (
                <li key={i} ref={(el) => (menuLinksRef.current[i] = el)}>
                  {text}
                </li>
              ))}
            </ul>
             <div className="circle-p">
            <div className="circles1">
              <div
                className="circle1"
                ref={(el) => (circleIconsRef.current[0] = el)}
              >
                <FaLinkedin size={18} />
              </div>
              <div
                className="circle1"
                ref={(el) => (circleIconsRef.current[1] = el)}
              >
                <FaInstagram size={18} />
              </div>
              <div
                className="circle1"
                ref={(el) => (circleIconsRef.current[2] = el)}
              >
                <FaDribbble size={18} />
              </div>
              <div
                className="circle1"
                ref={(el) => (circleIconsRef.current[3] = el)}
              >
                <FaBehance size={18} />
              </div>
            </div>
            <p>
This website is just the concept work <br />
done by—Fahad to showcase our capabilities.</p>
            </div>
          </div>

          {/* Right Side */}
          <div className="right-menu" ref={rightMenuRef}>
            <div className="marquee">
              <span>
                Capsules® — Capsules® — Capsules® — Capsules® — Capsules®
              </span>
            </div>
          </div>
        </div>

        <p className="hero-desc">
          Spend unforgettable and remarkable time in the Californian desert with
          — Capsules.
        </p>
      </section>
    </div>
  );
}
