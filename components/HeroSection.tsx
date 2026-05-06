"use client";

import Image from "next/image";
import { Typewriter } from "@/components/ui/typewriter";

export default function HeroSection() {
  return (
    <section
      id="top"
      className="relative min-h-screen flex flex-col justify-center pt-32 pb-20 overflow-hidden"
    >
      {/* aurora #15 — permanent background */}
      <Image
        src="/aurora/aurora-5.jpg"
        alt=""
        fill
        className="object-cover object-center"
        priority
        aria-hidden="true"
      />

      {/* dark overlay */}
      <div className="absolute inset-0 bg-black/45 pointer-events-none" />

      <div className="container-x relative z-10">
        <p className="text-2xl md:text-3xl font-medium text-white/80 mb-4 fade-up" style={{ animationDelay: "0.2s" }}>
          Hello, I&apos;m <span className="text-white font-semibold">Esteban</span>.
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

        <p
          className="max-w-xl text-base md:text-lg text-white/70 leading-relaxed mb-10 fade-up"
          style={{ animationDelay: "0.4s" }}
        >
          Self-taught front-end designer and developer. I came up through
          marketing and B2B, so I actually understand what moves a lead through
          a pipeline — and I build things that do the same.
        </p>

        <div className="flex flex-wrap items-center gap-3 mb-16 fade-up" style={{ animationDelay: "0.5s" }}>
          <a href="#work" className="btn-primary">
            See my work
            <span className="btn-arrow">→</span>
          </a>
          <a
            href="#contact"
            className="font-mono text-xs uppercase tracking-[0.14em] px-6 py-3 border border-white/30 text-white hover:border-white/70 transition-colors"
          >
            Let&apos;s talk!
          </a>
        </div>
      </div>
    </section>
  );
}
