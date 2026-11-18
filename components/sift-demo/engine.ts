"use client";

// Portable playback engine for scripted UI demos. No site-specific imports:
// copy this folder into any React 18 / Next.js repo.
//
// The clock accumulates clamped frame deltas instead of reading `now - start`,
// so a hidden tab or an off-screen stretch never makes the story jump ahead.

import { useEffect, useLayoutEffect, useRef, useState, type RefObject } from "react";

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

/** Drives `onFrame(t, loop)` on every animation frame while `running`. */
export function useStoryClock({
  durationMs,
  running,
  onFrame,
  maxStepMs = 64,
}: {
  durationMs: number;
  running: boolean;
  onFrame: (t: number, loop: number) => void;
  maxStepMs?: number;
}) {
  const t = useRef(0);
  const loop = useRef(0);
  const cb = useRef(onFrame);
  cb.current = onFrame;

  useEffect(() => {
    if (!running) return;
    let raf = 0;
    let last = -1;
    const tick = (now: number) => {
      if (last >= 0) {
        t.current += Math.min(now - last, maxStepMs);
        if (t.current >= durationMs) {
          t.current = 0;
          loop.current += 1;
        }
      }
      last = now;
      cb.current(t.current, loop.current);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [running, durationMs, maxStepMs]);
}

/** True while the element is at least `threshold` visible. */
export function useInView(ref: RefObject<Element>, threshold = 0.2) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [ref, threshold]);
  return inView;
}

/** False while the browser tab is hidden. */
export function usePageVisible() {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const on = () => setVisible(document.visibilityState !== "hidden");
    on();
    document.addEventListener("visibilitychange", on);
    return () => document.removeEventListener("visibilitychange", on);
  }, []);
  return visible;
}

/** Scale factor that fits a fixed-size design canvas to the element's width. 0 until measured. */
export function useFitScale(ref: RefObject<HTMLElement>, designWidth: number) {
  const [scale, setScale] = useState(0);
  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => setScale(el.clientWidth / designWidth);
    measure();
    if (typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref, designWidth]);
  return scale;
}

/** prefers-reduced-motion, read after mount (null until known, so SSR and hydration match). */
export function usePrefersReducedMotion() {
  const [reduce, setReduce] = useState<boolean | null>(null);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setReduce(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduce;
}

/** Position of `el` inside `root` in untransformed layout pixels (offsets ignore CSS transforms). */
export function offsetWithin(el: HTMLElement, root: HTMLElement) {
  let x = 0;
  let y = 0;
  let node: HTMLElement | null = el;
  while (node && node !== root) {
    x += node.offsetLeft;
    y += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return { x: x + el.offsetWidth / 2, y: y + el.offsetHeight / 2 };
}
