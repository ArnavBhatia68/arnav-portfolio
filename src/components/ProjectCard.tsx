import type { Project } from "@/data/projects";

type Props = {
  project: Project;
  onViewDetails: (project: Project) => void;
};

const categoryStyles: Record<Project["category"], { tint: string; badge: string }> = {
  "Full-Stack": {
    tint: "from-cyan-50/80 to-sky-100/40 dark:from-cyan-950/30 dark:to-sky-950/20",
    badge: "text-cyan-700 bg-cyan-100/70 dark:text-cyan-300 dark:bg-cyan-900/30",
  },
  Research: {
    tint: "from-indigo-50/80 to-violet-100/40 dark:from-indigo-950/30 dark:to-violet-950/20",
    badge: "text-indigo-700 bg-indigo-100/70 dark:text-indigo-300 dark:bg-indigo-900/30",
  },
  "AI/ML": {
    tint: "from-sky-50/80 to-indigo-100/40 dark:from-sky-950/30 dark:to-indigo-950/20",
    badge: "text-sky-700 bg-sky-100/70 dark:text-sky-300 dark:bg-sky-900/30",
  },
};

export default function ProjectCard({ project, onViewDetails }: Props) {
  const style = categoryStyles[project.category];

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
      className="group rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-cyan-200 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:border-slate-800 dark:bg-slate-900"
    >
      <div className={`mb-4 h-24 rounded-2xl border border-white/70 bg-gradient-to-r ${style.tint} p-4 shadow-inner dark:border-slate-800/70`}>
        <div className="flex h-full items-end justify-between">
          <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide ${style.badge}`}>{project.category}</span>
          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-300">{project.metric}</span>
        </div>
      </div>

      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{project.title}</h3>
          {project.organization ? <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{project.organization}</p> : null}
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
        {project.primaryAction ? (
          <a
            href={project.primaryAction.url}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border border-slate-300 px-3 py-1 text-xs font-medium text-slate-700 transition hover:border-sky-400 hover:text-sky-700 dark:border-slate-700 dark:text-slate-200"
            onClick={(event) => event.stopPropagation()}
          >
            {project.primaryAction.label}
          </a>
        ) : null}
        {project.githubUrl ? (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border border-slate-300 px-3 py-1 text-xs font-medium text-slate-700 transition hover:border-sky-400 hover:text-sky-700 dark:border-slate-700 dark:text-slate-200"
            onClick={(event) => event.stopPropagation()}
          >
            GitHub
          </a>
        ) : null}
      </div>

      <p className="line-clamp-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{project.summary}</p>

      <div className="mt-3 flex flex-wrap gap-2">
        {project.tags.slice(0, 4).map((tag) => (
          <span key={tag} className="rounded-full border border-slate-200/80 bg-slate-50 px-2 py-1 text-[11px] text-slate-600 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-300">
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
          className="rounded-lg bg-gradient-to-r from-cyan-500 to-indigo-500 px-3 py-1 text-xs font-semibold text-white shadow-sm transition hover:opacity-95"
        >
          View Details
        </button>
        {project.primaryAction ? (
          <a
            href={project.primaryAction.url}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border border-slate-300 px-3 py-1 text-xs font-medium text-slate-700 transition hover:border-cyan-400 hover:text-cyan-700 dark:border-slate-700 dark:text-slate-200"
            onClick={(event) => event.stopPropagation()}
          >
            {project.primaryAction.label}
          </a>
        ) : null}
        {project.githubUrl ? (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border border-slate-300 px-3 py-1 text-xs font-medium text-slate-700 transition hover:border-cyan-400 hover:text-cyan-700 dark:border-slate-700 dark:text-slate-200"
            onClick={(event) => event.stopPropagation()}
          >
            GitHub
          </a>
        ) : null}
      </div>
    </article>
  );
}
