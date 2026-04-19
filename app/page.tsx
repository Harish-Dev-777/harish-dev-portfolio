import Hero from "@/components/web/hero";
import { BrandPositioning } from "@/components/web/brand-positioning";
import { MetricsGrid } from "@/components/web/metrics-grid";
import { MyGoal } from "@/components/web/my-goal";
import { Projects } from "@/components/web/projects";
import { VelocityScroll } from "@/components/web/velocity-scroll";
import { PricingSection } from "@/components/web/pricing-section";
import { About } from "@/components/web/about";
import { TechStackScroll } from "@/components/web/tech-stack-scroll";
import { ServicesSection } from "@/components/web/services-section";

const page = () => {
  return (
    <main className="relative bg-background">
      {/* Sticky Hero Section */}
      <Hero />

      {/* Sections that slide over the Hero */}
      <div className="relative z-[50] bg-background">
        <TechStackScroll />
        <BrandPositioning />
        <MetricsGrid />
        <About />
        <ServicesSection />
        <MyGoal />
        <Projects />
        <VelocityScroll />
        <PricingSection />
      </div>
    </main>
  );
};

export default page;
