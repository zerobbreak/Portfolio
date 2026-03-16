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
    sphere: THREE.MeshPhongMaterial;
    rim: THREE.MeshPhongMaterial;
    dots: THREE.PointsMaterial;
  } | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Color sync
  useEffect(() => {
    if (!mounted || !materialsRef.current) return;
    const isDark = document.documentElement.classList.contains("dark");
    const baseHex = isDark ? 0x8888ff : 0x6366f1;
    const target = highlightColor
      ? new THREE.Color(highlightColor)
      : new THREE.Color(baseHex);

    const mats = [
      materialsRef.current.sphere.color,
      materialsRef.current.sphere.emissive,
      materialsRef.current.rim.color,
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
    const size = isMobile ? 1.6 : 2.4;

    const isDark = document.documentElement.classList.contains("dark");
    const baseColor = isDark ? 0x8888ff : 0x6366f1;
    const color = new THREE.Color(baseColor);

    // Ambient + directional light for smooth shading
    scene.add(new THREE.AmbientLight(0xffffff, 0.3));
    const keyLight = new THREE.DirectionalLight(0xffffff, 0.8);
    keyLight.position.set(-2, 2, 3);
    scene.add(keyLight);
    const fillLight = new THREE.DirectionalLight(0xffffff, 0.2);
    fillLight.position.set(2, -1, -2);
    scene.add(fillLight);

    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // Main smooth sphere — no wireframe
    const sphereGeo = new THREE.SphereGeometry(size, 64, 64);
    const sphereMat = new THREE.MeshPhongMaterial({
      color: color.clone(),
      emissive: color.clone().multiplyScalar(0.08),
      transparent: true,
      opacity: isDark ? 0.18 : 0.14,
      shininess: 60,
    });
    const sphere = new THREE.Mesh(sphereGeo, sphereMat);
    globeGroup.add(sphere);

    // Rim glow using a slightly larger inverted-normals shell
    const rimGeo = new THREE.SphereGeometry(size * 1.04, 64, 64);
    const rimMat = new THREE.MeshPhongMaterial({
      color: color.clone(),
      side: THREE.BackSide,
      transparent: true,
      opacity: isDark ? 0.22 : 0.16,
      shininess: 0,
    });
    const rim = new THREE.Mesh(rimGeo, rimMat);
    globeGroup.add(rim);

    // Fibonacci-distributed surface dots instead of grid lines
    const dotCount = isMobile ? 300 : 600;
    const positions = new Float32Array(dotCount * 3);
    for (let i = 0; i < dotCount; i++) {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / dotCount);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const r = size + 0.01;
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.cos(phi);
      positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    }
    const dotGeo = new THREE.BufferGeometry();
    dotGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const dotMat = new THREE.PointsMaterial({
      color: color.clone(),
      size: 0.018,
      transparent: true,
      opacity: isDark ? 0.55 : 0.45,
      sizeAttenuation: true,
    });
    const dots = new THREE.Points(dotGeo, dotMat);
    globeGroup.add(dots);

    materialsRef.current = { sphere: sphereMat, rim: rimMat, dots: dotMat };

    // Theme observer
    const observer = new MutationObserver(() => {
      if (!highlightColor && materialsRef.current) {
        const dark = document.documentElement.classList.contains("dark");
        const hex = dark ? 0x8888ff : 0x6366f1;
        const c = new THREE.Color(hex);
        gsap.to(
          [
            materialsRef.current.sphere.color,
            materialsRef.current.rim.color,
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

    // Scroll-driven rotation
    const rotTween = gsap.to(globeGroup.rotation, {
      y: Math.PI * 4,
      ease: "none",
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      },
    });

    const isMobileShift = window.innerWidth < 768;
    const shift = isMobileShift ? 15 : 50;

    gsap.to(containerRef.current, {
      xPercent: shift,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: "#skills",
        start: "top bottom",
        end: "top 30%",
        scrub: 1,
      },
    });
    gsap.to(containerRef.current, {
      xPercent: -shift,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: "#projects",
        start: "top bottom",
        end: "top 30%",
        scrub: 1,
      },
    });
    gsap.to(containerRef.current, {
      xPercent: 0,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: "#about",
        start: "top bottom",
        end: "top 30%",
        scrub: 1,
      },
    });

    const animate = () => {
      globeGroup.rotation.x += 0.0004;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    const animId = requestAnimationFrame(animate);

    let resizeTimer: NodeJS.Timeout;
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
      observer.disconnect();
      cancelAnimationFrame(animId);
      rotTween.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
      renderer.dispose();
      sphereGeo.dispose();
      rimGeo.dispose();
      dotGeo.dispose();
      sphereMat.dispose();
      rimMat.dispose();
      dotMat.dispose();
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
      style={{
        opacity: window.innerWidth < 768 ? 0.3 : 0.7,
        backfaceVisibility: "hidden",
      }}
      aria-hidden="true"
    />
  );
};

export default Globe;
