'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function HeroCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const container = mountRef.current;
    let width  = container.clientWidth;
    let height = container.clientHeight;

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 200);
    camera.position.set(0, 0, 8);

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // ── Colour palette ────────────────────────────────────────────
    const PALETTE = [
      new THREE.Color(0x6c63ff), // purple
      new THREE.Color(0x38bdf8), // sky
      new THREE.Color(0xf472b6), // pink
      new THREE.Color(0xa78bfa), // lavender
      new THREE.Color(0x34d399), // teal
    ];

    // ── Multi-colour particle cloud ───────────────────────────────
    const COUNT  = 900;
    const posBuf = new Float32Array(COUNT * 3);
    const colBuf = new Float32Array(COUNT * 3);

    for (let i = 0; i < COUNT; i++) {
      posBuf[i * 3]     = (Math.random() - 0.5) * 28;
      posBuf[i * 3 + 1] = (Math.random() - 0.5) * 22;
      posBuf[i * 3 + 2] = (Math.random() - 0.5) * 14;
      const c = PALETTE[Math.floor(Math.random() * PALETTE.length)];
      colBuf[i * 3] = c.r; colBuf[i * 3 + 1] = c.g; colBuf[i * 3 + 2] = c.b;
    }

    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(posBuf, 3));
    pGeo.setAttribute('color',    new THREE.BufferAttribute(colBuf, 3));
    const pMat = new THREE.PointsMaterial({
      size: 0.07, transparent: true, opacity: 0.72,
      sizeAttenuation: true, depthWrite: false, vertexColors: true,
    });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // ── Constellation lines (deferred so it never blocks paint) ───
    let lGeo: THREE.BufferGeometry | null = null;
    let lMat: THREE.LineBasicMaterial | null = null;
    let constellationLines: THREE.LineSegments | null = null;

    const buildLines = () => {
      const THRESH = 4.0;
      const MAX_L  = 220;
      const verts: number[] = [];
      let added = 0;
      for (let i = 0; i < COUNT && added < MAX_L; i++) {
        for (let j = i + 1; j < COUNT && added < MAX_L; j++) {
          const dx = posBuf[i*3]   - posBuf[j*3];
          const dy = posBuf[i*3+1] - posBuf[j*3+1];
          const dz = posBuf[i*3+2] - posBuf[j*3+2];
          if (dx*dx + dy*dy + dz*dz < THRESH * THRESH) {
            verts.push(posBuf[i*3], posBuf[i*3+1], posBuf[i*3+2]);
            verts.push(posBuf[j*3], posBuf[j*3+1], posBuf[j*3+2]);
            added++;
          }
        }
      }
      lGeo = new THREE.BufferGeometry();
      lGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(verts), 3));
      lMat = new THREE.LineBasicMaterial({ color: 0x6c63ff, transparent: true, opacity: 0.08, depthWrite: false });
      constellationLines = new THREE.LineSegments(lGeo, lMat);
      scene.add(constellationLines);
    };

    // Defer the O(n²) search so it never blocks initial scroll
    const idleId = (window as Window & { requestIdleCallback?: (cb: () => void) => number }).requestIdleCallback
      ? (window as Window & { requestIdleCallback: (cb: () => void) => number }).requestIdleCallback(buildLines)
      : window.setTimeout(buildLines, 200) as unknown as number;

    // ── Wireframe shapes ──────────────────────────────────────────
    const shapeDefs = [
      { geo: new THREE.IcosahedronGeometry(0.6, 1), at: [-3.8,  1.5, -1.5] as [number,number,number], color: 0x6c63ff },
      { geo: new THREE.OctahedronGeometry(0.48, 0),  at: [ 4.0, -1.2, -2.0] as [number,number,number], color: 0x38bdf8 },
      { geo: new THREE.TetrahedronGeometry(0.55, 0),  at: [-2.2, -2.2,  0.5] as [number,number,number], color: 0xf472b6 },
      { geo: new THREE.IcosahedronGeometry(0.38, 0),  at: [ 2.8,  2.5, -0.8] as [number,number,number], color: 0xa78bfa },
    ];

    const shapes = shapeDefs.map(({ geo, at, color }) => {
      const mat  = new THREE.MeshBasicMaterial({ color, wireframe: true, transparent: true, opacity: 0.16 });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(at[0], at[1], at[2]);
      mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      scene.add(mesh);
      return mesh;
    });

    // ── Dual rings ────────────────────────────────────────────────
    const ringDefs = [
      { r: 2.7, tube: 0.007, tilt: Math.PI / 2.4, color: 0x6c63ff, opacity: 0.10 },
      { r: 1.8, tube: 0.005, tilt: Math.PI / 4.5, color: 0x38bdf8, opacity: 0.07 },
    ];
    const ringGeos: THREE.TorusGeometry[]     = [];
    const ringMats: THREE.MeshBasicMaterial[] = [];
    const rings = ringDefs.map(({ r, tube, tilt, color, opacity }) => {
      const g = new THREE.TorusGeometry(r, tube, 4, 100);
      const m = new THREE.MeshBasicMaterial({ color, transparent: true, opacity });
      ringGeos.push(g); ringMats.push(m);
      const mesh = new THREE.Mesh(g, m);
      mesh.rotation.x = tilt;
      scene.add(mesh);
      return mesh;
    });

    // ── Mouse & scroll parallax ───────────────────────────────────
    let tCamX = 0, tCamY = 0, camX = 0, camY = 0;
    const onMouse = (e: MouseEvent) => {
      tCamX = ((e.clientX / window.innerWidth)  - 0.5) * 0.9;
      tCamY = ((e.clientY / window.innerHeight) - 0.5) * -0.6;
    };
    window.addEventListener('mousemove', onMouse);
    let scrollY = window.scrollY;
    const onScroll = () => { scrollY = window.scrollY; };
    window.addEventListener('scroll', onScroll, { passive: true });

    // ── Animate ───────────────────────────────────────────────────
    const startTime = performance.now();
    let rafId: number;

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const t = (performance.now() - startTime) / 1000;

      // Smooth camera parallax
      camX += (tCamX - camX) * 0.05;
      camY += (tCamY - camY) * 0.05;
      camera.position.x = camX;
      camera.position.y = camY - scrollY * 0.002;
      camera.lookAt(scene.position);

      // Particles + lines rotate together
      const ry = t * 0.018;
      const rx = t * 0.008;
      particles.rotation.y = ry;
      particles.rotation.x = rx;
      if (constellationLines) {
        constellationLines.rotation.y = ry;
        constellationLines.rotation.x = rx;
      }

      // Shapes: spin + pulse + float
      shapes.forEach((s, i) => {
        const dir = i % 2 === 0 ? 1 : -1;
        s.rotation.x = t * 0.20 * dir;
        s.rotation.y = t * 0.28 * dir;
        s.scale.setScalar(1 + Math.sin(t * 0.9 + i * 1.3) * 0.07);
        s.position.y = shapeDefs[i].at[1] + Math.sin(t * 0.5 + i * 0.9) * 0.25;
      });

      // Rings counter-rotate
      rings.forEach((r, i) => {
        r.rotation.z = t * (0.06 + i * 0.04) * (i % 2 === 0 ? 1 : -1);
      });

      renderer.render(scene, camera);
    };
    animate();

    // ── Resize ────────────────────────────────────────────────────
    const onResize = () => {
      width  = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', onResize);

    // ── Cleanup ───────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('scroll',    onScroll);
      window.removeEventListener('resize',    onResize);

      if ((window as Window & { cancelIdleCallback?: (id: number) => void }).cancelIdleCallback) {
        (window as Window & { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(idleId);
      } else {
        clearTimeout(idleId);
      }

      renderer.dispose();
      pGeo.dispose(); pMat.dispose();
      lGeo?.dispose(); lMat?.dispose();
      shapeDefs.forEach(d => d.geo.dispose());
      shapes.forEach(s => (s.material as THREE.Material).dispose());
      ringGeos.forEach(g => g.dispose());
      ringMats.forEach(m => m.dispose());
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}
      aria-hidden="true"
    />
  );
}
