import Nav from "@/components/Nav";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import WorkSection from "@/components/WorkSection";
import ContactSection from "@/components/ContactSection";
import { PixelCurtain } from "@/components/ui/pixel-curtain";
import { GridPattern } from "@/components/ui/grid-pattern";

export default function Home() {
  return (
    <>
      <PixelCurtain />
      <Nav />
      <main>
        <HeroSection />

        {/* single dark surface for all sections below the hero */}
        <div className="relative bg-fg overflow-hidden">
          <GridPattern
            width={56}
            height={56}
            className="stroke-[rgba(246,244,238,0.05)] fill-[rgba(246,244,238,0.04)] [mask-image:linear-gradient(to_bottom,transparent_0%,black_4%,black_96%,transparent_100%)]"
            squares={[
              [2, 3], [8, 6], [14, 2], [20, 8], [26, 4], [32, 10],
              [5, 12], [11, 16], [17, 14], [23, 18], [29, 12], [35, 16],
              [3, 22], [9, 26], [15, 24], [21, 28], [27, 22], [33, 26],
            ]}
          />
          <AboutSection />
          <WorkSection />
          <ContactSection />
        </div>
      </main>
    </>
  );
}
