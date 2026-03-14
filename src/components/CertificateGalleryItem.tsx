import type { Certificate } from "@/data/certificates";

export default function CertificateGalleryItem({ cert }: { cert: Certificate }) {
  const hasFile = Boolean(cert.filePath);
  const hasExternal = Boolean(cert.externalUrl);

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <p className="text-xs font-semibold uppercase tracking-wide text-sky-600 dark:text-sky-400">{cert.category}</p>
      <h3 className="mt-1 text-base font-semibold text-slate-900 dark:text-white">{cert.title}</h3>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{cert.period}</p>
      <div className="mt-4 flex flex-wrap gap-2 text-xs">
        {hasFile ? (
          <>
            <a href={cert.filePath} target="_blank" rel="noreferrer" className="rounded-lg border border-slate-300 px-3 py-1 font-medium text-slate-700 dark:border-slate-700 dark:text-slate-200">
              Open Preview
            </a>
            <a href={cert.filePath} download className="rounded-lg bg-sky-600 px-3 py-1 font-medium text-white">
              Download
            </a>
          </>
        ) : null}
        {!hasFile && hasExternal ? (
          <a
            href={cert.externalUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border border-slate-300 px-3 py-1 font-medium text-slate-700 dark:border-slate-700 dark:text-slate-200"
          >
            {cert.externalLabel ?? "Learn More"}
          </a>
        ) : null}
      </div>
    </article>
  );
}
