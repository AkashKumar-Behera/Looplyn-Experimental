// Centralised content for LOOPLYN. Keeps section components clean.

export const PROCESS_STEPS = [
  {
    index: "01",
    title: "Strategy",
    description:
      "We decode your market, audience and positioning to build a growth blueprint engineered for momentum.",
    points: ["Market & audience research", "Brand positioning", "Growth roadmap"],
  },
  {
    index: "02",
    title: "Create",
    description:
      "Concepts become assets. We craft brand systems, content and campaigns built to stop the scroll.",
    points: ["Visual identity", "Content systems", "Campaign concepts"],
  },
  {
    index: "03",
    title: "Launch",
    description:
      "We deploy across every channel with precision targeting, creative testing and conversion-first funnels.",
    points: ["Paid media", "Creative testing", "Funnel deployment"],
  },
  {
    index: "04",
    title: "Scale",
    description:
      "Data compounds. We optimise relentlessly, double down on winners and turn traction into a flywheel.",
    points: ["Performance optimisation", "Retention loops", "Compounding growth"],
  },
] as const;

export const WORK = [
  {
    title: "Aether Skincare",
    industry: "Beauty / DTC",
    growth: "+412%",
    metric: "Revenue YoY",
    accent: "#8B5CF6",
  },
  {
    title: "Nova Finance",
    industry: "Fintech",
    growth: "+286%",
    metric: "Qualified leads",
    accent: "#A855F7",
  },
  {
    title: "Pulse Athletics",
    industry: "Sportswear",
    growth: "+540%",
    metric: "Social reach",
    accent: "#7C3AED",
  },
  {
    title: "Lumen Studios",
    industry: "SaaS / Creative",
    growth: "+198%",
    metric: "Trial signups",
    accent: "#9333EA",
  },
] as const;

export const SERVICES = [
  {
    title: "Brand Strategy",
    description:
      "Positioning, narrative and identity systems that make ambitious brands impossible to ignore.",
    tag: "Foundation",
  },
  {
    title: "Performance Marketing",
    description:
      "Full-funnel paid media across Meta, Google and TikTok — engineered for profitable, scalable growth.",
    tag: "Growth",
  },
  {
    title: "Content Creation",
    description:
      "Scroll-stopping creative at volume. UGC, editorial and motion built for every platform.",
    tag: "Creative",
  },
  {
    title: "Video Production",
    description:
      "Cinematic brand films and high-output ad creative produced end-to-end by our in-house studio.",
    tag: "Studio",
  },
  {
    title: "Analytics",
    description:
      "Attribution, dashboards and insight pipelines that turn raw data into your next decision.",
    tag: "Intelligence",
  },
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
  },
  {
    quote:
      "The creative output is unreal. Every asset feels premium and every campaign actually performs.",
    name: "Daniel Okafor",
    role: "Founder, Pulse Athletics",
  },
  {
    quote:
      "We finally have a partner that understands brand and performance. The results speak for themselves.",
    name: "Hana Lee",
    role: "VP Growth, Nova Finance",
  },
  {
    quote:
      "From strategy to launch, Looplyn moved faster than any agency we've worked with. Genuinely elite.",
    name: "Marcus Reed",
    role: "CEO, Lumen Studios",
  },
  {
    quote:
      "Our acquisition costs dropped 40% while volume doubled. They simply know what they're doing.",
    name: "Priya Anand",
    role: "Head of Marketing, Vela",
  },
] as const;

export const NAV_LINKS = [
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "Services", href: "#services" },
  { label: "Results", href: "#results" },
  { label: "Contact", href: "#contact" },
] as const;
