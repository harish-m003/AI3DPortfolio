import React from "react";
import { Reveal } from "../components/Reveal";
import { SkillSphere } from "./SkillSphere";

export function Skills({ registerSection }) {
  return (
    <section id="skills" ref={(el) => registerSection("skills", el)}>
      <div className="eyebrow mono">03 — SKILLS</div>
      <div className="section-title" style={{ marginBottom: 14 }}>
        What I bring to a build.
      </div>
      <Reveal as="div" className="sphere-hint mono">
        DRAG TO ROTATE — EACH NODE IS A SKILL
      </Reveal>
      <SkillSphere />
    </section>
  );
}
