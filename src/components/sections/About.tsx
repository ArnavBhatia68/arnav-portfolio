import { Emphasis } from "@/components/ui/Emphasis";
import { aboutNarrative, facts, statement } from "@/data/profile";

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="shell pb-24 pt-28 md:pb-32 md:pt-40">
      <div data-reveal className="flex items-center gap-4 border-t border-line pt-4">
        <span className="label text-ink">§ 01</span>
        <span className="label">About</span>
        <span className="label ml-auto hidden sm:block">Tempe, Arizona</span>
      </div>

      <h2 id="about-title" className="sr-only">
        About
      </h2>

      <p
        data-reveal
        className="display mt-12 max-w-[22ch] text-balance text-[clamp(2.35rem,5.4vw,5.4rem)] leading-[1] tracking-[-0.03em] md:mt-16"
      >
        <Emphasis text={statement} />
      </p>

      <div className="mt-16 grid gap-12 md:mt-24 md:grid-cols-12 md:gap-6">
        <div data-reveal className="md:col-span-6 lg:col-span-5">
          <p className="label mb-5">In my own words</p>
          <p className="text-pretty text-[17px] leading-[1.75] text-ink-soft">
            {aboutNarrative}
          </p>
        </div>

        <dl
          data-reveal
          style={{ "--reveal-delay": 120 } as React.CSSProperties}
          className="divide-y divide-line border-y border-line md:col-span-6 lg:col-span-6 lg:col-start-7"
        >
          {facts.map((fact) => (
            <div key={fact.label} className="grid grid-cols-[7.5rem_1fr] gap-4 py-4 sm:grid-cols-[9rem_1fr]">
              <dt className="label pt-[3px]">{fact.label}</dt>
              <dd className="text-[15.5px] leading-snug text-ink">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
