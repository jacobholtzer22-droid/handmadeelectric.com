import type { MetadataRoute } from "next";
import { site } from "@/site.config";
import { services } from "@/lib/content/services";
import { subServices } from "@/lib/content/subservices";

/**
 * Built from the route list in seo/PAGE-PLAN.md section 1.
 *
 * `/reviews` is included only while site.reviews.enabled is true, through the
 * same flag that creates the route. If reviews are ever switched off the route
 * stops existing and drops out of here in the same change, so the sitemap can
 * never advertise a 404.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const origin = site.business.origin;
  const now = new Date();

  const staticRoutes = [
    { path: "/", priority: 1.0 },
    { path: "/services", priority: 0.9 },
    { path: "/work", priority: 0.7 },
    { path: "/about", priority: 0.6 },
    { path: "/contact", priority: 0.8 },
    { path: "/privacy", priority: 0.2 },
    ...(site.reviews.enabled ? [{ path: "/reviews", priority: 0.6 }] : []),
  ];

  const serviceRoutes = services.map((s) => ({
    path: `/services/${s.slug}`,
    // The two generator pages are the commercial priority of this site.
    priority: s.group === "standby" ? 0.9 : 0.8,
  }));

  const subServiceRoutes = subServices.map((s) => ({
    path: `/services/${s.parentSlug}/${s.slug}`,
    priority: 0.75,
  }));

  return [...staticRoutes, ...serviceRoutes, ...subServiceRoutes].map((route) => ({
    url: `${origin}${route.path === "/" ? "" : route.path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: route.priority,
  }));
}
