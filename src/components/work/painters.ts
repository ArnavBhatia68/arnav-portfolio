import type { Painter } from "@/components/canvas/useCanvasLoop";
import { seeded, type CanvasPalette } from "@/lib/palette";

/*
 * Living covers for the project cards. Each painter is a tiny illustration in
 * the same line-art language as the hero: hairlines, mono labels, one accent.
 * They are illustrative diagrams — not plots of real data.
 */

const clamp = (x: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, x));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

function setLabel(ctx: CanvasRenderingContext2D, p: CanvasPalette, size = 9.5, weight = 500) {
  ctx.font = `${weight} ${size}px ${p.mono}`;
  ctx.letterSpacing = "0.6px";
  ctx.textBaseline = "middle";
}

function line(ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r = 3) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
}

/* ------------------------------------------------------------- forecast */

export function forecastPainter(): Painter {
  const rand = seeded(7);
  const history: number[] = [];
  let v = 0.36;
  for (let i = 0; i < 40; i++) {
    v = clamp(v + (rand() - 0.43) * 0.065, 0.18, 0.62);
    history.push(v);
  }
  const scenarios = Array.from({ length: 18 }, () => ({
    slope: (rand() - 0.3) * 0.42,
    phase: rand() * Math.PI * 2,
    amp: 0.01 + rand() * 0.03,
  }));

  return {
    draw(ctx, { w, h }, t, p) {
      const L = 22;
      const R = w - 22;
      const T = 52;
      const B = h - 66;
      const split = lerp(L, R, 0.52);
      const yOf = (value: number) => lerp(B, T, value);
      const last = history[history.length - 1];
      const fx = (u: number) => lerp(split, R, u);
      const centre = (u: number) => last + 0.2 * u + Math.sin(u * 4 + t * 0.5) * 0.012;
      const spread = (u: number) => 0.025 + 0.2 * Math.sqrt(u) * (0.94 + 0.06 * Math.sin(t * 1.1));

      // Grid.
      ctx.strokeStyle = p.ink;
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.07;
      for (let i = 0; i <= 4; i++) line(ctx, L, lerp(T, B, i / 4), R, lerp(T, B, i / 4));
      ctx.globalAlpha = 0.3;
      line(ctx, L, B, R, B);

      // Confidence band.
      ctx.globalAlpha = p.dark ? 0.2 : 0.15;
      ctx.fillStyle = p.signal;
      ctx.beginPath();
      for (let u = 0; u <= 1.0001; u += 0.025) ctx.lineTo(fx(u), yOf(centre(u) + spread(u)));
      for (let u = 1; u >= -0.0001; u -= 0.025) ctx.lineTo(fx(u), yOf(centre(u) - spread(u)));
      ctx.closePath();
      ctx.fill();
      ctx.globalAlpha = 0.7;
      ctx.strokeStyle = p.signal;
      ctx.setLineDash([2, 4]);
      for (const sign of [1, -1]) {
        ctx.beginPath();
        for (let u = 0; u <= 1.0001; u += 0.025) ctx.lineTo(fx(u), yOf(centre(u) + sign * spread(u)));
        ctx.stroke();
      }
      ctx.setLineDash([]);

      // Scenario fan.
      ctx.strokeStyle = p.ink;
      ctx.globalAlpha = p.dark ? 0.2 : 0.14;
      for (const s of scenarios) {
        ctx.beginPath();
        for (let u = 0; u <= 1.0001; u += 0.05) {
          const val = last + s.slope * u + Math.sin(u * 6 + s.phase + t * 0.7) * s.amp * u;
          ctx.lineTo(fx(u), yOf(clamp(val, centre(u) - spread(u), centre(u) + spread(u))));
        }
        ctx.stroke();
      }

      // History.
      ctx.globalAlpha = 1;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      history.forEach((value, i) => ctx.lineTo(lerp(L, split, i / (history.length - 1)), yOf(value)));
      ctx.stroke();

      // Central forecast.
      ctx.strokeStyle = p.signal;
      ctx.beginPath();
      for (let u = 0; u <= 1.0001; u += 0.025) ctx.lineTo(fx(u), yOf(centre(u)));
      ctx.stroke();

      // "Now" marker.
      ctx.strokeStyle = p.ink;
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.45;
      ctx.setLineDash([3, 3]);
      line(ctx, split, T - 6, split, B);
      ctx.setLineDash([]);
      ctx.globalAlpha = 1;
      setLabel(ctx, p);
      ctx.fillStyle = p.muted;
      ctx.fillText("NOW", split + 6, T - 2);

      // Scanning cursor through the scenarios.
      const u = (t * 0.16) % 1;
      const cx = fx(u);
      const cy = yOf(centre(u));
      ctx.strokeStyle = p.ink;
      ctx.globalAlpha = 0.35;
      line(ctx, cx, T, cx, B);
      ctx.globalAlpha = 1;
      ctx.fillStyle = p.signal;
      ctx.beginPath();
      ctx.arc(cx, cy, 3.5, 0, Math.PI * 2);
      ctx.fill();
      const tag = `SCENARIO ${String(Math.floor(u * 50) + 1).padStart(2, "0")} / 50`;
      setLabel(ctx, p, 9.5, 600);
      const tw = ctx.measureText(tag).width + 14;
      const tx = clamp(cx + 10, L, R - tw);
      ctx.fillStyle = p.ink;
      roundRect(ctx, tx, cy - 24, tw, 18, 2);
      ctx.fill();
      ctx.fillStyle = p.paper;
      ctx.fillText(tag, tx + 7, cy - 15);

      setLabel(ctx, p);
      ctx.fillStyle = p.muted;
      ctx.fillText("HISTORY", L, B + 16);
      ctx.fillText("FORECAST · 95% CI", split + 6, B + 16);
    },
  };
}

