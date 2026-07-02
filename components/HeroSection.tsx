"use client";

import { Typewriter } from "@/components/ui/typewriter";
import { MeshGradientBg } from "@/components/ui/mesh-gradient-bg";

export default function HeroSection() {
  return (
    <section
      id="top"
      className="relative min-h-screen flex flex-col justify-center pt-32 pb-20 overflow-hidden"
    >
      <MeshGradientBg />

      <div className="container-x relative z-10">
        <p className="text-2xl md:text-3xl font-medium text-white/70 mb-4 fade-up" style={{ animationDelay: "0.2s" }}>
          Hi there, I&apos;m <span className="text-white font-semibold">Esteban</span>
        </p>

        <h1
          className="font-display font-bold leading-[0.95] text-[clamp(2.5rem,8vw,7rem)] mb-6 text-white fade-up"
          style={{ animationDelay: "0.4s" }}
        >
          I have ideas.
          <span className="block font-medium whitespace-nowrap relative">
            <span className="opacity-0 pointer-events-none select-none" aria-hidden="true">
              I can build pipelines._
            </span>
            <span className="absolute inset-0">
              I can build{" "}
              <Typewriter
                text={["products.", "pipelines.", "sites.", "agencies.", "things."]}
                speed={75}
                deleteSpeed={40}
                waitTime={2200}
                className="amber-text"
                cursorChar="_"
                cursorClassName=""
              />
            </span>
          </span>
        </h1>

        <p className="max-w-xl text-base md:text-lg text-white/60 leading-relaxed mb-10 fade-up" style={{ animationDelay: "0.4s" }}>
          What used to take a full team and serious budget now takes one person
          with a vision. I&apos;m building that way — and making it count for the
          people I work with.
        </p>

      </div>
    </section>
  );
}
