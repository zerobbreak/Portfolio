import { useEffect, useRef, useState } from "react";
import createGlobe, { type Marker } from "cobe";
import { cn } from "~/lib/utils";

export const DEFAULT_MARKERS: Marker[] = [
  { location: [37.78, -122.44], size: 0.06 }, // San Francisco
  { location: [40.71, -74.01], size: 0.06 }, // New York
  { location: [35.68, 139.65], size: 0.06 }, // Tokyo
  { location: [51.51, -0.13], size: 0.06 }, // London
  { location: [-33.87, 151.21], size: 0.06 }, // Sydney
  { location: [-33.92, 18.42], size: 0.08 }, // Cape Town
  { location: [25.2, 55.27], size: 0.06 }, // Dubai
  { location: [-23.55, -46.63], size: 0.06 }, // São Paulo
];

interface CobeGlobeProps {
  className?: string;
  markers?: Marker[];
  /** Auto-rotation speed in radians per frame. */
  speed?: number;
  /** Optional CSS hex color that overrides the glow (e.g. skill hover). */
  accent?: string | null;
  /** [lat, lon] to turn toward and hold. Null = free auto-spin. */
  focus?: [number, number] | null;
  /** Resting tilt when not focused. */
  baseTheta?: number;
  /** Radians to tilt past a focused point, so it sits above center. */
  focusLift?: number;
  /** Called every frame with the rotation cobe actually rendered. */
  onFrame?: (f: { phi: number; theta: number }) => void;
}

/** cobe's own convention for facing a lat/lon (from the cobe docs). */
export const locationToAngles = (lat: number, lon: number): [number, number] => [
  Math.PI - ((lon * Math.PI) / 180 - Math.PI / 2),
  (lat * Math.PI) / 180,
];

const wrapAngle = (a: number) => Math.atan2(Math.sin(a), Math.cos(a));

const hex = (h: string): [number, number, number] => [
  parseInt(h.slice(1, 3), 16) / 255,
  parseInt(h.slice(3, 5), 16) / 255,
  parseInt(h.slice(5, 7), 16) / 255,
];

/**
 * Interactive WebGL globe built on cobe: drag to rotate, auto-spins when
 * idle, and follows the site's light/dark theme (signal green + amber).
 */
export function CobeGlobe({
  className,
  markers = DEFAULT_MARKERS,
  speed = 0.004,
  accent = null,
  focus = null,
  baseTheta = 0.25,
  focusLift = 0,
  onFrame,
}: CobeGlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const accentRef = useRef<string | null>(accent);
  accentRef.current = accent;
  const focusRef = useRef<[number, number] | null>(null);
  focusRef.current = focus
    ? ((a) => [a[0], a[1] - focusLift] as [number, number])(locationToAngles(focus[0], focus[1]))
    : null;
  const baseThetaRef = useRef(baseTheta);
  baseThetaRef.current = baseTheta;
  const onFrameRef = useRef(onFrame);
  onFrameRef.current = onFrame;
  const [dark, setDark] = useState(true);

  // Track the .dark class on <html>
  useEffect(() => {
    const el = document.documentElement;
    const sync = () => setDark(el.classList.contains("dark"));
    sync();
    const obs = new MutationObserver(sync);
    obs.observe(el, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let phi = 0;
    let theta = baseThetaRef.current;
    let width = 0;
    let dragging = false;
    let lastX = 0;
    let velocity = 0;
    const pixelRatio = Math.min(window.devicePixelRatio, 2);

    const measure = () => {
      width = canvas.offsetWidth * pixelRatio;
    };
    measure();
    window.addEventListener("resize", measure);

    const globe = createGlobe(canvas, {
      devicePixelRatio: pixelRatio,
      width,
      height: width,
      phi: 0,
      theta: 0.25,
      dark: dark ? 1 : 0,
      diffuse: dark ? 1.2 : 1.6,
      mapSamples: 16000,
      mapBrightness: dark ? 6 : 2.2,
      baseColor: dark ? hex("#0d1a12") : hex("#f8f7ee"),
      markerColor: dark ? hex("#ffb454") : hex("#a85a06"),
      glowColor: dark ? hex("#4dff97") : hex("#0f8a4c"),
      markers,
      onRender: (state) => {
        const target = focusRef.current;
        const k = reduceMotion ? 1 : 0.08;
        if (!dragging) {
          if (target) {
            phi += wrapAngle(target[0] - (phi + velocity)) * k;
            theta += (target[1] - theta) * k;
            velocity *= 0.8;
          } else {
            phi += reduceMotion ? 0 : speed;
            theta += (baseThetaRef.current - theta) * k;
            velocity *= 0.95;
          }
        }
        state.phi = phi + velocity;
        state.theta = theta;
        onFrameRef.current?.({ phi: phi + velocity, theta });
        state.glowColor = accentRef.current
          ? hex(accentRef.current)
          : dark
            ? hex("#4dff97")
            : hex("#0f8a4c");
        state.width = width;
        state.height = width;
      },
    });

    const onDown = (e: PointerEvent) => {
      dragging = true;
      lastX = e.clientX;
      canvas.setPointerCapture(e.pointerId);
      canvas.style.cursor = "grabbing";
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - lastX;
      lastX = e.clientX;
      phi += dx / 200;
      velocity = dx / 200;
    };
    const onUp = () => {
      dragging = false;
      canvas.style.cursor = "grab";
    };
    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onUp);

    return () => {
      window.removeEventListener("resize", measure);
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
      globe.destroy();
    };
  }, [dark, markers, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={cn("aspect-square w-full cursor-grab touch-none", className)}
      style={{ contain: "layout paint size" }}
      aria-label="Interactive globe"
    />
  );
}

export default CobeGlobe;
