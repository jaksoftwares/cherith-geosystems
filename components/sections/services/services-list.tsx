"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Map, Database, Cpu, FileText } from "lucide-react";
import { useState } from "react";

const categories = [
  { id: "all", name: "All Solutions", icon: Map },
  { id: "surveying", name: "Land & Engineering", icon: Map },
  { id: "gis", name: "Geospatial & Analysis", icon: Database },
  { id: "tech", name: "Tech & Planning", icon: Cpu },
];

export function ServicesList() {
  const [activeCategory, setActiveCategory] = useState("all");

  const services = [
    {
      id: "land-cadastral-surveys",
      category: "surveying",
      title: "Land (Cadastral) Surveys",
      desc: "Accurate and legally compliant land surveys ensuring definitive boundary resolutions and proper land administration.",
      image: "/images/services/land-cadastral/land-demarcation1.png",
      subServices: [
        "Subdivision and amalgamation",
        "Boundary verification",
        "Land demarcation",
        "Forensic surveys",
      ],
      slug: "/services/land-cadastral-surveys",
    },
    {
      id: "engineering-topographical-surveys",
      category: "surveying",
      title: "Engineering & Topo Surveys",
      desc: "Supporting complex infrastructure through precise terrain mapping and dimensional alignments.",
      image: "/images/services/engineering%26topographical/topographicalmapping2.png",
      subServices: [
        "Topographical mapping",
        "Setting-out services",
        "Control surveys",
        "Leveling and verticality",
      ],
      slug: "/services/engineering-topographical-surveys",
    },
    {
      id: "underground-utility-mapping",
      category: "surveying",
      title: "Underground Utility (GPR)",
      desc: "Detect, map, and secure critical hidden infrastructures using high-tech Ground Penetrating Radar technology.",
      image: "/images/services/underground-utility-gpr/hidden-infrastructure1.png",
      subServices: [
        "Pipelines mapping",
        "Underground cables",
        "Hidden infrastructure",
      ],
      slug: "/services/underground-utility-mapping",
    },
    {
      id: "gis-data-integration",
      category: "gis",
      title: "GIS & Spatial Analysis",
      desc: "Transforming raw geospatial data into powerful, interactive insights designed to fuel confident regional planning.",
      image: "/images/services/gis%26spatial-analysis/spatial-modelling2.png",
      subServices: [
        "Database development",
        "Spatial modeling",
        "Decision-support systems",
      ],
      slug: "/services/gis-data-integration",
    },
    {
      id: "remote-sensing",
      category: "gis",
      title: "Remote Sensing & Monitoring",
      desc: "Advanced satellite and drone analytics enabling vast-scale environmental surveillance and conservation efforts.",
      image: "/images/services/remote-sensing%26enviroment/remote-sensing-enviroment-hero.png",
      subServices: [
        "Environmental changes",
        "Planning & conservation",
        "Large-scale mapping",
        "Land & climate analysis",
      ],
      slug: "/services/remote-sensing",
    },
    {
      id: "geoportal-development",
      category: "tech",
      title: "Geoportal & Web GIS",
      desc: "Designing and deploying enterprise-level, interactive digital mapping platforms for real-time spatial data access.",
      image: "/images/services/geo-portal%26gis/geoportal-main.png",
      subServices: [
        "Interactive platforms",
        "Dynamic GIS dashboards",
        "Enterprise mapping",
      ],
      slug: "/services/geoportal-development",
    },
    {
      id: "project-planning",
      category: "tech",
      title: "Planning & Reporting",
      desc: "End-to-end survey data structuring alongside highly detailed engineering reporting tailored for stakeholders.",
      image: "/images/services/planning%26technicalreporting/planning%26reporting-hero.png",
      subServices: [
        "Survey execution",
        "Data processing",
        "Technical reporting",
        "Workflow planning",
      ],
      slug: "/services/project-planning",
    },
  ];

  const filteredServices = activeCategory === "all" 
    ? services 
    : services.filter(s => s.category === activeCategory);

  return (
    <section className="py-12 md:py-16 bg-zinc-50 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 lg:gap-3 mb-8 md:mb-10">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs md:text-sm transition-all duration-300 ${
                  isActive 
                    ? "bg-brand-blue text-white shadow-lg shadow-brand-blue/20 scale-105" 
                    : "bg-white text-gray-500 hover:text-brand-blue hover:bg-gray-50 border border-gray-100"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-brand-red" : "text-gray-400"}`} />
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Services Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
        >
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service) => (
              <motion.div
                key={service.id}
                layout
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                transition={{ duration: 0.4 }}
                className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col h-full"
              >
                {/* Image Section */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-brand-blue/10 group-hover:bg-transparent transition-colors duration-500"></div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold text-brand-blue uppercase tracking-widest border border-white/20">
                      {service.category === 'surveying' ? 'Surveying' : service.category === 'gis' ? 'GIS' : 'Tech'}
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-8 flex flex-col flex-1">
                  <h3 className="text-2xl font-bold font-cherith text-brand-blue mb-4 leading-tight group-hover:text-brand-red transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-8 line-clamp-3 leading-relaxed">
                    {service.desc}
                  </p>

                  {/* Sub-services List */}
                  <div className="mt-auto">
                    <div className="pt-6 border-t border-gray-50 mb-8">
                       <ul className="space-y-3">
                        {service.subServices.slice(0, 4).map((sub, sIdx) => (
                          <li key={sIdx} className="flex items-center gap-3 text-sm text-gray-700 font-medium">
                            <CheckCircle2 className="w-4 h-4 text-brand-red shrink-0" />
                            {sub}
                          </li>
                        ))}
                       </ul>
                    </div>

                    <Link
                      href={service.slug}
                      className="flex items-center justify-between w-full px-6 py-4 rounded-xl bg-gray-50 group-hover:bg-brand-blue group-hover:text-white transition-all duration-300 font-bold text-brand-blue"
                    >
                      Explore Service
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredServices.length === 0 && (
          <div className="py-32 text-center">
            <p className="text-gray-400 text-lg">No services found in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
}

