"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface GooeyTextProps {
  texts: string[];
  morphTime?: number;
  cooldownTime?: number;
  random?: boolean;
  className?: string;
  textClassName?: string;
}

export function GooeyText({
  texts,
  morphTime = 1,
  cooldownTime = 0.25,
  random = false,
  className,
  textClassName,
}: GooeyTextProps) {
  const text1Ref = React.useRef<HTMLSpanElement>(null);
  const text2Ref = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    // Start so that text2 (visible) shows texts[0] = "Hello"
    let textIndex = texts.length - 1;
    let nextIndex = 1; // first transition goes to index 1
    let time = new Date();
    let morph = 0;
    let cooldown = cooldownTime;

    const pickNext = (currentVisible: number) => {
      if (!random) return (currentVisible + 1) % texts.length;
      let next;
      do { next = Math.floor(Math.random() * texts.length); }
      while (next === currentVisible && texts.length > 1);
      return next;
    };

    const setMorph = (fraction: number) => {
      if (text1Ref.current && text2Ref.current) {
        text2Ref.current.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
        text2Ref.current.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;
        fraction = 1 - fraction;
        text1Ref.current.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
        text1Ref.current.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;
      }
    };

    const doCooldown = () => {
      morph = 0;
      if (text1Ref.current && text2Ref.current) {
        text2Ref.current.style.filter = "";
        text2Ref.current.style.opacity = "100%";
        text1Ref.current.style.filter = "";
        text1Ref.current.style.opacity = "0%";
      }
    };

    const doMorph = () => {
      morph -= cooldown;
      cooldown = 0;
      let fraction = morph / morphTime;
      if (fraction > 1) {
        cooldown = cooldownTime;
        fraction = 1;
      }
      setMorph(fraction);
    };

    let frame: number;
    function animate() {
      frame = requestAnimationFrame(animate);
      const newTime = new Date();
      const shouldIncrementIndex = cooldown > 0;
      const dt = (newTime.getTime() - time.getTime()) / 1000;
      time = newTime;
      cooldown -= dt;

      if (cooldown <= 0) {
        if (shouldIncrementIndex) {
          const currentVisible = nextIndex;
          textIndex = currentVisible;
          nextIndex = pickNext(currentVisible);
          if (text1Ref.current && text2Ref.current) {
            text1Ref.current.textContent = texts[textIndex];
            text2Ref.current.textContent = texts[nextIndex];
          }
        }
        doMorph();
      } else {
        doCooldown();
      }
    }

    // Initialise spans so text2 shows texts[0] immediately
    if (text1Ref.current && text2Ref.current) {
      text1Ref.current.textContent = texts[texts.length - 1];
      text2Ref.current.textContent = texts[0];
    }

    animate();
    return () => cancelAnimationFrame(frame);
  }, [texts, morphTime, cooldownTime, random]);

  return (
    <div className={cn("relative", className)}>
      <svg className="absolute h-0 w-0" aria-hidden="true" focusable="false">
        <defs>
          <filter id="gooey-threshold">
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 255 -140"
            />
          </filter>
        </defs>
      </svg>
      <div
        className="flex h-full items-center justify-start"
        style={{ filter: "url(#gooey-threshold)" }}
      >
        <span
          ref={text1Ref}
          className={cn("absolute inline-block select-none whitespace-nowrap", textClassName)}
        />
        <span
          ref={text2Ref}
          className={cn("absolute inline-block select-none whitespace-nowrap", textClassName)}
        />
      </div>
    </div>
  );
}
