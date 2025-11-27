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

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Unathi Tshuma - Portfolio" },
    { name: "description", content: "Welcome to my professional portfolio!" },
  ];
}

export default function Home() {
  const projects = [
    {
      title: "Snapgram",
      description:
        "A modern social media application built with React and Appwrite. Features a stunning UI with dark mode, infinite scroll feed, story functionality, and robust user authentication. Allows users to create, like, and save posts in real-time.",
      image: "/projects/snapgram.png",
      technologies: ["React", "Appwrite", "Tailwind CSS", "React Query", "TypeScript"],
      githubUrl: "https://github.com/username/snapgram",
      liveUrl: "#",
    },
    {
      title: "Job Market Agent",
      description:
        "An intelligent automated agent that streamlines the job application process. Features include automated company research, smart CV generation with DOCX export, and automated testing for reliability. Built to help developers navigate the job market efficiently.",
      image: "/projects/job-market-agent.png",
      technologies: ["Python", "Selenium", "OpenAI API", "PyTest", "python-docx"],
      githubUrl: "https://github.com/username/job-market-agent",
      liveUrl: "#",
    },
    {
      title: "EventEase - Event Management System",
      description:
        "A comprehensive event management platform that organizes event details, tracks venue bookings, and manages attendee guest lists. Features include venue capacity management, booking history, and real-time event status updates.",
      image: "/projects/event-ease.png",
      technologies: ["C#", "Asp.net", "Azure", "SSMS", "Bootstrap"],
      githubUrl: "https://github.com/username/event-ease",
      liveUrl: "#",
    },
    {
      title: "University Library System",
      description:
        "A dual-interface library management system featuring a comprehensive Admin Panel for inventory and user management, and a User Panel for book discovery and borrowing status. Built with a robust SQL database architecture for reliable data management.",
      image: "/projects/library-system.png",
      technologies: ["React", "SQL", "Node.js", "Express", "Tailwind CSS"],
      githubUrl: "https://github.com/username/library-system",
      liveUrl: "#",
    },
    {
      title: "Weather Forecast App",
      description:
        "A weather application that provides current conditions and 7-day forecasts for any location. Features include interactive maps, hourly predictions, severe weather alerts, and historical weather data comparison.",
      image: "/projects/Weather app.png",
      technologies: ["JavaScript", "React", "OpenWeather API", "Leaflet Maps", "CSS3"],
      githubUrl: "https://github.com/username/weather-app",
      liveUrl: "https://weather-forecast-demo.vercel.app",
    },
  ];

  const skills = [
    { name: "JavaScript", icon: <SiJavascript size={40} />, color: "text-yellow-400" },
    { name: "TypeScript", icon: <SiTypescript size={40} />, color: "text-blue-600" },
    { name: "Python", icon: <SiPython size={40} />, color: "text-blue-500" },
    { name: "MongoDB", icon: <SiMongodb size={40} />, color: "text-green-500" },
    { name: "HTML5", icon: <SiHtml5 size={40} />, color: "text-orange-600" },
    { name: "CSS3", icon: <SiCss3 size={40} />, color: "text-blue-500" },
    { name: "React", icon: <SiReact size={40} />, color: "text-cyan-400" },
    { name: "Node.js", icon: <SiNodedotjs size={40} />, color: "text-green-600" },
    { name: "Express", icon: <SiExpress size={40} />, color: "text-gray-900 dark:text-white" },
    { name: "Git", icon: <SiGit size={40} />, color: "text-red-500" },
  ];

  return (
    <div className="flex flex-col gap-20 pb-20">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 -z-10" />
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">Skills & Technologies</h2>
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
              <div className={`transition-transform duration-300 group-hover:scale-110 ${skill.color}`}>
                {skill.icon}
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white">{skill.name}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="container mx-auto px-6 pt-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">Featured Projects</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Here are some of the projects I've worked on recently. Each one presented unique challenges and learning opportunities.
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
                Hi I am enthusiastic and detail-oriented student with a passion
                for web development, currently pursuing studies in web
                technologies. Eager to embark on a journey into full-stack
                development, I have a solid foundation in various programming
                languages and frameworks.
              </p>
              <p>
                My journey in web development started with HTML and CSS, and
                quickly expanded to JavaScript and modern frameworks like React.
                I'm passionate about creating clean, efficient code and
                user-friendly interfaces that solve real-world problems.
              </p>
              <p>
                When I'm not coding, you can find me exploring new technologies,
                contributing to open-source projects, or expanding my knowledge
                through online courses and tech meetups.
              </p>
            </div>

            <div className="flex justify-center gap-6 mt-8">
              <a
                href="https://github.com/username"
                target="_blank"
                className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors backdrop-blur-sm"
                aria-label="GitHub Profile"
              >
                <BsGithub size={24} />
              </a>
              <a
                href="https://linkedin.com/in/username"
                target="_blank"
                className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors backdrop-blur-sm"
                aria-label="LinkedIn Profile"
              >
                <LiaLinkedin size={24} />
              </a>
              <a
                href="mailto:email@example.com"
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">Get In Touch</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Have a project in mind or just want to say hi? Fill out the form below and I'll get back to you as soon as possible.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 mb-4">
              <BiMailSend size={24} />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Email</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">contact@example.com</p>
          </div>
          <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 mb-4">
              <span className="text-xl">📍</span>
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Location</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Cape Town, South Africa</p>
          </div>
          <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 mb-4">
              <span className="text-xl">📞</span>
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Phone</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">+27 12 345 6789</p>
          </div>
        </div>

        <ContactForm />
      </section>
    </div>
  );
}
