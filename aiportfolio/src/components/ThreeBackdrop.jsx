// import React, { useEffect, useRef } from "react";
// import * as THREE from "three";

// // A persistent particle "core" behind the whole page. It morphs between
// // shapes (sphere / torus knot / grid / helix / collapse) as the active
// // section changes. The parent calls morphApiRef.current(sectionId) to
// // trigger a transition — see the shape builder functions below.
// export function ThreeBackdrop({ morphApiRef, reduceMotion }) {
//   const canvasRef = useRef(null);
//   const burstRef = useRef(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
//     renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
//     renderer.setSize(window.innerWidth, window.innerHeight);

//     const scene = new THREE.Scene();
//     scene.fog = new THREE.FogExp2(0x08090d, 0.045);

//     const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
//     camera.position.set(0, 0, 9);

//     const COUNT = 2600;

//     function sphereShape(count, radius) {
//       const arr = new Float32Array(count * 3);
//       for (let i = 0; i < count; i++) {
//         const t = i / count;
//         const phi = Math.acos(1 - 2 * t);
//         const theta = Math.PI * (1 + Math.sqrt(5)) * i;
//         arr[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
//         arr[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
//         arr[i * 3 + 2] = radius * Math.cos(phi);
//       }
//       return arr;
//     }
//     function torusKnotShape(count) {
//       const arr = new Float32Array(count * 3);
//       const p = 2, q = 3, R = 2.1, s = 0.55;
//       for (let i = 0; i < count; i++) {
//         const t = (i / count) * Math.PI * 2;
//         const r = R + s * Math.cos(q * t);
//         arr[i * 3] = r * Math.cos(p * t);
//         arr[i * 3 + 1] = r * Math.sin(p * t);
//         arr[i * 3 + 2] = s * Math.sin(q * t) * 1.4;
//       }
//       return arr;
//     }
//     function gridShape(count) {
//       const arr = new Float32Array(count * 3);
//       const n = Math.ceil(Math.cbrt(count));
//       const span = 3.4;
//       let idx = 0;
//       for (let i = 0; i < n && idx < count; i++) {
//         for (let j = 0; j < n && idx < count; j++) {
//           for (let k = 0; k < n && idx < count; k++) {
//             arr[idx * 3] = (i / (n - 1) - 0.5) * span;
//             arr[idx * 3 + 1] = (j / (n - 1) - 0.5) * span;
//             arr[idx * 3 + 2] = (k / (n - 1) - 0.5) * span;
//             idx++;
//           }
//         }
//       }
//       for (; idx < count; idx++) {
//         arr[idx * 3] = 0; arr[idx * 3 + 1] = 0; arr[idx * 3 + 2] = 0;
//       }
//       return arr;
//     }
//     function helixShape(count) {
//       const arr = new Float32Array(count * 3);
//       const turns = 5, height = 5.6, radius = 1.7;
//       for (let i = 0; i < count; i++) {
//         const strand = i % 2;
//         const t = Math.floor(i / 2) / (count / 2);
//         const angle = t * turns * Math.PI * 2 + strand * Math.PI;
//         arr[i * 3] = radius * Math.cos(angle);
//         arr[i * 3 + 1] = (t - 0.5) * height;
//         arr[i * 3 + 2] = radius * Math.sin(angle);
//       }
//       return arr;
//     }
//     function collapseShape(count) {
//       const arr = new Float32Array(count * 3);
//       for (let i = 0; i < count; i++) {
//         const r = 0.5 * Math.cbrt(Math.random());
//         const theta = Math.random() * Math.PI * 2;
//         const phi = Math.acos(2 * Math.random() - 1);
//         arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
//         arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
//         arr[i * 3 + 2] = r * Math.cos(phi);
//       }
//       return arr;
//     }

//     const shapes = {
//       home: sphereShape(COUNT, 2.6),
//       about: torusKnotShape(COUNT),
//       projects: gridShape(COUNT),
//       skills: helixShape(COUNT),
//       contact: collapseShape(COUNT),
//     };

//     const geometry = new THREE.BufferGeometry();
//     const positions = new Float32Array(shapes.home);
//     const basePositions = new Float32Array(shapes.home);
//     geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

