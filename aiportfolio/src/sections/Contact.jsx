import React from "react";
import { Reveal } from "../components/Reveal";
import { useAmbientParallax } from "../hooks/useAmbientParallax";
import { ContactForm } from "./ContactForm";
import {Link} from "react-router-dom";


export function Contact({ registerSection }) {
  const parallaxRef = useAmbientParallax(5);

  return (
    <section id="contact" ref={(el) => registerSection("contact", el)}>
      <div className="contact-grid">
        <div>
          <div className="eyebrow mono">04 — CONTACT</div>
          <Reveal as="div" className="contact-big tilt-parallax" ref={parallaxRef}>
            I'm always open to discussing new projects. <a href="mailto:harishhmohann@gmail.com">harishhmohann@gmail.com</a> — or opportunities to be part of your vision.
          </Reveal>
          <Reveal as="div" className="social-row">
            
            <Link to="https://github.com/harish-m003" data-hover>GITHUB</Link>
            <Link to="https://www.linkedin.com/in/harishm003/" data-hover>LINKEDIN</Link>
            <Link to="https://www.instagram.com/" data-hover>INSTAGRAM</Link>
            <Link to="tel:+916385355128" data-hover>+91 63853 55128</Link>
          </Reveal>
        </div>
        <div>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
