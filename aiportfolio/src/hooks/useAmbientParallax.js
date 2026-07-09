import { useEffect, useRef } from "react";

// Subtle rotation that follows the mouse across the whole viewport.
// Used on the hero title and contact headline.
export function useAmbientParallax(strength = 7, reduceMotion = false) {
  const ref = useRef(null);

  useEffect(() => {
    if (reduceMotion) return;
    const el = ref.current;
    if (!el) return;

    let raf;
    let curX = 0, curY = 0, targetX = 0, targetY = 0;

    const onMove = (e) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * strength;
      targetY = -(e.clientY / window.innerHeight - 0.5) * strength;
    };
    window.addEventListener("mousemove", onMove);

    const loop = () => {
      curX += (targetX - curX) * 0.08;
      curY += (targetY - curY) * 0.08;
      el.style.transform = `perspective(900px) rotateY(${curX}deg) rotateX(${curY}deg)`;
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [strength, reduceMotion]);

  return ref;
}