//     const cA = new THREE.Color(0xff5a36);
//     const cB = new THREE.Color(0x7b61ff);
//     const colors = new Float32Array(COUNT * 3);
//     for (let i = 0; i < COUNT; i++) {
//       const c = cA.clone().lerp(cB, Math.abs(Math.sin(i * 0.013)));
//       colors[i * 3] = c.r; colors[i * 3 + 1] = c.g; colors[i * 3 + 2] = c.b;
//     }
//     geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

//     function makeSprite() {
//       const c = document.createElement("canvas");
//       c.width = c.height = 64;
//       const ctx = c.getContext("2d");
//       const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
//       g.addColorStop(0, "rgba(255,255,255,1)");
//       g.addColorStop(1, "rgba(255,255,255,0)");
//       ctx.fillStyle = g;
//       ctx.fillRect(0, 0, 64, 64);
//       return new THREE.CanvasTexture(c);
//     }

//     const material = new THREE.PointsMaterial({
//       size: 0.052, map: makeSprite(), transparent: true, vertexColors: true,
//       blending: THREE.AdditiveBlending, depthWrite: false,
//     });
//     const pointsMesh = new THREE.Points(geometry, material);
//     scene.add(pointsMesh);

//     const dustCount = 500;
//     const dustGeo = new THREE.BufferGeometry();
//     const dustPos = new Float32Array(dustCount * 3);
//     for (let i = 0; i < dustCount; i++) {
//       dustPos[i * 3] = (Math.random() - 0.5) * 30;
//       dustPos[i * 3 + 1] = (Math.random() - 0.5) * 30;
//       dustPos[i * 3 + 2] = (Math.random() - 0.5) * 30 - 6;
//     }
//     dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPos, 3));
//     const dustMat = new THREE.PointsMaterial({ size: 0.018, color: 0x8b8f9c, transparent: true, opacity: 0.5 });
//     const dust = new THREE.Points(dustGeo, dustMat);
//     scene.add(dust);

//     const nebulaCount = 260;
//     const nebulaGeo = new THREE.BufferGeometry();
//     const nebulaPos = new Float32Array(nebulaCount * 3);
//     const nebulaCol = new Float32Array(nebulaCount * 3);
//     for (let i = 0; i < nebulaCount; i++) {
//       nebulaPos[i * 3] = (Math.random() - 0.5) * 22;
//       nebulaPos[i * 3 + 1] = (Math.random() - 0.5) * 16;
//       nebulaPos[i * 3 + 2] = -10 - Math.random() * 10;
//       const c = cA.clone().lerp(cB, Math.random());
//       nebulaCol[i * 3] = c.r; nebulaCol[i * 3 + 1] = c.g; nebulaCol[i * 3 + 2] = c.b;
//     }
//     nebulaGeo.setAttribute("position", new THREE.BufferAttribute(nebulaPos, 3));
//     nebulaGeo.setAttribute("color", new THREE.BufferAttribute(nebulaCol, 3));
//     const nebulaMat = new THREE.PointsMaterial({
//       size: 0.5, map: makeSprite(), transparent: true, opacity: 0.18, vertexColors: true,
//       blending: THREE.AdditiveBlending, depthWrite: false,
//     });
//     const nebula = new THREE.Points(nebulaGeo, nebulaMat);
//     scene.add(nebula);

//     let fromArr = shapes.home.slice();
//     let toArr = shapes.home.slice();
//     const morphState = { t: 1 };
//     let morphStart = 0;
//     const MORPH_MS = reduceMotion ? 400 : 1800;

//     function morphTo(id) {
//       const target = shapes[id];
//       if (!target) return;
//       fromArr = basePositions.slice();
//       toArr = target;
//       morphState.t = 0;
//       morphStart = performance.now();
//       if (!reduceMotion && burstRef.current) {
//         burstRef.current.style.transition = "none";
//         burstRef.current.style.opacity = "0.55";
//         requestAnimationFrame(() => {
//           burstRef.current.style.transition = "opacity 1.1s cubic-bezier(.16,.84,.44,1)";
//           burstRef.current.style.opacity = "0";
//         });
//       }
//     }
//     if (morphApiRef) morphApiRef.current = morphTo;

//     const clock = new THREE.Clock();
//     let mouseX = 0, mouseY = 0;
//     const onMouseMove = (e) => {
//       mouseX = e.clientX / window.innerWidth - 0.5;
//       mouseY = e.clientY / window.innerHeight - 0.5;
//     };
//     window.addEventListener("mousemove", onMouseMove);

