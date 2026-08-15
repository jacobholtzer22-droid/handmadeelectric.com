import type { Metadata } from "next";
import Image from "next/image";
import { site } from "@/site.config";
import { breadcrumbNode } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import PanelTag from "@/components/PanelTag";
import ClosingCta from "@/components/ClosingCta";

export const metadata: Metadata = pageMeta({
  title: `About ${site.business.name} | ${site.business.areaServed} Electrician`,
  description: `${site.business.name} is an electrical contractor serving ${site.business.areaServed}, run by Trae, covering residential, commercial, and industrial work and generators.`,
  path: "/about",
});

/**
 * WRITTEN FRESH. Not one word of the old Squarespace About page survives: that
 * copy described a nationwide electrical utility company with "clients
 * nationwide" and "grid performance", a business that does not exist.
 *
 * Claims deliberately absent, all TODO in seo/FACTS.md:
 *  - No years in business. The old "more than a decade" line is quarantined
 *    until a founding year is confirmed.
 *  - No licensing claim, no license number, no insured or bonded claim.
 *  - No crew size, no jobs-completed count, no response times.
 * The craft angle is the story because the company is literally named Handmade.
 */
export default function AboutPage() {
  const { business } = site;

  return (
    <>
      <JsonLd
        nodes={[
          breadcrumbNode([
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
          ]),
        ]}
      />

      <section className="bg-iron pb-14 pt-11 sm:pt-14 lg:pb-20 lg:pt-16">
        <div className="container-page">
          <div className="lg:grid lg:grid-cols-12 lg:items-start lg:gap-14">
            <div className="lg:col-span-7">
              <PanelTag lit>About</PanelTag>
              <h1 className="h-display mt-6 text-[2rem] text-bone sm:text-[2.75rem] lg:text-[3.25rem]">
                Work you can point at
              </h1>
              <p className="mt-6 max-w-prose text-[1.0625rem] leading-relaxed text-ash sm:text-lg">
                {business.legalName} is an electrical contractor serving{" "}
                {business.areaServed}. The company is run by {business.owner},
                and the name is not decoration. Electrical work is a trade you do
                with your hands, in someone else's house or shop, and the person
                who did it should be willing to stand next to it afterward.
              </p>
            </div>

            <div className="mt-10 lg:col-span-5 lg:mt-0">
              <div className="relative mx-auto max-w-[20rem] lg:ml-auto lg:mr-0 lg:max-w-none">
                <div
                  className="absolute -bottom-3 -right-3 h-full w-full rounded-panel border-2 border-copper"
                  aria-hidden="true"
                />
                <Image
                  src="/images/panel-open.webp"
                  alt="An open residential breaker panel with the circuit directory label on the inside of the door"
                  width={998}
                  height={1330}
                  priority
                  sizes="(min-width: 1024px) 400px, (min-width: 640px) 320px, 100vw"
                  className="relative rounded-panel"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-bone py-16 lg:py-20">
        <div className="container-page">
          <div className="lg:grid lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5">
              <PanelTag tone="light">How we work</PanelTag>
              <h2 className="h-display mt-5 text-[1.75rem] text-ink sm:text-3xl lg:text-4xl">
                A few things that do not change
              </h2>
            </div>

            <div className="mt-8 max-w-prose space-y-7 lg:col-span-7 lg:mt-0">
              <div>
                <h3 className="h-display text-lg text-ink">
                  Find the cause, then fix it
                </h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-dim">
                  A breaker that keeps tripping and a scorched outlet are
                  symptoms. Swapping the part without finding what caused it
                  means you pay twice and the underlying problem is still in your
                  wall. Diagnosis comes first.
                </p>
              </div>

              <div>
                <h3 className="h-display text-lg text-ink">
                  You hear the number before the work
                </h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-dim">
                  You get the scope and the cost before anything starts, and if
                  what we find behind the wall changes the job, you hear about it
                  then rather than on the invoice.
                </p>
              </div>

              <div>
                <h3 className="h-display text-lg text-ink">
                  Permitted work gets permitted
                </h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-dim">
                  Panel replacements, service upgrades, and generator
                  installations are inspected work in most municipalities. The
                  inspection is an independent set of eyes on something that runs
                  in your walls for decades, which is worth having.
                </p>
              </div>

              <div>
                <h3 className="h-display text-lg text-ink">Call it or text it</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-dim">
                  The same number takes calls and texts. Photos of a panel, a
                  nameplate, or a fault code on a generator controller are
                  genuinely useful, and texting them is the fastest way to get
                  them in front of someone.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ClosingCta
        heading={`Working across ${business.areaServed}`}
        body={`Residential, commercial, and industrial electrical work, plus Generac home standby generator installation, repair, and service. Call or text ${business.phoneDisplay} and describe what is going on.`}
      />
    </>
  );
}
