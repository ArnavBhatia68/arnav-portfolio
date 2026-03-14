import Link from "next/link";
import { navItems } from "@/data/site";
import ThemeToggle from "./ThemeToggle";

export default function NavBar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4">
        <Link href="/" className="text-sm font-bold tracking-wide text-slate-900 dark:text-white">
          AB
        </Link>
        <nav className="hidden items-center gap-4 text-sm md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-slate-600 transition hover:text-sky-700 dark:text-slate-300 dark:hover:text-sky-300">
              {item.label}
            </Link>
          ))}
        </nav>
        <ThemeToggle />
      </div>
      <nav className="mx-auto flex w-full max-w-6xl gap-3 overflow-x-auto px-4 pb-3 text-xs md:hidden">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} className="whitespace-nowrap rounded-full border border-slate-200 px-3 py-1 text-slate-600 dark:border-slate-700 dark:text-slate-300">
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
