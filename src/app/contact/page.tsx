export default function ContactPage() {
  const email = "abhati35@asu.edu";
  const subject = encodeURIComponent("Hi Arnav — via portfolio");
  const body = encodeURIComponent("Hey Arnav,\n\nI saw your portfolio and ...");

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Contact</h1>
      <p>Best ways to reach me:</p>

      <div className="grid gap-3 sm:grid-cols-2">
        <a
          className="px-4 py-3 rounded-xl border border-gray-200 hover:bg-gray-50"
          href={`mailto:${email}?subject=${subject}&body=${body}`}
        >
          Email me
        </a>

        <a
          className="px-4 py-3 rounded-xl border border-gray-200 hover:bg-gray-50"
          href="https://www.linkedin.com/in/bhatiaarnav/"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>

        <a
          className="px-4 py-3 rounded-xl border border-gray-200 hover:bg-gray-50"
          href="https://github.com/ArnavBhatia68"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>

        <a
          className="px-4 py-3 rounded-xl border border-gray-200 hover:bg-gray-50"
          href="/Resume-%20Arnav%20Bhatia_CS.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          Resume (PDF)
        </a>
      </div>

      
    </div>
  );
}
