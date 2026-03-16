import React from "react";

interface Experience {
  role: string;
  company: string;
  date: string;
  current: boolean;
  description: string[];
  tech: string[];
}

const experiences: Experience[] = [
  {
    role: "Computer Science Tutor",
    company: "IIE Varsity College Waterfall",
    date: "Jan 2023 — Present",
    current: true,
    description: [
      "Provide one-on-one and group –technical support for 40+ undergraduate students– across Web Development and Computer Science modules",
      "Designed and facilitated –5 interactive workshops– covering topics like REST APIs, React fundamentals, and database integration — resulting in a –25% increase in pass rates–",
      "Mentor students through –full-stack capstone projects–, guiding architecture decisions, debugging sessions, and code quality reviews",
      "Bridge the gap between theory and practice by creating –real-world coding exercises– aligned with industry standards"
    ],
    tech: ["Mentoring", "React.js", "Node.js", "REST APIs", "Workshop Facilitation", "Code Review"]
  },
  {
    role: "Full Stack Developer",
    company: "Hive Experience (Industry Partnership Program)",
    date: "2024",
    current: false,
    description: [
      "Selected to participate in –Hive–, a structured industry collaboration program that pairs students with real companies to build –production-ready applications– from scratch",
      "Assigned to a company brief and responsible for delivering a –full-stack solution end-to-end– — from requirements gathering through to deployment",
      "Worked under –industry mentors–, receiving feedback on code quality, system design decisions, and professional development practices",
      "Collaborated in a –small team environment– simulating a real dev team, managing version control, task delegation, and peer code reviews"
    ],
    tech: ["Full-Stack Development", "Client Briefs", "System Architecture", "Agile/Scrum", "Mentorship", "Team Collaboration"]
  },
  {
    role: "Independent Developer",
    company: "Open Source & Freelance Projects",
    date: "2023 — Present",
    current: true,
    description: [
      "Architected and deployed –Crisis Connect–, an AI-powered early warning system using Python and FastAPI, achieving –85% disaster prediction accuracy–",
      "Built –Job Market Agent–, a full-stack automation tool using Python, Selenium, and OpenAI API that generates –tailored CVs– and tracks applications",
      "Maintained production deployments on –Vercel and Microsoft Azure–, managing CI/CD pipelines and serverless functions across live applications",
      "Reduced cloud hosting costs by –30%– through serverless architecture decisions on –Azure Functions– and Table Storage"
    ],
    tech: ["Python", "FastAPI", "OpenAI API", "Azure", "Vercel", "CI/CD", "Selenium"]
  },
  {
    role: "Frontend Developer Intern",
    company: "Cyber-mint",
    date: "Sep 2023 — Nov 2023",
    current: false,
    description: [
      "Developed and maintained –responsive user interfaces– using React.js, ensuring cross-browser compatibility and –mobile-first design–",
      "Collaborated closely with backend engineers to integrate –RESTful API endpoints–, cutting data retrieval time by –30%–",
      "Participated in weekly –Agile sprint reviews–, identifying and resolving –15+ critical bugs– that improved application stability",
      "Contributed to –component library documentation–, improving onboarding time for new developers joining the team"
    ],
    tech: ["React.js", "REST APIs", "Responsive UI", "Agile/Scrum", "Code Review", "Component Libraries"]
  },
  {
    role: "Student Developer",
    company: "IIE Varsity College Waterfall",
    date: "Jan 2023 — Present",
    current: true,
    description: [
      "Completing a –Bachelor of Computer and Information Sciences– with focus on full-stack development, cloud services, and Agile methodologies",
      "Previously graduated the –Higher Certificate in Web Development– with –5 distinctions–",
      "Built and deployed a –full Instagram Clone– as a capstone project covering authentication, database integration, and responsive UI/UX",
      "Consistently applied academic learning to –live projects–, bridging coursework with real-world deployment on cloud platforms"
    ],
    tech: ["Full-Stack Development", "Cloud Services", "Agile", "Academic Projects"]
  }
];

const WorkExperience: React.FC = () => {
  return (
    <section id="experience" className="container mx-auto px-6 py-20 relative overflow-hidden">
      {/* Header */}
      <div className="mb-20">
        <span className="text-[12px] uppercase tracking-widest text-muted-foreground font-semibold mb-3 block">
          Career
        </span>
        <h2 className="text-[26px] font-bold text-foreground mb-3">
          Work Experience
        </h2>
        <p className="text-[14px] text-muted-foreground max-w-2xl leading-relaxed">
          A collection of my professional roles, industry collaborations, and key academic achievements that demonstrate my growth as a developer.
        </p>
      </div>

      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-[7.5px] top-2 bottom-2 w-px bg-border/60" />

        <div className="space-y-16">
          {experiences.map((exp, index) => (
            <div key={index} className="relative pl-12 group">
              {/* Dot Marker */}
              <div 
                className={`absolute left-0 top-2 w-[16px] h-[16px] rounded-full border-2 border-brand-primary z-10 transition-transform duration-300 group-hover:scale-125
                  ${exp.current ? 'bg-brand-primary shadow-[0_0_0_4px_rgba(99,102,241,0.1)]' : 'bg-background'}`}
              />
              
              {/* Card */}
              <div className="bg-secondary/20 dark:bg-secondary/10 border-[0.5px] border-border rounded-[12px] p-8 transition-all duration-300 hover:border-brand-primary/40 hover:bg-secondary/30 relative">
                {/* Date Badge */}
                <div className="md:absolute top-8 right-8 mb-4 md:mb-0 inline-block px-3 py-1 rounded-full bg-background/50 border-[0.5px] border-border backdrop-blur-sm">
                  <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-tight">
                    {exp.date}
                  </span>
                </div>

                {/* Role & Company */}
                <div className="mb-6">
                  <h3 className="text-[16px] font-bold text-foreground mb-1.5 group-hover:text-brand-primary transition-colors">
                    {exp.role}
                  </h3>
                  <p className="text-[14px] text-brand-primary font-semibold tracking-wide">
                    {exp.company}
                  </p>
                </div>

                {/* Description */}
                <ul className="space-y-4 mb-8">
                  {exp.description.map((desc, i) => {
                    const parts = desc.split("–");
                    return (
                      <li key={i} className="text-[13px] text-muted-foreground/90 leading-[1.6] flex items-start text-left">
                        <span className="text-brand-primary mt-1 mr-3 shrink-0 font-bold opacity-80">–</span>
                        <div>
                          {parts.map((part, pidx) => (
                            pidx % 2 === 1 ? (
                              <strong key={pidx} className="text-brand-primary font-bold">{part}</strong>
                            ) : (
                              <span key={pidx}>{part}</span>
                            )
                          ))}
                        </div>
                      </li>
                    );
                  })}
                </ul>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2.5">
                  {exp.tech.map((skill, si) => (
                    <span 
                      key={si}
                      className="px-3.5 py-1.5 rounded-full bg-background/40 text-[11px] font-medium text-muted-foreground border-[0.5px] border-border transition-all duration-300 hover:bg-brand-primary hover:text-white hover:border-brand-primary"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkExperience;
