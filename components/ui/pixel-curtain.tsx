"use client";

import { useEffect, useRef, useState, useMemo } from "react";

const COLS = 14;
const ROWS = 8;
const FPS = 30;
const HOLD_FRAMES = 12;       // solid before wave starts
const WAVE_SPREAD = 32;       // frames across which wave sweeps
const CELL_FADE = 7;          // frames each cell takes to fade

const TOTAL_FRAMES = HOLD_FRAMES + WAVE_SPREAD + CELL_FADE + 6;

function clamp01(v: number) {
  return Math.max(0, Math.min(1, v));
}

export function PixelCurtain({ onDone }: { onDone?: () => void }) {
  const [frame, setFrame] = useState(0);
  const [gone, setGone] = useState(false);
  const startRef = useRef<number | null>(null);
  const doneFired = useRef(false);

  const delays = useMemo(() => {
    const raw = Array.from({ length: ROWS }, (_, y) =>
      Array.from({ length: COLS }, (_, x) =>
        Math.hypot(x - (COLS - 1) / 2, y - (ROWS - 1) / 2)
      )
    );
    let min = Infinity, max = -Infinity;
    raw.forEach(row => row.forEach(v => { if (v < min) min = v; if (v > max) max = v; }));
    const span = Math.max(0, WAVE_SPREAD - CELL_FADE);
    return raw.map(row =>
      row.map(v => ((v - min) / (max - min || 1)) * span)
    );
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setGone(true);
      onDone?.();
      return;
    }

    let raf: number;
    const tick = (ts: number) => {
      if (!startRef.current) startRef.current = ts;
      const f = Math.floor((ts - startRef.current) / (1000 / FPS));
      setFrame(f);

      if (f >= TOTAL_FRAMES) {
        if (!doneFired.current) {
          doneFired.current = true;
          onDone?.();
          setTimeout(() => setGone(true), 80);
        }
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  if (gone) return null;

  return (
    <div
      className="fixed inset-0 z-[100] pointer-events-none"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${COLS}, 1fr)`,
        gridTemplateRows: `repeat(${ROWS}, 1fr)`,
      }}
    >
      {Array.from({ length: ROWS * COLS }, (_, i) => {
        const x = i % COLS;
        const y = Math.floor(i / COLS);
        const delay = delays[y][x];
        const start = HOLD_FRAMES + delay;
        const opacity = clamp01(1 - (frame - start) / CELL_FADE);
        return (
          <div
            key={i}
            style={{ backgroundColor: "var(--bg)", opacity }}
          />
        );
      })}
    </div>
  );
}
