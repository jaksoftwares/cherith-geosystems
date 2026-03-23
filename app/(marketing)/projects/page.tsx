import { Metadata } from "next";
import { ProjectsHero } from "@/components/sections/projects/projects-hero";
import { ProjectsFeatured } from "@/components/sections/projects/projects-featured";
import { ProjectsExperience } from "@/components/sections/projects/projects-experience";
import { CTA } from "@/components/sections/cta";

export const metadata: Metadata = {
  title: "Featured Projects | Cherith GeoSystems",
  description: "Explore our portfolio of comprehensive mapping, GIS integration, and infrastructure surveying projects engineered across Kenya and East Africa.",
};

export default function ProjectsPage() {
  return (
    <main className="flex flex-col min-h-screen">
      <ProjectsHero />
      <ProjectsFeatured />
      <ProjectsExperience />
      <CTA />
    </main>
  );
}
