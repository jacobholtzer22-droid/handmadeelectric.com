import type { Metadata } from "next";
import "./globals.css";

/* PHASE 0 SCAFFOLD. Real metadata, fonts, and JSON-LD are built in Phase 2. */
export const metadata: Metadata = {
  title: "Handmade Electric",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
