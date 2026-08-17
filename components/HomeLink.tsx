"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/site.config";
import Wordmark from "./Wordmark";

/**
 * The logo, which is the home link on every page.
 *
 * It carries aria-current="page" on the homepage. On desktop there is no Home
 * item in the nav, so without this nothing tells a screen reader user that they
 * are already home. The accessible name is explicit rather than relying on the
 * wordmark image or text being interpreted correctly.
 */
export default function HomeLink() {
  const pathname = usePathname();
  return (
    <Link
      href="/"
      aria-current={pathname === "/" ? "page" : undefined}
      className="flex min-h-[44px] items-center"
      aria-label={`${site.business.name}, home`}
    >
      <Wordmark />
    </Link>
  );
}
