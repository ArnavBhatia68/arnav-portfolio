import type { Metadata } from "next";
import AwardCard from "@/components/AwardCard";
import CertificateGalleryItem from "@/components/CertificateGalleryItem";
import SectionHeader from "@/components/SectionHeader";
import { additionalCertificates, deansListCertificates, highlightedAwards } from "@/data/awards";

export const metadata: Metadata = {
  title: "Awards",
  description: "Awards, certificates, and Dean's List records.",
};

export default function AwardsPage() {
  return (
    <div className="space-y-12">
      <section>
        <SectionHeader eyebrow="Awards" title="Scholarships, distinctions, and recognitions" />
        <div className="grid gap-4 md:grid-cols-3">
          {highlightedAwards.map((award) => (
            <AwardCard key={`${award.title}-${award.date}`} award={award} />
          ))}
        </div>
      </section>

      <section>
        <SectionHeader title="Dean’s List Gallery" description="Ready for view + download workflows with PDF/image support." />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {deansListCertificates.map((cert) => (
            <CertificateGalleryItem key={`${cert.title}-${cert.period}`} cert={cert} />
          ))}
        </div>
      </section>

      <section>
        <SectionHeader title="Additional Certificates" description="Placeholder entries are intentionally marked for later asset wiring." />
        <div className="grid gap-4 md:grid-cols-2">
          {additionalCertificates.map((cert) => (
            <CertificateGalleryItem key={`${cert.title}-${cert.period}`} cert={cert} />
          ))}
        </div>
      </section>
    </div>
  );
}
