/**
 * Architecture diagrams for the case-study pages. Coordinates live in a
 * 960-wide viewBox; the renderer routes orthogonal edges between node sides.
 * Every box and arrow is taken from the project write-ups in projects.ts.
 */
export type Side = "top" | "right" | "bottom" | "left";

export type DiagramNode = {
  id: string;
  label: string;
  sub?: string;
  x: number;
  y: number;
  w?: number;
  h?: number;
  /** Highlight the node that is the heart of the system. */
  accent?: boolean;
  /** Draw as a stack (several identical instances, e.g. workers). */
  stack?: boolean;
  /** Dashed outline: a target or external system rather than built code. */
  ghost?: boolean;
};

export type DiagramEdge = {
  from: string;
  to: string;
  label?: string;
  fromSide?: Side;
  toSide?: Side;
  /** Animated dashes = data moving along this edge. */
  flow?: boolean;
  dashed?: boolean;
};

export type DiagramGroup = { label: string; x: number; y: number; w: number; h: number };

export type Diagram = {
  caption: string;
  width: number;
  height: number;
  nodes: DiagramNode[];
  edges: DiagramEdge[];
  groups?: DiagramGroup[];
};

export const architectures: Record<string, Diagram> = {
  "ai-workforce-productivity-platform": {
    caption:
      "Sponsor dashboards talk to a FastAPI integration layer that fans out to regression models and PostgreSQL, deployed as services on AWS.",
    width: 960,
    height: 430,
    groups: [{ label: "AWS · multi-service deployment", x: 330, y: 22, w: 610, h: 390 }],
    nodes: [
      { id: "ui", label: "Next.js frontend", sub: "D3.js sponsor dashboards", x: 30, y: 70 },
      { id: "api", label: "FastAPI", sub: "integration layer", x: 370, y: 70, accent: true },
      { id: "ml", label: "Regression models", sub: "forecasts · 95% CI", x: 690, y: 70 },
      { id: "db", label: "PostgreSQL", sub: "normalized schemas", x: 690, y: 300 },
      { id: "helpdesk", label: "HelpDesk", sub: "ticketing · enterprise SSO", x: 30, y: 300 },
    ],
    edges: [
      { from: "ui", to: "api", label: "requests", flow: true },
      { from: "api", to: "ml", label: "scenarios", flow: true },
      { from: "api", to: "db", label: "reads · writes", fromSide: "bottom", toSide: "left", flow: true },
      { from: "helpdesk", to: "api", label: "SSO session", fromSide: "right", toSide: "bottom", dashed: true },
    ],
  },
  queueforge: {
    caption:
      "Request handling is decoupled from execution: the API enqueues, workers consume from Redis, and the dashboard observes every state change.",
    width: 960,
    height: 410,
    nodes: [
      { id: "client", label: "Next.js dashboard", sub: "Vercel · React Query · Zustand", x: 30, y: 50 },
      { id: "api", label: "FastAPI", sub: "REST API · Railway", x: 370, y: 50, accent: true },
      { id: "db", label: "PostgreSQL", sub: "SQLAlchemy persistence", x: 710, y: 50 },
      { id: "redis", label: "Redis", sub: "job queue", x: 370, y: 290 },
      { id: "workers", label: "Python workers", sub: "fault-tolerant · logged", x: 710, y: 290, stack: true },
    ],
    edges: [
      { from: "client", to: "api", label: "enqueue · poll", flow: true },
      { from: "api", to: "redis", label: "push job", flow: true },
      { from: "redis", to: "workers", label: "consume", flow: true },
      { from: "workers", to: "db", label: "results · logs", flow: true },
      { from: "api", to: "db", label: "job state", dashed: true },
    ],
  },
  "sim-to-real-cooperative-aerial-manipulation": {
    caption:
      "Custom XML scenes run on GPU through MuJoCo Warp; each agent's policy acts through a position controller with attitude and workspace limits.",
    width: 960,
    height: 430,
    nodes: [
      { id: "env", label: "MuJoCo environment", sub: "3 quadrotors + payload (XML)", x: 30, y: 50 },
      { id: "warp", label: "MuJoCo Warp", sub: "GPU rollouts · ~2× throughput", x: 370, y: 50, accent: true },
      { id: "rl", label: "Multi-agent RL", sub: "converges in < 4 h", x: 710, y: 50 },
      { id: "policy", label: "Per-agent policies", sub: "no inter-agent comms", x: 710, y: 300 },
      { id: "ctrl", label: "6-DoF position control", sub: "±30° attitude · bounds", x: 370, y: 300 },
      { id: "real", label: "Crazyflie-class drones", sub: "sim-to-real target", x: 30, y: 300, ghost: true },
    ],
    edges: [
      { from: "env", to: "warp", label: "scenes", flow: true },
      { from: "warp", to: "rl", label: "rollouts", flow: true },
      { from: "rl", to: "policy", label: "weights", flow: true },
      { from: "policy", to: "ctrl", label: "setpoints", flow: true },
      { from: "ctrl", to: "env", label: "actions", fromSide: "top", toSide: "bottom", flow: true },
      { from: "ctrl", to: "real", label: "transfer", dashed: true },
    ],
  },
  "role-based-academic-help-portal": {
    caption:
      "Every request passes a role check before it reaches the data; articles and groups are encrypted at rest and one-time passwords live in their own store.",
    width: 960,
    height: 410,
    nodes: [
      { id: "ui", label: "JavaFX interface", sub: "multi-role views", x: 30, y: 50 },
      { id: "auth", label: "Auth & roles", sub: "account flows · permissions", x: 370, y: 50, accent: true },
      { id: "svc", label: "Service layer", sub: "search · filter · backup/restore", x: 710, y: 50 },
      { id: "crypto", label: "Encryption", sub: "BouncyCastle", x: 710, y: 290 },
      { id: "db", label: "H2 database", sub: "encrypted articles & groups", x: 370, y: 290 },
      { id: "otp", label: "OTP store", sub: "isolated from main data", x: 30, y: 290 },
    ],
    edges: [
      { from: "ui", to: "auth", label: "sign in", flow: true },
      { from: "auth", to: "svc", label: "authorized calls", flow: true },
      { from: "svc", to: "crypto", label: "encrypt · decrypt", flow: true },
      { from: "crypto", to: "db", label: "ciphertext", flow: true },
      { from: "auth", to: "otp", label: "one-time codes", fromSide: "bottom", toSide: "right", dashed: true },
    ],
  },
};
