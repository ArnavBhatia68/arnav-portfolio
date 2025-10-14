import "./globals.css";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "Arnav Bhatia",
  description: "CS @ ASU — I build fast, clean web apps and practical ML features.",
  openGraph: {
    title: "Arnav Bhatia",
    description: "Portfolio and projects of Arnav Bhatia, Computer Science @ ASU",
    images: ["/og.png"],
    url: "https://arnav-portfolio.vercel.app",
    siteName: "Arnav Bhatia",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        {children}
        <footer className="max-w-4xl mx-auto px-4 py-10 text-sm text-gray-500">
          © {new Date().getFullYear()} Arnav Bhatia
        </footer>
        <Analytics />
      </body>
    </html>
  );
}
