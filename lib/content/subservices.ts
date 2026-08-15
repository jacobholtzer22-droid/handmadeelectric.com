/**
 * SERVICE SUB-PAGES
 *
 * These exist only because they clear a depth bar: process, what determines
 * scope, what the customer should expect, and a full FAQ. A sub-page that
 * cannot carry all four is padding and must be cut, not shipped thin.
 *
 * Same rules as lib/content/services.ts: no claim about this business that is
 * not CONFIRMED in seo/FACTS.md, no prices, no response times, no gated words,
 * no em dashes. General trade education is allowed because it is true
 * everywhere and is not a claim about this business.
 *
 * NOTHING about EV chargers appears here. That is an open question for Trae
 * (FACTS section 4) and nothing is built or referenced until it is answered.
 */
import type { Faq } from "./services";

export type SubService = {
  parentSlug: string;
  slug: string;
  navTitle: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  image: string;
  alt: string;
  intro: string;
  determines: { heading: string; lead: string; items: { title: string; body: string }[] };
  expect: { heading: string; lead: string; items: string[] };
  process: { heading: string; steps: { title: string; body: string }[] };
  faq: Faq[];
};

export const subServices: SubService[] = [
  /* ------------------------------------------------------------------ */
  {
    parentSlug: "residential",
    slug: "panel-replacement",
    navTitle: "Panel replacement and service upgrades",
    h1: "Electrical panel replacement in Metro Detroit",
    metaTitle: "Panel Replacement in Metro Detroit | Handmade Electric",
    metaDescription:
      "Electrical panel replacement and service upgrades across Metro Detroit. What drives the scope, what to expect on the day, and answers to the usual questions.",
    image: "/images/work/residential-panel-circuits.webp",
    alt: "An open breaker panel with a full set of labeled circuits and colored wiring running out of the top",
    intro:
      "Handmade Electric replaces electrical panels and upgrades services across Metro Detroit. A panel replacement swaps the box that every circuit in the house terminates in. A service upgrade goes further and increases how much power the utility delivers to the house in the first place. They are related jobs and they are not the same job, and which one you need changes the scope, the cost, and the day.",
    determines: {
      heading: "What determines the scope",
      lead: "Two houses with identical panels can be very different jobs. These are the things that actually move it.",
      items: [
        {
          title: "Replacement or upgrade",
          body: "Swapping a failing 200 amp panel for a new 200 amp panel is one job. Going from 100 amp to 200 amp service is another: it involves the utility, the meter, the service entrance conductors, and the grounding, not just the box on the wall.",
        },
        {
          title: "Where the panel is and what feeds it",
          body: "A panel in an open basement next to the meter is straightforward. A panel in a finished room, on the far side of the house from the service entrance, or fed by conductors that are undersized for the new panel, adds real work.",
        },
        {
          title: "The condition of what is already there",
          body: "Aluminum branch wiring, ungrounded circuits, cloth-insulated conductors, and previous work that was never done to code all surface during a panel replacement. Some of it has to be corrected as part of the job.",
        },
        {
          title: "Circuit count and what the house actually runs",
          body: "A load calculation sets the panel size, not the number of breakers currently installed. Air conditioning, electric range, dryer, well pump, hot tub, and a standby generator all change the number.",
        },
        {
          title: "The municipality",
          body: "Panel and service work is permitted and inspected work in most municipalities, and requirements are not identical across Metro Detroit.",
        },
      ],
    },
    expect: {
      heading: "What to expect on the day",
      lead: "This is the part most quotes leave out, and it is usually what people actually want to know.",
      items: [
        "The power to the house is off for a significant part of the day. Plan for it: refrigerator, freezer, medical equipment, anyone working from home.",
        "On a service upgrade the utility has to be involved to pull and reset the meter, which has to be scheduled and is not fully within any contractor's control.",
        "Every circuit gets landed and labeled on a new directory, which is the first time many houses have had an accurate one.",
        "Problems that were hidden behind the old panel become visible, and you should expect to hear about them rather than have them quietly closed back up.",
        "An inspector looks at the finished work. That is a second set of eyes on equipment your house depends on for decades.",
      ],
    },
    process: {
      heading: "How the work goes",
      steps: [
        {
          title: "Look at it in person",
          body: "Panel type, service size, meter and service entrance, grounding, and the condition of the branch circuits. A photo of the panel with the door open is a useful start, but this job is not quoted properly from a photo.",
        },
        {
          title: "Load calculation and scope",
          body: "The calculation sets the service and panel size. You get told whether this is a replacement or a genuine service upgrade, and what that changes.",
        },
        {
          title: "Permit, and the utility if needed",
          body: "The permit is pulled before the work. On a service upgrade the meter work is coordinated with the utility.",
        },
        {
          title: "Replacement day",
          body: "Power off, old panel out, new panel set, every circuit landed and labeled, grounding and bonding brought up to current requirements.",
        },
        {
          title: "Inspection",
          body: "The municipality inspects the finished work.",
        },
      ],
    },
    faq: [
      {
        q: "How do I know if I need a panel replacement or a service upgrade?",
        a: "If the panel is failing, rusted, scorched, full, or a type with known problems, but the house has enough power for how you live, that is a replacement. If you are constantly out of capacity, adding major equipment, or still on a 100 amp service in a house running modern loads, that is a service upgrade. The load calculation is what settles it rather than a guess.",
      },
      {
        q: "How long will the power be off?",
        a: "Most of a working day for a straightforward replacement, and longer when the utility has to pull and reset the meter for a service upgrade. You will be told what to plan for on your specific job before the day, not on the morning of it. Anyone with medical equipment or a freezer full of food should plan around it.",
      },
      {
        q: "What does a panel replacement cost?",
        a: "It depends on the things listed above: whether the service is changing, where the panel sits relative to the meter, the condition of the existing conductors and grounding, how many circuits there are, and what your municipality requires. The reason nobody quotes this honestly over the phone is that half of what drives it is not visible until someone looks at the equipment.",
      },
      {
        q: "Do I need a permit to replace an electrical panel?",
        a: "In most municipalities, yes, and the work is inspected. This is worth wanting. A panel is the single point every circuit in the house passes through, it is installed once and lives for decades, and an independent inspection is cheap insurance on it.",
      },
      {
        q: "My panel is old but nothing is wrong. Should I replace it?",
        a: "Age alone is not a reason. Condition is. Rust, heat damage, breakers that trip below their rating or will not reset, a full panel with no room to add a circuit, and certain panel types with known failure patterns are all reasons. If none of that is true, an inspection tells you where you stand without spending money on a replacement you may not need.",
      },
      {
        q: "Will you find other problems once the panel is open?",
        a: "Often, yes, particularly in older houses. Ungrounded circuits, aluminum branch wiring, double-tapped breakers, and previous work that was never done correctly all live behind the panel cover. You will be told what is there and what it means before anything beyond the agreed scope happens.",
      },
      {
        q: "Can you add a standby generator to a new panel?",
        a: "Yes, and if a generator is anywhere in your plans it is worth saying so before the panel is sized and installed. A transfer switch and the circuits it will carry are much easier to account for while the panel is being replaced than to retrofit afterward.",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    parentSlug: "commercial",
    slug: "lighting-retrofits",
    navTitle: "Commercial lighting retrofits",
    h1: "Commercial LED lighting retrofits in Metro Detroit",
    metaTitle: "LED Lighting Retrofits in Metro Detroit | Handmade Electric",
    metaDescription:
      "Commercial LED lighting retrofits across Metro Detroit for warehouses, retail, and offices. What drives the scope and what to expect during the work.",
    image: "/images/work/commercial-warehouse-highbay.webp",
    alt: "A warehouse work area lit by ceiling fixtures, with pallets and staff working below",
    intro:
      "Handmade Electric retrofits commercial lighting across Metro Detroit in warehouses, retail space, offices, and shops. A retrofit changes what is in the ceiling, and it changes three things at once: what the lighting costs to run, how often someone has to get up there to fix it, and whether people can actually see what they are doing.",
    determines: {
      heading: "What determines the scope",
      lead: "The fixture count is the number everyone asks about first. It is rarely the thing that decides the job.",
      items: [
        {
          title: "Ceiling height and access",
          body: "A twelve foot office ceiling and a thirty foot warehouse ceiling are different jobs at the same fixture count, because the second one needs a lift, more time per fixture, and a plan for working over racking and inventory.",
        },
        {
          title: "Retrofit kit or full fixture replacement",
          body: "Sometimes the existing housing stays and the internals are replaced. Sometimes the whole fixture comes out. Condition, age, and what you are trying to achieve on light levels decide which, and they cost differently.",
        },
        {
          title: "What is behind the fixtures",
          body: "Existing wiring, ballasts, and switching are frequently the actual work. A space that has been reconfigured several times often has circuits and controls that no longer match how the space is used.",
        },
        {
          title: "Controls",
          body: "Occupancy sensors, daylight sensors, and zoning change both the install and how much the lighting actually saves once it is running. A warehouse aisle that is empty most of the day is the clearest case for them.",
        },
        {
          title: "Light levels for the work being done",
          body: "A parts counter, a packing bench, a retail display, and a storage aisle do not want the same amount of light. Matching the space to the work is the difference between a retrofit that people are glad about and one they complain about.",
        },
        {
          title: "When it can happen",
          body: "Work that has to happen outside operating hours costs differently from work that can happen during the day.",
        },
      ],
    },
    expect: {
      heading: "What to expect during the work",
      lead: "For a facility manager, the disruption question matters as much as the quote.",
      items: [
        "Work is normally staged by area so the whole building is not down at once, and you keep operating.",
        "Areas being worked on need to be clear underneath, particularly where a lift has to get in.",
        "Circuits are off in the section being worked on, which sometimes affects more than the lighting depending on how the space is wired.",
        "Old lamps and ballasts have to be handled and removed properly rather than left in a dumpster out back.",
        "Light levels change noticeably. That is the point, and it is worth walking a finished area before the rest of the building is committed.",
        "Any utility rebate programs that apply have their own paperwork and their own requirements, and those requirements can affect which product goes in. Worth raising before the order rather than after.",
      ],
    },
    process: {
      heading: "How the work goes",
      steps: [
        {
          title: "Walk the space",
          body: "Fixture count and type, ceiling height, access, existing circuits and controls, and what work is actually happening under each area.",
        },
        {
          title: "Scope and quote",
          body: "You get the approach, the product, and the cost, including anything in the existing wiring or controls that the retrofit would expose.",
        },
        {
          title: "Schedule around operations",
          body: "Areas, sequence, and hours are planned with you, so the work lands where it costs your business the least.",
        },
        {
          title: "Install by area",
          body: "Section by section, with the old material removed as it goes rather than stacked in a corner.",
        },
        {
          title: "Walk it before signing off",
          body: "Look at the finished areas with the lights on during the hours the space is actually used.",
        },
      ],
    },
    faq: [
      {
        q: "Is an LED retrofit actually worth it?",
        a: "It comes down to three things. What you currently spend running the lighting, how often someone is on a ladder or a lift replacing lamps and ballasts, and whether the light levels are right for the work. A space running old fixtures long hours, especially with a high ceiling where every lamp change is a production, is where the case is strongest. A small space with a few fixtures on a few hours a day is a much weaker case, and you should hear that.",
      },
      {
        q: "Can you do the work without shutting down the business?",
        a: "Usually. Retrofits are normally staged by area so you keep operating while a section is done. Some work needs the circuit off and some areas need to be clear underneath, so the sequence gets planned with you. If a piece genuinely cannot be done during business hours, you will hear that when it is quoted rather than on the day.",
      },
      {
        q: "What does a lighting retrofit cost?",
        a: "The fixture count matters less than people expect. Ceiling height and access, whether it is a retrofit kit or a full fixture replacement, the state of the existing wiring and controls, and whether the work has to happen after hours are what actually drive it. It needs someone to walk the space.",
      },
      {
        q: "Should we add occupancy sensors?",
        a: "In spaces that are genuinely empty a lot of the time, warehouse aisles, storage rooms, and back of house areas, sensors are usually where the real savings are, because the cheapest light is the one that is off. In a space that is occupied continuously they add cost without much return. It depends on the area, and different areas in one building can go different ways.",
      },
      {
        q: "What happens to the old fixtures and lamps?",
        a: "They come out and are handled properly. Older lamps and ballasts have disposal requirements, and that is part of the job rather than something left for you to deal with.",
      },
      {
        q: "Are there rebates for commercial lighting upgrades?",
        a: "Utility rebate programs for commercial lighting do exist, and the details, eligibility, and paperwork change over time and vary by utility and by program. It is worth checking what is available before the product is ordered, because program requirements can affect which fixtures qualify. Confirm the current terms with the utility rather than relying on what was true last year.",
      },
    ],
  },
];

export const subServicesBySlug = new Map(
  subServices.map((s) => [`${s.parentSlug}/${s.slug}`, s])
);

export function subServicesFor(parentSlug: string) {
  return subServices.filter((s) => s.parentSlug === parentSlug);
}
