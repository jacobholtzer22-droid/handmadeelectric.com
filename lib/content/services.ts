/**
 * SERVICE PAGE CONTENT
 *
 * Rules that govern every string in this file, from seo/FACTS.md:
 *  - No claim about this business that is not CONFIRMED in FACTS.md.
 *  - No prices, ranges, or "starting at". Price questions explain what drives
 *    the cost and invite a quote.
 *  - No response times, no warranty terms, no certifications.
 *  - The words licensed, authorized, certified, factory-trained, and dealer are
 *    blocked while their backing facts are TODO. verify:copy fails the build.
 *  - No em dashes or en dashes.
 *  - General education about how standby generators, transfer switches, sizing,
 *    and permitting work is allowed, because it is true everywhere and is not a
 *    claim about this business.
 */

export type Faq = { q: string; a: string };

export type ServiceContent = {
  slug: string;
  /** Card and nav label */
  navTitle: string;
  /** Page H1 */
  h1: string;
  metaTitle: string;
  metaDescription: string;
  /** Card blurb on the homepage and services index */
  short: string;
  image: string;
  alt: string;
  group: "electrical" | "standby";
  /** Direct-answer opening paragraph: service, business, area */
  intro: string;
  included: { heading: string; items: string[] };
  signs: { heading: string; items: string[] };
  process: { heading: string; steps: { title: string; body: string }[] };
  faq: Faq[];
};

