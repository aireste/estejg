"use client";

type Project = {
  num: string;
  name: string;
  tagline: string;
  description: string;
  url?: string;
  status: "live" | "soon" | "wip";
  year: string;
  role: string;
  tags: string[];
  accent?: string;
};

const projects: Project[] = [
  {
    num: "01",
    name: "SPCTR",
    tagline: "Lead-gen, weaponized.",
    description:
      "A lead-generation agency for B2B teams. Tactical dark site with a Three.js globe, custom design system, and a contact pipeline that actually converts. Built end-to-end, deployed on Vercel.",
    url: "https://spctr.run",
    status: "live",
    year: "2025",
    role: "Founder · Designer · Engineer",
    tags: ["Next.js 14", "TypeScript", "Three.js", "Tailwind", "Vercel"],
  },
];

export default function WorkSection() {
  return (
    <section id="work" className="relative py-24 md:py-32 overflow-hidden">
      {/* faint grid lines bg */}
      <div className="absolute inset-0 grid-lines opacity-40 pointer-events-none" />

      <div className="container-x relative">
        {/* section header */}
        <div className="flex items-end justify-between mb-16 md:mb-20">
          <div>
            <div className="eyebrow mb-3">/ 02 — Work</div>
            <h2 className="font-display font-bold text-5xl md:text-7xl tracking-tight leading-[0.95]">
              Selected
              <br />
              projects<span className="amber-text">.</span>
            </h2>
          </div>
          <div className="hidden md:block text-right">
            <div className="eyebrow-muted mb-1.5">Showing</div>
            <div className="font-display font-bold text-2xl">
              {String(projects.length).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
            </div>
          </div>
        </div>

        {/* projects */}
        <div className="space-y-8">
          {projects.map((p) => (
            <ProjectCard key={p.num} {...p} />
          ))}

          {/* "more soon" placeholder card */}
          <div className="group relative border border-dashed border-[rgba(10,10,10,0.2)] p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:border-amber transition-colors">
            <div>
              <div className="eyebrow-muted mb-2">/ 02</div>
              <div className="font-display font-bold text-2xl md:text-3xl">
                More projects in the pipeline<span className="amber-text">_</span>
              </div>
              <div className="text-fg-soft mt-2 text-sm">
                Currently building. Check back, or{" "}
                <a href="#contact" className="text-fg font-medium link-underline">get in touch</a>{" "}
                if you want a sneak peek.
              </div>
            </div>
            <div className="font-mono text-xs uppercase tracking-[0.18em] text-amber group-hover:translate-x-1 transition-transform">
              [ WIP ]
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ num, name, tagline, description, url, status, year, role, tags }: Project) {
  const statusLabel =
    status === "live" ? "● LIVE" : status === "wip" ? "○ WIP" : "○ SOON";
  const statusColor =
    status === "live" ? "text-green-600" : "text-amber";

  return (
    <a
      href={url || "#"}
      target={url ? "_blank" : undefined}
      rel={url ? "noopener noreferrer" : undefined}
      className="group relative block bg-bg-soft border border-[rgba(10,10,10,0.08)] hover:border-amber transition-all duration-300 overflow-hidden"
    >
      {/* amber bar that grows on hover */}
      <div className="absolute top-0 left-0 h-[3px] w-12 bg-amber group-hover:w-full transition-all duration-500 ease-out" />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
        {/* left: meta */}
        <div className="md:col-span-3 p-6 md:p-8 md:border-r border-[rgba(10,10,10,0.08)] flex flex-col justify-between min-h-[260px]">
          <div>
            <div className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-muted mb-1">
              Project
            </div>
            <div className="font-display font-bold text-5xl md:text-6xl leading-none">
              {num}
            </div>
          </div>
          <div className="mt-6 space-y-3">
            <div>
              <div className="eyebrow-muted mb-1">Year</div>
              <div className="font-mono text-sm">{year}</div>
            </div>
            <div>
              <div className="eyebrow-muted mb-1">Status</div>
              <div className={`font-mono text-xs tracking-[0.14em] ${statusColor}`}>
                {statusLabel}
              </div>
            </div>
          </div>
        </div>

        {/* center: content */}
        <div className="md:col-span-6 p-6 md:p-8 md:border-r border-[rgba(10,10,10,0.08)]">
          <div className="flex items-baseline gap-3 mb-3">
            <h3 className="font-display font-bold text-3xl md:text-4xl tracking-tight">
              {name}
            </h3>
            {url && (
              <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-muted group-hover:text-amber transition-colors">
                ↗ {url.replace("https://", "")}
              </span>
            )}
          </div>
          <div className="font-display text-lg md:text-xl text-amber mb-4">
            {tagline}
          </div>
          <p className="text-fg-soft text-sm md:text-base leading-relaxed mb-6">
            {description}
          </p>
          <div className="flex flex-wrap gap-2">
            {tags.map((t) => (
              <span key={t} className="tag">
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* right: visual / role */}
        <div className="md:col-span-3 p-6 md:p-8 flex flex-col justify-between bg-[rgba(10,10,10,0.02)]">
          <div>
            <div className="eyebrow-muted mb-2">Role</div>
            <div className="font-display text-base font-semibold leading-snug">
              {role}
            </div>
          </div>

          {/* mini ascii-style visual */}
          <div className="mt-6 font-mono text-[10px] leading-tight text-amber/70 select-none">
            <div>┌─────────────┐</div>
            <div>│  ▓▓▓▓░░░░░  │</div>
            <div>│  ░▓▓▓▓░░░░  │</div>
            <div>│  ░░▓▓▓▓░░░  │</div>
            <div>└─────────────┘</div>
          </div>

          <div className="mt-6 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-fg group-hover:text-amber transition-colors">
            View
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </div>
        </div>
      </div>
    </a>
  );
}
