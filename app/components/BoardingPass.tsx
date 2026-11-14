import { useMemo, useRef, useState } from "react";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import { HOME, type Project, distanceFromHome, requestPath, techOf } from "~/data/projects";
import { cn } from "~/lib/utils";

/** Stable pseudo-random bars so every project gets its own barcode. */
const barcodeBars = (seed: string) => {
  const out: { w: number; gap: number }[] = [];
  for (let k = 0; k < 3; k++) {
    let h = 2166136261;
    for (const c of seed + k) {
      h ^= c.charCodeAt(0);
      h = Math.imul(h, 16777619);
    }
    for (const c of (h >>> 0).toString(16).padStart(8, "0")) {
      const v = parseInt(c, 16);
      out.push({ w: 1 + (v % 3), gap: v % 2 });
    }
  }
  return out;
};

const Plane = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M21 15.5v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V8.5l-8 5v2l8-2.5V18l-2 1.5V21l3.5-1 3.5 1v-1.5L13 18v-5z" />
  </svg>
);

/** How far the stub must be pulled before it rips off. */
const TEAR_AT = 60;

interface BoardingPassProps {
  project: Project;
  index: number;
  onClose: () => void;
}

/**
 * A boarding pass from Midrand to the project's pin. Tearing the stub (drag
 * it past the perforation, or click it) opens a three-stop itinerary:
 * Problem → Objective → Architecture.
 */
export default function BoardingPass({ project: p, index, onClose }: BoardingPassProps) {
  const [torn, setTorn] = useState(false);
  const stubRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; y: number; d: number } | null>(null);
  const bars = useMemo(() => barcodeBars(p.slug), [p.slug]);
  const flight = `PRJ-${String(index + 1).padStart(2, "0")}`;
  const live = p.status === "live";
  const narrow = () => window.matchMedia("(max-width: 559px)").matches;

  const tear = () => {
    if (stubRef.current) stubRef.current.style.transform = "";
    setTorn(true);
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (torn) return;
    drag.current = { x: e.clientX, y: e.clientY, d: 0 };
    e.currentTarget.setPointerCapture(e.pointerId);
    e.currentTarget.classList.add("bp-dragging");
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const s = drag.current;
    if (!s) return;
    const n = narrow();
    const d = Math.max(0, n ? e.clientY - s.y : e.clientX - s.x);
    s.d = d;
    const ang = Math.min(d / 4, 26);
    e.currentTarget.style.transform = n
      ? `translateY(${d * 0.4}px) rotate(${ang / 4}deg)`
      : `translateX(${d * 0.35}px) rotate(${ang}deg)`;
  };
  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const s = drag.current;
    drag.current = null;
    e.currentTarget.classList.remove("bp-dragging");
    if (!s) return;
    // a plain click tears too; a half-hearted pull springs back
    if (s.d > TEAR_AT || s.d < 4) tear();
    else e.currentTarget.style.transform = "";
  };

  const legs = [
    { stop: "Departs", label: "Problem", body: <p>{p.problem}</p> },
    { stop: "Via", label: "Objective", body: <p>{p.objective}</p> },
    {
      stop: "Arrives",
      label: "Architecture",
      body: (
        <>
          <p>{requestPath(p)}</p>
          <ul className="bp-layers">
            {p.layers.map((l) => (
              <li key={l.label}>
                <i style={{ background: `var(--color-layer-${l.layer})` }} />
                <b>{l.label}</b>
                <span>
                  {l.tech.join(", ")}
                  {l.confirm && <em> ? {l.confirm}</em>}
                </span>
              </li>
            ))}
          </ul>
        </>
      ),
    },
  ];

  return (
    <div
      data-project-card
      className={cn("bp", torn && "bp-torn")}
      onKeyDown={(e) => e.key === "Escape" && onClose()}
    >
      <div className="bp-main">
        <div className="bp-top">
          <span>
            Project pass · <b>{flight}</b>
          </span>
          <span className="flex items-center gap-2">
            <span className={cn("bp-status", !live && "bp-repo")}>
              <i />
              {live ? "Live" : "Repo"}
            </span>
            <button type="button" onClick={onClose} className="bp-close" aria-label="Close pass">
              ✕
            </button>
          </span>
        </div>

        <div className="bp-route">
          <div className="bp-iata">
            {HOME.code}
            <small>{HOME.place}</small>
          </div>
          <div className="bp-path">
            <Plane />
          </div>
          <div className="bp-iata bp-to">
            {p.location.code}
            <small>{p.location.place}</small>
          </div>
        </div>
        <div className="bp-km">
          {distanceFromHome(p).toLocaleString("en-ZA")} km
          {p.location.placeholder && " · placeholder pin"}
        </div>

        <p className="bp-name">
          Passenger <b>{p.title}</b>
        </p>
        <div className="bp-fields">
          <div>
            <span>Class</span>
            <b>{live ? "Live" : "Repo"}</b>
          </div>
          <div>
            <span>Gate</span>
            <b>{p.layers.length} layers</b>
          </div>
          <div>
            <span>Seat</span>
            <b>{techOf(p).length} parts</b>
          </div>
          <div>
            <span>Boards</span>
            <b>Problem</b>
          </div>
        </div>
      </div>

      <div
        ref={stubRef}
        className="bp-stub"
        role="button"
        tabIndex={torn ? -1 : 0}
        aria-label="Tear off the stub to open the itinerary"
        aria-expanded={torn}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={(e) => {
          drag.current = null;
          e.currentTarget.classList.remove("bp-dragging");
          e.currentTarget.style.transform = "";
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            tear();
          }
        }}
      >
        <div className="bp-stub-to">
          <span>To</span>
          <b>{p.location.code}</b>
          <span>{flight}</span>
        </div>
        <div className="bp-barcode" aria-hidden="true">
          {bars.map((b, k) => (
            <i key={k} style={{ width: b.w, marginRight: b.gap }} />
          ))}
        </div>
        <div className="bp-cta">Tear to open →</div>
      </div>

      <div className="bp-itin" inert={!torn}>
        <div>
          <div className="bp-itin-hd">
            <span>Itinerary</span>
            <span>
              {HOME.code} → {p.location.code}
            </span>
          </div>
          {legs.map((leg) => (
            <div key={leg.label} className="bp-leg">
              <span className="bp-leg-t">
                <b>{leg.stop}</b>
                {leg.label}
              </span>
              <span className="bp-leg-d" />
              <div className="min-w-0">{leg.body}</div>
            </div>
          ))}
          <div className="bp-itin-ft">
            <div className="flex gap-2 flex-wrap">
              <a href={p.links.github} target="_blank" rel="noopener noreferrer">
                <FaGithub size={12} /> Code
              </a>
              {p.links.live && (
                <a href={p.links.live} target="_blank" rel="noopener noreferrer" className="bp-go">
                  <FaExternalLinkAlt size={10} /> Live
                </a>
              )}
            </div>
            <button type="button" onClick={() => setTorn(false)}>
              ↺ Reprint pass
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
