import { Metadata } from "next";
import { Globe2, MapPin, CheckCircle2, Building2, Briefcase } from "lucide-react";
import Image from "next/image";
import { CTA } from "@/components/sections/cta";

export const metadata: Metadata = {
  title: "Experience Beyond the Horizon | Cherith GeoSystems",
  description: "Our international geospatial reach and project experience across East Africa and beyond.",
};

const regionalEscperience = [
  {
    country: "Kenya",
    projects: "400+",
    details: "Nationwide coverage including major infrastructure like JKIA Airport and UN complexes.",
    expertise: ["Cadastral Surveying", "Engineering Surveys", "GPR", "Web GIS"]
  },
  {
    country: "Rwanda",
    projects: "Strategic GIS Support",
    details: "Regional spatial data integration and urban planning advisory services.",
    expertise: ["GIS Data Integration", "Remote Sensing"]
  },
  {
    country: "Uganda",
    projects: "Cross-border Mapping",
    details: "Supporting infrastructure development and topographic mapping for regional projects.",
    expertise: ["Topographic Surveys", "GIS Modeling"]
  },
  {
    country: "Ethiopia",
    projects: "Regional Operations",
    details: "Geospatial support for international agencies and regional infrastructure planning.",
    expertise: ["GIS Support", "Asset Mapping"]
  },
  {
    country: "Eritrea",
    projects: "Specialized Surveys",
    details: "Technical geospatial services for specialized regional development initiatives.",
    expertise: ["Environmental Monitoring", "GIS"]
  },
  {
    country: "Burundi",
    projects: "Territorial Data Support",
    details: "Contributing to regional GIS hubs and multi-lateral donor-funded projects.",
    expertise: ["Spatial Analysis", "Mapping"]
  },
  {
    country: "South Africa",
    projects: "Technical Consultancy",
    details: "High-level geospatial advisory and data verification for specialized industries.",
    expertise: ["Consultancy", "Data Verification"]
  }
];

export default function ExperiencePage() {
  return (
    <main className="flex flex-col min-h-screen bg-zinc-50">
      {/* Hero Section */}
      <section className="relative pt-24 pb-12 md:pt-32 md:pb-16 bg-brand-blue overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image 
            src="/images/panoramic-landmapping.png" 
            alt="Global Reach" 
            fill 
            className="object-cover"
          />
          <div className="absolute inset-0 bg-brand-blue/80 blur-sm"></div>
        </div>
        
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 text-brand-red font-bold uppercase tracking-[0.2em] text-xs mb-5">
              <span className="w-10 h-[1.5px] bg-brand-red block"></span>
              Experience Beyond the Horizon
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold font-cherith text-white mb-6 leading-[1.1]">
              A Footprint of <span className="text-brand-red text-shadow-glow">Precision</span> <br /> Across the Continent.
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed max-w-2xl font-light">
              From our headquarters in Nairobi to major infrastructure hubs across East, Central, and Southern Africa. Cherith GeoSystems delivers uncompromised accuracy where it matters most.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Quick View */}
      <section className="py-8 md:py-10 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <div className="flex flex-col gap-0.5 border-l-2 border-brand-red pl-5">
              <span className="text-2xl md:text-3xl font-bold text-brand-blue font-cherith">08+</span>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Countries Reached</span>
            </div>
            <div className="flex flex-col gap-0.5 border-l-2 border-brand-red pl-5">
              <span className="text-2xl md:text-3xl font-bold text-brand-blue font-cherith">400+</span>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Successful Projects</span>
            </div>
            <div className="flex flex-col gap-0.5 border-l-2 border-brand-red pl-5">
              <span className="text-2xl md:text-3xl font-bold text-brand-blue font-cherith">19+</span>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Years of Expertise</span>
            </div>
            <div className="flex flex-col gap-0.5 border-l-2 border-brand-red pl-5">
              <span className="text-2xl md:text-3xl font-bold text-brand-blue font-cherith">UN+</span>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Global Partners</span>
            </div>
          </div>
        </div>
      </section>

      {/* Regional Experiences Grid */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-8">
          <div className="mb-10 md:mb-12 max-w-3xl">
            <h2 className="text-2xl md:text-4xl font-bold font-cherith text-brand-blue mb-4">Regional Operations</h2>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              Our capability to deploy advanced geospatial technology and expert personnel across borders makes us a trusted partner for regional governments and international organizations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {regionalEscperience.map((exp, idx) => (
              <div 
                key={idx} 
                className="group bg-white p-6 md:p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 flex flex-col h-full"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-zinc-50 flex items-center justify-center group-hover:bg-brand-red group-hover:text-white transition-colors duration-500 text-brand-blue">
                    <Globe2 className="w-6 h-6" />
                  </div>
                  <span className="text-[9px] font-bold text-brand-red uppercase tracking-[0.2em]">0{idx + 1}</span>
                </div>
                
                <h3 className="text-xl font-bold font-cherith text-brand-blue mb-3 group-hover:text-brand-red transition-colors">{exp.country}</h3>
                <div className="flex items-center gap-2 text-brand-blue/60 mb-5">
                  <Briefcase className="w-3.5 h-3.5" />
                  <span className="text-xs font-bold">{exp.projects}</span>
                </div>
                
                <p className="text-gray-500 text-xs md:text-sm mb-6 leading-relaxed flex-grow">
                  {exp.details}
                </p>

                <div className="pt-4 border-t border-gray-50">
                  <div className="flex flex-wrap gap-1.5">
                    {exp.expertise.map((skill, sIdx) => (
                      <span key={sIdx} className="text-[8px] font-bold uppercase tracking-wider px-2.5 py-1.5 bg-zinc-50 rounded-lg text-gray-400 group-hover:bg-brand-blue/5 group-hover:text-brand-blue transition-colors">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise & Capability */}
      <section className="py-12 md:py-16 bg-brand-blue relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-8 relative z-10 text-center text-white">
          <div className="max-w-3xl mx-auto flex flex-col items-center">
            <Building2 className="w-12 h-12 text-brand-red mb-6" />
            <h2 className="text-2xl md:text-4xl font-bold font-cherith mb-6">Strategic Partnerships</h2>
            <p className="text-sm md:text-base text-gray-400 mb-10 max-w-2xl">
              Our international experience is built on deep technical competence and a commitment to delivering data that meets both local regulatory standards and international best practices.
            </p>
            <div className="flex flex-wrap justify-center gap-8 md:gap-12">
              <div className="flex flex-col items-center gap-2">
                <span className="text-brand-red text-[10px] md:text-xs font-bold uppercase tracking-widest">UN Agencies</span>
                <span className="w-10 h-0.5 bg-brand-red/30"></span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <span className="text-brand-red text-[10px] md:text-xs font-bold uppercase tracking-widest">Financial Institutions</span>
                <span className="w-10 h-0.5 bg-brand-red/30"></span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <span className="text-brand-red text-[10px] md:text-xs font-bold uppercase tracking-widest">Regional Bodies (IGAD)</span>
                <span className="w-10 h-0.5 bg-brand-red/30"></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTA />
    </main>
  );
}
