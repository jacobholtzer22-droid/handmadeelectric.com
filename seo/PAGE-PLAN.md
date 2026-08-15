# PAGE-PLAN.md - Handmade Electric

Proposed route list, the job each page does, and the redirect map off the retired Squarespace
site. Approved at Gate 1, built in Phase 2, verified in Phase 3.

Every route below is pre-rendered at build time. Title, meta, H1, body copy, NAP, and JSON-LD
are present in the initial HTML with zero JavaScript executed.

---

## 1. Route list

| Route | Purpose | Primary JSON-LD |
|---|---|---|
| `/` | Direct-answer intro (who, what, where), services overview, prominent generator feature, reviews strip (gated off), trust row, service area, final CTA | `Electrician`, `WebSite`, `Organization` |
| `/services` | Index of all five service pages, the hub every service page links back to, and the landing target for the ambiguous old store URLs | `BreadcrumbList` |
| `/services/residential` | Homeowner-facing trade page: panel work, troubleshooting, renovations, safety upgrades | `Service`, `FAQPage`, `BreadcrumbList` |
| `/services/commercial` | Retail, office, and commercial property work: build-outs, lighting upgrades, code compliance | `Service`, `FAQPage`, `BreadcrumbList` |
| `/services/industrial` | Plants and warehouses: high-voltage systems, machinery hookups, panel inspections | `Service`, `FAQPage`, `BreadcrumbList` |
| `/services/generac-generator-installation` | **Growth page.** Generac standby generator installation, how standby power works, sizing, transfer switches, permits and inspection | `Service`, `FAQPage`, `BreadcrumbList` |
| `/services/generator-repair` | **Growth page.** Generator repair, service, and maintenance. Targets the "my generator will not start" searcher | `Service`, `FAQPage`, `BreadcrumbList` |
| `/about` | Written fresh from FACTS.md. The craft and owner angle, since the company is literally named Handmade | `BreadcrumbList` |
| `/contact` | Form wired to the CRM, plus click-to-call and click-to-text | `BreadcrumbList` |
| `/privacy` | Privacy policy. Required because the contact form carries an SMS consent checkbox | `BreadcrumbList` |

**9 routes at launch. 10 when reviews are turned on.**

**`/reviews` is NOT built.** While `site.reviews.enabled` is `false` the route does not exist:
not built, not in the nav, not in the sitemap, not linked from anywhere in the internal link
graph. An empty reviews page is a thin page, and it publishes the fact that this business has
no reviews yet. The homepage reviews strip is wired but renders nothing. Flipping the flag to
`true` is what creates the route, adds it to the nav and sitemap, and turns on the strip. Its
title gets written at that point, not now.

**`/privacy` is required, not optional.** The contact form collects a phone number under an SMS
consent checkbox, so the site must state what is collected, how the number is used, that message
and data rates apply, and that replying STOP opts out. The same document is a prerequisite for
10DLC registration and for running Google Ads. It is linked in the footer on every page and
again directly under the consent checkbox on the form, where the visitor is actually consenting.
Its content comes only from FACTS.md section 12: standard language, zero invented facts, and no
retention or third-party-sharing specifics that are not true of this setup. **The build report
flags that a human accountable for it should read it before launch.**

**Deliberately not built:** a blog, a gallery (six photos is not a gallery), a financing page,
a service-area page (the homepage section covers it until there is a real city list to justify
a page), and `/terms` (nothing is sold on this site, so there is nothing to set terms for).

## 2. Homepage section order

The homepage carries the most weight, so its order is explicit:

1. **Hero.** H1 plus a first paragraph that reads as a direct answer: who they are, what they
   do, where they work. Written as an extraction target for search and AI answer engines, not
   as a slogan. Call and text CTAs.
2. **Services overview.** Five service cards, linking to the five service pages.
   FACTS.md section 4 lists six service lines, but "generator maintenance and
   service" shares a page with generator repair rather than getting a thin page
   of its own. Five pages, six services covered.
3. **Generator feature.** Full-width, visually distinct, the growth push. Does not get buried
   below the fold filler.
4. **Reviews strip.** Wired but renders nothing while `site.reviews.enabled` is false. No
   placeholder, no "reviews coming soon", no empty state. The section is simply absent.
5. **Trust row.** License number, insured, years in business. **Renders only confirmed items**,
   so it may start nearly empty. That is correct behavior, not a bug.
6. **Service area.** Metro Detroit until the city list lands.
7. **Final CTA.**

Plus a sticky bottom call/text bar on mobile, on every page.

## 3. Service page template

Every service page follows one shape, so the six are consistent and none is thin:

1. Direct-answer intro naming the service and the area.
2. What is included.
3. Signs you need it.
4. How the process works.
5. FAQ, three to six questions, answers sourced only from FACTS.md.
6. CTA.

**Price questions** explain what drives the price and invite a quote. They never contain a
number, a range, or a "starting at."

**The generator pages** may carry general educational content that is true of standby generators
everywhere: how a standby system works, what a transfer switch does, what determines sizing, and
that permits and inspection are part of a proper installation. They carry **zero** invented
business-specific claims. No certifications, no turnaround promises, no warranty terms.

## 4. Title and meta pattern

Pattern: `[Service] in [City] | Handmade Electric`, with `Metro Detroit` standing in for the
city until FACTS.md section 3 is answered.

Titles target roughly 50 to 60 characters **counted on the rendered output including the
template suffix**, which is what Phase 3 measures. Metas run 140 to 160 characters and are
written as direct answers, not as ad copy.

