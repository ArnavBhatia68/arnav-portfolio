"use client";

import { useState } from "react";
import type { ExperienceKind } from "@/data/experience";

export type TimelineRow = {
  id: string;
  title: string;
  organization: string;
  organizationNote?: string;
  dates: string;
  kind: ExperienceKind;
  summary: string;
  bullets: string[];
  tags: string[];
  letters: { label: string; fileUrl: string }[];
  reference?: { label: string; name: string; email: string };
  start: number;
  end: number;
  ongoing: boolean;
};

const KIND_LABEL: Record<ExperienceKind, string> = {
  industry: "Industry",
  research: "Research",
  teaching: "Teaching",
};

function Swatch({ kind, className = "" }: { kind: ExperienceKind; className?: string }) {
  if (kind === "industry") return <span className={`bg-signal ${className}`} />;
  if (kind === "research") return <span className={`bg-ink ${className}`} />;
  return <span className={`hatch border border-ink-soft/70 text-ink-soft ${className}`} />;
}

const COLS = "md:grid-cols-[minmax(0,34%)_minmax(0,1fr)_2.25rem]";

export function ExperienceChart({
  rows,
  domainStart,
  domainEnd,
  now,
  counts,
  years,
  peak,
}: {
  rows: TimelineRow[];
  domainStart: number;
  domainEnd: number;
  now: number;
  counts: number[];
  years: number[];
  peak: { count: number; label: string };
}) {
  const [open, setOpen] = useState<string | null>(null);
  const [focus, setFocus] = useState<string | null>(null);
  const span = domainEnd - domainStart;
  const pct = (month: number) => ((month - domainStart) / span) * 100;
  const maxCount = Math.max(...counts, 1);

  // Step-chart path for the concurrency strip (viewBox units: months × count).
  let stepPath = `M0 ${maxCount}`;
  counts.forEach((count, i) => {
    stepPath += ` L${i} ${maxCount - count} L${i + 1} ${maxCount - count}`;
  });
  stepPath += ` L${counts.length} ${maxCount} Z`;

  const peakRuns: { from: number; to: number }[] = [];
  counts.forEach((count, i) => {
    if (count !== peak.count) return;
    const lastRun = peakRuns[peakRuns.length - 1];
    if (lastRun && lastRun.to === i) lastRun.to = i + 1;
    else peakRuns.push({ from: i, to: i + 1 });
  });

  const gridlines = (
    <>
      {years.map((year) => (
        <span key={year} aria-hidden className="absolute inset-y-0 w-px bg-line" style={{ left: `${pct(year * 12)}%` }} />
      ))}
      <span aria-hidden className="absolute inset-y-0 w-px bg-signal/40" style={{ left: `${pct(now + 1)}%` }} />
    </>
  );

  return (
    <div data-reveal>
      <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 border-b border-line pb-4">
        <ul className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Legend">
          {(Object.keys(KIND_LABEL) as ExperienceKind[]).map((kind) => (
            <li key={kind} className="label flex items-center gap-2">
              <Swatch kind={kind} className="inline-block h-2.5 w-5 rounded-[1px]" />
              {KIND_LABEL[kind]}
            </li>
          ))}
        </ul>
        <p className="label">
          Peak concurrency <span className="text-signal-ink">{peak.count} roles</span> · {peak.label}
        </p>
      </div>

      {/* Fig. 3 — concurrency strip + year axis, aligned to the bar column. */}
      <div className={`grid grid-cols-1 gap-x-8 pt-8 ${COLS}`}>
        <p className="label hidden max-w-[17rem] self-end pb-9 leading-relaxed md:block">
          <span className="text-ink">Fig. 3</span> — Active roles per month. Bars that are still running end in a
          pulse.
        </p>
        <div className="relative">
          <div className="relative h-16">
            <svg viewBox={`0 0 ${span} ${maxCount}`} preserveAspectRatio="none" className="absolute inset-0 size-full overflow-visible" aria-hidden>
              <path d={stepPath} className="fill-ink/[0.07]" />
              {peakRuns.map((run) => (
                <rect key={run.from} x={run.from} y={maxCount - peak.count} width={run.to - run.from} height={peak.count} className="fill-signal/25" />
              ))}
              <path
                d={stepPath.replace(/ Z$/, "")}
                fill="none"
                className="stroke-ink"
                strokeWidth={1}
                vectorEffect="non-scaling-stroke"
              />
            </svg>
            {peakRuns.slice(0, 1).map((run) => (
              <span
                key={run.from}
                className="label absolute -top-5 -translate-x-1/2 whitespace-nowrap text-signal-ink"
                style={{ left: `${((run.from + run.to) / 2 / span) * 100}%` }}
              >
                ▼ {peak.count} at once
              </span>
            ))}
          </div>
          <div className="relative mt-2 h-6 border-t border-ink/60">
            {years.map((year) => (
              <span key={year} className="label tabular absolute top-1.5 pl-1.5" style={{ left: `${pct(year * 12)}%` }}>
                <span aria-hidden className="absolute -top-1.5 left-0 h-2 w-px bg-ink/60" />
                {year}
              </span>
            ))}
            <span className="label absolute top-1.5 -translate-x-full pr-1.5 text-signal-ink" style={{ left: `${pct(now + 1)}%` }}>
              Now
            </span>
          </div>
        </div>
        <span aria-hidden />
      </div>

      <ol className="mt-4 border-t border-line">
        {rows.map((row) => {
          const isOpen = open === row.id;
          const dimmed = focus !== null && focus !== row.id;
          const left = pct(row.start);
          const width = Math.max(0.8, pct(row.end) - left);
          return (
            <li key={row.id} className="border-b border-line">
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`role-${row.id}`}
                onClick={() => setOpen(isOpen ? null : row.id)}
                onPointerEnter={() => setFocus(row.id)}
                onPointerLeave={() => setFocus(null)}
                onFocus={() => setFocus(row.id)}
                onBlur={() => setFocus(null)}
                className={`group grid w-full grid-cols-[1fr_2.25rem] items-center gap-x-6 gap-y-3 py-5 text-left md:gap-x-8 ${COLS}`}
              >
                <span className="min-w-0">
                  <span className="flex items-center gap-2.5">
                    <Swatch kind={row.kind} className="inline-block h-2 w-2 flex-none rounded-full" />
                    <span className="truncate text-[16.5px] text-ink transition-colors">{row.title}</span>
                  </span>
                  <span className="mt-1 block pl-[18px] font-mono text-[11.5px] text-muted md:truncate">
                    <span className="block truncate md:inline">{row.organization}</span>
                    <span className="hidden md:inline"> · </span>
                    <span className="block md:inline">{row.dates}</span>
                  </span>
                </span>

                <span className="relative col-span-2 block h-7 md:col-span-1">
                  {gridlines}
                  <span
                    className={`absolute top-1/2 h-2.5 -translate-y-1/2 rounded-[1px] transition-[opacity,height] duration-300 group-hover:h-3.5 ${
                      dimmed ? "opacity-25" : "opacity-100"
                    } ${
                      row.kind === "industry"
                        ? "bg-signal"
                        : row.kind === "research"
                          ? "bg-ink"
                          : "hatch border border-ink-soft/70 text-ink-soft"
                    }`}
                    style={{ left: `${left}%`, width: `${width}%` }}
                  />
                  {row.ongoing ? (
                    <span className={`pulse-dot absolute top-1/2 -translate-y-1/2 transition-opacity ${dimmed ? "opacity-25" : ""}`} style={{ left: `calc(${left + width}% - 1px)` }} />
                  ) : null}
                </span>

                <span
                  aria-hidden
                  className="col-start-2 row-start-1 grid size-8 place-items-center justify-self-end rounded-full border border-line text-ink-soft transition-[transform,border-color,color] duration-500 ease-out-expo group-hover:border-ink group-hover:text-ink md:col-start-3"
                  style={{ transform: isOpen ? "rotate(45deg)" : undefined }}
                >
                  +
                </span>
              </button>

              <div
                id={`role-${row.id}`}
                role="region"
                aria-label={`${row.title}, ${row.organization}`}
                inert={!isOpen}
                className="grid transition-[grid-template-rows] duration-700 ease-out-expo"
                style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
              >
                <div className="overflow-hidden">
                  <div className={`grid gap-8 pb-10 pt-1 md:gap-x-8 ${COLS}`}>
                    <div>
                      <p className="text-pretty font-serif text-[1.55rem] leading-[1.15] text-ink">{row.summary}</p>
                      {row.organizationNote ? <p className="label mt-4">{row.organizationNote}</p> : null}
                    </div>
                    <div>
                      <ul className="space-y-3.5">
                        {row.bullets.map((bullet) => (
                          <li key={bullet} className="grid grid-cols-[1.25rem_1fr] text-[15.5px] leading-relaxed text-ink-soft">
                            <span aria-hidden className="text-signal-ink">
                              ↳
                            </span>
                            <span className="text-pretty">{bullet}</span>
                          </li>
                        ))}
                      </ul>
                      <p className="mt-6 pl-5 font-mono text-[11.5px] text-muted">{row.tags.join("  ·  ")}</p>
                      {row.letters.length || row.reference ? (
                        <div className="mt-6 flex flex-wrap gap-3 pl-5">
                          {row.letters.map((doc) => (
                            <a
                              key={doc.fileUrl}
                              href={doc.fileUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex h-9 items-center gap-2 rounded-full border border-line-strong px-4 text-[13px] text-ink transition-colors hover:border-ink"
                            >
                              {doc.label} <span className="font-mono text-[10.5px] text-muted">PDF ↗</span>
                            </a>
                          ))}
                          {row.reference ? (
                            <a
                              href={`mailto:${row.reference.email}`}
                              className="inline-flex h-9 items-center gap-2 rounded-full border border-line-strong px-4 text-[13px] text-ink transition-colors hover:border-ink"
                            >
                              <span className="font-mono text-[10.5px] uppercase tracking-[0.08em] text-muted">{row.reference.label}</span>
                              {row.reference.name}
                            </a>
                          ) : null}
                        </div>
                      ) : null}
                    </div>
                    <span aria-hidden className="hidden md:block" />
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
