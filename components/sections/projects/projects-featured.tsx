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
    <section className="py-24 md:py-32 bg-gray-50 overflow-hidden min-h-screen">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-20 gap-8">
          <div className="max-w-2xl px-2 lg:px-0">
            <span className="h-1 w-12 bg-brand-red inline-block mb-4"></span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-cherith text-brand-blue tracking-tight">
              Project Portfolio
            </h2>
            <p className="mt-4 text-gray-500 text-base md:text-lg">
              Explore our diverse footprint across East Africa, showcasing decades of precision in geospatial engineering.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-brand-red transition-colors" />
              <input 
                type="text" 
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-64 pl-12 pr-6 py-3.5 rounded-2xl border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red transition-all text-sm font-medium text-brand-blue"
              />
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-12 px-2 lg:px-0 scrollbar-hide overflow-x-auto pb-4 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest transition-all shadow-sm border whitespace-nowrap ${
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.slug}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="group relative bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col border border-gray-100"
              >
                {/* Image Container with Link overlay */}
                <Link href={`/projects/${project.slug}`} className="absolute inset-0 z-20"></Link>
                
                <div className="relative h-64 md:h-72 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="absolute top-6 left-6 flex flex-col gap-2 z-30 pointer-events-none">
                    <span className="bg-brand-red/90 text-white text-[9px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 rounded-lg shadow-xl backdrop-blur-md w-fit">
                      {project.category}
                    </span>
                    {project.featured && (
                      <span className="bg-white/90 text-brand-blue text-[9px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 rounded-lg shadow-xl backdrop-blur-md w-fit">
                        Flagship
                      </span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 md:p-10 flex-1 flex flex-col relative z-10">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 mb-4 uppercase tracking-[0.15em]">
                    <MapPin className="w-3 h-3 text-brand-red" />
                    {project.location}
                    {project.year && (
                      <>
                        <span className="w-1 h-1 rounded-full bg-gray-200 mx-1"></span>
                        {project.year}
                      </>
                    )}
                  </div>

                  <h3 className="text-xl md:text-2xl font-bold font-cherith text-brand-blue mb-4 leading-tight group-hover:text-brand-red transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-8 line-clamp-3">
                    {project.description}
                  </p>

                  <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
                    <span className="flex items-center gap-2 text-brand-blue font-bold uppercase tracking-widest text-[10px] hover:text-brand-red transition-colors group/link">
                      View Details
                      <ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                    </span>
                    
                    <div className="w-8 h-8 rounded-full bg-zinc-50 flex items-center justify-center border border-gray-100 text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-all">
                      <ArrowUpRight className="w-4 h-4" />
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
            className="col-span-full py-32 flex flex-col items-center text-center"
          >
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-6">
              <Search className="w-8 h-8 text-gray-300" />
            </div>
            <h3 className="text-2xl font-bold font-cherith text-brand-blue mb-2">No Projects Found</h3>
            <p className="text-gray-500 mb-8 max-w-sm">We couldn't find any projects matching your current search or category filter.</p>
            <button 
              onClick={() => {setSearchQuery(""); setActiveCategory("All")}}
              className="px-8 py-3 bg-brand-blue text-white rounded-xl font-bold hover:bg-brand-red transition-colors active:scale-95"
            >
              Clear All Filters
            </button>
          </motion.div>
        )}

      </div>
    </section>
  );
}
