import React, { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CobeGlobe from "./ui/cobe-globe";
import { HOME, projects } from "~/data/projects";

gsap.registerPlugin(ScrollTrigger);

interface GlobeProps {
  highlightColor?: string | null;
  /** Project the globe should face while the Projects section is on screen. */
  selected?: number | null;
  onSelect?: (index: number) => void;
}

const D = Math.PI / 180;
/** cobe draws the sphere at 0.8 of the canvas half-width. */
const SPHERE = 0.8;

type V3 = [number, number, number];
// Same lat/lon → xyz convention cobe uses for its markers.
const toVec = (lat: number, lon: number): V3 => {
  const a = lat * D, b = lon * D;
  return [Math.cos(a) * Math.cos(b), Math.sin(a), -Math.cos(a) * Math.sin(b)];
};
const slerp = (a: V3, b: V3, t: number): V3 => {
  const d = Math.min(1, Math.max(-1, a[0] * b[0] + a[1] * b[1] + a[2] * b[2]));
  const om = Math.acos(d), so = Math.sin(om) || 1;
  const s1 = Math.sin((1 - t) * om) / so, s2 = Math.sin(t * om) / so;
  return [a[0] * s1 + b[0] * s2, a[1] * s1 + b[1] * s2, a[2] * s1 + b[2] * s2];
};
const rgba = (hex: string, a: number) => {
  const h = hex.replace("#", "").trim();
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  const n = parseInt(full, 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
};

/**
 * Fixed full-viewport background globe (cobe). Centered in the hero, then
 * drifts left/right as the page scrolls through each section. While the
 * Projects section is on screen it becomes the project map: pins, arcs from
 * Midrand, and a leader line to the open project card.
 */
const Globe: React.FC<GlobeProps> = ({ highlightColor, selected = null, onSelect }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLCanvasElement>(null);
  const [mounted, setMounted] = useState(false);
  const [inProjects, setInProjects] = useState(false);
  const [wide, setWide] = useState(false);
  const pins = useRef<{ x: number; y: number; vis: boolean }[]>([]);
  const pinAlpha = useRef(0);
  const colors = useRef({ fg: "#eaf5ec", primary: "#4dff97", secondary: "#ffb454", card: "#0d100d" });
  const live = useRef({ selected, inProjects, wide });
  live.current = { selected, inProjects, wide };

  useEffect(() => {
    setMounted(true);
    const onResize = () => setWide(window.innerWidth >= 1024);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // theme colors for the 2D overlay
  useEffect(() => {
    const read = () => {
      const s = getComputedStyle(document.documentElement);
      const g = (k: string) => s.getPropertyValue(k).trim();
      colors.current = {
        fg: g("--color-foreground"),
        primary: g("--color-brand-primary"),
        secondary: g("--color-brand-secondary"),
        card: g("--color-card"),
      };
    };
    read();
    const obs = new MutationObserver(read);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!mounted || !containerRef.current) return;

    let timer: ReturnType<typeof setTimeout> | null = null;
    let currentDirection = 0;
    const getShift = () => {
      const container = containerRef.current;
      const globe = container?.querySelector("canvas");
      if (!container || !globe) return 0;

      return Math.max(
        0,
        (container.clientWidth - globe.getBoundingClientRect().width) / 2,
      ) * 0.9;
    };
    const setX = (direction: number) => {
      currentDirection = direction;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        gsap.to(containerRef.current, {
          x: getShift() * direction,
          duration: 0.6,
          ease: "power2.out",
          overwrite: true,
        });
      }, 80);
    };
    const onResize = () => {
      if (timer) clearTimeout(timer);
      gsap.set(containerRef.current, { x: getShift() * currentDirection });
    };

    const make = (id: string, enter: number, back: number) =>
      ScrollTrigger.create({
        trigger: id,
        start: "top center",
        end: "bottom center",
        onEnter: () => setX(enter),
        onEnterBack: () => setX(enter),
        onLeaveBack: () => setX(back),
      });

    const triggers = [
      make("#skills", 1, 1),
      make("#projects", 0, 1),
      make("#experience", 0, 0),
      ScrollTrigger.create({
        trigger: "#projects",
        start: "top center",
        end: "bottom center",
        onToggle: (self) => setInProjects(self.isActive),
      }),
    ];
    currentDirection = 1;
    gsap.set(containerRef.current, { x: getShift() });
    window.addEventListener("resize", onResize);

    return () => {
      if (timer) clearTimeout(timer);
      window.removeEventListener("resize", onResize);
      triggers.forEach((t) => t.kill());
    };
  }, [mounted]);

  /** Pins, arcs and the leader line, projected with cobe's own rotation. */
  const onFrame = useCallback(({ phi, theta }: { phi: number; theta: number }) => {
    const container = containerRef.current, canvas = overlayRef.current;
    const gcanvas = container?.querySelector<HTMLCanvasElement>("canvas[aria-label]");
    if (!container || !canvas || !gcanvas) return;
    const { selected: s, inProjects: on, wide: wd } = live.current;
    pinAlpha.current += ((on ? 1 : 0) - pinAlpha.current) * 0.08;
    const A = pinAlpha.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const cr = container.getBoundingClientRect(), gr = gcanvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const W = cr.width, H = cr.height;
    if (canvas.width !== Math.round(W * dpr) || canvas.height !== Math.round(H * dpr)) {
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);
    if (A < 0.01) {
      pins.current = [];
      return;
    }
    ctx.globalAlpha = A;

    const cx = gr.left - cr.left + gr.width / 2;
    const cy = gr.top - cr.top + gr.height / 2;
    const r = (gr.width / 2) * SPHERE;
    const cp = Math.cos(phi), sp = Math.sin(phi), ct = Math.cos(theta), st = Math.sin(theta);
    const project = (v: V3) => {
      const x1 = v[0] * cp + v[2] * sp;
      const z1 = -v[0] * sp + v[2] * cp;
      const y2 = v[1] * ct - z1 * st;
      const z2 = v[1] * st + z1 * ct;
      return { x: cx + x1 * r, y: cy - y2 * r, z: z2, rx: x1, ry: y2 };
    };
    const C = colors.current;
    const home = toVec(HOME.lat, HOME.lon);
    const label = (txt: string, x: number, y: number, color: string, size: number, weight: number) => {
      ctx.fillStyle = color;
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";
      ctx.font = `${weight} ${size}px "JetBrains Mono", ui-monospace, monospace`;
      ctx.fillText(txt, x, y);
    };

    projects.forEach((p, i) => {
      const b = toVec(p.location.lat, p.location.lon), sel = i === s;
      ctx.strokeStyle = sel ? C.secondary : rgba(C.secondary, 0.3);
      ctx.lineWidth = sel ? 1.8 : 1;
      ctx.beginPath();
      let pen = false;
      for (let k = 0; k <= 48; k++) {
        const t = k / 48, v = slerp(home, b, t), lift = 1 + 0.2 * Math.sin(Math.PI * t);
        const q = project([v[0] * lift, v[1] * lift, v[2] * lift]);
        if (q.z > 0 || q.rx * q.rx + q.ry * q.ry > 1) {
          if (pen) ctx.lineTo(q.x, q.y);
          else ctx.moveTo(q.x, q.y);
          pen = true;
        } else pen = false;
      }
      ctx.stroke();
    });

    const hp = project(home);
    if (hp.z > 0) {
      ctx.fillStyle = C.secondary;
      ctx.beginPath();
      ctx.arc(hp.x, hp.y, 4.5, 0, Math.PI * 2);
      ctx.fill();
      label("MIDRAND · home", hp.x + 9, hp.y + 1, C.secondary, 10, 700);
    }

    const now = performance.now();
    pins.current = projects.map((p, i) => {
      const q = project(toVec(p.location.lat, p.location.lon));
      const vis = q.z > 0.05;
      if (vis) {
        const sel = i === s;
        if (sel) {
          const ph = (now / 1300) % 1;
          ctx.strokeStyle = rgba(C.primary, 1 - ph);
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(q.x, q.y, 7 + ph * 16, 0, Math.PI * 2);
          ctx.stroke();
        }
        ctx.fillStyle = C.primary;
        ctx.strokeStyle = C.card;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(q.x, q.y, sel ? 8 : 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = C.card;
        ctx.font = `700 ${sel ? 9 : 8}px "JetBrains Mono", monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(String(i + 1), q.x, q.y + 0.5);
        if (wd) label(p.title, q.x + 12, q.y - 10, sel ? C.fg : rgba(C.fg, 0.7), 11, sel ? 700 : 500);
      }
      return { x: q.x, y: q.y, vis };
    });

    // leader line from the selected pin to the nearest edge of the project card
    const card = document.querySelector("[data-project-card]");
    if (wd && s !== null && pins.current[s]?.vis && card) {
      const pin = pins.current[s], k = card.getBoundingClientRect();
      const ex = Math.min(Math.max(pin.x, k.left - cr.left + 24), k.right - cr.left - 24);
      const ey = Math.min(Math.max(pin.y, k.top - cr.top), k.bottom - cr.top);
      if (Math.hypot(ex - pin.x, ey - pin.y) > 16) {
        ctx.strokeStyle = C.primary;
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 4]);
        ctx.beginPath();
        ctx.moveTo(pin.x, pin.y + (ey > pin.y ? 10 : -10));
        ctx.lineTo(ex, ey);
        ctx.stroke();
        ctx.setLineDash([]);
      }
    }
    ctx.globalAlpha = 1;
  }, []);

  // the globe grows while it hosts the project card
  const globeWrapRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!globeWrapRef.current) return;
    gsap.to(globeWrapRef.current, { scale: inProjects ? 1.35 : 1, duration: 0.9, ease: "power3.inOut", overwrite: true });
  }, [inProjects]);

  // click (not drag) on the globe picks the nearest visible pin
  const down = useRef<{ x: number; y: number } | null>(null);
  const onPointerUp = (e: React.PointerEvent) => {
    const d = down.current;
    down.current = null;
    if (!d || Math.hypot(e.clientX - d.x, e.clientY - d.y) > 5 || !containerRef.current) return;
    const cr = containerRef.current.getBoundingClientRect();
    const x = e.clientX - cr.left, y = e.clientY - cr.top;
    let best = -1, bd = 24;
    pins.current.forEach((p, i) => {
      if (!p.vis) return;
      const dd = Math.hypot(p.x - x, p.y - y);
      if (dd < bd) {
        bd = dd;
        best = i;
      }
    });
    if (best >= 0) onSelect?.(best);
  };

  if (!mounted) return null;

  const isMobile = window.innerWidth < 768;
  const interactive = inProjects && wide;
  const target = inProjects && selected !== null ? projects[selected].location : null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-x-0 top-24 bottom-0 pointer-events-none flex items-center justify-center z-0 overflow-hidden will-change-transform"
      style={{ opacity: isMobile ? 0.7 : 1 }}
      aria-hidden="true"
    >
      <div
        ref={globeWrapRef}
        className={interactive ? "pointer-events-auto" : undefined}
        onPointerDown={(e) => (down.current = { x: e.clientX, y: e.clientY })}
        onPointerUp={onPointerUp}
      >
        <CobeGlobe
          accent={highlightColor}
          focus={target ? [target.lat, target.lon] : null}
          focusLift={0.7}
          onFrame={onFrame}
          className="w-[min(92vw,78vh)] max-w-none"
        />
      </div>
      <canvas ref={overlayRef} className="absolute inset-0 w-full h-full pointer-events-none" />
    </div>
  );
};

export default Globe;
