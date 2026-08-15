import type { Metadata } from "next";
import { site } from "@/site.config";
import { pageMeta } from "@/lib/seo";
import Hero from "@/components/Hero";
import ServicesOverview from "@/components/ServicesOverview";
import GeneratorFeature from "@/components/GeneratorFeature";
import ReviewsStrip from "@/components/ReviewsStrip";
import TrustRow from "@/components/TrustRow";
import ClosingCta from "@/components/ClosingCta";

export const metadata: Metadata = pageMeta({
  title: `Electrician in ${site.business.areaServed} | ${site.business.name}`,
  description: `${site.business.legalName} is an electrical contractor serving ${site.business.areaServed}. Residential, commercial, and industrial work, plus Generac standby generators.`,
  path: "/",
});

/**
 * Homepage order is set in seo/PAGE-PLAN.md section 2.
 *
 * ReviewsStrip and TrustRow both currently render null, because no reviews were
 * supplied and no credentials are confirmed. That is the intended behavior:
 * they appear the moment the facts land, with no code change.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesOverview />
      <GeneratorFeature />
      <ReviewsStrip />
      <TrustRow />
      <ClosingCta />
    </>
  );
}
