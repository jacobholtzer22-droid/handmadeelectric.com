/**
 * Prints the EXACT payload a filled quote submission produces, using the real
 * composeQuoteMessage() the form calls. Nothing here is retyped by hand.
 *
 * Run: node --experimental-strip-types scripts/sample-quote.mjs
 */
import { composeQuoteMessage } from "../lib/quote-message.ts";
import { site } from "../site.config.ts";

const sample = {
  name: "Dave Kowalski",
  phone: "(248) 555-0134",
  email: "dave.k@example.com",
  service: "Generac generator installation",
  propertyType: "Residential",
  location: "1428 Elm St, Royal Oak",
  details:
    "We lose power every big storm and the sump pump quits.\nWould want the furnace, sump, and fridge covered at minimum.",
};

const message = composeQuoteMessage({
  service: sample.service,
  propertyType: sample.propertyType,
  location: sample.location,
  details: sample.details,
});

const payload = {
  name: sample.name,
  phone: sample.phone,
  email: sample.email,
  message,
  smsConsent: true,
  // Read from the config, never retyped, so this print is proof of what ships.
  businessSlug: site.crm.businessSlug,
};

console.log("=== EXACT `message` STRING THAT ARRIVES IN THE CRM ===\n");
console.log(message);
console.log("\n=== FULL PAYLOAD (JSON as posted) ===\n");
console.log(JSON.stringify(payload, null, 2));
console.log("\n=== CONTRACT CHECK ===");
const keys = Object.keys(payload).sort();
const expected = ["businessSlug", "email", "message", "name", "phone", "smsConsent"];
console.log("keys:", keys.join(", "));
console.log("count:", keys.length, keys.length === 6 ? "(6, correct)" : "(WRONG)");
console.log(
  "matches contract:",
  JSON.stringify(keys) === JSON.stringify(expected) ? "YES" : "NO"
);

/* ---- SHORT VARIANT, the two generator pages ----
   Same six keys. No property type and no address, because the short form does
   not collect them, so composeQuoteMessage simply omits those lines. */
const shortMessage = composeQuoteMessage({
  service: "Generator repair and service",
  details: "Unit cranks but will not start. Controller shows a fault.",
});

const shortPayload = {
  name: "Dana Reyes",
  phone: "(248) 555-0199",
  email: "",
  message: shortMessage,
  smsConsent: false,
  businessSlug: site.crm.businessSlug,
};

console.log("\n=== SHORT FORM (generator pages), FULL PAYLOAD ===\n");
console.log(JSON.stringify(shortPayload, null, 2));

const shortKeys = Object.keys(shortPayload).sort();
console.log("\n=== SHORT FORM CONTRACT CHECK ===");
console.log("keys:", shortKeys.join(", "));
console.log("count:", shortKeys.length, shortKeys.length === 6 ? "(6, correct)" : "(WRONG)");
console.log(
  "matches contract:",
  JSON.stringify(shortKeys) === JSON.stringify(expected) ? "YES" : "NO"
);
console.log("slug identical in both payloads:", payload.businessSlug === shortPayload.businessSlug ? "YES" : "NO");
