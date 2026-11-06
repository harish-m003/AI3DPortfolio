import React from "react";
import { useAmbientParallax } from "../hooks/useAmbientParallax";
import { useMagnetic } from "../hooks/useMagnetic";
import { Link } from "react-router-dom";

export function Hero({ ready, registerSection, onNav }) {
  const parallaxRef = useAmbientParallax(7);
  const btn1 = useMagnetic();
  const btn2 = useMagnetic();
  const btn3 = useMagnetic();

  return (
    <section id="home" ref={(el) => registerSection("home", el)}>
      <div className="hero-inner tilt-parallax" ref={parallaxRef}>
        <div className="eyebrow mono">CREATIVE DEVELOPER  &amp; INTERACTIVE DESIGNS</div>
        <h1 className="hero-title">
          <div className="hero-line">
            <span className={ready ? "in" : ""}>Hi !!</span>
          </div>
          <div className="hero-line">
            <span className={ready ? "in" : ""}>
              i am <em style={{ color: "var(--signal)", fontStyle: "normal" }}>harish.</em>
            </span>
          </div>
        </h1>
        <p className={`hero-sub ${ready ? "in" : ""}`}>
          I design and build interactive, user-friendly web applications using React.js, Next.js, and modern front-end technologies.
        </p>
        <div className={`hero-cta ${ready ? "in" : ""}`}>
          <button ref={btn1} className="btn btn-solid" data-hover onClick={() => onNav("projects")}>
            <span>View Work</span>
          </button>
          <button ref={btn2} className="btn btn-outline" data-hover onClick={() => onNav("contact")}>
            <span>Say Hello</span>
          </button>
          <Link
            ref={btn3}
            className="btn btn-outline"
            data-hover
            to="https://drive.google.com/file/d/1zVQ5b73xiuRxfJ9ICcRsM6rebOWnNaZL/view?usp=drive_link"
          >
            <span>Download Résumé ↓</span>
          </Link>
        </div>
      </div>
      <div className="scroll-cue">
        <span>SCROLL</span>
        <span className="line" />
      </div>
    </section>
  );
}
