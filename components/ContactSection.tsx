"use client";

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="relative py-24 md:py-36 text-bg overflow-hidden"
    >


      <div className="container-x relative z-10">
        <div className="max-w-4xl">

          {/* big CTA headline */}
          <h2 className="font-display font-bold text-[clamp(2.5rem,9vw,7rem)] leading-[0.95] tracking-tight mb-10">
            Got an idea<span className="amber-text">?</span>
            <br />
            <span className="font-medium opacity-80">Let&apos;s build it.</span>
          </h2>

          <p className="text-base md:text-lg text-bg/70 max-w-xl mb-12 leading-relaxed">
            A role, a project, or an idea you can&apos;t shake — drop me a
            line. I read everything, and I reply fast.
          </p>

          {/* primary email */}
          <a
            href="mailto:estebanjguerra@gmail.com"
            className="inline-flex items-center gap-3 font-display font-bold text-2xl md:text-4xl text-amber hover:text-amber-bright transition-colors mb-12 link-underline"
          >
            estebanjguerra@gmail.com
            <span className="text-xl">↗</span>
          </a>

          {/* elsewhere */}
          <div className="pt-8 border-t border-bg/15 flex flex-wrap gap-x-8 gap-y-3">
            {[
              { label: "LinkedIn", href: "https://linkedin.com/in/estebanguerra" },
              { label: "GitHub", href: "https://github.com/aireste" },
            ].map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[11px] uppercase tracking-[0.18em] text-bg/70 hover:text-amber transition-colors"
              >
                {l.label} <span aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
        </div>

        {/* footer strip */}
        <div className="mt-24 pt-8 border-t border-bg/15 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-bg/50">
            © {new Date().getFullYear()} Guerra Digital LLC
          </div>
          <div className="flex items-center gap-6">
            <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-bg/50">
              Nashville, TN
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

