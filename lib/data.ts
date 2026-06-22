// Centralised content for LOOPLYN — cinematic edition.
// Media `src` paths point at /public/videos/* and /public/images/*.
// If those files are absent, <Media> renders a filmic placeholder instead,
// so you can drop real footage in later with zero code changes.

export const NAV_LINKS = [
  { label: "Story", href: "#story" },
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Results", href: "#results" },
  { label: "Contact", href: "#contact" },
] as const;

/** Splash boot sequence modules. */
export const BOOT_MODULES = [
  "Strategy",
  "Production",
  "Content",
  "Campaigns",
  "Growth",
] as const;

/** Brand story paragraphs — revealed word-by-word on scroll. */
export const STORY_PARAGRAPHS = [
  "Looplyn is a creative growth studio built at the intersection of brand, film and performance.",
  "We treat every brand like a story worth directing — researched, scripted, shot and scaled with intent.",
  "No trend-chasing. No templates. Just cinematic work engineered to make ambitious brands impossible to ignore.",
] as const;

/** Services hover-reveal list. */
export const SERVICES = [
  {
    index: "01",
    title: "Strategy",
    description:
      "Positioning, narrative and growth architecture that gives every campaign a reason to exist.",
    seed: 1,
    src: "/videos/strategy.mp4",
  },
  {
    index: "02",
    title: "Production",
    description:
      "An in-house film studio. Concept, direction, shoot and post — cinematic brand films at volume.",
    seed: 2,
    src: "/videos/production.mp4",
  },
  {
    index: "03",
    title: "Content",
    description:
      "Scroll-stopping social, editorial and UGC built natively for every platform and feed.",
    seed: 3,
    src: "/videos/content.mp4",
  },
  {
    index: "04",
    title: "Campaigns",
    description:
      "Full-funnel paid media across Meta, TikTok, YouTube and Google — engineered to convert.",
    seed: 4,
    src: "/videos/campaigns.mp4",
  },
  {
    index: "05",
    title: "Growth",
    description:
      "Attribution, optimisation and retention loops that turn early traction into a flywheel.",
    seed: 5,
    src: "/videos/growth.mp4",
  },
] as const;

/** Image-stack storytelling timeline. */
export const STORY_STEPS = [
  { index: "01", title: "Research", caption: "Audience, market & tension", seed: 11 },
  { index: "02", title: "Planning", caption: "Concept & creative direction", seed: 12 },
  { index: "03", title: "Production", caption: "Shoot days & art direction", seed: 13 },
  { index: "04", title: "Editing", caption: "Story, grade & sound", seed: 14 },
  { index: "05", title: "Launch", caption: "Distribution & paid media", seed: 15 },
  { index: "06", title: "Scale", caption: "Optimise & compound", seed: 16 },
] as const;

/** Video wall — 3x3 grid. */
export const VIDEO_WALL = [
  { title: "Aether", category: "Beauty Film", seed: 21 },
  { title: "Nova", category: "Fintech Spot", seed: 22 },
  { title: "Pulse", category: "Sport Campaign", seed: 23 },
  { title: "Lumen", category: "SaaS Launch", seed: 24 },
  { title: "Vela", category: "DTC Brand", seed: 25 },
  { title: "Onyx", category: "Luxury Reel", seed: 26 },
  { title: "Ridge", category: "Outdoor Doc", seed: 27 },
  { title: "Halo", category: "Product Film", seed: 28 },
  { title: "Mirae", category: "Fashion Edit", seed: 29 },
] as const;

/** Process timeline (horizontal). */
export const PROCESS_STEPS = [
  {
    index: "01",
    title: "Discover",
    description: "We immerse in your market, audience and ambition to find the real story.",
  },
  {
    index: "02",
    title: "Strategize",
    description: "Positioning, messaging and a channel plan engineered for momentum.",
  },
  {
    index: "03",
    title: "Create",
    description: "Brand systems, film and content produced end-to-end by our studio.",
  },
  {
    index: "04",
    title: "Launch",
    description: "Precision paid media, creative testing and conversion-first funnels.",
  },
  {
    index: "05",
    title: "Scale",
    description: "Relentless optimisation that turns traction into a compounding flywheel.",
  },
] as const;

/** Case studies — horizontal scroll cards. */
export const CASE_STUDIES = [
  {
    title: "Aether Skincare",
    category: "Beauty / DTC",
    metrics: [
      { k: "+412%", v: "Revenue YoY" },
      { k: "3.1x", v: "ROAS" },
      { k: "12M", v: "Views" },
    ],
    seed: 31,
  },
  {
    title: "Nova Finance",
    category: "Fintech",
    metrics: [
      { k: "+286%", v: "Qualified leads" },
      { k: "-38%", v: "CAC" },
      { k: "8M", v: "Reach" },
    ],
    seed: 32,
  },
  {
    title: "Pulse Athletics",
    category: "Sportswear",
    metrics: [
      { k: "+540%", v: "Social reach" },
      { k: "4.6x", v: "ROAS" },
      { k: "21M", v: "Views" },
    ],
    seed: 33,
  },
  {
    title: "Lumen Studios",
    category: "SaaS / Creative",
    metrics: [
      { k: "+198%", v: "Trial signups" },
      { k: "2.4x", v: "LTV" },
      { k: "5M", v: "Impressions" },
    ],
    seed: 34,
  },
] as const;

/** Before / After comparison metrics. */
export const BEFORE_AFTER = [
  { label: "Traffic", before: 18, after: 92, unit: "K/mo" },
  { label: "Leads", before: 120, after: 980, unit: "/mo" },
  { label: "Revenue", before: 240, after: 1480, unit: "K" },
  { label: "Conversions", before: 1.1, after: 4.8, unit: "%" },
] as const;

export const STATS = [
  { value: 150, suffix: "+", label: "Brands scaled" },
  { value: 300, suffix: "%", label: "Average growth" },
  { value: 50, suffix: "M+", label: "Audience reached" },
] as const;

export const TESTIMONIALS = [
  {
    quote:
      "Looplyn rebuilt our entire funnel and tripled revenue in two quarters. They operate like an extension of our team.",
    name: "Sofia Marchetti",
    role: "CMO, Aether Skincare",
    video: true,
    seed: 41,
  },
  {
    quote:
      "The creative output is unreal. Every asset feels premium and every campaign actually performs.",
    name: "Daniel Okafor",
    role: "Founder, Pulse Athletics",
    video: false,
    seed: 42,
  },
  {
    quote:
      "We finally have a partner that understands brand and performance. The results speak for themselves.",
    name: "Hana Lee",
    role: "VP Growth, Nova Finance",
    video: true,
    seed: 43,
  },
  {
    quote:
      "From strategy to launch, Looplyn moved faster than any agency we've worked with. Genuinely elite.",
    name: "Marcus Reed",
    role: "CEO, Lumen Studios",
    video: false,
    seed: 44,
  },
  {
    quote:
      "Our acquisition costs dropped 40% while volume doubled. They simply know what they're doing.",
    name: "Priya Anand",
    role: "Head of Marketing, Vela",
    video: true,
    seed: 45,
  },
] as const;

export const CLIENT_LOGOS = [
  "AETHER",
  "NOVA",
  "PULSE",
  "LUMEN",
  "VELA",
  "ONYX",
  "RIDGE",
  "HALO",
  "MIRAE",
] as const;
