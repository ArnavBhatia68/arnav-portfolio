export type ProjectCategory = "AI/ML" | "Full-Stack" | "Research";

export type ProjectAction = {
  label: string;
  url: string;
};

/** Which living illustration renders on the project's cover. */
export type ProjectCover = "forecast" | "queue" | "swarm" | "cipher";

export type ProjectMetric = {
  value: string;
  label: string;
};

export type Project = {
  /** Also the URL slug: /work/[id] */
  id: string;
  title: string;
  organization?: string;
  category: ProjectCategory;
  /** One sentence for cards and the case-study header. */
  tagline: string;
  summary: string;
  bullets: string[];
  tags: string[];
  metric: string;
  metrics: ProjectMetric[];
  cover: ProjectCover;
  coverCaption: string;
  primaryAction?: ProjectAction;
  githubUrl?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    id: "ai-workforce-productivity-platform",
    title: "AI Workforce Productivity Platform",
    organization: "APMAC Consulting",
    category: "Full-Stack",
    tagline:
      "Workforce analytics that puts a dollar value on productivity — and forecasts 50+ hiring scenarios with 95% confidence intervals.",
    summary:
      "AI-powered workforce analytics SaaS built with Next.js, FastAPI, and PostgreSQL to quantify employee productivity in monetary terms.",
    bullets: [
      "Built an AI-powered workforce analytics SaaS for APMAC Consulting with Next.js, FastAPI, and PostgreSQL to quantify employee productivity in monetary terms, enabling sponsors to evaluate 50+ hiring and workforce scenarios using regression forecasts with 95% confidence intervals.",
      "Engineered the Next.js–FastAPI integration layer, normalized relational schemas, and D3.js sponsor-facing dashboards for predictions, insights, and reporting, ensuring reliable end-to-end data flow across the frontend, backend, and ML services.",
      "Developed a HelpDesk ticketing system with enterprise SSO authentication and contributed to AWS deployment, cloud environment configuration, and multi-service orchestration, improving platform reliability and readiness for internal production use.",
    ],
    tags: ["Next.js", "FastAPI", "PostgreSQL", "D3.js", "AWS"],
    metric: "50+ workforce scenarios modeled with 95% CI",
    metrics: [
      { value: "50+", label: "hiring & workforce scenarios" },
      { value: "95%", label: "confidence-interval forecasts" },
    ],
    cover: "forecast",
    coverCaption: "Scenario forecasts with confidence bands",
    primaryAction: {
      label: "Live demo",
      url: "https://apmac-ai-tool-for-sales-productivit-one.vercel.app/",
    },
    featured: true,
  },
  {
    id: "queueforge",
    title: "QueueForge",
    organization: "Full-Stack Background Job Platform",
    category: "Full-Stack",
    tagline:
      "A job orchestration platform that decouples API requests from background work — Redis queues, fault-tolerant workers, live observability.",
    summary:
      "Cloud-hosted job orchestration platform using Next.js, TypeScript, FastAPI, Redis, PostgreSQL, Railway, and Vercel with distributed queue-worker architecture.",
    bullets: [
      "Architected and deployed QueueForge, a cloud-hosted job orchestration platform using Next.js, TypeScript, FastAPI, Redis, PostgreSQL, Railway, and Vercel, decoupling API request handling from background execution through a distributed queue-worker architecture.",
      "Engineered a fault-tolerant Python worker framework with Redis queue consumption, SQLAlchemy-backed persistence, and detailed execution logging, validating 150+ jobs with 97% completing in under 500 ms across webhook, text-processing, and CSV ingestion workloads.",
      "Built a real-time operations dashboard with Tailwind CSS, shadcn/ui, Zustand, and React Query, exposing live job throughput, queue depth, lifecycle state transitions, and failure diagnostics for end-to-end observability.",
    ],
    tags: ["Next.js", "TypeScript", "FastAPI", "Redis", "PostgreSQL", "Railway", "Vercel", "Tailwind CSS", "React Query", "Zustand", "shadcn/ui"],
    metric: "150+ jobs validated, 97% under 500 ms",
    metrics: [
      { value: "150+", label: "jobs validated end to end" },
      { value: "97%", label: "completed in under 500 ms" },
    ],
    cover: "queue",
    coverCaption: "Jobs flowing API → queue → workers → store",
    primaryAction: {
      label: "Live demo",
      url: "https://queue-forge-temp.vercel.app/",
    },
    githubUrl: "https://github.com/ArnavBhatia68/QueueForge-temp",
    featured: true,
  },
  {
    id: "sim-to-real-cooperative-aerial-manipulation",
    title: "Sim-to-Real Cooperative Aerial Manipulation",
    organization: "IRIS Lab",
    category: "Research",
    tagline:
      "Three quadrotors, one payload, no communication — a multi-agent RL environment built for sim-to-real transfer.",
    summary:
      "Multi-agent RL environment in MuJoCo for three Crazyflie-class quadrotors transporting a payload without inter-agent communication for sim-to-real transfer.",
    bullets: [
      "Designed a multi-agent reinforcement learning environment in MuJoCo for cooperative aerial manipulation, modeling three Crazyflie-class quadrotors transporting a payload without inter-agent communication, structured for sim-to-real policy transfer.",
      "Resolved catastrophic training instability by diagnosing unstable contact dynamics, replacing torque-level actuation with 6-DoF position control, applying ±30° attitude limits, workspace bounds, and protective cage geometry, reducing policy divergence by ~80% and achieving stable coordinated flight in simulation.",
      "Integrated custom XML-defined environments into a GPU-accelerated training pipeline with MuJoCo Warp, achieving ~2× higher rollout throughput than standard MuJoCo and enabling policy convergence in under 4 hours.",
    ],
    tags: ["Python", "MuJoCo", "MuJoCo Warp", "Reinforcement Learning"],
    metric: "~2× training throughput, convergence under 4 hours",
    metrics: [
      { value: "~80%", label: "less policy divergence" },
      { value: "~2×", label: "rollout throughput" },
      { value: "< 4 h", label: "to policy convergence" },
    ],
    cover: "swarm",
    coverCaption: "Top view: tethered formation inside workspace bounds",
    primaryAction: {
      label: "IRIS Lab",
      url: "https://irislab.tech/",
    },
    featured: true,
  },
  {
    id: "role-based-academic-help-portal",
    title: "Role-Based Academic Help Portal",
    category: "Full-Stack",
    tagline:
      "A multi-role desktop help portal with encrypted data, isolated one-time passwords and backup / restore.",
    summary:
      "Desktop multi-role application with secure authentication, encrypted data, search/filter, and backup/restore workflows.",
    bullets: [
      "Implemented secure account flows and multi-role permissions.",
      "Encrypted article/group data and added search/filter plus backup/restore with unique IDs.",
      "Hardened OTP security by moving one-time passwords to a separate store.",
      "Contributed student testing, UX screencast work, and UI consistency fixes.",
    ],
    tags: ["Java", "JavaFX", "H2", "BouncyCastle", "JUnit"],
    metric: "Secure multi-role workflows with encrypted data lifecycle",
    metrics: [
      { value: "Encrypted", label: "article & group data" },
      { value: "Isolated", label: "one-time-password store" },
    ],
    cover: "cipher",
    coverCaption: "Records encrypted at rest, gated by role",
    featured: true,
  },
];

export function getProject(id: string) {
  return projects.find((project) => project.id === id);
}
