import React, { useEffect, useState } from "react";

export function Preloader({ onDone }) {
  const [pct, setPct] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setPct((p) => {
        const next = Math.min(100, p + Math.random() * 14);
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => setDone(true), 300);
          setTimeout(onDone, 1100);
        }
        return next;
      });
    }, 140);
    return () => clearInterval(timer);
  }, [onDone]);

  return (
    <div id="preloader" className={done ? "done" : ""}>
      <div className="pre-mark mono">PORTFOLIO</div>
      <div className="pre-bar">
        <div className="pre-bar-fill" style={{ width: `${pct}%` }} />
      </div>
      <div className="pre-num mono">{Math.floor(pct)}%</div>
    </div>
  );
}
