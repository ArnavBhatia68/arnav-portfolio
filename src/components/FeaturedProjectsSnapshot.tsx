"use client";

import { useMemo, useState } from "react";
import type { Project } from "@/data/projects";
import ProjectCard from "./ProjectCard";
import ProjectDetailModal from "./ProjectDetailModal";

export default function FeaturedProjectsSnapshot({ projects }: { projects: Project[] }) {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const uniqueProjects = useMemo(() => {
    const seen = new Set<string>();
    return projects.filter((project) => {
      if (seen.has(project.id)) return false;
      seen.add(project.id);
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
