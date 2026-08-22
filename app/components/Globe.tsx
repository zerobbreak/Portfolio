import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface GlobeProps {
  highlightColor?: string | null;
}

/**
 * Fixed full-viewport 3D "data sphere" — a wireframe geodesic core with a
 * fibonacci point-cloud shell and a fixed amber reference ring, used as the
 * hero centerpiece and a persistent HUD companion object that drifts across
 * sections as the page scrolls.
 */
const Globe: React.FC<GlobeProps> = ({ highlightColor }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = React.useState(false);
  const materialsRef = useRef<{
    edges: THREE.LineBasicMaterial;
    fill: THREE.MeshPhongMaterial;
    dots: THREE.PointsMaterial;
  } | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Color sync (skills-hover recolor + theme changes)
  useEffect(() => {
    if (!mounted || !materialsRef.current) return;
    const isDark = document.documentElement.classList.contains("dark");
    const baseHex = isDark ? 0x4dff97 : 0x0f8a4c;
    const target = highlightColor
      ? new THREE.Color(highlightColor)
      : new THREE.Color(baseHex);

    const mats = [
      materialsRef.current.edges.color,
      materialsRef.current.fill.color,
      materialsRef.current.fill.emissive,
      materialsRef.current.dots.color,
    ];
    gsap.to(mats, {
      r: target.r,
      g: target.g,
      b: target.b,
      duration: 0.5,
      ease: "power2.out",
    });
  }, [highlightColor, mounted]);

  useEffect(() => {
    if (!mounted || !containerRef.current) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      100,
    );
    camera.position.z = 4.5;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    const isMobile = window.innerWidth < 768;
    const size = isMobile ? 1.5 : 2.2;

    const isDark = document.documentElement.classList.contains("dark");
    const baseColor = isDark ? 0x4dff97 : 0x0f8a4c;
    const amber = isDark ? 0xffb454 : 0xa85a06;
    const color = new THREE.Color(baseColor);

    scene.add(new THREE.AmbientLight(0xffffff, 0.3));
    const keyLight = new THREE.DirectionalLight(0xffffff, 0.6);
    keyLight.position.set(-2, 2, 3);
    scene.add(keyLight);

    // Outer group: scroll-driven yaw only
    const scrollGroup = new THREE.Group();
    scene.add(scrollGroup);

    // Inner group: mouse-parallax tilt + slow auto-spin
    const innerGroup = new THREE.Group();
    scrollGroup.add(innerGroup);

    // Geodesic wireframe core
    const icoGeo = new THREE.IcosahedronGeometry(size, 1);
    const wireGeo = new THREE.WireframeGeometry(icoGeo);
    const edgesMat = new THREE.LineBasicMaterial({
      color: color.clone(),
      transparent: true,
      opacity: isDark ? 0.55 : 0.42,
    });
    const edges = new THREE.LineSegments(wireGeo, edgesMat);
    innerGroup.add(edges);

    // Faint volumetric fill for depth
    const fillGeo = new THREE.SphereGeometry(size * 0.97, 48, 48);
    const fillMat = new THREE.MeshPhongMaterial({
      color: color.clone(),
      emissive: color.clone().multiplyScalar(0.1),
      transparent: true,
      opacity: isDark ? 0.08 : 0.06,
      shininess: 40,
    });
    const fill = new THREE.Mesh(fillGeo, fillMat);
    innerGroup.add(fill);

    // Fibonacci-distributed point shell
    const dotCount = isMobile ? 260 : 520;
    const positions = new Float32Array(dotCount * 3);
    for (let i = 0; i < dotCount; i++) {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / dotCount);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const r = size * 1.03;
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.cos(phi);
      positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    }
    const dotGeo = new THREE.BufferGeometry();
    dotGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const dotMat = new THREE.PointsMaterial({
      color: color.clone(),
      size: 0.02,
      transparent: true,
      opacity: isDark ? 0.6 : 0.5,
      sizeAttenuation: true,
    });
    const dots = new THREE.Points(dotGeo, dotMat);
    innerGroup.add(dots);

    materialsRef.current = { edges: edgesMat, fill: fillMat, dots: dotMat };

    // Fixed amber HUD reference ring — orbits independently, unaffected by
    // skill-hover recolor so the sphere always reads against a stable frame.
    const ringCurve = new THREE.EllipseCurve(0, 0, size * 1.45, size * 1.45);
    const ringPoints = ringCurve.getPoints(128);
    const ringGeo = new THREE.BufferGeometry().setFromPoints(
      ringPoints.map((p) => new THREE.Vector3(p.x, p.y, 0)),
    );
    const ringMat = new THREE.LineBasicMaterial({
      color: amber,
      transparent: true,
      opacity: isDark ? 0.32 : 0.28,
    });
    const ring = new THREE.LineLoop(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2.3;
    ring.rotation.y = Math.PI / 8;
    scrollGroup.add(ring);

    // Theme observer (only recolors when no active skill-hover)
    const observer = new MutationObserver(() => {
      if (!highlightColor && materialsRef.current) {
        const dark = document.documentElement.classList.contains("dark");
        const hex = dark ? 0x4dff97 : 0x0f8a4c;
        const c = new THREE.Color(hex);
        gsap.to(
          [
            materialsRef.current.edges.color,
            materialsRef.current.fill.color,
            materialsRef.current.dots.color,
          ],
          { r: c.r, g: c.g, b: c.b, duration: 0.4 },
        );
      }
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // Scroll-driven yaw
    const rotTween = gsap.to(scrollGroup.rotation, {
      y: reduceMotion ? 0 : Math.PI * 4,
      ease: "none",
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      },
    });

    const shift = isMobile ? 12 : 46;

    // Discrete, non-overlapping section transitions. Using a single reusable
    // tween (overwrite: true) instead of independent scrub-tweens per section
    // avoids competing writes to the same xPercent property, which was
    // causing the sphere to jitter/stick between the Skills and Experience
    // sections (Experience previously had no trigger at all, so the sphere
    // stayed pinned at the Projects offset until About appeared).
    const setGlobeX = (x: number) => {
      gsap.to(containerRef.current, {
        xPercent: x,
        duration: 1,
        ease: "power2.inOut",
        overwrite: true,
      });
    };

    ScrollTrigger.create({
      trigger: "#skills",
      start: "top center",
      end: "bottom center",
      onEnter: () => setGlobeX(shift),
      onEnterBack: () => setGlobeX(shift),
      onLeaveBack: () => setGlobeX(0),
    });
    ScrollTrigger.create({
      trigger: "#projects",
      start: "top center",
      end: "bottom center",
      onEnter: () => setGlobeX(-shift),
      onEnterBack: () => setGlobeX(-shift),
      onLeaveBack: () => setGlobeX(shift),
    });
    ScrollTrigger.create({
      trigger: "#experience",
      start: "top center",
      end: "bottom center",
      onEnter: () => setGlobeX(0),
      onEnterBack: () => setGlobeX(0),
      onLeaveBack: () => setGlobeX(-shift),
    });

    // Mouse parallax
    const pointer = { x: 0, y: 0 };
    const onPointerMove = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    if (!reduceMotion) window.addEventListener("pointermove", onPointerMove);

    let autoRotX = 0;
    const animate = () => {
      if (!reduceMotion) {
        autoRotX += 0.0004;
        ring.rotation.z -= 0.0009;
        const targetX = autoRotX + pointer.y * 0.18;
        const targetZ = pointer.x * 0.18;
        innerGroup.rotation.x += (targetX - innerGroup.rotation.x) * 0.05;
        innerGroup.rotation.z += (targetZ - innerGroup.rotation.z) * 0.05;
      }
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    const animId = requestAnimationFrame(animate);

    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }, 150);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointerMove);
      observer.disconnect();
      cancelAnimationFrame(animId);
      rotTween.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
      renderer.dispose();
      icoGeo.dispose();
      wireGeo.dispose();
      fillGeo.dispose();
      dotGeo.dispose();
      ringGeo.dispose();
      edgesMat.dispose();
      fillMat.dispose();
      dotMat.dispose();
      ringMat.dispose();
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      materialsRef.current = null;
    };
  }, [mounted]);

  if (!mounted) return null;

  const isDark = document.documentElement.classList.contains("dark");
  const isMobile = window.innerWidth < 768;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none flex items-center justify-center z-0 overflow-hidden will-change-transform"
      style={{
        opacity: isMobile ? (isDark ? 0.45 : 0.35) : isDark ? 0.9 : 0.55,
        backfaceVisibility: "hidden",
      }}
      aria-hidden="true"
    />
  );
};

export default Globe;
