"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export function ProjectsFeatured() {
  const featured = [
    {
      id: "jkia",
      title: "JKIA Airport Topographical Survey",
      description: "Extensive and highly detailed mapping executing precision leveling and contouring to robustly support major air-side infrastructure planning and rapid terminal development at Kenya's primary international aviation hub.",
      image: "/images/infrastructureproject.png",
      tag: "Topographical Survey",
      location: "Nairobi, Kenya"
    },
    {
      id: "unhcr",
      title: "UNHCR GIS Regional Support Operations",
      description: "Advanced Geographic Information Systems (GIS) deployed to optimize regional humanitarian operations. Provided meticulous data layering across East and Central Africa to support mass displaced population planning.",
      image: "/images/GIS-data-presentation.png",
      tag: "GIS Integration",
      location: "East & Central Africa"
    },
    {
      id: "mara",
      title: "800-Acre Drone Mapping",
      description: "Large-scale remote sensing leveraging RTK-enabled drone technology. Captured high-resolution true orthomosaics and digital elevation maps enabling strict land-use planning and ecological conservation mapping.",
      image: "/images/drone-mapping2.jpg",
      tag: "Remote Sensing",
      location: "Maasai Mara"
    },
    {
      id: "gigiri",
      title: "UN Gigiri Infrastructure Project",
      description: "High-stakes cadastral setting-out works and precise infrastructure leveling at the vast United Nations complex, ensuring structural alignment and strict compliance within an environmentally sensitive perimeter.",
      image: "/images/Highrisebuildingcheck.png",
      tag: "Engineering Survey",
      location: "Nairobi, Kenya"
    }
  ];

  return (
    <section className="py-24 md:py-32 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        
        <div className="flex flex-col mb-16 md:mb-20 px-2 lg:px-0">
          <span className="h-1 w-12 bg-brand-red inline-block mb-4"></span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-cherith text-brand-blue tracking-tight">
            Flagship Deliveries
          </h2>
          <p className="mt-4 text-gray-500 max-w-2xl text-base md:text-lg">
            A curated selection of our most technically demanding and geographically diverse engineering solutions.
          </p>
        </div>

        <div className="flex flex-col gap-16 md:gap-32">
          {featured.map((project, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className={`flex flex-col ${
                  isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                } gap-10 md:gap-16 group`}
              >
                {/* Visual */}
                <div className="w-full lg:w-[65%] relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[550px] rounded-3xl overflow-hidden shadow-2xl bg-gray-900 border border-black/10">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-[1200ms] ease-out opacity-90 group-hover:opacity-100"
                  />
                  <div className={`absolute top-0 w-1/2 h-full bg-gradient-to-r hidden lg:block ${isEven ? 'from-black/60 to-transparent left-0' : 'from-transparent to-black/60 right-0'}`}></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent lg:hidden"></div>
                </div>

                {/* Info Block */}
                <div className="w-full lg:w-[35%] flex flex-col justify-center px-2 lg:px-0">
                  <div className="flex items-center gap-3 mb-6 flex-wrap">
                    <span className="bg-brand-blue text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded">
                      {project.tag}
                    </span>
                    <span className="text-gray-400 font-semibold text-xs flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-red inline-block"></span>
                      {project.location}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-cherith text-brand-blue leading-tight mb-4 md:mb-6">
                    {project.title}
                  </h3>
                  
                  <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-8 md:mb-10 border-l-4 border-brand-red pl-4">
                    {project.description}
                  </p>

                  <div className="mt-auto">
                    <button className="flex items-center gap-3 text-brand-blue font-bold uppercase tracking-widest text-[10px] md:text-xs hover:text-brand-red transition-all group/btn bg-gray-100/50 px-6 py-3 rounded-xl border border-gray-100 hover:border-brand-red/20 shadow-sm active:scale-95">
                      Project Highlights 
                      <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
