import type { Metadata } from "next";
import { site } from "@/site.config";
import { SMS_CONSENT_SENTENCES } from "@/lib/content/consent";
import { breadcrumbNode } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import PanelTag from "@/components/PanelTag";

export const metadata: Metadata = pageMeta({
  title: `Privacy Policy and SMS Terms | ${site.business.name}`,
  description: `How ${site.business.legalName} handles the information you submit through this website, how your phone number is used, and how to opt out of text messages.`,
  path: "/privacy",
});

/**
 * Content comes ONLY from seo/FACTS.md section 12. Every statement here is a
 * confirmed fact about this specific setup.
 *
 * Deliberately absent, because they are not established facts:
 *  - Any data retention period.
 *  - Any list of third parties beyond the lead platform that actually receives
 *    the form.
 *  - Any security guarantee.
 *  - Any cookie or analytics disclosure, because this build sets no cookies and
 *    installs no tracking.
 *
 * FLAGGED IN THE BUILD REPORT: a human accountable for it should read this
 * before launch. It is generated from confirmed facts, but a privacy policy is
 * a legal document and this build is not legal advice.
 */
export default function PrivacyPage() {
  const { business } = site;

  const sections = [
    {
      heading: "What this page covers",
      body: [
        `This page explains what ${business.legalName} collects when you use this website, what we do with it, and how to stop receiving text messages from us. It applies to this website and to the quote request form on it.`,
      ],
    },
    {
      heading: "What we collect",
      body: [
        "If you send the quote request form, we collect the name, phone number, and email address you enter, the service, property type, address or city, and job details you provide, and whether you checked the box consenting to text messages.",
        "If you call, text, or email us directly, we have whatever you send us in that message. We do not collect anything else from you through this website.",
      ],
    },
    {
      heading: "Cookies and tracking",
      body: [
        "This website does not set cookies, and it does not install analytics or advertising tracking.",
      ],
    },
    {
      heading: "How we use it",
      body: [
        "We use your information to respond to your request. That means calling you, texting you, or emailing you about the work you asked about, and following up on that job.",
        "Form submissions are delivered to us through the lead platform that runs this site's quote form, which notifies us when someone reaches out.",
      ],
    },
    {
      heading: "Text messages",
      body: [
        // Word for word what the quote form says, from the same constant, so
        // the two can never drift apart.
        ...SMS_CONSENT_SENTENCES,
        "The box is never checked for you, and you can send the form without it.",
        "Opting out of texts does not prevent us from reaching you by phone or email about a job you asked us about.",
      ],
    },
    {
      heading: "What we do not do",
      body: [
        "We do not sell your information. We do not share it with third parties for their own marketing.",
      ],
    },
    {
      heading: "Questions or removal requests",
      body: [
        `If you want to know what we have, or you want it removed, contact us at ${business.email} or call ${business.phoneDisplay} and ask.`,
      ],
    },
  ];

  return (
    <>
      <JsonLd
        nodes={[
          breadcrumbNode([
            { name: "Home", path: "/" },
            { name: "Privacy policy and SMS terms", path: "/privacy" },
          ]),
        ]}
      />

      <section className="bg-iron pb-14 pt-11 sm:pt-14 lg:pb-16 lg:pt-16">
        <div className="container-page">
          <PanelTag lit>Legal</PanelTag>
          <h1 className="h-display mt-6 max-w-3xl text-[2rem] text-bone sm:text-[2.5rem] lg:text-[3rem]">
            Privacy policy and SMS terms
          </h1>
          <p className="mt-6 max-w-prose text-[1.0625rem] leading-relaxed text-ash">
            {business.legalName} is an electrical contractor serving{" "}
            {business.areaServed}. This page explains what this website collects
            and how your phone number is used. You can reach us any time at{" "}
            <a
              href={business.phoneHref}
              className="font-semibold text-copper-bright underline underline-offset-4"
            >
              {business.phoneDisplay}
            </a>
            .
          </p>
        </div>
      </section>

      <section className="bg-bone py-16 lg:py-20">
        <div className="container-page">
          <div className="max-w-prose space-y-10">
            {sections.map((section) => (
              <div key={section.heading}>
                <div className="conduit-rule conduit-rule-light" aria-hidden="true" />
                <h2 className="h-display mt-4 text-xl text-ink sm:text-2xl">
                  {section.heading}
                </h2>
                {section.body.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 40)}
                    className="mt-3 text-[0.9375rem] leading-relaxed text-ink-dim"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
