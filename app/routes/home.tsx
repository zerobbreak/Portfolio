import React, { useState } from "react";
import type { Route } from "./+types/home";
import ProjectShowcase from "../components/ProjectShowcase";
import WorkExperience from "../components/WorkExperience";
import AboutDatasheet from "../components/AboutDatasheet";
import ContactForm from "../components/ContactForm";
import Globe from "../components/Globe";
import { FaArrowRight } from "react-icons/fa";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTilt } from "~/lib/useTilt";

import type { IconType } from "react-icons";
import {
  SiBlazor,
  SiCelery,
  SiClerk,
  SiCss3,
  SiDjango,
  SiDocker,
  SiDotnet,
  SiExpress,
  SiFastapi,
  SiFramer,
  SiGit,
  SiGooglegemini,
  SiHtml5,
  SiHuggingface,
  SiJavascript,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiOpenai,
  SiPostgresql,
  SiPrisma,
  SiPytest,
  SiPython,
  SiReact,
  SiRedis,
  SiScikitlearn,
  SiSelenium,
  SiSharp,
  SiSqlite,
  SiSupabase,
  SiTailwindcss,
  SiTensorflow,
  SiTypescript,
  SiVercel,
  SiVite,
} from "react-icons/si";
import { skills, type Skill } from "~/data/skills";
import { LAYERS } from "~/data/projects";
import { BiMailSend } from "react-icons/bi";
import { HiOutlineLocationMarker, HiOutlinePhone } from "react-icons/hi";
import { getResendClient } from "../lib/resend.server";
import { getContactEmailHtml } from "../lib/email-templates.server";

export async function action({ request }: { request: Request }) {
  console.log("Contact form action triggered");
  const formData = await request.formData();
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  console.log(`Attempting to send email for: ${name} (${email})`);

  try {
    const { data, error } = await getResendClient().emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: "utshuma6@gmail.com",
      replyTo: email,
      subject: `New Message from ${name}`,
      html: getContactEmailHtml(name, email, message),
    });


    if (error) {
      console.error("Resend API Error:", error);
      return { success: false, error: error.message };
    }

    console.log("Email sent successfully via Resend:", data);
    return { success: true, data };
  } catch (err: any) {
    console.error("Server Action Exception:", err);
    return { success: false, error: err.message };
  }
}


export function meta({}: Route.MetaArgs) {
  return [
    { title: "Unathi Tshuma | Junior Python & Full-stack Web Developer" },
    { name: "description", content: "Portfolio of Unathi Tshuma, a dedicated Junior Python and Full-stack Web Developer specializing in React, Node.js, and AI-driven applications." },
    { name: "keywords", content: "Python, React, Full-stack Developer, Web Development, Johannesbung Developer, AI Integration, TypeScript, Node.js" },
    { property: "og:title", content: "Unathi Tshuma | Junior Python & Full-stack Web Developer" },
    { property: "og:description", content: "Explore my portfolio of web applications and AI tools built with modern technologies." },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://unathi-tshuma.com" }, // User should update with actual domain
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "Unathi Tshuma | Junior Python & Full-stack Web Developer" },
    { name: "twitter:description", content: "Explore my portfolio of web applications and AI tools built with modern technologies." },
  ];
}

const SHOW_HERO_TEXT = true;

