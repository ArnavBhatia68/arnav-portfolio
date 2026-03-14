"use client";

import type { Project } from "@/data/projects";

export default function ProjectDetailModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/60 p-4" onClick={onClose}>
      <div
        className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-sky-600 dark:text-sky-400">{project.category}</p>
            <h3 className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">{project.title}</h3>
            {project.organization ? <p className="text-sm text-slate-500 dark:text-slate-400">{project.organization}</p> : null}
          </div>
          <button type="button" onClick={onClose} className="rounded-full border border-slate-300 px-3 py-1 text-xs dark:border-slate-700">
            Close
          </button>
        </div>

        <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">{project.summary}</p>
        <p className="mt-3 rounded-lg bg-sky-50 px-3 py-2 text-sm font-semibold text-sky-800 dark:bg-sky-900/30 dark:text-sky-300">Impact: {project.metric}</p>

        <h4 className="mt-5 text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Detailed Highlights</h4>
        <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-slate-600 dark:text-slate-300">
          {project.bullets.slice(0, 3).map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>

        <h4 className="mt-5 text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Tech Stack</h4>
        <div className="mt-2 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="rounded-full border border-slate-200 px-2.5 py-1 text-xs dark:border-slate-700">
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          <a
            href={project.liveUrl ?? "#"}
            target="_blank"
            rel="noreferrer"
            aria-disabled={!project.liveUrl}
            className={`rounded-xl px-4 py-2 text-sm font-semibold ${project.liveUrl ? "bg-sky-600 text-white hover:bg-sky-500" : "cursor-not-allowed border border-dashed border-slate-300 text-slate-400 dark:border-slate-700"}`}
          >
            Live Demo
          </a>
          <a
            href={project.githubUrl ?? "#"}
            target="_blank"
            rel="noreferrer"
            aria-disabled={!project.githubUrl}
            className={`rounded-xl px-4 py-2 text-sm font-semibold ${project.githubUrl ? "border border-slate-300 text-slate-700 hover:border-sky-400 hover:text-sky-700 dark:border-slate-700 dark:text-slate-200" : "cursor-not-allowed border border-dashed border-slate-300 text-slate-400 dark:border-slate-700"}`}
          >
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
}
