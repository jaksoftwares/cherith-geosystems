import { Metadata } from "next";
import { ContactHero } from "@/components/sections/contact/contact-hero";
import { ContactSection } from "@/components/sections/contact/contact-section";
import { CTA } from "@/components/sections/cta";
import { JsonLd } from "@/components/json-ld";
import type { LocalBusiness, WithContext } from "schema-dts";

export const metadata: Metadata = {
  title: "Contact Land Surveyors in Nairobi, Kenya | Cherith GeoSystems",
  description: "Connect with Cherith GeoSystems for industry-leading cadastral mapping, geospatial analysis, drone surveys, and structural verification across East Africa.",
};

export default function ContactPage() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://cherith.co.ke";
  
  const localBusinessSchema: WithContext<LocalBusiness> = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Cherith GeoSystems",
    image: `${baseUrl}/icon.png`,
    telephone: "+254 790 034 580",
    email: "info@cherith.co.ke",
    url: baseUrl,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Olympic House, 1st Floor, Room 104",
      addressLocality: "Nairobi",
      addressCountry: "KE"
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -1.2921, // Approximate Nairobi
      longitude: 36.8219 
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday"
        ],
        opens: "08:00",
        closes: "17:00"
      }
    ]
  };

  return (
    <main className="flex flex-col min-h-screen bg-gray-50">
      <JsonLd schema={localBusinessSchema} />
      <ContactHero />
      <ContactSection />
      <CTA />
    </main>
  );
}
