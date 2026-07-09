import React, { useEffect, useRef } from "react";

// Dot + trailing ring that follows the mouse. Any element with
// data-hover on it will make the ring expand (see CSS .cursor-ring.hover).
export function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    let mx = window.innerWidth / 2, my = window.innerHeight / 2, rx = mx, ry = my;
    let raf;

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.left = mx + "px";
        dotRef.current.style.top = my + "px";
      }
    };
    window.addEventListener("mousemove", onMove);

    const loop = () => {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      if (ringRef.current) {
        ringRef.current.style.left = rx + "px";
        ringRef.current.style.top = ry + "px";
      }
      raf = requestAnimationFrame(loop);
    };
    loop();

    const onOver = (e) => {
      if (e.target.closest && e.target.closest("[data-hover]")) ringRef.current?.classList.add("hover");
    };
    const onOut = (e) => {
      if (e.target.closest && e.target.closest("[data-hover]")) ringRef.current?.classList.remove("hover");
    };
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div className="cursor-dot" ref={dotRef} />
      <div className="cursor-ring" ref={ringRef} />
    </>
  );
}
