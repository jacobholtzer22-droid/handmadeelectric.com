"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Phone, Check, Loader2, AlertTriangle } from "lucide-react";
import { site } from "@/site.config";
import { services } from "@/lib/content/services";
import { composeQuoteMessage } from "@/lib/quote-message";
import { SMS_CONSENT_SENTENCES } from "@/lib/content/consent";

/**
 * QUOTE REQUEST FORM
 *
 * CRM CONTRACT, seo/FACTS.md section 9. The body is EXACTLY
 *   { name, phone, email, message, smsConsent, businessSlug }
 * Six keys, never added to, never renamed. Service, property type, address,
 * and details are composed into `message` by composeQuoteMessage().
 *
 * A 200 FROM THIS ENDPOINT PROVES NOTHING. It returns 200 even when the slug
 * matches no Business row and nothing is written. The success state below is a
 * UI state only. No claim about lead delivery may be made from it.
 *
 * This is a client component, so it is server-rendered into the initial HTML
 * like every other page element. There is no client-only rendering here.
 *
 * NO EV CHARGER OPTION. That is an unanswered question for Trae and nothing
 * references it until confirmed.
 */

type Variant = "full" | "short";
type Status = "idle" | "submitting" | "success" | "error";
type FieldName = "name" | "phone" | "email" | "service" | "propertyType" | "location";

const PROPERTY_TYPES = ["Residential", "Commercial"];

/**
 * Routing escape hatch, NOT a service claim.
 *
 * An electrician gets called for outlets, fixtures, fans, and troubleshooting
 * that fit none of the five service pages. Without this option those people
 * abandon the form. It is deliberately NOT in lib/content/services.ts, because
 * that file drives the nav, the sitemap, and the Service schema, and this is a
 * dropdown value only. It makes no claim about what the business does.
 *
 * This does NOT reopen EV chargers. There is no EV option and no EV wording
 * anywhere. Someone wanting one types it into the job details field themselves.
 */
const OTHER_SERVICE = "Other electrical work";

/** Messages name what is wrong AND what to do about it. */
const VALIDATORS: Record<FieldName, (v: string) => string | null> = {
  name: (v) => (v.trim() ? null : "Enter your name so we know who to reply to."),
  phone: (v) => {
    const digits = v.replace(/\D/g, "");
    if (!digits) return "Enter a phone number we can reach you on.";
    if (digits.length < 10) return "That number looks short. Include the area code.";
    return null;
  },
  email: (v) => {
    if (!v.trim()) return null; // optional
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()))
      return "That email address does not look right. Check for a missing @ or a typo.";
    return null;
  },
  service: (v) => (v ? null : "Choose the service you need from the list."),
  propertyType: (v) => (v ? null : "Choose residential or commercial."),
  location: (v) =>
    v.trim()
      ? null
      : "Enter a street address or a city, so we know whether the job is in range.",
};

