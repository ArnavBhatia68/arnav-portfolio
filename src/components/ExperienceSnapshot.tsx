"use client";

import { useState } from "react";
import type { ExperienceItem } from "@/data/experience";
import ExperienceSummaryCard from "./ExperienceSummaryCard";
import ReferenceBlock from "./ReferenceBlock";
import SupportingDocumentsBlock from "./SupportingDocumentsBlock";

export default function ExperienceSnapshot({ items }: { items: ExperienceItem[] }) {
  const [active, setActive] = useState<ExperienceItem | null>(null);

  return (
    <>
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <ExperienceSummaryCard key={item.id} item={item} onViewDetails={setActive} />
        ))}
      </div>

      {active ? (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/60 p-4" onClick={() => setActive(null)}>
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl dark:bg-slate-900" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{active.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300">{active.organization}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{active.dates}</p>
              </div>
              <button type="button" onClick={() => setActive(null)} className="rounded-full border border-slate-300 px-3 py-1 text-xs dark:border-slate-700">Close</button>
            </div>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-600 dark:text-slate-300">
              {active.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
            {(() => {
              const hasLetter = Boolean(active.supportingDocuments?.some((doc) => doc.fileUrl));
              return (
                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  {!hasLetter ? <ReferenceBlock label={active.referenceLabel} name={active.referenceName} email={active.referenceEmail} /> : null}
                  <SupportingDocumentsBlock docs={active.supportingDocuments} />
                </div>
              );
            })()}
          </div>
        </div>
      ) : null}
    </>
  );
}
