import type { Metadata } from "next";
import CTAButton from "@/components/CTAButton";
import ExperienceTimelineCard from "@/components/ExperienceTimelineCard";
import ProjectCard from "@/components/ProjectCard";
import SectionHeader from "@/components/SectionHeader";
import StatCard from "@/components/StatCard";
import { highlightedAwards } from "@/data/awards";
import { featuredExperience } from "@/data/experience";
import { heroStats, profile } from "@/data/profile";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Home",
  description: "Premium multi-page software engineering portfolio for Arnav Bhatia.",
};

export default function HomePage() {
  return (
    <div className="space-y-16">
      <section className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-sky-50 p-8 shadow-sm dark:border-slate-800 dark:from-slate-900 dark:to-slate-900">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-600 dark:text-sky-400">{profile.location}</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">{profile.name}</h1>
        <p className="mt-2 text-lg font-medium text-slate-700 dark:text-slate-200">{profile.headline}</p>
        <p className="mt-4 max-w-4xl text-slate-600 dark:text-slate-300">{profile.intro}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <CTAButton href="/resume">View Resume</CTAButton>
          <CTAButton href="/contact" variant="secondary">Contact Me</CTAButton>
          <CTAButton href={profile.github} variant="secondary" external>GitHub</CTAButton>
          <CTAButton href={profile.linkedin} variant="secondary" external>LinkedIn</CTAButton>
        </div>
      </section>

      <section>
        <SectionHeader title="Impact Snapshot" description="Quick metrics across academics, systems, and teaching." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {heroStats.map((stat) => (
            <StatCard key={stat.label} value={stat.value} label={stat.label} />
          ))}
        </div>
      </section>

      <section>
        <SectionHeader title="Featured Projects" description="Production-minded builds in AI, distributed systems, and full-stack product engineering." />
        <div className="grid gap-5 md:grid-cols-2">
          {projects.filter((project) => project.featured).map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      <section>
        <SectionHeader title="Experience Snapshot" description="Selected roles spanning research, product engineering, and high-volume teaching support." />
        <div className="grid gap-4 md:grid-cols-2">
          {featuredExperience.map((item) => (
            <ExperienceTimelineCard key={`${item.company}-${item.role}`} item={item} />
          ))}
        </div>
      </section>

      <section>
        <SectionHeader title="Awards Snapshot" />
        <div className="grid gap-4 md:grid-cols-2">
          {highlightedAwards.concat([{ title: "Dean’s List", date: "6 semesters" }]).map((award) => (
            <div key={`${award.title}-${award.date}`} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h3 className="font-semibold">{award.title}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">{award.date}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-sky-200 bg-sky-50 p-6 dark:border-sky-800 dark:bg-sky-950/30">
        <h2 className="text-2xl font-bold">Let’s build something meaningful.</h2>
        <p className="mt-2 text-slate-700 dark:text-slate-300">{profile.opportunityCta}</p>
        <div className="mt-4 flex flex-wrap gap-4 text-sm">
          <a href={`mailto:${profile.email}`} className="font-medium text-sky-700 dark:text-sky-300">{profile.email}</a>
          <a href={profile.github} target="_blank" rel="noreferrer" className="font-medium text-sky-700 dark:text-sky-300">GitHub</a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="font-medium text-sky-700 dark:text-sky-300">LinkedIn</a>
          <span className="font-medium text-slate-700 dark:text-slate-300">{profile.phone}</span>
        </div>
      </section>
    </div>
  );
}
