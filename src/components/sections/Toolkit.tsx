import { Fragment } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { coursework } from "@/data/profile";
import { skills } from "@/data/skills";

const groups = [
  { label: "Languages", items: skills.languages },
  { label: "Frameworks & libraries", items: skills.frameworks },
  { label: "Data & infrastructure", items: skills.databasesInfrastructure },
  { label: "Tools", items: skills.tools },
];

export function Toolkit() {
  return (
    <section id="toolkit" aria-label="Toolkit" className="shell py-20 md:py-28">
      <SectionHeader index="06" label="Toolkit" title={<>The <em className="italic">toolkit</em></>}>
        What I reach for when building, plus the coursework underneath it.
      </SectionHeader>

      <div className="border-t border-line">
        {groups.map((group, i) => (
          <div key={group.label} data-reveal className="grid gap-4 border-b border-line py-8 md:grid-cols-12 md:gap-6">
            <p className="label md:col-span-3 md:pt-3">
              <span className="text-ink">{String(i + 1).padStart(2, "0")}</span> — {group.label}
            </p>
            <p className="display text-pretty text-[clamp(1.75rem,3vw,2.75rem)] leading-[1.15] tracking-[-0.015em] md:col-span-9">
              {group.items.map((item, k) => (
                <Fragment key={item}>
                  <span className="whitespace-nowrap">
                    {item}
                    {k < group.items.length - 1 ? (
                      <span aria-hidden className="ml-[0.3em] text-faint">
                        /
                      </span>
                    ) : null}
                  </span>{" "}
                </Fragment>
              ))}
            </p>
          </div>
        ))}

        <div data-reveal className="grid gap-6 border-b border-line py-8 md:grid-cols-12">
          <p className="label md:col-span-3 md:pt-1">
            <span className="text-ink">05</span> — Coursework
          </p>
          <ol className="grid gap-x-6 gap-y-2.5 sm:grid-cols-2 md:col-span-9">
            {coursework.map((course, i) => (
              <li key={course} className="flex items-baseline gap-3 text-[16px] text-ink-soft">
                <span className="font-mono text-[10.5px] text-muted tabular">{String(i + 1).padStart(2, "0")}</span>
                {course}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
