import { Metadata } from "next";
import { ContactHero } from "@/components/sections/contact/contact-hero";
import { ContactSection } from "@/components/sections/contact/contact-section";
import { CTA } from "@/components/sections/cta";

export const metadata: Metadata = {
  title: "Contact Us | Cherith GeoSystems",
  description: "Connect with Cherith GeoSystems for industry-leading cadastral mapping, geospatial analysis, drone surveys, and structural verification across East Africa.",
};

export default function ContactPage() {
  return (
    <main className="flex flex-col min-h-screen bg-gray-50">
      <ContactHero />
      <ContactSection />
      <CTA />
    </main>
  );
}
