"use client";

// Digits that roll up from 0 on mount, one column per digit, transform only.
// Remount (change `key`) to roll again.

import { useEffect, useState } from "react";
import s from "./sift-demo.module.css";

const DIGITS = "0123456789".split("");
const SLOT = 100 / (DIGITS.length + 1); // one blank slot above 0: digits roll in from empty

export default function RollingNumber({ value, className }: { value: number; className?: string }) {
  const [live, setLive] = useState(false);
  useEffect(() => {
    const r = requestAnimationFrame(() => requestAnimationFrame(() => setLive(true)));
    return () => cancelAnimationFrame(r);
  }, []);
  const chars = value.toLocaleString("en-US").split("");
  const digitCount = chars.filter((c) => c !== ",").length;
  let di = 0;
  return (
    <span className={`${s.roll} ${className ?? ""}`} aria-label={value.toLocaleString("en-US")}>
      {chars.map((c, i) => {
        if (c === ",") {
          return (
            <span key={i} className={s.comma} data-live={live ? "1" : "0"} aria-hidden="true">
              ,
            </span>
          );
        }
        const d = Number(c);
        const order = digitCount - 1 - di++; // the ones column settles last
        return (
          <span key={i} className={s.col} aria-hidden="true">
            <span
              className={s.strip}
              style={{
                transform: `translateY(${live ? -(d + 1) * SLOT : 0}%)`,
                transitionDelay: `${(digitCount - 1 - order) * 45}ms`,
              }}
            >
              <span>&nbsp;</span>
              {DIGITS.map((x) => (
                <span key={x}>{x}</span>
              ))}
            </span>
          </span>
        );
      })}
    </span>
  );
}
