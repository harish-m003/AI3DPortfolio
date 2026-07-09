import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { SKILLS_DATA, LINE_COLOR } from "../data/content";
import { fibonacciSphere } from "../utils/geometry";

// Draggable 3D sphere of skill tags. Points are plotted with a Fibonacci
// sphere distribution and projected to screen space every frame; dragging
// spins it, releasing lets it drift back into a slow idle auto-rotation.
export function SkillSphere() {
  const wrapRef = useRef(null);
  const nodeRefs = useRef([]);
  const lineRefs = useRef([]);

  const points = useMemo(
    () => fibonacciSphere(SKILLS_DATA.length).map((p, i) => ({ ...p, skill: SKILLS_DATA[i] })),
    []
  );

  const pulse = useCallback((i) => {
    const el = nodeRefs.current[i];
    if (!el) return;
    el.classList.remove("pulse");
    // eslint-disable-next-line no-unused-expressions
    el.offsetWidth; // restart the CSS animation
    el.classList.add("pulse");
  }, []);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    let angleY = 0, angleX = 0.15, velY = 0.0022, velX = 0, dragging = false, lastX = 0, lastY = 0;

    const onDown = (e) => {
      dragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      wrap.setPointerCapture(e.pointerId);
    };
    const onMove = (e) => {
      if (!dragging) return;
      const dx = e.clientX - lastX, dy = e.clientY - lastY;
      velY = dx * 0.00025;
      velX = -dy * 0.00025;
      angleY += dx * 0.006;
      angleX = Math.max(-1.3, Math.min(1.3, angleX + dy * 0.006));
      lastX = e.clientX;
      lastY = e.clientY;
    };
    const onUp = () => (dragging = false);

    wrap.addEventListener("pointerdown", onDown);
    wrap.addEventListener("pointermove", onMove);
    ["pointerup", "pointerleave", "pointercancel"].forEach((ev) => wrap.addEventListener(ev, onUp));

    let raf;
    const render = () => {
      const rect = wrap.getBoundingClientRect();
      const R = Math.min(rect.width, rect.height) * 0.4;
      const cx = rect.width / 2, cy = rect.height / 2;
      const focal = R * 2.4;

      if (!dragging) {
        angleY += velY;
        angleX += velX;
        velY += (0.0022 - velY) * 0.02;
        velX *= 0.9;
      }

      const cosY = Math.cos(angleY), sinY = Math.sin(angleY);
      const cosX = Math.cos(angleX), sinX = Math.sin(angleX);

      points.forEach((p, i) => {
        const x1 = p.x * cosY + p.z * sinY;
        const z1 = -p.x * sinY + p.z * cosY;
        const y1 = p.y * cosX - z1 * sinX;
        const z2 = p.y * sinX + z1 * cosX;

        const scale = focal / (focal - z2 * R);
        const sx = cx + x1 * R * scale;
        const sy = cy + y1 * R * scale;
        const depth = (z2 + 1) / 2;

        const node = nodeRefs.current[i];
        if (node) {
          node.style.left = sx + "px";
          node.style.top = sy + "px";
          node.style.opacity = (0.28 + depth * 0.72).toFixed(2);
          node.style.zIndex = Math.round(depth * 100);
          node.style.transform = `translate(-50%,-50%) scale(${(0.6 + depth * 0.65).toFixed(2)})`;
        }
        const line = lineRefs.current[i];
        if (line) {
          line.setAttribute("x1", cx);
          line.setAttribute("y1", cy);
          line.setAttribute("x2", sx);
          line.setAttribute("y2", sy);
          line.setAttribute("opacity", (depth * 0.22).toFixed(2));
          line.setAttribute("stroke", LINE_COLOR[p.skill.c]);
        }
      });

      raf = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(raf);
      wrap.removeEventListener("pointerdown", onDown);
      wrap.removeEventListener("pointermove", onMove);
      ["pointerup", "pointerleave", "pointercancel"].forEach((ev) => wrap.removeEventListener(ev, onUp));
    };
  }, [points]);

  return (
    <div className="skill-sphere-wrap" ref={wrapRef}>
      <svg className="skill-lines">
        {points.map((_, i) => (
          <line key={i} ref={(el) => (lineRefs.current[i] = el)} strokeWidth="1" />
        ))}
      </svg>
      <div className="skill-sphere">
        {points.map((p, i) => (
          <div className="skill-node" key={i} ref={(el) => (nodeRefs.current[i] = el)}>
            <span className={`skill-node-inner ${p.skill.c}`} onClick={() => pulse(i)}>
              {p.skill.n}
            </span>
          </div>
        ))}
      </div>
      <div className="sphere-core mono">CORE</div>
    </div>
  );
}
