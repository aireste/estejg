"use client";

import { ProfileCard, ESTEBAN_LINKS } from "@/components/ui/profile-card";

export default function AboutSection() {
  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="container-x relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">

          {/* profile card — left */}
          <div className="lg:col-span-5 flex justify-start">
            <ProfileCard
              avatarUrl="/esteban.jpg"
              name="Esteban Guerra"
              title=""
              bio="I turn ideas into products. Analytics and B2B marketing background, now building with AI."
              socialLinks={ESTEBAN_LINKS}
            />
          </div>

          {/* bio — right */}
          <div className="lg:col-span-7 space-y-6 pt-2">
            <p className="font-display text-2xl md:text-3xl leading-snug font-medium text-bg">
              AI has compressed the build cycle. Apps that used to take months
              now take days. A single person can now build what used to take a
              whole team.
            </p>

            <p className="text-[rgba(246,244,238,0.6)] text-base md:text-lg leading-relaxed">
              I&apos;ve always had ideas. What I didn&apos;t have was a way to
              build them. Until now.
            </p>

            <p className="text-[rgba(246,244,238,0.6)] text-base md:text-lg leading-relaxed">
              That&apos;s where I come in. My background is analytics and B2B
              marketing — I&apos;ve spent years understanding how buyers think,
              how pipelines move, and what separates a product that converts from
              one that doesn&apos;t.
            </p>

            <p className="text-[rgba(246,244,238,0.6)] text-base md:text-lg leading-relaxed">
              AI changed what I can build. I&apos;m using it to turn ideas that
              would&apos;ve sat in a notebook into real products.
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
