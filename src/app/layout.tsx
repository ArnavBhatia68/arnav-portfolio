import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/NavBar";
import { profile } from "@/data/profile";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: {
    default: site.title,
    template: `%s | ${profile.name}`,
  },
  description: site.description,
  metadataBase: new URL(site.url),
  openGraph: {
    title: site.title,
    description: site.description,
    url: site.url,
    siteName: site.title,
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased dark:bg-slate-950 dark:text-slate-100">
        <NavBar />
        <main className="mx-auto w-full max-w-6xl px-4 py-10">{children}</main>
        <footer className="border-t border-slate-200 px-4 py-8 text-sm text-slate-600 dark:border-slate-800 dark:text-slate-400">
          <div className="mx-auto flex max-w-6xl flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
            <p>{profile.opportunityCta}</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
