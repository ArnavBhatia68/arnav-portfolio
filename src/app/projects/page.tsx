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
        description="Each project card prioritizes live demo links first, then source code. Missing links are clearly marked as TODO placeholders."
      />
      <ProjectsGrid projects={projects} />
    </div>
  );
}
