export type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  details: string[];
  compact?: boolean;
};

export const featuredExperience: ExperienceItem[] = [
  {
    company: "Miran Informatics Pvt Ltd (B2B SaaS consultancy, 50+ enterprise clients)",
    role: "Software Engineer Intern",
    period: "Jun 2025 to Aug 2025",
    details: [
      "Engineered responsive client-facing portals and internal business dashboards using HTML5, CSS3, Bootstrap, and JavaScript, building reusable front-end components and interactive form workflows that improved usability and accelerated feature delivery across 5+ client engagements.",
      "Developed backend functionality and data workflows using REST APIs and SQL, implementing CRUD services, authentication and role-based access control, reporting/export pipelines, and resilient error-handling mechanisms while reducing production defects by 30%.",
      "Delivered 3 client-facing reporting modules end-to-end, cutting stakeholder reporting time by ~40% and earning recognition from project leads.",
    ],
  },
  {
    company: "IRIS Lab, Arizona State University",
    role: "Undergraduate Researcher",
    period: "Jan 2026 to Present",
    details: [
      "Conducted research on reinforcement learning and learning-based control for aerial and articulated robotic systems, designing simulation workflows to study policy robustness, environment stability, and sim-to-real readiness under contact-rich dynamics.",
      "Engineered experimental simulation workflows and reusable environment tooling, achieving ~2× higher throughput than standard MuJoCo environments through optimized rollout and training pipelines.",
    ],
  },
  {
    company: "Arizona State University",
    role: "Undergraduate Teaching Assistant",
    period: "Aug 2023 to Present",
    details: [
      "Supported 2,000+ students across CSE 110 and CSE 205 by leading lab sessions, debugging programming assignments, and reinforcing object-oriented programming, data structures, and core software development concepts.",
      "Developed Python automation scripts for grading and course support, reducing manual effort by 70% and standardizing evaluations.",
    ],
  },
  {
    company: "APMAC Consulting",
    role: "Intern (Capstone Project)",
    period: "Aug 2025 to Present",
    details: [
      "Architected and developed a full-stack SaaS interface bridging a Next.js reactive frontend with a high-concurrency FastAPI REST backend to quantify workforce productivity through real-time financial modeling.",
      "Engineered asynchronous data pipelines and integrated regression-based ML models to deliver predictive analytics with a 95% confidence interval.",
    ],
  },
];

export const additionalExperience: ExperienceItem[] = [
  {
    company: "Arizona State University",
    role: "Grader (Calculus I–III, Linear Algebra)",
    period: "Aug 2024 to Present",
    details: [],
    compact: true,
  },
  {
    company: "Arizona State University",
    role: "Instructional Aide (College Algebra, College Mathematics)",
    period: "Aug 2023 to Present",
    details: [],
    compact: true,
  },
  {
    company: "SAS Technologies Mohali",
    role: "Software Engineer Intern",
    period: "May 2023 to Aug 2023",
    details: [],
    compact: true,
  },
];
