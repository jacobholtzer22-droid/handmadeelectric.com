# FACTS.md - Handmade Electric LLC

**This file is the single source of truth for every factual claim on the website.**

Rules for anyone (human or AI) touching this site:

1. If a claim is not in this file as `CONFIRMED`, it does not go on the site, in the copy, in
   the metadata, or in the JSON-LD.
2. Nothing here may be filled in by inference, by a plausible guess, or by copying what a
   competitor says. Facts come from Trae or from a document Trae supplies.
3. `TODO` items stay TODO. They do not become soft language on the site, they become an
   absence. A missing fact means the sentence, the trust-row item, or the schema property is
   omitted entirely.
4. When a TODO is answered, update this file first, then the site, then re-run
   `npm run verify:schema` and `npm run verify:copy`.

Status vocabulary: `CONFIRMED` (supplied by client, usable) / `TODO` (missing, omit from site) /
`UNVERIFIED` (appeared on the old site, must be confirmed before reuse).

---

## 1. Identity

| Fact | Value | Status |
|---|---|---|
| Legal name | Handmade Electric LLC | CONFIRMED |
| Display name | Handmade Electric | CONFIRMED |
| Owner first name | Trae | CONFIRMED |
| Owner last name | - | TODO |
| Owner name spelling | "Trae" per client folder and email address | UNVERIFIED - confirm spelling |
| Trade | Electrical contractor | CONFIRMED |
| Licensed (as a rendered claim) | - | **TODO, blocked until the section 6 license number lands** |
| Website domain | handmadeelectric.com | CONFIRMED |
| Canonical origin | `https://www.handmadeelectric.com` | CONFIRMED (www is primary per launch plan) |

**Where used:** every page title suffix, footer, `Electrician` JSON-LD `name`, About page.
**Owner last name** is only needed if the About page names him in full; until then the About
page says "Trae" alone.

**The word "licensed" is a gated claim, not a descriptor.** The brief described the business as
"a licensed electrical contractor," but that is the brief's framing, not a supplied credential.
Calling him licensed in rendered copy is a claim, and this file does not carry the license
number that backs it, so the site says **"electrical contractor"** with no qualifier. `licensed`
and `fully licensed` are in the `verify:copy` blocklist for exactly as long as the section 6
license number is TODO. **Both unblock together, in the same edit, never separately.**

Note the grammar consequence: "is a licensed electrical contractor" becomes "is **an** electrical
contractor". Do not leave a stale article behind when this flips back.

## 2. Contact

| Fact | Value | Status |
|---|---|---|
| Phone (voice and SMS) | 248-787-0071 | CONFIRMED |
| Phone display format | (248) 787-0071 | CONFIRMED (derived formatting only) |
| Phone href | `tel:+12487870071` | CONFIRMED (derived) |
| SMS href | `sms:+12487870071` | CONFIRMED (derived) |
| Email | trae@handmadeelectric.com | CONFIRMED |
| Street address | not published | TODO - **do not publish unless the client asks** |
| Hours | - | TODO |
| Emergency service offered | - | TODO |
| Emergency response time | - | **NEVER PUBLISH.** No response-time promise goes on this site under any circumstance, even if supplied. |

The business explicitly invites text messages (old site: "text 248-787-0071"), so every phone
CTA is paired with a text CTA. That pairing is a confirmed behavior, not an assumption.

**Address consequence:** with no published street address, the `Electrician` JSON-LD carries
**no `address` property and no `geo` property**. This is correct for a service-area business.
Do not add an empty or partial `PostalAddress` to satisfy a schema validator.

**Hours consequence:** no `openingHoursSpecification` in the JSON-LD and no hours block in the
footer until Trae supplies them.

## 3. Service area

| Fact | Value | Status |
|---|---|---|
| Region served | Metro Detroit | CONFIRMED |
| Home base city | - | TODO |
| Specific cities served | - | TODO |
| Counties served | - | TODO |

**Where used:** `areaServed` in JSON-LD, page titles (`[Service] in [City]` pattern), the
service-area section, H1 and first-paragraph direct answers.