/** Brand icons for skills in data/skills.ts; anything missing falls back to a monogram. */
const SKILL_ICONS: Record<string, IconType> = {
  HTML5: SiHtml5,
  CSS3: SiCss3,
  JavaScript: SiJavascript,
  TypeScript: SiTypescript,
  React: SiReact,
  "Next.js": SiNextdotjs,
  "Tailwind CSS": SiTailwindcss,
  "Framer Motion": SiFramer,
  Blazor: SiBlazor,
  "C#": SiSharp,
  "ASP.NET Core": SiDotnet,
  "Node.js": SiNodedotjs,
  Express: SiExpress,
  Python: SiPython,
  Selenium: SiSelenium,
  FastAPI: SiFastapi,
  Django: SiDjango,
  Celery: SiCelery,
  "OpenAI API": SiOpenai,
  "Gemini API": SiGooglegemini,
  "TensorFlow.js": SiTensorflow,
  "scikit-learn": SiScikitlearn,
  "Sentence Transformers": SiHuggingface,
  MongoDB: SiMongodb,
  Supabase: SiSupabase,
  Redis: SiRedis,
  "EF Core": SiDotnet,
  SQLite: SiSqlite,
  PostgreSQL: SiPostgresql,
  Prisma: SiPrisma,
  Git: SiGit,
  Vite: SiVite,
  Vercel: SiVercel,
  PyTest: SiPytest,
  Clerk: SiClerk,
  Docker: SiDocker,
};

function SkillIcon({ skill }: { skill: Skill }) {
  const Icon = SKILL_ICONS[skill.name];
  if (Icon) return <Icon size={28} style={{ color: skill.color }} />;
  const initials = skill.name.replace(/[^A-Za-z0-9 ]/g, " ").split(/\s+/).filter(Boolean)
    .map((w) => w[0]).join("").slice(0, 2).toUpperCase();
  return (
    <span
      className="w-7 h-7 flex items-center justify-center border font-mono text-[10px] font-bold"
      style={{ color: skill.color, borderColor: skill.color }}
    >
      {initials}
    </span>
  );
}

function SkillCard({
  skill,
  index,
  onHover,
  onLeave,
}: {
  skill: Skill;
  index: number;
  onHover: (hex: string) => void;
  onLeave: () => void;
}) {
  const tilt = useTilt<HTMLDivElement>(8);
  return (
    <div
      ref={tilt.ref}
      onMouseEnter={() => onHover(skill.color)}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={() => {
        tilt.onMouseLeave();
        onLeave();
      }}
      className="hud-frame group relative h-full p-4 bg-card/60 backdrop-blur-md border border-border hover:border-brand-primary/40 text-center flex flex-col items-center justify-center gap-3 [transform-style:preserve-3d]"
      style={{ transition: "transform 0.15s ease-out, border-color 0.3s" }}
    >
      <span className="absolute top-2 left-2 font-mono text-[9px] text-muted-foreground/50">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div className="transition-transform duration-300 group-hover:scale-110">
        <SkillIcon skill={skill} />
      </div>
      <h3 className="font-mono text-[10px] sm:text-xs uppercase tracking-wide text-foreground break-words">
        {skill.name}
      </h3>
    </div>
  );
}

