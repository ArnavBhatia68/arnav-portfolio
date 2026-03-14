import type { Metadata } from "next";
import SectionHeader from "@/components/SectionHeader";
import { leadershipItems } from "@/data/leadership";

export const metadata: Metadata = {
  title: "Leadership",
  description: "Leadership and community activities.",
};

export default function LeadershipPage() {
  return (
    <div>
      <SectionHeader eyebrow="Leadership & Activities" title="Community impact and team leadership" />
      <div className="space-y-4">
        {leadershipItems.map((item) => (
          <article key={`${item.organization}-${item.role}`} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-lg font-semibold">{item.role}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">{item.period}</p>
            </div>
            <p className="mt-1 text-sm font-medium text-sky-700 dark:text-sky-300">{item.organization}</p>
            {item.details.length > 0 ? (
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-600 dark:text-slate-300">
                {item.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            ) : null}
          </article>
        ))}
      </div>
    </div>
  );
}
