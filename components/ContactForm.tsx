"use client";

import { useState } from "react";
import Link from "next/link";
import { Phone, Check, Loader2, AlertTriangle } from "lucide-react";
import { site } from "@/site.config";
import { services } from "@/lib/content/services";

type Status = "idle" | "submitting" | "success" | "error";

/**
 * CRM CONTRACT, do not change without reading seo/FACTS.md section 9.
 *
 * The body is EXACTLY { name, phone, email, message, smsConsent, businessSlug }.
 * No keys added, none renamed. Extra fields the form collects get folded into
 * `message` as text.
 *
 * KNOWN FAILURE MODE: the endpoint returns HTTP 200 even when businessSlug
 * matches no Business row and nothing is written to the database. A 200 here
 * proves nothing. The only valid confirmation is a live test lead appearing in
 * the platform admin Website Leads dashboard.
 */
export default function ContactForm() {
  const { business, crm } = site;

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("");
  const [message, setMessage] = useState("");
  const [smsConsent, setSmsConsent] = useState(false); // real checkbox, never auto-true
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "submitting") return;
    setStatus("submitting");

    // Fold the service selection into `message` so the payload stays exact.
    const fullMessage = service ? `Service needed: ${service}\n\n${message}` : message;

    try {
      const res = await fetch(crm.url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          email,
          message: fullMessage,
          smsConsent,
          businessSlug: crm.businessSlug,
        }),
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      setStatus("success");
    } catch {
      // Keep the visitor's typed input on failure, never wipe it.
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-panel border border-bone-dim bg-white/50 p-8 text-center sm:p-12">
        <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-panel bg-copper/15 text-copper-deep">
          <Check className="h-7 w-7" aria-hidden="true" />
        </span>
        <h2 className="h-display mt-6 text-2xl text-ink">Message sent</h2>
        <p className="mx-auto mt-3 max-w-md text-[0.9375rem] leading-relaxed text-ink-dim">
          Thanks for reaching out. If it is urgent, calling or texting is the
          fastest way to reach us.
        </p>
        <a href={business.phoneHref} className="btn-secondary-light mt-7">
          <Phone className="h-4 w-4" aria-hidden="true" />
          {business.phoneDisplay}
        </a>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-panel border border-bone-dim bg-white/60 px-4 py-3.5 text-[15px] text-ink placeholder:text-ink-dim/50 focus:border-copper-deep focus:outline-none";
  const labelClass = "mb-1.5 block text-sm font-semibold text-ink";

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-panel border border-bone-dim bg-white/40 p-6 sm:p-8"
      noValidate
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="phone" className={labelClass}>
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="email" className={labelClass}>
          Email <span className="font-normal text-ink-dim/70">(optional)</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClass}
        />
      </div>

      <div className="mt-5">
        <label htmlFor="service" className={labelClass}>
          What do you need?
        </label>
        <select
          id="service"
          name="service"
          value={service}
          onChange={(e) => setService(e.target.value)}
          className={inputClass}
        >
          <option value="">Select one</option>
          {services.map((s) => (
            <option key={s.slug} value={s.navTitle}>
              {s.navTitle}
            </option>
          ))}
          <option value="Something else">Something else</option>
        </select>
      </div>

      <div className="mt-5">
        <label htmlFor="message" className={labelClass}>
          Tell us what is going on
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={`${inputClass} resize-y`}
        />
      </div>

      {/* TCPA consent. Real checkbox, default unchecked, never pre-ticked. */}
      <div className="mt-6 flex items-start gap-3">
        <input
          id="smsConsent"
          name="smsConsent"
          type="checkbox"
          checked={smsConsent}
          onChange={(e) => setSmsConsent(e.target.checked)}
          className="mt-0.5 h-6 w-6 shrink-0 cursor-pointer accent-copper"
        />
        <label htmlFor="smsConsent" className="text-[13px] leading-relaxed text-ink-dim">
          I agree to receive text messages from {business.legalName} about my
          request. Message and data rates may apply. Reply STOP to opt out. See
          our{" "}
          <Link href="/privacy" className="font-semibold text-copper-deep underline underline-offset-2">
            privacy policy and SMS terms
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
            That did not go through. Please call or text{" "}
            <a href={business.phoneHref} className="font-semibold underline underline-offset-2">
              {business.phoneDisplay}
            </a>
            .
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
          "Send message"
        )}
      </button>
    </form>
  );
}
