"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export function ServicesList() {
  const services = [
    {
      id: "land-cadastral-surveys",
      title: "Land (Cadastral) Surveys",
      desc: "Accurate and legally compliant land surveys ensuring definitive boundary resolutions and proper land administration.",
      image: "https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?auto=format&fit=crop&q=80",
      subServices: [
        "Subdivision and amalgamation",
        "Boundary verification and re-establishment",
        "Land demarcation",
        "Forensic (dispute resolution) surveys",
      ],
      slug: "/services/land-cadastral-surveys",
    },
    {
      id: "engineering-topographical-surveys",
      title: "Engineering & Topographical Surveys",
      desc: "Supporting complex infrastructure and construction projects through precise terrain mapping and dimensional alignments.",
      image: "https://images.unsplash.com/photo-1541888081622-c9ea15024446?auto=format&fit=crop&q=80",
      subServices: [
        "Topographical mapping",
        "Setting-out services",
        "Control surveys",
        "Leveling and verticality checks",
      ],
      slug: "/services/engineering-topographical-surveys",
    },
    {
      id: "gis-data-integration",
      title: "GIS Data Integration & Spatial Analysis",
      desc: "Transforming raw geospatial data into powerful, interactive insights designed to fuel confident regional planning.",
      image: "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80",
      subServices: [
        "GIS database development",
        "Spatial modeling and analysis",
        "Decision-support systems",
      ],
      slug: "/services/gis-data-integration",
    },
    {
      id: "remote-sensing",
      title: "Remote Sensing & Environmental Monitoring",
      desc: "Advanced satellite and drone analytics enabling vast-scale environmental surveillance and conservation efforts.",
      image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80",
      subServices: [
        "Monitor environmental changes",
        "Support planning and conservation",
        "Large-scale mapping solutions",
      ],
      slug: "/services/remote-sensing",
    },
    {
      id: "underground-utility-mapping",
      title: "Underground Utility Mapping (GPR)",
      desc: "Detect, map, and secure critical hidden infrastructures using high-tech Ground Penetrating Radar (GPR) technology.",
      image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80",
      subServices: [
        "Pipelines mapping",
        "Underground cables",
        "Hidden structural infrastructure",
      ],
      slug: "/services/underground-utility-mapping",
    },
    {
      id: "geoportal-development",
      title: "Geoportal Development & Web GIS",
      desc: "Designing and deploying enterprise-level, interactive digital mapping platforms for real-time spatial data access.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80",
      subServices: [
        "Interactive mapping platforms",
        "GIS servers and dashboards",
        "Custom geoportals for real-time access",
      ],
      slug: "/services/geoportal-development",
    },
    {
      id: "project-planning",
      title: "Project Planning & Technical Reporting",
      desc: "End-to-end survey data structuring alongside highly detailed engineering reporting tailored for corporate stakeholders.",
      image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80",
      subServices: [
        "Survey planning and execution",
        "Rigorous data processing",
        "Detailed technical reporting",
      ],
      slug: "/services/project-planning",
    },
  ];

  return (
    <section className="py-24 bg-gray-50 relative">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col gap-24 lg:gap-32">
          {services.map((service, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={service.id}
                id={service.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className={`flex flex-col ${
                  isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                } gap-12 lg:gap-20 items-center scroll-mt-32`}
              >
                {/* Image Section */}
                <div className="w-full lg:w-1/2">
                  <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl group border-[8px] border-white">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-brand-blue/10 group-hover:bg-transparent transition-colors duration-500"></div>
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-brand-blue font-bold text-3xl font-cherith rounded-2xl w-14 h-14 flex items-center justify-center shadow-lg">
                      {index + 1}
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center">
                  <div className="inline-flex items-center gap-2 mb-4">
                    <span className="h-0.5 w-8 bg-brand-red inline-block"></span>
                    <span className="text-brand-red font-semibold uppercase tracking-wider text-xs">
                      Service Offering
                    </span>
                  </div>

                  <h2 className="text-3xl md:text-4xl font-extrabold font-cherith text-brand-blue leading-tight mb-4">
                    {service.title}
                  </h2>
                  <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                    {service.desc}
                  </p>

                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4 flex items-center gap-2">
                       Includes:
                    </h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
                      {service.subServices.map((sub, sIdx) => (
                        <li key={sIdx} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-brand-red shrink-0 mt-0.5" />
                          <span className="text-gray-700 font-medium leading-tight">
                            {sub}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Learn More Button */}
                  <div className="flex">
                    <Link
                      href={service.slug}
                      className="inline-flex items-center gap-2 text-brand-blue font-bold px-6 py-3 rounded-full hover:bg-brand-blue hover:text-white border-2 border-brand-blue transition-all group"
                      aria-label={`View details about ${service.title}`}
                    >
                      Explore Service
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
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
