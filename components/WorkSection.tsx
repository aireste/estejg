"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { projects, type Project } from "@/lib/projects";

const IFRAME_W = 1440;
const IFRAME_H = 900;
const PREVIEW_H = 300;

export default function WorkSection() {
  return (
    <section id="work" className="relative py-24 md:py-32">

      <div className="container-x relative z-10">
        {/* header */}
        <div className="flex items-end justify-between mb-16 md:mb-20">
          <div>
            <h2 className="font-display font-bold text-5xl md:text-7xl tracking-tight leading-[0.95] text-bg">
              My work<span className="amber-text">.</span>
            </h2>
            <p className="text-[rgba(246,244,238,0.55)] text-base md:text-lg leading-relaxed max-w-xl mt-6">
              Real products, built with AI end to end. Each one has a write-up:
              what I built, how the pieces connect, and what broke along the way.
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} num={String(i + 1).padStart(2, "0")} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project: p, num }: { project: Project; num: string }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(PREVIEW_H / IFRAME_H);

  useEffect(() => {
    const update = () => {
      if (wrapperRef.current) {
        setScale(wrapperRef.current.clientWidth / IFRAME_W);
      }
    };
    update();
    const ro = new ResizeObserver(update);
    if (wrapperRef.current) ro.observe(wrapperRef.current);
    return () => ro.disconnect();
  }, []);

  const visibleH = Math.min(IFRAME_H * scale, PREVIEW_H);

  return (
    <a
      href={`/work/${p.slug}`}
      className="group relative flex flex-col border border-[rgba(246,244,238,0.1)] hover:border-amber transition-colors duration-300 overflow-hidden bg-[#141414]"
    >
      {/* amber accent bar */}
      <div className="absolute top-0 left-0 h-[3px] w-14 bg-amber group-hover:w-full transition-all duration-500 ease-out z-10" />

      {/* browser chrome */}
      <div className="flex items-center gap-3 px-4 py-3 bg-[rgba(0,0,0,0.4)] border-b border-[rgba(246,244,238,0.08)]">
        <div className="flex gap-1.5 shrink-0">
          {[0, 1, 2].map((i) => (
            <div key={i} className="w-2.5 h-2.5 rounded-full bg-[rgba(246,244,238,0.15)]" />
          ))}
        </div>
        <div className="flex-1 px-3 py-1 rounded bg-[rgba(246,244,238,0.08)] font-mono text-[10.5px] text-[rgba(246,244,238,0.5)] truncate">
          {p.address}
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] shrink-0 flex items-center gap-1.5 text-[rgba(246,244,238,0.5)]">
          <span
            className={`w-1.5 h-1.5 ${p.status === "Live" ? "bg-[#4ade80]" : "bg-[rgba(246,244,238,0.35)]"}`}
          />
          {p.status}
        </span>
      </div>

      {/* preview */}
      <div
        ref={wrapperRef}
        className="relative overflow-hidden w-full"
        style={{ height: visibleH }}
      >
        {p.preview.kind === "iframe" ? (
          <iframe
            src={p.preview.src}
            title={p.name}
            loading="lazy"
            tabIndex={-1}
            aria-hidden="true"
            className="absolute top-0 left-0 border-0 pointer-events-none"
            style={{
              width: IFRAME_W,
              height: IFRAME_H,
              transform: `scale(${scale})`,
              transformOrigin: "top left",
            }}
          />
        ) : (
          <Image
            src={p.preview.src}
            alt={p.preview.alt}
            fill
            sizes="(min-width: 768px) 600px, 100vw"
            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02]"
          />
        )}
        {/* fade to info strip */}
        <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#0a0a0a] to-transparent pointer-events-none" />
        {/* hover overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="font-mono text-xs uppercase tracking-[0.18em] bg-[#f6f4ee] text-[#0a0a0a] px-5 py-2.5 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            View case study →
          </span>
        </div>
      </div>

      {/* info strip */}
      <div className="flex-1 flex flex-col p-6 md:p-8 border-t border-[rgba(246,244,238,0.08)]">
        <div className="flex items-baseline gap-2.5 mb-1">
          <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-[rgba(246,244,238,0.5)]">
            {num}
          </span>
          <h3 className="font-display font-bold text-2xl md:text-3xl tracking-tight text-bg">
            {p.name}
          </h3>
          <span className="ml-auto font-mono text-[10.5px] text-[rgba(246,244,238,0.4)]">
            {p.year}
          </span>
        </div>
        <div className="font-display text-base text-amber mb-4">{p.tagline}</div>

        <p className="text-[rgba(246,244,238,0.55)] text-sm leading-relaxed mb-6">{p.summary}</p>

        <ul className="mt-auto flex flex-wrap gap-2" aria-label="AI concepts">
          {p.ai.map((t) => (
            <li
              key={t}
              className="font-mono text-[10px] uppercase tracking-[0.14em] text-[rgba(246,244,238,0.6)] border border-[rgba(246,244,238,0.12)] px-2 py-1"
            >
              {t}
            </li>
          ))}
        </ul>
      </div>
    </a>
  );
}
