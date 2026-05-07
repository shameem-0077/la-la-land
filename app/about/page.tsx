import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CTA from "@/components/sections/CTA";
import AboutHero from "@/components/sections/about/AboutHero";
import WhoWeAre from "@/components/sections/about/WhoWeAre";
import VisionMission from "@/components/sections/about/VisionMission";
import Milestones from "@/components/sections/about/Milestones";
import WhyChoose from "@/components/sections/about/WhyChoose";
import Licenses from "@/components/sections/about/Licenses";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-grow">
        <AboutHero />
        <WhoWeAre />
        <VisionMission />
        <Milestones />
        <WhyChoose />
        <Licenses />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
