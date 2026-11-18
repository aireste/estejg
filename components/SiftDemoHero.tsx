"use client";

// estejg-only wrapper for the Sift demo. Server HTML (and no-JS, and
// reduced-motion) shows the static poster with the step words. With motion
// allowed, the demo code loads as its own chunk after hydration and plays over
// the poster, so no other page carries its weight.

import Image from "next/image";
import { useEffect, useState } from "react";
import Caption from "./sift-demo/Caption";
import { siftStory } from "./sift-demo/storyboard";
import { siftDark, skinStyle } from "./sift-demo/skin";
type DemoComp = typeof import("./sift-demo/SiftDemo").default;

export default function SiftDemoHero({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const [Demo, setDemo] = useState<DemoComp | null>(null);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    let alive = true;
    const sync = () => {
      setReduce(mq.matches);
      if (!mq.matches) {
        import("./sift-demo/SiftDemo").then((m) => alive && setDemo(() => m.default));
      }
    };
    sync();
    mq.addEventListener("change", sync);
    return () => {
      alive = false;
      mq.removeEventListener("change", sync);
    };
  }, []);

  const poster = (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(min-width: 1200px) 1152px, 100vw"
      className="object-cover object-top"
      priority
    />
  );

  if (Demo && !reduce) {
    return <Demo story={siftStory} skin={siftDark} poster={poster} className={className} />;
  }

  const c = siftStory.captions;
  return (
    <figure className={className} style={skinStyle(siftDark)}>
      <div className="relative aspect-[16/10] border border-[rgba(246,244,238,0.1)] overflow-hidden">{poster}</div>
      <figcaption>
        {reduce ? (
          <ol className="mt-4 grid sm:grid-cols-2 gap-x-10 gap-y-2">
            {c.map((x, i) => (
              <li key={x.word} className="grid grid-cols-[auto_1fr] gap-3 text-sm leading-relaxed">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[rgba(246,244,238,0.85)] pt-0.5 w-[5.5rem]">
                  {String(i + 1).padStart(2, "0")} {x.word}
                </span>
                <span className="text-[rgba(246,244,238,0.6)]">{x.line}</span>
              </li>
            ))}
          </ol>
        ) : (
          <Caption captions={c} active={-1} line="Find, check, look up owners, verify, review, draft. Every paid step asks first." />
        )}
      </figcaption>
    </figure>
  );
}
