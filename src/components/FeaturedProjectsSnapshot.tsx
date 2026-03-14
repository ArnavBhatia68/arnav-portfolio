"use client";

import { useState } from "react";
import type { Project } from "@/data/projects";
import ProjectCard from "./ProjectCard";
import ProjectDetailModal from "./ProjectDetailModal";

export default function FeaturedProjectsSnapshot({ projects }: { projects: Project[] }) {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  return (
    <>
      <div className="grid gap-5 md:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} onViewDetails={setActiveProject} />
        ))}
      </div>
      <ProjectDetailModal project={activeProject} onClose={() => setActiveProject(null)} />
    </>
  );
}
