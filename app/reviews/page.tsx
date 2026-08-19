import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/site.config";
import { breadcrumbNode } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import PanelTag from "@/components/PanelTag";
import ReviewCard from "@/components/ReviewCard";
import EmblemWatermark from "@/components/EmblemWatermark";
import CtaPair from "@/components/CtaPair";
import ClosingCta from "@/components/ClosingCta";
import Reveal from "@/components/motion/Reveal";

export const metadata: Metadata = pageMeta({
  title: `Customer Reviews in ${site.business.areaServed} | ${site.business.name}`,
  description: `What customers across ${site.business.areaServed} say about ${site.business.legalName}, in their own words, taken word for word from the Google Business Profile.`,
  path: "/reviews",
});

/**
 * Every review verbatim, in a masonry-feel column layout so cards of very
 * different lengths sit without stretching each other.
 *
 * NO Review and NO aggregateRating JSON-LD, and there never will be. Only the
 * BreadcrumbList node is emitted here. Self-serving review markup on a
 * business's own site has been ineligible for Google rich results since 2019,
 * and the schema gate fails the build if either type appears anywhere.
 *
 * NO rating, NO average, NO count displayed. Google's list view did not expose
 * per-review ratings and inventing them is not an option.
 */
export default function ReviewsPage() {
  const { reviews, business } = site;

  // The route only exists while reviews do. Switching the flag off makes this
  // a 404 rather than an empty page advertising that there are none.
  if (!reviews.enabled || reviews.quotes.length === 0) notFound();

  return (
    <>
      <JsonLd
        nodes={[
          breadcrumbNode([
            { name: "Home", path: "/" },
            { name: "Reviews", path: "/reviews" },
          ]),
        ]}
      />

      <section className="relative overflow-hidden bg-iron pb-12 pt-11 sm:pt-14 lg:pb-14 lg:pt-16">
        <EmblemWatermark size={520} className="-right-28 -top-20 hidden lg:block" />
        <div className="container-page relative">
          <PanelTag lit>{business.areaServed}</PanelTag>
          <h1 className="h-display mt-6 max-w-3xl text-[2rem] text-bone sm:text-[2.75rem] lg:text-[3.25rem]">
            What customers say
          </h1>
          <p className="mt-6 max-w-prose text-[1.0625rem] leading-relaxed text-ash sm:text-lg">
            Reviews left for {business.legalName} on Google, in the customer&apos;s
            own words. Nothing here has been edited or shortened by us. Two of
            them are cut off because Google truncates longer reviews in its own
            listing.
          </p>
          <CtaPair className="mt-8" />
        </div>
      </section>

      <section className="bg-iron py-14 lg:py-20">
        <div className="container-page">
          {/* Masonry feel via CSS columns: cards keep their natural height
              instead of being stretched to match a grid row. */}
          <div className="[column-gap:1.25rem] sm:columns-2 lg:columns-3">
            {reviews.quotes.map((quote, i) => (
              <Reveal key={quote.name + i} index={i} className="mb-5 block break-inside-avoid">
                <ReviewCard quote={quote} className="h-full" />
              </Reveal>
            ))}
          </div>

          {reviews.profileUrl && (
            <p className="mt-10">
              <a
                href={reviews.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center gap-2 font-panel text-[0.6875rem] uppercase tracking-panelwide text-copper-bright"
              >
                See the reviews on Google
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </p>
          )}
        </div>
      </section>

      <ClosingCta
        heading="Want to be the next one?"
        body={`Describe the job and ${business.name} will get back to you. Call, text, or send the details, whichever suits you.`}
      />
    </>
  );
}
