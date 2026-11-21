"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { FlightSim, type SimPalette } from "./flight-sim";

function readPalette(): SimPalette {
  const styles = getComputedStyle(document.documentElement);
  const get = (name: string, fallback: string) => styles.getPropertyValue(name).trim() || fallback;
  return {
    ink: get("--ink", "#121211"),
    muted: get("--muted", "#6b675e"),
    line: get("--line", "#d9d4c7"),
    signal: get("--signal", "#e8492a"),
    paper: get("--paper", "#f1eee6"),
    mono: get("--font-geist-mono", "ui-monospace, monospace"),
    dark: document.documentElement.classList.contains("dark"),
  };
}

function formatClock(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds - m * 60;
  return `T+${String(m).padStart(2, "0")}:${s.toFixed(1).padStart(4, "0")}`;
}

const corner = "pointer-events-none absolute size-3 border-ink/50";

/**
 * Hero shell: owns the canvas (which spans the whole hero so the floor can
 * bleed past the flight zone) and lays out the server-rendered intro + title.
 */
export function FlightDeck({ intro, title }: { intro: ReactNode; title: ReactNode }) {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const zoneRef = useRef<HTMLDivElement>(null);
  const clockRef = useRef<HTMLSpanElement>(null);
  const modeRef = useRef<HTMLSpanElement>(null);
  const posRef = useRef<HTMLSpanElement>(null);
  const tiltRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    const zone = zoneRef.current;
    const ctx = canvas?.getContext("2d");
    if (!section || !canvas || !zone || !ctx) return;

    const sim = new FlightSim();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let maxDpr = 2;
    let frame = 0;
    let last = 0;
    let running = false;
    let visible = true;
    let hudTick = 0;
    let slowFrames = 0;
    let lastPointer = "mouse";

    const layout = () => {
      const rect = section.getBoundingClientRect();
      const zr = zone.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
      canvas.width = Math.max(1, Math.round(rect.width * dpr));
      canvas.height = Math.max(1, Math.round(rect.height * dpr));
      sim.resize(rect.width, rect.height, dpr, {
        x: zr.left - rect.left,
        y: zr.top - rect.top,
        w: zr.width,
        h: zr.height,
      });
    };

    const updateHud = () => {
      const r = sim.readout();
      if (clockRef.current) clockRef.current.textContent = formatClock(r.time);
      if (modeRef.current) modeRef.current.textContent = r.manual ? "Manual" : "Autopilot";
      if (posRef.current)
        posRef.current.textContent = `x ${r.payload.x >= 0 ? "+" : "−"}${Math.abs(r.payload.x).toFixed(2)}  y ${r.payload.y.toFixed(2)} m`;
      if (tiltRef.current) tiltRef.current.textContent = `${Math.round(r.tilt).toString().padStart(2, "0")}°`;
    };

    const draw = () => sim.render(ctx);

    const loop = (now: number) => {
      frame = requestAnimationFrame(loop);
      const dt = last ? Math.min((now - last) / 1000, 0.05) : 1 / 60;
      last = now;
      sim.advance(dt);
      draw();
      if (++hudTick % 5 === 0) updateHud();
      // Drop to 1× resolution on devices that can't keep up.
      if (dt > 0.03) {
        if (++slowFrames > 90 && maxDpr > 1) {
          maxDpr = 1;
          layout();
        }
      } else if (slowFrames > 0) {
        slowFrames--;
      }
    };

    const start = () => {
      if (running || reduce.matches || !visible || document.hidden) return;
      running = true;
      last = 0;
      frame = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(frame);
    };
    const renderStill = () => {
      sim.reset();
      sim.settle(3);
      draw();
      updateHud();
    };

    sim.setPalette(readPalette());
    layout();
    sim.reset();
    if (reduce.matches) renderStill();
    else {
      sim.settle(0.8);
      start();
    }

    const resizeObserver = new ResizeObserver(() => {
      layout();
      if (!running) draw();
    });
    resizeObserver.observe(section);
    resizeObserver.observe(zone);

    const visibility = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    visibility.observe(section);

    const onPageVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onPageVisibility);

    const themeObserver = new MutationObserver(() => {
      sim.setPalette(readPalette());
      if (!running) draw();
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    const onMotionPreference = () => {
      if (reduce.matches) {
        stop();
        renderStill();
      } else {
        start();
      }
    };
    reduce.addEventListener("change", onMotionPreference);

    const steer = (event: PointerEvent) => {
      if (reduce.matches) return;
      // Touch only steers inside the flight zone, so scrolling past is harmless.
      if (event.pointerType !== "mouse" && !zone.contains(event.target as Node)) return;
      const rect = canvas.getBoundingClientRect();
      sim.pointTo(event.clientX - rect.left, event.clientY - rect.top);
    };
    const onPointerDown = (event: PointerEvent) => {
      lastPointer = event.pointerType;
      steer(event);
    };
    const onClick = () => {
      if (lastPointer === "mouse" && !reduce.matches) sim.gust();
    };
    section.addEventListener("pointermove", steer);
    section.addEventListener("pointerdown", onPointerDown);
    zone.addEventListener("click", onClick);

    document.fonts?.ready.then(() => {
      sim.setPalette(readPalette());
      if (!running) draw();
    });

    return () => {
      stop();
      resizeObserver.disconnect();
      visibility.disconnect();
      themeObserver.disconnect();
      document.removeEventListener("visibilitychange", onPageVisibility);
      reduce.removeEventListener("change", onMotionPreference);
      section.removeEventListener("pointermove", steer);
      section.removeEventListener("pointerdown", onPointerDown);
      zone.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <section ref={sectionRef} id="top" className="relative isolate overflow-hidden" aria-label="Introduction">
      <canvas ref={canvasRef} aria-hidden className="hero-fade pointer-events-none absolute inset-0 -z-10 size-full [--d:350ms]" />

      <div className="shell grid min-h-[100svh] grid-cols-12 content-end gap-x-6 pb-6 pt-[calc(var(--header-h)+20px)] lg:min-h-[max(760px,100svh)] lg:grid-rows-[1fr_auto] lg:content-stretch lg:pb-8">
        <div
          ref={zoneRef}
          role="img"
          aria-label="Live simulation: three quadrotors cooperatively carrying a payload on tethers, steered by your cursor."
          className="relative order-1 col-span-12 h-[min(52svh,400px)] min-h-[300px] cursor-crosshair touch-pan-y select-none lg:order-2 lg:col-span-7 lg:h-auto lg:min-h-[440px]"
        >
          <span className={`${corner} left-0 top-0 border-l border-t`} />
          <span className={`${corner} right-0 top-0 border-r border-t`} />
          <span className={`${corner} bottom-0 left-0 border-b border-l`} />
          <span className={`${corner} bottom-0 right-0 border-b border-r`} />

          <div aria-hidden className="hero-fade label absolute left-4 top-3.5 [--d:500ms]">
            <span className="text-ink">Fig. 1</span>
            <span className="hidden sm:inline"> — Cooperative transport</span>
          </div>
          <div aria-hidden className="hero-fade label tabular absolute right-4 top-3.5 text-right [--d:600ms]">
            <span ref={clockRef}>T+00:00.0</span>
            <span className="hidden sm:inline"> · </span>
            <br className="sm:hidden" />
            <span ref={modeRef} className="text-signal-ink">
              Autopilot
            </span>
          </div>
          <div aria-hidden className="hero-fade label absolute bottom-3 left-4 hidden sm:block [--d:700ms]">
            3 agents · 0 messages · tilt <span ref={tiltRef} className="tabular">00°</span>/30°
          </div>
          <div aria-hidden className="hero-fade label tabular absolute bottom-3 right-4 [--d:700ms]">
            <span ref={posRef}>x +0.00  y 0.00 m</span>
          </div>
        </div>

        <div className="order-3 col-span-12 pt-8 lg:order-1 lg:col-span-5 lg:self-end lg:pb-4 lg:pr-6 lg:pt-0">{intro}</div>

        <div className="order-2 col-span-12 pt-6 lg:order-3 lg:pt-4">{title}</div>
      </div>
    </section>
  );
}
