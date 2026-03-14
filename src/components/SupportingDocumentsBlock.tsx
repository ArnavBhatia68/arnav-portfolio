import type { SupportingDocument } from "@/data/experience";

export default function SupportingDocumentsBlock({ docs }: { docs?: SupportingDocument[] }) {
  if (!docs?.length) return null;

  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950/40">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Supporting Documents</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {docs.map((doc) =>
          doc.fileUrl ? (
            <a key={doc.label} href={doc.fileUrl} target="_blank" rel="noreferrer" className="rounded-lg border border-slate-300 px-3 py-1 text-xs font-medium dark:border-slate-700">
              {doc.label}
            </a>
          ) : (
            <span key={doc.label} className="rounded-lg border border-dashed border-slate-300 px-3 py-1 text-xs text-slate-400 dark:border-slate-700">
              {doc.label} coming soon
            </span>
          ),
        )}
      </div>
    </div>
  );
}
