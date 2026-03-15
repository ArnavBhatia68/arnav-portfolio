"use client";

import { useMemo, useState } from "react";
import type { Project } from "@/data/projects";
import ProjectCard from "./ProjectCard";
import ProjectDetailModal from "./ProjectDetailModal";

// Keep dedupe by both id and normalized content key to stay resilient after merge-conflict resolutions.
function projectKey(project: Project) {
  const titleKey = project.title.trim().toLowerCase();
  const orgKey = (project.organization ?? "").trim().toLowerCase();
  return `${titleKey}::${orgKey}`;
}

export default function FeaturedProjectsSnapshot({ projects }: { projects: Project[] }) {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const uniqueProjects = useMemo(() => {
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

  return (
    <>
      <div className="grid gap-5 md:grid-cols-2">
        {uniqueProjects.map((project) => (
          <ProjectCard key={project.id} project={project} onViewDetails={setActiveProject} />
        ))}
      </div>
      <ProjectDetailModal project={activeProject} onClose={() => setActiveProject(null)} />
    </>
  );
}
