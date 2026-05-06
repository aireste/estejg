import Nav from "@/components/Nav";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import WorkSection from "@/components/WorkSection";
import ContactSection from "@/components/ContactSection";
import { PixelCurtain } from "@/components/ui/pixel-curtain";

export default function Home() {
  return (
    <>
      <PixelCurtain />
      <Nav />
      <main>
        <HeroSection />
        <AboutSection />
        <WorkSection />
        <ContactSection />
      </main>
    </>
  );
}
