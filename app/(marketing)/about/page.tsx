import { Metadata } from "next";
import { AboutHero } from "@/components/sections/about/about-hero";
import { AboutOverview } from "@/components/sections/about/about-overview";
import { AboutMissionVision } from "@/components/sections/about/about-mission-vision";
import { AboutExperience } from "@/components/sections/about/about-experience";
import { AboutLeadership } from "@/components/sections/about/about-leadership";
import { CTA } from "@/components/sections/cta";

export const metadata: Metadata = {
  title: "About Us | Cherith GeoSystems",
  description: "Learn about Cherith GeoSystems, a premier geospatial and surveying firm committed to delivering precision, reliability, and innovation.",
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
