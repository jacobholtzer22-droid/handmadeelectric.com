import type { MetadataRoute } from "next";
import { site } from "@/site.config";
import { INDEXABLE } from "@/lib/indexable";

/**
 * AI answer engines are explicitly allowed by name, not just left to the
 * wildcard, because several of them treat an absent or ambiguous rule
 * differently from an explicit allow.
 *
 * There is nothing to disallow on this site. It is a nine page marketing site
 * with no admin, no API, and no authenticated area.
 */
const AI_AGENTS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "Google-Extended",
  "PerplexityBot",
  "Perplexity-User",
  "Applebot-Extended",
  "Meta-ExternalAgent",
  "Amazonbot",
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  // Off-canonical hosts (preview deploys, *.vercel.app) refuse all crawling,
  // belt and braces with the noindex meta. See lib/indexable.ts.
  if (!INDEXABLE) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }

  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...AI_AGENTS.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: `${site.business.origin}/sitemap.xml`,
    host: site.business.origin,
  };
}
