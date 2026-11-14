import React, { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { roles, type Role } from "~/data/experience";
import {
  type Branch,
  type Graph,
  commitHash,
  currentMonth,
  formatDuration,
  formatMonth,
  formatRange,
  layoutGraph,
  monthIndex,
  rowGeometry,
} from "~/lib/commitGraph";
import { cn } from "~/lib/utils";

gsap.registerPlugin(ScrollTrigger);

/** Row height in px; must match the `h-16` on each commit row. */
const ROW_H = 64;
const LANE_GAP = 20;
const PAD = 16;
const laneX = (l: number) => PAD + l * LANE_GAP;

/** Selected branch in signal green, finished ones in amber, ongoing ones muted. */
const strokeOf = (b: Branch, selected: string) =>
  b.role.branch === selected
    ? "var(--color-brand-primary)"
    : b.open
      ? "var(--color-muted-foreground)"
      : "var(--color-brand-secondary)";

/** Splits "text –highlight– text" into alternating plain/highlighted parts. */
const Highlighted = ({ text }: { text: string }) => (
  <>
    {text.split("–").map((part, i) =>
      i % 2 === 1 ? (
        <strong key={i} className="font-bold text-foreground">
          {part}
        </strong>
      ) : (
        <span key={i}>{part}</span>
      ),
    )}
  </>
);

const commitMessage = (kind: Graph["rows"][number]["kind"], r: Role) => {
  if (kind === "init") return r.startMsg;
  if (kind === "merge") return `Merge branch '${r.branch}': ${r.endMsg ?? "done"}`;
  return `checkout -b ${r.branch}: ${r.startMsg}`;
};

function CommitDetail({ role, hash, now, className }: { role: Role; hash: string; now: number; className?: string }) {
  return (
    <article className={cn("animate-fade-in flex flex-col gap-5", className)}>
      <div className="font-mono text-[11px] leading-[1.8] text-muted-foreground">
        commit <span className="font-bold text-brand-secondary">{hash}</span> (
        <span className="text-brand-primary">{role.branch}</span>)
        <br />
        Date:&nbsp;&nbsp; {formatRange(role)} · {formatDuration(role, now)}
      </div>

      <div>
        <h3 className="font-mono text-[18px] font-bold leading-tight text-foreground text-balance">{role.role}</h3>
        <p className="mt-1 text-[14px] font-semibold tracking-wide text-brand-primary">{role.company}</p>
      </div>

      <div className="border-[0.5px] border-border">
        <div className="flex justify-between border-b-[0.5px] border-border px-3 py-2 font-mono text-[11px] text-muted-foreground">
          <span>impact.md</span>
          <span className="text-brand-primary">
            +{role.description.length} −0
          </span>
        </div>
        <ul>
          {role.description.map((d, i) => (
            <li
              key={i}
              className="grid grid-cols-[22px_minmax(0,1fr)] bg-brand-primary/[0.06] py-2 pr-3 pl-1.5 text-left text-[13px] leading-[1.6] text-muted-foreground [&+li]:border-t-[0.5px] [&+li]:border-border/60"
            >
              <span aria-hidden="true" className="text-center font-mono font-bold text-brand-primary">
                +
              </span>
              <span>
                <Highlighted text={d} />
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <p className="mb-2.5 font-mono text-[11px] text-muted-foreground">{role.tech.length} files changed</p>
        <div className="flex flex-wrap gap-2">
          {role.tech.map((t) => (
            <span
              key={t}
              className="border-[0.5px] border-border px-3 py-1.5 font-mono text-[11px] font-medium text-muted-foreground transition-colors duration-300 hover:border-brand-primary hover:bg-brand-primary hover:text-background"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

function Gutter({ graph, row, selected, width }: { graph: Graph; row: number; selected: string; width: number }) {
  const { segments, dots, through } = rowGeometry(graph, row, ROW_H, laneX);
  const isSel = (b: Branch) => b.role.branch === selected;
  return (
    <div className="commit-gutter relative shrink-0 self-stretch" style={{ width }} aria-hidden="true">
      <svg width={width} height={ROW_H} className="block overflow-visible">
        {segments.map((s, i) => (
          <path
            key={i}
            d={s.d}
            fill="none"
            stroke={strokeOf(s.branch, selected)}
            strokeWidth={isSel(s.branch) ? 3 : 2}
            strokeLinecap="round"
            opacity={isSel(s.branch) ? 1 : 0.55}
            className="transition-[stroke,opacity] duration-300"
          />
        ))}
        {dots.map((d, i) => (
          <circle
            key={i}
            cx={d.x}
            cy={d.y}
            r={d.hollow ? 4.5 : 5.5}
            fill={d.hollow ? "var(--color-card)" : strokeOf(d.branch, selected)}
            stroke={strokeOf(d.branch, selected)}
            strokeWidth={2.5}
            opacity={isSel(d.branch) ? 1 : 0.7}
            className="transition-[stroke,fill,opacity] duration-300"
          />
        ))}
      </svg>
      {/* lanes carry on past the row when it's taller than ROW_H (mobile detail) */}
      {through.map((b) => (
        <span
          key={b.role.branch}
          className="absolute bottom-0 transition-[background-color,opacity] duration-300"
          style={{
            top: ROW_H,
            left: laneX(b.lane) - (isSel(b) ? 1.5 : 1),
            width: isSel(b) ? 3 : 2,
            background: strokeOf(b, selected),
            opacity: isSel(b) ? 1 : 0.55,
          }}
        />
      ))}
    </div>
  );
}

const WorkExperience: React.FC = () => {
  const graph = useMemo(() => layoutGraph(roles), []);
  const now = useMemo(() => currentMonth(), []);
  const [selected, setSelected] = useState(roles[0].branch);
  const listRef = useRef<HTMLOListElement>(null);

  const gutterWidth = laneX(graph.laneCount - 1) + PAD;
  const selectedRole = graph.byBranch.get(selected)!.role;
  // On phones the detail opens under the newest row of the selected role.
  const anchorRow = (() => {
    const b = graph.byBranch.get(selected)!;
    return b.open ? b.startRow : b.endRow;
  })();
  const anchorHash = commitHash(graph.rows[anchorRow].kind + selected);
  const openBranches = graph.branches.filter((b) => b.open);

  // History draws itself in from the initial commit upwards as you scroll.
  useEffect(() => {
    const list = listRef.current;
    if (!list || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      const gutters = gsap.utils.toArray<HTMLElement>(".commit-gutter", list).reverse();
      gsap
        .timeline({
          scrollTrigger: { trigger: list, start: "top 85%", end: "bottom 85%", scrub: 0.6 },
        })
        .fromTo(
          gutters,
          { clipPath: "inset(100% 0 0 0)" },
          { clipPath: "inset(0% 0 0 0)", ease: "none", stagger: 1, duration: 1 },
        );
    }, list);
    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" className="container mx-auto px-6 py-20 relative overflow-hidden">
      <div className="mb-14">
        <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-brand-primary mb-3 block">
          / 03 — Career
        </span>
        <h2 className="font-mono text-[26px] font-bold text-foreground mb-3">Work Experience</h2>
        <p className="text-[14px] text-muted-foreground max-w-2xl leading-relaxed">
          My career as a commit history. Roles that overlapped run as parallel branches; finished ones merge back in.
          Pick a commit to see what I shipped there.
        </p>
      </div>

      <div className="grid items-start gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <div className="hud-frame bg-card/60 border-[0.5px] border-border py-2">
          <div className="flex items-center justify-between border-b-[0.5px] border-border px-4 pb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            <span>git log --graph --all</span>
            <span>{graph.rows.length - 1} commits</span>
          </div>
          <ol ref={listRef} aria-label="Career history, newest first">
            {graph.rows.map((row, i) => {
              if (row.kind === "head") {
                return (
                  <li key="head" className="flex">
                    <Gutter graph={graph} row={i} selected={selected} width={gutterWidth} />
                    <div className="flex h-16 min-w-0 flex-col justify-center gap-1 pr-4">
                      <div className="flex flex-wrap items-center gap-1.5 font-mono text-[12px]">
                        <span className="border border-brand-primary px-1.5 py-px text-[10px] font-bold text-brand-primary">
                          HEAD
                        </span>
                        <span className="text-muted-foreground">→</span>
                        <span className="truncate">{openBranches.map((b) => b.role.branch).join(", ")}</span>
                      </div>
                      <div className="font-mono text-[10px] tracking-wider text-muted-foreground">
                        {formatMonth(now)} · {openBranches.length} branches active
                      </div>
                    </div>
                  </li>
                );
              }
              const r = row.role!;
              const active = r.branch === selected;
              const date = monthIndex(row.kind === "merge" ? r.end! : r.start);
              return (
                <li key={`${row.kind}-${r.branch}`} className="flex">
                  <Gutter graph={graph} row={i} selected={selected} width={gutterWidth} />
                  <div className="min-w-0 flex-1">
                    <button
                      type="button"
                      onClick={() => setSelected(r.branch)}
                      aria-pressed={active}
                      aria-label={`${r.role}, ${r.company}, ${formatRange(r)}`}
                      className={cn(
                        "flex h-16 w-full flex-col justify-center gap-1 border-l-2 border-transparent pr-4 pl-3 text-left transition-colors duration-200 hover:bg-muted/60 focus-visible:outline-2 focus-visible:outline-brand-primary",
                        active && "border-brand-primary bg-muted/60",
                      )}
                    >
                      <span
                        className={cn(
                          "line-clamp-2 font-mono text-[12px] leading-snug md:truncate",
                          active ? "text-foreground" : "text-foreground/80",
                        )}
                      >
                        {commitMessage(row.kind, r)}
                      </span>
                      <span className="flex gap-2 font-mono text-[10px] tracking-wider text-muted-foreground">
                        <span className="text-brand-secondary">{commitHash(row.kind + r.branch)}</span>
                        <span>{formatMonth(date, r.precision)}</span>
                        <span className={active ? "text-brand-primary" : undefined}>{r.branch}</span>
                      </span>
                    </button>
                    {active && i === anchorRow && (
                      <CommitDetail role={r} hash={anchorHash} now={now} className="py-4 pr-4 pl-3 md:hidden" />
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="hud-frame sticky top-24 hidden bg-card/60 border-[0.5px] border-border p-6 md:block" aria-live="polite">
          <CommitDetail key={selectedRole.branch} role={selectedRole} hash={anchorHash} now={now} />
        </div>
      </div>
    </section>
  );
};

export default WorkExperience;
