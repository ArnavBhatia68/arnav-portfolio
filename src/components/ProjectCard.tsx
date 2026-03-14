import type { Project } from "@/data/projects";

function SafeLink({ href, label }: { href: string; label: string }) {
  const isTodo = href.startsWith("TODO:");

  if (isTodo) {
    return <span className="rounded-lg border border-dashed border-slate-300 px-3 py-1 text-xs text-slate-500 dark:border-slate-700 dark:text-slate-400">{label} ({href})</span>;
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="rounded-lg border border-slate-300 px-3 py-1 text-xs font-medium text-slate-700 transition hover:border-sky-400 hover:text-sky-700 dark:border-slate-700 dark:text-slate-200"
    >
      {label}
    </a>
  );
}

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-sky-600 dark:text-sky-400">{project.category}</p>
          <h3 className="mt-1 text-xl font-semibold text-slate-900 dark:text-white">{project.title}</h3>
          {project.org ? <p className="text-sm text-slate-500 dark:text-slate-400">{project.org}</p> : null}
        </div>
        <p className="rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700 dark:bg-sky-900/30 dark:text-sky-300">{project.impactMetric}</p>
      </div>

      <p className="text-sm text-slate-600 dark:text-slate-300">{project.summary}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {project.tech.map((item) => (
          <span key={item} className="rounded-full border border-slate-200 px-2.5 py-1 text-xs text-slate-600 dark:border-slate-700 dark:text-slate-300">
            {item}
          </span>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <SafeLink href={project.liveDemoUrl} label="Live Demo" />
        <SafeLink href={project.githubUrl} label="GitHub" />
      </div>
    </article>
  );
}
