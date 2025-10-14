import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import React from "react";

type Details = {
  overview?: string;
  contribution: string[];
  results?: string[];
  next?: string[];
};

const detailsBySlug: Record<string, Details> = {
  // 1) APMAC — AI Productivity MVP
  "apmac-mvp": {
    overview:
      "Capstone MVP focused on a clean result screen and reliable API wiring, then shipping it to users.",
    contribution: [
      "Built the Result screen UI in Next.js with accessible components (loading skeletons, empty/error states).",
      "Integrated the backend API: request/response types, abort/retry logic, and basic client-side validation.",
      "Handled edge cases (timeouts, network failures, malformed payloads) with user-friendly messages.",
      "Set up Vercel deployments with env vars and preview URLs; added basic CI checks (TypeScript & ESLint).",
    ],
    results: [
      "Usable prototype shipped for teammates to test end-to-end.",
      "Simple runbook for teammates: how to deploy, update env vars, and test the flow.",
    ],
    next: [
      "Track usage with lightweight analytics to see which actions users take.",
      "Add component tests for the result screen and mock API.",
      "Consider caching/rate-limiting on the API client to smooth bursts.",
    ],
  },

  // 2) Instruction-Tuned AI Assistant
  "instruction-tuned-ai-assistant": {
    overview:
      "Small LLM fine-tuned for instruction following, with an inference server and basic safety refusals.",
    contribution: [
      "Prepared instruction datasets (Alpaca, GSM8K, ScienceQA, P3 variants) plus a small math-focused prompt set.",
      "Fine-tuned LLaMA-3.2-3B using LoRA with quantization-aware training.",
      "Built a FastAPI inference service with refusal rules and streaming responses.",
      "Added a simple evaluation harness and prompt templates for math/QA checks.",
    ],
    results: [
      "Faster, more cooperative answers on common instruction patterns in quick evals.",
      "Lower obvious hallucination rate on math/QA probes (anecdotal but repeatable).",
    ],
    next: [
      "RAG for grounding; stricter eval sets; add telemetry for refusals.",
      "Export a smaller quantized runtime for cheaper hosting.",
    ],
  },

  // 3) Role-Based Academic Help Portal
  "role-based-academic-portal": {
    overview:
      "Desktop portal with student/instructor/admin roles, secure auth, and content management.",
    contribution: [
      "Implemented secure account flows and multi-role permissions.",
      "Encrypted article/group data; added search/filter and backup/restore with unique IDs.",
      "Hardened OTP security by moving one-time passwords to a separate store.",
      "Contributed student testing, UX screencast, and fixed UI consistency issues.",
    ],
    results: [
      "Reliable local backups and faster retrieval via search/filter.",
      "Cleaner login & OTP flow reduced user confusion during demos.",
    ],
    next: [
      "Add integration tests around auth & OTP.",
      "Migrate to a service-backed data store; add role-scoped audit logs.",
    ],
  },

  // 4) Sentiment Analysis Tool  (Chat replaced with Sentiment)
  "sentiment-analysis-tool": {
    overview:
      "Lightweight sentiment analysis for short text and CSV batches with a simple web UI and an API.",
    contribution: [
      "Built a Flask API (`/analyze`) and minimal UI to submit text or upload CSV for batch scoring.",
      "Implemented preprocessing (lowercasing, URL/punctuation stripping) and a TF-IDF + Logistic Regression baseline in scikit-learn.",
      "Added a rule-based fallback (e.g., VADER) for very short texts and reconciled outputs into a single label + confidence.",
      "Wrote an evaluation script with train/test split and reported accuracy/F1; exported a confusion matrix image.",
    ],
    results: [
      "Clear positive/neutral/negative labels with confidence; consistent performance on a held-out set.",
      "Batch CSV support lets non-technical users score many rows at once and download results.",
    ],
    next: [
      "Try a small transformer (e.g., DistilBERT) for higher accuracy.",
      "Language detection and per-language models; containerize for easy deploy.",
    ],
  },
};

export function generateStaticParams() {
  // prebuild routes for each project slug
  return projects.map((p) => ({ slug: p.slug }));
}

type PageProps = { params: { slug: string } };

export default function ProjectPage({ params }: PageProps) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return notFound();

  const details = detailsBySlug[params.slug];

  return (
    <article className="prose">
      <h1>{project.title}</h1>
      <p><em>{project.oneLiner}</em></p>

      {details?.overview && (
        <>
          <h2>Overview</h2>
          <p>{details.overview}</p>
        </>
      )}

      <h2>My contribution</h2>
      <ul>
        {(details?.contribution ?? ["Document the specific pieces you built."]).map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      {details?.results && (
        <>
          <h2>Results</h2>
          <ul>
            {details.results.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </>
      )}

      {details?.next && (
        <>
          <h2>What I’d improve next</h2>
          <ul>
            {details.next.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        </>
      )}

      <h2>Tech</h2>
      <p>{project.tech.join(", ")}</p>
    </article>
  );
}
