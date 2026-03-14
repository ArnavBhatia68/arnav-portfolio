import type { Metadata } from "next";
import ExperienceTimelineCard from "@/components/ExperienceTimelineCard";
import SectionHeader from "@/components/SectionHeader";
import { additionalExperience, featuredExperience } from "@/data/experience";

export const metadata: Metadata = {
  title: "Experience",
  description: "Professional, research, and teaching experience timeline.",
};

export default function ExperiencePage() {
  return (
    <div className="space-y-10">
      <section>
        <SectionHeader eyebrow="Experience" title="Work, research, and academic impact" />
        <div className="space-y-4">
          {featuredExperience.map((item) => (
            <ExperienceTimelineCard key={`${item.company}-${item.role}`} item={item} />
          ))}
        </div>
      </section>

      <section>
        <SectionHeader title="Additional Roles" />
        <div className="grid gap-3 md:grid-cols-2">
          {additionalExperience.map((item) => (
            <div key={`${item.company}-${item.role}`} className="rounded-xl border border-slate-200 bg-white p-4 text-sm shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <p className="font-semibold text-slate-900 dark:text-white">{item.role}</p>
              <p className="text-slate-600 dark:text-slate-300">{item.company}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{item.period}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
