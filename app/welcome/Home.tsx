import { useState } from "react";
import { BiMailSend } from "react-icons/bi";
import { BsGithub } from "react-icons/bs";
import {
  DiCss3,
  DiGithub,
  DiHtml5,
  DiJavascript,
  DiMongodb,
  DiNodejs,
  DiPython,
  DiReact,
} from "react-icons/di";
import { GiTBrick } from "react-icons/gi";
import { LiaLinkedin } from "react-icons/lia";
import { SiExpress, SiTypescript } from "react-icons/si";
import ContactForm from "~/components/ContactForm";
import ProjectCard from "~/components/ProjectCard";

export function Welcome() {
  const [isOpen, setIsOpen] = useState(false);
  const skills = [
    { name: "JavaScript", icon: <DiJavascript size={60} /> },
    { name: "TypeScript", icon: <SiTypescript size={60} /> },
    { name: "Python", icon: <DiPython size={60} /> },
    { name: "MongoDB", icon: <DiMongodb size={60} /> },
    { name: "HTML5", icon: <DiHtml5 size={60} /> },
    { name: "CSS3", icon: <DiCss3 size={60} /> },
    { name: "React", icon: <DiReact size={60} /> },
    { name: "Node.js", icon: <DiNodejs size={60} /> },
    { name: "Express", icon: <SiExpress /> },
    { name: "Git", icon: <DiGithub size={60} /> },
  ];

  const projects = [
    {
      title: "EventEase - Event Management System",
      description:
        "A full-stack web application designed to mimic the core functionality of Instagram, providing users with a platform to share photos, connect with friends, and engage with a community. The project encompasses user authentication, user profiles, and the ability to create, view, and interact with posts.",
      image: "/projects/Signup.png",
      technologies: [
        "C#",
        "Asp.net",
        "Azure",
        "SSMS",
        "Bootstrap",
      ],
      githubUrl: "https://github.com/username/instagram-clone",
      liveUrl: "https://instagram-clone-demo.vercel.app",
    },
    {
      title: "Threads-clone",
      description:
        "A comprehensive admin dashboard for e-commerce businesses with real-time analytics, inventory management, order processing, and customer data visualization. Features include customizable widgets, dark/light mode, and responsive design for all devices.",
      image: "/projects/Signup.png",
      technologies: [
        "React",
        "Next.js",
        "Chart.js",
        "Tailwind CSS",
        "Supabase",
        "Stripe API",
      ],
      githubUrl: "https://github.com/username/ecommerce-dashboard",
      liveUrl: "https://ecommerce-dashboard-demo.vercel.app",
    },
    {
      title: "Task Management App",
      description:
        "A productivity application that helps users organize tasks with features like drag-and-drop organization, priority levels, due dates, and team collaboration. Includes email notifications, recurring tasks, and progress tracking.",
      image: "/projects/task-management.jpg",
      technologies: [
        "JavaScript",
        "React",
        "Redux",
        "Node.js",
        "MongoDB",
        "Socket.io",
      ],
      githubUrl: "https://github.com/username/task-management",
      liveUrl: "https://task-app-demo.vercel.app",
    },
    {
      title: "Weather Forecast App",
      description:
        "A weather application that provides current conditions and 7-day forecasts for any location. Features include interactive maps, hourly predictions, severe weather alerts, and historical weather data comparison.",
      image: "/projects/Weather.png",
      technologies: [
        "JavaScript",
        "React",
        "OpenWeather API",
        "Leaflet Maps",
        "CSS3",
      ],
      githubUrl: "https://github.com/username/weather-app",
      liveUrl: "https://weather-forecast-demo.vercel.app",
    },
    {
      title: "Real-time Chat Application",
      description:
        "A messaging platform that enables instant communication between users with features like private messaging, group chats, file sharing, and read receipts. Supports emoji reactions, message editing, and voice messages.",
      image: "/projects/chat-app.jpg",
      technologies: [
        "TypeScript",
        "React",
        "Firebase",
        "WebSockets",
        "Material UI",
      ],
      githubUrl: "https://github.com/username/chat-application",
      liveUrl: "https://chat-app-demo.vercel.app",
    },
    {
      title: "Personal Finance Tracker",
      description:
        "A financial management tool that helps users track income, expenses, and savings goals. Features include budget categories, expense visualization, recurring transaction setup, and financial goal tracking with progress indicators.",
      image: "/projects/finance-tracker.jpg",
      technologies: [
        "React",
        "Node.js",
        "Express",
        "MongoDB",
        "D3.js",
        "Plaid API",
      ],
      githubUrl: "https://github.com/username/finance-tracker",
      liveUrl: "https://finance-tracker-demo.vercel.app",
    },
  ];

  return (
    <div>
      <div>
        <nav className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex-shrink-0">
                <a href="/" className="text-white font-bold text-xl">
                  UT
                </a>
              </div>

              {/* Desktop menu */}
              <div className="hidden md:block">
                <div className="ml-10 flex items-center space-x-8">
                  <a
                    href="#about"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    About
                  </a>
                  <a
                    href="#skills"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Skills
                  </a>
                  <a
                    href="#projects"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Projects
                  </a>
                  <a
                    href="#contact"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Contact
                  </a>
                  <a
                    href="/resume.pdf"
                    target="_blank"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md transition-colors"
                    rel="noreferrer"
                  >
                    Resume
                  </a>
                </div>
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="text-gray-400 hover:text-white"
                >
                  {/* {isOpen ? <X size={24} /> : <Menu size={24} />} */}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          {isOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-black/90">
                <a
                  href="#about"
                  className="block px-3 py-2 text-gray-300 hover:text-white"
                  onClick={() => setIsOpen(false)}
                >
                  About
                </a>
                <a
                  href="#skills"
                  className="block px-3 py-2 text-gray-300 hover:text-white"
                  onClick={() => setIsOpen(false)}
                >
                  Skills
                </a>
                <a
                  href="#projects"
                  className="block px-3 py-2 text-gray-300 hover:text-white"
                  onClick={() => setIsOpen(false)}
                >
                  Projects
                </a>
                <a
                  href="#contact"
                  className="block px-3 py-2 text-gray-300 hover:text-white"
                  onClick={() => setIsOpen(false)}
                >
                  Contact
                </a>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  className="block px-3 py-2 bg-emerald-600 text-white rounded-md mt-4"
                  onClick={() => setIsOpen(false)}
                  rel="noreferrer"
                >
                  Resume
                </a>
              </div>
            </div>
          )}
        </nav>
      </div>
      <section className="relative min-h-screen flex items-center justify-center">
        {/* Keep the existing background image */}
        <div className="absolute inset-0 bg-black/30 z-10" />

        <div className="container mx-auto px-4 z-20 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 animate-fadeIn">
            Hi I am Unathi Tshuma
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 animate-fadeIn animation-delay-200">
            Junior Web developer / Full stack Javascript developer
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fadeIn animation-delay-400">
            <a
              href="#projects"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-md transition-colors"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="bg-transparent hover:bg-white/10 text-white border border-white px-8 py-3 rounded-md transition-colors"
            >
              Contact Me
            </a>
          </div>

          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
            <a href="#about" aria-label="Scroll down">
              {/* <ArrowDown className="h-8 w-8 text-white" /> */}
            </a>
          </div>
        </div>
      </section>

      <section id="about" className="py-20 bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <div className="rounded-lg overflow-hidden border border-gray-800">
                <img
                  src="/about-section.jpg"
                  alt="Code editor screenshot"
                  className="w-full h-auto"
                />
              </div>
            </div>

            <div className="md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                About me
              </h2>

              <p className="text-gray-300 mb-6">
                Hi I am enthusiastic and detail-oriented student with a passion
                for web development, currently pursuing studies in web
                technologies. Eager to embark on a journey into full-stack
                development, I have a solid foundation in various programming
                languages and frameworks.
              </p>

              <p className="text-gray-300 mb-6">
                My journey in web development started with HTML and CSS, and
                quickly expanded to JavaScript and modern frameworks like React.
                I'm passionate about creating clean, efficient code and
                user-friendly interfaces that solve real-world problems.
              </p>

              <p className="text-gray-300 mb-8">
                When I'm not coding, you can find me exploring new technologies,
                contributing to open-source projects, or expanding my knowledge
                through online courses and tech meetups.
              </p>

              <div className="flex gap-4">
                <a
                  href="https://github.com/username"
                  target="_blank"
                  className="bg-gray-900 hover:bg-gray-800 p-3 rounded-full transition-colors"
                  aria-label="GitHub Profile"
                >
                  <BsGithub size={30} />
                </a>
                <a
                  href="https://linkedin.com/in/username"
                  target="_blank"
                  className="bg-gray-900 hover:bg-gray-800 p-3 rounded-full transition-colors"
                  aria-label="LinkedIn Profile"
                >
                  <LiaLinkedin size={30} />
                </a>
                <a
                  href="mailto:email@example.com"
                  className="bg-gray-900 hover:bg-gray-800 p-3 rounded-full transition-colors"
                  aria-label="Email Me"
                >
                  <BiMailSend size={30} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="skills" className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-16">
            Skills
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
            {skills.map((skill, index) => (
              <div key={index} className="flex flex-col items-center group">
                <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 hover:border-emerald-500 transition-all duration-300 w-full flex items-center justify-center">
                  {skill.icon}
                </div>
                <span className="mt-3 text-gray-400 group-hover:text-white transition-colors">
                  {skill.name}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <h3 className="text-xl font-semibold text-white mb-4">
              Skill Level
            </h3>
            <div className="max-w-2xl mx-auto grid gap-4">
              <div className="flex items-center">
                <span className="text-gray-400 w-32">Frontend</span>
                <div className="flex-1 bg-gray-800 h-4 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-500 h-full rounded-full"
                    style={{ width: "85%" }}
                  ></div>
                </div>
                <span className="text-gray-400 w-12 text-right">85%</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-400 w-32">Backend</span>
                <div className="flex-1 bg-gray-800 h-4 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-500 h-full rounded-full"
                    style={{ width: "75%" }}
                  ></div>
                </div>
                <span className="text-gray-400 w-12 text-right">75%</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-400 w-32">Database</span>
                <div className="flex-1 bg-gray-800 h-4 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-500 h-full rounded-full"
                    style={{ width: "70%" }}
                  ></div>
                </div>
                <span className="text-gray-400 w-12 text-right">70%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-16">
            My Projects
          </h2>

          <div className="grid gap-12">
            {projects.map((project, index) => (
              <ProjectCard
                key={index}
                title={project.title}
                description={project.description}
                image={project.image}
                technologies={project.technologies}
                githubUrl={project.githubUrl}
                liveUrl={project.liveUrl}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 bg-gray-950 relative">
        {/* Code background - similar to what's in your current site */}
        <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
          <img
            src="/contact-section.jpg"
            alt="Contact me"
            className="w-full h-full object-cover"
            aria-hidden="true"
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-16">
            Contact me
          </h2>

          <div className="flex flex-col md:flex-row gap-12 items-start">
            <div className="md:w-1/2">
              <div className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-lg border border-gray-800">
                <h3 className="text-xl font-semibold text-white mb-6">
                  Get in touch
                </h3>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-emerald-900/50 p-3 rounded-full">
                      {/* <Mail className="h-6 w-6 text-emerald-400" /> */}
                    </div>
                    <div>
                      <h4 className="text-white font-medium">Email</h4>
                      <p className="text-gray-400">contact@example.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-emerald-900/50 p-3 rounded-full">
                      {/* <MapPin className="h-6 w-6 text-emerald-400" /> */}
                    </div>
                    <div>
                      <h4 className="text-white font-medium">Location</h4>
                      <p className="text-gray-400">Cape Town, South Africa</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-emerald-900/50 p-3 rounded-full">
                      {/* <Phone className="h-6 w-6 text-emerald-400" /> */}
                    </div>
                    <div>
                      <h4 className="text-white font-medium">Phone</h4>
                      <p className="text-gray-400">+27 12 345 6789</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:w-1/2">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
