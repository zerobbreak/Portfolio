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
  {
    slug: "tutoring-system",
    title: "Emeris Tutoring Platform",
    status: "repo",
    links: { github: "https://github.com/zerobbreak/Tutoring-System" },
    screenshot: "/projects/tutoring-system.png",
    location: { lat: 52.52, lon: 13.4, place: "Berlin", code: "BER", placeholder: true },
    problem: "University tutoring runs on spreadsheets: session claims, lecturer sign-off, attendance and payroll all drift out of sync.",
    objective: "One platform for admins, lecturers, tutors and students covering schedules, claim approval, QR check-in and payroll export, with tenancy enforced in the database.",
    layers: [
      { layer: "interface", label: "Dashboards", tech: ["React", "TypeScript", "Tailwind CSS"] },
      { layer: "logic", label: "Server actions", tech: ["TanStack Start"] },
      { layer: "data", label: "Postgres + RLS", tech: ["Supabase", "PostgreSQL"] },
      { layer: "platform", label: "Build", tech: ["Vite"] },
    ],
  },
  {
    slug: "smartx",
    title: "SmartX IoT Mesh",
    status: "repo",
    links: { github: "https://github.com/EMGPMD/prog7312-2026-poe-part-3-st10377293-unathi-tshuma" },
    screenshot: "/projects/smartx.png",
    location: { lat: 22.54, lon: 114.06, place: "Shenzhen", code: "SZX", placeholder: true },
    problem: "IoT sensor fleets flood operators with telemetry, bury critical alerts in the noise and lose data when a mesh node drops.",
    objective: "Ingest telemetry from simulated ESP32 sensors, let critical alerts skip the queue, and route data through a self-healing mesh using a minimum spanning tree.",
    layers: [
      { layer: "interface", label: "Operator console", tech: ["Blazor", "C#"] },
      { layer: "logic", label: "Gateway API", tech: ["ASP.NET Core", "C#"] },
      { layer: "data", label: "Telemetry store", tech: ["EF Core", "SQLite"] },
      { layer: "platform", label: "Platform", tech: ["Docker", "xUnit"] },
    ],
  },
  {
    slug: "integrityq",
    title: "IntegrityQ",
    status: "repo",
    links: { github: "https://github.com/radebeinnovations/Emeris-Plagiarism-Platform" },
    screenshot: "/projects/integrityq.png",
    location: { lat: 37.57, lon: 126.98, place: "Seoul", code: "SEL", placeholder: true },
    problem: "Academic integrity cases are handled inconsistently, with evidence scattered and penalties applied by hand.",
    objective: "Take a submission from upload through text extraction, citation checks, evidence review, a tiered penalty engine and resubmission, with humans making every decision.",
    layers: [
      { layer: "interface", label: "Role portals", tech: ["React", "TypeScript", "Tailwind CSS"] },
      { layer: "logic", label: "App server", tech: ["TanStack Start"] },
      { layer: "data", label: "Backend", tech: ["Convex"] },
      { layer: "platform", label: "Auth", tech: ["Clerk", "Vite"] },
    ],
  },
  {
    slug: "ghost-ai",
    title: "Ghost AI",
    status: "repo",
    links: { github: "https://github.com/zerobbreak/ghost_ai" },
    screenshot: "/projects/ghost-ai.png",
    location: { lat: 43.65, lon: -79.38, place: "Toronto", code: "YYZ", placeholder: true },
    problem: "System design happens in scattered whiteboards and docs that never turn into a usable spec.",
    objective: "A real-time collaborative canvas where an AI design agent helps sketch architecture and generates specs from it.",
    layers: [
      { layer: "interface", label: "Canvas", tech: ["Next.js", "React Flow", "Tailwind CSS"] },
      { layer: "logic", label: "Realtime", tech: ["Liveblocks"] },
      { layer: "intelligence", label: "Design agent", tech: ["Gemini API"] },
      { layer: "data", label: "Database", tech: ["Prisma", "PostgreSQL"] },
      { layer: "platform", label: "Platform", tech: ["Clerk", "Vercel"] },
    ],
  },
  {
    slug: "devpulse",
    title: "DevPulse",
    status: "repo",
    links: { github: "https://github.com/zerobbreak/devpulse" },
    screenshot: "/projects/devpulse.png",
    location: { lat: 6.52, lon: 3.38, place: "Lagos", code: "LOS", placeholder: true },
    problem: "With dozens of side projects, it's hard to tell which repos are stale, drifting from their goal or worth picking back up.",
    objective: "Sync your GitHub repos, score their health, check them against each project's vision and suggest what to work on next.",
    layers: [
      { layer: "interface", label: "Dashboard", tech: ["React", "TypeScript", "Tailwind CSS"] },
      { layer: "logic", label: "App server", tech: ["TanStack Start"] },
      { layer: "intelligence", label: "Analysis", tech: ["Gemini API"] },
      { layer: "data", label: "Backend + jobs", tech: ["Convex"] },
      { layer: "platform", label: "Auth", tech: ["Clerk", "Vite"] },
    ],
  },
  {
    slug: "crisis-connect",
    title: "Crisis Connect",
    status: "repo",
    links: { github: "https://github.com/zerobbreak/Crisis-Connect" },
    screenshot: "/projects/crisis-connect.png",
    location: { lat: -29.86, lon: 31.02, place: "Durban", code: "DUR", placeholder: true },
    problem: "Communities get little warning before floods and severe weather, so responders react instead of preparing.",
    objective: "Score live weather data for disaster risk with a trained model and surface alerts and risk maps on a dashboard.",
    layers: [
      { layer: "interface", label: "Dashboard", tech: ["Next.js", "TypeScript", "Tailwind CSS"] },
      { layer: "logic", label: "API", tech: ["Python", "FastAPI"] },
      { layer: "intelligence", label: "Risk model", tech: ["scikit-learn"] },
    ],
  },
  {
    slug: "plagiarism-detector",
    title: "Plagiarism Detector",
    status: "repo",
    links: { github: "https://github.com/zerobbreak/Plagiarism-CLI" },
    screenshot: "/projects/plagiarism-detector.png",
    location: { lat: -33.87, lon: 151.21, place: "Sydney", code: "SYD", placeholder: true },
    problem: "A single similarity score misses paraphrasing and gives reviewers nothing to explain a result with.",
    objective: "Score documents three ways (exact shingles, TF-IDF and semantic embeddings) with background workers and exportable PDF reports.",
    layers: [
      { layer: "logic", label: "API + workers", tech: ["Python", "Django", "Celery"] },
      { layer: "intelligence", label: "Similarity", tech: ["scikit-learn", "Sentence Transformers"] },
      { layer: "data", label: "Storage", tech: ["PostgreSQL", "Redis"] },
      { layer: "platform", label: "Tests", tech: ["PyTest"], confirm: "test runner" },
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
