"use client";

export default function AboutSection() {
  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="container-x relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">

          {/* photo placeholder — left */}
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] w-full max-w-md overflow-hidden rounded-3xl">
              <img
                src="/esteban.jpg"
                alt="Esteban Guerra"
                className="absolute inset-0 w-full h-full object-cover object-[80%_5%] scale-125"
              />
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
