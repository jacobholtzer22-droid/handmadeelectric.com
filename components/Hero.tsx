import Image from "next/image";
import { Phone, MessageSquare } from "lucide-react";
import { site } from "@/site.config";
import PanelTag from "./PanelTag";

/**
 * The H1 and the first paragraph together are the direct answer: who, what,
 * where. Written to be extracted by a search or answer engine, not to be a
 * slogan. Every claim in here traces to a CONFIRMED row in seo/FACTS.md.
 *
 * The Generac sentence is the exact permitted wording while GENERAC STATUS is
 * still TODO. It says what the business does, and claims no relationship.
 *
 * No photo in the set is hero grade: they are all 998x1330 portrait phone
 * snapshots and the CDN has nothing larger. So the hero is typographic, and the
 * photo runs at its native portrait aspect where it stays sharp.
 */
export default function Hero() {
  const { business } = site;

  return (
    <section className="relative overflow-hidden bg-iron">
      <div className="container-page relative pb-14 pt-11 sm:pt-14 lg:pb-24 lg:pt-20">
        <div className="lg:grid lg:grid-cols-12 lg:items-center lg:gap-14">
          {/* --- Copy --- */}
          <div className="lg:col-span-7">
            {/* The location is carried by the H1, so the tag holds the
                credential alone and stays on one line at 390px. */}
            <PanelTag lit>{business.trade}</PanelTag>

            <h1 className="h-display mt-6 text-[2.125rem] text-bone sm:text-5xl lg:text-[3.85rem]">
              Electrical work and Generac generators in{" "}
              <span className="conduit-underline whitespace-nowrap text-copper-bright">
                Metro Detroit
              </span>
            </h1>

            <p className="mt-6 max-w-prose text-[1.0625rem] leading-relaxed text-ash sm:text-lg">
              {business.legalName} is an electrical contractor serving{" "}
              {business.areaServed}, covering residential, commercial, and
              industrial work. We install, service, and repair Generac home
              standby generators.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a href={business.phoneHref} className="btn-primary">
                <Phone className="h-4 w-4" aria-hidden="true" />
                Call {business.phoneDisplay}
              </a>
              <a href={business.smsHref} className="btn-secondary">
                <MessageSquare className="h-4 w-4" aria-hidden="true" />
                Or send a text
              </a>
            </div>
          </div>

          {/* --- Photo, native portrait aspect, offset copper frame --- */}
          <div className="mt-12 lg:col-span-5 lg:mt-0">
            {/* Capped so a 3:4 portrait does not push the hero past the fold
                on a 1280x800 desktop viewport. */}
            <div className="relative mx-auto max-w-[22rem] lg:ml-auto lg:mr-0 lg:max-w-[23.5rem]">
              <div
                className="absolute -bottom-3 -right-3 h-full w-full rounded-panel border-2 border-copper"
                aria-hidden="true"
              />
              {/* There are 5 photos for 6 image slots, so exactly one repeats.
                  This is the far end of that repeat: the same photo is used on
                  the generator repair card near the bottom of the page, rather
                  than on the Residential card directly below this hero. Its
                  warm stained wood also sits better against copper than the
                  gray-on-white panel does. */}
              <Image
                src="/images/panel-wood-wall.webp"
                alt="A subpanel mounted on a stained wood wall with a yellow cable run to an outlet and switch below"
                width={998}
                height={1330}
                priority
                sizes="(min-width: 1024px) 420px, (min-width: 640px) 352px, 100vw"
                className="relative rounded-panel"
              />
            </div>
          </div>
        </div>

        <div className="conduit-rule mt-14 lg:mt-20" aria-hidden="true" />
      </div>
    </section>
  );
}
