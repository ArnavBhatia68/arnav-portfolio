export default function ReferenceBlock({
  label,
  name,
  email,
}: {
  label?: string;
  name?: string;
  email?: string;
}) {
  if (!label && !name && !email) return null;

  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950/40">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">{label ?? "Reference"}</p>
      <p className="mt-1 text-sm font-medium text-slate-800 dark:text-slate-100">{name ?? "Available upon request"}</p>
      {email ? <p className="text-xs text-slate-500 dark:text-slate-400">{email}</p> : null}
    </div>
  );
}
