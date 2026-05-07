"use client";

export default function AboutSection() {
  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="container-x relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">

          {/* photo placeholder — left */}
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] w-full max-w-md bg-[rgba(246,244,238,0.04)] border border-[rgba(246,244,238,0.1)] overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <svg viewBox="0 0 100 120" className="w-1/2 h-1/2 text-[rgba(246,244,238,0.12)]" fill="currentColor">
                  <circle cx="50" cy="35" r="18" />
                  <path d="M 20 110 Q 20 70 50 70 Q 80 70 80 110 Z" />
                </svg>
              </div>

              <div className="absolute top-2 left-2 w-3 h-3 border-l border-t border-amber" />
              <div className="absolute top-2 right-2 w-3 h-3 border-r border-t border-amber" />
              <div className="absolute bottom-2 left-2 w-3 h-3 border-l border-b border-amber" />
              <div className="absolute bottom-2 right-2 w-3 h-3 border-r border-b border-amber" />

              <div className="absolute bottom-0 left-0 right-0 px-3 py-2 bg-[rgba(0,0,0,0.6)] flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-bg">
                  ID · ESTEBAN_G
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-amber">
                  • REC
                </span>
              </div>

              <div className="absolute top-3 right-3">
                <span className="font-mono text-[9px] uppercase tracking-[0.18em] px-2 py-1 bg-[rgba(246,244,238,0.08)] border border-[rgba(246,244,238,0.15)] rounded-full text-[rgba(246,244,238,0.6)]">
                  Photo · soon
                </span>
              </div>
            </div>

            <div className="mt-4 font-mono text-[10.5px] uppercase tracking-[0.18em] text-[rgba(246,244,238,0.35)]">
              [ FRAME · 01 / 01 ] — esteban_guerra.jpg
            </div>
          </div>

          {/* bio — right */}
          <div className="lg:col-span-7 space-y-6 pt-2">
            <p className="font-display text-2xl md:text-3xl leading-snug font-medium text-bg">
              We&apos;re in the middle of a shift. Apps that used to take months
              to ship now take days. Products that needed a full team can be
              built by one person with the right setup.
            </p>

            <p className="text-[rgba(246,244,238,0.6)] text-base md:text-lg leading-relaxed">
              I&apos;ve always had ideas. What I didn&apos;t have was a way to
              build them. Until now.
            </p>

            <p className="text-[rgba(246,244,238,0.6)] text-base md:text-lg leading-relaxed">
              My background is analytics and B2B marketing. I know how pipelines
              work, how buyers move, what makes a lead worth chasing. That&apos;s
              not a soft skill — that&apos;s the difference between building
              something pretty and building something that works.
            </p>

            <p className="text-[rgba(246,244,238,0.6)] text-base md:text-lg leading-relaxed">
              AI changed what&apos;s possible. I&apos;m using it to build tools,
              projects, and products I couldn&apos;t have touched two years ago.
            </p>

            <div className="pt-4">
              <a
                href="#contact"
                className="font-mono text-xs uppercase tracking-[0.14em] px-6 py-3 border border-[rgba(246,244,238,0.25)] text-[rgba(246,244,238,0.8)] hover:border-[rgba(246,244,238,0.6)] hover:text-bg transition-colors inline-flex items-center gap-2"
              >
                Let&apos;s Build
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
