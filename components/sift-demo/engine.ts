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
    let lastWall = Date.now();
    const tick = (now: number) => {
      lastWall = Date.now();
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
    // Watchdog: some browsers (notably iOS Safari after an app switch) can drop a pending
    // frame callback without firing any event. If the page is visible and no frame has
    // ticked for a while, re-arm the loop. The next tick starts fresh, so time never jumps.
    const dog = window.setInterval(() => {
      if (document.visibilityState === "visible" && Date.now() - lastWall > 1200) {
        cancelAnimationFrame(raf);
        last = -1;
        lastWall = Date.now();
        raf = requestAnimationFrame(tick);
      }
    }, 1000);
    // coming back from the back/forward cache or a frozen tab: re-arm the same way
    const wake = () => {
      cancelAnimationFrame(raf);
      last = -1;
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("pageshow", wake);
    document.addEventListener("resume", wake);
    return () => {
      cancelAnimationFrame(raf);
      window.clearInterval(dog);
      window.removeEventListener("pageshow", wake);
      document.removeEventListener("resume", wake);
    };
  }, [running, durationMs, maxStepMs]);
}

/** False only once the element is fully off-screen (plus a margin), so a half-visible demo keeps playing. */
export function useInView(ref: RefObject<Element>, rootMargin = "120px 0px") {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0, rootMargin });
    io.observe(el);
    return () => io.disconnect();
  }, [ref, rootMargin]);
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