/* ---------------------------------------------------------------- queue */

type JobState = "arrive" | "queued" | "toWorker" | "processing" | "toStore";
type Job = { id: number; x: number; y: number; state: JobState; worker: number; progress: number; duration: number; retry: number };

export function queuePainter(): Painter {
  const rand = seeded(42);
  let jobs: Job[] = [];
  let nextId = 1;
  let nextArrival = 0.2;
  let done = 0;
  const workers = [0, 1, 2].map(() => ({ busy: false, flash: 0 }));

  const geo = (w: number, h: number) => {
    const top = 62;
    const bottom = h - 64;
    const band = Math.max(60, bottom - top);
    const midY = top + band * 0.5;
    return {
      api: { x: w * 0.09, y: midY },
      qStart: w * 0.2,
      qEnd: w * 0.56,
      qY: midY,
      workers: [0.08, 0.5, 0.92].map((f) => ({ x: w * 0.72, y: top + band * f })),
      store: { x: w * 0.9, y: midY },
    };
  };

  return {
    warmup: 5,
    step(dt, _t, { w, h }) {
      const g = geo(w, h);
      const slots = 8;
      const slotW = (g.qEnd - g.qStart) / slots;
      const queue = jobs.filter((j) => j.state === "queued" || j.state === "arrive");

      nextArrival -= dt;
      if (nextArrival <= 0 && queue.length < slots - 1) {
        jobs.push({ id: nextId++, x: g.api.x, y: g.api.y, state: "arrive", worker: -1, progress: 0, duration: 0, retry: 0 });
        nextArrival = 0.18 + rand() * 0.5;
      }

      // Hand the head of the queue to any idle worker.
      workers.forEach((worker, wi) => {
        worker.flash = Math.max(0, worker.flash - dt);
        if (worker.busy) return;
        const head = jobs.find((j) => j.state === "queued");
        if (!head) return;
        head.state = "toWorker";
        head.worker = wi;
        worker.busy = true;
      });

      const ease = 1 - Math.exp(-11 * dt);
      let queueIndex = 0;
      for (const job of jobs) {
        let tx = job.x;
        let ty = job.y;
        if (job.state === "arrive" || job.state === "queued") {
          tx = g.qEnd - slotW * (queueIndex + 0.5);
          ty = g.qY;
          queueIndex++;
          if (job.state === "arrive" && Math.abs(job.x - tx) < 2) job.state = "queued";
        } else if (job.state === "toWorker" || job.state === "processing") {
          tx = g.workers[job.worker].x;
          ty = g.workers[job.worker].y;
          if (job.state === "toWorker" && Math.hypot(job.x - tx, job.y - ty) < 2) {
            job.state = "processing";
            job.progress = 0;
            job.duration = rand() < 0.94 ? 0.35 + rand() * 0.45 : 1 + rand() * 0.6;
          }
        } else if (job.state === "toStore") {
          tx = g.store.x;
          ty = g.store.y;
        }

        if (job.state === "processing") {
          job.progress += dt / job.duration;
          if (job.progress >= 1) {
            workers[job.worker].busy = false;
            if (rand() < 0.06 && job.retry === 0) {
              // Fault: the worker logs it and the job goes back on the queue.
              workers[job.worker].flash = 0.9;
              job.retry = 1;
              job.state = "queued";
            } else {
              job.state = "toStore";
            }
          }
        }

        job.x = lerp(job.x, tx, ease);
        job.y = lerp(job.y, ty, ease);
      }

      jobs = jobs.filter((job) => {
        if (job.state === "toStore" && Math.hypot(job.x - g.store.x, job.y - g.store.y) < 3) {
          done++;
          return false;
        }
        return true;
      });
    },

    draw(ctx, { w, h }, _t, p) {
      const g = geo(w, h);
      ctx.lineWidth = 1;

      // Connectors.
      ctx.strokeStyle = p.ink;
      ctx.globalAlpha = 0.28;
      line(ctx, g.api.x + 26, g.api.y, g.qStart, g.qY);
      for (const wk of g.workers) {
        ctx.beginPath();
        ctx.moveTo(g.qEnd, g.qY);
        ctx.bezierCurveTo(g.qEnd + 30, g.qY, wk.x - 60, wk.y, wk.x - 32, wk.y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(wk.x + 32, wk.y);
        ctx.bezierCurveTo(wk.x + 60, wk.y, g.store.x - 50, g.store.y, g.store.x - 22, g.store.y);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;

      // API.
      ctx.strokeStyle = p.ink;
      roundRect(ctx, g.api.x - 26, g.api.y - 17, 52, 34, 3);
      ctx.stroke();
      setLabel(ctx, p, 9.5, 600);
      ctx.fillStyle = p.ink;
      ctx.textAlign = "center";
      ctx.fillText("API", g.api.x, g.api.y);

      // Queue track.
      const slots = 8;
      const slotW = (g.qEnd - g.qStart) / slots;
      roundRect(ctx, g.qStart, g.qY - 15, g.qEnd - g.qStart, 30, 2);
      ctx.stroke();
      ctx.globalAlpha = 0.2;
      for (let i = 1; i < slots; i++) line(ctx, g.qStart + slotW * i, g.qY - 15, g.qStart + slotW * i, g.qY + 15);
      ctx.globalAlpha = 1;
      setLabel(ctx, p);
      ctx.fillStyle = p.muted;
      ctx.textAlign = "left";
      ctx.fillText("REDIS QUEUE", g.qStart, g.qY - 27);

      // Workers.
      g.workers.forEach((wk, i) => {
        const job = jobs.find((j) => j.state === "processing" && j.worker === i);
        const flashing = workers[i].flash > 0;
        ctx.strokeStyle = job || flashing ? p.signal : p.ink;
        ctx.lineWidth = job ? 1.5 : 1;
        roundRect(ctx, wk.x - 32, wk.y - 16, 64, 32, 3);
        ctx.stroke();
        ctx.lineWidth = 1;
        if (job) {
          ctx.fillStyle = p.signal;
          ctx.globalAlpha = 0.18;
          ctx.fillRect(wk.x - 32, wk.y - 16, 64 * clamp(job.progress, 0, 1), 32);
          ctx.globalAlpha = 1;
        }
        setLabel(ctx, p, 9, 600);
        ctx.fillStyle = flashing ? p.signal : p.ink;
        ctx.textAlign = "center";
        ctx.fillText(flashing ? "RETRY" : `W${i + 1}`, wk.x, wk.y);
      });

      // Store (cylinder).
      const sx = g.store.x;
      const sy = g.store.y;
      ctx.strokeStyle = p.ink;
      ctx.beginPath();
      ctx.ellipse(sx, sy - 16, 20, 6, 0, 0, Math.PI * 2);
      ctx.moveTo(sx - 20, sy - 16);
      ctx.lineTo(sx - 20, sy + 16);
      ctx.ellipse(sx, sy + 16, 20, 6, 0, Math.PI, 0, true);
      ctx.lineTo(sx + 20, sy - 16);
      ctx.stroke();
      setLabel(ctx, p);
      ctx.fillStyle = p.muted;
      ctx.fillText("POSTGRES", sx, sy + 36);

      // Jobs.
      for (const job of jobs) {
        const s = 9;
        if (job.state === "processing") continue;
        ctx.fillStyle = job.state === "toWorker" || job.retry ? p.signal : p.ink;
        ctx.globalAlpha = job.state === "toStore" ? 0.55 : 1;
        ctx.fillRect(job.x - s / 2, job.y - s / 2, s, s);
      }
      ctx.globalAlpha = 1;

      const depth = jobs.filter((j) => j.state === "queued" || j.state === "arrive").length;
      const busy = workers.filter((wk) => wk.busy).length;
      setLabel(ctx, p);
      ctx.textAlign = "left";
      ctx.fillStyle = p.muted;
      ctx.fillText(`QUEUE ${depth}  ·  BUSY ${busy}/3  ·  DONE ${done}`, 22, 30);
      ctx.textAlign = "left";
    },
  };
}

/* ---------------------------------------------------------------- swarm */

export function swarmPainter(): Painter {
  const trail: { x: number; y: number }[] = [];
  let acc = 0;

  const centre = (t: number, w: number, h: number) => {
    const s = t * 0.42;
    const a = Math.min(w * 0.28, h * 0.4);
    const d = 1 + Math.sin(s) ** 2;
    return { x: w / 2 + (a * Math.cos(s)) / d, y: h * 0.5 + (a * Math.sin(s) * Math.cos(s)) / d };
  };

  return {
    step(dt, t, { w, h }) {
      acc += dt;
      if (acc > 0.05) {
        acc = 0;
        trail.push(centre(t, w, h));
        if (trail.length > 70) trail.shift();
      }
    },
    draw(ctx, { w, h }, t, p) {
      const c = centre(t, w, h);
      const r = Math.min(w, h) * 0.15;
      const yaw = t * 0.35;

      // Floor grid.
      ctx.strokeStyle = p.ink;
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.06;
      const step = 22;
      for (let x = (w / 2) % step; x < w; x += step) line(ctx, x, 0, x, h);
      for (let y = (h / 2) % step; y < h; y += step) line(ctx, 0, y, w, y);

      // Workspace bounds.
      const bx = w * 0.08;
      const by = Math.max(h * 0.16, 48);
      ctx.globalAlpha = 0.7;
      ctx.strokeStyle = p.signal;
      ctx.setLineDash([4, 5]);
      ctx.strokeRect(bx, by, w - bx * 2, h - by - 52);
      ctx.setLineDash([]);
      ctx.globalAlpha = 1;
      setLabel(ctx, p);
      ctx.fillStyle = p.signal;
      ctx.fillText("WORKSPACE BOUNDS", bx + 8, by + 13);

      // Trail.
      ctx.strokeStyle = p.signal;
      for (let i = 1; i < trail.length; i++) {
        ctx.globalAlpha = (i / trail.length) * 0.55;
        line(ctx, trail[i - 1].x, trail[i - 1].y, trail[i].x, trail[i].y);
      }
      ctx.globalAlpha = 1;

      // Tethers + drones.
      for (let k = 0; k < 3; k++) {
        const a = yaw + (k * Math.PI * 2) / 3;
        const dx = c.x + Math.cos(a) * r;
        const dy = c.y + Math.sin(a) * r;
        ctx.strokeStyle = p.ink;
        ctx.globalAlpha = 0.55;
        line(ctx, c.x, c.y, dx, dy);
        ctx.globalAlpha = 1;

        const arm = r * 0.34;
        const rotorR = r * 0.17;
        ctx.lineWidth = 1.4;
        for (let m = 0; m < 4; m++) {
          const ra = a + Math.PI / 4 + (m * Math.PI) / 2;
          const rx = dx + Math.cos(ra) * arm;
          const ry = dy + Math.sin(ra) * arm;
          line(ctx, dx, dy, rx, ry);
          ctx.lineWidth = 1;
          ctx.globalAlpha = 0.5;
          ctx.beginPath();
          ctx.arc(rx, ry, rotorR, 0, Math.PI * 2);
          ctx.stroke();
          ctx.globalAlpha = 0.9;
          const spin = t * 22 * (m % 2 ? 1 : -1) + m;
          line(ctx, rx - Math.cos(spin) * rotorR, ry - Math.sin(spin) * rotorR, rx + Math.cos(spin) * rotorR, ry + Math.sin(spin) * rotorR);
          ctx.globalAlpha = 1;
          ctx.lineWidth = 1.4;
        }
        ctx.fillStyle = p.ink;
        ctx.beginPath();
        ctx.arc(dx, dy, 3.2, 0, Math.PI * 2);
        ctx.fill();
        setLabel(ctx, p, 9, 600);
        ctx.fillStyle = p.ink;
        ctx.fillText(`A${k + 1}`, dx + arm + rotorR + 4, dy - arm);
        ctx.lineWidth = 1;
      }

      // Payload.
      const s = r * 0.32;
      ctx.save();
      ctx.translate(c.x, c.y);
      ctx.rotate(yaw);
      ctx.fillStyle = p.signal;
      ctx.fillRect(-s / 2, -s / 2, s, s);
      ctx.strokeStyle = p.ink;
      ctx.strokeRect(-s / 2, -s / 2, s, s);
      ctx.restore();

      // Attitude gauge: ±30° limit.
      const gx = w - 46;
      const gy = 44;
      const gr = 22;
      ctx.strokeStyle = p.ink;
      ctx.globalAlpha = 0.3;
      ctx.beginPath();
      ctx.arc(gx, gy, gr, Math.PI * 1.1, Math.PI * 1.9);
      ctx.stroke();
      ctx.globalAlpha = 1;
      ctx.strokeStyle = p.signal;
      const lim = (30 * Math.PI) / 180;
      for (const sign of [-1, 1]) {
        const a = -Math.PI / 2 + sign * lim;
        line(ctx, gx + Math.cos(a) * (gr - 5), gy + Math.sin(a) * (gr - 5), gx + Math.cos(a) * (gr + 3), gy + Math.sin(a) * (gr + 3));
      }
      const tilt = Math.sin(t * 1.3) * 0.55 * lim;
      ctx.strokeStyle = p.ink;
      ctx.lineWidth = 1.5;
      line(ctx, gx, gy, gx + Math.cos(-Math.PI / 2 + tilt) * gr, gy + Math.sin(-Math.PI / 2 + tilt) * gr);
      ctx.lineWidth = 1;
      setLabel(ctx, p);
      ctx.fillStyle = p.muted;
      ctx.textAlign = "center";
      ctx.fillText("±30°", gx, gy + 10);
      ctx.textAlign = "left";
      ctx.fillText("TOP VIEW · NO COMMS", 22, 30);
    },
  };
}

/* --------------------------------------------------------------- cipher */

const ARTICLE = [
  ["id", "7f3a-91c2"],
  ["role", "student · read"],
  ["group", "help / java"],
  ["title", "Reading a stack trace"],
  ["body", "Start at the first frame that"],
  ["", "points into your own code."],
];
const GLYPHS = "ABCDEF0123456789#%&*+=/<>{}[]$@";

export function cipherPainter(): Painter {
  const rand = seeded(11);
  const width = Math.max(...ARTICLE.map(([, value]) => value.length));
  let noise = ARTICLE.map(() => Array.from({ length: width }, () => GLYPHS[Math.floor(rand() * GLYPHS.length)]));
  let tick = 0;

  return {
    step(dt) {
      tick += dt;
      if (tick < 0.06) return;
      tick = 0;
      noise = noise.map((row) => row.map((ch) => (rand() < 0.3 ? GLYPHS[Math.floor(rand() * GLYPHS.length)] : ch)));
    },
    draw(ctx, { w, h }, t, p) {
      const period = 7;
      const phase = (t % period) / period;
      // 0–.35 encrypt sweep · .35–.5 hold · .5–.85 decrypt sweep · .85–1 hold
      let cutoff: number;
      let encrypting: boolean;
      if (phase < 0.35) {
        cutoff = phase / 0.35;
        encrypting = true;
      } else if (phase < 0.5) {
        cutoff = 1;
        encrypting = true;
      } else if (phase < 0.85) {
        cutoff = (phase - 0.5) / 0.35;
        encrypting = false;
      } else {
        cutoff = 1;
        encrypting = false;
      }

      const size = Math.max(10, Math.min(15, w / 36));
      ctx.font = `500 ${size}px ${p.mono}`;
      ctx.letterSpacing = "0px";
      ctx.textBaseline = "middle";
      const charW = ctx.measureText("M").width;
      const keyW = charW * 7;
      const rowH = Math.round(size * 2.1);
      const panelW = keyW + charW * (width + 1) + 32;
      const panelH = rowH * (ARTICLE.length + 1);
      const panelX = Math.max(14, (w - panelW) / 2);
      const panelY = Math.max(64, (h - panelH) / 2 - 6);
      const L = panelX + 16;
      const top = panelY + rowH;

      // Panel.
      ctx.strokeStyle = p.ink;
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.3;
      roundRect(ctx, panelX, panelY, panelW, panelH, 4);
      ctx.stroke();
      ctx.globalAlpha = 1;

      const scanY = top - rowH / 2 + cutoff * rowH * ARTICLE.length;
      ARTICLE.forEach(([key, value], row) => {
        const y = top + row * rowH;
        ctx.fillStyle = p.muted;
        ctx.fillText(key, L, y);
        for (let i = 0; i < value.length; i++) {
          const passed = y < scanY;
          const hidden = encrypting ? passed : !passed;
          const ch = hidden && value[i] !== " " ? noise[row][i] : value[i];
          ctx.fillStyle = hidden ? (i % 7 === 0 ? p.signal : p.muted) : p.ink;
          ctx.globalAlpha = hidden ? 0.85 : 1;
          ctx.fillText(ch, L + keyW + i * charW, y);
        }
        ctx.globalAlpha = 1;
      });

      // Scan line.
      if (cutoff > 0 && cutoff < 1) {
        ctx.strokeStyle = p.signal;
        ctx.lineWidth = 1.5;
        line(ctx, panelX - 10, scanY, panelX + panelW + 10, scanY);
        ctx.lineWidth = 1;
        ctx.globalAlpha = 0.12;
        ctx.fillStyle = p.signal;
        ctx.fillRect(panelX, scanY - rowH * 0.6, panelW, rowH * 0.6);
        ctx.globalAlpha = 1;
      }

      // Lock + status.
      const locked = encrypting ? cutoff >= 1 || phase >= 0.35 : cutoff < 1 && phase < 0.85;
      const lx = 30;
      const ly = 34;
      ctx.strokeStyle = locked ? p.signal : p.ink;
      ctx.lineWidth = 1.4;
      roundRect(ctx, lx - 7, ly - 2, 14, 11, 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(lx, ly - 2, 4.5, Math.PI, locked ? 0 : -0.5);
      ctx.stroke();
      ctx.lineWidth = 1;
      setLabel(ctx, p);
      ctx.fillStyle = locked ? p.signal : p.muted;
      ctx.fillText(locked ? "ENCRYPTED AT REST" : "DECRYPTED FOR ROLE", lx + 16, ly + 3);
      ctx.fillStyle = p.muted;
      ctx.textAlign = "right";
      ctx.fillText("OTP STORE · ISOLATED", w - 22, ly + 3);
      ctx.textAlign = "left";
    },
  };
}
