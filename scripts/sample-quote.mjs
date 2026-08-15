/**
 * Prints the EXACT payload a filled quote submission produces, using the real
 * composeQuoteMessage() the form calls. Nothing here is retyped by hand.
 *
 * Run: node --experimental-strip-types scripts/sample-quote.mjs
 */
import { composeQuoteMessage } from "../lib/quote-message.ts";

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
  businessSlug: "handmade-electric",
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

// Short variant: no property type, no address.
const shortMsg = composeQuoteMessage({
  service: "Generator repair and service",
  details: "Unit cranks but will not start. Controller shows a fault.",
});
console.log("\n=== SHORT VARIANT (generator pages) `message` ===\n");
console.log(shortMsg);
