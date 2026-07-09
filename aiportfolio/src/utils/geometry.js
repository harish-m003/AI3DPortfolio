// Distributes n points evenly across the surface of a unit sphere.
// Used by the skill sphere (DOM nodes) and could be reused for any
// other "points on a sphere" visualization.
export function fibonacciSphere(n) {
  return Array.from({ length: n }, (_, i) => {
    const t = (i + 0.5) / n;
    const phi = Math.acos(1 - 2 * t);
    const theta = Math.PI * (1 + Math.sqrt(5)) * i;
    return {
      x: Math.sin(phi) * Math.cos(theta),
      y: Math.sin(phi) * Math.sin(theta),
      z: Math.cos(phi),
    };
  });
}
