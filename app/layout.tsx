import type { Metadata } from "next";
import { Archivo, Public_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

/**
 * Type system.
 * Archivo: display. An American industrial grotesque. Used heavy and tight so
 *   headlines read as stamped metal rather than as a startup slogan.
 * Public Sans: body. A quiet workhorse that gets out of Archivo's way.
 * IBM Plex Mono: panel tags only. Uppercase, wide tracking, boxed, so micro
 *   labels read like the directory tag inside a breaker panel door.
 * All three subset to latin and swap, so text paints on the first frame.
 */
const display = Archivo({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

const body = Public_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

const panel = IBM_Plex_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
  variable: "--font-panel",
});

/* PHASE 1. Full metadata, canonicals, and JSON-LD are built in Phase 2. */
export const metadata: Metadata = {
  title: "Handmade Electric",
};

export const viewport = {
  themeColor: "#0F1215",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${panel.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
