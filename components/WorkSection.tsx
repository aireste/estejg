"use client";

import { useEffect, useRef, useState } from "react";

type Project = {
  num: string;
  name: string;
  tagline: string;
  url?: string;
  year: string;
  role: string;
  tags: string[];
};

const projects: Project[] = [
  {
    num: "01",
    name: "SPCTR",
    tagline: "Lead-gen, weaponized.",
    url: "https://spctr.run",
    year: "2025",
    role: "Founder · Designer · Engineer",
    tags: ["Next.js 14", "TypeScript", "Three.js", "Tailwind", "Vercel"],
  },
];

const IFRAME_W = 1440;
const IFRAME_H = 900;
const PREVIEW_H = 420;

export default function WorkSection() {
  return (
    <section id="work" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 grid-lines opacity-40 pointer-events-none" />

      <div className="container-x relative">
        {/* header */}
        <div className="flex items-end justify-between mb-16 md:mb-20">
          <h2 className="font-display font-bold text-5xl md:text-7xl tracking-tight leading-[0.95]">
            Selected
            <br />
            projects<span className="amber-text">.</span>
          </h2>
          <div className="hidden md:block text-right">
            <div className="eyebrow-muted mb-1.5">Showing</div>
            <div className="font-display font-bold text-2xl">
              {String(projects.length).padStart(2, "0")} /{" "}
              {String(projects.length).padStart(2, "0")}
            </div>
          </div>
        </div>

        {/* grid — 1 col now, becomes 2 col as you add projects */}
        <div
          className={`grid gap-6 ${
            projects.length > 1 ? "md:grid-cols-2" : "grid-cols-1"
          }`}
        >
          {projects.map((p) => (
            <ProjectCard key={p.num} {...p} />
          ))}

          {/* placeholder */}
          <div className="group border border-dashed border-[rgba(10,10,10,0.2)] p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:border-amber transition-colors">
            <div>
              <div className="font-display font-bold text-2xl md:text-3xl">
                More projects in the pipeline
                <span className="amber-text">_</span>
              </div>
              <div className="text-fg-soft mt-2 text-sm">
                Currently building. Check back, or{" "}
                <a href="#contact" className="text-fg font-medium link-underline">
                  get in touch
                </a>{" "}
                if you want a sneak peek.
              </div>
            </div>
            <div className="font-mono text-xs uppercase tracking-[0.18em] text-amber group-hover:translate-x-1 transition-transform shrink-0">
              [ WIP ]
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ num, name, tagline, url, year, role, tags }: Project) {
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
      href={url ?? "#"}
      target={url ? "_blank" : undefined}
      rel={url ? "noopener noreferrer" : undefined}
      className="group relative block border border-[rgba(10,10,10,0.08)] hover:border-amber transition-all duration-300 overflow-hidden bg-bg-soft"
    >
      {/* amber accent bar */}
      <div className="absolute top-0 left-0 h-[3px] w-14 bg-amber group-hover:w-full transition-all duration-500 ease-out z-10" />

      {/* browser chrome */}
      <div className="flex items-center gap-3 px-4 py-3 bg-bg border-b border-[rgba(10,10,10,0.07)]">
        <div className="flex gap-1.5 shrink-0">
          {["bg-[rgba(10,10,10,0.12)]", "bg-[rgba(10,10,10,0.12)]", "bg-[rgba(10,10,10,0.12)]"].map(
            (c, i) => (
              <div key={i} className={`w-2.5 h-2.5 rounded-full ${c}`} />
            )
          )}
        </div>
        <div className="flex-1 px-3 py-1 rounded bg-[rgba(10,10,10,0.05)] font-mono text-[10.5px] text-muted truncate">
          {url?.replace("https://", "") ?? name.toLowerCase()}
        </div>
        <span className="font-mono text-[10.5px] text-muted group-hover:text-amber transition-colors shrink-0">
          ↗
        </span>
      </div>

      {/* iframe preview */}
      <div
        ref={wrapperRef}
        className="relative overflow-hidden w-full"
        style={{ height: visibleH }}
      >
        <iframe
          src={url}
          title={name}
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
        {/* fade to info strip */}
        <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-bg-soft to-transparent pointer-events-none" />
        {/* hover overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="font-mono text-xs uppercase tracking-[0.18em] bg-fg text-bg px-5 py-2.5 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            Visit site →
          </span>
        </div>
      </div>

      {/* info strip */}
      <div className="p-6 md:p-8 border-t border-[rgba(10,10,10,0.08)]">
        <div className="flex items-start justify-between gap-6 mb-4">
          <div>
            <div className="flex items-baseline gap-2.5 mb-1">
              <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-muted">
                {num}
              </span>
              <h3 className="font-display font-bold text-2xl md:text-3xl tracking-tight">
                {name}
              </h3>
            </div>
            <div className="font-display text-base text-amber">{tagline}</div>
          </div>
          <div className="text-right shrink-0">
            <div className="eyebrow-muted mb-0.5">Year</div>
            <div className="font-mono text-sm">{year}</div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((t) => (
            <span key={t} className="tag">
              {t}
            </span>
          ))}
        </div>

        <div className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-muted">
          {role}
        </div>
      </div>
    </a>
  );
}
