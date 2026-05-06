import Nav from "@/components/Nav";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import WorkSection from "@/components/WorkSection";
import ContactSection from "@/components/ContactSection";
import { AuroraPreloader } from "@/components/ui/aurora-preloader";

export default function Home() {
  return (
    <>
      <AuroraPreloader />
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
