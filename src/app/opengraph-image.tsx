import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Arnav Bhatia — Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const PAPER = "#f1eee6";
const INK = "#121211";
const MUTED = "#6b675e";
const SIGNAL = "#e8492a";

/** Three tethered drones + payload, echoing the hero simulation. */
function Formation() {
  const drones = [
    { x: 120, y: 70 },
    { x: 330, y: 40 },
    { x: 260, y: 120 },
  ];
  const payload = { x: 230, y: 250 };
  return (
    <svg width="440" height="330" viewBox="0 0 440 330">
      {drones.map((d) => (
        <line key={`c${d.x}`} x1={d.x} y1={d.y} x2={payload.x} y2={payload.y} stroke={INK} strokeWidth="1.5" />
      ))}
      {drones.map((d) => (
        <g key={`d${d.x}`}>
          <line x1={d.x - 30} y1={d.y} x2={d.x + 30} y2={d.y} stroke={INK} strokeWidth="2.5" />
          <ellipse cx={d.x - 32} cy={d.y} rx="20" ry="6" fill="none" stroke={INK} strokeWidth="1.5" />
          <ellipse cx={d.x + 32} cy={d.y} rx="20" ry="6" fill="none" stroke={INK} strokeWidth="1.5" />
          <circle cx={d.x} cy={d.y} r="7" fill={INK} />
          <circle cx={d.x} cy={d.y} r="3" fill={SIGNAL} />
        </g>
      ))}
      <rect x={payload.x - 26} y={payload.y - 4} width="52" height="36" fill={SIGNAL} stroke={INK} strokeWidth="1.5" />
      <ellipse cx={payload.x} cy={312} rx="60" ry="9" fill={INK} opacity="0.1" />
    </svg>
  );
}

export default async function OpengraphImage() {
  const [serif, mono] = await Promise.all([
    readFile(join(process.cwd(), "src/app/fonts/InstrumentSerif-Regular.woff")),
    readFile(join(process.cwd(), "node_modules/geist/dist/fonts/geist-mono/GeistMono-Regular.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: PAPER,
          color: INK,
          padding: "56px 64px",
          fontFamily: "Mono",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 18, letterSpacing: 2, color: MUTED }}>
          <span>FIG. 1 — COOPERATIVE TRANSPORT</span>
          <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ width: 10, height: 10, borderRadius: 10, background: SIGNAL }} />
            OPEN TO SWE / ML / RESEARCH ROLES
          </span>
        </div>

        <div style={{ display: "flex", position: "absolute", right: 40, top: 70 }}>
          <Formation />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontFamily: "Serif", fontSize: 176, lineHeight: 0.9, letterSpacing: -7 }}>Arnav Bhatia</div>
          <div style={{ display: "flex", marginTop: 28, fontSize: 21, letterSpacing: 1.5, color: "#3a3934" }}>
            SOFTWARE ENGINEER · DISTRIBUTED SYSTEMS · ROBOTICS · ASU CS
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Serif", data: serif, style: "normal", weight: 400 },
        { name: "Mono", data: mono, style: "normal", weight: 400 },
      ],
    },
  );
}
