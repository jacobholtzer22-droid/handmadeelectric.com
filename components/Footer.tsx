import Link from "next/link";
import { Phone, MessageSquare, Mail } from "lucide-react";
import { site } from "@/site.config";
import { services } from "@/lib/content/services";
import Wordmark from "./Wordmark";

/**
 * The footer carries the NAP on every page, which is where the phone-presence
 * check gets satisfied sitewide.
 *
 * Nothing here renders from a null fact. No hours block, no license line, no
 * social icons, no street address, because none of those are confirmed. See
 * seo/FACTS.md sections 2, 6, and 8.
 */
export default function Footer() {
  const { business, facts } = site;
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-steel bg-iron">
      <div className="container-page py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Wordmark />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ash">
              {business.trade} serving {business.areaServed}. Residential,
              commercial, and industrial work, plus Generac home standby
              generators.
            </p>
          </div>

          <div>
            <h2 className="font-panel text-[0.6875rem] uppercase tracking-panelwide text-bone">
              Services
            </h2>
            <ul className="mt-4 space-y-2.5">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="text-sm text-ash transition-colors hover:text-copper-bright"
                  >
                    {s.navTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-panel text-[0.6875rem] uppercase tracking-panelwide text-bone">
              Company
            </h2>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link href="/work" className="text-sm text-ash transition-colors hover:text-copper-bright">
                  Recent work
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-ash transition-colors hover:text-copper-bright">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-ash transition-colors hover:text-copper-bright">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-ash transition-colors hover:text-copper-bright">
                  Privacy policy and SMS terms
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-panel text-[0.6875rem] uppercase tracking-panelwide text-bone">
              Get in touch
            </h2>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href={business.phoneHref}
                  className="inline-flex min-h-[44px] items-center gap-2.5 text-sm text-ash transition-colors hover:text-copper-bright"
                >
                  <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
                  {business.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={business.smsHref}
                  className="inline-flex min-h-[44px] items-center gap-2.5 text-sm text-ash transition-colors hover:text-copper-bright"
                >
                  <MessageSquare className="h-4 w-4 shrink-0" aria-hidden="true" />
                  Send a text
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${business.email}`}
                  className="inline-flex min-h-[44px] items-center gap-2.5 break-all text-sm text-ash transition-colors hover:text-copper-bright"
                >
                  <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                  {business.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="conduit-rule mt-12" aria-hidden="true" />

        <div className="mt-6 flex flex-col gap-2 text-xs text-ash/70 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {business.legalName}. Serving {business.areaServed}.
            {/* The license line renders here the moment FACTS section 6 lands. */}
            {facts.licenseNumber ? ` License ${facts.licenseNumber}.` : ""}
          </p>
          <p>Site by Align and Acquire</p>
        </div>
      </div>
      {/* Clears the fixed mobile call and text bar. */}
      <div className="h-20 md:hidden" aria-hidden="true" />
    </footer>
  );
}
