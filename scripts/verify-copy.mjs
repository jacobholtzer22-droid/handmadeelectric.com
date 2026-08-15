/**
 * Copy gate. Runs against the BUILT HTML, not the source, so it catches
 * anything that reaches a real visitor no matter which component produced it.
 *
 * Run `npm run build` first, then `npm run verify:copy`.
 *
 * Every rule here traces to seo/FACTS.md. When a fact lands, update FACTS.md,
 * remove the matching term from CONDITIONAL_BANS, and ship both in one commit.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

const BUILD_DIR = ".next/server/app";

/**
 * Terms banned only until the backing fact exists.
 * FACTS.md section 6: "licensed" has no license number behind it.
 * FACTS.md section 5: Generac status is unconfirmed.
 */
const CONDITIONAL_BANS = [
  { term: "fully licensed", why: "FACTS 6, no license number confirmed" },
  { term: "licensed", why: "FACTS 6, no license number confirmed" },
  { term: "authorized", why: "FACTS 5, Generac status unconfirmed" },
  { term: "certified", why: "FACTS 5, Generac status unconfirmed" },
  { term: "factory-trained", why: "FACTS 5, Generac status unconfirmed" },
  { term: "dealer", why: "FACTS 5, Generac status unconfirmed" },
];

/** Never allowed, regardless of what anyone supplies. FACTS.md section 13. */
const HARD_BANS = [
  { term: "squarespace", why: "all assets must be self-hosted" },
  { term: "lorem", why: "placeholder text" },
  { term: "REPLACE_ME", why: "placeholder token" },
  { term: "TODO", why: "placeholder token" },
  { term: "aggregateRating", why: "FACTS 7, no self-serving review markup" },
  { term: "—", why: "em dash, client style rule" },
  { term: "–", why: "en dash, client style rule" },
];

const PHONE = "(248) 787-0071";

/**
 * Routes exempt from the phone-presence check.
 * EMPTY, and it should stay that way. The 404 now carries the phone too, so
 * every rendered page in the build is checked with no exceptions.
 */
const PHONE_EXEMPT = new Set([]);

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else if (entry.endsWith(".html")) out.push(full);
  }
  return out;
}

/** Drop script and style bodies, keep tags so alt/meta/aria are still checked. */
function scannable(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "");
}

/** Visible text only, for the phone-presence check. */
function visibleText(html) {
  return scannable(html)
    .replace(/<[^>]+>/g, " ")
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ");
}

let files;
try {
  files = walk(BUILD_DIR);
} catch {
  console.error(`No build found at ${BUILD_DIR}. Run \`npm run build\` first.`);
  process.exit(1);
}

if (files.length === 0) {
  console.error(`No HTML found in ${BUILD_DIR}. Run \`npm run build\` first.`);
  process.exit(1);
}

let failures = 0;
const pad = (s, n) => String(s).padEnd(n);

console.log(pad("PAGE", 34) + pad("CHECK", 34) + "RESULT");
console.log("-".repeat(96));

for (const file of files.sort()) {
  const route =
    "/" +
    path
      .relative(BUILD_DIR, file)
      .replace(/\.html$/, "")
      .replace(/^index$/, "");
  const raw = readFileSync(file, "utf8");
  const scan = scannable(raw).toLowerCase();
  const text = visibleText(raw);

  for (const { term, why } of [...CONDITIONAL_BANS, ...HARD_BANS]) {
    // Skip "licensed" if "fully licensed" already reported it on this page.
    const hit = scan.includes(term.toLowerCase());
    if (hit) {
      failures++;
      console.log(
        pad(route, 34) + pad(`banned: "${term}"`, 34) + `FAIL  (${why})`
      );
    }
  }

  /**
   * FACTS.md section 13: price questions explain what drives the cost and
   * invite a quote. They never contain a number, a range, or a currency
   * symbol. This checks the rendered FAQ pairs rather than trusting the author.
   */
  for (const [, q, a] of scannable(raw).matchAll(
    /<dt[^>]*>([\s\S]*?)<\/dt>\s*<dd[^>]*>([\s\S]*?)<\/dd>/g
  )) {
    const question = visibleText(q);
    if (!/cost|price|how much|worth/i.test(question)) continue;
    const answer = visibleText(a);
    const numbers = answer.match(/[$£€]|\b\d[\d,.]*\b/g);
    if (numbers) {
      failures++;
      console.log(
        pad(route, 34) +
          pad("price answer has a number", 34) +
          `FAIL  ${JSON.stringify(numbers)} in "${question.slice(0, 40)}"`
      );
    }
  }

  if (PHONE_EXEMPT.has(route)) {
    console.log(pad(route, 34) + pad("phone in crawlable text", 34) + "SKIP  (exempt, see PHONE_EXEMPT)");
  } else if (!text.includes(PHONE)) {
    failures++;
    console.log(pad(route, 34) + pad("phone in crawlable text", 34) + "FAIL");
  } else {
    console.log(pad(route, 34) + pad("phone in crawlable text", 34) + "PASS");
  }
}

console.log("-".repeat(96));
console.log(`${files.length} page(s) scanned.`);
if (failures > 0) {
  console.log(`${failures} FAILURE(S).`);
  process.exit(1);
}
console.log("All copy gates pass.");
