import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Guerra Digital LLC",
  description:
    "Guerra Digital LLC is a Nashville software company founded by Esteban Guerra. It builds and operates SPCTR and HedgePredict.",
};

// Only the live products the company operates; local tools stay on the portfolio.
const operated = projects.filter((p) => p.status === "Live");

const facts = [
  { label: "Legal name", value: "Guerra Digital LLC" },
  { label: "Based in", value: "Nashville, TN" },
  { label: "Founder", value: "Esteban Guerra" },
  { label: "Founded", value: "2026" },
];

export default function GuerraDigital() {
  return (
    <main className="bg-fg min-h-screen text-bg">
      {/* top bar */}
      <header className="container-x flex items-center justify-between py-6">
        <Link
          href="/"
          className="font-mono text-[11px] uppercase tracking-[0.18em] text-[rgba(246,244,238,0.5)] hover:text-amber transition-colors"
        >
          ← Esteban Guerra
        </Link>
        <a
          href="mailto:estebanjguerra@gmail.com"
          className="font-mono text-[11px] uppercase tracking-[0.18em] text-[rgba(246,244,238,0.5)] hover:text-amber transition-colors"
        >
          Contact ↗
        </a>
      </header>

      {/* hero */}
      <section className="container-x pt-16 md:pt-24 pb-20 md:pb-28">
        <div className="eyebrow mb-6 fade-up">Company</div>
        <h1
          className="font-display font-bold text-5xl md:text-8xl tracking-tight leading-[0.95] fade-up"
          style={{ animationDelay: "0.1s" }}
        >
          Guerra Digital LLC<span className="amber-text">.</span>
        </h1>
        <p
          className="text-[rgba(246,244,238,0.6)] text-base md:text-lg leading-relaxed max-w-2xl mt-8 fade-up"
          style={{ animationDelay: "0.2s" }}
        >
          A small software company in Nashville. It builds and runs AI
          products. I&apos;m Esteban Guerra, the founder, and I build
          everything it ships.
        </p>

        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-14 pt-8 border-t border-[rgba(246,244,238,0.1)] fade-up"
          style={{ animationDelay: "0.3s" }}
        >
          {facts.map((f) => (
            <div key={f.label}>
              <div className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-[rgba(246,244,238,0.35)] mb-2">
                {f.label}
              </div>
              <div className="font-display font-medium text-sm md:text-base">
                {f.value}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* products */}
      <section className="container-x py-16 md:py-24 border-t border-[rgba(246,244,238,0.08)]">
        <div className="grid md:grid-cols-12 gap-8 md:gap-16">
          <div className="md:col-span-4">
            <div className="eyebrow">What it operates</div>
          </div>
          <div className="md:col-span-8">
            {operated.map((p) => (
              <a
                key={p.slug}
                href={p.visit}
                target="_blank"
                rel="noopener noreferrer"
                className="group block py-8 border-b border-[rgba(246,244,238,0.1)] first:pt-0"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <h2 className="font-display font-bold text-3xl md:text-4xl tracking-tight group-hover:text-amber transition-colors">
                    {p.name}
                  </h2>
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[rgba(246,244,238,0.5)] group-hover:text-amber transition-colors shrink-0">
                    {p.address} ↗
                  </span>
                </div>
                <p className="font-display text-lg text-amber mt-2">
                  {p.tagline}
                </p>
                <p className="text-[rgba(246,244,238,0.6)] text-base leading-relaxed mt-3 max-w-xl">
                  {p.summary}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* contact */}
      <section className="container-x py-16 md:py-24 border-t border-[rgba(246,244,238,0.08)]">
        <div className="grid md:grid-cols-12 gap-8 md:gap-16">
          <div className="md:col-span-4">
            <div className="eyebrow">Contact</div>
          </div>
          <div className="md:col-span-8">
            <p className="text-[rgba(246,244,238,0.6)] text-base md:text-lg leading-relaxed max-w-xl mb-8">
              Questions about any of these products, partnerships, or the
              company itself. It all comes to me.
            </p>
            <a
              href="mailto:estebanjguerra@gmail.com"
              className="inline-flex items-center gap-3 font-display font-bold text-2xl md:text-4xl text-amber hover:text-amber-bright transition-colors link-underline break-all"
            >
              estebanjguerra@gmail.com
            </a>
          </div>
        </div>
      </section>

      {/* footer */}
      <footer className="container-x py-10 border-t border-[rgba(246,244,238,0.08)] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-bg/50">
          © {new Date().getFullYear()} Guerra Digital LLC
        </div>
        <Link
          href="/"
          className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-amber hover:text-amber-bright"
        >
          More about Esteban →
        </Link>
      </footer>
    </main>
  );
}
