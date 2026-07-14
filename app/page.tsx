import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import WorkSection from "@/components/WorkSection";
import ContactSection from "@/components/ContactSection";
import { PixelCurtain } from "@/components/ui/pixel-curtain";
import AnimatedGradient from "@/components/ui/animated-gradient";
import FloatingMenu from "@/components/ui/liquid-morph-floating-menu";

export default function Home() {
  return (
    <>
      <PixelCurtain />
      <FloatingMenu />
      <main>
        <HeroSection />

        {/* single dark surface for all sections below the hero */}
        <div className="relative bg-fg overflow-hidden">
          <AnimatedGradient
            config={{
              preset: "custom",
              color1: "#0a0a0a",
              color2: "#222222",
              color3: "#0d0d0d",
              speed: 6,
              swirl: 45,
              swirlIterations: 5,
              softness: 100,
              distortion: 3,
              scale: 0.5,
              proportion: 50,
              rotation: 0,
              offset: 0,
              shape: "Checks",
              shapeSize: 45,
            }}
          />
          <div className="relative z-[1]">
            <AboutSection />
            <WorkSection />
            <ContactSection />
          </div>
        </div>
      </main>
    </>
  );
}
