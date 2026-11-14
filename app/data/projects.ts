export type Layer = "interface" | "logic" | "intelligence" | "data" | "platform";

export const LAYERS: { key: Layer; name: string }[] = [
  { key: "interface", name: "Interface" },
  { key: "logic", name: "Logic" },
  { key: "intelligence", name: "Intelligence" },
  { key: "data", name: "Data" },
  { key: "platform", name: "Platform" },
];

export interface StackLayer {
  layer: Layer;
  /** Display name on the slab, e.g. "API", "Agent". */
  label: string;
  /** Must match a Skill name so the parts bin can link to it. */
  tech: string[];
  /** Set while a detail is still a guess; renders as a dashed slab. */
  confirm?: string;
}

export interface Project {
  slug: string;
  title: string;
  status: "live" | "repo";
  links: { github: string; live?: string };
  screenshot: string;
  /** Globe pin. `code` is the airport-style code on the boarding pass. `placeholder` until real locations are chosen. */
  location: { lat: number; lon: number; place: string; code: string; reason?: string; placeholder?: boolean };
  problem: string;
  objective: string;
  /** Top of the stack first. */
  layers: StackLayer[];
}

export const HOME = { lat: -25.99, lon: 28.13, place: "Midrand", code: "JNB" };

export const projects: Project[] = [
  {
    slug: "lumina-ai-notes",
    title: "Lumina AI Notes",
    status: "repo",
    links: { github: "https://github.com/zerobbreak/Lumina-AI-Notes" },
    screenshot: "/projects/lumina-ai-notes.png",
    location: { lat: 35.68, lon: 139.69, place: "Tokyo", code: "TYO", placeholder: true },
    problem: "Notes pile up faster than people can organize them, so useful ideas get lost in the noise.",
    objective: "Organize, summarize and search notes automatically so structuring your thoughts takes almost no effort.",
    layers: [
      { layer: "interface", label: "Interface", tech: ["React", "TypeScript", "Tailwind CSS"] },
      { layer: "intelligence", label: "Intelligence", tech: ["OpenAI API"] },
      { layer: "data", label: "Storage", tech: [], confirm: "where notes are stored" },
      { layer: "platform", label: "Build", tech: ["Vite"] },
    ],
  },
  {
    slug: "ai-mazing",
    title: "AI-Mazing",
    status: "repo",
    links: { github: "https://github.com/zerobbreak/AI-Mazing" },
    screenshot: "/projects/ai-mazing.png",
    location: { lat: -1.29, lon: 36.82, place: "Nairobi", code: "NBO", placeholder: true },
    problem: "Machine learning is hard for beginners to picture, so most give up before anything clicks.",
    objective: "Teach AI through gamified tutorials and visual demos that run right in the browser.",
    layers: [
      { layer: "interface", label: "Interface", tech: ["React", "Framer Motion"] },
      { layer: "intelligence", label: "In-browser ML", tech: ["TensorFlow.js"] },
      { layer: "logic", label: "Python", tech: ["Python"], confirm: "training scripts or an API?" },
    ],
  },
  {
    slug: "threads-app",
    title: "Threads App Clone",
    status: "live",
    links: { github: "https://github.com/zerobbreak/Threads-app", live: "https://threads-app-1ab4.vercel.app/" },
    screenshot: "/projects/threads-app.png",
    location: { lat: 37.77, lon: -122.42, place: "San Francisco", code: "SFO", placeholder: true },
    problem: "Threaded conversations with live updates are hard to model and keep consistent.",
    objective: "Rebuild the core of Threads (posts, nested replies, real-time updates) on a modern full-stack setup.",
    layers: [
      { layer: "interface", label: "App UI", tech: ["Next.js", "TypeScript", "Tailwind CSS"] },
      { layer: "logic", label: "Server", tech: ["Next.js"], confirm: "server actions or API routes?" },
      { layer: "data", label: "Database", tech: ["Prisma", "PostgreSQL"] },
      { layer: "platform", label: "Hosting", tech: ["Vercel"] },
    ],
  },
  {
    slug: "job-market-agent",
    title: "Job Market Agent",
    status: "live",
    links: { github: "https://github.com/zerobbreak/Job-Market-Agent", live: "https://job-market-frontend.vercel.app/" },
    screenshot: "/projects/job-market-agent.png",
    location: { lat: -33.92, lon: 18.42, place: "Cape Town", code: "CPT", placeholder: true },
    problem: "Job hunting means hours of repetitive company research and rewriting your CV for every role.",
    objective: "Automate the research, generate a tailored CV for each role and track every application.",
    layers: [
      { layer: "interface", label: "Frontend", tech: [], confirm: "which framework" },
      { layer: "logic", label: "Agent", tech: ["Python", "Selenium", "python-docx"] },
      { layer: "intelligence", label: "Intelligence", tech: ["OpenAI API"] },
      { layer: "data", label: "Tracker", tech: [], confirm: "where applications are stored" },
      { layer: "platform", label: "Platform", tech: ["Vercel", "PyTest"] },
    ],
  },
  {
    slug: "university-library",
    title: "University Library System",
    status: "live",
    links: { github: "https://github.com/zerobbreak/University-Library", live: "https://university-library-navy.vercel.app/sign-in" },
    screenshot: "/projects/library-system.png",
    location: { lat: 51.51, lon: -0.13, place: "London", code: "LON", placeholder: true },
    problem: "Tracking a library's stock, loans and fines by hand leads to lost books and disputes.",
    objective: "Give admins and students their own panels for inventory, borrowing and fines, on a schema that protects data integrity.",
    layers: [
      { layer: "interface", label: "Admin + user UI", tech: ["React", "Tailwind CSS"] },
      { layer: "logic", label: "API", tech: ["Node.js", "Express"] },
      { layer: "data", label: "Database", tech: ["SQL"], confirm: "which engine" },
      { layer: "platform", label: "Hosting", tech: ["Vercel"] },
    ],
  },
  {
    slug: "ai-analyzer",
    title: "AI Analyzer",
    status: "live",
    links: { github: "https://github.com/zerobbreak/AI-Analyzer", live: "https://ai-resume-analyzer-pi-two.vercel.app/" },
    screenshot: "/projects/ai-analyzer.png",
    location: { lat: 40.71, lon: -74.0, place: "New York", code: "NYC", placeholder: true },
    problem: "Resumes get filtered out by ATS software before a person ever reads them.",
    objective: "Score a resume against a job description, match the skills and suggest specific fixes.",
    layers: [
      { layer: "interface", label: "Interface", tech: ["React", "TypeScript", "Tailwind CSS"] },
      { layer: "intelligence", label: "Scoring", tech: ["OpenAI API"] },
      { layer: "platform", label: "Platform", tech: ["Vite", "Vercel"] },
    ],
  },
];

export const techOf = (p: Project) => p.layers.flatMap((l) => l.tech);
export const projectsUsing = (skill: string) => projects.filter((p) => techOf(p).includes(skill));
export const requestPath = (p: Project) =>
  ["Visitor", ...p.layers.filter((l) => l.layer !== "platform").map((l) => l.label)].join(" → ");

/** Great-circle distance from Midrand to a project's pin, in km. */
export const distanceFromHome = (p: Project) => {
  const R = 6371, D = Math.PI / 180;
  const dLat = (p.location.lat - HOME.lat) * D, dLon = (p.location.lon - HOME.lon) * D;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(HOME.lat * D) * Math.cos(p.location.lat * D) * Math.sin(dLon / 2) ** 2;
  return Math.round(2 * R * Math.asin(Math.sqrt(h)));
};
