import React from "react";
import { Reveal } from "../components/Reveal";
import { ValueSphere } from "./ValueSphere";

export function About({ registerSection }) {
  return (
    <section id="about" ref={(el) => registerSection("about", el)}>
      <div className="about-grid">
        <div>
          <div className="eyebrow mono">01 — ABOUT</div>
          <div className="about-copy">
            <Reveal as="p">
              I'm <strong>Front-End Developer</strong>  creates interactive, responsive, and component-based web applications using React.js, Next.js, and Supabase. I have hands-on experience building modern web applications, integrating REST APIs, and implementing authentication systems.
            </Reveal>
            <Reveal as="p">
              I enjoy turning designs into clean, reusable, and production-ready code while creating intuitive user experiences. I'm comfortable using AI-assisted development tools to accelerate delivery while maintaining full ownership and understanding of the codebase.
            </Reveal>
            <Reveal as="p">
              I'm excited to contribute to a collaborative team while continuing to grow as a Front-End Developer.
            </Reveal>
          </div>
        </div>
        <div>
          <ValueSphere />
        </div>
      </div>
    </section>
  );
}
