import type { Metadata } from "next";
import { statSync } from "node:fs";
import path from "node:path";
import { awards, deansList } from "@/data/certificates";
import { experiences } from "@/data/experience";
import { leadershipItems } from "@/data/leadership";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: "Records",
  description: "Résumé, transcript, Dean’s List certificates, letters of appreciation and award references for Arnav Bhatia.",
  alternates: { canonical: "/records" },
};

/** File size of something in /public, measured at build time. */
function fileSize(publicPath: string) {
  try {
    const bytes = statSync(path.join(process.cwd(), "public", decodeURIComponent(publicPath))).size;
    return bytes >= 1_000_000 ? `${(bytes / 1_000_000).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1000))} KB`;
  } catch {
    return null;
  }
}

type DocRecord = {
  title: string;
  meta: string;
  href: string;
  download?: string;
  external?: boolean;
};

function RecordRow({ record, index }: { record: DocRecord; index: number }) {
  const size = record.external ? null : fileSize(record.href);
  return (
    <li className="group grid grid-cols-[2.5rem_1fr] items-baseline gap-x-4 gap-y-3 border-b border-line py-6 md:grid-cols-[3.5rem_1fr_8rem_13rem] md:items-center md:gap-x-6">
      <span className="label tabular">{String(index + 1).padStart(2, "0")}</span>
      <div className="min-w-0">
        <p className="text-[clamp(1.35rem,2.2vw,1.75rem)] leading-tight text-ink">
          <span className="font-serif">{record.title}</span>
        </p>
        <p className="mt-1.5 font-mono text-[11.5px] text-muted">{record.meta}</p>
      </div>
      <p className="label col-start-2 md:col-start-auto">
        {record.external ? "External link" : `PDF${size ? ` · ${size}` : ""}`}
      </p>
      <div className="col-start-2 flex flex-wrap gap-2 md:col-start-auto md:justify-end">
        <a
          href={record.href}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-9 items-center gap-2 rounded-full border border-line-strong px-4 text-[13px] text-ink transition-colors hover:border-ink"
        >
          {record.external ? "Visit" : "View"} <span aria-hidden>↗</span>
        </a>
        {record.download ? (
          <a
            href={record.href}
            download={record.download}
            className="inline-flex h-9 items-center gap-2 rounded-full bg-ink px-4 text-[13px] text-paper transition-transform duration-500 ease-out-expo hover:-translate-y-0.5"
          >
            Download <span aria-hidden>↓</span>
          </a>
        ) : null}
      </div>
    </li>
  );
}

function Shelf({ id, index, title, note, records }: { id: string; index: string; title: string; note: string; records: DocRecord[] }) {
  return (
    <section id={id} data-reveal className="grid gap-6 border-t border-line pt-6 md:grid-cols-12 md:gap-6">
      <div className="md:col-span-3">
        <h2 className="label">
          <span className="text-ink">{index}</span> — {title}
        </h2>
        <p className="mt-3 max-w-[16rem] text-[14px] leading-relaxed text-muted">{note}</p>
      </div>
      <ol className="md:col-span-9">
        {records.map((record, i) => (
          <RecordRow key={record.href} record={record} index={i} />
        ))}
      </ol>
    </section>
  );
}

export default function RecordsPage() {
  const letters: DocRecord[] = [
    ...experiences.flatMap((item) =>
      (item.supportingDocuments ?? [])
        .filter((doc) => doc.fileUrl)
        .map((doc) => ({ title: doc.label, meta: `${item.organization.split(" (")[0]} · ${item.role}`, href: doc.fileUrl! })),
    ),
    ...leadershipItems.flatMap((item) =>
      (item.supportingDocuments ?? [])
        .filter((doc) => doc.fileUrl)
        .map((doc) => ({ title: doc.label, meta: `${item.organization} · ${item.role}`, href: doc.fileUrl! })),
    ),
  ];

  return (
    <div className="shell pb-24 pt-[calc(var(--header-h)+28px)] md:pb-36">
      <header className="grid gap-8 border-b border-line pb-14 pt-12 md:grid-cols-12 md:pb-20 md:pt-20">
        <p className="hero-fade label md:col-span-12">Records · {deansList.length + letters.length + 2} documents</p>
        <h1 className="display text-[clamp(4rem,12vw,11rem)] leading-[0.85] tracking-[-0.04em] md:col-span-8">
          <span className="-mb-[0.1em] block overflow-hidden pb-[0.1em]">
            <span className="hero-rise [--d:60ms]">
              Paper <em className="italic">trail</em>
            </span>
          </span>
        </h1>
        <p className="hero-fade max-w-md self-end text-pretty text-[17px] leading-relaxed text-ink-soft md:col-span-4 [--d:250ms]">
          The primary sources behind everything on this site — résumé, transcript, certificates and letters, each one
          a click away.
        </p>
      </header>

      <div className="mt-16 space-y-20 md:mt-24 md:space-y-28">
        <Shelf
          id="resume"
          index="01"
          title="Résumé & transcript"
          note="The current résumé and academic transcript."
          records={[
            { title: "Résumé", meta: `${profile.name} · Computer Science`, href: profile.resumePath, download: "ArnavBhatia_Resume.pdf" },
            { title: "Transcript", meta: "Arizona State University · B.S. Computer Science", href: profile.transcriptPath, download: "ArnavBhatia_Transcript.pdf" },
          ]}
        />
        <Shelf
          id="deans-list"
          index="02"
          title="Dean’s List"
          note={`${deansList.length} semesters of Dean’s List certificates.`}
          records={deansList.map((cert) => ({
            title: `Dean’s List — ${cert.period}`,
            meta: "Arizona State University",
            href: cert.filePath!,
            download: `DeansList_${cert.period.replace(/\s+/g, "_")}.pdf`,
          }))}
        />
        <Shelf
          id="letters"
          index="03"
          title="Letters"
          note="Letters of appreciation from internships and volunteering."
          records={letters}
        />
        <Shelf
          id="awards"
          index="04"
          title="Awards"
          note="Official pages describing each award."
          records={awards.map((award) => ({
            title: award.title,
            meta: `${award.period}${award.issuer ? ` · ${award.issuer}` : ""}`,
            href: award.externalUrl!,
            external: true,
          }))}
        />
      </div>
    </div>
  );
}
