import type { Metadata } from "next";
import { site } from "@/site.config";
import { workPhotos } from "@/lib/content/work";
import { breadcrumbNode } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import PanelTag from "@/components/PanelTag";
import WorkGallery from "@/components/WorkGallery";
import ClosingCta from "@/components/ClosingCta";

export const metadata: Metadata = pageMeta({
  title: `Recent Work in ${site.business.areaServed} | ${site.business.name}`,
  description: `Photos of recent electrical work by ${site.business.name} across ${site.business.areaServed}: panels, service equipment, lighting, and conduit in homes and businesses.`,
  path: "/work",
});

export default function WorkPage() {
  return (
    <>
      <JsonLd
        nodes={[
          breadcrumbNode([
            { name: "Home", path: "/" },
            { name: "Work", path: "/work" },
          ]),
        ]}
      />

      <section className="bg-iron pb-14 pt-11 sm:pt-14 lg:pb-16 lg:pt-16">
        <div className="container-page">
          <PanelTag lit>{site.business.areaServed}</PanelTag>
          <h1 className="h-display mt-6 max-w-3xl text-[2rem] text-bone sm:text-[2.75rem] lg:text-[3.25rem]">
            Recent work
          </h1>
          <p className="mt-6 max-w-prose text-[1.0625rem] leading-relaxed text-ash sm:text-lg">
            {workPhotos.length} photographs from jobs across{" "}
            {site.business.areaServed}: panels and service equipment, lighting in
            warehouses, offices, and retail space, and conduit runs in plants.
            These are real jobs, photographed on site, not stock images.
          </p>
        </div>
      </section>

      <section className="bg-bone py-14 lg:py-20">
        <div className="container-page">
          <WorkGallery />
        </div>
      </section>

      <ClosingCta
        heading="See something like your job?"
        body={`Call or send a text and describe what you need. ${site.business.name} works across ${site.business.areaServed} on residential, commercial, and industrial electrical, and on Generac home standby generators.`}
      />
    </>
  );
}
