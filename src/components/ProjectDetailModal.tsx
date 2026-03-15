"use client";

import type { Project } from "@/data/projects";

export default function ProjectDetailModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/65 p-4 backdrop-blur-sm" onClick={onClose}>
      <div
        className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-cyan-600 dark:text-cyan-400">{project.category}</p>
            <h3 className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">{project.title}</h3>
            {project.organization ? <p className="text-sm text-slate-500 dark:text-slate-400">{project.organization}</p> : null}
          </div>
          <button type="button" onClick={onClose} className="rounded-full border border-slate-300 px-3 py-1 text-xs dark:border-slate-700">
            Close
          </button>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{project.summary}</p>
        <p className="mt-3 rounded-lg bg-gradient-to-r from-cyan-50 to-indigo-50 px-3 py-2 text-sm font-semibold text-slate-700 dark:from-cyan-950/30 dark:to-indigo-950/30 dark:text-cyan-200">Impact: {project.metric}</p>

        <h4 className="mt-5 text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Detailed Highlights</h4>
        <ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          {project.bullets.slice(0, 3).map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>

        <h4 className="mt-5 text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Tech Stack</h4>
        <div className="mt-2 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs dark:border-slate-700 dark:bg-slate-800/60">
              {tag}
            </span>
          ))}
        </div>

        {project.primaryAction || project.githubUrl ? (
          <div className="mt-6 flex flex-wrap gap-2">
            {project.primaryAction ? (
              <a
                href={project.primaryAction.url}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-500 px-4 py-2 text-sm font-semibold text-white shadow-sm"
              >
                {project.primaryAction.label}
              </a>
            ) : null}
            {project.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-cyan-400 hover:text-cyan-700 dark:border-slate-700 dark:text-slate-200"
              >
                GitHub
              </a>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}
