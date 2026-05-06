"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const IMAGES = [
  "/aurora/aurora-1.jpg",
  "/aurora/aurora-2.jpg",
  "/aurora/aurora-3.jpg",
  "/aurora/aurora-4.jpg",
  "/aurora/aurora-5.jpg",
];

const SHOW_MS = 480;

interface Props {
  onSettle?: () => void;
}

export function AuroraSlideshow({ onSettle }: Props) {
  const [current, setCurrent] = useState(0);
  const onSettleRef = useRef(onSettle);
  onSettleRef.current = onSettle;

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCurrent(IMAGES.length - 1);
      onSettleRef.current?.();
      return;
    }

    if (current >= IMAGES.length - 1) {
      onSettleRef.current?.();
      return;
    }

    const t = setTimeout(() => setCurrent((c) => c + 1), SHOW_MS);
    return () => clearTimeout(t);
  }, [current]);

  return (
    <div className="absolute inset-0">
      {IMAGES.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0 transition-opacity duration-[380ms] ease-in-out"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <Image
            src={src}
            alt=""
            fill
            className="object-cover object-center"
            priority={i < 2}
            aria-hidden="true"
          />
        </div>
      ))}
    </div>
  );
}
