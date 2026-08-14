import { Metadata } from "next";
import { AboutHero } from "@/components/sections/about/about-hero";
import { AboutOverview } from "@/components/sections/about/about-overview";
import { AboutMissionVision } from "@/components/sections/about/about-mission-vision";
import { AboutExperience } from "@/components/sections/about/about-experience";
import { AboutLeadership } from "@/components/sections/about/about-leadership";
import { CTA } from "@/components/sections/cta";

export const metadata: Metadata = {
  title: "About Our Land Surveyors & Geospatial Engineers | Cherith GeoSystems Kenya",
  description: "With 19+ years of experience and 400+ projects across 47 counties, learn why Cherith GeoSystems is Kenya's trusted surveying firm.",
};

export default function AboutPage() {
  return (
    <main className="flex flex-col min-h-screen">
      <AboutHero />
      <AboutOverview />
      <AboutMissionVision />
      <AboutLeadership />
      <AboutExperience />
      <CTA />
    </main>
  );
}
