export const profile = {
  name: "Arnav Bhatia",
  headline: "Computer Science @ ASU | Full-Stack Software Engineer",
  intro:
    "Results-driven Computer Science student with strong foundations in data structures, algorithms, and systems programming. Hands-on experience building AI-powered applications, backend services, and full-stack tools across academic, research, and industry settings. Seeking software engineering roles focused on scalable, high-availability, performance-sensitive distributed systems.",
  location: "Tempe, AZ",
  timeZone: "America/Phoenix",
  email: "abhati35@asu.edu",
  phone: "+1 480 764 7520",
  github: "https://github.com/ArnavBhatia68/",
  linkedin: "https://www.linkedin.com/in/bhatiaarnav/",
  resumePath: "/docs/resume/ArnavBhatia_CSResume_13.pdf",
  transcriptPath: "/docs/transcript/ArnavBhatia_Transcript.pdf",
  opportunityCta: "Open to SWE / ML / research roles",
} as const;

/** Hero copy. The lead is the one sentence a recruiter should remember. */
export const hero = {
  eyebrow: "Software engineer · CS @ Arizona State",
  lead: "I build reliable full-stack products and distributed backends — and research learning-based control for quadrotors that carry things together.",
  meta: ["B.S. Computer Science", "Arizona State University", "4.0 GPA"],
} as const;

/** Pull quote that opens the About section. *italic* and ==accent== are supported. */
export const statement =
  "I study computer science at Arizona State. Most weeks that means *building software*, *leading CS labs* and *grading calculus* — ==often all at once.==";

export const aboutNarrative =
  "I’m a Computer Science student at Arizona State University with a strong interest in software engineering, distributed systems, and building reliable full-stack products. My experience spans backend services, AI-powered applications, and cloud-deployed tools across academic, research, and industry settings. Beyond engineering projects, I’ve supported 2,000+ students as a teaching assistant, which strengthened my ability to explain complex technical ideas clearly and work effectively with diverse teams. I’ve also contributed to robotics research at IRIS Lab, where I’ve built simulation and reinforcement learning workflows for aerial manipulation systems. Across projects, teaching, and research, I aim to build scalable, high-impact software while continuing to grow as an engineer.";

export const education = {
  school: "Arizona State University",
  degree: "Bachelor of Science in Computer Science",
  dates: "Aug 2022 – May 2026",
  gpa: "4.0/4.0",
  location: "Tempe, AZ",
};

export const facts = [
  { label: "Education", value: "B.S. Computer Science, Arizona State University, 2022 – 2026" },
  { label: "GPA", value: "4.0 / 4.0 · Dean’s List, six semesters" },
  { label: "Focus", value: "Distributed systems · Full-stack products · RL for robotics" },
  { label: "Currently", value: "IRIS Lab researcher · APMAC capstone · ASU teaching" },
  { label: "Based in", value: "Tempe, Arizona" },
  { label: "Open to", value: "Software engineering, ML and research roles" },
] as const;

/** Headline numbers. Every figure comes from the experience/project data. */
export const telemetry = [
  { value: 4, decimals: 1, prefix: "", suffix: "", label: "GPA", note: "B.S. Computer Science, ASU" },
  { value: 2000, decimals: 0, prefix: "", suffix: "+", label: "Students supported", note: "CSE 110 & CSE 205 labs" },
  { value: 97, decimals: 0, prefix: "", suffix: "%", label: "Jobs under 500 ms", note: "QueueForge, 150+ jobs" },
  { value: 2, decimals: 0, prefix: "~", suffix: "×", label: "Rollout throughput", note: "MuJoCo Warp, IRIS Lab" },
  { value: 70, decimals: 0, prefix: "", suffix: "%", label: "Less manual grading", note: "Python automation" },
  { value: 6, decimals: 0, prefix: "", suffix: "×", label: "Dean’s List", note: "Fall 2022 – Fall 2025" },
] as const;

export const coursework = [
  "Data Structures and Algorithms",
  "Operating Systems",
  "Software Engineering",
  "Artificial Intelligence",
  "Machine Learning",
  "Natural Language Processing",
  "Database Management",
  "Applied Computational Methods",
  "Cybersecurity",
  "Human-Computer Interaction",
] as const;
