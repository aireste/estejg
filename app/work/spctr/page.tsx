import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "SPCTR — Case Study | Esteban Guerra",
  description:
    "How I built SPCTR: a pay-per-lead outbound agency, from brand and site to the sending engine behind it.",
};

const spctrPalette = [
  { hex: "#c0fc04", name: "Acid" },
  { hex: "#ff5500", name: "Orange" },
  { hex: "#ea027e", name: "Pink" },
  { hex: "#3601fb", name: "Indigo" },
  { hex: "#00d4aa", name: "Teal" },
];

const engineSteps = [
  {
    num: "01",
    title: "Infrastructure first",
    body: "Dedicated sending domains, separate from the main brand, warmed up for weeks before a single cold email goes out. Deliverability is earned, not assumed — if the emails land in spam, nothing else matters.",
  },
  {
    num: "02",
    title: "A narrow list",
    body: "One industry, researched by hand. Every contact on the list is someone the offer actually fits — not a scrape of everyone with a job title. Small lists convert; big lists burn domains.",
  },
  {
    num: "03",
    title: "Relevance-first copy",
    body: "AI-assisted, human in feel. The test for every email: could this have been sent to anyone else? If yes, it doesn't go out. Specificity is the whole game.",
  },
  {
    num: "04",
    title: "Short, respectful sequences",
    body: "A few well-spaced touches, then out. No 12-step pressure campaigns. The goal is to start a conversation with the right person, not to wear down the wrong one.",
  },
  {
    num: "05",
    title: "Handoff and feedback",
    body: "Booked meetings land on the client's calendar. Then I follow up — how did it go? That feedback loops back into the list and the copy. Reporting stays transparent, good numbers or bad.",
  },
];

const meta = [
  { label: "Role", value: "Founder — everything" },
  { label: "Stack", value: "Next.js 14 · Three.js · Tailwind" },
  { label: "Year", value: "2025 — present" },
];

