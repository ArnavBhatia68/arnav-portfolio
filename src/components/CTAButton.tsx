export default function CTAButton({
  href,
  children,
  variant = "primary",
  external,
}: {
  href: string;
  children: string;
  variant?: "primary" | "secondary";
  external?: boolean;
}) {
  const className =
    variant === "primary"
      ? "group inline-flex items-center rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-500 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-cyan-500/20 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
      : "inline-flex items-center rounded-xl border border-slate-300/90 bg-white/90 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-cyan-300 hover:text-cyan-700 hover:shadow-md dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:border-cyan-500/60 dark:hover:text-cyan-300";

  return (
    <a href={href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined} className={className}>
      {children}
    </a>
  );
}
