/**
 * Composes every extra quote-form field into the `message` string.
 *
 * THE CONTRACT (seo/FACTS.md section 9): the payload is EXACTLY
 *   { name, phone, email, message, smsConsent, businessSlug }
 * Six keys. Never add one, never rename one. Any field the form collects
 * beyond name, phone, and email is composed into `message` as labeled plain
 * text by this function, and nowhere else.
 *
 * Kept as a pure function on purpose: it can be called from a script and the
 * exact string that will arrive in the CRM printed for review, without a
 * browser and without sending anything.
 */

export type QuoteFields = {
  /** Confirmed service, from the select. */
  service?: string;
  /** Residential or Commercial. */
  propertyType?: string;
  /** Address or city. This is how the job is judged to be in range. */
  location?: string;
  /** Free text from the visitor. */
  details?: string;
};

export function composeQuoteMessage(fields: QuoteFields): string {
  const lines: string[] = [];

  const add = (label: string, value?: string) => {
    const v = (value ?? "").trim();
    if (v) lines.push(`${label}: ${v}`);
  };

  add("Service needed", fields.service);
  add("Property type", fields.propertyType);
  add("Address or city", fields.location);

  const details = (fields.details ?? "").trim();
  if (details) {
    if (lines.length > 0) lines.push("");
    lines.push("Job details:");
    lines.push(details);
  }

  return lines.join("\n");
}