export default function SpctrCaseStudy() {
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
          href="https://spctr.run"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[11px] uppercase tracking-[0.18em] text-[rgba(246,244,238,0.5)] hover:text-amber transition-colors"
        >
          spctr.run ↗
        </a>
      </header>

      {/* hero */}
      <section className="container-x pt-16 md:pt-24 pb-20 md:pb-28">
        <div className="eyebrow mb-6 fade-up">Case study — 01</div>
        <h1
          className="font-display font-bold text-6xl md:text-8xl tracking-tight leading-[0.95] fade-up"
          style={{ animationDelay: "0.1s" }}
        >
          SPCTR<span className="amber-text">.</span>
        </h1>
        <p
          className="font-display text-xl md:text-2xl text-amber mt-4 fade-up"
          style={{ animationDelay: "0.2s" }}
        >
          We prospect. You close.
        </p>
        <p
          className="text-[rgba(246,244,238,0.6)] text-base md:text-lg leading-relaxed max-w-2xl mt-8 fade-up"
          style={{ animationDelay: "0.3s" }}
        >
          A pay-per-lead outbound agency I founded and built end to end —
          brand, site, company, and the sending engine behind it. This isn&apos;t
          a results page yet. It&apos;s a methodology page: how it works, and why
          it&apos;s built this way.
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
              <div className="font-display font-medium text-sm md:text-base">
                {m.value}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 01 — the problem */}
      <section className="container-x py-16 md:py-24 border-t border-[rgba(246,244,238,0.08)]">
        <div className="grid md:grid-cols-12 gap-8 md:gap-16">
          <div className="md:col-span-4">
            <div className="eyebrow">01 — The problem</div>
          </div>
          <div className="md:col-span-8 space-y-6">
            <h2 className="font-display font-bold text-3xl md:text-5xl tracking-tight leading-tight">
              Cold outreach earned its bad reputation.
            </h2>
            <p className="text-[rgba(246,244,238,0.6)] text-base md:text-lg leading-relaxed">
              Everyone&apos;s inbox is full of it: mass-blasted, barely
              personalized, sent to ten thousand people hoping three reply.
              It doesn&apos;t just fail — it makes the whole channel worse for
              everyone.
            </p>
            <p className="text-[rgba(246,244,238,0.6)] text-base md:text-lg leading-relaxed">
              But the channel isn&apos;t the problem. The incentives are. Most
              agencies get paid whether their outreach works or not — a monthly
              retainer for activity, not outcomes. Volume becomes the product,
              because volume is what&apos;s easy to invoice.
            </p>
          </div>
        </div>
      </section>

      {/* 02 — the philosophy */}
      <section className="container-x py-16 md:py-24 border-t border-[rgba(246,244,238,0.08)]">
        <div className="grid md:grid-cols-12 gap-8 md:gap-16">
          <div className="md:col-span-4">
            <div className="eyebrow">02 — The philosophy</div>
          </div>
          <div className="md:col-span-8 space-y-6">
            <h2 className="font-display font-bold text-3xl md:text-5xl tracking-tight leading-tight">
              I only win when you win.
            </h2>
            <p className="text-[rgba(246,244,238,0.6)] text-base md:text-lg leading-relaxed">
              SPCTR is pay-per-lead. If I don&apos;t deliver meetings, I
              don&apos;t get paid. That&apos;s not a tagline — it&apos;s the
              structure of the business, and it forces every decision downstream
              of it: narrow lists, relevant copy, honest reporting.
            </p>
            <blockquote className="border-l-2 border-amber pl-6 py-1">
              <p className="font-display text-xl md:text-2xl leading-snug font-medium">
                Mutualism, not parasitism. Both parties benefit, or the model
                doesn&apos;t work at all.
              </p>
            </blockquote>
            <p className="text-[rgba(246,244,238,0.6)] text-base md:text-lg leading-relaxed">
              The pitch to a VP of sales isn&apos;t &ldquo;more volume.&rdquo;
              It&apos;s: outbound can be a great channel for your business if
              it&apos;s done with a different set of incentives — AI-powered but
              human in feel, relevance-first, not blast-and-pray.
            </p>
          </div>
        </div>
      </section>

      {/* 03 — the build */}
      <section className="container-x py-16 md:py-24 border-t border-[rgba(246,244,238,0.08)]">
        <div className="grid md:grid-cols-12 gap-8 md:gap-16">
          <div className="md:col-span-4">
            <div className="eyebrow">03 — The build</div>
          </div>
          <div className="md:col-span-8 space-y-6">
            <h2 className="font-display font-bold text-3xl md:text-5xl tracking-tight leading-tight">
              Everything from scratch.
            </h2>
            <p className="text-[rgba(246,244,238,0.6)] text-base md:text-lg leading-relaxed">
              Brand, design system, site, and company — no templates, no agency.
              The aesthetic is tactical dark: pure black, acid green, condensed
              type. It&apos;s built to feel like ops software, because
              that&apos;s what the service is.
            </p>

            {/* palette exhibit */}
            <div className="bg-black border border-[rgba(246,244,238,0.1)] p-6 md:p-8">
              <div className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-[rgba(246,244,238,0.35)] mb-5">
                SPCTR design system
              </div>
              <div className="flex flex-wrap gap-4">
                {spctrPalette.map((c) => (
                  <div key={c.hex} className="flex flex-col gap-2">
                    <div
                      className="w-16 h-16 md:w-20 md:h-20"
                      style={{ backgroundColor: c.hex }}
                    />
                    <div className="font-mono text-[10px] text-[rgba(246,244,238,0.5)]">
                      {c.name}
                      <br />
                      {c.hex}
                    </div>
                  </div>
                ))}
              </div>
              <div className="font-mono text-[10.5px] text-[rgba(246,244,238,0.35)] mt-5">
                Barlow Condensed 900 · Space Mono · Playfair Display
              </div>
            </div>

            <p className="text-[rgba(246,244,238,0.6)] text-base md:text-lg leading-relaxed">
              The site is Next.js 14 with Three.js doing the heavy lifting: an
              interactive globe with real population-center data and arcing
              connections, a full-screen starfield, and a lead-capture flow at
              the end of it. Behind the site sits a real company — registered
              LLC, contracts, service agreements — because clients deserve a
              counterparty, not a landing page.
            </p>
          </div>
        </div>
      </section>

      {/* 04 — the engine */}
      <section className="container-x py-16 md:py-24 border-t border-[rgba(246,244,238,0.08)]">
        <div className="grid md:grid-cols-12 gap-8 md:gap-16">
          <div className="md:col-span-4">
            <div className="eyebrow">04 — The engine</div>
          </div>
          <div className="md:col-span-8">
            <h2 className="font-display font-bold text-3xl md:text-5xl tracking-tight leading-tight mb-4">
              Relevance-first outbound.
            </h2>
            <p className="text-[rgba(246,244,238,0.6)] text-base md:text-lg leading-relaxed mb-12">
              The methodology, in order. Every step exists because skipping it
              is how outreach becomes spam.
            </p>
            <div className="space-y-0">
              {engineSteps.map((step) => (
                <div
                  key={step.num}
                  className="grid grid-cols-[auto_1fr] gap-6 md:gap-10 py-8 border-t border-[rgba(246,244,238,0.08)]"
                >
                  <div className="font-mono text-sm text-amber pt-1">
                    {step.num}
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-xl md:text-2xl tracking-tight mb-3">
                      {step.title}
                    </h3>
                    <p className="text-[rgba(246,244,238,0.55)] text-sm md:text-base leading-relaxed">
                      {step.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

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
          <a
            href="https://spctr.run"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary !text-bg !border-[rgba(246,244,238,0.25)] hover:!border-amber hover:!text-amber"
          >
            Visit spctr.run <span className="btn-arrow">↗</span>
          </a>
        </div>
        <div className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-[rgba(246,244,238,0.3)] mt-16">
          © {new Date().getFullYear()} Guerra Digital LLC
        </div>
      </section>
    </main>
  );
}
