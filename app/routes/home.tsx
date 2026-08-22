import React, { useState } from "react";
import type { Route } from "./+types/home";
import ProjectCard from "../components/ProjectCard";
import WorkExperience from "../components/WorkExperience";
import ContactForm from "../components/ContactForm";
import Globe from "../components/Globe";
import { FaArrowRight } from "react-icons/fa";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTilt } from "~/lib/useTilt";

import {
  SiCss3,
  SiExpress,
  SiGit,
  SiHtml5,
  SiJavascript,
  SiMongodb,
  SiNodedotjs,
  SiPython,
  SiReact,
  SiTypescript,
} from "react-icons/si";
import { BsGithub } from "react-icons/bs";
import { LiaLinkedin } from "react-icons/lia";
import { BiMailSend } from "react-icons/bi";
import { HiOutlineLocationMarker, HiOutlinePhone } from "react-icons/hi";
import { resend } from "../lib/resend.server";
import { getContactEmailHtml } from "../lib/email-templates.server";

export async function action({ request }: { request: Request }) {
  console.log("Contact form action triggered");
  const formData = await request.formData();
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  console.log(`Attempting to send email for: ${name} (${email})`);

  try {
    const { data, error } = await resend.emails.send({
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

interface Skill {
  name: string;
  icon: React.ReactNode;
  color: string;
  hex: string;
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
      onMouseEnter={() => onHover(skill.hex)}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={() => {
        tilt.onMouseLeave();
        onLeave();
      }}
      className="hud-frame group relative p-6 bg-card/60 backdrop-blur-md border border-border hover:border-brand-primary/40 text-center flex flex-col items-center justify-center gap-4 [transform-style:preserve-3d]"
      style={{ transition: "transform 0.15s ease-out, border-color 0.3s" }}
    >
      <span className="absolute top-2 left-2 font-mono text-[9px] text-muted-foreground/50">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div
        className={`transition-transform duration-300 group-hover:scale-110 ${skill.color}`}
      >
        {skill.icon}
      </div>
      <h3 className="font-mono text-xs uppercase tracking-wide text-foreground">
        {skill.name}
      </h3>
    </div>
  );
}

export default function Home() {
  const projects = [
    {
      title: "Lumina AI Notes",
      description:
        "AI-powered note-taking application designed to enhance productivity. Features intelligent organization, auto-summarization, and a powerful search capability. Solves the problem of information overload by helping users structure their thoughts effortlessly.",
      image: "/projects/lumina-ai-notes.png",
      technologies: [
        "React",
        "TypeScript",
        "OpenAI API",
        "Tailwind CSS",
        "Vite",
      ],
      githubUrl: "https://github.com/zerobbreak/Lumina-AI-Notes",
      liveUrl: "#",
    },
    {
      title: "AI-Mazing",
      description:
        "An interactive AI learning platform that simplifies machine learning concepts for beginners. Features gamified tutorials and visual demonstrations. Aims to make AI education accessible and engaging for everyone.",
      image: "/projects/ai-mazing.png",
      technologies: ["React", "Python", "TensorFlow.js", "Framer Motion"],
      githubUrl: "https://github.com/zerobbreak/AI-Mazing",
      liveUrl: "#",
    },
    {
      title: "Threads App Clone",
      description:
        "A modern social media platform clone replicating the core features of Threads. Includes real-time updates, threaded conversations, and a sleek mobile-first design. Demonstrates proficiency in building complex social interactions.",
      image: "/projects/threads-app.png",
      technologies: [
        "Next.js",
        "TypeScript",
        "PostgreSQL",
        "Prisma",
        "Tailwind CSS",
      ],
      githubUrl: "https://github.com/zerobbreak/Threads-app",
      liveUrl: "https://threads-app-1ab4.vercel.app/",
    },
    {
      title: "Job Market Agent",
      description:
        "An automated agent that streamlines the job hunt. Performs company research, generates tailored CVs, and tracks applications. Built to save developers time and increase application quality.",
      image: "/projects/job-market-agent.png",
      technologies: [
        "Python",
        "Selenium",
        "OpenAI API",
        "PyTest",
        "python-docx",
      ],
      githubUrl: "https://github.com/zerobbreak/Job-Market-Agent",
      liveUrl: "https://job-market-frontend.vercel.app/",
    },
    {
      title: "University Library System",
      description:
        "Comprehensive library management system with Admin and User panels. Manages inventory, tracks borrowing, and handles fines. Built with a robust SQL database architecture for data integrity.",
      image: "/projects/library-system.png",
      technologies: ["React", "SQL", "Node.js", "Express", "Tailwind CSS"],
      githubUrl: "https://github.com/zerobbreak/University-Library",
      liveUrl: "https://university-library-navy.vercel.app/sign-in",
    },
    {
      title: "AI Analyzer",
      description:
        "An intelligent resume analysis tool that leverages AI to evaluate resumes against job descriptions. Features automated skill matching, ATS compatibility scoring, and personalized improvement suggestions. Helps job seekers optimize their resumes for better application success rates.",
      image: "/projects/ai-analyzer.png",
      technologies: [
        "React",
        "TypeScript",
        "OpenAI API",
        "Tailwind CSS",
        "Vite",
      ],
      githubUrl: "https://github.com/zerobbreak/AI-Analyzer",
      liveUrl: "https://ai-resume-analyzer-pi-two.vercel.app/",
    },
  ];

  const [hoverColor, setHoverColor] = useState<string | null>(null);

  React.useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // Hero boot-up sequence
    const heroTl = gsap.timeline({ delay: 0.1 });
    heroTl
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

    gsap.fromTo(
      "#projects .project-card",
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#projects",
          start: "top 70%",
        },
      }
    );

    return () => {
      heroTl.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);


  const skills: Skill[] = [
    { name: "JavaScript", icon: <SiJavascript size={36} />, color: "text-yellow-400", hex: "#facc15" },
    { name: "TypeScript", icon: <SiTypescript size={36} />, color: "text-blue-500", hex: "#3b82f6" },
    { name: "Python", icon: <SiPython size={36} />, color: "text-sky-400", hex: "#38bdf8" },
    { name: "MongoDB", icon: <SiMongodb size={36} />, color: "text-green-500", hex: "#22c55e" },
    { name: "HTML5", icon: <SiHtml5 size={36} />, color: "text-orange-500", hex: "#f97316" },
    { name: "CSS3", icon: <SiCss3 size={36} />, color: "text-blue-400", hex: "#60a5fa" },
    { name: "React", icon: <SiReact size={36} />, color: "text-cyan-400", hex: "#22d3ee" },
    { name: "Node.js", icon: <SiNodedotjs size={36} />, color: "text-green-600", hex: "#16a34a" },
    { name: "Express", icon: <SiExpress size={36} />, color: "text-foreground", hex: "#9ca3af" },
    { name: "Git", icon: <SiGit size={36} />, color: "text-red-500", hex: "#ef4444" },
  ];

  const tickerItems = [
    "PYTHON", "REACT", "TYPESCRIPT", "NODE.JS", "AI_INTEGRATION",
    "FASTAPI", "MONGODB", "GIT", "TAILWIND", "OPENAI_API",
  ];

  return (
    <div id="top" className="flex flex-col gap-20 pb-20">
      <Globe highlightColor={hoverColor} />

      {/* Hero Section */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden" style={{ perspective: "800px" }}>
        <div className="absolute inset-0 grid-bg -z-10" />
        <div className="noise-overlay -z-10" />
        <div className="scanline -z-10" />
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-background -z-10" />

        <div className="container mx-auto px-6 text-center relative">
          <div className="hero-badge inline-flex items-center gap-2 mb-6 px-4 py-1.5 border border-brand-primary/40 text-brand-primary font-mono text-xs tracking-[0.2em] uppercase opacity-0">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse" />
            Available for hire
          </div>

          <p className="hero-prompt font-mono text-xs sm:text-sm text-muted-foreground mb-4 opacity-0">
            unathi@dev:~$ whoami<span className="cursor-blink" />
          </p>

          <h1 className="font-mono text-4xl sm:text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-[1.05]">
            <span className="block overflow-hidden">
              <span className="hero-word inline-block">Hi, I am</span>
            </span>
            <span className="block overflow-hidden">
              <span className="hero-word inline-block text-gradient text-glow">Unathi Tshuma</span>
            </span>
          </h1>

          <p className="hero-sub font-mono text-base sm:text-lg text-muted-foreground mb-10 max-w-2xl mx-auto opacity-0">
            <span className="text-brand-primary">// </span>
            Junior Python Developer — Full-stack Web Developer
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center font-mono text-sm">
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
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                {skills.map((skill, index) => (
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
            {/* Right side left empty for the globe */}
            <div className="hidden lg:block h-full" />
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="container mx-auto px-6 pt-20">
          <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-12 items-start">
            {/* Left side empty for the globe */}
            <div className="hidden lg:block h-full" />
            <div>
              <div className="mb-16">
                <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-brand-primary mb-3 block">
                  / 02 — Selected Work
                </span>
                <h2 className="font-mono text-3xl md:text-5xl font-bold mb-6 text-foreground">
                  Featured Projects
                </h2>
                <p className="text-lg text-muted-foreground max-w-xl">
                  Here are some of the projects I've worked on recently. Each
                  one presented unique challenges and learning opportunities.
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                {projects.map((project, index) => (
                  <div key={project.title} className="project-card">
                    <ProjectCard {...project} index={index} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <WorkExperience />
      </div>

      {/* About Section */}
      <section id="about" className="container mx-auto px-6 pt-20">
        <span className="about-reveal font-mono text-[11px] tracking-[0.3em] uppercase text-brand-primary mb-3 block">
          / 04 — About
        </span>
        <div className="about-reveal hud-frame bg-card border border-border relative overflow-hidden">
          <div className="grid-bg absolute inset-0 opacity-40 pointer-events-none" />
          {/* Terminal title bar */}
          <div className="relative flex items-center gap-2 px-5 py-3 border-b border-border bg-background/40">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-secondary/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-muted-foreground/40" />
            <span className="w-2.5 h-2.5 rounded-full bg-brand-primary/70" />
            <span className="ml-3 font-mono text-xs text-muted-foreground">~/about.md</span>
          </div>

          <div className="relative p-8 md:p-16 max-w-3xl mx-auto">
            <h2 className="about-reveal font-mono text-3xl md:text-4xl font-bold mb-8 text-foreground">
              About Me
            </h2>
            <div className="text-base md:text-lg text-muted-foreground mb-10 leading-relaxed space-y-5 text-left">
              <p className="about-reveal">
                <span className="text-brand-primary font-mono"># </span>
                My journey into tech began with a curiosity about how the web
                works, which quickly evolved into a passion for building
                interactive experiences. I started with the basics of HTML and
                CSS, and since then, I've immersed myself in the JavaScript
                ecosystem, mastering React and exploring backend technologies.
              </p>
              <p className="about-reveal">
                <span className="text-brand-primary font-mono"># </span>
                One of my proudest achievements has been building full-stack
                applications that solve real problems, like my Job Market Agent
                which automates tedious application processes. I believe in
                writing clean, maintainable code and am constantly pushing
                myself to learn new tools and best practices.
              </p>
              <p className="about-reveal">
                <span className="text-brand-primary font-mono"># </span>
                Currently, I'm diving deeper into AI integration in web apps and
                expanding my knowledge of cloud services. When I'm not coding,
                you can find me gaming, reading about the latest tech trends.
              </p>
            </div>

            <div className="about-reveal flex justify-center gap-4">
              <a
                href="https://github.com/zerobbreak"
                target="_blank"
                className="w-11 h-11 flex items-center justify-center border border-border hover:border-brand-primary hover:text-brand-primary text-muted-foreground transition-colors"
                aria-label="GitHub Profile"
              >
                <BsGithub size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/unathi-tshuma-7a30a523b/"
                target="_blank"
                className="w-11 h-11 flex items-center justify-center border border-border hover:border-brand-primary hover:text-brand-primary text-muted-foreground transition-colors"
                aria-label="LinkedIn Profile"
              >
                <LiaLinkedin size={20} />
              </a>
              <a
                href="mailto:utshuma6@gmail.com"
                className="w-11 h-11 flex items-center justify-center border border-border hover:border-brand-primary hover:text-brand-primary text-muted-foreground transition-colors"
                aria-label="Email Me"
              >
                <BiMailSend size={20} />
              </a>
            </div>
          </div>
        </div>
      </section>

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
