import React, { useState } from "react";
import type { Route } from "./+types/home";
import ProjectCard from "../components/ProjectCard";
import WorkExperience from "../components/WorkExperience";
import ContactForm from "../components/ContactForm";
import Globe from "../components/Globe";
import { FaArrowRight } from "react-icons/fa";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

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
      "#about .max-w-3xl > *",
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#about",
          start: "top 75%",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);


  const skills = [
    {
      name: "JavaScript",
      icon: <SiJavascript size={40} />,
      color: "text-yellow-400",
    },
    {
      name: "TypeScript",
      icon: <SiTypescript size={40} />,
      color: "text-blue-600",
    },
    { name: "Python", icon: <SiPython size={40} />, color: "text-blue-500" },
    { name: "MongoDB", icon: <SiMongodb size={40} />, color: "text-green-500" },
    { name: "HTML5", icon: <SiHtml5 size={40} />, color: "text-orange-600" },
    { name: "CSS3", icon: <SiCss3 size={40} />, color: "text-blue-500" },
    { name: "React", icon: <SiReact size={40} />, color: "text-cyan-400" },
    {
      name: "Node.js",
      icon: <SiNodedotjs size={40} />,
      color: "text-green-600",
    },
    {
      name: "Express",
      icon: <SiExpress size={40} />,
      color: "text-gray-900 dark:text-white",
    },
    { name: "Git", icon: <SiGit size={40} />, color: "text-red-500" },
  ];

  return (
    <div className="flex flex-col gap-20 pb-20">
      <Globe highlightColor={hoverColor} />
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-indigo-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 -z-10" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 -z-10" />

        <div className="container mx-auto px-6 text-center">
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 font-medium text-sm animate-fade-in-up">
            Available for hire
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 tracking-tight animate-fade-in-up delay-100">
            Hi, I am <span className="text-gradient">Unathi Tshuma</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto animate-fade-in-up delay-200">
            Junior Python Developer / Full-stack Web developer
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-300">
            <a
              href="#projects"
              className="px-8 py-4 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-all hover:scale-105 shadow-lg hover:shadow-indigo-500/30 flex items-center justify-center gap-2"
            >
              View Work <FaArrowRight />
            </a>
            <a
              href="#contact"
              className="px-8 py-4 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-indigo-500 dark:hover:border-indigo-500 text-gray-900 dark:text-white font-semibold transition-all hover:scale-105 flex items-center justify-center"
            >
              Contact Me
            </a>
          </div>
        </div>
      </section>

      {/* Side Aligned Content Container (Skills + Projects) */}
      <div id="content-side-aligned" className="flex flex-col gap-20">
        {/* Skills Section */}
        <section id="skills" className="container mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12 items-center">
            <div>

              <div className="mb-12">
                <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
                  Skills & Technologies
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-xl">
                  My technical toolkit and the technologies I love to work with.
                  I focus on building scalable, performant applications with a
                  modern stack.
                </p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                {skills.map((skill, index) => (
                  <div
                    key={index}
                    onMouseEnter={() => {
                      // Extract hex from tailwind text color or mapping
                      const colorMap: Record<string, string> = {
                        "text-yellow-400": "#facc15",
                        "text-blue-600": "#2563eb",
                        "text-blue-500": "#3b82f6",
                        "text-green-500": "#22c55e",
                        "text-orange-600": "#ea580c",
                        "text-cyan-400": "#22d3ee",
                        "text-green-600": "#16a34a",
                        "text-red-500": "#ef4444",
                      };
                      setHoverColor(colorMap[skill.color] || "#6366f1");
                    }}
                    onMouseLeave={() => setHoverColor(null)}
                    className="p-6 rounded-2xl bg-white/40 dark:bg-gray-900/40 backdrop-blur-md border border-white/20 dark:border-gray-800/50 shadow-sm hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 hover:-translate-y-2 text-center flex flex-col items-center justify-center gap-4 group"
                  >
                    <div
                      className={`transition-transform duration-300 group-hover:scale-110 ${skill.color}`}
                    >
                      {skill.icon}
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {skill.name}
                    </h3>
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
                <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
                  Featured Projects
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-xl">
                  Here are some of the projects I've worked on recently. Each
                  one presented unique challenges and learning opportunities.
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                {projects.map((project, index) => (
                  <ProjectCard key={index} {...project} />
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
        <div className="bg-indigo-600 rounded-3xl p-8 md:p-16 text-white text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">About Me</h2>
            <div className="text-lg md:text-xl text-indigo-100 mb-8 leading-relaxed space-y-4 text-left">
              <p>
                My journey into tech began with a curiosity about how the web
                works, which quickly evolved into a passion for building
                interactive experiences. I started with the basics of HTML and
                CSS, and since then, I've immersed myself in the JavaScript
                ecosystem, mastering React and exploring backend technologies.
              </p>
              <p>
                One of my proudest achievements has been building full-stack
                applications that solve real problems, like my Job Market Agent
                which automates tedious application processes. I believe in
                writing clean, maintainable code and am constantly pushing
                myself to learn new tools and best practices.
              </p>
              <p>
                Currently, I'm diving deeper into AI integration in web apps and
                expanding my knowledge of cloud services. When I'm not coding,
                you can find me gaming, reading about the latest tech trends.
              </p>
            </div>

            <div className="flex justify-center gap-6 mt-8">
              <a
                href="https://github.com/zerobbreak"
                target="_blank"
                className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors backdrop-blur-sm"
                aria-label="GitHub Profile"
              >
                <BsGithub size={24} />
              </a>
              <a
                href="https://www.linkedin.com/in/unathi-tshuma-7a30a523b/"
                target="_blank"
                className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors backdrop-blur-sm"
                aria-label="LinkedIn Profile"
              >
                <LiaLinkedin size={24} />
              </a>
              <a
                href="mailto:utshuma6@gmail.com"
                className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors backdrop-blur-sm"
                aria-label="Email Me"
              >
                <BiMailSend size={24} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="container mx-auto px-6 pt-20 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Get In Touch
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Have a project in mind or just want to say hi? Fill out the form
            below and I'll get back to you as soon as possible.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 mb-4">
              <BiMailSend size={24} />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
              Email
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              utshuma@gmail.com
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 mb-4">
              <span className="text-xl">📍</span>
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
              Location
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Midrand, Noordwyk, Johannesburg, South Africa
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 mb-4">
              <span className="text-xl">📞</span>
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
              Phone
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              +27 81 565 7405
            </p>
          </div>
        </div>

        <ContactForm />
      </section>
    </div>
  );
}
