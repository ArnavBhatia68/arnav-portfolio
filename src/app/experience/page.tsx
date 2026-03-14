import type { Metadata } from "next";
import ReferenceBlock from "@/components/ReferenceBlock";
import SectionHeader from "@/components/SectionHeader";
import SupportingDocumentsBlock from "@/components/SupportingDocumentsBlock";
import { experiences } from "@/data/experience";

export const metadata: Metadata = {
  title: "Experience",
  description: "Professional, research, and teaching experience with detailed contributions.",
};

export default function ExperiencePage() {
  return (
    <div className="space-y-10">
      <SectionHeader eyebrow="Experience" title="Detailed professional and academic experience" description="Full role-by-role details with references and support-document placeholders for future verification assets." />

      {experiences.map((item) => (
        <article key={item.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{item.role}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">{item.organization}</p>
            </div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{item.dates}</p>
          </div>

          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-600 dark:text-slate-300">
            {item.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>

          <div className="mt-4 flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-slate-200 px-2.5 py-1 text-xs text-slate-600 dark:border-slate-700 dark:text-slate-300">
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <ReferenceBlock label={item.referenceLabel} name={item.referenceName} email={item.referenceEmail} />
            <SupportingDocumentsBlock docs={item.supportingDocuments} />
          </div>
        </article>
      ))}
    </div>
  );
}