**Consequence while TODO:** `areaServed` is the single value `"Metro Detroit"`. Titles use the
`[Service] in Metro Detroit | Handmade Electric` form rather than a city. When the city list
lands, titles and the service-area section get more specific, and city landing pages become
worth a future phase. **Do not invent a city list from "Metro Detroit."**

## 4. Services

| Service | Status | Note |
|---|---|---|
| Residential electrical | CONFIRMED | existing line of business |
| Commercial electrical | CONFIRMED | existing |
| Industrial electrical | CONFIRMED | existing |
| Generac standby generator installation | CONFIRMED | growth push, gets homepage prominence |
| Generator repair | CONFIRMED | growth push |
| Generator maintenance and service | CONFIRMED | growth push |
| Generator brands serviced (all brands vs Generac only) | TODO | changes who the repair page targets |
| Industrial electrical, still wanted? | **DECISION PENDING** | see below |
| EV charger installation | **TODO, HIGH PRIORITY** | see below |

**INDUSTRIAL IS NOW A PENDING DECISION, not a settled fact.** It was confirmed from the build
brief and the old Squarespace blurb, but Trae's own current branding (the logo lockup, section
11) names only "RESIDENTIAL & COMMERCIAL ELECTRICAL SERVICES". The industrial page is built and
shipping, but it is contingent on Trae confirming he still wants industrial work.

- If he confirms: nothing changes, and the row above becomes CONFIRMED.
- If he says residential and commercial only: **the industrial page comes out** and the
  industrial photos move to `/work`.

Because it may be removed, **the industrial page must not become load-bearing.** It is not in
the header nav, and nothing else on the site depends on it existing. Removing it must be a
clean deletion, never a cascade of broken internal links.

**EV CHARGER INSTALLATION, ask Trae, high priority.** Competitors in this market have review
flow dominated by EV charger installs, and the work pairs directly with the panel and service
upgrades this business already does, so it may be a stronger page than either of the service
sub-pages. **Nothing is built for it and nothing references it anywhere on the site until it is
confirmed.** Do not add it to a service list, a form dropdown, an FAQ, or a meta description on
the assumption that the answer will be yes.

**Consequence of the brands TODO:** the generator repair page is written to be true either way.
It says the company repairs and services home standby generators, and names Generac as a brand
it installs and services. It does **not** claim "all brands" or "any make and model" until that
is confirmed. If Trae confirms all-brands, the repair page gains that line and gets stronger
for non-Generac searches.

## 5. Generac status - CLAIM GATE

| Fact | Value | Status |
|---|---|---|
| GENERAC STATUS | - | **TODO** |

**Until this is answered, the permitted wording is exactly this class of sentence:**

> "We install, service, and repair Generac home standby generators."

**Banned everywhere on the site while this is TODO** (enforced by `npm run verify:copy`,
which greps the built HTML):

- "authorized" / "authorized dealer"
- "certified" / "Generac certified" / "factory certified"
- "factory-trained"
- "dealer"
- Generac logos, wordmarks, dealer badges, or seals of any kind
- Any implication of a formal relationship with Generac, including "partner" and "approved"

If Trae confirms a formal status, update this row, then the copy, then remove the specific
banned term from the verify script's blocklist, and only then add supplied brand assets.
Brand assets must come from Trae or Generac's dealer portal, never from a web image search.

**Same discipline applies to any other brand or certification** (Kohler, Cummins, Briggs,
master electrician credentials, NECA, IBEW, manufacturer training). Nothing goes on the site
without a row in this file.

## 6. Credentials and trust signals

| Fact | Value | Status |
|---|---|---|
| Michigan electrical contractor license # | - | **TODO - highest-value missing fact** |
| Licensed (as a rendered claim) | - | **TODO, blocked on the row above. Same edit unblocks both.** |
| EV charger installation | - | **TODO - HIGH PRIORITY, ask Trae. See section 4.** |
| Insured | - | TODO |
| Bonded | - | TODO |
| Years in business | old site claimed "more than a decade" | **UNVERIFIED - do not reuse until confirmed** |
| Year founded | - | TODO |
| Warranty terms | - | TODO - **never invent** |

