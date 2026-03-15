import type { Award } from "@/data/awards";

export default function AwardCard({ award }: { award: Award }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{award.title}</h3>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{award.date}</p>
      {award.description ? <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{award.description}</p> : null}
    </article>
  );
}
