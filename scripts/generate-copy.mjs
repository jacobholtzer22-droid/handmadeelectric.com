/**
 * Generates seo/COPY.md FROM THE BUILT HTML.
 *
 * Deliberately not hand-maintained. A hand-written copy doc drifts from the
 * site within a day, and then it is worse than nothing because it is reviewed
 * as if it were true. This extracts the words that actually ship, so reviewing
 * COPY.md is reviewing the site.
 *
 * Run `npm run build` first, then `npm run copy:gen`.
 */
import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";

const BUILD_DIR = ".next/server/app";
const OUT = "seo/COPY.md";

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else if (entry.endsWith(".html")) out.push(full);
  }
  return out;
}

const decode = (s) =>
  s
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&copy;/g, "(c)")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const ROUTE_ORDER = [
  "/",
  "/services",
  "/services/generac-generator-installation",
  "/services/generator-repair",
  "/services/residential",
  "/services/commercial",
  "/services/industrial",
  "/about",
  "/contact",
  "/privacy",
  "/_not-found",
];

const pages = [];

for (const file of walk(BUILD_DIR)) {
  const route =
    "/" +
    path.relative(BUILD_DIR, file).replace(/\.html$/, "").replace(/^index$/, "");
  const html = readFileSync(file, "utf8");

  const title = (html.match(/<title>([^<]*)<\/title>/) || [])[1] || "";
  const description =
    (html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || "";
  const canonical =
    (html.match(/<link rel="canonical" href="([^"]*)"/) || [])[1] || "";

  // Only the main region, so header and footer boilerplate is not repeated
  // on every page in the document.
  const start = html.indexOf('<main id="main"');
  const end = html.lastIndexOf("</main>");
  const main = start >= 0 && end > start ? html.slice(start, end) : html;

  const blocks = [];
  for (const m of main.matchAll(
    /<(h1|h2|h3|p|li|dt|dd)\b[^>]*>([\s\S]*?)<\/\1>/g
  )) {
    const tag = m[1];
    const text = decode(m[2]);
    if (!text) continue;
    // Skip breadcrumb separators and other single-character artifacts.
    if (text.length < 2) continue;
    blocks.push({ tag, text });
  }

  pages.push({ route, title, description, canonical, blocks });
}

pages.sort((a, b) => {
  const ai = ROUTE_ORDER.indexOf(a.route);
  const bi = ROUTE_ORDER.indexOf(b.route);
  return (ai < 0 ? 99 : ai) - (bi < 0 ? 99 : bi);
});

const lines = [
  "# COPY.md - Handmade Electric",
  "",
  "**Generated from the built HTML by `npm run copy:gen`. Do not hand-edit.**",
  "",
  "These are the exact words that ship. Every page's title, meta description,",
  "canonical, headings, body copy, list items, and FAQ, extracted from the",
  "production build rather than transcribed by hand, so reviewing this file is",
  "reviewing the site.",
  "",
  "Rules every string here obeys, from `seo/FACTS.md`:",
  "",
  "- No claim about the business that is not CONFIRMED in FACTS.md.",
  "- No prices, ranges, or \"starting at\". Price questions explain what drives",
  "  the cost and invite a quote.",
  "- No response times, warranty terms, certifications, review counts, or star",
  "  ratings.",
  "- The words licensed, authorized, certified, factory-trained, and dealer are",
  "  blocked while their backing facts are TODO.",
  "- No em dashes or en dashes.",
  "",
  `Pages: ${pages.length}`,
  "",
  "---",
  "",
];

for (const page of pages) {
  lines.push(`## \`${page.route}\``);
  lines.push("");
  lines.push(`- **Title** (${page.title.length} chars): ${page.title}`);
  lines.push(
    `- **Meta description** (${page.description.length} chars): ${page.description}`
  );
  lines.push(`- **Canonical**: ${page.canonical || "(none)"}`);
  lines.push("");

  for (const block of page.blocks) {
    if (block.tag === "h1") lines.push(`### H1: ${block.text}`, "");
    else if (block.tag === "h2") lines.push(`#### H2: ${block.text}`, "");
    else if (block.tag === "h3") lines.push(`##### H3: ${block.text}`, "");
    else if (block.tag === "dt") lines.push(`**Q: ${block.text}**`, "");
    else if (block.tag === "dd") lines.push(`A: ${block.text}`, "");
    else if (block.tag === "li") lines.push(`- ${block.text}`);
    else lines.push(block.text, "");
  }

  lines.push("", "---", "");
}

writeFileSync(OUT, lines.join("\n"));

const words = pages.reduce(
  (n, p) => n + p.blocks.reduce((m, b) => m + b.text.split(/\s+/).length, 0),
  0
);
console.log(`Wrote ${OUT}`);
console.log(`${pages.length} pages, roughly ${words.toLocaleString()} words of body copy.`);
for (const p of pages) {
  console.log(
    `  ${p.route.padEnd(42)} title ${String(p.title.length).padStart(3)}  meta ${String(
      p.description.length
    ).padStart(3)}  blocks ${String(p.blocks.length).padStart(3)}`
  );
}
