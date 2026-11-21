import { SectionHeader } from "@/components/ui/SectionHeader";
import { leadershipItems } from "@/data/leadership";

const PLACEHOLDER_EMAIL = /@example\.(com|org)$/i;

export function Leadership() {
  return (
    <section id="leadership" aria-label="Leadership and community" className="shell py-20 md:py-28">
      <SectionHeader index="05" label="Leadership & community" title={<>Leadership &amp; <em className="italic">community</em></>}>
        Supervising tutors for a STEM honors program, running campus campaigns, and volunteering with Rotary
        International and the Kadam Foundation.
      </SectionHeader>

      <div className="grid gap-px border-y border-line bg-line md:grid-cols-2">
        {leadershipItems.map((item, i) => {
          const letters = (item.supportingDocuments ?? []).filter((doc) => doc.fileUrl);
          const showContact = !letters.length && item.referenceEmail && !PLACEHOLDER_EMAIL.test(item.referenceEmail);
          return (
            <article
              key={item.id}
              data-reveal
              style={{ "--reveal-delay": (i % 2) * 100 } as React.CSSProperties}
              className="flex flex-col bg-paper py-10 md:odd:pr-12 md:even:pl-12"
            >
              <p className="label">
                <span className="tabular text-ink">{item.dates.replace(/\s+-\s+/, " – ")}</span>
                {item.location ? <> · {item.location.replace(", United States", "")}</> : null}
              </p>
              <h3 className="display mt-5 text-[clamp(2rem,3vw,2.6rem)] leading-[1] tracking-[-0.02em]">{item.role}</h3>
              <p className="mt-2 text-[15.5px] text-ink">{item.organization}</p>
              <p className="mt-5 text-pretty text-[15.5px] leading-relaxed text-ink-soft">{item.summary}</p>
              <ul className="mt-5 space-y-2.5">
                {item.bullets.map((bullet) => (
                  <li key={bullet} className="grid grid-cols-[1.25rem_1fr] text-[14.5px] leading-relaxed text-muted">
                    <span aria-hidden className="text-signal-ink">
                      ↳
                    </span>
                    <span className="text-pretty">{bullet}</span>
                  </li>
                ))}
              </ul>
              {letters.length || showContact ? (
                <div className="mt-auto flex flex-wrap gap-3 pt-7">
                  {letters.map((doc) => (
                    <a
                      key={doc.label}
                      href={doc.fileUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex h-9 items-center gap-2 rounded-full border border-line-strong px-4 text-[13px] text-ink transition-colors hover:border-ink"
                    >
                      {doc.label} <span className="font-mono text-[10.5px] text-muted">PDF ↗</span>
                    </a>
                  ))}
                  {showContact ? (
                    <a
                      href={`mailto:${item.referenceEmail}`}
                      className="inline-flex h-9 items-center gap-2 rounded-full border border-line-strong px-4 text-[13px] text-ink transition-colors hover:border-ink"
                    >
                      <span className="font-mono text-[10.5px] uppercase tracking-[0.08em] text-muted">{item.referenceLabel ?? "Contact"}</span>
                      {item.referenceName}
                    </a>
                  ) : null}
                </div>
              ) : null}
            </article>
          );
        })}
      </div>
    </section>
  );
}