Counted, not estimated. These are exact `.length` values on the full rendered string including
the suffix, printed by the title-count check and re-verified against the built HTML in Phase 3.

| Route | Title | Chars |
|---|---|---|
| `/` | `Electrician in Metro Detroit \| Handmade Electric` | 48 |
| `/services` | `Electrical Services in Metro Detroit \| Handmade Electric` | 56 |
| `/services/residential` | `Residential Electrician in Metro Detroit \| Handmade Electric` | 60 |
| `/services/commercial` | `Commercial Electrician in Metro Detroit \| Handmade Electric` | 59 |
| `/services/industrial` | `Industrial Electrician in Metro Detroit \| Handmade Electric` | 59 |
| `/services/generac-generator-installation` | `Generac Generators in Metro Detroit \| Handmade Electric` | 55 |
| `/services/generator-repair` | `Generator Repair in Metro Detroit \| Handmade Electric` | 53 |
| `/about` | `About Handmade Electric \| Metro Detroit Electrician` | 51 |
| `/contact` | `Contact Handmade Electric \| Metro Detroit Electrician` | 53 |
| `/privacy` | `Privacy Policy and SMS Terms \| Handmade Electric` | 48 |

Range 48 to 60. Nothing exceeds 60, so nothing truncates.

**Every title leads with the keyword, including the homepage.** The earlier brand-first homepage
title was wrong for this business: nobody is searching "Handmade Electric" yet, there is no
Google Business Profile, and there is no brand awareness to defend. The branded-result argument
only applies once a brand exists. Revisit it if that changes.

**Two titles sit at 48, two under the soft 50 floor, both deliberately.** The homepage uses the
exact approved wording rather than padding it to hit a number. `/privacy` is a utility page that
nobody searches for, and "Privacy Policy and SMS Terms" is more accurate than a padded
alternative, since the document does cover the SMS consent terms.

`/reviews` has no title because it has no route until reviews exist. It gets one when the flag
flips, and "Reviews | Handmade Electric" at 27 characters is not it.

## 5. Redirect map (Appendix B)

Permanent redirects, implemented in `next.config.mjs` and already scaffolded. Verified in
Phase 3 against the running server.

| Old Squarespace URL | New route | Type | Note |
|---|---|---|---|
| `/` | `/` | stays | |
| `/about` | `/about` | stays | Route survives, **copy is 100% replaced** |
| `/contact` | `/contact` | stays | |
| `/cart` | `/` | 308 | Squarespace store artifact, no cart on the new site |
| `/services-store-SAziy` | `/services` | 308 | |
| `/services-store-SAziy/p/industrial` | `/services` | 308 | **Ambiguous by the client's own linking.** This URL was what the Residential card pointed at, so its inbound intent is unknowable. Sent to the index rather than guessing wrong. |
| `/services-store-SAziy/p/commercial` | `/services/commercial` | 308 | |
| `/services-store-SAziy/p/industrial-1` | `/services/industrial` | 308 | |

The old site sold services as store products with a cart, which is why these URLs look like
this. None of that structure survives.

## 6. SEO infrastructure

- **Canonicals** on every page, self-referencing, resolved against `metadataBase`.
- **OG and Twitter** defaults sitewide with per-page overrides.
- **JSON-LD** via a single safe renderer component. Sitewide `Electrician` with name, url,
  telephone, email, image, logo, and `areaServed`. **No `address`, no `geo`, no
  `openingHoursSpecification`, no `sameAs`** until those facts exist. Plus `WebSite`,
  `Organization`, `BreadcrumbList` on all pages, `Service` on service pages, and `FAQPage`
  wherever FAQs visibly render. **No `Review`, no `aggregateRating`, ever.**
- **`robots.txt`** allowing GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-User,
  Google-Extended, PerplexityBot, Perplexity-User, Applebot-Extended, Meta-ExternalAgent,
  Amazonbot, and CCBot, and referencing the sitemap.
- **`sitemap.xml`** generated at build from the route list. `/reviews` is absent from it while
  the reviews flag is false, because the route does not exist.
- **`llms.txt`** at root. Filed under future-proofing, not a headline feature.
- **Favicon and app icons** generated from the logo, after the watermark and background issues
  in FACTS.md section 11 are resolved.

## 7. Copy artifact

`seo/COPY.md` is maintained as pages are written, and contains every page's title tag, meta
description, H1, full body copy, and FAQ set. It prints in full at Gate 3 so the words get
reviewed alongside the technical checks, without anyone digging through JSX.

## 8. Verification plan (Phase 3)

Scripted and printed, not asserted:

1. Clean production build, route list and page count.
2. `npm run verify:schema` - every JSON-LD block parses, has `@context` and `@type`, the type is
   on a hardcoded allowlist of real schema.org types, and no property asserts a fact absent from
   FACTS.md. Per-page results table.
3. No-JS check on the built HTML: title, meta, H1, first paragraph, phone presence, JSON-LD
   block count.
4. `npm run verify:copy` - grep asserts: phone in crawlable text on every page, zero
   `squarespace-cdn`, zero TODO/lorem/placeholder strings, zero em or en dashes, zero gated
   Generac terms.
5. Rendered title character counts, one table, including the suffix.
6. Internal link check.
7. Redirect map test with `curl -I` against the local server.
8. Screenshots at 390px and desktop.
9. Lighthouse mobile if available, target 90+.
10. **Image-usage map**: which photo file appears on which page in which slot, so repeats are
    visible rather than discovered. Enforces the photo budget rule in FACTS.md section 11.
11. `seo/COPY.md` printed in full, so the words are reviewed alongside the checks.
