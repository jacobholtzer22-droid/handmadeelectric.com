/**
 * JSON-LD gate. Runs against the BUILT HTML.
 *
 * Checks, per seo/PAGE-PLAN.md section 6 and seo/FACTS.md:
 *  1. Every block parses as JSON.
 *  2. Every block has @context and @type.
 *  3. Every @type is on a hardcoded allowlist of real schema.org types, so a
 *     hallucinated type cannot ship.
 *  4. No property asserts a fact that is not CONFIRMED in FACTS.md.
 *  5. No Review and no aggregateRating anywhere, ever.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

const BUILD_DIR = ".next/server/app";

/** Real schema.org types this site is allowed to emit. */
const ALLOWED_TYPES = new Set([
  "Electrician",
  "LocalBusiness",
  "Organization",
  "WebSite",
  "BreadcrumbList",
  "ListItem",
  "Service",
  "FAQPage",
  "Question",
  "Answer",
  "AdministrativeArea",
  "PostalAddress",
  "Offer",
]);

/**
 * Properties banned because the backing fact is TODO in FACTS.md, or because
 * the markup type itself is not permitted on this site.
 */
const BANNED_PROPS = {
  address: "FACTS 2, no published street address",
  geo: "FACTS 2, no published street address",
  openingHoursSpecification: "FACTS 2, hours not confirmed",
  openingHours: "FACTS 2, hours not confirmed",
  sameAs: "FACTS 8, no confirmed profile URLs",
  foundingDate: "FACTS 6, founding year not confirmed",
  priceRange: "FACTS 13, no price claims",
  aggregateRating: "FACTS 7, no self-serving review markup, ever",
  review: "FACTS 7, no self-serving review markup, ever",
  numberOfEmployees: "FACTS 13, no employee count",
};

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else if (entry.endsWith(".html")) out.push(full);
  }
  return out;
}

function collectTypes(node, acc = []) {
  if (Array.isArray(node)) {
    node.forEach((n) => collectTypes(n, acc));
  } else if (node && typeof node === "object") {
    if (typeof node["@type"] === "string") acc.push(node["@type"]);
    Object.values(node).forEach((v) => collectTypes(v, acc));
  }
  return acc;
}

function collectProps(node, acc = []) {
  if (Array.isArray(node)) {
    node.forEach((n) => collectProps(n, acc));
  } else if (node && typeof node === "object") {
    Object.keys(node).forEach((k) => acc.push(k));
    Object.values(node).forEach((v) => collectProps(v, acc));
  }
  return acc;
}

const files = walk(BUILD_DIR).sort();
let failures = 0;
const pad = (s, n) => String(s).padEnd(n);
const padL = (s, n) => String(s).padStart(n);

console.log(
  pad("PAGE", 42) + padL("BLOCKS", 8) + "  " + pad("TYPES", 40) + "RESULT"
);
console.log("-".repeat(112));

for (const file of files) {
  const route =
    "/" +
    path.relative(BUILD_DIR, file).replace(/\.html$/, "").replace(/^index$/, "");
  const html = readFileSync(file, "utf8");

  const blocks = [
    ...html.matchAll(
      /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi
    ),
  ].map((m) => m[1]);

  const issues = [];
  const allTypes = [];

  for (const raw of blocks) {
    let parsed;
    try {
      parsed = JSON.parse(raw.replace(/\\u003c/g, "<"));
    } catch (err) {
      issues.push(`does not parse: ${err.message}`);
      continue;
    }
    if (!parsed["@context"]) issues.push("missing @context");
    if (!parsed["@type"]) issues.push("missing @type");

    for (const t of collectTypes(parsed)) {
      allTypes.push(t);
      if (!ALLOWED_TYPES.has(t)) issues.push(`type not on allowlist: ${t}`);
    }
    for (const p of collectProps(parsed)) {
      if (BANNED_PROPS[p]) issues.push(`banned property "${p}" (${BANNED_PROPS[p]})`);
    }
  }

  const unique = [...new Set(allTypes)];
  const ok = issues.length === 0 && blocks.length > 0;
  if (!ok) failures++;

  console.log(
    pad(route, 42) +
      padL(blocks.length, 8) +
      "  " +
      pad(unique.join(", ").slice(0, 38), 40) +
      (blocks.length === 0 ? "FAIL  (no JSON-LD)" : ok ? "PASS" : "FAIL")
  );
  for (const issue of issues) console.log("    " + issue);
}

console.log("-".repeat(112));
console.log(`${files.length} page(s) scanned.`);
if (failures > 0) {
  console.log(`${failures} FAILING PAGE(S).`);
  process.exit(1);
}
console.log("All JSON-LD gates pass.");
