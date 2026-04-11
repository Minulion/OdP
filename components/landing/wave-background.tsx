"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function WaveBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050510, 0.05);

    const camera = new THREE.PerspectiveCamera(48, 1, 0.1, 100);
    camera.position.set(0, 1.5, 10.5);

    const geometry = new THREE.PlaneGeometry(22, 16, 88, 56);
    const positions = geometry.attributes.position.array as Float32Array;
    const basePositions = new Float32Array(positions.length);
    basePositions.set(positions);

    const surfaceMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#35135f"),
      emissive: new THREE.Color("#4d23ad"),
      emissiveIntensity: 0.9,
      metalness: 0.8,
      roughness: 0.22,
      transmission: 0.15,
      transparent: true,
      opacity: 0.42,
      clearcoat: 1,
      clearcoatRoughness: 0.2,
      side: THREE.DoubleSide,
    });

    const wireMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#af93ff"),
      wireframe: true,
      transparent: true,
      opacity: 0.13,
    });

    const surface = new THREE.Mesh(geometry, surfaceMaterial);
    surface.position.y = -1.7;
    surface.rotation.x = -1.1;
    scene.add(surface);

    const wire = new THREE.Mesh(geometry, wireMaterial);
    wire.position.copy(surface.position);
    wire.rotation.copy(surface.rotation);
    wire.scale.setScalar(1.002);
    scene.add(wire);

    const ambientLight = new THREE.AmbientLight(0x8f7dff, 0.55);
    const rimLight = new THREE.PointLight(0x925fff, 10, 30, 2);
    rimLight.position.set(-5, 3, 6);
    const fillLight = new THREE.PointLight(0x4f96ff, 7, 26, 2);
    fillLight.position.set(5, 1, 4);
    scene.add(ambientLight, rimLight, fillLight);

    const glowOrb = new THREE.Mesh(
      new THREE.SphereGeometry(1.4, 32, 32),
      new THREE.MeshBasicMaterial({
        color: new THREE.Color("#4f7cff"),
        transparent: true,
        opacity: 0.16,
      }),
    );
    glowOrb.position.set(4.6, 2.8, -3.5);
    scene.add(glowOrb);

    const resize = () => {
      const { clientWidth, clientHeight } = canvas;
      const width = clientWidth || window.innerWidth;
      const height = clientHeight || window.innerHeight;

      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    resize();
    window.addEventListener("resize", resize);

    let frameId = 0;

    const animate = (time: number) => {
      const t = time * 0.00042 * (reducedMotion ? 0.35 : 1);

      for (let i = 0; i < positions.length; i += 3) {
        const x = basePositions[i];
        const y = basePositions[i + 1];

        positions[i + 2] =
          Math.sin(x * 0.7 + t * 2.1) * 0.58 +
          Math.cos(y * 1.1 + t * 1.7) * 0.36 +
          Math.sin((x + y) * 0.42 + t * 1.4) * 0.24;
      }

      geometry.attributes.position.needsUpdate = true;
      geometry.computeVertexNormals();

      surface.rotation.z = Math.sin(t * 0.4) * 0.12;
      wire.rotation.z = surface.rotation.z;

      glowOrb.position.x = 4.6 + Math.sin(t * 0.8) * 0.5;
      glowOrb.position.y = 2.8 + Math.cos(t) * 0.3;

      renderer.render(scene, camera);
      frameId = window.requestAnimationFrame(animate);
    };

    frameId = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
      geometry.dispose();
      surfaceMaterial.dispose();
      wireMaterial.dispose();
      glowOrb.geometry.dispose();
      (glowOrb.material as THREE.Material).dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(113,78,255,0.18),transparent_46%)]" />
      <canvas ref={canvasRef} className="h-full w-full opacity-90" />
    </div>
  );
}
