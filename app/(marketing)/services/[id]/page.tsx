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
    heroImage: "https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?auto=format&fit=crop&q=80",
    slug: "land-cadastral-surveys",
    subServices: [
      { name: "Subdivision & Amalgamation", image: "https://images.unsplash.com/photo-1596700018516-e5c8e2bd9a8d?auto=format&fit=crop&q=80" },
      { name: "Boundary Verification", image: "https://images.unsplash.com/photo-1590486804153-61fc0f8fb8be?auto=format&fit=crop&q=80" },
      { name: "Land Demarcation", image: "https://images.unsplash.com/photo-1621516029304-45b79ad5e2db?auto=format&fit=crop&q=80" },
      { name: "Forensic & Dispute Surveys", image: "https://images.unsplash.com/photo-1579361718043-4dc975bb42e0?auto=format&fit=crop&q=80" },
    ],
  },
  {
    id: "engineering-topographical-surveys",
    title: "Engineering & Topographical Surveys",
    desc: "Terrain mapping and alignments for infrastructure projects.",
    heroImage: "https://images.unsplash.com/photo-1541888081622-c9ea15024446?auto=format&fit=crop&q=80",
    slug: "engineering-topographical-surveys",
    subServices: [
      { name: "Topographical Mapping", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80" },
      { name: "Setting-Out Services", image: "https://images.unsplash.com/photo-1503708928676-1cb796a0891e?auto=format&fit=crop&q=80" },
      { name: "Control Surveys", image: "https://images.unsplash.com/photo-1533279443086-d1c19a186416?auto=format&fit=crop&q=80" },
      { name: "Leveling & Verticality", image: "https://images.unsplash.com/photo-1606112219348-204d7d8b94ee?auto=format&fit=crop&q=80" },
    ],
  },
  {
    id: "gis-data-integration",
    title: "GIS Data & Spatial Analysis",
    desc: "Interactive spatial insights powering confident planning.",
    heroImage: "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80",
    slug: "gis-data-integration",
    subServices: [
      { name: "GIS Database Development", image: "https://images.unsplash.com/photo-1558482457-b08e331b0fc2?auto=format&fit=crop&q=80" },
      { name: "Spatial Modeling", image: "https://images.unsplash.com/photo-1618044733300-9472054094ee?auto=format&fit=crop&q=80" },
      { name: "Decision-Support Systems", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80" },
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
    desc: "Mapping hidden infrastructures with Ground Penetrating Radar.",
    heroImage: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80",
    slug: "underground-utility-mapping",
    subServices: [
      { name: "Pipeline Detection", image: "https://images.unsplash.com/photo-1621905251918-4841cbfb9d56?auto=format&fit=crop&q=80" },
      { name: "Underground Cables", image: "https://images.unsplash.com/photo-1589709287315-dcfaee817361?auto=format&fit=crop&q=80" },
      { name: "Hidden Infrastructure", image: "https://images.unsplash.com/photo-1498677231914-50e5040e3ad5?auto=format&fit=crop&q=80" },
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
      <section className="relative min-h-[60vh] flex items-center justify-center pt-20 overflow-hidden">
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
        
        <div className="container mx-auto px-4 md:px-8 relative z-10 text-center flex flex-col items-center mt-10">
          <Link 
            href="/services" 
            className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6 uppercase tracking-wider text-sm font-semibold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            All Services
          </Link>
          
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold font-cherith text-white leading-tight mb-4 max-w-4xl">
            {service.title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-2xl font-light">
            {service.desc}
          </p>
        </div>
      </section>

      {/* Media-rich Sub-services Grid Layout */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col items-center mb-16 text-center">
            <span className="h-1 w-12 bg-brand-red inline-block mb-4"></span>
            <h2 className="text-3xl md:text-4xl font-extrabold font-cherith text-brand-blue">
              Functional Offerings
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {service.subServices.map((sub, idx) => (
              <div 
                key={idx} 
                className="group relative h-[400px] rounded-2xl overflow-hidden shadow-lg border border-gray-200"
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
                <div className="absolute inset-0 z-10 p-8 flex flex-col justify-end">
                  <h3 className="text-2xl font-bold font-cherith text-white leading-tight group-hover:text-brand-red transition-colors duration-300">
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
