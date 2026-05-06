"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const IMAGES = [
  "/aurora/aurora-1.jpg",
  "/aurora/aurora-2.jpg",
  "/aurora/aurora-3.jpg",
  "/aurora/aurora-4.jpg",
  "/aurora/aurora-5.jpg",
];

const STEP_MS = 480;
const TRANSITION_MS = 260;
const EXIT_WAIT_MS = 500;
const EXIT_FADE_MS = 600;

export function AuroraPreloader() {
  const [index, setIndex] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setGone(true);
      return;
    }

    if (index < IMAGES.length - 1) {
      const t = setTimeout(() => setIndex((i) => i + 1), STEP_MS);
      return () => clearTimeout(t);
    }

    // last image — wait, then fade out
    const t = setTimeout(() => {
      setExiting(true);
      setTimeout(() => setGone(true), EXIT_FADE_MS);
    }, EXIT_WAIT_MS);
    return () => clearTimeout(t);
  }, [index]);

  if (gone) return null;

  const pct = 100 / IMAGES.length;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{
        backgroundColor: "var(--bg)",
        opacity: exiting ? 0 : 1,
        transition: `opacity ${EXIT_FADE_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`,
      }}
    >
      {/* framed photo strip */}
      <div
        className="relative overflow-hidden"
        style={{ width: "min(520px, 78vw)", aspectRatio: "3 / 2" }}
      >
        <div
          className="absolute inset-y-0 left-0 flex"
          style={{
            width: `${IMAGES.length * 100}%`,
            transform: `translateX(-${index * pct}%)`,
            transition: `transform ${TRANSITION_MS}ms cubic-bezier(0.76, 0, 0.24, 1)`,
          }}
        >
          {IMAGES.map((src, i) => (
            <div
              key={src}
              className="relative h-full flex-shrink-0"
              style={{ width: `${pct}%` }}
            >
              <Image
                src={src}
                alt=""
                fill
                className="object-cover"
                priority={i < 2}
                aria-hidden="true"
              />
            </div>
          ))}
        </div>
      </div>

      {/* counter */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.2em] text-fg/30">
        {String(index + 1).padStart(2, "0")} / {String(IMAGES.length).padStart(2, "0")}
      </div>
    </div>
  );
}
