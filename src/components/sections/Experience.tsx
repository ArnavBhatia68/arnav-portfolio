import { SectionHeader } from "@/components/ui/SectionHeader";
import { experiences } from "@/data/experience";
import { concurrency, formatMonthIndex, NOW_INDEX, parseRange } from "@/lib/dates";
import { ExperienceChart, type TimelineRow } from "./ExperienceChart";

const PLACEHOLDER_EMAIL = /@example\.(com|org)$/i;

export function Experience() {
  const rows: TimelineRow[] = experiences
    .map((item): TimelineRow | null => {
      const range = parseRange(item.dates);
      if (!range) return null;
      const [org, note] = item.organization.split(/\s+\((.*)\)\s*$/);
      const letters = (item.supportingDocuments ?? []).filter((doc): doc is { label: string; fileUrl: string } => Boolean(doc.fileUrl));
      const hasReference = item.referenceName && item.referenceEmail && !PLACEHOLDER_EMAIL.test(item.referenceEmail);
      return {
        id: item.id,
        title: item.title,
        organization: org,
        organizationNote: note,
        dates: item.dates.replace(/\s+-\s+/, " – "),
        kind: item.kind,
        summary: item.summary,
        bullets: item.bullets,
        tags: item.tags,
        letters,
        reference:
          !letters.length && hasReference
            ? { label: item.referenceLabel ?? "Reference", name: item.referenceName!, email: item.referenceEmail! }
            : undefined,
        start: range.start,
        end: range.end,
        ongoing: range.ongoing,
      };
    })
    .filter((row): row is TimelineRow => row !== null)
    .sort((a, b) => b.start - a.start || b.end - a.end);

  const first = Math.min(...rows.map((row) => row.start));
  const domainStart = Math.floor(first / 12) * 12;
  const domainEnd = NOW_INDEX + 3;
  const counts = concurrency(rows, domainStart, NOW_INDEX + 1);
  const peak = Math.max(...counts);
  const peakMonth = domainStart + counts.indexOf(peak);
  const years: number[] = [];
  for (let y = domainStart / 12; y * 12 <= NOW_INDEX; y++) years.push(y);

  return (
    <section id="experience" aria-label="Experience" className="shell py-20 md:py-28">
      <SectionHeader
        index="03"
        label="Experience"
        aside={`${rows.length} roles`}
        title={
          <>
            Experience, <em className="italic">in&nbsp;parallel</em>
          </>
        }
      >
        Industry, research and teaching since {Math.floor(first / 12)} — and rarely one at a time. At the busiest point,{" "}
        <span className="text-ink">{peak} roles were running concurrently</span>. Open any row for the details.
      </SectionHeader>

      <ExperienceChart
        rows={rows}
        domainStart={domainStart}
        domainEnd={domainEnd}
        now={NOW_INDEX}
        counts={counts}
        years={years}
        peak={{ count: peak, label: formatMonthIndex(peakMonth) }}
      />
    </section>
  );
}
