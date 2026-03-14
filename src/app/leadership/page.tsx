import type { Metadata } from "next";
import ReferenceBlock from "@/components/ReferenceBlock";
import SectionHeader from "@/components/SectionHeader";
import SupportingDocumentsBlock from "@/components/SupportingDocumentsBlock";
import { leadershipItems } from "@/data/leadership";

export const metadata: Metadata = {
  title: "Leadership",
  description: "Leadership and volunteering contributions.",
};

export default function LeadershipPage() {
  return (
    <div className="space-y-8">
      <SectionHeader eyebrow="Leadership & Volunteering" title="Community impact and leadership" />
      {leadershipItems.map((item) => (
        <article key={item.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{item.role}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">{item.organization}</p>
              {item.location ? <p className="text-xs text-slate-500 dark:text-slate-400">{item.location}</p> : null}
            </div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{item.dates}</p>
          </div>

          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-600 dark:text-slate-300">
            {item.bullets.map((detail) => (
              <li key={detail}>{detail}</li>
            ))}
          </ul>

          {(() => {
            const hasLetter = Boolean(item.supportingDocuments?.some((doc) => doc.fileUrl));
            return (
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                {!hasLetter ? <ReferenceBlock label={item.referenceLabel} name={item.referenceName} email={item.referenceEmail} /> : null}
                <SupportingDocumentsBlock docs={item.supportingDocuments} />
              </div>
            );
          })()}
        </article>
      ))}
    </div>
  );
}