**Where the license number slots in:** footer line on every page, the About page trust
paragraph, and the trust row on the homepage. It is the single strongest trust signal an
electrical contractor can show, and it is verifiable by any homeowner against the State of
Michigan LARA license lookup, which is exactly why it converts.

**Consequence while TODO:** the trust row omits the license item entirely rather than saying
"licensed" without a number. The homepage trust row renders only the items that are confirmed,
so it may start with fewer than three items. **An empty trust row is better than a padded one.**

**The word itself is blocked, not just the trust row.** `licensed` and `fully licensed` are in
the `verify:copy` blocklist and the build check fails if either appears anywhere in the rendered
output, including headings, eyebrows, meta descriptions, alt text, and JSON-LD. Without the
number, "licensed" is an unbacked credential claim, which is the same class of problem as the
gated Generac wording in section 5. When the number lands, remove both terms from the blocklist
and add the credential in the same commit.

**The "more than a decade" claim is quarantined.** It came from Squarespace-era copy of unknown
provenance on a page that also described a nationwide utility company that does not exist. It
does not go on the new site until Trae confirms a founding year.

## 7. Reviews - CLAIM GATE

| Fact | Value | Status |
|---|---|---|
| Reviews supplied | **6, verbatim from Google** | **CONFIRMED** |
| Star rating | 5.0 | **CONFIRMED** from the Google Business Profile |
| Review count | 6 | **CONFIRMED** from the Google Business Profile |
| Google Business Profile | `https://share.google/PLzVzgUjENf8vHNiw` | **CONFIRMED, it exists** |

**Rules:**

- Only reviews pasted verbatim by Jacob into the build brief may appear. Typo fixes are the
  maximum edit. Nothing is written, composed, paraphrased into existence, or embellished.
- Attribution is first name plus last initial plus source, e.g. "Mike R., Google review".
- **Ratings are CONFIRMED and displayed.** Overall 5.0 from 6 reviews, with all
  six individually at five stars, read directly off the profile: the
  distribution bar shows all six in the 5 row and the 4, 3, 2, and 1 rows empty.
  Stars render from `site.config` data only, so a null rating still draws
  nothing. They were held back until this evidence existed rather than defaulted
  to five because five was likely.
- **No `Review` or `aggregateRating` JSON-LD, ever, even once real reviews exist.** Self-serving
  review markup on a business's own site has been ineligible for Google rich results since 2019
  and carries trust risk. Visible on-page reviews only. The schema validator fails the build if
  either type appears.
- **Reviews are ON.** Six real Google reviews are live: a rotating section on the homepage
  directly below the hero, and the full set on `/reviews`. The flag `site.reviews.enabled`
  creates the route, adds it to the nav and the sitemap, and renders the homepage section, all
  from one switch. Turning it off removes all of that cleanly, including the sitemap entry.
- **NO RATING IS DISPLAYED ANYWHERE.** Not a star on a card, not an average, not a count.
  Google's list view did not expose a per-review rating, so assigning five by default would be
  inventing a fact. The star-rating and review-count rows above stay TODO precisely because we
  are not showing either, and they must not be filled in from an impression.
- **Two reviews are truncated by Google itself.** Carl Q. and Ed G. end mid-thought because
  Google cuts longer reviews in its listing. They run exactly that far. They are labelled on the
  card so a reader knows the cut is Google's, not ours. Do not "complete" them.
- **Typos stay.** Michael W. wrote "to tier" and "upmost". Those are his words. Correcting
  someone else's review is putting words in their mouth, and it is the same class of error as
  writing one from scratch.

## 8. Profiles and social

| Fact | Value | Status |
|---|---|---|
| Google Business Profile URL | `https://share.google/PLzVzgUjENf8vHNiw` | **CONFIRMED** |
| Facebook | - | TODO |
| Instagram | - | TODO |
| Any other profile | - | TODO |

