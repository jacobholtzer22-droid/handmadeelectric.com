/**
 * CTA ORDER AUDIT.
 *
 * The locked global order is: Get a quote, then Call, then Text.
 * Quote must never appear immediately AFTER a call or text control.
 *
 * Reads the built HTML, so it audits what ships rather than what the source
 * looks like. Any button-styled control pointing at /contact is a quote, any
 * tel: is a call, any sms: is a text.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

const BUILD_DIR = ".next/server/app";

function walk(dir) {
  const out = [];
  for (const e of readdirSync(dir)) {
    const f = path.join(dir, e);
    statSync(f).isDirectory() ? out.push(...walk(f)) : e.endsWith(".html") && out.push(f);
  }
  return out;
}

const pad = (s, n) => String(s).padEnd(n);
let violations = 0;
const rows = [];

for (const file of walk(BUILD_DIR).sort()) {
  const route =
    "/" + path.relative(BUILD_DIR, file).replace(/\.html$/, "").replace(/^index$/, "");
  const html = readFileSync(file, "utf8");

  const seq = [];
  for (const m of html.matchAll(/<a\b[^>]*>/g)) {
    const tag = m[0];
    if (!/class="[^"]*\bbtn-/.test(tag)) continue;
    if (/href="\/contact"/.test(tag)) seq.push({ t: "Q", at: m.index });
    else if (/href="tel:/.test(tag)) seq.push({ t: "C", at: m.index });
    else if (/href="sms:/.test(tag)) seq.push({ t: "T", at: m.index });
  }

  /**
   * Cluster into GROUPS. Controls in the same CTA pair sit within a few hundred
   * characters of each other in the markup; a header button and a hero button
   * are thousands apart. Comparing the whole page as one sequence would flag a
   * header call followed by a hero quote, which is not a pair at all.
   */
  const GAP = 900;
  const groups = [];
  for (const item of seq) {
    const last = groups[groups.length - 1];
    if (last && item.at - last.end < GAP) {
      last.t += item.t;
      last.end = item.at;
    } else {
      groups.push({ t: item.t, end: item.at });
    }
  }

  const shapes = groups.map((g) => g.t);
  // Within a real group, a quote after a call or text means quote sits right.
  const badGroups = shapes.filter((g) => /[CT]Q/.test(g));
  if (badGroups.length) violations += badGroups.length;
  const s = shapes.join(" ");
  rows.push({
    route,
    s,
    bad: badGroups.length > 0,
    q: seq.filter((x) => x.t === "Q").length,
    c: seq.filter((x) => x.t === "C").length,
  });
}

console.log(pad("PAGE", 44) + pad("CTA GROUPS", 30) + pad("QUOTE", 7) + pad("CALL", 6) + "ORDER");
console.log("-".repeat(94));
for (const r of rows) {
  console.log(
    pad(r.route, 44) + pad(r.s || "(none)", 30) + pad(r.q, 7) + pad(r.c, 6) +
      (r.bad ? "VIOLATION: quote right of call" : "ok")
  );
}
console.log("-".repeat(94));
console.log(`${rows.length} pages. ${violations} order violation(s).`);
console.log("Legend: Q=quote, C=call, T=text. Groups are space separated.");
console.log("A violation is a quote AFTER a call or text INSIDE one group.");
if (violations) process.exit(1);
