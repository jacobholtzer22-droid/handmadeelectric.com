import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { site } from "@/site.config";
import PanelTag from "./PanelTag";
import CtaPair from "./CtaPair";

/**
 * The growth push, given its own full-width dark band so it is not just two
 * more cards in a grid.
 *
 * GENERAC CLAIM GATE, seo/FACTS.md section 5: while GENERAC STATUS is TODO the
 * only permitted wording is what this business does, never a relationship with
 * Generac. No logos, no badges, and none of the words authorized, certified,
 * factory-trained, or dealer. verify:copy fails the build if any appear.
 */
export default function GeneratorFeature() {
  const { business } = site;

  return (
    <section className="bg-graphite py-16 lg:py-24">
      <div className="container-page">
        <div className="lg:grid lg:grid-cols-12 lg:items-center lg:gap-14">
          <div className="lg:col-span-6">
            <PanelTag lit>Standby power</PanelTag>
            <h2 className="h-display mt-5 text-[1.875rem] text-bone sm:text-4xl lg:text-[2.75rem]">
              When the power goes out, the house{" "}
              <span className="conduit-underline whitespace-nowrap text-copper-bright">
                stays on
              </span>
            </h2>
            <p className="mt-6 max-w-prose text-[1.0625rem] leading-relaxed text-ash">
              We install, service, and repair Generac home standby generators. A
              standby unit sits outside, watches the utility power, and starts on
              its own when it drops, so the furnace, the sump pump, and the
              refrigerator keep running whether or not anyone is home.
            </p>

            <CtaPair className="mt-8" />

            {/* Navigation into the two dedicated pages, as links rather than
                more buttons. Four buttons in one block reads as a toolbar. */}
            <p className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
              <Link
                href="/services/generac-generator-installation"
                className="inline-flex min-h-[44px] items-center gap-1.5 font-semibold text-copper-bright underline underline-offset-4"
              >
                Generator installation
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
              <Link
                href="/services/generator-repair"
                className="inline-flex min-h-[44px] items-center gap-1.5 font-semibold text-copper-bright underline underline-offset-4"
              >
                Repair and service
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </p>
          </div>

          <div className="mt-12 lg:col-span-6 lg:mt-0">
            <div className="relative mx-auto max-w-[22rem] lg:ml-auto lg:mr-0 lg:max-w-[24rem]">
              <div
                className="absolute -bottom-3 -left-3 h-full w-full rounded-panel border-2 border-copper"
                aria-hidden="true"
              />
              <Image
                src="/images/residential.webp"
                alt="An exterior meter socket and service disconnect on a brick wall above an open trench for underground conduit"
                width={998}
                height={1330}
                sizes="(min-width: 1024px) 384px, (min-width: 640px) 352px, 100vw"
                className="relative rounded-panel"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
