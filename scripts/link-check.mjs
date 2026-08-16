/** Internal link check against the running production server. */
import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
const BASE = process.env.BASE || "http://localhost:3031";
const DIR = ".next/server/app";
function walk(d){const o=[];for(const e of readdirSync(d)){const f=path.join(d,e);statSync(f).isDirectory()?o.push(...walk(f)):e.endsWith(".html")&&o.push(f);}return o;}
const links = new Map();
for (const file of walk(DIR)) {
  const route = "/" + path.relative(DIR, file).replace(/\.html$/,"").replace(/^index$/,"");
  const html = readFileSync(file,"utf8");
  for (const m of html.matchAll(/href="(\/[^"#?]*)"/g)) {
    const href = m[1];
    if (href.startsWith("/_next")) continue;
    if (!links.has(href)) links.set(href, new Set());
    links.get(href).add(route);
  }
}
const rows = [];
for (const [href, from] of [...links].sort()) {
  const res = await fetch(BASE + href, { redirect: "manual" });
  rows.push({ href, status: res.status, from: [...from].length });
}
const pad=(s,n)=>String(s).padEnd(n);
console.log(pad("INTERNAL LINK",46)+pad("STATUS",8)+"LINKED FROM N PAGES");
console.log("-".repeat(80));
let bad=0;
for (const r of rows) {
  const okish = r.status===200 || r.status===308;
  if(!okish) bad++;
  console.log(pad(r.href,46)+pad(r.status + (okish?"":"  BROKEN"),8)+r.from);
}
console.log("-".repeat(80));
console.log(`${rows.length} unique internal links, ${bad} broken.`);
if (bad) process.exit(1);