export const services: ServiceContent[] = [
  /* ------------------------------------------------------------------ *
   * GENERAC GENERATOR INSTALLATION - growth page, deepest treatment
   * ------------------------------------------------------------------ */
  {
    slug: "generac-generator-installation",
    navTitle: "Generac generator installation",
    h1: "Generac generator installation in Metro Detroit",
    metaTitle: "Generac Generators in Metro Detroit | Handmade Electric",
    metaDescription:
      "Generac home standby generator installation across Metro Detroit, sized by load calculation and wired to an automatic transfer switch. Call 248-787-0071.",
    short:
      "Standby generator installation, sized for the house and wired to a transfer switch.",
    image: "/images/residential.webp",
    alt: "An exterior meter socket and service disconnect on a brick wall above an open trench for underground conduit",
    group: "standby",
    intro:
      "Handmade Electric installs Generac home standby generators across Metro Detroit. A standby generator sits outside the house, watches the utility power, and starts on its own when the power drops, usually within seconds. We size the unit to what you actually want to run, set it, and wire it to an automatic transfer switch at your panel.",
    included: {
      heading: "What an installation covers",
      items: [
        "A load calculation, so the generator is sized to the circuits you want running rather than to a guess",
        "Placement that respects the clearances a standby unit needs from windows, doors, vents, and the property line",
        "A level pad for the unit to sit on",
        "An automatic transfer switch tied into your electrical panel",
        "Coordination of the natural gas or propane supply the unit runs on",
        "Startup, and a live test that drops the utility power to confirm the generator picks the house up",
      ],
    },
    signs: {
      heading: "Reasons people put one in",
      items: [
        "An outage takes out the sump pump or the well pump and the basement is on a clock",
        "The furnace goes down with the power in a Michigan winter",
        "Someone in the house depends on powered medical equipment",
        "You work from home and an outage is lost income",
        "A freezer full of food will not survive a long outage",
        "You are done dragging a portable generator out in the rain and running cords through a window",
      ],
    },
    process: {
      heading: "How the work goes",
      steps: [
        {
          title: "Walkthrough",
          body: "We look at your panel, your gas supply, and where a unit could sit, and talk through what you want running when the power is out. Whole house and essential circuits are different jobs with different costs.",
        },
        {
          title: "Sizing",
          body: "The load calculation sets the generator size. Undersizing means the unit cannot carry what you asked it to. Oversizing means paying for capacity that never gets used.",
        },
        {
          title: "Permit",
          body: "A standby generator installation is permitted work in most municipalities, and the permit is pulled before the work starts.",
        },
        {
          title: "Installation",
          body: "The pad goes in, the unit is set, the transfer switch is installed at the panel, and the fuel supply is connected.",
        },
        {
          title: "Startup and inspection",
          body: "The unit is commissioned and tested under a real transfer, and the work is inspected by the municipality.",
        },
      ],
    },
    faq: [
      {
        q: "How does a home standby generator actually work?",
        a: "It is wired to your house permanently and monitors the utility power. When the power drops, the transfer switch disconnects the house from the utility and the generator starts and picks up the load, usually within seconds. When utility power comes back and stays steady, the switch transfers the house back and the generator shuts down. You do not have to be home for any of it.",
      },
      {
        q: "What size generator do I need?",
        a: "It depends on what you want running during an outage. Some people want the whole house to behave normally. Others only want the furnace, the sump pump, the refrigerator, and a few outlets and lights. That decision, plus the electrical load of the equipment involved, is what a load calculation measures. Sizing off a neighbor's unit or off a square-foot rule of thumb is how people end up with a generator that cannot carry the house.",
      },
      {
        q: "What is a transfer switch, and do I need one?",
        a: "Yes. A transfer switch is what separates your house from the utility grid while the generator is running. It exists so generator power cannot travel back out onto the utility lines, which is a serious hazard to the line crews working to restore your power. An automatic transfer switch does it by itself. A manual one requires you to be home and throw it. A standby generator is not a legal or safe installation without one.",
      },
      {
        q: "Does a standby generator run on natural gas or propane?",
        a: "Either. If the house already has natural gas service, the unit usually runs on that and there is nothing to refill. If there is no gas at the house, the unit runs on propane from a tank on the property, which does need to be kept full. Which one makes sense is mostly decided by what is already at your house.",
      },
      {
        q: "How much does it cost to install a Generac generator?",
        a: "There is no one number, because the install is most of the job. What moves the price is the size of the unit, how far it sits from the electrical panel and the gas supply, whether your existing panel and service can support it as-is, what the pad and the trenching involve, and the permit your municipality requires. The honest way to answer it is to look at your house. Call or text and we will come out and put real numbers to your situation.",
      },
      {
        q: "Do I need a permit for a generator?",
        a: "In most municipalities, yes, and the finished work is inspected. That is a good thing for you: the inspection is an independent check that the transfer switch, the grounding, and the fuel connection were done correctly on equipment that is going to run unattended while you are asleep or away.",
      },
      {
        q: "How long does an installation take?",
        a: "It depends on how much electrical and fuel work the house needs, and on how quickly the municipality turns the permit and the inspection around. We will tell you what to expect for your specific job when we quote it, rather than quoting you someone else's timeline.",
      },
    ],
  },

  /* ------------------------------------------------------------------ *
   * GENERATOR REPAIR - growth page
   * ------------------------------------------------------------------ */
  {
    slug: "generator-repair",
    navTitle: "Generator repair and service",
    h1: "Generator repair and service in Metro Detroit",
    metaTitle: "Generator Repair in Metro Detroit | Handmade Electric",
    metaDescription:
      "Home standby generator repair and maintenance across Metro Detroit. If your generator will not start or never transferred, call or text 248-787-0071.",
    short:
      "Repair and maintenance for home standby generators that will not start or run.",
    image: "/images/panel-wood-wall.webp",
    alt: "A subpanel mounted on a stained wood wall with a yellow cable run to an outlet and switch below",
    group: "standby",
    intro:
      "Handmade Electric repairs and services home standby generators across Metro Detroit. We install, service, and repair Generac home standby generators. The unit that matters is the one that starts when the power goes out, and a generator that has sat for years without service is not that unit.",
    included: {
      heading: "What we work on",
      items: [
        "Units that crank but will not start, or start and then shut down",
        "Generators that never transferred when the power actually went out",
        "Fault codes and warning lights on the controller",
        "Batteries, which are the single most common reason a standby unit fails to start",
        "Oil, filters, plugs, and the rest of routine maintenance",
        "Transfer switch testing, because a healthy generator behind a failed switch still leaves you dark",
      ],
    },
    signs: {
      heading: "Signs your generator needs attention",
      items: [
        "It stopped running its weekly exercise cycle, or you never hear it anymore",
        "It cranks and cranks but will not fire",
        "It starts, runs briefly, and shuts itself down",
        "The controller is showing a fault, a warning light, or a blank screen",
        "The power went out and the generator sat there",
        "It has not been serviced since the day it was installed",
      ],
    },
    process: {
      heading: "How the work goes",
      steps: [
        {
          title: "Tell us what it is doing",
          body: "Call or text with the make, the model, and what the unit is or is not doing. Any fault code on the controller is worth writing down before you call.",
        },
        {
          title: "Diagnosis on site",
          body: "We test rather than guess. Battery and charging system, fuel supply, oil level and the safety shutdowns tied to it, the controller, and the transfer switch.",
        },
        {
          title: "Findings first",
          body: "You get told what is wrong and what the options are before any repair work happens. On an older unit that includes an honest read on whether the repair is worth doing.",
        },
        {
          title: "Repair and test",
          body: "After the repair the unit is tested on a real transfer, not just started up, because starting and carrying the house are two different things.",
        },
      ],
    },
    faq: [
      {
        q: "My standby generator will not start. What is usually wrong?",
        a: "The battery, more often than anything else. A standby generator sits unused for months at a time and the battery quietly dies where you cannot see it, so the first you learn of it is during an outage. After that the common causes are fuel supply problems, a low oil level tripping the safety shutdown, a controller fault, and maintenance that was never done. It needs to be diagnosed rather than guessed at, because several of those look identical from the driveway.",
      },
      {
        q: "How often does a standby generator need to be serviced?",
        a: "Standby generators are serviced on a schedule the same way a furnace is, based on the manufacturer's interval and on run hours, and units that run through a long outage need attention sooner. The point of the schedule is that the failure gets found on a calm afternoon instead of during the storm that takes your power out.",
      },
      {
        q: "Why does my generator run by itself once a week?",
        a: "That is the exercise cycle and it is supposed to happen. The unit starts itself briefly on a schedule to circulate oil, keep the engine from seizing up, and keep the battery charged. If yours used to do it and has gone quiet, that is a real warning sign and it is worth a call, because a unit that has stopped exercising will usually not start when you need it.",
      },
      {
        q: "Do you work on brands other than Generac?",
        a: "We install, service, and repair Generac home standby generators. If you have a different brand, call or text with the make and the model and you will get a straight answer about whether we can help you, rather than a truck showing up and a bill for finding out we cannot.",
      },
      {
        q: "What does a generator repair cost?",
        a: "It depends entirely on what is actually wrong, which is why nobody can quote it honestly over the phone. A battery is a very different job from a controller or an engine problem, and parts availability on older units affects it too. You get the diagnosis and your options before any repair work starts.",
      },
      {
        q: "Is it worth repairing an old generator or should I replace it?",
        a: "That depends on the age of the unit, the hours on it, what has failed, and whether parts are still available for it. Sometimes the repair is clearly the right call and sometimes you would be putting money into a unit that is going to fail again. We will tell you which one you are looking at and let you make the decision.",
      },
    ],
  },

  /* ------------------------------------------------------------------ *
   * RESIDENTIAL - built from the salvaged blurb, edited down
   * ------------------------------------------------------------------ */
  {
    slug: "residential",
    navTitle: "Residential",
    h1: "Residential electrician in Metro Detroit",
    metaTitle: "Residential Electrician in Metro Detroit | Handmade Electric",
    metaDescription:
      "Residential electrical work across Metro Detroit: panel replacements, troubleshooting, renovation wiring, and safety upgrades. Call or text 248-787-0071.",
    short:
      "Panel work, troubleshooting, renovations, and safety upgrades for homes.",
    image: "/images/panel-open.webp",
    alt: "An open residential breaker panel with the circuit directory label on the inside of the door",
    group: "electrical",
    intro:
      "Handmade Electric does residential electrical work across Metro Detroit, from tracking down one dead outlet to replacing a panel or wiring a renovation. Whether the job is fixing something that is unsafe or adding what a remodel needs, the work is done to code.",
    included: {
      heading: "What we do in homes",
      items: [
        "Panel replacements and service upgrades",
        "Troubleshooting dead outlets, breakers that keep tripping, and lights that flicker",
        "Wiring for renovations and additions",
        "Outlets, switches, and dedicated circuits for appliances",
        "Interior and exterior lighting",
        "Safety upgrades on older wiring, including ungrounded outlets",
      ],
    },
    signs: {
      heading: "When to call an electrician",
      items: [
        "A breaker trips again as soon as you reset it",
        "An outlet, switch, or cover plate is warm, discolored, or buzzing",
        "Lights dim or flicker when the furnace or the air conditioning kicks on",
        "You still have two-prong outlets with nothing grounding them",
        "The panel is full and there is no room for another circuit",
        "You are planning a remodel and need the wiring done before the walls close",
      ],
    },
    process: {
      heading: "How the work goes",
      steps: [
        {
          title: "Tell us what is happening",
          body: "Call or text a description of the problem. For a quote on planned work, a walkthrough is usually the fastest way to a real number.",
        },
        {
          title: "Diagnose or quote",
          body: "For a fault, the work starts with finding the actual cause instead of replacing parts and hoping. For planned work, you get a quote on the scope before anything begins.",
        },
        {
          title: "The work",
          body: "Done to code, tested before we leave, and the area is cleaned up.",
        },
        {
          title: "Permit and inspection where required",
          body: "Panel and service work is permitted work in most municipalities, and the finished job is inspected.",
        },
      ],
    },
    faq: [
      {
        q: "How do I know if my electrical panel needs to be replaced?",
        a: "The usual signs are a panel with no space left for new circuits, breakers that trip with no real load behind them, rust or scorching inside the cabinet, or a service that is too small for how the house is actually used now. Age alone is not automatically a reason, but some older panel types have known problems worth having looked at.",
      },
      {
        q: "Why do my breakers keep tripping?",
        a: "A breaker trips because it is doing its job. The usual causes are too much load on one circuit, a short, a ground fault, or a breaker that has worn out and now trips below its rating. The important part is which one it is, because a repeatedly overloaded circuit and a short in the wall are very different levels of urgency. Resetting a breaker over and over without finding the cause is the one thing not to do.",
      },
      {
        q: "Do you pull permits for residential work?",
        a: "Permits go with the scope of the work. Panel replacements and service upgrades are permitted and inspected work in most municipalities. Smaller repairs often are not. You will be told which category your job falls into up front rather than after the fact.",
      },
      {
        q: "Can you work on an older home?",
        a: "Yes, and there are a lot of them in Metro Detroit. Older houses bring ungrounded circuits, undersized services, and wiring that has been added to by several people over several decades. That work needs someone who will look at what is actually behind the wall rather than assuming it matches what is on the panel directory.",
      },
      {
        q: "What does an electrician cost for a small job?",
        a: "It depends on what the job turns out to be, which is often not what it looks like from the outside. A dead outlet can be a five minute fix or the visible end of a problem further up the circuit. Describe what is happening when you call or text and you will get a straight answer about what it takes to find out.",
      },
    ],
  },

  /* ------------------------------------------------------------------ *
   * COMMERCIAL - built from the salvaged blurb, edited down
   * ------------------------------------------------------------------ */
  {
    slug: "commercial",
    navTitle: "Commercial",
    h1: "Commercial electrician in Metro Detroit",
    metaTitle: "Commercial Electrician in Metro Detroit | Handmade Electric",
    metaDescription:
      "Commercial electrical work across Metro Detroit for retail, offices, and commercial property: build-outs, lighting upgrades, and code compliance.",
    short:
      "Build-outs, lighting upgrades, and code-compliant power for businesses.",
    image: "/images/commercial.webp",
    alt: "A warehouse interior lit by rows of LED high bay fixtures, with pallets and boxes on the floor",
    group: "electrical",
    intro:
      "Handmade Electric does commercial electrical work across Metro Detroit for retail spaces, offices, and commercial properties. When the electrical is down, the business is down, so the work is scoped around keeping you open and keeping you code compliant.",
    included: {
      heading: "What we do for commercial property",
      items: [
        "Tenant build-outs and space reconfigurations",
        "Lighting upgrades, including LED retrofits",
        "Power for new equipment and dedicated circuits",
        "Panel and distribution work",
        "Troubleshooting faults that are interrupting operations",
        "Corrections for code and inspection items",
      ],
    },
    signs: {
      heading: "When a business calls us",
      items: [
        "A build-out needs electrical before the space can open",
        "Lighting is dated, expensive to run, or failing fixture by fixture",
        "New equipment needs power the existing panel was never sized for",
        "Breakers are tripping during business hours",
        "An inspection turned up electrical items that have to be corrected",
        "The space has been added onto so many times nobody knows what feeds what",
      ],
    },
    process: {
      heading: "How the work goes",
      steps: [
        {
          title: "Walkthrough and scope",
          body: "We look at the space, the existing distribution, and what the work actually requires, including anything the current setup will not support.",
        },
        {
          title: "Quote",
          body: "You get the scope and the cost before the work starts, so it can be planned against your schedule.",
        },
        {
          title: "Scheduling around operations",
          body: "Work that would interrupt the business gets scheduled around the business wherever the job allows it.",
        },
        {
          title: "Permit, inspection, and closeout",
          body: "Permitted work is inspected, and you are left with a space that passes rather than a list of items to chase.",
        },
      ],
    },
    faq: [
      {
        q: "Can you work outside of our business hours?",
        a: "Where the job allows it, work that would interrupt operations gets scheduled around them. Some work cannot be done live and needs the power off, and in that case the honest thing is to plan the outage with you in advance rather than discover it mid-job.",
      },
      {
        q: "Do you handle tenant build-outs?",
        a: "Yes. Build-outs are a large part of commercial electrical work: new circuits, lighting, and power laid out for how the tenant will actually use the space, coordinated with the rest of the trades on the job.",
      },
      {
        q: "Is upgrading to LED lighting worth it?",
        a: "In a commercial space it usually comes down to three things: what you currently spend running the lighting, how often someone is up on a ladder replacing lamps and ballasts, and whether the light levels are right for the work being done. A warehouse or a shop running old fixtures for long hours is where the case is strongest.",
      },
      {
        q: "What does commercial electrical work cost?",
        a: "It is driven by the scope, the condition and capacity of the existing distribution, how accessible the work is, whether it has to happen outside operating hours, and what the municipality requires. Commercial spaces vary too much for a number to mean anything before someone has walked it.",
      },
      {
        q: "Do you work with the property manager or the tenant?",
        a: "Either. Who is responsible for a given piece of electrical work depends on the lease, and it is worth being clear about that before the work starts rather than after the invoice.",
      },
    ],
  },

  /* ------------------------------------------------------------------ *
   * INDUSTRIAL - built from the salvaged blurb, edited down
   * ------------------------------------------------------------------ */
  {
    slug: "industrial",
    navTitle: "Industrial",
    h1: "Industrial electrician in Metro Detroit",
    metaTitle: "Industrial Electrician in Metro Detroit | Handmade Electric",
    metaDescription:
      "Industrial electrical work across Metro Detroit for plants and warehouses: machinery hookups, panel inspections, and distribution. Call or text 248-787-0071.",
    short: "Machinery hookups, panel inspections, and high-voltage systems.",
    image: "/images/industrial.webp",
    alt: "A large industrial building interior with heavy conduit and electrical runs across the ceiling",
    group: "electrical",
    intro:
      "Handmade Electric does industrial electrical work across Metro Detroit for manufacturing plants, warehouses, and industrial facilities. Industrial environments run higher voltages and less forgiving equipment than a house or a storefront, and the work is approached that way.",
    included: {
      heading: "What we do in industrial facilities",
      items: [
        "Machinery hookups and disconnects",
        "Panel and distribution work",
        "Panel inspections",
        "Power distribution for equipment moves and line changes",
        "Troubleshooting faults on production equipment",
        "Lighting for plant and warehouse space",
      ],
    },
    signs: {
      heading: "When a facility calls us",
      items: [
        "A new machine is arriving and needs power run and connected",
        "Equipment is being moved and the distribution has to move with it",
        "A fault is taking down a line and nobody has found it",
        "Panels have not been inspected in years",
        "Plant or warehouse lighting is failing or is inadequate for the work",
        "Documentation no longer matches what is actually installed",
      ],
    },
    process: {
      heading: "How the work goes",
      steps: [
        {
          title: "Walk the facility",
          body: "We look at the equipment, the existing distribution, and the access and safety constraints the work has to happen inside of.",
        },
        {
          title: "Scope and quote",
          body: "You get the scope and the cost up front, including any capacity limits in the existing system that the new work would expose.",
        },
        {
          title: "Schedule around production",
          body: "Work that requires equipment down gets planned with you rather than sprung on you.",
        },
        {
          title: "Execute, test, and document",
          body: "The work is tested before it is handed back, so equipment is not started up on an assumption.",
        },
      ],
    },
    faq: [
      {
        q: "Can you connect new machinery?",
        a: "Yes. Machinery hookups cover running the feed, the disconnect, and the connection to the equipment, sized to what the machine actually draws rather than to what is convenient to run. Part of that job is confirming the existing distribution can carry the new load before the machine shows up.",
      },
      {
        q: "What is a panel inspection and why does it matter?",
        a: "It is a look at the condition of the distribution equipment: connections, signs of heat, corrosion, loading, and whether what is installed still matches what the panel says is installed. In an industrial facility a failing connection inside a panel is both a fire risk and an unplanned line-down event, and both are cheaper to find on purpose.",
      },
      {
        q: "Can you work around our production schedule?",
        a: "Where the job allows it, yes. Some work requires equipment to be down, and in that case the outage gets planned with you in advance so the shutdown lands where it costs the least.",
      },
      {
        q: "What does industrial electrical work cost?",
        a: "It depends on the equipment involved, the condition and capacity of the existing distribution, access, and whether the work can be done live or requires a shutdown. Industrial jobs vary too widely for a number to be meaningful before the facility has been walked.",
      },
    ],
  },
];

export const servicesBySlug = new Map(services.map((s) => [s.slug, s]));

export const tradeServices = services.filter((s) => s.group === "electrical");
export const standbyServices = services.filter((s) => s.group === "standby");
