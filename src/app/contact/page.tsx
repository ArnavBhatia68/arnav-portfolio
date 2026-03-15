import type { Metadata } from "next";
import SectionHeader from "@/components/SectionHeader";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact details and opportunity availability for Arnav Bhatia.",
};

export default function ContactPage() {
  return (
    <div className="space-y-8">
      <SectionHeader eyebrow="Contact" title="Let’s connect" description={profile.opportunityCta} />

      <div className="grid gap-4 md:grid-cols-2">
        <a href={`mailto:${profile.email}`} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <p className="text-sm text-slate-500 dark:text-slate-400">Email</p>
          <p className="mt-1 font-semibold text-slate-900 dark:text-white">{profile.email}</p>
        </a>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <p className="text-sm text-slate-500 dark:text-slate-400">Location</p>
          <p className="mt-1 font-semibold text-slate-900 dark:text-white">{profile.location}</p>
        </div>
        <a href={`tel:${profile.phone.replace(/\s+/g, "")}`} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <p className="text-sm text-slate-500 dark:text-slate-400">Phone</p>
          <p className="mt-1 font-semibold text-slate-900 dark:text-white">{profile.phone}</p>
        </a>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <p className="text-sm text-slate-500 dark:text-slate-400">Social</p>
          <div className="mt-2 flex flex-col gap-1 text-sm">
            <a href={profile.github} target="_blank" rel="noreferrer" className="text-sky-700 dark:text-sky-300">GitHub</a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="text-sky-700 dark:text-sky-300">LinkedIn</a>
            <span className="text-slate-400">LeetCode coming soon</span>
            <span className="text-slate-400">Twitter/X coming soon</span>
          </div>
        </div>
      </div>
    </div>
  );
}