export default function Home() {
  const [hoverColor, setHoverColor] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  React.useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // Hero boot-up sequence
    const heroTl = gsap.timeline({ delay: 0.1, paused: !SHOW_HERO_TEXT });
    if (SHOW_HERO_TEXT) heroTl
      .fromTo(
        ".hero-badge",
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
      )
      .fromTo(
        ".hero-prompt",
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: "power2.out" },
        "-=0.2",
      )
      .fromTo(
        ".hero-word",
        { yPercent: 110, rotateX: reduceMotion ? 0 : -35 },
        {
          yPercent: 0,
          rotateX: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: "power4.out",
        },
        "-=0.1",
      )
      .fromTo(
        ".hero-sub",
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        "-=0.4",
      )
      .fromTo(
        ".hero-cta",
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" },
        "-=0.3",
      );

    // Fade in sections on scroll
    const sections = ["#skills", "#projects", "#experience", "#about", "#contact"];

    sections.forEach((sectionId) => {
      gsap.fromTo(
        sectionId,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionId,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    // Special staggered animation for About section children
    gsap.fromTo(
      "#about .about-reveal",
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#about",
          start: "top 75%",
        },
      }
    );

    // Marquee-adjacent skill/project card stagger
    gsap.fromTo(
      "#skills .skill-card",
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.05,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#skills",
          start: "top 70%",
        },
      }
    );


    return () => {
      heroTl.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);


  // Skills come from data/skills.ts, grouped by stack layer; numbering runs across groups.
  let skillNo = 0;
  const skillGroups = LAYERS.map((l) => ({
    ...l,
    items: skills.filter((s) => s.layer === l.key).map((s) => ({ skill: s, index: skillNo++ })),
  })).filter((g) => g.items.length > 0);

  const tickerItems = [
    "PYTHON", "REACT", "TYPESCRIPT", "NODE.JS", "AI_INTEGRATION",
    "FASTAPI", "MONGODB", "GIT", "TAILWIND", "OPENAI_API",
  ];

  return (
    <div id="top" className="flex flex-col gap-20 pb-20">
      <Globe
        highlightColor={hoverColor}
        selected={selectedProject}
        onSelect={setSelectedProject}
      />

      {/* Hero Section */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden" style={{ perspective: "800px" }}>
        <div className="absolute inset-0 grid-bg -z-10" />
        <div className="noise-overlay -z-10" />
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-background -z-10" />

        {SHOW_HERO_TEXT && (
          <div className="container mx-auto px-6 text-left relative z-10">
            <div className="w-full md:max-w-[48%]">
              <div className="hero-badge inline-flex items-center gap-2 mb-6 px-4 py-1.5 border border-brand-primary/40 text-brand-primary font-mono text-xs tracking-[0.2em] uppercase opacity-0">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse" />
                Available for hire
              </div>

              <p className="hero-prompt font-mono text-xs sm:text-sm text-muted-foreground mb-4 opacity-0">
                unathi@dev:~$ whoami<span className="cursor-blink" />
              </p>

              <h1 className="max-w-2xl font-mono text-4xl sm:text-5xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 tracking-tight leading-[1.05]">
                <span className="block overflow-hidden">
                  <span className="hero-word inline-block">Hi, I am</span>
                </span>
                <span className="block overflow-hidden">
                  <span className="hero-word inline-block text-gradient text-glow">Unathi Tshuma</span>
                </span>
              </h1>

              <p className="hero-sub font-mono text-base sm:text-lg text-muted-foreground mb-10 max-w-xl opacity-0">
                <span className="text-brand-primary">// </span>
                Junior Python Developer / Full-stack Web Developer
              </p>

              <div className="flex flex-col sm:flex-row gap-4 font-mono text-sm">
                <a
                  href="#projects"
                  className="hero-cta px-8 py-4 bg-brand-primary hover:bg-brand-primary-hover text-background font-semibold transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2 opacity-0 uppercase tracking-wide"
                >
                  [ View Work <FaArrowRight size={13} /> ]
                </a>
                <a
                  href="#contact"
                  className="hero-cta px-8 py-4 border border-border hover:border-brand-primary text-foreground hover:text-brand-primary font-semibold transition-all hover:-translate-y-0.5 flex items-center justify-center opacity-0 uppercase tracking-wide"
                >
                  [ Contact Me ]
                </a>
              </div>
            </div>
          </div>
        )}

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
          <span className="w-px h-12 bg-linear-to-b from-brand-primary to-transparent" />
          <span>Scroll</span>
        </div>
      </section>

      {/* Marquee ticker */}
      <div className="border-y border-border py-4 overflow-hidden -mt-20 relative z-10 bg-background/60 backdrop-blur-sm">
        <div className="flex whitespace-nowrap marquee-track w-max">
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span
              key={i}
              className="font-mono text-sm text-muted-foreground px-6 flex items-center gap-6"
            >
              {item}
              <span className="text-brand-primary">◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* Side Aligned Content Container (Skills + Projects) */}
      <div id="content-side-aligned" className="flex flex-col gap-20">
        {/* Skills Section */}
        <section id="skills" className="container mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12 items-center">
            <div>

              <div className="mb-12">
                <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-brand-primary mb-3 block">
                  / 01 — Stack
                </span>
                <h2 className="font-mono text-3xl md:text-5xl font-bold mb-6 text-foreground">
                  Skills &amp; Technologies
                </h2>
                <p className="text-lg text-muted-foreground max-w-xl">
                  My technical toolkit and the technologies I love to work with.
                  I focus on building scalable, performant applications with a
                  modern stack.
                </p>
              </div>
              <div className="flex flex-col gap-10">
                {skillGroups.map((group) => (
                  <div key={group.key}>
                    <h3 className="font-mono text-[11px] tracking-[0.3em] uppercase text-muted-foreground mb-4 flex items-center gap-3">
                      {group.name}
                      <span className="text-muted-foreground/50">[{group.items.length}]</span>
                      <span className="flex-1 h-px bg-border" />
                    </h3>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                      {group.items.map(({ skill, index }) => (
                        <div key={skill.name} className="skill-card">
                          <SkillCard
                            skill={skill}
                            index={index}
                            onHover={setHoverColor}
                            onLeave={() => setHoverColor(null)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Right side left empty for the globe */}
            <div className="hidden lg:block h-full" />
          </div>
        </section>

        {/* Projects Section — the card sits on the centered, enlarged globe */}
        {/* pointer-events-none lets clicks through to the globe's pins; the card opts back in */}
        <section id="projects" className="container mx-auto px-6 pt-20 pointer-events-none">
          <div className="mb-10 text-center flex flex-col items-center">
            <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-brand-primary mb-3 block">
              / 02 — Selected Work
            </span>
            <h2 className="font-mono text-3xl md:text-5xl font-bold mb-6 text-foreground">
              Featured Projects
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl">
              Every project starts in Midrand. Pick a pin on the globe to get
              its boarding pass, then tear the stub to see the problem, the
              goal and how it's built.
            </p>
          </div>
          <div className="relative h-[150vh]">
            <div className="sticky top-[calc(50vh+48px)] -translate-y-1/2 z-10">
              <ProjectShowcase selected={selectedProject} onSelect={setSelectedProject} />
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <WorkExperience />
      </div>

      {/* About Section */}
      <AboutDatasheet />

      {/* Contact Section */}
      <section id="contact" className="container mx-auto px-6 pt-20 max-w-4xl">
        <div className="text-center mb-12">
          <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-brand-primary mb-3 block">
            / 05 — Contact
          </span>
          <h2 className="font-mono text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Get In Touch
          </h2>
          <p className="text-muted-foreground">
            Have a project in mind or just want to say hi? Fill out the form
            below and I'll get back to you as soon as possible.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="hud-frame p-6 bg-card border border-border text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 border border-brand-primary/30 text-brand-primary mb-4">
              <BiMailSend size={22} />
            </div>
            <h3 className="font-mono text-xs uppercase tracking-wide text-foreground mb-1.5">
              Email
            </h3>
            <p className="text-muted-foreground text-sm">
              utshuma6@gmail.com
            </p>
          </div>
          <div className="hud-frame p-6 bg-card border border-border text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 border border-brand-primary/30 text-brand-primary mb-4">
              <HiOutlineLocationMarker size={22} />
            </div>
            <h3 className="font-mono text-xs uppercase tracking-wide text-foreground mb-1.5">
              Location
            </h3>
            <p className="text-muted-foreground text-sm">
              Midrand, Noordwyk, Johannesburg, South Africa
            </p>
          </div>
          <div className="hud-frame p-6 bg-card border border-border text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 border border-brand-primary/30 text-brand-primary mb-4">
              <HiOutlinePhone size={22} />
            </div>
            <h3 className="font-mono text-xs uppercase tracking-wide text-foreground mb-1.5">
              Phone
            </h3>
            <p className="text-muted-foreground text-sm">
              +27 81 565 7405
            </p>
          </div>
        </div>

        <ContactForm />
      </section>
    </div>
  );
}
