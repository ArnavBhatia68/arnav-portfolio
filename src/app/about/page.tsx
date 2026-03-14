import type { Metadata } from "next";
import SectionHeader from "@/components/SectionHeader";
import { aboutNarrative, coursework, education, honors } from "@/data/profile";
import { skills } from "@/data/skills";

export const metadata: Metadata = {
  title: "About",
  description: "About Arnav Bhatia: software engineering, research, and teaching focus.",
};

export default function AboutPage() {
  return (
    <div className="space-y-12">
      <section>
        <SectionHeader eyebrow="About" title="Engineering-first mindset with research depth" />
        <p className="max-w-4xl leading-8 text-slate-600 dark:text-slate-300">{aboutNarrative}</p>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:col-span-2">
          <h3 className="text-xl font-semibold">Education</h3>
          <p className="mt-3 text-slate-700 dark:text-slate-200">{education.school}</p>
          <p className="text-slate-600 dark:text-slate-300">{education.degree}</p>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{education.dates} · {education.location}</p>
          <p className="mt-2 text-sm font-semibold text-sky-700 dark:text-sky-300">GPA: {education.gpa}</p>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h3 className="text-xl font-semibold">Honors</h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
            {honors.map((honor) => (
              <li key={honor}>• {honor}</li>
            ))}
          </ul>
        </article>
      </section>

      <section>
        <SectionHeader title="Relevant Coursework" />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {coursework.map((course) => (
            <div key={course} className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
              {course}
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h3 className="text-xl font-semibold">Teaching, Research, and Leadership</h3>
        <p className="mt-3 text-slate-600 dark:text-slate-300">
          My growth as an engineer has come from balancing production-style builds, experimental research, and student mentorship at scale. Teaching sharpened technical communication, research improved systems thinking under uncertainty, and leadership roles helped me operate with accountability across diverse teams.
        </p>
      </section>

      <section>
        <SectionHeader title="Skills" />
        <div className="grid gap-4 lg:grid-cols-2">
          {Object.entries(skills).map(([group, values]) => (
            <article key={group} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">{group}</h4>
              <div className="mt-3 flex flex-wrap gap-2">
                {values.map((skill) => (
                  <span key={skill} className="rounded-full border border-slate-200 px-3 py-1 text-xs dark:border-slate-700">
                    {skill}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
