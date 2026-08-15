import { site } from "@/site.config";
import type { Faq } from "@/lib/content/services";

/**
 * JSON-LD builders.
 *
 * HARD RULES, enforced by scripts/validate-jsonld.mjs:
 *  - No `Review` and no `aggregateRating`, ever, even once real reviews exist.
 *    Self-serving review markup on a business's own site has been ineligible
 *    for Google rich results since 2019 and is a trust risk.
 *  - No property may assert a fact that is not CONFIRMED in seo/FACTS.md.
 *    That is why there is no `address`, no `geo`, no `openingHoursSpecification`
 *    and no `sameAs` below: those facts do not exist yet. An empty or guessed
 *    value is worse than an absent one.
 *  - Schema must describe what is visibly on the page.
 */

const ORIGIN = site.business.origin;
export const BUSINESS_ID = `${ORIGIN}/#business`;
const ORG_ID = `${ORIGIN}/#organization`;

export type JsonLdNode = Record<string, unknown>;

/** The sitewide business node. Rendered once, in the root layout. */
export function electricianNode(): JsonLdNode {
  return {
    "@context": "https://schema.org",
    "@type": "Electrician",
    "@id": BUSINESS_ID,
    name: site.business.legalName,
    alternateName: site.business.name,
    url: ORIGIN,
    telephone: site.business.phoneDisplay,
    email: site.business.email,
    image: `${ORIGIN}/images/logo.webp`,
    logo: `${ORIGIN}/images/logo.webp`,
    description: `${site.business.legalName} is an electrical contractor serving ${site.business.areaServed}, covering residential, commercial, and industrial work, and installing, servicing, and repairing Generac home standby generators.`,
    areaServed: { "@type": "AdministrativeArea", name: site.business.areaServed },
    // NO address, geo, openingHoursSpecification, sameAs, aggregateRating.
    // See seo/FACTS.md sections 2, 6, 7, and 8.
  };
}

export function organizationNode(): JsonLdNode {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: site.business.legalName,
    url: ORIGIN,
    logo: `${ORIGIN}/images/logo.webp`,
  };
}

export function webSiteNode(): JsonLdNode {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${ORIGIN}/#website`,
    name: site.business.name,
    url: ORIGIN,
    publisher: { "@id": ORG_ID },
    inLanguage: "en-US",
  };
}

export function breadcrumbNode(
  crumbs: { name: string; path: string }[]
): JsonLdNode {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${ORIGIN}${c.path === "/" ? "" : c.path}`,
    })),
  };
}

export function serviceNode({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}): JsonLdNode {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    serviceType: name,
    description,
    url: `${ORIGIN}${path}`,
    provider: { "@id": BUSINESS_ID },
    areaServed: { "@type": "AdministrativeArea", name: site.business.areaServed },
  };
}

/**
 * Only emit this where the FAQ is VISIBLY rendered on the page. The questions
 * and answers passed here are the exact strings the page displays.
 */
export function faqNode(faq: Faq[]): JsonLdNode {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
