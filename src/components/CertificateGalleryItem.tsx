import type { Certificate } from "@/data/certificates";

export default function CertificateGalleryItem({ cert }: { cert: Certificate }) {
  const hasFile = Boolean(cert.filePath);
  const hasExternal = Boolean(cert.externalUrl);
  const isAward = cert.category === "Award";

  return (
    <article className={`rounded-2xl border p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900 ${
      isAward
        ? "border-amber-200 bg-gradient-to-br from-white to-amber-50/40 hover:border-amber-300 dark:from-slate-900 dark:to-amber-950/20"
        : "border-slate-200 bg-white hover:border-cyan-200"
    }`}>
      <p className={`text-xs font-semibold uppercase tracking-wide ${isAward ? "text-amber-700 dark:text-amber-300" : "text-cyan-600 dark:text-cyan-400"}`}>{cert.category}</p>
      <h3 className="mt-1 text-base font-semibold text-slate-900 dark:text-white">{cert.title}</h3>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{cert.period}</p>
      <div className="mt-4 flex flex-wrap gap-2 text-xs">
        {hasFile ? (
          <>
            <a href={cert.filePath} target="_blank" rel="noreferrer" className="rounded-lg border border-slate-300 px-3 py-1 font-medium text-slate-700 dark:border-slate-700 dark:text-slate-200">
              Open Preview
            </a>
            <a href={cert.filePath} download className="rounded-lg bg-gradient-to-r from-cyan-500 to-indigo-500 px-3 py-1 font-medium text-white">
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
