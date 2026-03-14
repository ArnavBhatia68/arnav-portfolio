import type { Certificate } from "@/data/certificates";

export default function CertificateGalleryItem({ cert }: { cert: Certificate }) {
  const available = Boolean(cert.filePath);

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <p className="text-xs font-semibold uppercase tracking-wide text-sky-600 dark:text-sky-400">{cert.category}</p>
      <h3 className="mt-1 text-base font-semibold text-slate-900 dark:text-white">{cert.title}</h3>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{cert.period}</p>
      <div className="mt-4 flex flex-wrap gap-2 text-xs">
        {available ? (
          <>
            <a href={cert.filePath} target="_blank" rel="noreferrer" className="rounded-lg border border-slate-300 px-3 py-1 font-medium text-slate-700 dark:border-slate-700 dark:text-slate-200">
              Open Preview
            </a>
            <a href={cert.filePath} download className="rounded-lg bg-sky-600 px-3 py-1 font-medium text-white">
              Download
            </a>
          </>
        ) : (
          <span className="rounded-lg border border-dashed border-slate-300 px-3 py-1 text-slate-400 dark:border-slate-700">Asset coming soon</span>
        )}
      </div>
    </article>
  );
}
