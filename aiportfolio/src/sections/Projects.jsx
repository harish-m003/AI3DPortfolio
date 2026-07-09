import React from "react";
import { PROJECTS_DATA } from "../data/content";
import { CubeDecor } from "../components/CubeDecor";
import { ProjectCard } from "./ProjectCard";

export function Projects({ registerSection }) {
  return (
    <section id="projects" ref={(el) => registerSection("projects", el)}>
      <div className="section-head">
        <div>
          <div className="eyebrow mono">02 — Projects</div>
          <div className="section-title">
            A few things I'm proud of.
            <CubeDecor />
          </div>
        </div>
        {/* <div className="mist mono" style={{ color: "var(--mist)", fontSize: 12 }}>
          (swap PROJECTS_DATA for your own case studies)
        </div> */}
      </div>
      <div className="project-grid">
        {PROJECTS_DATA.map((p) => (
          <ProjectCard project={p} key={p.title} />
        ))}
      </div>
    </section>
  );
}
