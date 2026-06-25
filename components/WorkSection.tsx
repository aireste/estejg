"use client";

import { useEffect, useRef, useState } from "react";

type Project = {
  num: string;
  name: string;
  tagline: string;
  description?: string;
  url?: string;
  year: string;
};

const projects: Project[] = [
  {
    num: "01",
    name: "SPCTR",
    tagline: "We prospect. You close.",
    description:
      "I founded SPCTR and built it top to bottom — brand, front-end, back-end, and the AI-powered outreach engine that fills your calendar with sales meetings.",
    url: "https://spctr.run",
    year: "2025",
  },
];

const IFRAME_W = 1440;
const IFRAME_H = 900;
const PREVIEW_H = 300;

export default function WorkSection() {
  return (
    <section id="work" className="relative py-24 md:py-32">

      <div className="container-x relative z-10">
        {/* header */}
        <div className="flex items-end justify-between mb-16 md:mb-20">
          <h2 className="font-display font-bold text-5xl md:text-7xl tracking-tight leading-[0.95] text-bg">
            My work<span className="amber-text">.</span>
          </h2>
          <div className="hidden md:block text-right">
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[rgba(246,244,238,0.35)] mb-1.5">Showing</div>
            <div className="font-display font-bold text-2xl text-bg">
              {String(projects.length).padStart(2, "0")} /{" "}
              {String(projects.length).padStart(2, "0")}
            </div>
          </div>
        </div>

        {/* grid — 1 col now, becomes 2 col as you add projects */}
        <div
          className="grid gap-6 md:grid-cols-2"
        >
          {projects.map((p) => (
            <ProjectCard key={p.num} {...p} />
          ))}

          {/* placeholder */}
          <div className="group border border-dashed border-[rgba(246,244,238,0.12)] p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:border-amber transition-colors">
            <div>
              <div className="font-display font-bold text-2xl md:text-3xl text-bg">
                More projects in the pipeline
                <span className="amber-text">_</span>
              </div>
              <div className="text-[rgba(246,244,238,0.5)] mt-2 text-sm">
                Currently building. Check back, or{" "}
                <a href="#contact" className="text-bg font-medium link-underline">
                  get in touch
                </a>{" "}
                if you want a sneak peek.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ num, name, tagline, description, url }: Project) {
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
      className="group relative block border border-[rgba(246,244,238,0.1)] hover:border-amber transition-all duration-300 overflow-hidden bg-[rgba(246,244,238,0.03)]"
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
        <div className="flex-1 px-3 py-1 rounded bg-[rgba(246,244,238,0.08)] font-mono text-[10.5px] text-[rgba(246,244,238,0.35)] truncate">
          {url?.replace("https://", "") ?? name.toLowerCase()}
        </div>
        <span className="font-mono text-[10.5px] text-[rgba(246,244,238,0.35)] group-hover:text-amber transition-colors shrink-0">
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
        <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#0a0a0a] to-transparent pointer-events-none" />
        {/* hover overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="font-mono text-xs uppercase tracking-[0.18em] bg-[#f6f4ee] text-[#0a0a0a] px-5 py-2.5 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            Visit site →
          </span>
        </div>
      </div>

      {/* info strip */}
      <div className="p-6 md:p-8 border-t border-[rgba(246,244,238,0.08)]">
        <div className="flex items-start justify-between gap-6 mb-4">
          <div>
            <div className="flex items-baseline gap-2.5 mb-1">
              <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-[rgba(246,244,238,0.35)]">
                {num}
              </span>
              <h3 className="font-display font-bold text-2xl md:text-3xl tracking-tight text-bg">
                {name}
              </h3>
            </div>
            <div className="font-display text-base text-amber">{tagline}</div>
          </div>
        </div>

        {description && (
          <p className="text-[rgba(246,244,238,0.55)] text-sm leading-relaxed mb-4">{description}</p>
        )}

      </div>
    </a>
  );
}
