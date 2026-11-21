/**
 * A tiny cooperative-transport simulator, drawn as a technical illustration.
 *
 * Three quadrotors carry one payload on tethers. Each drone runs its own PD
 * controller toward a slot in a slowly-yawing formation; none of them knows
 * where the others are — the only coupling is through the cables, which is
 * the setup studied in the IRIS Lab project this hero is based on.
 *
 * Physics: position-based dynamics (rope constraints), fixed 240 Hz substeps.
 * Rendering: perspective camera, line-art drones, shaded payload, floor grid.
 * Units are metres and seconds; y is up, z points away from the camera.
 */

export type Vec3 = { x: number; y: number; z: number };

export type SimPalette = {
  ink: string;
  muted: string;
  line: string;
  signal: string;
  paper: string;
  mono: string;
  dark: boolean;
};

/** Region of the canvas (CSS px) the formation is allowed to fly in. */
export type SimZone = { x: number; y: number; w: number; h: number };

export type SimReadout = {
  time: number;
  manual: boolean;
  payload: Vec3;
  speed: number;
  tilt: number;
};

const G = 9.81;
const DEG = Math.PI / 180;
const MAX_TILT = 30 * DEG; // the ±30° attitude limit used in the real environment
const STEP = 1 / 240;
const AGENTS = 3;

