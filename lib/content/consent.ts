/**
 * SMS consent copy, defined ONCE.
 *
 * The form and /privacy must say the same thing word for word. The only way to
 * guarantee that over time is for both to render the same constant, rather than
 * two copies that drift the first time either is edited.
 *
 * Do not reword one caller. Edit here and both move together.
 */
export const SMS_CONSENT_SENTENCES = [
  "Checking this box permits Handmade Electric LLC to text you about your request.",
  "Message and data rates may apply.",
  "Reply STOP to any text message to opt out.",
] as const;

/** Single-paragraph form, used inline next to the checkbox. */
export const SMS_CONSENT_TEXT = SMS_CONSENT_SENTENCES.join(" ");
