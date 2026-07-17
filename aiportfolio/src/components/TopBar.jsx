import React from "react";

export function TopBar() {
  return (
    <div className="topbar">
      <div className="brand">
        {/* <h1>HARISH M</h1> */}
      </div>
      <div className="top-links">
        <span>Frontend Developer</span>
      </div>
      {/* <button
        className="menu-btn mono"
        onClick={() => document.getElementById("mobileRail")?.scrollIntoView({ behavior: "smooth", block: "nearest" })}
      >
        MENU
      </button> */}
    </div>
  );
}
