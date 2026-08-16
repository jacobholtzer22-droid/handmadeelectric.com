import Link from "next/link";
import { Phone, MessageSquare } from "lucide-react";
import { site } from "@/site.config";
import PanelTag from "@/components/PanelTag";
import CtaPair from "@/components/CtaPair";

/**
 * A 404 on a trades site should offer a way to reach a human, not a dead end.
 * Carrying the phone here is also what lets verify:copy drop its exemption and
 * enforce phone presence on every rendered page without exception.
 */
export default function NotFound() {
  const { business } = site;

  return (
    <section className="bg-iron py-20 lg:py-28">
      <div className="container-page">
        <PanelTag lit>Page not found</PanelTag>
        <h1 className="h-display mt-6 max-w-2xl text-[2rem] text-bone sm:text-[2.5rem] lg:text-[3rem]">
          That page is not here
        </h1>
        <p className="mt-6 max-w-prose text-[1.0625rem] leading-relaxed text-ash">
          The link may be out of date. {business.legalName} is an electrical
          contractor serving {business.areaServed}. If you know what you need,
          calling or texting {business.phoneDisplay} is faster than hunting for
          the right page.
        </p>

        <CtaPair className="mt-8" />

        <div className="conduit-rule mt-12" aria-hidden="true" />
        <ul className="mt-6 flex flex-wrap gap-x-7 gap-y-3">
          {[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: "Generators", href: "/services/generac-generator-installation" },
            { label: "Contact", href: "/contact" },
          ].map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="font-panel text-[0.6875rem] uppercase tracking-panelwide text-copper-bright"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
