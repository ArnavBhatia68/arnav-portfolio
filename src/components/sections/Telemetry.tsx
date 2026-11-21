import { CountUp } from "@/components/ui/CountUp";
import { telemetry } from "@/data/profile";

export function Telemetry() {
  return (
    <section aria-label="By the numbers" className="border-y border-line">
      <div className="shell">
        <div className="grid grid-cols-2 gap-px bg-line md:grid-cols-3 xl:grid-cols-6">
          {telemetry.map((item, i) => (
            <div
              key={item.label}
              data-reveal
              style={{ "--reveal-delay": i * 70 } as React.CSSProperties}
              className="flex flex-col justify-between gap-6 bg-paper px-1 py-8 sm:px-5 md:py-10 xl:first:pl-0"
            >
              <p className="label flex items-center gap-2">
                <span className="tabular text-ink">{String(i + 1).padStart(2, "0")}</span>
                {item.label}
              </p>
              <div>
                <p className="display text-[clamp(3.25rem,6vw,5rem)] leading-none tracking-[-0.03em] xl:text-[clamp(3rem,4.3vw,4.6rem)]">
                  <CountUp value={item.value} decimals={item.decimals} prefix={item.prefix} suffix={item.suffix} />
                </p>
                <p className="mt-3 font-mono text-[11px] text-muted">{item.note}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
