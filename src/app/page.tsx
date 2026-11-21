import { Hero } from "@/components/hero/Hero";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { Leadership } from "@/components/sections/Leadership";
import { Recognition } from "@/components/sections/Recognition";
import { Telemetry } from "@/components/sections/Telemetry";
import { Toolkit } from "@/components/sections/Toolkit";
import { Work } from "@/components/sections/Work";
import { education, profile } from "@/data/profile";
import { site } from "@/data/site";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  url: site.url,
  email: `mailto:${profile.email}`,
  jobTitle: "Software Engineer",
  description: site.description,
  address: { "@type": "PostalAddress", addressLocality: "Tempe", addressRegion: "AZ", addressCountry: "US" },
  alumniOf: { "@type": "CollegeOrUniversity", name: education.school },
  sameAs: [profile.github, profile.linkedin],
  knowsAbout: ["Distributed systems", "Full-stack development", "Reinforcement learning", "Robotics"],
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      <Hero />
      <About />
      <Telemetry />
      <Work />
      <Experience />
      <Recognition />
      <Leadership />
      <Toolkit />
      <Contact />
    </>
  );
}
