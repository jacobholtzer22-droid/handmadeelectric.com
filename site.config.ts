/**
 * SITE CONFIG - Handmade Electric
 *
 * Every value here must trace to a CONFIRMED row in seo/FACTS.md.
 * Anything still TODO in FACTS.md is `null` here, and components must render
 * NOTHING for a null rather than substituting soft language.
 *
 * Phase 1 scope: only what the hero and services overview need. Phase 2 grows
 * this file to cover every page.
 */
export const site = {
  business: {
    name: "Handmade Electric",
    legalName: "Handmade Electric LLC",
    // FACTS 1. NOT "licensed electrical contractor". The word "licensed" is a
    // gated claim blocked until the license number lands, and verify:copy fails
    // the build if it appears anywhere in the rendered output.
    trade: "Electrical contractor",
    owner: "Trae", // FACTS 1, CONFIRMED (last name TODO)

    phoneDisplay: "(248) 787-0071",
    phoneHref: "tel:+12487870071",
    smsHref: "sms:+12487870071",
    email: "trae@handmadeelectric.com",

    // FACTS 3. "Metro Detroit" is the only confirmed geography.
    // Do NOT add city names here without a confirmed list.
    areaServed: "Metro Detroit",
  },

  /**
   * CLAIM GATES. Null means the fact is still TODO in FACTS.md, so the UI omits
   * the item entirely. Never replace a null with a softened phrase.
   */
  facts: {
    licenseNumber: null, // FACTS 6, highest-value TODO
    insured: null, // FACTS 6
    bonded: null, // FACTS 6
    yearFounded: null, // FACTS 6, "more than a decade" is QUARANTINED
    hours: null, // FACTS 2
    emergencyService: null, // FACTS 2, never a response time
    streetAddress: null, // FACTS 2, do not publish
    generacStatus: null, // FACTS 5, gates all Generac wording
    generatorBrands: null, // FACTS 4
  },

  reviews: {
    // FACTS 7. The REVIEWS block in the build brief was empty, so the whole
    // reviews system is built and gated off. Flip to true only when real
    // verbatim reviews are added to `quotes`.
    enabled: false,
    quotes: [] as { text: string; name: string; source: string }[],
  },

  crm: {
    url: "https://www.alignandacquire.com/api/contact", // www, never the apex
    // FACTS 9. PLACEHOLDER. Real slugs carry a numeric timestamp suffix.
    // A wrong slug still returns HTTP 200 and silently drops the lead.
    businessSlug: "handmade-electric",
  },

  services: [
    {
      slug: "residential",
      title: "Residential",
      short: "Panel work, troubleshooting, renovations, and safety upgrades for homes.",
      href: "/services/residential",
      image: "/images/panel-open.webp",
      alt: "An open residential breaker panel with the circuit directory label on the inside of the door",
    },
    {
      slug: "commercial",
      title: "Commercial",
      short: "Build-outs, lighting upgrades, and code-compliant power for businesses.",
      href: "/services/commercial",
      image: "/images/commercial.webp",
      alt: "A warehouse interior lit by rows of LED high bay fixtures, with pallets and boxes on the floor",
    },
    {
      slug: "industrial",
      title: "Industrial",
      short: "Machinery hookups, panel inspections, and high-voltage systems.",
      href: "/services/industrial",
      image: "/images/industrial.webp",
      alt: "A large industrial building interior with heavy conduit and electrical runs across the ceiling",
    },
    {
      slug: "generac-generator-installation",
      title: "Generac generator installation",
      short:
        "Standby generator installation, sized for the house and wired to a transfer switch.",
      href: "/services/generac-generator-installation",
      image: "/images/residential.webp",
      alt: "An exterior meter socket and service disconnect on a brick wall above an open trench for underground conduit",
      featured: true,
    },
    {
      slug: "generator-repair",
      title: "Generator repair and service",
      short:
        "Repair and maintenance for home standby generators that will not start or run.",
      href: "/services/generator-repair",
      image: "/images/panel-wood-wall.webp",
      alt: "A small subpanel mounted on a stained wood wall with a yellow cable run to an outlet and switch below",
      featured: true,
    },
  ],
} as const;

export type Site = typeof site;
