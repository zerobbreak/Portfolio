import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CobeGlobe from "./ui/cobe-globe";

gsap.registerPlugin(ScrollTrigger);

interface GlobeProps {
  highlightColor?: string | null;
}

/**
 * Fixed full-viewport background globe (cobe). Centered in the hero, then
 * drifts left/right as the page scrolls through each section.
 */
const Globe: React.FC<GlobeProps> = ({ highlightColor }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
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
      make("#projects", -1, 1),
      make("#experience", 0, -1),
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

  if (!mounted) return null;

  const isMobile = window.innerWidth < 768;

  return (
    <div
      ref={containerRef}
      className="fixed inset-x-0 top-24 bottom-0 pointer-events-none flex items-center justify-center z-0 overflow-hidden will-change-transform"
      style={{ opacity: isMobile ? 0.7 : 1 }}
      aria-hidden="true"
    >
      <CobeGlobe
        accent={highlightColor}
        className="w-[min(92vw,78vh)] max-w-none"
      />
    </div>
  );
};

export default Globe;
