import { useEffect, useRef } from "react";

// 3D hover-tilt on whatever element you attach the returned ref to.
export function useTilt({ maxTiltX = 8, maxTiltY = 10, perspective = 700, lift = 4 } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(${perspective}px) rotateX(${-py * maxTiltX}deg) rotateY(${px * maxTiltY}deg) translateY(${-lift}px)`;
    };
    const onLeave = () => {
      el.style.transform = `perspective(${perspective}px) rotateX(0) rotateY(0)`;
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [maxTiltX, maxTiltY, perspective, lift]);

  return ref;
}