export default function QuoteForm({
  variant = "full",
  id = "quote-form",
}: {
  variant?: Variant;
  id?: string;
}) {
  const { business, crm } = site;
  const isFull = variant === "full";

  const [values, setValues] = useState<Record<FieldName, string>>({
    name: "",
    phone: "",
    email: "",
    service: "",
    propertyType: "",
    location: "",
  });
  const [details, setDetails] = useState("");
  const [smsConsent, setSmsConsent] = useState(false); // never pre-checked
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});
  const [showSummary, setShowSummary] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const summaryRef = useRef<HTMLDivElement | null>(null);

  const activeFields: FieldName[] = isFull
    ? ["name", "phone", "email", "service", "propertyType", "location"]
    : ["name", "phone", "service"];

  function setField(name: FieldName, value: string) {
    setValues((v) => ({ ...v, [name]: value }));
    if (touched[name]) {
      setErrors((e) => ({ ...e, [name]: VALIDATORS[name](value) ?? undefined }));
    }
  }

  function onBlur(name: FieldName) {
    setTouched((t) => ({ ...t, [name]: true }));
    setErrors((e) => ({ ...e, [name]: VALIDATORS[name](values[name]) ?? undefined }));
  }

  function validateAll() {
    const next: Partial<Record<FieldName, string>> = {};
    for (const f of activeFields) {
      const msg = VALIDATORS[f](values[f]);
      if (msg) next[f] = msg;
    }
    return next;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "submitting") return;

    const found = validateAll();
    setErrors(found);
    setTouched(Object.fromEntries(activeFields.map((f) => [f, true])));

    if (Object.keys(found).length > 0) {
      setShowSummary(true);
      // Move focus to the summary so a screen reader announces the problem,
      // then the visitor can jump straight to the first bad field.
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }

    setShowSummary(false);
    setStatus("submitting");

    const message = composeQuoteMessage({
      service: values.service,
      propertyType: isFull ? values.propertyType : undefined,
      location: isFull ? values.location : undefined,
      details,
    });

    try {
      const res = await fetch(crm.url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // EXACTLY these six keys. Do not add or rename.
        body: JSON.stringify({
          name: values.name,
          phone: values.phone,
          email: values.email,
          message,
          smsConsent,
          businessSlug: crm.businessSlug,
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("success");
    } catch {
      // Never wipe what the visitor typed.
      setStatus("error");
    }
  }

  /* ---- Success. A UI state only, not evidence of delivery. ---- */
  if (status === "success") {
    return (
      <div className="rounded-panel border border-bone-dim bg-white/50 p-8 text-center sm:p-10">
        <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-panel bg-copper/15 text-copper-deep">
          <Check className="h-7 w-7" aria-hidden="true" />
        </span>
        <h3 className="h-display mt-6 text-2xl text-ink">Request sent</h3>
        <p className="mx-auto mt-3 max-w-md text-[0.9375rem] leading-relaxed text-ink-dim">
          Thanks for the details. If you would rather talk it through, calling or
          texting reaches us the same way.
        </p>
        <a href={business.phoneHref} className="btn-secondary-light mt-7">
          <Phone className="h-4 w-4" aria-hidden="true" />
          {business.phoneDisplay}
        </a>
      </div>
    );
  }

  const inputClass =
    "w-full min-h-[44px] rounded-panel border bg-white/60 px-4 py-3 text-[16px] text-ink placeholder:text-ink-dim/50 focus:outline-none";
  const ok = "border-bone-dim focus:border-copper-deep";
  const bad = "border-red-500 focus:border-red-600";
  const labelClass = "mb-1.5 block text-sm font-semibold text-ink";
  const errClass = "mt-1.5 flex items-start gap-1.5 text-[13px] text-red-700";

  const fieldError = (f: FieldName) => (touched[f] ? errors[f] : undefined);

  const Err = ({ f }: { f: FieldName }) => {
    const msg = fieldError(f);
    if (!msg) return null;
    return (
      <p id={`${id}-${f}-error`} className={errClass}>
        <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        {msg}
      </p>
    );
  };

  const aria = (f: FieldName) => ({
    "aria-invalid": fieldError(f) ? true : undefined,
    "aria-describedby": fieldError(f) ? `${id}-${f}-error` : undefined,
    onBlur: () => onBlur(f),
  });

  return (
    <form
      id={id}
      onSubmit={handleSubmit}
      className="rounded-panel border border-bone-dim bg-white/40 p-5 sm:p-7"
      noValidate
    >
      {/* One visible summary on failed submit, focusable and announced. */}
      {showSummary && Object.keys(errors).length > 0 && (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          className="mb-6 rounded-panel border border-red-300 bg-red-50 p-4"
        >
          <p className="text-sm font-semibold text-red-800">
            Please fix {Object.keys(errors).length}{" "}
            {Object.keys(errors).length === 1 ? "field" : "fields"} before sending.
          </p>
          <ul className="mt-2 space-y-1">
            {activeFields
              .filter((f) => errors[f])
              .map((f) => (
                <li key={f}>
                  <a
                    href={`#${id}-${f}`}
                    className="text-[13px] text-red-800 underline underline-offset-2"
                  >
                    {errors[f]}
                  </a>
                </li>
              ))}
          </ul>
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-name`} className={labelClass}>
            Name
          </label>
          <input
            id={`${id}-name`}
            name="name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={(e) => setField("name", e.target.value)}
            className={`${inputClass} ${fieldError("name") ? bad : ok}`}
            {...aria("name")}
          />
          <Err f="name" />
        </div>

        <div>
          <label htmlFor={`${id}-phone`} className={labelClass}>
            Phone
          </label>
          <input
            id={`${id}-phone`}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={(e) => setField("phone", e.target.value)}
            className={`${inputClass} ${fieldError("phone") ? bad : ok}`}
            {...aria("phone")}
          />
          <Err f="phone" />
        </div>
      </div>

      {isFull && (
        <div className="mt-5">
          <label htmlFor={`${id}-email`} className={labelClass}>
            Email <span className="font-normal text-ink-dim/70">(optional)</span>
          </label>
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={values.email}
            onChange={(e) => setField("email", e.target.value)}
            className={`${inputClass} ${fieldError("email") ? bad : ok}`}
            {...aria("email")}
          />
          <Err f="email" />
        </div>
      )}

      <div className={`mt-5 ${isFull ? "grid gap-5 sm:grid-cols-2" : ""}`}>
        <div>
          <label htmlFor={`${id}-service`} className={labelClass}>
            Service needed
          </label>
          {/* Options are EXACTLY the confirmed services. Industrial is included
              only while that decision is pending (FACTS section 4). */}
          <select
            id={`${id}-service`}
            name="service"
            value={values.service}
            onChange={(e) => setField("service", e.target.value)}
            className={`${inputClass} ${fieldError("service") ? bad : ok}`}
            {...aria("service")}
          >
            <option value="">Select a service</option>
            {services.map((s) => (
              <option key={s.slug} value={s.navTitle}>
                {s.navTitle}
              </option>
            ))}
            {/* Always last. See OTHER_SERVICE above. */}
            <option value={OTHER_SERVICE}>{OTHER_SERVICE}</option>
          </select>
          <Err f="service" />
        </div>

        {isFull && (
          <div>
            <label htmlFor={`${id}-propertyType`} className={labelClass}>
              Property type
            </label>
            <select
              id={`${id}-propertyType`}
              name="propertyType"
              value={values.propertyType}
              onChange={(e) => setField("propertyType", e.target.value)}
              className={`${inputClass} ${fieldError("propertyType") ? bad : ok}`}
              {...aria("propertyType")}
            >
              <option value="">Select one</option>
              {PROPERTY_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <Err f="propertyType" />
          </div>
        )}
      </div>

      {isFull && (
        <div className="mt-5">
          <label htmlFor={`${id}-location`} className={labelClass}>
            Address or city
          </label>
          <input
            id={`${id}-location`}
            name="location"
            type="text"
            autoComplete="street-address"
            value={values.location}
            onChange={(e) => setField("location", e.target.value)}
            className={`${inputClass} ${fieldError("location") ? bad : ok}`}
            {...aria("location")}
          />
          {!fieldError("location") && (
            <p className="mt-1.5 text-[13px] text-ink-dim">
              Used to check the job is within {business.areaServed}.
            </p>
          )}
          <Err f="location" />
        </div>
      )}

      <div className="mt-5">
        <label htmlFor={`${id}-details`} className={labelClass}>
          Job details
        </label>
        <textarea
          id={`${id}-details`}
          name="details"
          rows={isFull ? 5 : 3}
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          className={`${inputClass} ${ok} resize-y`}
        />
      </div>

      {/* TCPA consent. Never pre-checked. Wording is shared with /privacy. */}
      <div className="mt-6 flex items-start gap-3">
        <input
          id={`${id}-smsConsent`}
          name="smsConsent"
          type="checkbox"
          checked={smsConsent}
          onChange={(e) => setSmsConsent(e.target.checked)}
          className="mt-0.5 h-6 w-6 shrink-0 cursor-pointer accent-copper"
        />
        <label
          htmlFor={`${id}-smsConsent`}
          className="text-[13px] leading-relaxed text-ink-dim"
        >
          {SMS_CONSENT_SENTENCES.join(" ")}{" "}
          <Link
            href="/privacy"
            className="font-semibold text-copper-deep underline underline-offset-2"
          >
            Privacy policy and SMS terms
          </Link>
          .
        </label>
      </div>

      {status === "error" && (
        <div
          role="alert"
          className="mt-5 flex items-start gap-3 rounded-panel border border-red-300 bg-red-50 px-4 py-3.5 text-sm text-red-800"
        >
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
          <span>
            That did not send. Please call or text{" "}
            <a
              href={business.phoneHref}
              className="font-semibold underline underline-offset-2"
            >
              {business.phoneDisplay}
            </a>{" "}
            and we will pick it up that way.
          </span>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="btn-primary mt-6 w-full disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
            Sending
          </>
        ) : (
          "Request a quote"
        )}
      </button>
    </form>
  );
}
