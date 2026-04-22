import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { CTA } from "@/components/sections/cta";

// Data store containing the exact data logic from previous components but adding specific images for the sub-categories.
const servicesData = [
  {
    id: "land-cadastral-surveys",
    title: "Land (Cadastral) Surveys",
    desc: "Legally compliant boundary resolutions and land administrations.",
    heroImage: "/images/services/land-cadastral/land-demarcation2.png",
    slug: "land-cadastral-surveys",
    subServices: [
      { name: "Subdivision & Amalgamation", image: "/images/services/land-cadastral/subdivision&amalgamation.png" },
      { name: "Boundary Verification", image: "/images/services/land-cadastral/boundary-verification.png" },
      { name: "Land Demarcation", image: "/images/services/land-cadastral/land-demarcation1.png" },
      { name: "Forensic & Dispute Surveys", image: "/images/services/land-cadastral/forensics&dispute.png" },
    ],
  },
  {
    id: "engineering-topographical-surveys",
    title: "Engineering & Topographical Surveys",
    desc: "Terrain mapping and alignments for infrastructure projects.",
    heroImage: "/images/services/engineering%26topographical/engineering%26topographicalsurvey.png",
    slug: "engineering-topographical-surveys",
    subServices: [
      { name: "Topographical Mapping", image: "/images/services/engineering%26topographical/topographicalmapping1.png" },
      { name: "Setting-Out Services", image: "/images/services/engineering%26topographical/settingoutservices.png" },
      { name: "Control Surveys", image: "/images/services/engineering%26topographical/controlsurveys.png" },
      { name: "Leveling & Verticality", image: "/images/services/engineering%26topographical/leveling%26verticality.png" },
    ],
  },
  {
    id: "gis-data-integration",
    title: "GIS Data & Spatial Analysis",
    desc: "Transforming raw geospatial data into powerful, interactive insights designed to fuel confident regional planning.",
    heroImage: "/images/services/gis%26spatial-analysis/gid-hero.png",
    slug: "gis-data-integration",
    subServices: [
      { name: "GIS Database Development", image: "/images/services/gis%26spatial-analysis/gis-database-development1.png" },
      { name: "Spatial Modeling", image: "/images/services/gis%26spatial-analysis/spatial-modelling.png" },
      { name: "Decision-Support Systems", image: "/images/services/gis%26spatial-analysis/decision-support1.png" },
      { name: "Interactive Dashboards", image: "/images/services/gis%26spatial-analysis/interactive-gis-dashboard.png" },
    ],
  },
  {
    id: "remote-sensing",
    title: "Remote Sensing & Environment",
    desc: "Satellite and drone analytics for large-scale monitoring.",
    heroImage: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80",
    slug: "remote-sensing",
    subServices: [
      { name: "Environmental Monitoring", image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80" },
      { name: "Conservation Planning", image: "https://images.unsplash.com/photo-1501869150797-9bfc64ccea82?auto=format&fit=crop&q=80" },
      { name: "Large-Scale Mapping", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80" },
    ],
  },
  {
    id: "underground-utility-mapping",
    title: "Underground Utility Mapping (GPR)",
    desc: "Detect, map, and secure critical hidden infrastructures using high-tech Ground Penetrating Radar technology.",
    heroImage: "/images/services/underground-utility-gpr/undeground-detection-hero.png",
    slug: "underground-utility-mapping",
    subServices: [
      { name: "Pipeline Detection", image: "/images/services/underground-utility-gpr/pipeline-detection%201.png" },
      { name: "Underground Cables", image: "/images/services/underground-utility-gpr/underground-cables.png" },
      { name: "Hidden Infrastructure", image: "/images/services/underground-utility-gpr/hidden-infrastructure.png" },
      { name: "Pre-construction Safety", image: "/images/services/underground-utility-gpr/preconstruction-safety.png" },
      { name: "Data Interpretation", image: "/images/services/underground-utility-gpr/data-interpretation.png" },
    ],
  },
  {
    id: "geoportal-development",
    title: "Geoportal & Web GIS Development",
    desc: "Enterprise interactive mapping platforms for real-time access.",
    heroImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80",
    slug: "geoportal-development",
    subServices: [
      { name: "Interactive Mapping Platforms", image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80" },
      { name: "GIS Dashboards", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80" },
      { name: "Custom Geoportals", image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80" },
    ],
  },
  {
    id: "project-planning",
    title: "Planning & Technical Reporting",
    desc: "Survey data structuring and detailed engineering reporting.",
    heroImage: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80",
    slug: "project-planning",
    subServices: [
      { name: "Survey Planning", image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80" },
      { name: "Data Processing", image: "https://images.unsplash.com/photo-1543286386-2a62ffb7b137?auto=format&fit=crop&q=80" },
      { name: "Technical Reporting", image: "https://images.unsplash.com/photo-1434626881859-194d67b2b86f?auto=format&fit=crop&q=80" },
    ],
  },
];

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const service = servicesData.find((s) => s.id === resolvedParams.id);
  
  if (!service) return { title: "Service Not Found" };

  return {
    title: `${service.title} | Cherith GeoSystems`,
    description: service.desc,
  };
}

export default async function ServiceDetailsPage({ params }: Props) {
  const resolvedParams = await params;
  const service = servicesData.find((s) => s.id === resolvedParams.id);

  if (!service) {
    notFound();
  }

  return (
    <main className="flex flex-col min-h-screen">
      {/* Dynamic Hero */}
      <section className="relative min-h-[45vh] flex items-center justify-center pt-24 pb-12 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={service.heroImage}
            alt={service.title}
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-brand-blue/90 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-4 md:px-8 relative z-10 text-center flex flex-col items-center mt-6">
          <Link 
            href="/services" 
            className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-5 uppercase tracking-wider text-xs font-semibold transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            All Services
          </Link>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold font-cherith text-white leading-tight mb-4 max-w-4xl">
            {service.title}
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl font-light">
            {service.desc}
          </p>
        </div>
      </section>

      {/* Media-rich Sub-services Grid Layout */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col items-center mb-10 text-center">
            <span className="h-0.5 w-10 bg-brand-red inline-block mb-3"></span>
            <h2 className="text-2xl md:text-3xl font-extrabold font-cherith text-brand-blue">
              Functional Offerings
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
            {service.subServices.map((sub, idx) => (
              <div 
                key={idx} 
                className="group relative h-[300px] md:h-[350px] rounded-2xl overflow-hidden shadow-lg border border-gray-200"
              >
                <div className="absolute inset-0 z-0">
                  <Image
                    src={sub.image}
                    alt={sub.name}
                    fill
                    className="object-cover group-hover:scale-110 group-hover:rotate-1 transition-all duration-700 ease-in-out"
                  />
                  {/* Harsh modern gradient overlay to keep text extremely readable */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 transition-opacity duration-500 group-hover:opacity-90"></div>
                </div>

                {/* Minimal Text Container */}
                <div className="absolute inset-0 z-10 p-6 md:p-8 flex flex-col justify-end">
                  <h3 className="text-xl font-bold font-cherith text-white leading-tight group-hover:text-brand-red transition-colors duration-300">
                    {sub.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTA />
    </main>
  );
}
