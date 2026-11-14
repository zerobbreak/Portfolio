import type { Layer } from "./projects";

export interface Skill {
  name: string;
  layer: Layer;
  color: string;
}

export const skills: Skill[] = [
  { name: "HTML5", layer: "interface", color: "#f97316" },
  { name: "CSS3", layer: "interface", color: "#60a5fa" },
  { name: "JavaScript", layer: "interface", color: "#facc15" },
  { name: "TypeScript", layer: "interface", color: "#3b82f6" },
  { name: "React", layer: "interface", color: "#22d3ee" },
  { name: "Next.js", layer: "interface", color: "#9ca3af" },
  { name: "Tailwind CSS", layer: "interface", color: "#38bdf8" },
  { name: "Framer Motion", layer: "interface", color: "#e11d8f" },
  { name: "React Flow", layer: "interface", color: "#ff0072" },
  { name: "Blazor", layer: "interface", color: "#512bd4" },
  { name: "C#", layer: "logic", color: "#9b4f96" },
  { name: "ASP.NET Core", layer: "logic", color: "#512bd4" },
  { name: "TanStack Start", layer: "logic", color: "#f59e0b" },
  { name: "Node.js", layer: "logic", color: "#16a34a" },
  { name: "Express", layer: "logic", color: "#9ca3af" },
  { name: "Python", layer: "logic", color: "#38bdf8" },
  { name: "Selenium", layer: "logic", color: "#43b02a" },
  { name: "python-docx", layer: "logic", color: "#2b579a" },
  { name: "FastAPI", layer: "logic", color: "#059669" },
  { name: "Django", layer: "logic", color: "#0c4b33" },
  { name: "Celery", layer: "logic", color: "#a3e635" },
  { name: "Liveblocks", layer: "logic", color: "#e5e7eb" },
  { name: "OpenAI API", layer: "intelligence", color: "#10a37f" },
  { name: "Gemini API", layer: "intelligence", color: "#8b5cf6" },
  { name: "TensorFlow.js", layer: "intelligence", color: "#ff8f00" },
  { name: "scikit-learn", layer: "intelligence", color: "#f7931e" },
  { name: "Sentence Transformers", layer: "intelligence", color: "#fbbf24" },
  { name: "MongoDB", layer: "data", color: "#22c55e" },
  { name: "Supabase", layer: "data", color: "#3ecf8e" },
  { name: "Convex", layer: "data", color: "#ee342f" },
  { name: "Redis", layer: "data", color: "#dc2626" },
  { name: "EF Core", layer: "data", color: "#68217a" },
  { name: "SQLite", layer: "data", color: "#0f80cc" },
  { name: "PostgreSQL", layer: "data", color: "#4169e1" },
  { name: "Prisma", layer: "data", color: "#5a67d8" },
  { name: "SQL", layer: "data", color: "#e38c00" },
  { name: "Git", layer: "platform", color: "#ef4444" },
  { name: "Vite", layer: "platform", color: "#a855f7" },
  { name: "Vercel", layer: "platform", color: "#9ca3af" },
  { name: "PyTest", layer: "platform", color: "#0a9edc" },
  { name: "Clerk", layer: "platform", color: "#6c47ff" },
  { name: "Docker", layer: "platform", color: "#2496ed" },
  { name: "xUnit", layer: "platform", color: "#5c2d91" },
];
