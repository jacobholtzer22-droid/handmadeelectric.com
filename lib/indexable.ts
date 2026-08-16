/**
 * INDEXING GATE
 *
 * The repo is on GitHub, so a Vercel project may get connected before launch.
 * A production deployment on a *.vercel.app subdomain is indexable by default,
 * and once indexed it competes with the real domain for the same content.
 *
 * Rule: index ONLY when the host being built for is exactly the canonical host.
 * Everything else, preview deploys, vercel.app production URLs, branch deploys,
 * and local builds, gets noindex.
 *
 * WHY IT IS AN EQUALITY TEST, not a blocklist: a blocklist has to anticipate
 * every non-canonical host, and anything it fails to anticipate silently gets
 * indexed. An equality test fails the other way. The only host that can ever be
 * indexed is the one named here, so the live domain cannot inherit a noindex
 * unless it stops being the canonical host, at which point noindex is correct.
 */
import { site } from "@/site.config";

export const CANONICAL_HOST = new URL(site.business.origin).host;

function resolveDeployHost(): string {
  // Explicit override wins, for any host that is not on Vercel.
  if (process.env.NEXT_PUBLIC_SITE_HOST) return process.env.NEXT_PUBLIC_SITE_HOST;

  // On Vercel, only a PRODUCTION build can be the canonical host. Preview and
  // development builds resolve to their own deployment URL and never match.
  if (process.env.VERCEL_ENV === "production") {
    return process.env.VERCEL_PROJECT_PRODUCTION_URL ?? "";
  }
  return process.env.VERCEL_URL ?? "";
}

export const DEPLOY_HOST = resolveDeployHost();
export const INDEXABLE = DEPLOY_HOST === CANONICAL_HOST;

/** Spread into Next Metadata. Absent when indexable, so nothing is emitted. */
export const ROBOTS_META = INDEXABLE
  ? {}
  : { robots: { index: false, follow: false } };
