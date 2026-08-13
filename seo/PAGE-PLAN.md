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
| `/services` | Index of all six services, the hub every service page links back to, and the landing target for the ambiguous old store URLs | `BreadcrumbList` |
| `/services/residential` | Homeowner-facing trade page: panel work, troubleshooting, renovations, safety upgrades | `Service`, `FAQPage`, `BreadcrumbList` |
| `/services/commercial` | Retail, office, and commercial property work: build-outs, lighting upgrades, code compliance | `Service`, `FAQPage`, `BreadcrumbList` |
| `/services/industrial` | Plants and warehouses: high-voltage systems, machinery hookups, panel inspections | `Service`, `FAQPage`, `BreadcrumbList` |
| `/services/generac-generator-installation` | **Growth page.** Generac standby generator installation, how standby power works, sizing, transfer switches, permits and inspection | `Service`, `FAQPage`, `BreadcrumbList` |
| `/services/generator-repair` | **Growth page.** Generator repair, service, and maintenance. Targets the "my generator will not start" searcher | `Service`, `FAQPage`, `BreadcrumbList` |
| `/reviews` | Real reviews only. Built now, gated off while the REVIEWS block is empty, one config flag turns it on | `BreadcrumbList` |
| `/about` | Written fresh from FACTS.md. The craft and owner angle, since the company is literally named Handmade | `BreadcrumbList` |
| `/contact` | Form wired to the CRM, plus click-to-call and click-to-text | `BreadcrumbList` |

**10 routes.** No city landing pages in this build, that is a future paid phase and it depends
on the city list TODO. No thin filler pages.

**Deliberately not built:** a blog, a gallery (six photos is not a gallery), a financing page,
a service-area page (the homepage section covers it until there is a real city list to justify
a page).

## 2. Homepage section order

The homepage carries the most weight, so its order is explicit:

1. **Hero.** H1 plus a first paragraph that reads as a direct answer: who they are, what they
   do, where they work. Written as an extraction target for search and AI answer engines, not
   as a slogan. Call and text CTAs.
2. **Services overview.** Six services, linking to the six pages.
3. **Generator feature.** Full-width, visually distinct, the growth push. Does not get buried
   below the fold filler.
4. **Reviews strip.** Gated off while empty.
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

Drafts, to be finalized in Phase 2 and character-counted in Phase 3:

| Route | Draft title | Approx |
|---|---|---|
| `/` | `Handmade Electric \| Electrician in Metro Detroit` (absolute, brand first) | 48 |
| `/services` | `Electrical Services in Metro Detroit \| Handmade Electric` | 56 |
| `/services/residential` | `Residential Electrician in Metro Detroit \| Handmade Electric` | 60 |
| `/services/commercial` | `Commercial Electrician in Metro Detroit \| Handmade Electric` | 59 |
| `/services/industrial` | `Industrial Electrician in Metro Detroit \| Handmade Electric` | 59 |
| `/services/generac-generator-installation` | `Generac Generator Installation \| Handmade Electric` | 50 |
| `/services/generator-repair` | `Generator Repair in Metro Detroit \| Handmade Electric` | 53 |
| `/reviews` | `Reviews \| Handmade Electric` | 27 |
| `/about` | `About \| Handmade Electric` | 25 |
| `/contact` | `Contact Handmade Electric \| Metro Detroit Electrician` | 53 |

The homepage title is absolute and brand-first, because the homepage owns the branded search
result. The service pages lead with the keyword.

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
- **`sitemap.xml`** generated at build from the route list.
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
