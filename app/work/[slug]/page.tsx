import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/lib/projects";

// SPCTR has its own hand-built page at /work/spctr, so only projects
// with case-study data are generated here.
export function generateStaticParams() {
  return projects.filter((p) => p.caseStudy).map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = getProject(params.slug);
  if (!p) return {};
  return {
    title: `${p.name} — Case Study | Esteban Guerra`,
    description: p.summary,
  };
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const p = getProject(params.slug);
  if (!p?.caseStudy) notFound();
  const cs = p.caseStudy;

  const index = projects.indexOf(p);
  const next = projects[(index + 1) % projects.length];

  const meta = [
    { label: "Role", value: p.role },
    { label: "Stack", value: p.stack.join(" · ") },
    { label: "Year", value: p.year },
    { label: "Status", value: p.status },
  ];

  return (
    <main className="bg-fg min-h-screen text-bg">
      {/* top bar */}
      <header className="container-x flex items-center justify-between py-6">
        <Link
          href="/#work"
          className="font-mono text-[11px] uppercase tracking-[0.18em] text-[rgba(246,244,238,0.5)] hover:text-amber transition-colors"
        >
          ← Esteban Guerra
        </Link>
        {p.links[0] && (
          <a
            href={p.links[0].href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[11px] uppercase tracking-[0.18em] text-[rgba(246,244,238,0.5)] hover:text-amber transition-colors"
          >
            {p.links[0].label} ↗
          </a>
        )}
      </header>

      {/* hero */}
      <section className="container-x pt-16 md:pt-24 pb-20 md:pb-28">
        <div className="eyebrow mb-6 fade-up">
          Case study — {String(index + 1).padStart(2, "0")}
        </div>
        <h1
          className="font-display font-bold text-6xl md:text-8xl tracking-tight leading-[0.95] fade-up"
          style={{ animationDelay: "0.1s" }}
        >
          {p.name}
          <span className="amber-text">.</span>
        </h1>
        <p
          className="font-display text-xl md:text-2xl text-amber mt-4 fade-up"
          style={{ animationDelay: "0.2s" }}
        >
          {p.tagline}
        </p>
        <p
          className="text-[rgba(246,244,238,0.6)] text-base md:text-lg leading-relaxed max-w-2xl mt-8 fade-up"
          style={{ animationDelay: "0.3s" }}
        >
          {p.summary}
        </p>

        {/* meta row */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-14 pt-8 border-t border-[rgba(246,244,238,0.1)] fade-up"
          style={{ animationDelay: "0.4s" }}
        >
          {meta.map((m) => (
            <div key={m.label}>
              <div className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-[rgba(246,244,238,0.35)] mb-2">
                {m.label}
              </div>
              <div className="font-display font-medium text-sm md:text-base">{m.value}</div>
            </div>
          ))}
        </div>

        {cs.credit && (
          <p className="mt-10 font-mono text-[11px] leading-relaxed text-[rgba(246,244,238,0.45)] max-w-2xl border-l-2 border-amber pl-4">
            {cs.credit}
          </p>
        )}

        {p.preview.kind === "image" && (
          <div
            className="relative mt-14 aspect-[16/10] border border-[rgba(246,244,238,0.1)] overflow-hidden fade-up"
            style={{ animationDelay: "0.5s" }}
          >
            <Image
              src={p.preview.src}
              alt={p.preview.alt}
              fill
              sizes="(min-width: 1200px) 1152px, 100vw"
              className="object-cover object-top"
              priority
            />
          </div>
        )}
      </section>

      {/* 01 — the problem */}
      <Chapter num="01" label="The problem" heading={cs.problem.heading}>
        {cs.problem.body.map((t) => (
          <Body key={t}>{t}</Body>
        ))}
      </Chapter>

      {/* 02 — the build */}
      <Chapter num="02" label="The build" heading={cs.build.heading}>
        {cs.build.body.map((t) => (
          <Body key={t}>{t}</Body>
        ))}
      </Chapter>

      {/* 03 — architecture */}
      <Chapter num="03" label="Architecture" heading={cs.architecture.heading}>
        <Body>{cs.architecture.intro}</Body>
        <ol className="mt-4">
          {cs.architecture.flow.map((step, i) => (
            <li key={step.label} className="relative grid grid-cols-[auto_1fr] gap-5 md:gap-8">
              {/* rail */}
              <div className="flex flex-col items-center">
                <span className="w-3 h-3 border border-amber bg-fg mt-5 shrink-0" />
                {i < cs.architecture.flow.length - 1 && (
                  <span className="w-px flex-1 bg-[rgba(246,244,238,0.15)]" />
                )}
              </div>
              <div className="py-3.5 border-b border-[rgba(246,244,238,0.06)]">
                <div className="font-display font-bold text-lg md:text-xl tracking-tight">
                  {step.label}
                </div>
                <div className="font-mono text-[11.5px] text-[rgba(246,244,238,0.5)] mt-1 leading-relaxed">
                  {step.detail}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </Chapter>

      {/* 04 — AI concepts */}
      <Chapter num="04" label="AI concepts" heading="What this taught me about building with AI.">
        <div className="grid sm:grid-cols-2 gap-px bg-[rgba(246,244,238,0.08)] border border-[rgba(246,244,238,0.08)]">
          {cs.concepts.map((c) => (
            <div key={c.name} className="bg-fg p-6 md:p-7 sm:[&:last-child:nth-child(odd)]:col-span-2">
              <h3 className="font-display font-bold text-lg tracking-tight mb-2">{c.name}</h3>
              <p className="text-[rgba(246,244,238,0.55)] text-sm leading-relaxed">{c.body}</p>
            </div>
          ))}
        </div>
      </Chapter>

      {/* 05 — what broke */}
      <Chapter num="05" label="What broke" heading="The parts that didn't work the first time.">
        <div>
          {cs.broke.map((b, i) => (
            <div
              key={b.what}
              className="grid grid-cols-[auto_1fr] gap-6 md:gap-10 py-8 border-t border-[rgba(246,244,238,0.08)]"
            >
              <div className="font-mono text-sm text-amber pt-1">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div>
                <h3 className="font-display font-bold text-xl md:text-2xl tracking-tight mb-3">
                  {b.what}
                </h3>
                <p className="text-[rgba(246,244,238,0.55)] text-sm md:text-base leading-relaxed">
                  {b.lesson}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Chapter>

      {/* footer cta */}
      <section className="container-x py-20 md:py-28 border-t border-[rgba(246,244,238,0.08)]">
        <h2 className="font-display font-bold text-4xl md:text-6xl tracking-tight leading-[0.95] mb-10">
          Want the full story?
        </h2>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/#contact"
            className="btn-primary !bg-bg !text-fg hover:!bg-amber hover:!text-bg"
          >
            Get in touch <span className="btn-arrow">→</span>
          </Link>
          {p.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary !text-bg !border-[rgba(246,244,238,0.25)] hover:!border-amber hover:!text-amber"
            >
              {l.label} <span className="btn-arrow">↗</span>
            </a>
          ))}
        </div>

        <Link
          href={`/work/${next.slug}`}
          className="group mt-20 flex items-baseline justify-between gap-6 pt-8 border-t border-[rgba(246,244,238,0.1)]"
        >
          <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-[rgba(246,244,238,0.4)]">
            Next project
          </span>
          <span className="font-display font-bold text-3xl md:text-5xl tracking-tight group-hover:text-amber transition-colors">
            {next.name} →
          </span>
        </Link>

        <div className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-[rgba(246,244,238,0.3)] mt-16">
          © {new Date().getFullYear()} Guerra Digital LLC
        </div>
      </section>
    </main>
  );
}

function Chapter({
  num,
  label,
  heading,
  children,
}: {
  num: string;
  label: string;
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <section className="container-x py-16 md:py-24 border-t border-[rgba(246,244,238,0.08)]">
      <div className="grid md:grid-cols-12 gap-8 md:gap-16">
        <div className="md:col-span-4">
          <div className="eyebrow">
            {num} — {label}
          </div>
        </div>
        <div className="md:col-span-8 space-y-6">
          <h2 className="font-display font-bold text-3xl md:text-5xl tracking-tight leading-tight">
            {heading}
          </h2>
          {children}
        </div>
      </div>
    </section>
  );
}

function Body({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[rgba(246,244,238,0.6)] text-base md:text-lg leading-relaxed">{children}</p>
  );
}
