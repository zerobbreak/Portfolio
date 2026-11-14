/** "YYYY-MM". */
export type YearMonth = `${number}-${string}`;

export interface Role {
  /** Git branch name shown in the graph, e.g. "cyber-mint". */
  branch: string;
  role: string;
  company: string;
  start: YearMonth;
  /** `null` while the role is ongoing: the branch stays open up to HEAD. */
  end: YearMonth | null;
  /** "year" when only the year is known, so dates render as "2024", not "JAN 2024". */
  precision?: "month" | "year";
  /** The main line every other role branches off. Exactly one role should set this. */
  trunk?: boolean;
  /** Commit message for the row where the role starts. */
  startMsg: string;
  /** Commit message for the merge row where the role ends. */
  endMsg?: string;
  /** Wrap highlights in en dashes: "lifted pass rates by –25%–". */
  description: string[];
  tech: string[];
}

export const roles: Role[] = [
  {
    branch: "tutor",
    role: "Computer Science Tutor",
    company: "IIE Varsity College Waterfall",
    start: "2023-01",
    end: null,
    startMsg: "start tutoring CS and web dev students",
    description: [
      "Provide one-on-one and group –technical support for 40+ undergraduate students– across Web Development and Computer Science modules",
      "Designed and facilitated –5 interactive workshops– covering topics like REST APIs, React fundamentals, and database integration — resulting in a –25% increase in pass rates–",
      "Mentor students through –full-stack capstone projects–, guiding architecture decisions, debugging sessions, and code quality reviews",
      "Bridge the gap between theory and practice by creating –real-world coding exercises– aligned with industry standards",
    ],
    tech: ["Mentoring", "React.js", "Node.js", "REST APIs", "Workshop Facilitation", "Code Review"],
  },
  {
    branch: "hive",
    role: "Full Stack Developer",
    company: "Hive Experience (Industry Partnership Program)",
    start: "2024-01",
    end: "2024-12",
    precision: "year",
    startMsg: "selected for the Hive industry program",
    endMsg: "full-stack client solution delivered end to end",
    description: [
      "Selected to participate in –Hive–, a structured industry collaboration program that pairs students with real companies to build –production-ready applications– from scratch",
      "Assigned to a company brief and responsible for delivering a –full-stack solution end-to-end– — from requirements gathering through to deployment",
      "Worked under –industry mentors–, receiving feedback on code quality, system design decisions, and professional development practices",
      "Collaborated in a –small team environment– simulating a real dev team, managing version control, task delegation, and peer code reviews",
    ],
    tech: ["Full-Stack Development", "Client Briefs", "System Architecture", "Agile/Scrum", "Mentorship", "Team Collaboration"],
  },
  {
    branch: "indie",
    role: "Independent Developer",
    company: "Open Source & Freelance Projects",
    start: "2023-01",
    end: null,
    precision: "year",
    startMsg: "first freelance and open-source builds",
    description: [
      "Architected and deployed –Crisis Connect–, an AI-powered early warning system using Python and FastAPI, achieving –85% disaster prediction accuracy–",
      "Built –Job Market Agent–, a full-stack automation tool using Python, Selenium, and OpenAI API that generates –tailored CVs– and tracks applications",
      "Maintained production deployments on –Vercel and Microsoft Azure–, managing CI/CD pipelines and serverless functions across live applications",
      "Reduced cloud hosting costs by –30%– through serverless architecture decisions on –Azure Functions– and Table Storage",
    ],
    tech: ["Python", "FastAPI", "OpenAI API", "Azure", "Vercel", "CI/CD", "Selenium"],
  },
  {
    branch: "cyber-mint",
    role: "Frontend Developer Intern",
    company: "Cyber-mint",
    start: "2023-09",
    end: "2023-11",
    startMsg: "frontend internship",
    endMsg: "15+ bugs fixed, data retrieval 30% faster",
    description: [
      "Developed and maintained –responsive user interfaces– using React.js, ensuring cross-browser compatibility and –mobile-first design–",
      "Collaborated closely with backend engineers to integrate –RESTful API endpoints–, cutting data retrieval time by –30%–",
      "Participated in weekly –Agile sprint reviews–, identifying and resolving –15+ critical bugs– that improved application stability",
      "Contributed to –component library documentation–, improving onboarding time for new developers joining the team",
    ],
    tech: ["React.js", "REST APIs", "Responsive UI", "Agile/Scrum", "Code Review", "Component Libraries"],
  },
  {
    branch: "student",
    role: "Student Developer",
    company: "IIE Varsity College Waterfall",
    start: "2023-01",
    end: null,
    trunk: true,
    startMsg: "Initial commit: enrol in BCIS at Varsity College",
    description: [
      "Completing a –Bachelor of Computer and Information Sciences– with focus on full-stack development, cloud services, and Agile methodologies",
      "Previously graduated the –Higher Certificate in Web Development– with –5 distinctions–",
      "Built and deployed a –full Instagram Clone– as a capstone project covering authentication, database integration, and responsive UI/UX",
      "Consistently applied academic learning to –live projects–, bridging coursework with real-world deployment on cloud platforms",
    ],
    tech: ["Full-Stack Development", "Cloud Services", "Agile", "Academic Projects"],
  },
];
