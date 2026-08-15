import Link from "next/link";
import { Phone, MessageSquare, ArrowRight } from "lucide-react";
import { site } from "@/site.config";
import PanelTag from "./PanelTag";

/**
 * Service area plus the closing CTA in one band.
 *
 * The area is "Metro Detroit" and nothing more specific, because FACTS.md
 * section 3 has no confirmed city list. Do not invent one from "Metro Detroit".
 * When the list lands this section gets specific and city pages become worth a
 * future phase.
 */
export default function ClosingCta({
  heading = "Tell us what is going on",
  body,
}: {
  heading?: string;
  body?: string;
}) {
  const { business } = site;

  return (
    <section className="bg-graphite py-16 lg:py-20">
      <div className="container-page">
        <PanelTag lit>Serving {business.areaServed}</PanelTag>
        <h2 className="h-display mt-5 max-w-3xl text-[1.875rem] text-bone sm:text-4xl lg:text-[2.5rem]">
          {heading}
        </h2>
        <p className="mt-5 max-w-prose text-[1.0625rem] leading-relaxed text-ash">
          {body ??
            `Call or send a text and describe the problem or the project. ${business.name} works across ${business.areaServed} on residential, commercial, and industrial electrical, and on Generac home standby generators.`}
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link href="/contact" className="btn-primary">
            Request a quote
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <a href={business.phoneHref} className="btn-secondary">
            <Phone className="h-4 w-4" aria-hidden="true" />
            Call {business.phoneDisplay}
          </a>
          <a href={business.smsHref} className="btn-secondary">
            <MessageSquare className="h-4 w-4" aria-hidden="true" />
            Send a text
          </a>
        </div>
      </div>
    </section>
  );
}
