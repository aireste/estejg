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
              bio="I build AI into real products. B2B marketing and analytics background."
              socialLinks={ESTEBAN_LINKS}
            />
          </div>

          {/* bio — right */}
          <div className="lg:col-span-7 space-y-6 pt-2">
            <p className="font-display text-2xl md:text-3xl leading-snug font-medium text-bg">
              I build the plumbing: connecting models like Claude to live
              data, tools and each other so they do real work.
            </p>

            <p className="text-[rgba(246,244,238,0.6)] text-base md:text-lg leading-relaxed">
              A prediction engine that explains its calls. An MCP server any AI
              can plug into. An AI studio I built top to bottom, brand to
              codebase.
            </p>

            <p className="text-[rgba(246,244,238,0.6)] text-base md:text-lg leading-relaxed">
              My background is analytics and B2B marketing. I&apos;ve spent
              years understanding how buyers think, how pipelines move, and
              what separates a product that converts from one that
              doesn&apos;t. That&apos;s my edge: what I build is meant to get
              used, not just demoed.
            </p>

            <p className="text-[rgba(246,244,238,0.6)] text-base md:text-lg leading-relaxed">
              I&apos;ve always had ideas. One person can now ship what used to
              take a team, so I ship them.
            </p>

          </div>

        </div>
      </div>
    </section>
  );
}
