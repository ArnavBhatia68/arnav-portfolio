export type SupportingDocument = {
  label: string;
  fileUrl?: string;
};

export type ExperienceItem = {
  id: string;
  title: string;
  organization: string;
  role: string;
  dates: string;
  location?: string;
  summary: string;
  bullets: string[];
  tags: string[];
  referenceLabel?: string;
  referenceName?: string;
  referenceEmail?: string;
  supportingDocuments?: SupportingDocument[];
};

export const experiences: ExperienceItem[] = [
  {
    id: "miran-informatics",
    title: "Software Engineer Intern",
    organization: "Miran Informatics Pvt Ltd (B2B SaaS consultancy, 50+ enterprise clients)",
    role: "Software Engineer Intern",
    dates: "Jun 2025 - Aug 2025",
    summary: "Built client portals + dashboards and shipped reporting modules with measurable delivery impact.",
    bullets: [
      "Engineered responsive client-facing portals and internal business dashboards using HTML5, CSS3, Bootstrap, and JavaScript, building reusable front-end components and interactive form workflows that improved usability and accelerated feature delivery across 5+ client engagements.",
      "Developed backend functionality and data workflows using REST APIs and SQL, implementing CRUD services, authentication and role-based access control, reporting/export pipelines, and resilient error-handling mechanisms while reducing production defects by 30%.",
      "Delivered 3 client-facing reporting modules end-to-end, cutting stakeholder reporting time by ~40% and earning recognition from project leads.",
    ],
    tags: ["HTML5", "CSS3", "Bootstrap", "JavaScript", "REST APIs", "SQL"],
    referenceLabel: "Point of Contact",
    referenceName: "Available upon request",
    referenceEmail: "reference-coming-soon@example.com",
    supportingDocuments: [{ label: "Letter of Appreciation", fileUrl: "/docs/letters/miran-appreciation.pdf" }],
  },
  {
    id: "iris-lab",
    title: "Undergraduate Researcher",
    organization: "IRIS Lab, Arizona State University",
    role: "Undergraduate Researcher",
    dates: "Jan 2026 - Present",
    summary: "Designed robust RL simulation workflows for aerial manipulation with higher-throughput training.",
    bullets: [
      "Conducted research on reinforcement learning and learning-based control for aerial and articulated robotic systems, designing simulation workflows to study policy robustness, environment stability, and sim-to-real readiness under contact-rich dynamics.",
      "Engineered experimental simulation workflows and reusable environment tooling, achieving ~2× higher throughput than standard MuJoCo environments through optimized rollout and training pipelines.",
    ],
    tags: ["Reinforcement Learning", "MuJoCo", "Simulation", "Robotics"],
    referenceLabel: "Reference",
    referenceName: "Available upon request",
    referenceEmail: "reference-coming-soon@example.com",
  },
  {
    id: "asu-ta",
    title: "Undergraduate Teaching Assistant",
    organization: "Arizona State University",
    role: "Undergraduate Teaching Assistant",
    dates: "Aug 2023 - Present",
    summary: "Supported 2,000+ students and automated grading workflows to improve consistency and speed.",
    bullets: [
      "Supported 2,000+ students across CSE 110 and CSE 205 by leading lab sessions, debugging programming assignments, and reinforcing object-oriented programming, data structures, and core software development concepts.",
      "Developed Python automation scripts for grading and course support, reducing manual effort by 70% and standardizing evaluations.",
    ],
    tags: ["Teaching", "Python Automation", "Data Structures", "OOP"],
    referenceLabel: "Point of Contact",
    referenceName: "Available upon request",
    referenceEmail: "reference-coming-soon@example.com",
  },
  {
    id: "apmac-consulting",
    title: "Intern (Capstone Project)",
    organization: "APMAC Consulting",
    role: "Intern (Capstone Project)",
    dates: "Aug 2025 - Present",
    summary: "Built SaaS analytics workflows linking Next.js + FastAPI with predictive ML modeling.",
    bullets: [
      "Architected and developed a full-stack SaaS interface bridging a Next.js reactive frontend with a high-concurrency FastAPI REST backend to quantify workforce productivity through real-time financial modeling.",
      "Engineered asynchronous data pipelines and integrated regression-based ML models to deliver predictive analytics with a 95% confidence interval.",
    ],
    tags: ["Next.js", "FastAPI", "ML", "Async Pipelines"],
    referenceLabel: "Point of Contact",
    referenceName: "Available upon request",
    referenceEmail: "reference-coming-soon@example.com",
  },
  {
    id: "asu-grader",
    title: "Grader (Calculus I–III, Linear Algebra)",
    organization: "Arizona State University",
    role: "Grader (Calculus I–III, Linear Algebra)",
    dates: "Aug 2024 - Present",
    summary: "Delivered rubric-consistent grading and feedback loops across high-enrollment math sections.",
    bullets: [
      "Graded exams, quizzes, and homework for Calculus I/II/III and Linear Algebra, applying consistent rubric-based evaluation across high-enrollment sections.",
      "Delivered concise feedback and identified recurring misconception patterns to help instructors target review and refine assessment alignment.",
    ],
    tags: ["Assessment", "Rubrics", "Instructional Support"],
    referenceLabel: "Reference",
    referenceName: "Available upon request",
    referenceEmail: "reference-coming-soon@example.com",
  },
  {
    id: "asu-instructional-aide",
    title: "Instructional Aide (College Algebra, College Mathematics)",
    organization: "Arizona State University",
    role: "Instructional Aide (College Algebra, College Mathematics)",
    dates: "Aug 2023 - Present",
    summary: "Provided real-time classroom support and concept reinforcement for 1,000+ students.",
    bullets: [
      "Supported 1000+ students over 3 years by providing real-time in-class help, answering questions, and guiding problem-solving to keep lectures engaging and on pace.",
      "Strengthened student outcomes by clarifying core algebra/precalculus concepts and offering structured support that improved confidence and participation.",
    ],
    tags: ["Student Support", "Instruction", "Math Education"],
    referenceLabel: "Point of Contact",
    referenceName: "Available upon request",
    referenceEmail: "reference-coming-soon@example.com",
  },
  {
    id: "sas-technologies",
    title: "Software Engineer Intern",
    organization: "SAS Technologies Mohali",
    role: "Software Engineer Intern",
    dates: "May 2023 - Aug 2023",
    summary: "Contributed to client web features and SQL-driven reporting workflows in agile delivery.",
    bullets: [
      "Contributed to development and feature enhancements of client web applications, implementing responsive UI updates and supporting backend feature work in an Agile delivery cycle.",
      "Supported analytics and reporting workflows by extracting and organizing application/customer data using SQL and dashboarding tools, enabling marketing and business teams to act on insights.",
    ],
    tags: ["Frontend", "Backend", "SQL", "Agile"],
    referenceLabel: "Point of Contact",
    referenceName: "Available upon request",
    referenceEmail: "reference-coming-soon@example.com",
    supportingDocuments: [{ label: "Letter of Appreciation", fileUrl: "/docs/letters/sas-appreciation.pdf" }],
  },
];
