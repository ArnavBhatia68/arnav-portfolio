import type { Metadata } from "next";
import Link from "next/link";
import CTAButton from "@/components/CTAButton";
import ExperienceSnapshot from "@/components/ExperienceSnapshot";
import FeaturedProjectsSnapshot from "@/components/FeaturedProjectsSnapshot";
import LeadershipSummaryCard from "@/components/LeadershipSummaryCard";
import SectionHeader from "@/components/SectionHeader";
import StatCard from "@/components/StatCard";
import { awardsSnapshot } from "@/data/certificates";
import { experiences } from "@/data/experience";
import { leadershipItems } from "@/data/leadership";
import { heroStats, profile } from "@/data/profile";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Home",
  description: "Premium multi-page software engineering portfolio for Arnav Bhatia.",
};

export default function HomePage() {
  return (
    <div className="space-y-16">
      <section className="relative overflow-hidden rounded-3xl border border-cyan-100 bg-gradient-to-br from-white via-cyan-50/60 to-indigo-50/60 p-8 shadow-md dark:border-slate-800 dark:from-slate-900 dark:via-slate-900 dark:to-indigo-950/30 md:p-10">
        <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -right-16 h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl" />

        <div className="relative">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-600 dark:text-cyan-400">{profile.location}</p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white md:text-6xl">{profile.name}</h1>
          <p className="mt-3 text-lg font-semibold text-slate-700 dark:text-slate-200 md:text-xl">{profile.headline}</p>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-600 dark:text-slate-300 md:text-base">{profile.intro}</p>

          <div className="mt-5 flex flex-wrap gap-2">
            {["ASU Computer Science", "GPA 4.0", "Open to SWE / ML / Research"].map((badge) => (
              <span key={badge} className="rounded-full border border-cyan-200/80 bg-white/85 px-3 py-1 text-xs font-medium text-cyan-700 shadow-sm dark:border-cyan-700/50 dark:bg-slate-900/80 dark:text-cyan-300">
                {badge}
              </span>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <CTAButton href="/about" variant="secondary">About</CTAButton>
            <CTAButton href="/resume" variant="secondary">View Resume</CTAButton>
            <CTAButton href="/resume" variant="secondary">View Transcript</CTAButton>
            <CTAButton href="/contact" variant="secondary">Contact Me</CTAButton>
            <CTAButton href={profile.github} variant="secondary" external>GitHub</CTAButton>
            <CTAButton href={profile.linkedin} variant="secondary" external>LinkedIn</CTAButton>
          </div>
        </div>
      </section>

      <section>
        <SectionHeader title="Impact Snapshot" description="Performance signals across academics, engineering delivery, and teaching impact." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {heroStats.map((stat) => (
            <StatCard key={stat.label} value={stat.value} label={stat.label} />
          ))}
        </div>
      </section>

      <section>
        <SectionHeader
          title="Featured Projects Snapshot"
          description="Engineering work spanning scalable product systems, applied AI, and research pipelines."
          action={<Link className="text-sm font-semibold text-cyan-700 transition hover:text-indigo-600 dark:text-cyan-300" href="/projects">View all projects →</Link>}
        />
        <FeaturedProjectsSnapshot projects={projects.filter((project) => project.featured)} />
      </section>

      <section>
        <SectionHeader
          title="Experience Snapshot"
          description="Industry, research, and teaching roles with measurable outcomes and clear ownership."
          action={<Link className="text-sm font-semibold text-cyan-700 transition hover:text-indigo-600 dark:text-cyan-300" href="/experience">Open full experience page →</Link>}
        />
        <ExperienceSnapshot items={experiences} />
      </section>

      <section>
        <SectionHeader title="Awards Snapshot" action={<Link className="text-sm font-semibold text-amber-700 transition hover:text-amber-600 dark:text-amber-300" href="/certificates">View All Certificates →</Link>} />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {awardsSnapshot.map((award) => (
            <div key={`${award.title}-${award.date}`} className="rounded-2xl border border-amber-200 bg-gradient-to-br from-white to-amber-50/50 p-4 shadow-sm dark:border-amber-900/40 dark:from-slate-900 dark:to-amber-950/20">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">{award.title}</h3>
              <p className="mt-1 text-xs text-amber-700 dark:text-amber-300">{award.date}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionHeader title="Leadership / Volunteering Snapshot" action={<Link className="text-sm font-semibold text-emerald-700 transition hover:text-emerald-600 dark:text-emerald-300" href="/leadership">View details →</Link>} />
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {leadershipItems.map((item) => (
            <LeadershipSummaryCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-cyan-200 bg-gradient-to-r from-cyan-50 to-indigo-50 p-6 dark:border-cyan-900/50 dark:from-cyan-950/20 dark:to-indigo-950/20">
        <h2 className="text-2xl font-bold">Let’s build something meaningful.</h2>
        <p className="mt-2 text-slate-700 dark:text-slate-300">{profile.opportunityCta}</p>
        <div className="mt-4 flex flex-wrap gap-4 text-sm">
          <a href={`mailto:${profile.email}`} className="font-medium text-cyan-700 dark:text-cyan-300">✉ {profile.email}</a>
          <a href={profile.github} target="_blank" rel="noreferrer" className="font-medium text-cyan-700 dark:text-cyan-300">⌘ GitHub</a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="font-medium text-cyan-700 dark:text-cyan-300">in LinkedIn</a>
          <span className="font-medium text-slate-700 dark:text-slate-300">☎ {profile.phone}</span>
        </div>
      </section>
    </div>
  );
}