//     let scrollDolly = 0;
//     const onScroll = () => {
//       const max = document.body.scrollHeight - window.innerHeight;
//       scrollDolly = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
//     };
//     window.addEventListener("scroll", onScroll, { passive: true });

//     let raf;
//     function animate() {
//       raf = requestAnimationFrame(animate);
//       const t = clock.getElapsedTime();
//       const posAttr = geometry.attributes.position;
//       const arr = posAttr.array;

//       if (morphState.t < 1) {
//         const elapsed = performance.now() - morphStart;
//         morphState.t = Math.min(1, elapsed / MORPH_MS);
//       }
//       const mt = 1 - Math.pow(1 - morphState.t, 3); // ease-out cubic

//       for (let i = 0; i < COUNT; i++) {
//         const bx = fromArr[i * 3] + (toArr[i * 3] - fromArr[i * 3]) * mt;
//         const by = fromArr[i * 3 + 1] + (toArr[i * 3 + 1] - fromArr[i * 3 + 1]) * mt;
//         const bz = fromArr[i * 3 + 2] + (toArr[i * 3 + 2] - fromArr[i * 3 + 2]) * mt;
//         basePositions[i * 3] = bx; basePositions[i * 3 + 1] = by; basePositions[i * 3 + 2] = bz;
//         const jitter = reduceMotion ? 0 : 0.05;
//         arr[i * 3] = bx + Math.sin(t * 0.6 + i) * jitter;
//         arr[i * 3 + 1] = by + Math.cos(t * 0.5 + i * 1.3) * jitter;
//         arr[i * 3 + 2] = bz + Math.sin(t * 0.4 + i * 0.7) * jitter;
//       }
//       posAttr.needsUpdate = true;

//       if (!reduceMotion) {
//         pointsMesh.rotation.y = t * 0.09;
//         pointsMesh.rotation.x = Math.sin(t * 0.05) * 0.15;
//         dust.rotation.y = -t * 0.02;
//         nebula.rotation.y = t * 0.008;
//         nebula.rotation.x = Math.sin(t * 0.03) * 0.05;
//       }

//       const dollyZ = 9 + scrollDolly * 4.5;
//       camera.position.x += (mouseX * 1.1 - camera.position.x) * 0.03;
//       camera.position.y += (-mouseY * 0.8 - camera.position.y) * 0.03;
//       camera.position.z += (dollyZ - camera.position.z) * 0.05;
//       camera.lookAt(0, 0, 0);

//       renderer.render(scene, camera);
//     }
//     animate();

//     const onResize = () => {
//       camera.aspect = window.innerWidth / window.innerHeight;
//       camera.updateProjectionMatrix();
//       renderer.setSize(window.innerWidth, window.innerHeight);
//     };
//     window.addEventListener("resize", onResize);

//     return () => {
//       cancelAnimationFrame(raf);
//       window.removeEventListener("mousemove", onMouseMove);
//       window.removeEventListener("scroll", onScroll);
//       window.removeEventListener("resize", onResize);
//       geometry.dispose();
//       material.dispose();
//       dustGeo.dispose();
//       dustMat.dispose();
//       nebulaGeo.dispose();
//       nebulaMat.dispose();
//       renderer.dispose();
//     };
//   }, [reduceMotion]);

//   return (
//     <>
//       <canvas id="webgl" ref={canvasRef} />
//       <div className="burst" ref={burstRef} />
//     </>
//   );
// }
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

