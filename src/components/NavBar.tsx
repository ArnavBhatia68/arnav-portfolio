import Link from "next/link";

export default function NavBar() {
  return (
    <header className="sticky top-0 bg-white/80 backdrop-blur border-b border-gray-100">
      <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="font-semibold">AB</Link>
        <nav className="flex gap-4 text-sm text-gray-700">
          <Link href="/" className="hover:underline">Home</Link>
          <Link href="/about" className="hover:underline">About</Link>
          <Link href="/contact" className="hover:underline">Contact</Link>
        </nav>
      </div>
    </header>
  );
}
