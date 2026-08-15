import type { Metadata } from "next";
import { site } from "@/site.config";

/**
 * Every page declares its FULL title string, including the brand suffix, rather
 * than relying on a Next title template. That is deliberate: the character
 * budget is counted on the rendered output, and a template hides the suffix
 * from the number you are looking at while you write it.
 */
export function pageMeta({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  /** Route path, e.g. "/services/residential". Use "/" for the homepage. */
  path: string;
}): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: site.business.name,
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