**Correction to an earlier statement in this file.** Section 7 and the build report both used to
say no Google Business Profile could be found. That was wrong, and it is now corrected in both:
the profile exists, and the six reviews on the site came from it.

**Consequence:** `sameAs` now carries the Google Business Profile URL and nothing else. It is a
real URL, not a guess. Facebook and Instagram stay out until real URLs exist, because a guessed
`sameAs` entry is worse than an absent one. Social icons stay hidden.

**Still worth asking Trae for:** the canonical profile URL from the Google Business Profile
dashboard. The value above is a `share.google` short link, which works and resolves, but the
full `google.com/maps/place/...` URL is the more durable thing to put in `sameAs`.

## 9. CRM wiring

| Fact | Value | Status |
|---|---|---|
| CRM endpoint | `https://www.alignandacquire.com/api/contact` | CONFIRMED (www, never the bare apex) |
| Payload fields | `{ name, phone, email, message, smsConsent, businessSlug }` | CONFIRMED - exact contract, no additions |
| businessSlug | `handmade-electric-1787143119840` | **CONFIRMED**, copied from the live Business row |

**Source:** the live `Business` row, id `cmt02vco10000l204i2sy6dhp`, name "Handmade Electric".
Copied character for character, not inferred from the business name.

**The slug is not a guessable string.** It is the business name followed by a numeric timestamp
suffix generated at row creation, the same shape as a sibling client site on this platform
(`j-molina-landscaping-1783524591862`). Anything that drops the suffix is wrong.

**It exists in exactly ONE place in the repo**, `site.config.ts` `crm.businessSlug`. Everything
that needs it, including the contract-check script, imports it from there. A second hardcoded
copy is how the two drift apart and how leads start disappearing silently.

**Known failure mode, do not forget it:** this endpoint returns HTTP 200 even when the slug
matches no Business row and nothing is written to the database. A 200 proves nothing. Combined
with the timestamp-suffix slug format above, a wrong slug fails completely silently: the
visitor sees a success message and the lead evaporates. The only valid confirmation is a test
lead submitted through the deployed form appearing in the platform admin Website Leads
dashboard. That happens on Jacob's launch checklist, not during the build.

Any extra form fields (for example a property address or a job-type selector) must be folded
into the `message` string as text. The payload keys never change.

## 10. Salvaged copy from the old site

| Source | Verdict |
|---|---|
| Residential blurb | **USABLE**, may be lightly edited |
| Commercial blurb | **USABLE**, may be lightly edited |
| Industrial blurb | **USABLE**, may be lightly edited |
| Contact line ("text 248-787-0071") | **USABLE** as behavioral confirmation |
| Homepage "more than a decade" claim | **QUARANTINED** pending confirmation (see section 6) |
| About page (grid performance, nationwide clients, sustainable energy management) | **DISCARDED ENTIRELY.** Squarespace-template filler describing a nationwide electrical utility company that does not exist. Not one word migrates. The About page is written fresh from this file. |

The three service blurbs are the only substantial prose on the old site that describes the
actual business. They are reused as the foundation of the three trade service pages, edited for
the no-em-dash rule and to remove the mild puffery, not expanded with new claims.

## 11. Asset inventory

All assets are downloaded into the repo and self-hosted. **Zero `squarespace-cdn.com` references
may survive in the built output** (enforced by `npm run verify:copy`). Originals are preserved
untouched in `public/images/source/`.

| File | What is actually in it | Dimensions | Notes |
|---|---|---|---|
| `logo.webp` | Metal emblem: copper and bronze gears, wrenches and pliers around a glowing Edison bulb, banner reading HANDMADE, ELECTRIC LLC below with a small US flag | 1024x559 | **Three problems, see below** |
| `panel-open.webp` | Residential load center with the door open, breaker directory sheet on the inner door, roughly 20 breakers, cables entering the top | 998x1330 | Real job photo |
| `panel-wood-wall.webp` | Small subpanel on a dark stained wood wall, yellow cable run, an outlet and a switch below | 998x1330 | Real job photo |
| `residential.webp` | Exterior meter socket and emergency service disconnect on a brick wall, open trench and conduit for an underground service run | 998x1330 | **Real job photo, not stock** |
| `commercial.webp` | Warehouse interior with new LED high-bay lighting, exposed structure, workers and pallets below | 998x1330 | **Real job photo, not stock** |
| `industrial.webp` | Large older industrial space, heavy exposed conduit and ceiling infrastructure, dim | 998x1330 | **Real job photo, not stock.** Weakest of the set, dark and unflattering |

