import type { MetadataRoute } from "next";
import { site } from "@/site.config";
import { services } from "@/lib/content/services";

/**
 * Built from the route list in seo/PAGE-PLAN.md section 1.
 *
 * `/reviews` is deliberately absent: while site.reviews.enabled is false that
 * route does not exist, so listing it would be a 404 in the sitemap. Turning
 * reviews on adds it here through the same flag.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const origin = site.business.origin;
  const now = new Date();

  const staticRoutes = [
    { path: "/", priority: 1.0 },
    { path: "/services", priority: 0.9 },
    { path: "/about", priority: 0.6 },
    { path: "/contact", priority: 0.8 },
    { path: "/privacy", priority: 0.2 },
  ];

  const serviceRoutes = services.map((s) => ({
    path: `/services/${s.slug}`,
    // The two generator pages are the commercial priority of this site.
    priority: s.group === "standby" ? 0.9 : 0.8,
  }));

  return [...staticRoutes, ...serviceRoutes].map((route) => ({
    url: `${origin}${route.path === "/" ? "" : route.path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: route.priority,
  }));
}
