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
import { ContactSection } from "@/components/web/contact-section";
import { Footer } from "@/components/web/footer";

const page = () => {
  return (
    <main className="relative bg-background">
      {/* Sticky Hero Section */}
      <section id="hero">
        <Hero />
      </section>

      {/* Sections that slide over the Hero */}
      <div className="relative z-[50] bg-background">
        <TechStackScroll />
        <BrandPositioning />
        <MetricsGrid />
        
        <section id="about">
          <About />
        </section>

        <section id="services">
          <ServicesSection />
        </section>

        <MyGoal />
        <Projects />
        <VelocityScroll />

        <section id="pricing">
          <PricingSection />
        </section>

        <ContactSection />
        <Footer />
      </div>
    </main>
  );
};

export default page;
