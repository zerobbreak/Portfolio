import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { useTilt } from "~/lib/useTilt";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl: string;
  liveUrl?: string;
  index?: number;
}

export default function ProjectCard({
  title,
  description,
  image,
  technologies,
  githubUrl,
  liveUrl,
  index = 0,
}: ProjectCardProps) {
  const tilt = useTilt<HTMLDivElement>(6);
  const isLive = !!liveUrl && liveUrl !== "#";

  return (
    <div
      ref={tilt.ref}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
      className="hud-frame group relative bg-card border border-border hover:border-brand-primary/50 flex flex-col h-full [transform-style:preserve-3d]"
      style={{ transition: "transform 0.15s ease-out, border-color 0.3s" }}
    >
      <div className="aspect-video overflow-hidden relative border-b border-border">
        <div className="absolute inset-0 bg-background/30 group-hover:bg-background/0 transition-colors duration-300 z-10" />
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute top-3 left-3 z-20 px-2 py-1 bg-background/80 backdrop-blur-sm border border-border font-mono text-[10px] tracking-widest text-brand-primary">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span
          className={`absolute top-3 right-3 z-20 flex items-center gap-1.5 px-2 py-1 bg-background/80 backdrop-blur-sm border border-border font-mono text-[10px] tracking-widest uppercase ${isLive ? "text-brand-primary" : "text-muted-foreground"
            }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${isLive ? "bg-brand-primary animate-pulse" : "bg-muted-foreground"
              }`}
          />
          {isLive ? "Live" : "Repo"}
        </span>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-mono text-xl font-bold text-foreground mb-2 group-hover:text-brand-primary transition-colors">
          {title}
        </h3>

        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.map((tech, i) => (
            <span
              key={i}
              className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wide border border-border text-muted-foreground"
            >
              {tech}
            </span>
          ))}
        </div>

        <p className="text-sm text-muted-foreground mb-6 line-clamp-3 leading-relaxed">
          {description}
        </p>

        <div className="mt-auto flex gap-3 font-mono text-xs uppercase tracking-wide">
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 border border-border text-foreground hover:border-brand-primary hover:text-brand-primary transition-colors font-semibold"
          >
            <FaGithub size={14} />
            Code
          </a>

          {isLive && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-brand-primary text-background hover:bg-brand-primary-hover transition-colors font-semibold"
            >
              <FaExternalLinkAlt size={12} />
              Live
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
