import { Metadata } from "next";
import { ServicesHero } from "@/components/sections/services/services-hero";
import { ServicesList } from "@/components/sections/services/services-list";
import { CTA } from "@/components/sections/cta";

import { getServices, getCategories } from "@/lib/api/services";

export const metadata: Metadata = {
  title: "Our Services | Cherith GeoSystems",
  description: "Explore our comprehensive range of geospatial and surveying services including Cadastral Surveys, Topographical Mapping, GIS, and Remote Sensing.",
};

export default async function ServicesPage() {
  const [services, categories] = await Promise.all([
    getServices(),
    getCategories()
  ]);

  return (
    <main className="flex flex-col min-h-screen">
      <ServicesHero />
      <ServicesList initialServices={services} categories={categories} />
      <CTA />
    </main>
  );
}