**Correction to the build brief:** the three service card images were flagged as "likely stock,
acceptable." They are not stock. They are genuine job photos from this business, which is
better for both trust and search. The brief's assumption is superseded by inspection.

### Logo assets from Trae's photo drop (supersede the Squarespace file)

| File | What it is | Status |
|---|---|---|
| `logo-emblem-dark.webp` | The emblem on a dark ground. No claim text, no AI watermark, sharper than the hand-keyed version | **IN USE.** This is the site logo |
| `logo-lockup.webp` | Full branded lockup: emblem, wordmark, "LICENSED ELECTRICAL CONTRACTOR", "RESIDENTIAL & COMMERCIAL ELECTRICAL SERVICES", "SERVING THE METRO DETROIT AREA", and the phone number | **HELD, UNUSED.** See below |
| `logo-emblem.png` | The version keyed by hand off the light Squarespace file | **RETIRED.** Superseded |

**The lockup is held intact and unused, deliberately.** It has "LICENSED ELECTRICAL CONTRACTOR"
baked into the artwork. Shipping it would render the exact claim that `verify:copy` blocks in
text, which is enforcement theater: a gate on words is worthless if the same claim ships as
pixels. **Do not crop the credential line off it, and do not delete the file.** It ships intact
the moment the license number lands, in the same edit that unblocks the word.

**The lockup is also evidence, in two directions:**

1. **It is independent evidence the credential exists.** Trae's own branding calls him a
   licensed electrical contractor, which is a strong reason to ask him for the number rather
   than treat section 6 as a long shot.
2. **It is a second, independent source confirming the service area.** "SERVING THE METRO
   DETROIT AREA" in his own artwork corroborates section 3, which until now rested only on the
   build brief.

It is also the reason industrial is now a pending decision (section 4): the lockup names
residential and commercial only.

**Problems with the ORIGINAL Squarespace logo file, kept for the record:**

1. **It carries a visible AI-generation watermark.** A four-point sparkle sits in the
   bottom-right margin, the standard Google Gemini image watermark. It is subtle at small sizes
   and obvious at large ones. It is in empty background, so it can be cropped out.
2. **No transparency.** The background is baked-in flat light gray (sampled RGB 204-227, no
   alpha channel), so the emblem cannot sit on a dark section without a light box around it.
3. **Raster, and small.** 1024x559 is fine for a header badge and a favicon, thin for anything
   large. There is no vector original.

**Resolution ceiling:** the Squarespace CDN will not serve anything larger than what is above.
`?format=2500w` returns the identical bytes. These are the maximum available. Collecting the
full-resolution originals from Trae before Squarespace is cancelled is a real quality upgrade
and is on the launch checklist.

**Photo consequence for design:** every photo is a portrait phone snapshot at 998x1330. There is
no wide, bright, hero-grade image in the set. A full-bleed photographic hero would have to
upscale and crop a portrait phone photo, which would look cheap. The Phase 1 hero is therefore
built as a typographic and graphic composition with a photo used at its native portrait aspect,
where it looks intentional and stays sharp.

### STANDING DESIGN RULE: the photo budget

Five usable photos for the entire site. All portrait phone snapshots. `industrial.webp` is dark
and unflattering and is the weakest of the set.

1. **Never place the same image twice on one page, or in adjacent viewport space.** One repeat
   across the whole site is unavoidable at this count; it must be spread as far apart as
   possible. The homepage already burns its allowance: the hero and the generator-repair card
   share `panel-wood-wall.webp`, deliberately separated by the full page.
