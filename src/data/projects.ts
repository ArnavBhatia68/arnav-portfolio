// src/data/projects.ts

export type Project = {
  slug: string;
  title: string;
  oneLiner: string;
  tech: string[];
  href?: string; // link to detail page
};

export const projects: Project[] = [
  {
    slug: "apmac-mvp",
    title: "APMAC — AI Productivity MVP",
    oneLiner: "Frontend deploy + result screen + API integration; shipped usable prototype.",
    tech: ["Next.js", "TypeScript", "Tailwind"],
    href: "/projects/apmac-mvp",
  },
  {
    slug: "instruction-tuned-ai-assistant",
    title: "Instruction-Tuned AI Assistant",
    oneLiner: "LoRA-tuned LLM + FastAPI inference with safety refusals.",
    tech: ["Python", "PyTorch", "Transformers", "LoRA", "FastAPI"],
    href: "/projects/instruction-tuned-ai-assistant",
  },
  {
    slug: "role-based-academic-portal",
    title: "Role-Based Academic Help Portal",
    oneLiner: "Multi-role app with secure auth, encrypted data, search/filter, backups.",
    tech: ["Java", "JavaFX", "H2", "BouncyCastle", "JUnit"],
    href: "/projects/role-based-academic-portal",
  },
  {
    slug: "sentiment-analysis-tool",
    title: "Sentiment Analysis Tool",
    oneLiner: "Flask + scikit-learn tool for text and CSV batch sentiment with metrics.",
    tech: ["Python", "Flask", "scikit-learn"],
    href: "/projects/sentiment-analysis-tool",
  },
];
