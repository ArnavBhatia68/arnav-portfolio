# Arnav Bhatia — Portfolio

An editorial, lab-notebook-style portfolio built around a live simulation of
cooperative aerial transport: three quadrotors carrying one payload without
talking to each other.

**Stack:** Next.js 16 (App Router, Turbopack) · React 19 · Tailwind CSS 4 ·
TypeScript · self-hosted Instrument Serif, Geist and Geist Mono. No UI or
animation libraries — the simulation, covers and charts are hand-written.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (all routes are static)
npm run lint
```

Requires Node 20.9+.

## Editing content

Everything you'd want to change lives in `src/data/` — components read from it.

| File | What it controls |
| --- | --- |
| `profile.ts` | Name, contact details, hero copy, About statement, facts, the numbers strip, coursework |
| `projects.ts` | Projects, taglines, metrics, which animated cover each uses |
| `architecture.ts` | The architecture diagram on each case-study page |
| `experience.ts` | Roles (the timeline parses `"Jun 2025 - Aug 2025"` / `"… - Present"` automatically) |
| `leadership.ts` | Leadership & volunteering |
| `certificates.ts` | Dean's List certificates and awards |
| `skills.ts` | Toolkit section |
| `site.ts` | Section order/labels, site URL, SEO description |

In `profile.ts → statement`, wrap words in `*asterisks*` for italics and
`==double equals==` for the accent colour.

PDFs live in `public/docs/`. The Records page shows their file sizes
automatically.

## Structure

```
src/
  app/
    page.tsx              home: hero + seven sections
    work/[slug]/page.tsx  case studies (one per project)
    records/page.tsx      résumé, transcript, certificates, letters
    opengraph-image.tsx   social share card
  components/
    hero/                 flight-sim.ts (physics + renderer), FlightDeck.tsx
    work/                 animated project covers, architecture diagrams
    sections/             home page sections, experience timeline
    site/                 header, footer, ⌘K command palette, theme toggle
  data/                   all content
```

Old URLs (`/projects`, `/experience`, `/resume`, `/certificates`, …) redirect
to their new homes — see `next.config.ts`.

## Details

- **⌘K / Ctrl K** opens a command palette (also the mobile menu).
- Light/dark theme follows the OS until toggled; the toggle uses a View
  Transition reveal where supported.
- `prefers-reduced-motion` gets still frames everywhere — the simulation is
  pre-settled and rendered once.
- Canvases pause when off-screen or when the tab is hidden.
