import Hero from "@/components/web/hero";
import { BrandPositioning } from "@/components/web/brand-positioning";
import { MetricsGrid } from "@/components/web/metrics-grid";

const page = () => {
  return (
    <main className="relative bg-background">
      {/* Sticky Hero Section */}
      <Hero />

      {/* Sections that slide over the Hero */}
      <div className="relative z-[50] bg-background">
        <BrandPositioning />
        <MetricsGrid />
      </div>
    </main>
  );
};

export default page;