2. **If a section needs a photo that does not exist, build it typographically.** Do not stretch,
   upscale, or heavily crop a portrait shot to fake a wide image. A well-set type composition
   beats a mangled photo every time, and it is the reason the hero works.
3. **An image-usage map is printed at Gate 3**, listing which file appears on which page in
   which slot, so repeats are visible up front rather than discovered by a reader.
4. **More photos from Trae is the single cheapest quality upgrade available** and sits above the
   full-resolution-originals item on the launch checklist.

## 12. Data handling, for the privacy policy

The contact form carries an SMS consent checkbox, so the site needs a privacy policy. These are
the only data-handling facts known to be true of this setup. **The privacy page states these and
nothing more.** No retention periods, no third-party lists, no cookie or analytics claims, and
no security guarantees, because none of those are established here.

| Fact | Value | Status |
|---|---|---|
| What the form collects | name, phone, email, message, SMS consent | CONFIRMED (the payload contract, section 9) |
| Where it goes | posted to the Align and Acquire lead platform, which notifies the business | CONFIRMED |
| What the phone number is used for | to respond to the inquiry, by call or text | CONFIRMED |
| Opt out | reply STOP to any text | CONFIRMED (platform behavior, TCPA requirement) |
| Message and data rates | apply, standard carrier language | CONFIRMED |
| Analytics or tracking pixels | none installed in this build | CONFIRMED |
| Cookies | none set by this site in this build | CONFIRMED |
| Data retention period | - | TODO, so the page says nothing about retention |
| Sale or sharing of data to third parties | does not happen in this setup | CONFIRMED as a negative |

**Before launch, a human who is accountable for it should read the privacy page.** It is
generated from the rows above, but a privacy policy is a legal document and this build is not
legal advice. That item is on the launch checklist and in the build report.

## 13. Facts that must never appear

Standing bans, independent of what anyone later supplies:

- Response times of any kind ("30 minute response", "same day", "24/7 arrival").
- Prices, price ranges, "starting at", or free-estimate claims not confirmed here.
- Star ratings, review counts, "top rated", "#1", "best in Metro Detroit", "5-star".
- `Review` or `aggregateRating` structured data.
- Any employee count, fleet size, or jobs-completed number.
- Any brand, certification, or affiliation claim without a CONFIRMED row in this file.
- Em dashes and en dashes in rendered copy (client style rule, enforced by the verify script).

Conditionally banned, until the matching fact lands (see sections 5 and 6):
`licensed`, `fully licensed`, `authorized`, `certified`, `factory-trained`, `dealer`.

---

## TODO summary, ordered by impact

| # | Missing fact | Unlocks |
|---|---|---|
| 1 | Michigan electrical contractor license # | Footer trust line on every page, About trust paragraph, homepage trust row, **and the word "licensed" anywhere in the copy** |
| 2 | Google Business Profile (none found) | Local pack visibility, the single highest-impact off-site move available |
| 2b | **Does he install EV chargers?** | Possibly a stronger page than either service sub-page. Competitors' review flow is dominated by EV installs and it pairs with panel upgrades. Nothing is built or referenced until confirmed |
| 2c | **Does he still want industrial work?** | Keeps or removes the industrial page. His own branding says residential and commercial only |
| 3 | Real reviews | Whole reviews system is built and gated off, one config flag turns it on |
| 4 | GENERAC STATUS | Stronger generator page copy, brand assets, dealer language |
| 5 | Home base city and city list | City-specific titles, service-area section, future city landing pages |
| 6 | Hours | Footer hours block, `openingHoursSpecification` in JSON-LD |
| 7 | Year founded | Retires the quarantined "more than a decade" claim, About page |
| 8 | Insured / bonded | Trust row items |
| 9 | Generator brands serviced | All-brands line on the repair page, wider search targeting |
| 10 | Owner last name | Full attribution on the About page |
| 11 | Emergency service yes/no | An emergency line in copy, never a response time |
| 12 | Confirm "Trae" spelling | Every mention of the owner |
