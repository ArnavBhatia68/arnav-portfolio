import type { Certificate } from "@/data/awards";

export default function CertificateGalleryItem({ cert }: { cert: Certificate }) {
  const isTodo = cert.filePath.startsWith("TODO:");

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <p className="text-sm font-semibold uppercase tracking-wide text-sky-600 dark:text-sky-400">{cert.period}</p>
      <h3 className="mt-1 text-base font-semibold text-slate-900 dark:text-white">{cert.title}</h3>
      <div className="mt-4 flex gap-2 text-xs">
        {isTodo ? (
          <span className="rounded-lg border border-dashed border-slate-300 px-3 py-1 text-slate-500 dark:border-slate-700 dark:text-slate-400">TODO: add certificate file</span>
        ) : (
          <>
            <a href={cert.filePath} target="_blank" rel="noreferrer" className="rounded-lg border border-slate-300 px-3 py-1 font-medium text-slate-700 dark:border-slate-700 dark:text-slate-200">
              View
            </a>
            <a href={cert.filePath} download className="rounded-lg bg-sky-600 px-3 py-1 font-medium text-white">
              Download
            </a>
          </>
        )}
      </div>
    </article>
  );
}
