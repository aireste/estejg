"use client";

export default function AboutSection() {
  return (
    <section id="about" className="relative py-24 md:py-32 bg-bg-soft overflow-hidden">
      <div className="container-x relative">
        {/* section header */}
        <div className="flex items-baseline justify-between mb-16 md:mb-20">
          <div>
            <div className="eyebrow mb-3">/ 01 — About</div>
            <h2 className="font-display font-bold text-5xl md:text-7xl tracking-tight">
              The builder
              <span className="amber-text">.</span>
            </h2>
          </div>
          <div className="hidden md:block font-mono text-[10.5px] uppercase tracking-[0.18em] text-muted">
            est. 2025
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* photo placeholder — left */}
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] w-full max-w-md bg-[rgba(10,10,10,0.04)] border border-[rgba(10,10,10,0.1)] overflow-hidden">
              {/* placeholder visual — silhouette */}
              <div className="absolute inset-0 flex items-center justify-center">
                <svg viewBox="0 0 100 120" className="w-1/2 h-1/2 text-[rgba(10,10,10,0.1)]" fill="currentColor">
                  <circle cx="50" cy="35" r="18" />
                  <path d="M 20 110 Q 20 70 50 70 Q 80 70 80 110 Z" />
                </svg>
              </div>

              {/* corner crosshairs */}
              <div className="absolute top-2 left-2 w-3 h-3 border-l border-t border-amber" />
              <div className="absolute top-2 right-2 w-3 h-3 border-r border-t border-amber" />
              <div className="absolute bottom-2 left-2 w-3 h-3 border-l border-b border-amber" />
              <div className="absolute bottom-2 right-2 w-3 h-3 border-r border-b border-amber" />

              {/* meta strip */}
              <div className="absolute bottom-0 left-0 right-0 px-3 py-2 bg-[rgba(10,10,10,0.85)] flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-bg">
                  ID · ESTEBAN_G
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-amber">
                  • REC
                </span>
              </div>

              {/* "photo coming soon" tag */}
              <div className="absolute top-3 right-3">
                <span className="font-mono text-[9px] uppercase tracking-[0.18em] px-2 py-1 bg-bg/90 border border-[rgba(10,10,10,0.1)] rounded-full">
                  Photo · soon
                </span>
              </div>
            </div>

            <div className="mt-4 font-mono text-[10.5px] uppercase tracking-[0.18em] text-muted">
              [ FRAME · 01 / 01 ] — esteban_guerra.jpg
            </div>
          </div>

          {/* bio — right */}
          <div className="lg:col-span-7 space-y-6">
            <p className="font-display text-2xl md:text-3xl leading-snug font-medium">
              Frontend builder with marketing analytics chops and real B2B
              experience. I know how the sales process works — because I built
              around it.
            </p>

            <p className="text-fg-soft text-base md:text-lg leading-relaxed">
              I studied marketing and data analytics at Purdue, then went into
              consulting at NTT DATA — data governance, stakeholder interviews,
              GenAI in healthcare. From there, I ran marketing automation at
              PivIT Global end-to-end: CRM workflows, lead scoring, email
              sequences, SEO. That hands-on B2B pipeline experience is what
              led me to build{" "}
              <a href="https://spctr.run" target="_blank" rel="noopener noreferrer" className="text-fg font-medium link-underline">SPCTR</a>.
              I&apos;m not a salesperson — but I understand exactly how B2B buyers
              move, and I build products that account for it.
            </p>

            <p className="text-fg-soft text-base md:text-lg leading-relaxed">
              Outside of work I&apos;m into Bitcoin, blockchain, and AI — anything
              that rewrites how things work. Most of what I build starts as a
              problem I ran into myself.
            </p>

            {/* stats grid */}
            <div className="grid grid-cols-3 gap-4 pt-6">
              <div className="border-t border-[rgba(10,10,10,0.15)] pt-4">
                <div className="font-display font-bold text-3xl md:text-4xl">
                  3<span className="amber-text">yrs</span>
                </div>
                <div className="eyebrow-muted mt-1">Industry exp.</div>
              </div>
              <div className="border-t border-[rgba(10,10,10,0.15)] pt-4">
                <div className="font-display font-bold text-3xl md:text-4xl">
                  20<span className="amber-text">+</span>
                </div>
                <div className="eyebrow-muted mt-1">Stakeholders interviewed</div>
              </div>
              <div className="border-t border-[rgba(10,10,10,0.15)] pt-4">
                <div className="font-display font-bold text-3xl md:text-4xl">
                  ∞
                </div>
                <div className="eyebrow-muted mt-1">Ideas / week</div>
              </div>
            </div>

            {/* skill tags — two groups */}
            <div className="pt-8 space-y-4">
              <div>
                <div className="eyebrow-muted mb-3">Marketing &amp; data</div>
                <div className="flex flex-wrap gap-2">
                  {["HubSpot", "Power BI", "Tableau", "RStudio", "Excel", "SEO / AEO", "MySQL"].map((skill) => (
                    <span key={skill} className="tag tag-amber">{skill}</span>
                  ))}
                </div>
              </div>
              <div>
                <div className="eyebrow-muted mb-3">Build stack</div>
                <div className="flex flex-wrap gap-2">
                  {["Next.js", "TypeScript", "React", "Tailwind", "Three.js", "Claude", "Vercel", "Figma"].map((skill) => (
                    <span key={skill} className="tag">{skill}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
