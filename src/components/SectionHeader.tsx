import type { ReactNode } from "react";

export default function SectionHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div className="space-y-2">
        {eyebrow ? <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400">{eyebrow}</p> : null}
        <h2 className="max-w-3xl text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50 md:text-3xl">{title}</h2>
        {description ? <p className="max-w-3xl text-sm leading-relaxed text-slate-600 dark:text-slate-300 md:text-base">{description}</p> : null}
      </div>
      {action}
    </div>
  );
}
