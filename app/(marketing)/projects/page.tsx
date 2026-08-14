import { Metadata } from "next";
import { ProjectsHero } from "@/components/sections/projects/projects-hero";
import { ProjectsFeatured } from "@/components/sections/projects/projects-featured";
import { ProjectsExperience } from "@/components/sections/projects/projects-experience";
import { CTA } from "@/components/sections/cta";

import { getProjects } from "@/lib/api/projects";

export const metadata: Metadata = {
  title: "Surveying & Geospatial Projects in Kenya | Cherith GeoSystems",
  description: "Explore our portfolio of comprehensive mapping, GIS integration, and infrastructure surveying projects engineered across Kenya and East Africa.",
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <main className="flex flex-col min-h-screen">
      <ProjectsHero />
      <ProjectsFeatured initialProjects={projects} />
      <ProjectsExperience />
      <CTA />
    </main>
  );
}
