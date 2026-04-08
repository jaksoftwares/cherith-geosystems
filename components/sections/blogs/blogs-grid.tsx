"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, Clock, Tag } from "lucide-react";

import { blogsData, BlogPost } from "@/lib/data/blogs";

export function BlogsGrid() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["All", ...Array.from(new Set(blogsData.map((b) => b.category)))];

  const filteredBlogs = blogsData.filter((blog) => {
    const matchCategory = activeCategory === "All" || blog.category === activeCategory;
    const matchSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  const featuredPost = blogsData.find(b => b.featured) || blogsData[0];

  return (
    <section className="py-12 md:py-24 bg-zinc-50 min-h-screen">
      <div className="container mx-auto px-4 md:px-8">
        {/* Header - More Dynamic */}
        <div className="flex flex-col mb-16 items-start max-w-4xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="w-12 h-[2px] bg-brand-red"></div>
            <span className="text-brand-red font-bold tracking-[0.2em] uppercase text-sm">
              Knowledge Hub
            </span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold font-cherith text-brand-blue tracking-tight leading-tight"
          >
            Insights, Activities <br className="hidden md:block" /> & <span className="text-brand-red">Global Updates.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-gray-600 text-lg md:text-xl max-w-2xl leading-relaxed"
          >
            Authoritative commentary on geospatial technology, field operations, and domestic land administration strategies.
          </motion.p>
        </div>

        {/* Featured Section - Only shown when "All" is selected and no search */}
        {activeCategory === "All" && !searchQuery && featuredPost && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-20"
          >
            <div className="group relative bg-white rounded-[2.5rem] overflow-hidden shadow-2xl border border-gray-100 flex flex-col lg:flex-row min-h-[500px]">
              <div className="lg:w-3/5 relative h-[300px] lg:h-auto overflow-hidden">
                <Image
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent"></div>
                <div className="absolute top-8 left-8">
                  <span className="bg-brand-red text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full shadow-xl">
                    Featured Article
                  </span>
                </div>
              </div>
              <div className="lg:w-2/5 p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-white relative">
                 <div className="flex items-center gap-4 text-xs font-bold text-brand-red mb-6 uppercase tracking-widest">
                  <Tag className="w-4 h-4" />
                  {featuredPost.category}
                </div>
                <h3 className="text-3xl md:text-4xl font-bold font-cherith text-brand-blue mb-6 leading-tight group-hover:text-brand-red transition-colors">
                  <Link href={`/blogs/${featuredPost.slug}`}>
                    {featuredPost.title}
                  </Link>
                </h3>
                <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center gap-6 mb-8 text-sm text-gray-400 font-medium">
                  <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {featuredPost.date}</span>
                  <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> {featuredPost.readingTime}</span>
                </div>
                <Link
                  href={`/blogs/${featuredPost.slug}`}
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-brand-blue text-white rounded-xl font-bold hover:bg-brand-red transition-all shadow-xl shadow-brand-blue/20 w-fit"
                >
                  Read Full Story <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}

        {/* Controls */}
        <div className="sticky top-24 z-30 bg-zinc-50/80 backdrop-blur-md py-6 mb-12 border-y border-gray-200/50">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all shadow-sm border ${
                    activeCategory === cat
                      ? "bg-brand-blue text-white border-brand-blue"
                      : "bg-white text-gray-500 hover:text-brand-blue border-gray-100 hover:border-brand-blue/30"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="w-full md:w-80 relative group">
              <input
                type="text"
                placeholder="Search archives..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-3.5 rounded-xl border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red transition-all text-sm font-medium"
              />
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
          <AnimatePresence mode="popLayout">
            {filteredBlogs.map((blog) => (
              <motion.article
                layout
                key={blog.slug}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="group flex flex-col bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 h-full"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-6 left-6">
                    <span className="bg-brand-red/90 text-white text-[10px] font-bold uppercase tracking-[0.15em] px-3 py-1.5 rounded-lg backdrop-blur shadow-lg">
                      {blog.category}
                    </span>
                  </div>
                </div>

                <div className="p-8 flex-1 flex flex-col">
                  <div className="flex items-center gap-4 text-[10px] font-bold text-gray-400 mb-6 uppercase tracking-widest">
                    <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-brand-red" />{blog.date}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-200"></span>
                    <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-brand-red" />{blog.readingTime}</span>
                  </div>

                  <h3 className="text-2xl font-bold font-cherith text-brand-blue mb-4 leading-tight group-hover:text-brand-red transition-colors">
                    <Link href={`/blogs/${blog.slug}`}>
                      {blog.title}
                    </Link>
                  </h3>

                  <p className="text-gray-500 mb-8 leading-relaxed line-clamp-3">
                    {blog.excerpt}
                  </p>

                  <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
                    <span className="text-xs font-bold text-brand-blue/60 uppercase tracking-tighter">By {blog.author}</span>
                    <Link
                      href={`/blogs/${blog.slug}`}
                      className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-brand-blue hover:bg-brand-blue hover:text-white transition-all shadow-sm"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredBlogs.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="col-span-full py-32 text-center"
          >
             <div className="max-w-md mx-auto">
                <div className="bg-white p-12 rounded-[2rem] shadow-xl border border-gray-100">
                  <p className="text-xl text-brand-blue font-bold font-cherith mb-4">No Insight Found</p>
                  <p className="text-gray-500 mb-8">We couldn't find any articles matching your search or selected category.</p>
                  <button onClick={() => {setSearchQuery(""); setActiveCategory("All")}} className="px-8 py-3 bg-brand-red text-white rounded-xl font-bold hover:shadow-lg transition-all active:scale-95">Reset filters</button>
                </div>
             </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
