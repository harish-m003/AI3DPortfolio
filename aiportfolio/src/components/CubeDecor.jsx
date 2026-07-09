import React from "react";

// Small spinning cube used next to the "Selected Work" heading.
export function CubeDecor() {
  return (
    <span className="cube-decor">
      <span className="cube">
        <span className="face front" />
        <span className="face back" />
        <span className="face right" />
        <span className="face left" />
        <span className="face top" />
        <span className="face bottom" />
      </span>
    </span>
  );
}
