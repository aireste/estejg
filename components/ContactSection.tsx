"use client";

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="relative py-24 md:py-36 bg-fg text-bg overflow-hidden"
    >
      {/* dot grid */}
      <div
        className="absolute inset-0 opacity-25 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(246,244,238,0.4) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* corner brackets */}
      <div className="absolute top-8 left-6 md:left-12 w-6 h-6 border-l border-t border-amber" />
      <div className="absolute top-8 right-6 md:right-12 w-6 h-6 border-r border-t border-amber" />
      <div className="absolute bottom-8 left-6 md:left-12 w-6 h-6 border-l border-b border-amber" />
      <div className="absolute bottom-8 right-6 md:right-12 w-6 h-6 border-r border-b border-amber" />

      <div className="container-x relative z-10">
        <div className="max-w-4xl">
          {/* eyebrow */}
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-amber mb-6">
            / 03 — Contact
          </div>

          {/* big CTA headline */}
          <h2 className="font-display font-bold text-[clamp(2.5rem,9vw,7rem)] leading-[0.95] tracking-tight mb-10">
            Got an idea<span className="amber-text">?</span>
            <br />
            <span className="font-medium opacity-80">Let&apos;s build it.</span>
          </h2>

          <p className="text-base md:text-lg text-bg/70 max-w-xl mb-12 leading-relaxed">
            Whether it&apos;s a full lead-gen system, a one-off site, or a wild
            idea you can&apos;t shake — drop me a line. I read everything, and I
            reply fast.
          </p>

          {/* primary email */}
          <a
            href="mailto:estebanjguerra@gmail.com"
            className="inline-flex items-center gap-3 font-display font-bold text-2xl md:text-4xl text-amber hover:text-amber-bright transition-colors mb-12 link-underline"
          >
            estebanjguerra@gmail.com
            <span className="text-xl">↗</span>
          </a>

          {/* contact grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 pt-10 border-t border-bg/15">
            <ContactItem label="GitHub" handle="@aireste" href="https://github.com/aireste" />
            <ContactItem label="LinkedIn" handle="esteban-guerra" href="https://www.linkedin.com/in/esteban-guerra-b3631415b" />
            <ContactItem label="SPCTR" handle="spctr.run" href="https://spctr.run" />
          </div>
        </div>

        {/* footer strip */}
        <div className="mt-24 pt-8 border-t border-bg/15 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-bg/50">
            © {new Date().getFullYear()} Esteban Guerra · Built with caffeine
            and Claude
          </div>
          <div className="flex items-center gap-6">
            <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-bg/50">
              v0.1 · Nashville, TN
            </span>
            <a
              href="#top"
              className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-amber hover:text-amber-bright"
            >
              ↑ Back to top
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactItem({
  label,
  handle,
  href,
}: {
  label: string;
  handle: string;
  href: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
    >
      <div className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-bg/50 mb-2">
        {label}
      </div>
      <div className="font-display text-lg font-semibold text-bg group-hover:text-amber transition-colors flex items-center gap-2">
        {handle}
        <span className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
          →
        </span>
      </div>
    </a>
  );
}
