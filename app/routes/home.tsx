import type { Route } from "./+types/home";
import ProjectCard from "../components/ProjectCard";
import ContactForm from "../components/ContactForm";
import { FaArrowRight } from "react-icons/fa";
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

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Unathi Tshuma - Portfolio" },
    { name: "description", content: "Welcome to my professional portfolio!" },
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
      liveUrl: "#",
    },
    {
      title: "Customer Service ChatBot",
      description:
        "Intelligent chatbot leveraging Natural Language Processing to automate customer support. Handles inquiries, schedules appointments, and provides instant responses, significantly reducing wait times for users.",
      image: "/projects/chatbot.png",
      technologies: ["Python", "NLP", "Flask", "React", "OpenAI API"],
      githubUrl: "https://github.com/zerobbreak/ChatBot",
      liveUrl: "#",
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
      liveUrl: "https://github.com/zerobbreak/Job-Market-Frontend",
    },
    {
      title: "University Library System",
      description:
        "Comprehensive library management system with Admin and User panels. Manages inventory, tracks borrowing, and handles fines. Built with a robust SQL database architecture for data integrity.",
      image: "/projects/library-system.png",
      technologies: ["React", "SQL", "Node.js", "Express", "Tailwind CSS"],
      githubUrl: "https://github.com/zerobbreak/University-Library",
      liveUrl: "#",
    },
  ];

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
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-indigo-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 -z-10" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 -z-10" />

        <div className="container mx-auto px-6 text-center">
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 font-medium text-sm animate-fade-in-up">
            Available for hire
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight animate-fade-in-up delay-100">
            Hi, I am <span className="text-gradient">Unathi Tshuma</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto animate-fade-in-up delay-200">
            Junior Web developer / Full stack Javascript developer
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

      {/* Skills Section */}
      <section id="skills" className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Skills & Technologies
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            My technical toolkit and the technologies I love to work with.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 text-center flex flex-col items-center justify-center gap-4 group"
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
      </section>

      {/* Projects Section */}
      <section id="projects" className="container mx-auto px-6 pt-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Featured Projects
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Here are some of the projects I've worked on recently. Each one
            presented unique challenges and learning opportunities.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </section>

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
