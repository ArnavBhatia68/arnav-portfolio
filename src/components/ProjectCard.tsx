import type { Project } from "@/data/projects";

type Props = {
  project: Project;
  onViewDetails: (project: Project) => void;
};

function LinkAction({ href, label }: { href?: string; label: string }) {
  if (!href) {
    return <span className="rounded-lg border border-dashed border-slate-300 px-3 py-1 text-xs text-slate-400 dark:border-slate-700">{label} soon</span>;
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="rounded-lg border border-slate-300 px-3 py-1 text-xs font-medium text-slate-700 transition hover:border-sky-400 hover:text-sky-700 dark:border-slate-700 dark:text-slate-200"
      onClick={(event) => event.stopPropagation()}
    >
      {label}
    </a>
  );
}

export default function ProjectCard({ project, onViewDetails }: Props) {
  return (
    <article
      role="button"
      tabIndex={0}
      onClick={() => onViewDetails(project)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onViewDetails(project);
        }
      }}
      className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-sky-500 dark:border-slate-800 dark:bg-slate-900"
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-sky-600 dark:text-sky-400">{project.category}</p>
          <h3 className="mt-1 text-lg font-semibold text-slate-900 dark:text-white">{project.title}</h3>
          {project.organization ? <p className="text-xs text-slate-500 dark:text-slate-400">{project.organization}</p> : null}
        </div>
        <span className="rounded-full bg-sky-50 px-2.5 py-1 text-[10px] font-semibold text-sky-700 dark:bg-sky-900/30 dark:text-sky-300">{project.metric}</span>
      </div>

      <p className="line-clamp-2 text-sm text-slate-600 dark:text-slate-300">{project.summary}</p>

      <div className="mt-3 flex flex-wrap gap-2">
        {project.tags.slice(0, 4).map((tag) => (
          <span key={tag} className="rounded-full border border-slate-200 px-2 py-1 text-[11px] text-slate-600 dark:border-slate-700 dark:text-slate-300">
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onViewDetails(project);
          }}
          className="rounded-lg bg-sky-600 px-3 py-1 text-xs font-semibold text-white transition hover:bg-sky-500"
        >
          View Details
        </button>
        <LinkAction href={project.liveUrl} label="Live Demo" />
        <LinkAction href={project.githubUrl} label="GitHub" />
      </div>
    </article>
  );
}
