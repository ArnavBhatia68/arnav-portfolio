import type { Metadata } from "next";
import SectionHeader from "@/components/SectionHeader";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: "Resume",
  description: "Resume viewer and downloadable CV for Arnav Bhatia.",
};

export default function ResumePage() {
  const isTodo = profile.resumePath.startsWith("/TODO") || profile.resumePath.startsWith("TODO:");

  return (
    <div className="space-y-8">
      <SectionHeader eyebrow="Resume" title="View and download" description="The viewer is wired for a PDF asset path and can be updated as soon as the final file is provided." />

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <p className="text-sm text-slate-500 dark:text-slate-400">Focus</p>
          <p className="mt-1 font-semibold">Software Engineering + Distributed Systems</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <p className="text-sm text-slate-500 dark:text-slate-400">Education</p>
          <p className="mt-1 font-semibold">ASU CS, GPA 4.0</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <p className="text-sm text-slate-500 dark:text-slate-400">Open To</p>
          <p className="mt-1 font-semibold">SWE / ML / Research Roles</p>
        </div>
      </div>

      {isTodo ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
          TODO: Add final resume PDF to <code>public/</code> and replace <code>profile.resumePath</code>.
        </div>
      ) : (
        <>
          <div className="flex gap-3">
            <a href={profile.resumePath} target="_blank" rel="noreferrer" className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium dark:border-slate-700">
              View Resume
            </a>
            <a href={profile.resumePath} download className="rounded-xl bg-sky-600 px-4 py-2 text-sm font-medium text-white">
              Download Resume
            </a>
          </div>
          <iframe title="Resume" src={profile.resumePath} className="h-[70vh] w-full rounded-2xl border border-slate-200 bg-white dark:border-slate-800" />
        </>
      )}
    </div>
  );
}
