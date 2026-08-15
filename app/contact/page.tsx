import type { Metadata } from "next";
import { Phone, MessageSquare, Mail } from "lucide-react";
import { site } from "@/site.config";
import { breadcrumbNode } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import PanelTag from "@/components/PanelTag";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = pageMeta({
  title: `Contact ${site.business.name} | ${site.business.areaServed} Electrician`,
  description: `Get in touch with ${site.business.legalName}, an electrical contractor serving ${site.business.areaServed}. Call or text 248-787-0071, or send a message and describe the job.`,
  path: "/contact",
});

export default function ContactPage() {
  const { business } = site;

  return (
    <>
      <JsonLd
        nodes={[
          breadcrumbNode([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]),
        ]}
      />

      <section className="bg-iron pb-14 pt-11 sm:pt-14 lg:pb-16 lg:pt-16">
        <div className="container-page">
          <PanelTag lit>{business.areaServed}</PanelTag>
          <h1 className="h-display mt-6 max-w-3xl text-[2rem] text-bone sm:text-[2.75rem] lg:text-[3.25rem]">
            Contact {business.name}
          </h1>
          <p className="mt-6 max-w-prose text-[1.0625rem] leading-relaxed text-ash sm:text-lg">
            {business.legalName} is an electrical contractor serving{" "}
            {business.areaServed}. Call or send a text, or fill out the form and
            describe the job. Texting is welcome, and it is often the easiest way
            to send a photo of a panel or a fault code.
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

      <section className="bg-bone py-16 lg:py-20">
        <div className="container-page">
          <div className="lg:grid lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5">
              <PanelTag tone="light">Details</PanelTag>
              <h2 className="h-display mt-5 text-[1.75rem] text-ink sm:text-3xl">
                Reach us directly
              </h2>

              <dl className="mt-8 space-y-6">
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
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
