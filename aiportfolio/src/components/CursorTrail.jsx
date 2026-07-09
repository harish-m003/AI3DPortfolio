import React, { useEffect, useRef } from "react";

// Fading particle trail on a full-screen canvas, drawn behind the cursor ring.
export function CursorTrail({ reduceMotion }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (reduceMotion) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    let particles = [];
    let last = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const onMove = (e) => {
      const speed = Math.hypot(e.clientX - last.x, e.clientY - last.y);
      if (speed > 4) {
        particles.push({
          x: e.clientX, y: e.clientY, life: 1, size: 2 + Math.random() * 2,
          color: Math.random() > 0.5 ? "255,90,54" : "123,97,255",
        });
      }
      last = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove);

    let raf;
    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.fillStyle = `rgba(${p.color},${p.life * 0.5})`;
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fill();
        p.life -= 0.045;
      });
      particles = particles.filter((p) => p.life > 0);
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [reduceMotion]);

  return <canvas id="trailCanvas" ref={canvasRef} />;
}
