"use client";

import { useCanvasLoop } from "@/components/canvas/useCanvasLoop";
import type { ProjectCover as CoverKind } from "@/data/projects";
import { cipherPainter, forecastPainter, queuePainter, swarmPainter } from "./painters";

const painters = {
  forecast: forecastPainter,
  queue: queuePainter,
  swarm: swarmPainter,
  cipher: cipherPainter,
} as const;

export function ProjectCover({ kind }: { kind: CoverKind }) {
  const ref = useCanvasLoop(painters[kind]);
  return <canvas ref={ref} aria-hidden className="absolute inset-0 size-full" />;
}
