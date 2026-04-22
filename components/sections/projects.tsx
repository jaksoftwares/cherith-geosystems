import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Projects() {
  const projects = [
    {
      title: "Topographical Survey",
      location: "JKIA Airport, Nairobi",
      image: "/images/roadconstructionsurveys.jpg",
      category: "Infrastructure"
    },
    {
      title: "GIS Support Operations",
      location: "UNHCR Regional Hub",
      image: "/images/GIS-data-presentation.png",
      category: "GIS Data Integration"
    },
    {
      title: "800-Acre Drone Mapping",
      location: "Maasai Mara",
      image: "/images/drone-mapping.jpg",
      category: "Remote Sensing"
    },
    {
      title: "Infrastructure Survey",
      location: "UN Gigiri Complex",
      image: "/images/infrastructureproject.png",
      category: "Engineering Survey"
    }
  ];

  return (
    <section className="py-12 md:py-16 bg-white relative">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-10 gap-6 text-center md:text-left">
          <div className="max-w-2xl">
            <div className="inline-flex items-center justify-center md:justify-start gap-2 text-brand-red font-semibold tracking-wider uppercase text-xs mb-3">
              <span className="w-6 h-[2px] bg-brand-red block"></span>
              Our Proven Work
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold font-cherith text-brand-blue leading-[1.2]">
              Featured Projects
            </h2>
            <p className="mt-4 text-gray-600 text-sm md:text-base">
              Our portfolio reflects our commitment to precision, reliability, and excellence across a wide range of geospatial projects nationwide.
            </p>
          </div>
          <Link 
            href="/projects"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gray-100 hover:bg-brand-blue hover:text-white rounded-xl font-bold text-brand-blue transition-all group whitespace-nowrap active:scale-95 text-sm"
          >
            View All Projects
            <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {projects.map((project, idx) => (
            <div key={idx} className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 h-[320px] md:h-[350px]">
              {/* Image with zoom effect */}
              <div className="absolute inset-0">
                <Image 
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/10"></div>
              
              {/* Content Container */}
              <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-6">
                <div className="bg-brand-red/90 text-white text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-sm w-max mb-3 backdrop-blur-md opacity-100 sm:opacity-0 sm:-translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  {project.category}
                </div>
                <h3 className="text-lg md:text-xl font-bold font-cherith text-white mb-1.5 leading-tight relative z-10 group-hover:text-brand-red transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-300 text-[10px] md:text-xs flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-red inline-block"></span>
                  {project.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
