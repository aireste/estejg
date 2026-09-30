"use client";

import Link from "next/link";
import { useState } from "react";
import { LEVELS, skills, type Skill } from "@/lib/skills";
import { getProject, projects } from "@/lib/projects";

const PREVIEW_COUNT = 6;

// Tabs: "All" plus every project that has at least one skill
const tabs = [
  { id: "all", label: "All", count: skills.length },
  ...projects
    .map((p) => ({
      id: p.slug,
      label: p.name,
      count: skills.filter((s) => s.project === p.slug).length,
    }))
    .filter((t) => t.count > 0),
];

export default function SkillsSection() {
  const [tab, setTab] = useState("all");
  const [open, setOpen] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  const filtered = tab === "all" ? skills : skills.filter((s) => s.project === tab);
  const visible = tab === "all" && !showAll ? filtered.slice(0, PREVIEW_COUNT) : filtered;
  const hidden = filtered.length - visible.length;

  return (
    <section id="skills" className="relative py-24 md:py-32">
      <div className="container-x relative z-10">
        {/* header */}
        <div className="grid md:grid-cols-12 gap-8 mb-14 md:mb-16">
          <div className="md:col-span-7">
            <h2 className="font-display font-bold text-5xl md:text-7xl tracking-tight leading-[0.95] text-bg">
              Learning in public<span className="amber-text">.</span>
            </h2>
          </div>
          <div className="md:col-span-5 md:pt-3">
            <p className="text-[rgba(246,244,238,0.55)] text-base md:text-lg leading-relaxed">
              I keep a build journal. Every time a project teaches me something
              about wiring AI into real software, it goes on this list, along
              with how far I&apos;ve taken it. Open any one for the story.
            </p>
          </div>
        </div>

        {/* controls */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-6">
          <div role="tablist" aria-label="Filter skills by project" className="flex flex-wrap gap-1.5">
            {tabs.map((t) => {
              const active = tab === t.id;
              return (
                <button
                  key={t.id}
                  role="tab"
                  aria-selected={active}
                  onClick={() => {
                    setTab(t.id);
                    setOpen(null);
                  }}
                  className={`font-mono text-[10.5px] uppercase tracking-[0.14em] px-3 py-2 border transition-colors duration-200 ${
                    active
                      ? "bg-bg text-fg border-bg"
                      : "text-[rgba(246,244,238,0.55)] border-[rgba(246,244,238,0.12)] hover:border-[rgba(246,244,238,0.35)] hover:text-bg"
                  }`}
                >
                  {t.label}
                  <span className={`ml-2 ${active ? "text-[rgba(10,10,10,0.5)]" : "text-[rgba(246,244,238,0.3)]"}`}>
                    {t.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* legend */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[10px] uppercase tracking-[0.16em] text-[rgba(246,244,238,0.4)]">
            {LEVELS.map((l, i) => (
              <span key={l} className="flex items-center gap-2">
                <Meter filled={i + 1} />
                {l}
              </span>
            ))}
          </div>
        </div>

        {/* rows */}
        <ul key={tab} className="border-b border-[rgba(246,244,238,0.08)]">
          {visible.map((s, i) => (
            <SkillRow
              key={s.name}
              skill={s}
              index={i}
              isOpen={open === s.name}
              onToggle={() => setOpen(open === s.name ? null : s.name)}
            />
          ))}
        </ul>

        {tab === "all" && (hidden > 0 || showAll) && (
          <button
            onClick={() => {
              setShowAll(!showAll);
              if (showAll) document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="mt-8 font-mono text-[11px] uppercase tracking-[0.18em] text-[rgba(246,244,238,0.55)] hover:text-amber transition-colors"
          >
            {showAll ? "Show fewer ↑" : `Show all ${filtered.length} ↓`}
          </button>
        )}
      </div>
    </section>
  );
}

function SkillRow({
  skill: s,
  index,
  isOpen,
  onToggle,
}: {
  skill: Skill;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const project = s.project ? getProject(s.project) : undefined;
  const id = `skill-${s.name.replace(/\W+/g, "-").toLowerCase()}`;

  return (
    <li
      className="skill-row border-t border-[rgba(246,244,238,0.08)]"
      style={{ animationDelay: `${Math.min(index, 8) * 40}ms` }}
    >
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={id}
        className="group w-full grid grid-cols-[1fr_auto_auto] items-center gap-4 md:gap-8 py-5 text-left"
      >
        <h3
          className={`font-display font-medium text-lg md:text-xl tracking-tight transition-colors duration-200 ${
            isOpen ? "text-amber" : "text-bg group-hover:text-amber"
          }`}
        >
          {s.name}
        </h3>
        <span className="hidden sm:flex items-center gap-2.5 font-mono text-[10.5px] uppercase tracking-[0.14em] text-[rgba(246,244,238,0.5)] w-40">
          <Meter filled={LEVELS.indexOf(s.level) + 1} />
          {s.level}
        </span>
        <span
          aria-hidden="true"
          className={`relative w-3 h-3 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
            isOpen ? "rotate-45" : ""
          }`}
        >
          <span className="absolute top-1/2 left-0 w-3 h-px bg-[rgba(246,244,238,0.6)]" />
          <span className="absolute left-1/2 top-0 h-3 w-px bg-[rgba(246,244,238,0.6)]" />
        </span>
      </button>

      {/* expanding panel: grid-rows 0fr → 1fr animates to content height */}
      <div
        id={id}
        role="region"
        className={`grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div
            className={`pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4 transition-opacity duration-300 ${
              isOpen ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="max-w-xl">
              <span className="sm:hidden flex items-center gap-2.5 font-mono text-[10.5px] uppercase tracking-[0.14em] text-amber mb-3">
                <Meter filled={LEVELS.indexOf(s.level) + 1} />
                {s.level}
              </span>
              <p className="text-[rgba(246,244,238,0.6)] text-sm md:text-base leading-relaxed">
                {s.where}
              </p>
            </div>
            {project && (
              <Link
                href={`/work/${project.slug}`}
                tabIndex={isOpen ? 0 : -1}
                className="shrink-0 font-mono text-[10.5px] uppercase tracking-[0.16em] text-amber hover:text-bg transition-colors"
              >
                Read the {project.name} case study →
              </Link>
            )}
          </div>
        </div>
      </div>
    </li>
  );
}

function Meter({ filled }: { filled: number }) {
  return (
    <span className="flex gap-[3px]" aria-hidden="true">
      {LEVELS.map((_, i) => (
        <span
          key={i}
          className={`w-[10px] h-[4px] ${i < filled ? "bg-amber" : "bg-[rgba(246,244,238,0.14)]"}`}
        />
      ))}
    </span>
  );
}
