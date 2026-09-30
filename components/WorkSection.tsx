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

        <div className="grid gap-6 md:grid-cols-2 items-start">
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
  const [open, setOpen] = useState(false);
  const detailsId = `work-${p.slug}-details`;

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
  const toggle = () => setOpen((o) => !o);

  return (
    <article
      className={`group relative flex flex-col border transition-colors duration-300 overflow-hidden bg-[#141414] ${
        open ? "border-amber" : "border-[rgba(246,244,238,0.1)] hover:border-[rgba(246,244,238,0.3)]"
      }`}
    >
      {/* amber accent bar */}
      <div
        className={`absolute top-0 left-0 h-[3px] bg-amber transition-all duration-500 ease-out z-10 ${
          open ? "w-full" : "w-14 group-hover:w-full"
        }`}
      />

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

      {/* preview: clicking it opens the details too */}
      <div
        ref={wrapperRef}
        onClick={toggle}
        className="relative overflow-hidden w-full cursor-pointer"
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
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#141414] to-transparent pointer-events-none" />
      </div>

      {/* title bar: the toggle */}
      <button
        type="button"
        onClick={toggle}
        aria-expanded={open}
        aria-controls={detailsId}
        className="w-full flex items-center gap-3 px-6 md:px-8 py-5 text-left"
      >
        <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-[rgba(246,244,238,0.5)]">
          {num}
        </span>
        <h3 className="font-display font-bold text-xl md:text-2xl tracking-tight text-bg">
          {p.name}
        </h3>
        <span
          className={`ml-auto flex items-center gap-2.5 font-mono text-[10.5px] uppercase tracking-[0.16em] transition-colors duration-200 ${
            open ? "text-amber" : "text-[rgba(246,244,238,0.55)] group-hover:text-bg"
          }`}
        >
          {open ? "Close" : "Details"}
          <span
            aria-hidden="true"
            className={`relative w-3 h-3 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
              open ? "rotate-45" : ""
            }`}
          >
            <span className="absolute top-1/2 left-0 w-3 h-px bg-current" />
            <span className="absolute left-1/2 top-0 h-3 w-px bg-current" />
          </span>
        </span>
      </button>

      {/* details: grid-rows 0fr → 1fr animates to content height */}
      <div
        id={detailsId}
        className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div
            className={`px-6 md:px-8 pb-7 border-t border-[rgba(246,244,238,0.08)] pt-6 transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
              open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
            }`}
          >
            <div className="flex items-baseline justify-between gap-4 mb-4">
              <div className="font-display text-base text-amber">{p.tagline}</div>
              <span className="font-mono text-[10.5px] text-[rgba(246,244,238,0.4)] shrink-0">{p.year}</span>
            </div>

            <p className="text-[rgba(246,244,238,0.55)] text-sm leading-relaxed mb-6">{p.summary}</p>

            <ul className="mb-7 flex flex-wrap gap-2" aria-label="AI concepts">
              {p.ai.map((t) => (
                <li
                  key={t}
                  className="font-mono text-[10px] uppercase tracking-[0.14em] text-[rgba(246,244,238,0.6)] border border-[rgba(246,244,238,0.12)] px-2 py-1"
                >
                  {t}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap items-center gap-3">
              {p.visit && (
                <a
                  href={p.visit}
                  target="_blank"
                  rel="noopener noreferrer"
                  tabIndex={open ? 0 : -1}
                  className="inline-flex items-center gap-2 bg-bg text-fg font-mono text-[11px] uppercase tracking-[0.16em] px-4 py-2.5 border border-bg hover:bg-amber hover:border-amber hover:text-bg transition-colors duration-200"
                >
                  Visit site <span aria-hidden="true">↗</span>
                </a>
              )}
              <a
                href={`/work/${p.slug}`}
                tabIndex={open ? 0 : -1}
                className="inline-flex items-center gap-2 text-bg font-mono text-[11px] uppercase tracking-[0.16em] px-4 py-2.5 border border-[rgba(246,244,238,0.25)] hover:border-amber hover:text-amber transition-colors duration-200"
              >
                Case study <span aria-hidden="true">→</span>
              </a>
              {!p.visit && (
                <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.16em] text-[rgba(246,244,238,0.4)]">
                  Runs locally
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
