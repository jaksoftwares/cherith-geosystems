"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Filter, Search, MapPin } from "lucide-react";
import { projectsData, Project } from "@/lib/data/projects";

export function ProjectsFeatured() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["All", ...Array.from(new Set(projectsData.map((p) => p.category)))];

  const filteredProjects = projectsData.filter((project) => {
    const matchCategory = activeCategory === "All" || project.category === activeCategory;
    const matchSearch = 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <section className="py-12 md:py-16 bg-gray-50 overflow-hidden min-h-[50vh]">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-10 gap-6">
          <div className="max-w-2xl px-2 lg:px-0">
            <span className="h-0.5 w-10 bg-brand-red inline-block mb-3"></span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-cherith text-brand-blue tracking-tight">
              Project Portfolio
            </h2>
            <p className="mt-3 text-gray-500 text-sm md:text-base">
              Explore our diverse footprint across East Africa, showcasing decades of precision in geospatial engineering.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 group-focus-within:text-brand-red transition-colors" />
              <input 
                type="text" 
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-56 pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red transition-all text-xs font-medium text-brand-blue"
              />
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-8 px-2 lg:px-0 scrollbar-hide overflow-x-auto pb-4 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-[9px] md:text-[10px] font-bold uppercase tracking-widest transition-all shadow-sm border whitespace-nowrap ${
                activeCategory === cat
                  ? "bg-brand-blue text-white border-brand-blue shadow-brand-blue/20"
                  : "bg-white text-gray-500 hover:text-brand-blue border-gray-100 hover:border-brand-blue/30"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Dynamic Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.slug}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="group relative bg-white rounded-2xl md:rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col border border-gray-100"
              >
                {/* Image Container with Link overlay */}
                <Link href={`/projects/${project.slug}`} className="absolute inset-0 z-20"></Link>
                
                <div className="relative h-48 md:h-56 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-30 pointer-events-none">
                    <span className="bg-brand-red/90 text-white text-[8px] font-bold uppercase tracking-[0.2em] px-2.5 py-1 rounded shadow-lg backdrop-blur-md w-fit">
                      {project.category}
                    </span>
                    {project.featured && (
                      <span className="bg-white/90 text-brand-blue text-[8px] font-bold uppercase tracking-[0.2em] px-2.5 py-1 rounded shadow-lg backdrop-blur-md w-fit">
                        Flagship
                      </span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 md:p-6 flex-1 flex flex-col relative z-10">
                  <div className="flex items-center gap-2 text-[9px] font-bold text-gray-400 mb-2.5 uppercase tracking-[0.15em]">
                    <MapPin className="w-2.5 h-2.5 text-brand-red" />
                    {project.location}
                    {project.year && (
                      <>
                        <span className="w-1 h-1 rounded-full bg-gray-200 mx-1"></span>
                        {project.year}
                      </>
                    )}
                  </div>

                  <h3 className="text-lg md:text-xl font-bold font-cherith text-brand-blue mb-2.5 leading-tight group-hover:text-brand-red transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-gray-500 text-xs md:text-sm leading-relaxed mb-6 line-clamp-3">
                    {project.description}
                  </p>

                  <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-brand-blue font-bold uppercase tracking-widest text-[9px] hover:text-brand-red transition-colors group/link">
                      View Details
                      <ArrowUpRight className="w-3 h-3 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                    </span>
                    
                    <div className="w-7 h-7 rounded-full bg-zinc-50 flex items-center justify-center border border-gray-100 text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-all">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="col-span-full py-20 flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
              <Search className="w-6 h-6 text-gray-300" />
            </div>
            <h3 className="text-xl font-bold font-cherith text-brand-blue mb-1.5">No Projects Found</h3>
            <p className="text-gray-500 text-sm mb-6 max-w-sm">We couldn't find any projects matching your current search or category filter.</p>
            <button 
              onClick={() => {setSearchQuery(""); setActiveCategory("All")}}
              className="px-6 py-2.5 bg-brand-blue text-white rounded-xl font-bold text-sm hover:bg-brand-red transition-colors active:scale-95"
            >
              Clear All Filters
            </button>
          </motion.div>
        )}

      </div>
    </section>
  );
}
