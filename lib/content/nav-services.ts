import { services } from "./services";
import { subServices } from "./subservices";

/**
 * The grouped service list used by the header dropdown and the mobile drawer.
 *
 * Descriptors are one line each and restate what is already on the target page.
 * They are navigation labels, not claims: nothing here asserts a fact that is
 * not already established on the page it points at.
 *
 * INDUSTRIAL is included only while that decision is pending (seo/FACTS.md
 * section 4). If Trae confirms residential and commercial only, deleting the
 * industrial service removes it from this menu automatically, because the group
 * is built from the services array rather than hand-listed.
 */
export type NavServiceItem = {
  title: string;
  href: string;
  descriptor: string;
};

export type NavServiceGroup = {
  label: string;
  items: NavServiceItem[];
};

const byslug = (slug: string) => {
  const s = services.find((x) => x.slug === slug);
  if (!s) throw new Error(`nav-services: no service "${slug}"`);
  return s;
};

const sub = (parentSlug: string, slug: string) => {
  const s = subServices.find(
    (x) => x.parentSlug === parentSlug && x.slug === slug
  );
  if (!s) throw new Error(`nav-services: no sub-service "${parentSlug}/${slug}"`);
  return s;
};

/** Short descriptors for the two sub-pages, restating their own page content. */
const SUB_DESCRIPTORS: Record<string, string> = {
  "residential/panel-replacement":
    "When the panel is full, failing, or too small for the house.",
  "commercial/lighting-retrofits":
    "LED retrofits for warehouse, retail, and office space.",
};

function item(slug: string): NavServiceItem {
  const s = byslug(slug);
  return { title: s.navTitle, href: `/services/${s.slug}`, descriptor: s.short };
}

function subItem(parentSlug: string, slug: string): NavServiceItem {
  const s = sub(parentSlug, slug);
  return {
    title: s.navTitle,
    href: `/services/${parentSlug}/${slug}`,
    descriptor: SUB_DESCRIPTORS[`${parentSlug}/${slug}`],
  };
}

export const navServiceGroups: NavServiceGroup[] = [
  {
    label: "Standby power",
    items: [item("generac-generator-installation"), item("generator-repair")],
  },
  {
    label: "Residential",
    items: [item("residential"), subItem("residential", "panel-replacement")],
  },
  {
    label: "Commercial",
    items: [item("commercial"), subItem("commercial", "lighting-retrofits")],
  },
  {
    label: "Industrial",
    items: [item("industrial")],
  },
];

/** Flat list, in visual order, for keyboard traversal. */
export const navServiceItemsFlat: NavServiceItem[] = navServiceGroups.flatMap(
  (g) => g.items
);
