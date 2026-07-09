import { useEffect, useRef } from "react";

// Makes a button pull slightly toward the cursor, then spring back on leave.
export function useMagnetic() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let resetTimer;

    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * 0.3;
      const y = (e.clientY - r.top - r.height / 2) * 0.5;
      el.style.transform = `translate(${x}px, ${y}px)`;
    };
    const onLeave = () => {
      el.style.transition = "transform .5s cubic-bezier(.16,.84,.44,1)";
      el.style.transform = "translate(0,0)";
      resetTimer = setTimeout(() => (el.style.transition = ""), 500);
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      clearTimeout(resetTimer);
    };
  }, []);

  return ref;
}
