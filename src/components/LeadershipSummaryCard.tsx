import Link from "next/link";
import type { LeadershipItem } from "@/data/leadership";

export default function LeadershipSummaryCard({ item }: { item: LeadershipItem }) {
  return (
    <article className="rounded-2xl border border-emerald-100 bg-gradient-to-br from-white to-emerald-50/30 p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-lg dark:border-slate-800 dark:from-slate-900 dark:to-slate-900">
      <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600 dark:text-emerald-400">{item.dates}</p>
      <h3 className="mt-1 text-sm font-semibold text-slate-900 dark:text-white">{item.role}</h3>
      <p className="text-xs text-slate-500 dark:text-slate-400">{item.organization}</p>
      <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{item.summary}</p>
      <Link href="/leadership" className="mt-3 inline-block text-xs font-semibold text-emerald-700 hover:text-cyan-600 dark:text-emerald-300">
        View Details →
      </Link>
    </article>
  );
}
