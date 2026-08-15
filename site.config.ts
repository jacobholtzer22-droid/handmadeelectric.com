/**
 * SITE CONFIG - Handmade Electric
 *
 * Every value here must trace to a CONFIRMED row in seo/FACTS.md.
 * Anything still TODO in FACTS.md is `null`, and components render NOTHING for
 * a null rather than substituting soft language.
 *
 * Not `as const` on purpose: readonly arrays fight component props for no
 * benefit. Types are declared explicitly instead.
 */

export type NavItem = { label: string; href: string };

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
    // Do NOT add city names without a confirmed list.
    areaServed: "Metro Detroit",

    origin: "https://www.handmadeelectric.com",
  },

  /**
   * CLAIM GATES. Null means the fact is still TODO in FACTS.md, so the UI omits
   * the item entirely. Never replace a null with a softened phrase.
   */
  facts: {
    licenseNumber: null as string | null, // FACTS 6, highest-value TODO
    insured: null as boolean | null, // FACTS 6
    bonded: null as boolean | null, // FACTS 6
    yearFounded: null as number | null, // FACTS 6, decade claim QUARANTINED
    hours: null as string | null, // FACTS 2
    emergencyService: null as boolean | null, // FACTS 2, never a response time
    streetAddress: null as string | null, // FACTS 2, do not publish
    generacStatus: null as string | null, // FACTS 5, gates all Generac wording
    generatorBrands: null as string | null, // FACTS 4
  },

  reviews: {
    /**
     * FACTS 7. While this is false the /reviews route DOES NOT EXIST: not
     * built, not in nav, not in the sitemap, not in the link graph. Flipping it
     * to true is what creates all of that plus the homepage strip.
     */
    enabled: false,
    quotes: [] as { text: string; name: string; source: string }[],
  },

  crm: {
    url: "https://www.alignandacquire.com/api/contact", // www, never the apex
    /**
     * FACTS 9. PLACEHOLDER. Real slugs carry a numeric timestamp suffix, e.g.
     * "j-molina-landscaping-1783524591862". A wrong slug still returns HTTP 200
     * and silently drops the lead. Copy the real value out of the live admin.
     */
    businessSlug: "handmade-electric",
  },

  nav: [
    { label: "Services", href: "/services" },
    { label: "Generators", href: "/services/generac-generator-installation" },
    { label: "Work", href: "/work" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ] as NavItem[],
};

export type Site = typeof site;
