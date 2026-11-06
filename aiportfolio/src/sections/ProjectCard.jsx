import React from "react";
import { Reveal } from "../components/Reveal";
import { useTilt } from "../hooks/useTilt";
import { Link } from "react-router-dom";

export function ProjectCard({ project }) {
  const tiltRef = useTilt({ maxTiltX: 6, maxTiltY: 8, perspective: 900, lift: 3 });

  return (
    <Reveal variant="deal" className="p-card" data-hover>
      <div ref={tiltRef} style={{ width: "100%", height: "100%" }}>
        <div className="p-top">
          <span className="p-tag mono">{project.tag}</span>
          <span className="p-year mono">{project.year}</span>
        </div>
        <div className="p-title">{project.title}</div>
        <p className="p-desc">{project.desc}</p>
        <div className="p-stack">
          {project.stack.map((s) => (
            <span key={s}>{s}</span>
          ))}
        </div>
        <div className="p-links">
          <Link className="p-link" to={project.github} target="_blank" rel="noopener noreferrer" data-hover>
            <span>GitHub</span>
            <span className="arrow">↗</span>
          </Link>
          <Link className="p-link" to={project.demo} target="_blank" rel="noopener noreferrer" data-hover>
            <span>Live Demo</span>
            <span className="arrow">→</span>
          </Link>
        </div>
      </div>
    </Reveal>
  );
}
