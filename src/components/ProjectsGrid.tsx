"use client";

import { useMemo, useState } from "react";
import type { Project, ProjectCategory } from "@/data/projects";
import ProjectCard from "./ProjectCard";
import ProjectDetailModal from "./ProjectDetailModal";

const filters: Array<ProjectCategory | "All"> = ["All", "Full-Stack", "AI/ML", "Research"];

function projectKey(project: Project) {
  const titleKey = project.title.trim().toLowerCase();
  const orgKey = (project.organization ?? "").trim().toLowerCase();
  return `${titleKey}::${orgKey}`;
}

export default function ProjectsGrid({ projects }: { projects: Project[] }) {
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>("All");
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const dedupedProjects = useMemo(() => {
    const seenIds = new Set<string>();
    const seenContentKeys = new Set<string>();

    return projects.filter((project) => {
      const key = projectKey(project);
      if (seenIds.has(project.id) || seenContentKeys.has(key)) return false;
      seenIds.add(project.id);
      seenContentKeys.add(key);
      return true;
    });
  }, [projects]);

  const visibleProjects = useMemo(
    () =>
      activeFilter === "All"
        ? dedupedProjects
        : dedupedProjects.filter((project) => project.category === activeFilter),
    [activeFilter, dedupedProjects],
  );

  return (
    <>
      <div className="mb-6 flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setActiveFilter(filter)}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
              activeFilter === filter
                ? "border-sky-600 bg-sky-600 text-white"
                : "border-slate-300 bg-white text-slate-700 hover:border-sky-400 hover:text-sky-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        {visibleProjects.map((project) => (
          <ProjectCard key={project.id} project={project} onViewDetails={setActiveProject} />
        ))}
      </div>
      <ProjectDetailModal project={activeProject} onClose={() => setActiveProject(null)} />
    </>
  );
}
