import type { Metadata } from "next";
import SectionHeader from "@/components/SectionHeader";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: "Resume",
  description: "Resume and transcript viewer for Arnav Bhatia.",
};

function ResourceButton({ href, label, download }: { href: string; label: string; download?: boolean }) {
  const available = !href.includes("TODO");

  if (!available) {
    return <span className="rounded-xl border border-dashed border-slate-300 px-4 py-2 text-sm font-medium text-slate-400 dark:border-slate-700">{label} coming soon</span>;
  }

  return (
    <a
      href={href}
      {...(download ? { download: true } : {})}
      target={download ? undefined : "_blank"}
      rel={download ? undefined : "noreferrer"}
      className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:border-sky-400 hover:text-sky-700 dark:border-slate-700 dark:text-slate-200"
    >
      {label}
    </a>
  );
}

export default function ResumePage() {
  return (
    <div className="space-y-8">
      <SectionHeader eyebrow="Resume" title="Resume & Transcript" description="View and download actions are wired to asset paths and gracefully handle pending files." />

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

      <div className="flex flex-wrap gap-3">
        <ResourceButton href={profile.resumePath} label="View Resume" />
        <ResourceButton href={profile.resumePath} label="Download Resume" download />
        <ResourceButton href={profile.transcriptPath} label="View Transcript" />
        <ResourceButton href={profile.transcriptPath} label="Download Transcript" download />
      </div>
    </div>
  );
}