// A persistent particle "core" behind the whole page. It morphs between
// shapes (sphere / torus knot / grid / helix / collapse) as the active
// section changes. The parent calls morphApiRef.current(sectionId) to
// trigger a transition — see the shape builder functions below.
export function ThreeBackdrop({ morphApiRef, reduceMotion }) {
  const canvasRef = useRef(null);
  const burstRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x08090d, 0.045);

    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 9);

    const COUNT = 2600;

    function sphereShape(count, radius) {
      const arr = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const t = i / count;
        const phi = Math.acos(1 - 2 * t);
        const theta = Math.PI * (1 + Math.sqrt(5)) * i;
        arr[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
        arr[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        arr[i * 3 + 2] = radius * Math.cos(phi);
      }
      return arr;
    }
    function torusKnotShape(count) {
      const arr = new Float32Array(count * 3);
      const p = 2, q = 3, R = 2.1, s = 0.55;
      for (let i = 0; i < count; i++) {
        const t = (i / count) * Math.PI * 2;
        const r = R + s * Math.cos(q * t);
        arr[i * 3] = r * Math.cos(p * t);
        arr[i * 3 + 1] = r * Math.sin(p * t);
        arr[i * 3 + 2] = s * Math.sin(q * t) * 1.4;
      }
      return arr;
    }
    function gridShape(count) {
      const arr = new Float32Array(count * 3);
      const n = Math.ceil(Math.cbrt(count));
      const span = 3.4;
      let idx = 0;
      for (let i = 0; i < n && idx < count; i++) {
        for (let j = 0; j < n && idx < count; j++) {
          for (let k = 0; k < n && idx < count; k++) {
            arr[idx * 3] = (i / (n - 1) - 0.5) * span;
            arr[idx * 3 + 1] = (j / (n - 1) - 0.5) * span;
            arr[idx * 3 + 2] = (k / (n - 1) - 0.5) * span;
            idx++;
          }
        }
      }
      for (; idx < count; idx++) {
        arr[idx * 3] = 0; arr[idx * 3 + 1] = 0; arr[idx * 3 + 2] = 0;
      }
      return arr;
    }
    function helixShape(count) {
      const arr = new Float32Array(count * 3);
      const turns = 5, height = 5.6, radius = 1.7;
      for (let i = 0; i < count; i++) {
        const strand = i % 2;
        const t = Math.floor(i / 2) / (count / 2);
        const angle = t * turns * Math.PI * 2 + strand * Math.PI;
        arr[i * 3] = radius * Math.cos(angle);
        arr[i * 3 + 1] = (t - 0.5) * height;
        arr[i * 3 + 2] = radius * Math.sin(angle);
      }
      return arr;
    }
    function collapseShape(count) {
      const arr = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const r = 0.5 * Math.cbrt(Math.random());
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        arr[i * 3 + 2] = r * Math.cos(phi);
      }
      return arr;
    }

    const shapes = {
      home: sphereShape(COUNT, 2.6),
      about: torusKnotShape(COUNT),
      projects: gridShape(COUNT),
      skills: helixShape(COUNT),
      contact: collapseShape(COUNT),
    };

    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(shapes.home);
    const basePositions = new Float32Array(shapes.home);
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const cA = new THREE.Color(0xff5a36);
    const cB = new THREE.Color(0x7b61ff);
    const colors = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      const c = cA.clone().lerp(cB, Math.abs(Math.sin(i * 0.013)));
      colors[i * 3] = c.r; colors[i * 3 + 1] = c.g; colors[i * 3 + 2] = c.b;
    }
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    function makeSprite() {
      const c = document.createElement("canvas");
      c.width = c.height = 64;
      const ctx = c.getContext("2d");
      const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      g.addColorStop(0, "rgba(255,255,255,1)");
      g.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, 64, 64);
      
      const texture = new THREE.CanvasTexture(c);
      // Explicitly disable WebGL 2 restrictive unpacking flags
      texture.flipY = false;
      texture.premultiplyAlpha = false;
      return texture;
    }

    const material = new THREE.PointsMaterial({
      size: 0.052, map: makeSprite(), transparent: true, vertexColors: true,
      blending: THREE.AdditiveBlending, depthWrite: false,
    });
    const pointsMesh = new THREE.Points(geometry, material);
    scene.add(pointsMesh);

    const dustCount = 500;
    const dustGeo = new THREE.BufferGeometry();
    const dustPos = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i++) {
      dustPos[i * 3] = (Math.random() - 0.5) * 30;
      dustPos[i * 3 + 1] = (Math.random() - 0.5) * 30;
      dustPos[i * 3 + 2] = (Math.random() - 0.5) * 30 - 6;
    }
    dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPos, 3));
    const dustMat = new THREE.PointsMaterial({ size: 0.018, color: 0x8b8f9c, transparent: true, opacity: 0.5 });
    const dust = new THREE.Points(dustGeo, dustMat);
    scene.add(dust);

    const nebulaCount = 260;
    const nebulaGeo = new THREE.BufferGeometry();
    const nebulaPos = new Float32Array(nebulaCount * 3);
    const nebulaCol = new Float32Array(nebulaCount * 3);
    for (let i = 0; i < nebulaCount; i++) {
      nebulaPos[i * 3] = (Math.random() - 0.5) * 22;
      nebulaPos[i * 3 + 1] = (Math.random() - 0.5) * 16;
      nebulaPos[i * 3 + 2] = -10 - Math.random() * 10;
      const c = cA.clone().lerp(cB, Math.random());
      nebulaCol[i * 3] = c.r; nebulaCol[i * 3 + 1] = c.g; nebulaCol[i * 3 + 2] = c.b;
    }
    nebulaGeo.setAttribute("position", new THREE.BufferAttribute(nebulaPos, 3));
    nebulaGeo.setAttribute("color", new THREE.BufferAttribute(nebulaCol, 3));
    const nebulaMat = new THREE.PointsMaterial({
      size: 0.5, map: makeSprite(), transparent: true, opacity: 0.18, vertexColors: true,
      blending: THREE.AdditiveBlending, depthWrite: false,
    });
    const nebula = new THREE.Points(nebulaGeo, nebulaMat);
    scene.add(nebula);

    let fromArr = shapes.home.slice();
    let toArr = shapes.home.slice();
    const morphState = { t: 1 };
    let morphStart = 0;
    const MORPH_MS = reduceMotion ? 400 : 1800;

    function morphTo(id) {
      const target = shapes[id];
      if (!target) return;
      fromArr = basePositions.slice();
      toArr = target;
      morphState.t = 0;
      morphStart = performance.now();
      if (!reduceMotion && burstRef.current) {
        burstRef.current.style.transition = "none";
        burstRef.current.style.opacity = "0.55";
        requestAnimationFrame(() => {
          burstRef.current.style.transition = "opacity 1.1s cubic-bezier(.16,.84,.44,1)";
          burstRef.current.style.opacity = "0";
        });
      }
    }
    if (morphApiRef) morphApiRef.current = morphTo;

    const clock = new THREE.Clock();
    let mouseX = 0, mouseY = 0;
    const onMouseMove = (e) => {
      mouseX = e.clientX / window.innerWidth - 0.5;
      mouseY = e.clientY / window.innerHeight - 0.5;
    };
    window.addEventListener("mousemove", onMouseMove);

    let scrollDolly = 0;
    const onScroll = () => {
      const max = document.body.scrollHeight - window.innerHeight;
      scrollDolly = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    let raf;
    function animate() {
      raf = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      const posAttr = geometry.attributes.position;
      const arr = posAttr.array;

      if (morphState.t < 1) {
        const elapsed = performance.now() - morphStart;
        morphState.t = Math.min(1, elapsed / MORPH_MS);
      }
      const mt = 1 - Math.pow(1 - morphState.t, 3); // ease-out cubic

      for (let i = 0; i < COUNT; i++) {
        const bx = fromArr[i * 3] + (toArr[i * 3] - fromArr[i * 3]) * mt;
        const by = fromArr[i * 3 + 1] + (toArr[i * 3 + 1] - fromArr[i * 3 + 1]) * mt;
        const bz = fromArr[i * 3 + 2] + (toArr[i * 3 + 2] - fromArr[i * 3 + 2]) * mt;
        basePositions[i * 3] = bx; basePositions[i * 3 + 1] = by; basePositions[i * 3 + 2] = bz;
        const jitter = reduceMotion ? 0 : 0.05;
        arr[i * 3] = bx + Math.sin(t * 0.6 + i) * jitter;
        arr[i * 3 + 1] = by + Math.cos(t * 0.5 + i * 1.3) * jitter;
        arr[i * 3 + 2] = bz + Math.sin(t * 0.4 + i * 0.7) * jitter;
      }
      posAttr.needsUpdate = true;

      if (!reduceMotion) {
        pointsMesh.rotation.y = t * 0.09;
        pointsMesh.rotation.x = Math.sin(t * 0.05) * 0.15;
        dust.rotation.y = -t * 0.02;
        nebula.rotation.y = t * 0.008;
        nebula.rotation.x = Math.sin(t * 0.03) * 0.05;
      }

      const dollyZ = 9 + scrollDolly * 4.5;
      camera.position.x += (mouseX * 1.1 - camera.position.x) * 0.03;
      camera.position.y += (-mouseY * 0.8 - camera.position.y) * 0.03;
      camera.position.z += (dollyZ - camera.position.z) * 0.05;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
    animate();

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      geometry.dispose();
      material.dispose();
      dustGeo.dispose();
      dustMat.dispose();
      nebulaGeo.dispose();
      nebulaMat.dispose();
      renderer.dispose();
    };
  }, [reduceMotion]);

  return (
    <>
      <canvas id="webgl" ref={canvasRef} />
      <div className="burst" ref={burstRef} />
    </>
  );
}