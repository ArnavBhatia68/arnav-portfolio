import type { Diagram, DiagramNode, Side } from "@/data/architecture";

const NODE_W = 220;
const NODE_H = 76;

type Point = { x: number; y: number };

const size = (n: DiagramNode) => ({ w: n.w ?? NODE_W, h: n.h ?? NODE_H });
const centre = (n: DiagramNode): Point => ({ x: n.x + size(n).w / 2, y: n.y + size(n).h / 2 });
const isHorizontal = (side: Side) => side === "left" || side === "right";

function anchor(n: DiagramNode, side: Side): Point {
  const { w, h } = size(n);
  if (side === "top") return { x: n.x + w / 2, y: n.y };
  if (side === "bottom") return { x: n.x + w / 2, y: n.y + h };
  if (side === "left") return { x: n.x, y: n.y + h / 2 };
  return { x: n.x + w, y: n.y + h / 2 };
}

function autoSides(a: DiagramNode, b: DiagramNode): [Side, Side] {
  const ca = centre(a);
  const cb = centre(b);
  const dx = cb.x - ca.x;
  const dy = cb.y - ca.y;
  if (Math.abs(dx) >= Math.abs(dy)) return dx > 0 ? ["right", "left"] : ["left", "right"];
  return dy > 0 ? ["bottom", "top"] : ["top", "bottom"];
}

/** Orthogonal route between two anchors + a good spot for the label. */
function route(p1: Point, s1: Side, p2: Point, s2: Side) {
  const h1 = isHorizontal(s1);
  const h2 = isHorizontal(s2);
  if (h1 && h2) {
    const mx = (p1.x + p2.x) / 2;
    return { d: `M${p1.x} ${p1.y} H${mx} V${p2.y} H${p2.x}`, label: { x: mx, y: Math.min(p1.y, p2.y) - 10, anchor: "middle" as const } };
  }
  if (!h1 && !h2) {
    const my = (p1.y + p2.y) / 2;
    return { d: `M${p1.x} ${p1.y} V${my} H${p2.x} V${p2.y}`, label: { x: Math.max(p1.x, p2.x) + 10, y: my + 4, anchor: "start" as const } };
  }
  if (h1) return { d: `M${p1.x} ${p1.y} H${p2.x} V${p2.y}`, label: { x: (p1.x + p2.x) / 2, y: p1.y - 10, anchor: "middle" as const } };
  return { d: `M${p1.x} ${p1.y} V${p2.y} H${p2.x}`, label: { x: p1.x + 10, y: (p1.y + p2.y) / 2 + 4, anchor: "start" as const } };
}

export function ArchitectureDiagram({ diagram, id }: { diagram: Diagram; id: string }) {
  const nodes = new Map(diagram.nodes.map((n) => [n.id, n]));
  const arrow = `arrow-${id}`;
  const arrowAccent = `arrow-accent-${id}`;

  return (
    <div className="-mx-5 overflow-x-auto px-5 pb-2 md:mx-0 md:px-0" role="group" aria-label="Architecture diagram">
      <svg
        viewBox={`0 0 ${diagram.width} ${diagram.height}`}
        className="h-auto w-full min-w-[720px] text-ink"
        role="img"
        aria-label={diagram.caption}
      >
        <defs>
          <marker id={arrow} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 1 L9 5 L0 9 z" className="fill-ink" />
          </marker>
          <marker id={arrowAccent} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 1 L9 5 L0 9 z" className="fill-signal" />
          </marker>
          <pattern id={`dots-${id}`} width="16" height="16" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.9" className="fill-ink/15" />
          </pattern>
        </defs>

        <rect width={diagram.width} height={diagram.height} fill={`url(#dots-${id})`} />

        {diagram.groups?.map((group) => (
          <g key={group.label}>
            <rect x={group.x} y={group.y} width={group.w} height={group.h} rx="6" fill="none" className="stroke-ink/40" strokeDasharray="5 6" />
            <text x={group.x + 14} y={group.y + 22} className="fill-muted font-mono" fontSize="11" letterSpacing="1">
              {group.label.toUpperCase()}
            </text>
          </g>
        ))}

        {diagram.edges.map((edge) => {
          const from = nodes.get(edge.from);
          const to = nodes.get(edge.to);
          if (!from || !to) return null;
          const [autoFrom, autoTo] = autoSides(from, to);
          const s1 = edge.fromSide ?? autoFrom;
          const s2 = edge.toSide ?? autoTo;
          const { d, label } = route(anchor(from, s1), s1, anchor(to, s2), s2);
          return (
            <g key={`${edge.from}-${edge.to}`}>
              <path
                d={d}
                fill="none"
                className={edge.dashed ? "stroke-ink/55" : "stroke-ink/70"}
                strokeWidth="1.25"
                strokeDasharray={edge.dashed ? "4 5" : undefined}
                markerEnd={`url(#${edge.flow ? arrowAccent : arrow})`}
              />
              {edge.flow ? <path d={d} fill="none" className="edge-flow stroke-signal" strokeWidth="2" strokeLinecap="round" /> : null}
              {edge.label ? (
                <text
                  x={label.x}
                  y={label.y}
                  textAnchor={label.anchor}
                  className="fill-ink-soft font-mono"
                  fontSize="11"
                  letterSpacing="0.5"
                  paintOrder="stroke"
                  stroke="var(--paper)"
                  strokeWidth="6"
                  strokeLinejoin="round"
                >
                  {edge.label}
                </text>
              ) : null}
            </g>
          );
        })}

        {diagram.nodes.map((node) => {
          const { w, h } = size(node);
          return (
            <g key={node.id}>
              {node.stack
                ? [10, 5].map((offset) => (
                    <rect key={offset} x={node.x + offset} y={node.y - offset} width={w} height={h} rx="4" className="fill-card stroke-ink/35" />
                  ))
                : null}
              <rect
                x={node.x}
                y={node.y}
                width={w}
                height={h}
                rx="4"
                className={`fill-card ${node.accent ? "stroke-signal" : node.ghost ? "stroke-ink/45" : "stroke-ink/80"}`}
                strokeWidth={node.accent ? 1.75 : 1.25}
                strokeDasharray={node.ghost ? "5 5" : undefined}
              />
              {node.accent ? <rect x={node.x + w - 14} y={node.y + 8} width="6" height="6" className="fill-signal" /> : null}
              <text x={node.x + 16} y={node.y + 31} className="fill-ink font-sans" fontSize="16" fontWeight="500">
                {node.label}
              </text>
              {node.sub ? (
                <text x={node.x + 16} y={node.y + 54} className="fill-muted font-mono" fontSize="11">
                  {node.sub}
                </text>
              ) : null}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
