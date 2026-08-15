/**
 * Image usage map + CLS-risk audit, from the BUILT HTML.
 *
 * Two jobs:
 *  1. Print which photo appears on which page, so repeats are visible rather
 *    than discovered by a reader (seo/FACTS.md section 11 photo rule).
 *  2. Prove every image reserves its space, which is the structural guarantee
 *    that images contribute zero CLS. Either explicit width+height, or Next's
 *    fill mode inside an aspect-ratio box.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

const BUILD_DIR = ".next/server/app";

function walk(dir) {
  const out = [];
  for (const e of readdirSync(dir)) {
    const full = path.join(dir, e);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else if (e.endsWith(".html")) out.push(full);
  }
  return out;
}

// The logo is branding, not a photograph. It appears in the header and the
// footer on every page by design, and must not be counted as a photo repeat.
const isLogo = (src) => /logo-emblem|logo-lockup|logo\.webp/.test(src);

const usage = new Map(); // file -> [routes]
const perRoute = new Map(); // route -> [files]
let noDims = 0;
let total = 0;

for (const f of walk(BUILD_DIR).sort()) {
  const route =
    "/" + path.relative(BUILD_DIR, f).replace(/\.html$/, "").replace(/^index$/, "");
  const html = readFileSync(f, "utf8");
  const files = [];

  for (const m of html.matchAll(/<img\b[^>]*>/g)) {
    const tag = m[0];
    total++;
    const srcMatch = tag.match(/src="([^"]*)"/);
    let src = srcMatch ? srcMatch[1] : "(none)";
    // Next serves optimized URLs; recover the underlying file.
    const urlParam = src.match(/[?&]url=([^&]+)/);
    if (urlParam) src = decodeURIComponent(urlParam[1]);

    const hasWH = /\bwidth="\d+"/.test(tag) && /\bheight="\d+"/.test(tag);
    const isFill = /position:\s*absolute/.test(tag) || /sizes=/.test(tag) && !hasWH;
    if (!hasWH && !isFill) {
      noDims++;
      console.log(`  NO DIMENSIONS  ${route}  ${src}`);
    }
    if (!isLogo(src)) files.push(src);
    if (!usage.has(src)) usage.set(src, []);
    usage.get(src).push(route);
  }
  perRoute.set(route, files);
}

const pad = (s, n) => String(s).padEnd(n);

console.log("\n=== IMAGE USAGE MAP: which photo appears on which page ===\n");
console.log(pad("IMAGE", 46) + pad("USES", 6) + "PAGES");
console.log("-".repeat(110));
for (const [src, routes] of [...usage.entries()].sort()) {
  console.log(pad(src.replace("/images/", ""), 46) + pad(routes.length, 6) + routes.join(", "));
}

console.log("\n=== PER PAGE: repeats within a single page ===\n");
console.log(pad("PAGE", 44) + pad("IMAGES", 8) + "DUPLICATE ON SAME PAGE");
console.log("-".repeat(110));
let dupes = 0;
for (const [route, files] of [...perRoute.entries()].sort()) {
  const counts = {};
  for (const f of files) counts[f] = (counts[f] || 0) + 1;
  const repeated = Object.entries(counts).filter(([, n]) => n > 1);
  if (repeated.length) dupes++;
  console.log(
    pad(route, 44) +
      pad(files.length, 8) +
      (repeated.length ? repeated.map(([f, n]) => `${f.replace("/images/", "")} x${n}`).join(", ") : "none")
  );
}

console.log("\n=== CLS RISK ===");
console.log(`${total} image tags, ${noDims} without reserved space.`);
console.log(
  dupes === 0
    ? "No PHOTO repeats on any single page. (The logo appears in the header and footer by design and is excluded.)"
    : `${dupes} page(s) repeat a photo. This violates the photo rule in seo/FACTS.md section 11.`
);
if (noDims > 0) process.exit(1);
