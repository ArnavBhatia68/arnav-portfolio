import Link from "next/link";
import type { LeadershipItem } from "@/data/leadership";

export default function LeadershipSummaryCard({ item }: { item: LeadershipItem }) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <p className="text-xs font-semibold uppercase tracking-wide text-sky-600 dark:text-sky-400">{item.dates}</p>
      <h3 className="mt-1 text-sm font-semibold text-slate-900 dark:text-white">{item.role}</h3>
      <p className="text-xs text-slate-500 dark:text-slate-400">{item.organization}</p>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{item.summary}</p>
      <Link href="/leadership" className="mt-3 inline-block text-xs font-semibold text-sky-700 hover:text-sky-500 dark:text-sky-300">
        View Details →
      </Link>
    </article>
  );
}
