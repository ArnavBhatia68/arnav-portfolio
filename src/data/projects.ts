export type ProjectCategory = "AI/ML" | "Full-Stack" | "Research";

export type Project = {
  id: string;
  title: string;
  organization?: string;
  category: ProjectCategory;
  summary: string;
  bullets: string[];
  tags: string[];
  metric: string;
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    id: "ai-workforce-productivity-platform",
    title: "AI Workforce Productivity Platform",
    organization: "APMAC Consulting",
    category: "Full-Stack",
    summary:
      "AI-powered workforce analytics SaaS built with Next.js, FastAPI, and PostgreSQL to quantify employee productivity in monetary terms.",
    bullets: [
      "Built an AI-powered workforce analytics SaaS for APMAC Consulting with Next.js, FastAPI, and PostgreSQL to quantify employee productivity in monetary terms, enabling sponsors to evaluate 50+ hiring and workforce scenarios using regression forecasts with 95% confidence intervals.",
      "Engineered the Next.js–FastAPI integration layer, normalized relational schemas, and D3.js sponsor-facing dashboards for predictions, insights, and reporting, ensuring reliable end-to-end data flow across the frontend, backend, and ML services.",
      "Developed a HelpDesk ticketing system with enterprise SSO authentication and contributed to AWS deployment, cloud environment configuration, and multi-service orchestration, improving platform reliability and readiness for internal production use.",
    ],
    tags: ["Next.js", "FastAPI", "PostgreSQL", "D3.js", "AWS"],
    metric: "50+ workforce scenarios modeled with 95% CI",
    featured: true,
  },
  {
    id: "queueforge",
    title: "QueueForge",
    organization: "Full-Stack Background Job Platform",
    category: "Full-Stack",
    summary:
      "Cloud-hosted job orchestration platform using Next.js, TypeScript, FastAPI, Redis, PostgreSQL, Railway, and Vercel with distributed queue-worker architecture.",
    bullets: [
      "Architected and deployed QueueForge, a cloud-hosted job orchestration platform using Next.js, TypeScript, FastAPI, Redis, PostgreSQL, Railway, and Vercel, decoupling API request handling from background execution through a distributed queue-worker architecture.",
      "Engineered a fault-tolerant Python worker framework with Redis queue consumption, SQLAlchemy-backed persistence, and detailed execution logging, validating 150+ jobs with 97% completing in under 500 ms across webhook, text-processing, and CSV ingestion workloads.",
      "Built a real-time operations dashboard with Tailwind CSS, shadcn/ui, Zustand, and React Query, exposing live job throughput, queue depth, lifecycle state transitions, and failure diagnostics for end-to-end observability.",
    ],
    tags: ["Next.js", "TypeScript", "FastAPI", "Redis", "PostgreSQL", "Railway", "Vercel", "Tailwind CSS", "React Query", "Zustand", "shadcn/ui"],
    metric: "150+ jobs validated, 97% under 500 ms",
    featured: true,
  },
  {
    id: "sim-to-real-cooperative-aerial-manipulation",
    title: "Sim-to-Real Cooperative Aerial Manipulation",
    organization: "IRIS Lab",
    category: "Research",
    summary:
      "Multi-agent RL environment in MuJoCo for three Crazyflie-class quadrotors transporting a payload without inter-agent communication for sim-to-real transfer.",
    bullets: [
      "Designed a multi-agent reinforcement learning environment in MuJoCo for cooperative aerial manipulation, modeling three Crazyflie-class quadrotors transporting a payload without inter-agent communication, structured for sim-to-real policy transfer.",
      "Resolved catastrophic training instability by diagnosing unstable contact dynamics, replacing torque-level actuation with 6-DoF position control, applying ±30° attitude limits, workspace bounds, and protective cage geometry, reducing policy divergence by ~80% and achieving stable coordinated flight in simulation.",
      "Integrated custom XML-defined environments into a GPU-accelerated training pipeline with MuJoCo Warp, achieving ~2× higher rollout throughput than standard MuJoCo and enabling policy convergence in under 4 hours.",
    ],
    tags: ["Python", "MuJoCo", "MuJoCo Warp", "Reinforcement Learning"],
    metric: "~2× training throughput, convergence under 4 hours",
    featured: true,
  },
  {
    id: "role-based-academic-help-portal",
    title: "Role-Based Academic Help Portal",
    category: "Full-Stack",
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
    featured: true,
  },
];
