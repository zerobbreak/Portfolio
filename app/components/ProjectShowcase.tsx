import BoardingPass from "./BoardingPass";
import { projects } from "~/data/projects";
import { cn } from "~/lib/utils";

interface ProjectShowcaseProps {
  /** Null until a location is picked; the pass only renders once one is. */
  selected: number | null;
  onSelect: (index: number | null) => void;
}

/**
 * What sits on the globe in the Projects section: a hint until a pin is
 * picked, then that project's boarding pass.
 */
export default function ProjectShowcase({ selected, onSelect }: ProjectShowcaseProps) {
  const p = selected !== null ? projects[selected] : null;

  return (
    <div className="mx-auto max-w-[600px] flex flex-col gap-4">
      {!p && (
        <p className="hidden lg:flex self-center items-center gap-2 font-mono text-[11px] tracking-[0.18em] uppercase text-muted-foreground px-3 py-1.5 border border-border rounded-full bg-background/60 backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse" />
          Click a location on the globe
        </p>
      )}

      {/* pins aren't clickable below lg, so the list stands in for them there */}
      <div className="pointer-events-auto flex lg:hidden flex-wrap justify-center gap-2" role="group" aria-label="Projects">
        {projects.map((proj, i) => (
          <button
            key={proj.slug}
            type="button"
            onClick={() => onSelect(i)}
            aria-pressed={selected === i}
            className={cn(
              "font-mono text-[11px] px-2.5 py-1 border rounded-md transition-colors bg-background/70 backdrop-blur-sm",
              selected === i ? "border-brand-primary text-brand-primary" : "border-border text-muted-foreground hover:text-foreground",
            )}
          >
            {proj.location.code} · {proj.title}
          </button>
        ))}
      </div>

      {p && (
        <div key={p.slug} className="pointer-events-auto bp-in">
          {/* keyed so a new pin prints a fresh pass with its stub intact */}
          <BoardingPass project={p} index={selected!} onClose={() => onSelect(null)} />
        </div>
      )}
    </div>
  );
}
