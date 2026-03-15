import type { Metadata } from "next";
import ProjectsGrid from "@/components/ProjectsGrid";
import SectionHeader from "@/components/SectionHeader";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected full-stack, AI, and systems projects by Arnav Bhatia.",
};

export default function ProjectsPage() {
  return (
    <div>
      <SectionHeader
        eyebrow="Projects"
        title="Portfolio of engineered outcomes"
        description="Explore selected work across full-stack systems, applied AI, and research engineering. Open any project to view architecture, impact, and implementation details."
      />
      <ProjectsGrid projects={projects} />
    </div>
  );
}
