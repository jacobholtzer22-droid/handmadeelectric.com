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
     * FACTS 7. SIX REAL GOOGLE REVIEWS, VERBATIM.
     *
     * Transcribed exactly as they appear on the Google Business Profile. Not
     * edited, not tidied, not completed. Two of them are truncated by Google
     * itself and end mid-thought; they run exactly that far and no further.
     * Michael W.'s "to tier" and "upmost" are his words and stay as written.
     * Fixing a typo in someone else's review is putting words in their mouth.
     *
     * All six were left roughly two months before this build.
     *
     * NO RATINGS ANYWHERE. Google's list view did not expose a per-review
     * rating, and defaulting them to five stars would be inventing a fact. No
     * star on a card, no average, no review count. There is also NO Review and
     * NO aggregateRating JSON-LD, and the schema gate fails the build if either
     * type ever appears.
     */
    enabled: true,
    profileUrl: "https://share.google/PLzVzgUjENf8vHNiw",

    /**
     * RATINGS: UNCONFIRMED, so nothing renders.
     *
     * The six reviews were supplied without per-review star ratings, and the
     * Google list view they came from did not expose them. Every star on this
     * site is driven by these three values, and every one of them is null until
     * the numbers are read off the Google Business Profile.
     *
     * To turn stars on: open the profile, confirm the overall rating, the
     * review count, and each review's own rating, then set `averageRating`,
     * `reviewCount`, and each quote's `rating`. Stars appear everywhere at once.
     *
     * Do NOT set these to 5 because 5 is likely. If one of the six is a 4, the
     * site would be publishing a false average, which is exactly the class of
     * claim the rest of this file exists to prevent.
     *
     * NOTE: even with confirmed ratings there is still NO Review and NO
     * aggregateRating JSON-LD. That ban is separate and permanent. Visible
     * on-page stars only; the schema gate fails the build if either type
     * appears.
     */
    averageRating: null as number | null,
    reviewCount: null as number | null,
    quotes: [
      {
        name: "Jerry W.",
        source: "Google review",
        text: "We have used them on several jobs. Pricing is great, they communicate well and show up when they say.",
      },
      {
        name: "Carl Q.",
        source: "Google review",
        // Truncated by Google. Ends at the last complete sentence shown.
        truncated: true,
        text: "I had a whole-house surge protector installed by this company, and I couldn't be happier with the service. Trae was professional, arrived on time, and took the time to explain the installation and answer my questions.",
      },
      {
        name: "Kirk L.",
        source: "Google review",
        text: "Phenomenal experience from start to finish extremely professional and quick",
      },
      {
        name: "Carolyn P.",
        source: "Google review",
        text: "Dependable, great work",
      },
      {
        name: "Ed G.",
        source: "Google review",
        // Truncated by Google.
        truncated: true,
        text: "I can't say enough good things about Handmade Electric and the outstanding service they provided.",
      },
      {
        name: "Michael W.",
        source: "Google review",
        text: "My service was to tier! As a newer company it was their upmost concern to make sure we were taken care of above and beyond and that's exactly what we got! High quality, high efficiency. Would definitely recommend to family and friends. Life long customer here now!!",
      },
    ] as { name: string; source: string; text: string; truncated?: boolean }[],
  },

  crm: {
    url: "https://www.alignandacquire.com/api/contact", // www, never the apex
    /**
     * FACTS 9. CONFIRMED, copied from the live Business row
     * (id cmt02vco10000l204i2sy6dhp, name "Handmade Electric").
     *
     * THE ONLY COPY OF THIS VALUE IN THE REPO. Anything that needs the slug
     * imports it from here. A second hardcoded copy is how the two drift and
     * how leads start disappearing without anyone noticing.
     *
     * The endpoint still returns HTTP 200 whether or not a row is written, so a
     * correct slug is necessary but NOT sufficient: only a test lead appearing
     * in the Website Leads dashboard proves delivery.
     */
    businessSlug: "handmade-electric-1787143119840",
  },

  nav: [
    { label: "Services", href: "/services" },
    /* NO top-level Generators entry. The two generator pages are unchanged and
       are reached from the Services dropdown under "Standby power", from the
       services hub, and from the footer. Removing the shortcut is a NAV change
       only: neither page was merged, deleted, or redirected. */
    { label: "Work", href: "/work" },
    { label: "Reviews", href: "/reviews" },
    { label: "About", href: "/about" },
    /* Contact is deliberately NOT here. It is rendered as the "Get a quote"
       button in the header and the drawer instead, so the conversion path is a
       control rather than a menu item. The word Contact still appears in the
       footer. */
  ] as NavItem[],
};

export type Site = typeof site;
