import type { ExperienceItem } from "@/data/experience";

export default function ExperienceSummaryCard({
  item,
  onViewDetails,
}: {
  item: ExperienceItem;
  onViewDetails: (item: ExperienceItem) => void;
}) {
  return (
    <article className="rounded-2xl border border-cyan-100 bg-gradient-to-br from-white to-cyan-50/30 p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-cyan-200 hover:shadow-lg dark:border-slate-800 dark:from-slate-900 dark:to-slate-900">
      <p className="text-xs font-semibold uppercase tracking-wide text-cyan-600 dark:text-cyan-400">{item.dates}</p>
      <h3 className="mt-1 text-sm font-semibold text-slate-900 dark:text-white">{item.title}</h3>
      <p className="text-xs text-slate-500 dark:text-slate-400">{item.organization}</p>
      <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{item.summary}</p>
      <button type="button" className="mt-3 text-xs font-semibold text-cyan-700 hover:text-indigo-600 dark:text-cyan-300" onClick={() => onViewDetails(item)}>
        View Details →
      </button>
    </article>
  );
}
