import Link from "next/link";
import { navItems } from "@/data/site";
import ThemeToggle from "./ThemeToggle";

export default function NavBar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/85 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/85">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4">
        <Link href="/" className="rounded-md bg-gradient-to-r from-cyan-500 to-indigo-500 bg-clip-text text-sm font-extrabold tracking-wide text-transparent">
          AB
        </Link>
        <nav className="hidden items-center gap-2 text-sm md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-1.5 text-slate-600 transition hover:bg-cyan-50 hover:text-cyan-700 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-cyan-300"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <ThemeToggle />
      </div>
      <nav className="mx-auto flex w-full max-w-6xl gap-2 overflow-x-auto px-4 pb-3 text-xs md:hidden">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} className="whitespace-nowrap rounded-full border border-slate-200 bg-white px-3 py-1 text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
