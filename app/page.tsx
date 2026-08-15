import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ServicesOverview from "@/components/ServicesOverview";
import MobileCtaBar from "@/components/MobileCtaBar";

/**
 * PHASE 1 SCOPE: the hero and the first section below it only.
 * The remaining homepage sections (generator feature, reviews strip, trust row,
 * service area, final CTA) are built in Phase 2 after Gate 2 approves the
 * design system.
 */
export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ServicesOverview />
      </main>
      {/* Clears the fixed mobile call/text bar so nothing sits under it. */}
      <div className="h-20 bg-bone md:hidden" aria-hidden="true" />
      <MobileCtaBar />
    </>
  );
}
