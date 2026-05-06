"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float time;
  varying vec2 vUv;

  float hash(vec2 p) {
    p = fract(p * vec2(127.1, 311.7));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1,0)), f.x),
      mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), f.x),
      f.y
    );
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 6; i++) {
      v += a * noise(p);
      p *= 2.0;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 p = (vUv * 2.0 - 1.0) * 1.4;

    // domain warp — two layers for organic feel
    vec2 q = vec2(
      fbm(p + vec2(time * 0.07, time * 0.04)),
      fbm(p + vec2(time * 0.05, time * 0.08 + 3.1))
    );
    vec2 r = vec2(
      fbm(p + 1.2 * q + vec2(1.7, 9.2)),
      fbm(p + 1.2 * q + vec2(8.3, 2.8))
    );

    float shape = fbm(p + 1.4 * r);

    vec3 dark  = vec3(0.055, 0.055, 0.060);
    vec3 mid   = vec3(0.22,  0.21,  0.22);
    vec3 light = vec3(0.88,  0.87,  0.86);

    vec3 color = mix(dark, mid, smoothstep(0.1, 0.45, shape));
    color      = mix(color, light, smoothstep(0.42, 0.72, shape));

    // soft vignette
    float vig = 1.0 - dot(vUv * 2.0 - 1.0, vUv * 2.0 - 1.0) * 0.35;
    color *= vig;

    gl_FragColor = vec4(color, 1.0);
  }
`;

export function MeshGradientBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: false });
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const clock = new THREE.Clock();
    const uniforms = { time: { value: 0 } };
    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({ uniforms, vertexShader, fragmentShader });
    scene.add(new THREE.Mesh(geometry, material));

    const resize = () => renderer.setSize(window.innerWidth, window.innerHeight);
    resize();
    window.addEventListener("resize", resize);

    let rafId: number;
    const loop = () => {
      rafId = requestAnimationFrame(loop);
      uniforms.time.value = clock.getElapsedTime();
      renderer.render(scene, camera);
    };
    loop();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      <canvas ref={canvasRef} style={{ display: "block", width: "100%", height: "100%" }} />
    </div>
  );
}
