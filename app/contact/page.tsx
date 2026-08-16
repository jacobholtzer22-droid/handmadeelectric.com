import type { Metadata } from "next";
import { Phone, MessageSquare, Mail } from "lucide-react";
import { site } from "@/site.config";
import { breadcrumbNode } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import PanelTag from "@/components/PanelTag";
import EmblemWatermark from "@/components/EmblemWatermark";
import QuoteForm from "@/components/QuoteForm";

export const metadata: Metadata = pageMeta({
  title: `Request a Quote in ${site.business.areaServed} | ${site.business.name}`,
  description: `Request a quote from ${site.business.legalName}, an electrical contractor serving ${site.business.areaServed}. Send the job details, or call or text 248-787-0071.`,
  path: "/contact",
});

/**
 * This is the quote page. Calling and texting stay as co-equal paths, at the
 * top and in the sticky mobile bar, because plenty of people will always prefer
 * to talk. The form exists for everyone who will not call a stranger.
 *
 * Nothing here implies a price, a quote amount, a free estimate, or a response
 * time. The button says "Request a quote" and the success state says
 * "Request sent", the same verb.
 */
export default function ContactPage() {
  const { business } = site;

  return (
    <>
      <JsonLd
        nodes={[
          breadcrumbNode([
            { name: "Home", path: "/" },
            { name: "Request a quote", path: "/contact" },
          ]),
        ]}
      />

      <section className="relative overflow-hidden bg-iron pb-14 pt-11 sm:pt-14 lg:pb-16 lg:pt-16">
        {/* The one large emblem placement on this page. */}
        <EmblemWatermark size={520} className="-right-28 -top-20 hidden lg:block" />
        <div className="container-page relative">
          <PanelTag lit>{business.areaServed}</PanelTag>
          <h1 className="h-display mt-6 max-w-3xl text-[2rem] text-bone sm:text-[2.75rem] lg:text-[3.25rem]">
            Request an electrical quote
          </h1>
          <p className="mt-6 max-w-prose text-[1.0625rem] leading-relaxed text-ash sm:text-lg">
            Send the details of the job and {business.legalName} will get back to
            you. If you would rather talk it through, calling or texting reaches
            us the same way. Texting is often easiest for sending a photo of a
            panel or a fault code on a generator controller.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href={business.phoneHref} className="btn-primary">
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

      <section className="bg-bone py-14 lg:py-20">
        <div className="container-page">
          <div className="lg:grid lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5">
              <PanelTag tone="light">Quote request</PanelTag>
              <h2 className="h-display mt-5 text-[1.75rem] text-ink sm:text-3xl">
                Tell us about the job
              </h2>
              <p className="mt-4 max-w-prose text-[0.9375rem] leading-relaxed text-ink-dim">
                The more you can describe, the more useful the first
                conversation is. Address or city matters most, because it tells
                us whether the job is in range.
              </p>

              <dl className="mt-9 space-y-6">
                <div>
                  <dt className="font-panel text-[0.6875rem] uppercase tracking-panelwide text-ink-dim">
                    Phone and text
                  </dt>
                  <dd className="mt-2">
                    <a
                      href={business.phoneHref}
                      className="h-display inline-flex min-h-[44px] items-center text-xl text-ink transition-colors hover:text-copper-deep"
                    >
                      {business.phoneDisplay}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-panel text-[0.6875rem] uppercase tracking-panelwide text-ink-dim">
                    Email
                  </dt>
                  <dd className="mt-2">
                    <a
                      href={`mailto:${business.email}`}
                      className="inline-flex min-h-[44px] items-center gap-2 break-all text-[0.9375rem] text-ink transition-colors hover:text-copper-deep"
                    >
                      <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                      {business.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-panel text-[0.6875rem] uppercase tracking-panelwide text-ink-dim">
                    Service area
                  </dt>
                  <dd className="mt-2 text-[0.9375rem] text-ink-dim">
                    {business.areaServed}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="mt-10 lg:col-span-7 lg:mt-0">
              <QuoteForm variant="full" id="quote" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
