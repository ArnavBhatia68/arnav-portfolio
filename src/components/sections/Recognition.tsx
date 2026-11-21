import { SectionHeader } from "@/components/ui/SectionHeader";
import { awards, deansList, type Certificate } from "@/data/certificates";

function Seal({ cert }: { cert: Certificate }) {
  const [season, year] = cert.period.split(" ");
  const ringId = `ring-${cert.id}`;
  return (
    <a
      href={cert.filePath}
      target="_blank"
      rel="noreferrer"
      aria-label={`Dean’s List certificate, ${cert.period} (PDF)`}
      className="group flex flex-col items-center gap-3 text-ink transition-colors hover:text-signal-ink"
    >
      <svg viewBox="0 0 120 120" className="w-full max-w-[136px]" aria-hidden>
        <defs>
          <path id={ringId} d="M60,60 m-45,0 a45,45 0 1,1 90,0 a45,45 0 1,1 -90,0" />
        </defs>
        <circle cx="60" cy="60" r="57" fill="none" stroke="currentColor" strokeWidth="1" />
        <circle cx="60" cy="60" r="35" fill="none" stroke="currentColor" strokeWidth="0.75" strokeDasharray="1.5 3" />
        <g className="seal-ring">
          <text fontSize="8" fill="currentColor" className="font-mono" letterSpacing="1.4">
            <textPath href={`#${ringId}`} textLength="281" lengthAdjust="spacing">
              DEAN’S LIST · ARIZONA STATE UNIVERSITY ·
            </textPath>
          </text>
        </g>
        <text x="60" y="58" textAnchor="middle" className="font-serif" fontSize="19" fill="currentColor">
          {season}
        </text>
        <text x="60" y="77" textAnchor="middle" className="font-serif italic" fontSize="19" fill="currentColor">
          ’{year?.slice(2)}
        </text>
      </svg>
      <span className="label transition-colors group-hover:text-ink">PDF ↗</span>
    </a>
  );
}

export function Recognition() {
  return (
    <section id="recognition" aria-label="Recognition" className="shell py-20 md:py-28">
      <SectionHeader index="04" label="Recognition" aside="Honors & awards" title={<>On the <em className="italic">record</em></>}>
        A 4.0 across a computer science degree, TA of the Year, and Arizona State’s Moeur Award for academic
        excellence.
      </SectionHeader>

      <ol className="border-t border-line">
        {awards.map((award, i) => (
          <li
            key={award.id}
            data-reveal
            style={{ "--reveal-delay": i * 80 } as React.CSSProperties}
            className="group grid grid-cols-1 gap-x-6 gap-y-3 border-b border-line py-8 md:grid-cols-12 md:items-baseline"
          >
            <span className="label tabular md:col-span-2">{award.period}</span>
            <div className="md:col-span-7">
              <p className="display text-balance text-[clamp(2rem,4vw,3.6rem)] leading-[0.98] tracking-[-0.02em] transition-transform duration-700 ease-out-expo group-hover:translate-x-2">
                {award.title}
              </p>
              {award.issuer ? <p className="mt-3 text-[14.5px] text-muted">{award.issuer}</p> : null}
            </div>
            {award.externalUrl ? (
              <a
                href={award.externalUrl}
                target="_blank"
                rel="noreferrer"
                className="label link-draw justify-self-start text-ink-soft hover:text-ink md:col-span-3 md:justify-self-end"
              >
                {award.externalLabel ?? "Learn more"} ↗
              </a>
            ) : null}
          </li>
        ))}
      </ol>

      <div className="mt-20 grid gap-10 md:grid-cols-12 md:gap-6">
        <div data-reveal className="md:col-span-4">
          <p className="label text-ink">Dean’s List × {deansList.length}</p>
          <p className="mt-4 max-w-xs text-[15.5px] leading-relaxed text-ink-soft">
            Six semesters of certificates, from {deansList[0]?.period} to {deansList[deansList.length - 1]?.period}. Each
            seal opens the original PDF.
          </p>
        </div>
        <ul data-reveal className="grid grid-cols-3 gap-x-4 gap-y-8 sm:grid-cols-6 md:col-span-8">
          {deansList.map((cert) => (
            <li key={cert.id}>
              <Seal cert={cert} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
