import React from "react";
import { SECTIONS } from "../data/content";

export function NavRail({ active, onNav }) {
  return (
    <nav className="rail" id="rail">
      {SECTIONS.map((s) => (
        <div key={s.id} className={`rail-item ${active === s.id ? "active" : ""}`} onClick={() => onNav(s.id)}>
          <span className="rail-dot" />
          <span className="rail-label">{s.label}</span>
        </div>
      ))}
    </nav>
  );
}

export function MobileRail({ active, onNav }) {
  return (
    <nav className="mobile-rail" id="mobileRail">
      {SECTIONS.map((s) => (
        <div key={s.id} className={`rail-item ${active === s.id ? "active" : ""}`} onClick={() => onNav(s.id)}>
          <span className="rail-dot" />
        </div>
      ))}
    </nav>
  );
}
