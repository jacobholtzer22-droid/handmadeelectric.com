import type { Metadata } from "next";
import { Archivo, Public_Sans, IBM_Plex_Mono } from "next/font/google";
import { site } from "@/site.config";
import { electricianNode, organizationNode, webSiteNode } from "@/lib/schema";
import { ROBOTS_META } from "@/lib/indexable";
import JsonLd from "@/components/JsonLd";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileCtaBar from "@/components/MobileCtaBar";
import "./globals.css";

/**
 * Type system.
 * Archivo: display. An American industrial grotesque, used heavy and TIGHT so
 *   headlines read as stamped metal. Do not let the tracking drift toward
 *   expanded on interior pages, that is a different site's signature.
 * Public Sans: body. A quiet workhorse that gets out of Archivo's way.
 * IBM Plex Mono: panel tags only, styled like a breaker directory label.
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

export const metadata: Metadata = {
  metadataBase: new URL(site.business.origin),
  // Pages set their own absolute titles so the character budget is countable.
  title: { default: `Electrician in ${site.business.areaServed} | ${site.business.name}`, template: "%s" },
  description: `${site.business.legalName} is an electrical contractor serving ${site.business.areaServed}.`,
  openGraph: { siteName: site.business.name, type: "website", locale: "en_US" },
  twitter: { card: "summary_large_image" },
  // noindex on every host that is not the canonical one. See lib/indexable.ts.
  ...ROBOTS_META,
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
      <body>
        {/* Runs synchronously before paint. Scroll reveals hide themselves ONLY
            under `.js`, so with JavaScript off nothing is ever hidden and the
            static HTML a crawler reads is fully visible. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />

        {/* Sitewide business identity. Present in the initial HTML, no JS. */}
        <JsonLd nodes={[electricianNode(), organizationNode(), webSiteNode()]} />

        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-panel focus:bg-copper focus:px-4 focus:py-2 focus:font-panel focus:text-sm focus:uppercase focus:text-iron"
        >
          Skip to content
        </a>

        <Header />
        <main id="main">{children}</main>
        <Footer />
        <MobileCtaBar />
      </body>
    </html>
  );
}
