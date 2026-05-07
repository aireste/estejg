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
          Hi there, I&apos;m <span className="text-white font-semibold">Esteban</span>.
        </p>

        <h1
          className="font-display font-bold leading-[0.95] text-[clamp(3rem,11vw,9.5rem)] mb-6 text-white fade-up"
          style={{ animationDelay: "0.4s" }}
        >
          I have ideas.
          <span className="block font-medium whitespace-nowrap relative">
            <span className="opacity-0 pointer-events-none select-none" aria-hidden="true">
              I build pipelines._
            </span>
            <span className="absolute inset-0">
              I build{" "}
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
          I build things. My background is analytics and marketing — which
          means I care about whether it works, not just whether it looks good.
        </p>

        <div className="flex flex-wrap items-center gap-3 mb-16 fade-up" style={{ animationDelay: "0.5s" }}>
          <a href="#work" className="btn-primary">
            See my work
            <span className="btn-arrow">→</span>
          </a>
          <a
            href="#contact"
            className="font-mono text-xs uppercase tracking-[0.14em] px-6 py-3 border border-white/25 text-white/80 hover:border-white/60 hover:text-white transition-colors"
          >
            Let&apos;s Build
          </a>
        </div>
      </div>
    </section>
  );
}
