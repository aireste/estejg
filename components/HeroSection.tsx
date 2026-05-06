"use client";

import { Typewriter } from "@/components/ui/typewriter";
import { GLSLHills } from "@/components/ui/glsl-hills";

export default function HeroSection() {
  return (
    <section
      id="top"
      className="relative min-h-screen flex flex-col justify-center pt-32 pb-20 overflow-hidden"
    >
      {/* glsl hills */}
      <GLSLHills speed={0.35} cameraZ={140} />

      {/* dot grid background */}
      <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />

<div className="container-x relative z-10">
        {/* greeting */}
        <p className="text-2xl md:text-3xl font-medium text-fg-soft mb-4 fade-up" style={{ animationDelay: "0.2s" }}>
          Hello, I&apos;m <span className="text-fg font-semibold">Esteban</span>.
        </p>

        {/* main headline */}
        <h1
          className="font-display font-bold leading-[0.95] text-[clamp(3rem,11vw,9.5rem)] mb-6 fade-up"
          style={{ animationDelay: "0.4s" }}
        >
          I have ideas.
          <span className="block font-medium whitespace-nowrap relative">
            {/* invisible longest word — permanently holds the layout space */}
            <span className="opacity-0 pointer-events-none select-none" aria-hidden="true">
              I build pipelines._
            </span>
            {/* typewriter overlaid absolutely so it never shifts the flow */}
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

        {/* subline */}
        <p className="max-w-xl text-base md:text-lg text-fg-soft leading-relaxed mb-10 fade-up" style={{ animationDelay: "0.4s" }}>
          Self-taught front-end designer and developer. I came up through
          marketing and B2B, so I actually understand what moves a lead through
          a pipeline — and I build things that do the same.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center gap-3 mb-16 fade-up" style={{ animationDelay: "0.5s" }}>
          <a href="#work" className="btn-primary">
            See my work
            <span className="btn-arrow">→</span>
          </a>
          <a href="#contact" className="btn-secondary">
            Let&apos;s talk!
          </a>
        </div>

      </div>
    </section>
  );
}
