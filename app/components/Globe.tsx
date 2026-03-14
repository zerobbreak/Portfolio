import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface GlobeProps {
  highlightColor?: string | null;
}

const Globe: React.FC<GlobeProps> = ({ highlightColor }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = React.useState(false);
  const materialsRef = useRef<{
    globe: THREE.MeshBasicMaterial;
    rings: THREE.MeshBasicMaterial;
    meridian: THREE.MeshBasicMaterial;
  } | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Update colors when theme or highlightColor changes
  useEffect(() => {
    if (!mounted || !materialsRef.current) return;

    const isDark = document.documentElement.classList.contains("dark");
    const baseColor = isDark ? 0xffffff : 0x6366f1;
    const targetColor = highlightColor ? new THREE.Color(highlightColor) : new THREE.Color(baseColor);

    // Animate color transition for a premium feel
    gsap.to([materialsRef.current.globe.color, materialsRef.current.rings.color, materialsRef.current.meridian.color], {
        r: targetColor.r,
        g: targetColor.g,
        b: targetColor.b,
        duration: 0.4,
        ease: "power2.out"
    });
  }, [highlightColor, mounted]);

  useEffect(() => {
    if (!mounted || !containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 4;

    const renderer = new THREE.WebGLRenderer({ 
        alpha: true, 
        antialias: true,
        powerPreference: "high-performance" 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Globe Group
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // Geometry parameters
    const size = 2.5;
    const segments = 24;

    // Materials
    const isDark = document.documentElement.classList.contains("dark");
    const initialColor = isDark ? 0xffffff : 0x6366f1;

    const globeMaterial = new THREE.MeshBasicMaterial({
      color: initialColor,
      wireframe: true,
      transparent: true,
      opacity: 0.1,
    });

    const ringMaterial = new THREE.MeshBasicMaterial({
      color: initialColor,
      transparent: true,
      opacity: 0.15,
    });

    const meridianMaterial = new THREE.MeshBasicMaterial({ 
        color: initialColor, 
        transparent: true, 
        opacity: 0.3 
    });

    materialsRef.current = {
        globe: globeMaterial,
        rings: ringMaterial,
        meridian: meridianMaterial
    };

    // Meshes
    const geometry = new THREE.SphereGeometry(size, segments, segments);
    const sphere = new THREE.Mesh(geometry, globeMaterial);
    globeGroup.add(sphere);

    // Optimized rings - fewer segments for better performance
    for (let i = 0; i < 5; i++) {
        const ringGeo = new THREE.TorusGeometry(size, 0.005, 12, 60);
        const ring = new THREE.Mesh(ringGeo, ringMaterial);
        ring.rotation.x = Math.PI / 2;
        ring.position.y = (i - 2) * (size / 2);
        const ratio = Math.abs(ring.position.y) / size;
        const scale = Math.cos(Math.asin(Math.min(ratio, 1)));
        ring.scale.set(scale, scale, 1);
        globeGroup.add(ring);
    }

    const meridianGeo = new THREE.TorusGeometry(size, 0.01, 12, 60);
    const meridian = new THREE.Mesh(meridianGeo, meridianMaterial);
    globeGroup.add(meridian);

    // Theme Observer
    const observer = new MutationObserver(() => {
        if (!highlightColor) {
            const isDarkNow = document.documentElement.classList.contains("dark");
            const color = isDarkNow ? 0xffffff : 0x6366f1;
            gsap.to([globeMaterial.color, ringMaterial.color, meridianMaterial.color], {
                r: ((color >> 16) & 255) / 255,
                g: ((color >> 8) & 255) / 255,
                b: (color & 255) / 255,
                duration: 0.4
            });
        }
    });

    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class"],
    });

    // Animation & Scroll
    const rotationTween = gsap.to(globeGroup.rotation, {
      y: Math.PI * 4,
      ease: "none",
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      },
    });

    // Targeted Horizontal shifts for perfect timing
    // Segment 1: Shift to Right for Skills
    gsap.to(containerRef.current, {
      xPercent: 50,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: "#skills",
        start: "top 90%",
        end: "top 40%",
        scrub: 1,
      },
    });

    // Segment 2: Shift to Left for Projects (Immediately as header enters)
    gsap.to(containerRef.current, {
      xPercent: -50,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: "#projects",
        start: "top 95%", // Start very early as header peeps in
        end: "top 30%",
        scrub: 1,
      },
    });

    // Segment 3: Return to center after Projects
    gsap.to(containerRef.current, {
      xPercent: 0,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: "#about",
        start: "top 90%",
        end: "top 40%",
        scrub: 1,
      },
    });

    const animate = () => {
      if (!renderer.domElement) return;
      globeGroup.rotation.x += 0.0005;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    const animationId = requestAnimationFrame(animate);

    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      }, 150);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
      cancelAnimationFrame(animationId);
      rotationTween.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
      renderer.dispose();
      geometry.dispose();
      globeMaterial.dispose();
      ringMaterial.dispose();
      meridianMaterial.dispose();
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      materialsRef.current = null;
    };

  }, [mounted]);

  if (!mounted) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none flex items-center justify-center z-0 overflow-hidden will-change-transform"
      style={{ opacity: 0.7, backfaceVisibility: "hidden" }}
      aria-hidden="true"
    />
  );
};

export default Globe;
