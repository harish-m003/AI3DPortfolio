import React from "react";
import { VALUES_DATA } from "../data/content";

// The rotating 3D card carousel next to the About copy.
// Pure CSS animation (orbitCards keyframes) — pauses on hover via :hover.
export function ValueSphere() {
  return (
    <div className="value-stack">
      <div className="value-track">
        {VALUES_DATA.map((v) => (
          <div className="value-card" key={v.mark}>
            <div className="value-mark mono">{v.mark}</div>
            <div className="value-title">{v.title}</div>
            <div className="value-text">{v.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
