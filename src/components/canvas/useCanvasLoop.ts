"use client";

import { useEffect, useRef } from "react";
import { readCanvasPalette, type CanvasPalette } from "@/lib/palette";

export type Painter = {
  /** Seconds to pre-simulate before the first frame, so it never starts empty. */
  warmup?: number;
  /** Advance internal state (optional — stateless painters can skip it). */
  step?: (dt: number, t: number, size: { w: number; h: number }) => void;
  draw: (ctx: CanvasRenderingContext2D, size: { w: number; h: number }, t: number, palette: CanvasPalette) => void;
};

/**
 * Drives a canvas that fills its parent: DPR-aware sizing, a rAF loop that
 * only runs while visible, live theme colours, and a single still frame for
 * visitors who prefer reduced motion.
 */
export function useCanvasLoop(createPainter: () => Painter, stillTime = 6) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const factoryRef = useRef(createPainter);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !host || !ctx) return;

    const painter = factoryRef.current();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let palette = readCanvasPalette();
    // Painters draw in a "virtual" size; large canvases are scaled up uniformly
    // so line weights and labels stay proportionate.
    let size = { w: 1, h: 1 };
    let zoom = 1;
    let frame = 0;
    let last = 0;
    let t = 0;
    let running = false;
    let visible = false;

    const resize = () => {
      const rect = host.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.max(1, rect.width);
      const h = Math.max(1, rect.height);
      zoom = Math.min(1.6, Math.max(1, Math.min(w / 600, h / 440)));
      size = { w: w / zoom, h: h / zoom };
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr * zoom, 0, 0, dpr * zoom, 0, 0);
    };

    const paint = () => {
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.restore();
      painter.draw(ctx, size, t, palette);
    };

    const loop = (now: number) => {
      frame = requestAnimationFrame(loop);
      const dt = last ? Math.min((now - last) / 1000, 0.05) : 1 / 60;
      last = now;
      t += dt;
      painter.step?.(dt, t, size);
      paint();
    };

    const start = () => {
      if (running || !visible || reduce.matches || document.hidden) return;
      running = true;
      last = 0;
      frame = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(frame);
    };
    const still = () => {
      // Fast-forward stateful painters so the still frame looks "in progress".
      const dt = 1 / 30;
      while (t < stillTime) {
        t += dt;
        painter.step?.(dt, t, size);
      }
      paint();
    };

    resize();
    if (painter.warmup && painter.step) {
      const dt = 1 / 30;
      for (let s = 0; s < painter.warmup; s += dt) {
        t += dt;
        painter.step(dt, t, size);
      }
    }
    if (reduce.matches) still();
    else paint();

    const ro = new ResizeObserver(() => {
      resize();
      paint();
    });
    ro.observe(host);

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) start();
        else stop();
      },
      { rootMargin: "120px" },
    );
    io.observe(canvas);

    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVisibility);

    const mo = new MutationObserver(() => {
      palette = readCanvasPalette();
      if (!running) paint();
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    const onMotion = () => {
      if (reduce.matches) {
        stop();
        still();
      } else start();
    };
    reduce.addEventListener("change", onMotion);

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      mo.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      reduce.removeEventListener("change", onMotion);
    };
  }, [stillTime]);

  return canvasRef;
}
