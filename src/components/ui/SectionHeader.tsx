import type { ReactNode } from "react";

/**
 * Journal-style running header (index · label · rule) followed by a large
 * serif title and an optional standfirst.
 */
export function SectionHeader({
  index,
  label,
  title,
  aside,
  children,
}: {
  index: string;
  label: string;
  title: ReactNode;
  aside?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <header className="mb-14 md:mb-20">
      <div data-reveal className="flex items-center gap-4 border-t border-line pt-4">
        <span className="label whitespace-nowrap text-ink">§ {index}</span>
        <span className="label">{label}</span>
        {aside ? <span className="label ml-auto text-right">{aside}</span> : null}
      </div>
      <div className="mt-10 grid gap-x-6 gap-y-6 md:mt-14 md:grid-cols-12">
        <h2 data-reveal className="display text-balance text-[clamp(3rem,7.4vw,7rem)] md:col-span-7">
          {title}
        </h2>
        {children ? (
          <div
            data-reveal
            style={{ "--reveal-delay": 120 } as React.CSSProperties}
            className="max-w-xl text-pretty text-[17px] leading-relaxed text-ink-soft md:col-span-5 md:self-end md:pb-3"
          >
            {children}
          </div>
        ) : null}
      </div>
    </header>
  );
}