const v3 = (x = 0, y = 0, z = 0): Vec3 => ({ x, y, z });
const add = (a: Vec3, b: Vec3): Vec3 => v3(a.x + b.x, a.y + b.y, a.z + b.z);
const sub = (a: Vec3, b: Vec3): Vec3 => v3(a.x - b.x, a.y - b.y, a.z - b.z);
const mul = (a: Vec3, s: number): Vec3 => v3(a.x * s, a.y * s, a.z * s);
const dot = (a: Vec3, b: Vec3) => a.x * b.x + a.y * b.y + a.z * b.z;
const cross = (a: Vec3, b: Vec3): Vec3 => v3(a.y * b.z - a.z * b.y, a.z * b.x - a.x * b.z, a.x * b.y - a.y * b.x);
const len = (a: Vec3) => Math.hypot(a.x, a.y, a.z);
const norm = (a: Vec3): Vec3 => {
  const l = len(a) || 1;
  return v3(a.x / l, a.y / l, a.z / l);
};
const clamp = (x: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, x));
const clampLen = (a: Vec3, max: number) => {
  const l = len(a);
  return l > max ? mul(a, max / l) : a;
};

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "").trim();
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h.padEnd(6, "0");
  const n = parseInt(full.slice(0, 6), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function mix(a: string, b: string, t: number) {
  const [r1, g1, b1] = hexToRgb(a);
  const [r2, g2, b2] = hexToRgb(b);
  const c = (x: number, y: number) => Math.round(x + (y - x) * t);
  return `rgb(${c(r1, r2)}, ${c(g1, g2)}, ${c(b1, b2)})`;
}

type Drone = {
  pos: Vec3;
  prev: Vec3;
  vel: Vec3;
  /** Smoothed commanded acceleration — drives attitude and the thrust readout. */
  cmd: Vec3;
  up: Vec3;
  spin: number;
};

type Projected = { x: number; y: number; s: number; zc: number };

export class FlightSim {
  // Geometry (m)
  readonly cable = 0.62;
  readonly formationRadius = 0.42;
  readonly attachRadius = 0.075;
  readonly arm = 0.095;
  readonly rotor = 0.058;
  readonly box = v3(0.1, 0.062, 0.1);
  readonly hover: number;

  // Camera: raised and pitched down so the airframes read from above.
  readonly camDist = 3.7;
  readonly camY = 2.4;
  readonly pitch = 23 * DEG;
  private readonly sinP = Math.sin(23 * DEG);
  private readonly cosP = Math.cos(23 * DEG);
  /** Highest altitude (m) a drone may reach — the top of the flight zone. */
  private readonly ceiling = 1.8;

  // State
  drones: Drone[] = [];
  payload = { pos: v3(), prev: v3(), vel: v3() };
  yaw = 0.4;
  time = 0;
  target = v3(0, 0.7, 0);
  targetVel = v3();
  goal = v3(0, 0.7, 0);
  manualUntil = -1;
  trail: Vec3[] = [];
  gusts: { t: number }[] = [];

  // View
  width = 1;
  height = 1;
  dpr = 1;
  zone: SimZone = { x: 0, y: 0, w: 1, h: 1 };
  f = 1;
  cx = 0;
  cy = 0;
  bounds = { xMin: -0.4, xMax: 0.4, yMin: 0.35, yMax: 1 };
  palette: SimPalette = {
    ink: "#121211",
    muted: "#6b675e",
    line: "#d9d4c7",
    signal: "#e8492a",
    paper: "#f1eee6",
    mono: "monospace",
    dark: false,
  };

  private gridCache: HTMLCanvasElement | null = null;
  private trailTick = 0;
  private accumulator = 0;

  constructor() {
    const spread = this.formationRadius - this.attachRadius;
    this.hover = Math.sqrt(this.cable * this.cable - spread * spread);
    this.reset();
  }

  reset() {
    const start = v3((this.bounds.xMin + this.bounds.xMax) / 2, (this.bounds.yMin + this.bounds.yMax) / 2, 0);
    this.target = { ...start };
    this.goal = { ...start };
    this.targetVel = v3();
    this.payload = { pos: { ...start }, prev: { ...start }, vel: v3() };
    this.drones = Array.from({ length: AGENTS }, (_, i) => {
      const slot = this.slot(i);
      const pos = v3(start.x + slot.x, start.y + this.hover, start.z + slot.z);
      return { pos, prev: { ...pos }, vel: v3(), cmd: v3(), up: v3(0, 1, 0), spin: i * 1.7 };
    });
    this.trail = [];
  }

  // ---------------------------------------------------------------- view

  resize(width: number, height: number, dpr: number, zone: SimZone) {
    this.width = width;
    this.height = height;
    this.dpr = dpr;
    this.zone = zone;

    // Fit the floor (y = 0) near the bottom of the zone and the ceiling near the top.
    const ratio = (y: number, z = 0) => {
      const ry = y - this.camY;
      const rz = z + this.camDist;
      return (ry * this.cosP + rz * this.sinP) / (-ry * this.sinP + rz * this.cosP);
    };
    const floorScreen = zone.y + zone.h * 0.84;
    // Leave a band at the top for the HUD labels.
    const ceilingScreen = zone.y + Math.max(zone.h * 0.1, 78);
    this.f = (floorScreen - ceilingScreen) / (ratio(this.ceiling) - ratio(0));
    // ...but never so zoomed in that the formation can't move sideways.
    this.f = Math.min(this.f, ((zone.w - 60) * 3.9) / 1.5);
    this.cx = zone.x + zone.w / 2;
    this.cy = floorScreen + this.f * ratio(0);

    const zcNear = this.depth(v3(0, 1.2, -this.formationRadius));
    const xLimit = ((zone.w / 2 - 34) * zcNear) / this.f - this.formationRadius - 0.08;
    this.bounds = {
      xMin: -Math.max(0.04, xLimit),
      xMax: Math.max(0.04, xLimit),
      yMin: 0.34,
      yMax: Math.max(0.5, this.ceiling - this.hover - 0.05),
    };
    this.gridCache = null;
  }

  setPalette(palette: SimPalette) {
    this.palette = palette;
    this.gridCache = null;
  }

  private depth(p: Vec3) {
    return -(p.y - this.camY) * this.sinP + (p.z + this.camDist) * this.cosP;
  }

  project(p: Vec3): Projected {
    const ry = p.y - this.camY;
    const rz = p.z + this.camDist;
    const zc = Math.max(0.2, -ry * this.sinP + rz * this.cosP);
    const yc = ry * this.cosP + rz * this.sinP;
    const s = this.f / zc;
    return { x: this.cx + p.x * s, y: this.cy - yc * s, s, zc };
  }

  /** Screen point (CSS px) → ray cast onto the z = 0 plane, clamped to bounds. */
  unproject(sx: number, sy: number): Vec3 {
    const a = (sx - this.cx) / this.f;
    const b = (this.cy - sy) / this.f;
    const wy = b * this.cosP - this.sinP;
    const wz = b * this.sinP + this.cosP;
    const t = this.camDist / Math.max(0.05, wz);
    return v3(
      clamp(t * a, this.bounds.xMin, this.bounds.xMax),
      clamp(this.camY + t * wy, this.bounds.yMin, this.bounds.yMax),
      0,
    );
  }

  // --------------------------------------------------------- interaction

  pointTo(sx: number, sy: number) {
    this.goal = this.unproject(sx, sy);
    this.manualUntil = this.time + 2.5;
  }

  /** A sideways shove on the payload — the controllers have to recover. */
  gust() {
    const angle = Math.random() * Math.PI * 2;
    const strength = 1.6 + Math.random() * 0.8;
    this.payload.vel = add(this.payload.vel, v3(Math.cos(angle) * strength, 0.6, Math.sin(angle) * strength * 0.6));
    this.payload.prev = sub(this.payload.pos, mul(this.payload.vel, STEP));
    this.gusts.push({ t: this.time });
  }

  // ------------------------------------------------------------- physics

  private slotAngle(i: number) {
    return this.yaw + (i * Math.PI * 2) / AGENTS;
  }

  private slot(i: number) {
    const a = this.slotAngle(i);
    return v3(Math.cos(a) * this.formationRadius, 0, Math.sin(a) * this.formationRadius);
  }

  private attach(i: number) {
    const a = this.slotAngle(i);
    return v3(Math.cos(a) * this.attachRadius, this.box.y, Math.sin(a) * this.attachRadius);
  }

  private autopilot(t: number) {
    const { xMin, xMax, yMin, yMax } = this.bounds;
    const cx = (xMin + xMax) / 2;
    const cy = (yMin + yMax) / 2;
    return v3(
      cx + ((xMax - xMin) / 2) * 0.78 * Math.sin(t * 0.29),
      cy + ((yMax - yMin) / 2) * 0.62 * Math.sin(t * 0.47 + 0.9),
      0.18 * Math.sin(t * 0.21),
    );
  }

  advance(dt: number) {
    this.accumulator = Math.min(this.accumulator + dt, 0.1);
    while (this.accumulator >= STEP) {
      this.substep(STEP);
      this.accumulator -= STEP;
    }
    if (++this.trailTick % 2 === 0) {
      this.trail.push({ ...this.payload.pos });
      if (this.trail.length > 80) this.trail.shift();
    }
    this.gusts = this.gusts.filter((g) => this.time - g.t < 0.9);
  }

  /** Run the sim forward without drawing (used for reduced motion). */
  settle(seconds: number) {
    const steps = Math.round(seconds / STEP);
    for (let i = 0; i < steps; i++) this.substep(STEP);
    this.trail = [];
  }

  private substep(dt: number) {
    this.time += dt;
    this.yaw += 0.16 * dt;

    if (this.time > this.manualUntil) this.goal = this.autopilot(this.time);

    // Smooth the goal into a reference trajectory (critically damped spring).
    const k = 9;
    const c = 2 * Math.sqrt(k);
    const ref = add(mul(sub(this.goal, this.target), k), mul(this.targetVel, -c));
    this.targetVel = clampLen(add(this.targetVel, mul(ref, dt)), 1.6);
    this.target = add(this.target, mul(this.targetVel, dt));

    // Each agent: independent PD control toward its own slot.
    const kp = 24;
    const kd = 9;
    for (let i = 0; i < AGENTS; i++) {
      const d = this.drones[i];
      const slot = this.slot(i);
      const desired = v3(this.target.x + slot.x, this.target.y + this.hover, this.target.z + slot.z);
      let acc = add(mul(sub(desired, d.pos), kp), mul(sub(this.targetVel, d.vel), kd));
      acc = clampLen(acc, 11);
      d.cmd = add(d.cmd, mul(sub(acc, d.cmd), 1 - Math.exp(-14 * dt)));
      d.vel = add(d.vel, mul(acc, dt));
      d.prev = { ...d.pos };
      d.pos = add(d.pos, mul(d.vel, dt));
      d.spin += dt * 48;
    }

    // Payload: gravity and a little air drag.
    const p = this.payload;
    p.vel = v3(p.vel.x * (1 - 0.25 * dt), p.vel.y - G * dt, p.vel.z * (1 - 0.25 * dt));
    p.prev = { ...p.pos };
    p.pos = add(p.pos, mul(p.vel, dt));

    // Rope constraints (only resist stretching). Drones are "heavier" than the
    // payload from the solver's point of view: their props push back.
    const wDrone = 0.07;
    const wPayload = 1;
    for (let iter = 0; iter < 6; iter++) {
      for (let i = 0; i < AGENTS; i++) {
        const d = this.drones[i];
        const anchor = add(p.pos, this.attach(i));
        const delta = sub(d.pos, anchor);
        const dist = len(delta);
        if (dist <= this.cable) continue;
        const n = mul(delta, 1 / dist);
        const correction = (dist - this.cable) / (wDrone + wPayload);
        d.pos = sub(d.pos, mul(n, correction * wDrone));
        p.pos = add(p.pos, mul(n, correction * wPayload));
      }
      if (p.pos.y < this.box.y) p.pos.y = this.box.y;
    }

    let mean = v3();
    for (const d of this.drones) {
      d.vel = mul(sub(d.pos, d.prev), 1 / dt);
      mean = add(mean, d.vel);
    }
    mean = mul(mean, 1 / AGENTS);
    p.vel = mul(sub(p.pos, p.prev), 1 / dt);
    // Swing damping relative to the formation (what a good controller buys you).
    p.vel = add(mean, mul(sub(p.vel, mean), Math.exp(-0.8 * dt)));

    // Attitude: thrust points along commanded accel + gravity, plus a small
    // outward lean that balances the splayed cable. Capped at ±30°.
    for (let i = 0; i < AGENTS; i++) {
      const d = this.drones[i];
      const out = norm(this.slot(i));
      let up = norm(v3(d.cmd.x + out.x * 1.3, d.cmd.y + G, d.cmd.z + out.z * 1.3));
      const tilt = Math.acos(clamp(up.y, -1, 1));
      if (tilt > MAX_TILT) {
        const h = Math.hypot(up.x, up.z) || 1;
        const k2 = Math.sin(MAX_TILT) / h;
        up = v3(up.x * k2, Math.cos(MAX_TILT), up.z * k2);
      }
      d.up = up;
    }
  }

  readout(): SimReadout {
    let tilt = 0;
    for (const d of this.drones) tilt = Math.max(tilt, Math.acos(clamp(d.up.y, -1, 1)));
    return {
      time: this.time,
      manual: this.time <= this.manualUntil,
      payload: this.payload.pos,
      speed: len(this.payload.vel),
      tilt: tilt / DEG,
    };
  }

  // ------------------------------------------------------------ drawing

  private buildGrid() {
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(this.width * this.dpr));
    canvas.height = Math.max(1, Math.round(this.height * this.dpr));
    const ctx = canvas.getContext("2d");
    if (!ctx) return canvas;
    ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    const { ink, signal } = this.palette;

    // Floor grid on y = 0.
    ctx.strokeStyle = ink;
    ctx.globalAlpha = this.palette.dark ? 0.16 : 0.13;
    ctx.lineWidth = 1;
    ctx.beginPath();
    const step = 0.25;
    for (let x = -4; x <= 4.001; x += step) {
      const a = this.project(v3(x, 0, -1.6));
      const b = this.project(v3(x, 0, 5));
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
    }
    for (let z = -1.5; z <= 5.001; z += step) {
      const a = this.project(v3(-4, 0, z));
      const b = this.project(v3(4, 0, z));
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
    }
    ctx.stroke();

    // Fade the grid out radially around the flight zone.
    const centre = this.project(v3(0, 0, 0.4));
    const radius = Math.max(this.zone.w, this.zone.h) * 0.72;
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = "destination-in";
    const fade = ctx.createRadialGradient(centre.x, centre.y, radius * 0.1, centre.x, centre.y, radius);
    fade.addColorStop(0, "rgba(0,0,0,1)");
    fade.addColorStop(0.55, "rgba(0,0,0,0.55)");
    fade.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = fade;
    ctx.fillRect(0, 0, this.width, this.height);
    const bottom = this.zone.y + this.zone.h;
    const edge = ctx.createLinearGradient(0, bottom - 70, 0, bottom + 10);
    edge.addColorStop(0, "rgba(0,0,0,1)");
    edge.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = edge;
    ctx.fillRect(0, 0, this.width, this.height);
    ctx.globalCompositeOperation = "source-over";

    // Workspace bounds, drawn on the floor as a dashed rectangle.
    const pad = this.formationRadius + 0.06;
    const corners = [
      v3(this.bounds.xMin - pad, 0, -0.42),
      v3(this.bounds.xMax + pad, 0, -0.42),
      v3(this.bounds.xMax + pad, 0, 0.9),
      v3(this.bounds.xMin - pad, 0, 0.9),
    ].map((c) => this.project(c));
    ctx.strokeStyle = signal;
    ctx.globalAlpha = 0.55;
    ctx.setLineDash([4, 5]);
    ctx.beginPath();
    corners.forEach((c, i) => (i ? ctx.lineTo(c.x, c.y) : ctx.moveTo(c.x, c.y)));
    ctx.closePath();
    ctx.stroke();
    ctx.setLineDash([]);

    // Corner ticks + label.
    ctx.globalAlpha = 0.9;
    ctx.fillStyle = signal;
    ctx.font = `500 9.5px ${this.palette.mono}`;
    ctx.textBaseline = "bottom";
    ctx.fillText("WORKSPACE BOUNDS", corners[3].x + 2, corners[3].y - 5);
    ctx.globalAlpha = 1;
    return canvas;
  }

  render(ctx: CanvasRenderingContext2D) {
    const { ink, signal, dark, mono } = this.palette;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    if (!this.gridCache) this.gridCache = this.buildGrid();
    ctx.drawImage(this.gridCache, 0, 0);
    ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    const p = this.payload;

    // Shadows on the floor.
    const shadow = (pos: Vec3, r: number) => {
      const alpha = clamp(0.11 - pos.y * 0.035, 0.035, 0.11) * (dark ? 1.4 : 1);
      const rr = r * (1 + pos.y * 0.25);
      ctx.globalAlpha = alpha;
      ctx.fillStyle = dark ? "#000000" : ink;
      ctx.beginPath();
      for (let k = 0; k <= 20; k++) {
        const a = (k / 20) * Math.PI * 2;
        const q = this.project(v3(pos.x + Math.cos(a) * rr, 0, pos.z + Math.sin(a) * rr));
        if (k === 0) ctx.moveTo(q.x, q.y);
        else ctx.lineTo(q.x, q.y);
      }
      ctx.fill();
    };
    shadow(p.pos, 0.12);
    for (const d of this.drones) shadow(d.pos, 0.1);
    ctx.globalAlpha = 1;

    // Payload trail.
    ctx.strokeStyle = signal;
    ctx.lineWidth = 1.25;
    for (let i = 1; i < this.trail.length; i++) {
      const a = this.project(this.trail[i - 1]);
      const b = this.project(this.trail[i]);
      ctx.globalAlpha = (i / this.trail.length) * 0.6;
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;

    // Payload orientation: hangs along the resultant of its cables.
    let centroid = v3();
    for (const d of this.drones) centroid = add(centroid, d.pos);
    centroid = mul(centroid, 1 / AGENTS);
    const pUp = norm(sub(centroid, p.pos));
    const heading = v3(Math.cos(this.yaw), 0, Math.sin(this.yaw));
    const pFwd = norm(sub(heading, mul(pUp, dot(heading, pUp))));
    const pRight = cross(pUp, pFwd);
    const toWorld = (local: Vec3) =>
      add(p.pos, add(add(mul(pFwd, local.x), mul(pUp, local.y)), mul(pRight, local.z)));

    // Cables (behind bodies).
    ctx.strokeStyle = ink;
    ctx.lineWidth = 1;
    ctx.globalAlpha = dark ? 0.6 : 0.7;
    for (let i = 0; i < AGENTS; i++) {
      const d = this.drones[i];
      const local = this.attach(i);
      // Express the attach point in the payload's (tilted) frame for drawing.
      const la = this.slotAngle(i) - this.yaw;
      const anchor = toWorld(v3(Math.cos(la) * this.attachRadius, local.y, Math.sin(la) * this.attachRadius));
      const top = sub(d.pos, mul(d.up, 0.012));
      const a = this.project(top);
      const b = this.project(anchor);
      const span = len(sub(top, anchor));
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      if (span < this.cable * 0.985) {
        const sag = Math.sqrt(Math.max(0, this.cable * this.cable - span * span)) * 0.5;
        const mid = this.project(sub(mul(add(top, anchor), 0.5), v3(0, sag, 0)));
        ctx.quadraticCurveTo(mid.x, mid.y, b.x, b.y);
      } else {
        ctx.lineTo(b.x, b.y);
      }
      ctx.stroke();
    }
    ctx.globalAlpha = 1;

    // Depth-sorted bodies.
    type Body = { zc: number; draw: () => void };
    const bodies: Body[] = [];
    bodies.push({ zc: this.project(p.pos).zc, draw: () => this.drawPayload(ctx, toWorld) });
    this.drones.forEach((d, i) => bodies.push({ zc: this.project(d.pos).zc, draw: () => this.drawDrone(ctx, d, i) }));
    bodies.sort((a, b) => b.zc - a.zc);
    for (const body of bodies) body.draw();
    this.drawLabels(ctx);

    // Gust rings.
    const pp = this.project(p.pos);
    for (const g of this.gusts) {
      const age = (this.time - g.t) / 0.9;
      ctx.globalAlpha = (1 - age) * 0.9;
      ctx.strokeStyle = signal;
      ctx.lineWidth = 1.25;
      ctx.beginPath();
      ctx.arc(pp.x, pp.y, 10 + age * 70, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;

    // Target reticle.
    const manual = this.time <= this.manualUntil;
    const g = this.project(this.goal);
    const gap = len(sub(this.goal, p.pos));
    if (gap > 0.09) {
      ctx.strokeStyle = signal;
      ctx.globalAlpha = 0.55;
      ctx.setLineDash([2, 4]);
      ctx.beginPath();
      ctx.moveTo(pp.x, pp.y);
      ctx.lineTo(g.x, g.y);
      ctx.stroke();
      ctx.setLineDash([]);
    }
    ctx.globalAlpha = manual ? 1 : 0.75;
    ctx.strokeStyle = signal;
    ctx.lineWidth = 1.25;
    ctx.beginPath();
    ctx.arc(g.x, g.y, 8, 0, Math.PI * 2);
    for (const [dx, dy] of [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ]) {
      ctx.moveTo(g.x + dx * 11, g.y + dy * 11);
      ctx.lineTo(g.x + dx * 16, g.y + dy * 16);
    }
    ctx.stroke();
    ctx.fillStyle = signal;
    ctx.beginPath();
    ctx.arc(g.x, g.y, 1.6, 0, Math.PI * 2);
    ctx.fill();
    ctx.font = `500 9.5px ${mono}`;
    ctx.textBaseline = "middle";
    ctx.fillText(manual ? "TARGET" : "WAYPOINT", g.x + 21, g.y - 1);
    ctx.globalAlpha = 1;
  }

  private drawPayload(ctx: CanvasRenderingContext2D, toWorld: (local: Vec3) => Vec3) {
    const { ink, signal } = this.palette;
    const { x: hx, y: hy, z: hz } = this.box;
    const corners: Vec3[] = [];
    for (const sx of [-1, 1]) for (const sy of [-1, 1]) for (const sz of [-1, 1]) corners.push(toWorld(v3(sx * hx, sy * hy, sz * hz)));
    const idx = (sx: number, sy: number, sz: number) => ((sx > 0 ? 1 : 0) << 2) | ((sy > 0 ? 1 : 0) << 1) | (sz > 0 ? 1 : 0);
    const faces: { ids: number[]; n: Vec3; shade: number }[] = [
      { ids: [idx(-1, 1, -1), idx(1, 1, -1), idx(1, 1, 1), idx(-1, 1, 1)], n: v3(0, 1, 0), shade: 0 },
      { ids: [idx(-1, -1, -1), idx(-1, -1, 1), idx(1, -1, 1), idx(1, -1, -1)], n: v3(0, -1, 0), shade: 0.5 },
      { ids: [idx(1, -1, -1), idx(1, -1, 1), idx(1, 1, 1), idx(1, 1, -1)], n: v3(1, 0, 0), shade: 0.22 },
      { ids: [idx(-1, -1, -1), idx(-1, 1, -1), idx(-1, 1, 1), idx(-1, -1, 1)], n: v3(-1, 0, 0), shade: 0.34 },
      { ids: [idx(-1, -1, 1), idx(-1, 1, 1), idx(1, 1, 1), idx(1, -1, 1)], n: v3(0, 0, 1), shade: 0.28 },
      { ids: [idx(-1, -1, -1), idx(1, -1, -1), idx(1, 1, -1), idx(-1, 1, -1)], n: v3(0, 0, -1), shade: 0.4 },
    ];
    const centre = toWorld(v3());
    const cam = v3(0, this.camY, -this.camDist);
    ctx.lineWidth = 1;
    ctx.strokeStyle = ink;
    for (const face of faces) {
      const pts = face.ids.map((i) => corners[i]);
      const fc = mul(pts.reduce((acc, q) => add(acc, q), v3()), 1 / 4);
      const outward = sub(fc, centre);
      if (dot(outward, sub(cam, fc)) <= 0) continue;
      const proj = pts.map((q) => this.project(q));
      ctx.fillStyle = mix(signal, "#000000", face.shade);
      ctx.beginPath();
      proj.forEach((q, i) => (i ? ctx.lineTo(q.x, q.y) : ctx.moveTo(q.x, q.y)));
      ctx.closePath();
      ctx.fill();
      ctx.globalAlpha = 0.85;
      ctx.stroke();
      ctx.globalAlpha = 1;
    }
  }

  private drawDrone(ctx: CanvasRenderingContext2D, d: Drone, i: number) {
    const { ink, signal, dark } = this.palette;
    const up = d.up;
    const headingAngle = this.slotAngle(i);
    const heading = v3(Math.cos(headingAngle), 0, Math.sin(headingAngle));
    const fwd = norm(sub(heading, mul(up, dot(heading, up))));
    const right = cross(up, fwd);
    const c = this.project(d.pos);

    const rotors = [0, 1, 2, 3].map((k) => {
      const a = Math.PI / 4 + (k * Math.PI) / 2;
      return add(d.pos, add(mul(fwd, Math.cos(a) * this.arm), mul(right, Math.sin(a) * this.arm)));
    });

    // Arms.
    ctx.strokeStyle = ink;
    ctx.lineWidth = Math.max(1.2, c.s * 0.012);
    ctx.beginPath();
    for (const r of rotors) {
      const q = this.project(r);
      ctx.moveTo(c.x, c.y);
      ctx.lineTo(q.x, q.y);
    }
    ctx.stroke();

    // Rotor discs + spinning blade highlights.
    for (let k = 0; k < 4; k++) {
      const centre = rotors[k];
      const ring = (from: number, to: number, steps: number) => {
        const pts: Projected[] = [];
        for (let s = 0; s <= steps; s++) {
          const a = from + ((to - from) * s) / steps;
          pts.push(this.project(add(centre, add(mul(fwd, Math.cos(a) * this.rotor), mul(right, Math.sin(a) * this.rotor)))));
        }
        return pts;
      };
      const disc = ring(0, Math.PI * 2, 22);
      ctx.beginPath();
      disc.forEach((q, s) => (s ? ctx.lineTo(q.x, q.y) : ctx.moveTo(q.x, q.y)));
      ctx.closePath();
      ctx.globalAlpha = dark ? 0.1 : 0.07;
      ctx.fillStyle = ink;
      ctx.fill();
      ctx.globalAlpha = 0.5;
      ctx.lineWidth = 1;
      ctx.stroke();

      const phase = d.spin * (k % 2 ? 1 : -1) + k;
      for (const offset of [0, Math.PI]) {
        const blade = ring(phase + offset, phase + offset + 0.9, 6);
        ctx.globalAlpha = 0.9;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        blade.forEach((q, s) => (s ? ctx.lineTo(q.x, q.y) : ctx.moveTo(q.x, q.y)));
        ctx.stroke();
      }
    }
    ctx.globalAlpha = 1;

    // Body + status LED.
    const bodyR = Math.max(3, c.s * 0.026);
    ctx.fillStyle = ink;
    ctx.beginPath();
    ctx.arc(c.x, c.y, bodyR, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = signal;
    ctx.globalAlpha = 0.55 + 0.45 * Math.max(0, Math.sin(this.time * 4 + i * 2.1));
    ctx.beginPath();
    ctx.arc(c.x, c.y, Math.max(1.4, bodyR * 0.42), 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;

  }

  private drawLabels(ctx: CanvasRenderingContext2D) {
    const { ink, paper, mono } = this.palette;
    const placed: { x: number; y: number; w: number }[] = [];
    const order = this.drones
      .map((d, i) => ({ d, i, c: this.project(d.pos) }))
      .sort((a, b) => a.c.y - b.c.y);
    for (const { d, i, c } of order) {
      const bodyR = Math.max(3, c.s * 0.026);
      const lx = c.x + 20;
      let ly = c.y - 30;
      for (let guard = 0; guard < 6; guard++) {
        const hit = placed.some((r) => Math.abs(r.y - ly) < 15 && lx < r.x + r.w + 6 && r.x < lx + 80);
        if (!hit) break;
        ly -= 16;
      }
      // Never let a tag climb into the HUD band at the top of the frame.
      if (ly < this.zone.y + 44) ly = c.y + 30;
      placed.push({ x: lx + 10, y: ly, w: 72 });
      this.drawLabel(ctx, d, i, c, bodyR, lx, ly, ink, paper, mono);
    }
  }

  private drawLabel(
    ctx: CanvasRenderingContext2D,
    d: Drone,
    i: number,
    c: Projected,
    bodyR: number,
    lx: number,
    ly: number,
    ink: string,
    paper: string,
    mono: string,
  ) {
    ctx.strokeStyle = ink;
    ctx.globalAlpha = 0.45;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(c.x + bodyR + 2, c.y - bodyR - 2);
    ctx.lineTo(lx, ly);
    ctx.lineTo(lx + 8, ly);
    ctx.stroke();
    ctx.globalAlpha = 1;
    ctx.font = `600 9.5px ${mono}`;
    ctx.textBaseline = "middle";
    const id = `A${i + 1}`;
    const alt = `${d.pos.y.toFixed(2)} m`;
    const idWidth = ctx.measureText(id).width;
    ctx.font = `400 9.5px ${mono}`;
    const altWidth = ctx.measureText(alt).width;
    ctx.fillStyle = paper;
    ctx.globalAlpha = 0.85;
    ctx.fillRect(lx + 10, ly - 7, idWidth + altWidth + 12, 14);
    ctx.globalAlpha = 1;
    ctx.fillStyle = ink;
    ctx.font = `600 9.5px ${mono}`;
    ctx.fillText(id, lx + 12, ly);
    ctx.font = `400 9.5px ${mono}`;
    ctx.globalAlpha = 0.6;
    ctx.fillText(alt, lx + 18 + idWidth, ly);
    ctx.globalAlpha = 1;
  }
}
