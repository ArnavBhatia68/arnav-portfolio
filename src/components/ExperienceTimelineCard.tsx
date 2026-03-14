import type { ExperienceItem } from "@/data/experience";

export default function ExperienceTimelineCard({ item }: { item: ExperienceItem }) {
  return (
    <div className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{item.role}</h3>
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{item.period}</p>
      </div>
      <p className="mb-3 text-sm font-medium text-sky-700 dark:text-sky-300">{item.company}</p>
      {item.details.length > 0 ? (
        <ul className="list-disc space-y-2 pl-5 text-sm text-slate-600 dark:text-slate-300">
          {item.details.map((detail) => (
            <li key={detail}>{detail}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
