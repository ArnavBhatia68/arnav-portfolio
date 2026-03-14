import type { Metadata } from "next";
import CertificateGalleryItem from "@/components/CertificateGalleryItem";
import SectionHeader from "@/components/SectionHeader";
import { certificates } from "@/data/certificates";

export const metadata: Metadata = {
  title: "Certificates",
  description: "Dean's List certificates and award documents.",
};

export default function CertificatesPage() {
  const deansList = certificates.filter((item) => item.category === "Dean's List");
  const awards = certificates.filter((item) => item.category === "Award");

  return (
    <div className="space-y-12">
      <section>
        <SectionHeader eyebrow="Certificates" title="Dean’s List and award records" description="Browse academic honors and recognition through a certificate gallery with preview and download access." />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {deansList.map((cert) => (
            <CertificateGalleryItem key={cert.id} cert={cert} />
          ))}
        </div>
      </section>

      <section>
        <SectionHeader title="Awards Documents" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {awards.map((cert) => (
            <CertificateGalleryItem key={cert.id} cert={cert} />
          ))}
        </div>
      </section>
    </div>
  );
}
