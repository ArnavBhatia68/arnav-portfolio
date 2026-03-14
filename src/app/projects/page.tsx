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
        description="Use filters to explore categories. Click any card to open a full project detail view with impact metrics and implementation highlights."
      />
      <ProjectsGrid projects={projects} />
    </div>
  );
}
