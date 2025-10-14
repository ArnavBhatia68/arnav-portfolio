import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/NavBar";

export const metadata: Metadata = {
  title: "Arnav Bhatia — Portfolio",
  description: "CS @ ASU. I build clean, fast web apps and ML features.",
  openGraph: {
    title: "Arnav Bhatia — Portfolio",
    description: "CS @ ASU. I build clean, fast web apps and ML features."
  },
  metadataBase: new URL("https://example.com")
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <NavBar />
        <main className="max-w-4xl mx-auto px-4 py-10">{children}</main>
        <footer className="max-w-4xl mx-auto px-4 py-10 text-sm text-gray-500">
          © {new Date().getFullYear()} Arnav Bhatia
        </footer>
      </body>
    </html>
  );
}
