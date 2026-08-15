/**
 * WORK GALLERY
 *
 * Every alt string describes ONLY what is visible in the frame. No invented
 * project narratives, no client names, no claims about scope, duration, or
 * outcome. If you cannot see it in the photograph, it does not go in the text.
 *
 * Categories describe the kind of building the work is in, which is the only
 * thing the photographs actually establish.
 *
 * NO before and after pairs exist in this set. All 21 frames are finished-work
 * shots from different jobs. Do not pair two unrelated photos and label them
 * before and after. See seo/FACTS.md section 11.
 */

export type WorkCategory = "residential" | "commercial" | "industrial";

export type WorkPhoto = {
  src: string;
  alt: string;
  category: WorkCategory;
};

export const workPhotos: WorkPhoto[] = [
  // --- Residential ---
  {
    src: "/images/work/residential-panel-open.webp",
    alt: "An open residential breaker panel with a labeled circuit directory on the inside of the door",
    category: "residential",
  },
  {
    src: "/images/work/residential-panel-circuits.webp",
    alt: "An open breaker panel with a full set of labeled circuits and colored wiring running out of the top",
    category: "residential",
  },
  {
    src: "/images/work/residential-rough-in.webp",
    alt: "A breaker panel set into an open stud wall during rough-in, with yellow cable runs above it",
    category: "residential",
  },
  {
    src: "/images/work/residential-service-exterior.webp",
    alt: "An electrical meter and service equipment on the brick exterior of a house, beside an air conditioning condenser",
    category: "residential",
  },
  {
    src: "/images/work/residential-panel-basement.webp",
    alt: "An open breaker panel mounted on a painted cinder block basement wall",
    category: "residential",
  },
  {
    src: "/images/work/residential-recessed-lighting.webp",
    alt: "Recessed ceiling lights lit in a finished room",
    category: "residential",
  },
  {
    src: "/images/work/outlet-tester.webp",
    alt: "A plug-in circuit tester in a ceiling-mounted outlet showing a voltage reading",
    category: "residential",
  },

  // --- Commercial ---
  {
    src: "/images/work/commercial-warehouse-highbay.webp",
    alt: "A warehouse work area lit by ceiling fixtures, with pallets and staff working below",
    category: "commercial",
  },
  {
    src: "/images/work/commercial-warehouse-lighting.webp",
    alt: "A warehouse interior with ceiling lighting above stacked boxes and pallets",
    category: "commercial",
  },
  {
    src: "/images/work/commercial-retail-lighting.webp",
    alt: "A retail sales floor with ceiling lighting and a lift positioned in the aisle",
    category: "commercial",
  },
  {
    src: "/images/work/commercial-retail-ceiling.webp",
    alt: "Ceiling lighting and conduit above a retail aisle stacked with product",
    category: "commercial",
  },
  {
    src: "/images/work/commercial-office-troffers.webp",
    alt: "An office corridor with recessed ceiling light panels and a wall-mounted mini split unit",
    category: "commercial",
  },
  {
    src: "/images/work/commercial-office-interior.webp",
    alt: "An office and shop interior with recessed ceiling light panels above workbenches",
    category: "commercial",
  },
  {
    src: "/images/work/commercial-corridor-lighting.webp",
    alt: "A corridor lit by a long recessed ceiling fixture",
    category: "commercial",
  },
  {
    src: "/images/work/commercial-exterior-soffit.webp",
    alt: "Recessed lights installed in the soffit above a brick building entrance",
    category: "commercial",
  },
  {
    src: "/images/work/commercial-meter-bank.webp",
    alt: "A bank of electrical meters and disconnects mounted on a brick exterior wall",
    category: "commercial",
  },
  {
    src: "/images/work/commercial-panel-board.webp",
    alt: "A large open panel board mounted on a plywood wall with the circuit directory visible",
    category: "commercial",
  },

  // --- Industrial ---
  {
    src: "/images/work/industrial-disconnect-interior.webp",
    alt: "The interior of an opened electrical disconnect showing lugs, terminals, and wiring",
    category: "industrial",
  },
  {
    src: "/images/work/industrial-ceiling-conduit.webp",
    alt: "Ceiling lighting and conduit runs across an industrial ceiling structure",
    category: "industrial",
  },
  {
    src: "/images/work/industrial-conduit-run.webp",
    alt: "Conduit runs and supports along an interior metal wall",
    category: "industrial",
  },
  {
    src: "/images/work/industrial-conduit-disconnect.webp",
    alt: "A conduit run leading to a wall-mounted disconnect box",
    category: "industrial",
  },
];

export const WORK_CATEGORY_LABELS: Record<WorkCategory, string> = {
  residential: "Residential",
  commercial: "Commercial",
  industrial: "Industrial",
};

export function workByCategory(category: WorkCategory) {
  return workPhotos.filter((p) => p.category === category);
}
