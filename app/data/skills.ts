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
  { name: "Node.js", layer: "logic", color: "#16a34a" },
  { name: "Express", layer: "logic", color: "#9ca3af" },
  { name: "Python", layer: "logic", color: "#38bdf8" },
  { name: "Selenium", layer: "logic", color: "#43b02a" },
  { name: "python-docx", layer: "logic", color: "#2b579a" },
  { name: "OpenAI API", layer: "intelligence", color: "#10a37f" },
  { name: "TensorFlow.js", layer: "intelligence", color: "#ff8f00" },
  { name: "MongoDB", layer: "data", color: "#22c55e" },
  { name: "PostgreSQL", layer: "data", color: "#4169e1" },
  { name: "Prisma", layer: "data", color: "#5a67d8" },
  { name: "SQL", layer: "data", color: "#e38c00" },
  { name: "Git", layer: "platform", color: "#ef4444" },
  { name: "Vite", layer: "platform", color: "#a855f7" },
  { name: "Vercel", layer: "platform", color: "#9ca3af" },
  { name: "PyTest", layer: "platform", color: "#0a9edc" },
];
