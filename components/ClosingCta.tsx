import Image from "next/image";
import { MessageSquare } from "lucide-react";
import { site } from "@/site.config";
import PanelTag from "./PanelTag";
import CtaPair from "./CtaPair";

/**
 * Service area plus the closing CTA in one band.
 *
 * The area is "Metro Detroit" and nothing more specific, because FACTS.md
 * section 3 has no confirmed city list. Do not invent one from "Metro Detroit".
 *
 * PHOTO BACKGROUND IS OPT-IN, and that is deliberate. This component renders at
 * the foot of every page, so a hard-coded background photograph would appear on
 * all of them and would collide with a page that already uses that image, which
 * breaks the no-repeat rule. Pages that want it pass their own, having checked
 * it is not used elsewhere on that page.
 *
 * Text sits on `.photo-scrim`, which is what keeps contrast at AA over a
 * photograph instead of hoping the image happens to be dark enough.
 */
export default function ClosingCta({
  heading = "Tell us what is going on",
  body,
  bgImage,
  bgAlt = "",
}: {
  heading?: string;
  body?: string;
  /** Optional full-bleed background. Caller guarantees no repeat on the page. */
  bgImage?: string;
  bgAlt?: string;
}) {
  const { business } = site;
  const hasPhoto = Boolean(bgImage);

  return (
    <section
      className={`relative overflow-hidden ${
        hasPhoto ? "bg-iron" : "bg-graphite"
      } py-16 lg:py-24`}
    >
      {hasPhoto && (
        <div className="photo-scrim absolute inset-0" aria-hidden="true">
          <Image
            src={bgImage as string}
            alt={bgAlt}
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
      )}

      <div className="container-page relative">
        <PanelTag lit>Serving {business.areaServed}</PanelTag>
        <h2 className="h-display mt-5 max-w-3xl text-[1.875rem] text-bone sm:text-4xl lg:text-[2.5rem]">
          {heading}
        </h2>
        <p className="mt-5 max-w-prose text-[1.0625rem] leading-relaxed text-ash">
          {body ??
            `Describe the problem or the project and we will pick it up from there. ${business.name} works across ${business.areaServed} on residential, commercial, and industrial electrical, and on Generac home standby generators.`}
        </p>

        <CtaPair className="mt-8" />

        {/* Texting is a confirmed behaviour of this business, so it keeps a
            place here even though the two primary controls are quote and call. */}
        <p className="mt-5 text-sm text-ash">
          Prefer to text?{" "}
          <a
            href={business.smsHref}
            className="inline-flex min-h-[44px] items-center gap-1.5 font-semibold text-copper-bright underline underline-offset-4"
          >
            <MessageSquare className="h-3.5 w-3.5" aria-hidden="true" />
            Send a text to {business.phoneDisplay}
          </a>
        </p>
      </div>
    </section>
  );
}
