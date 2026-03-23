"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, Clock } from "lucide-react";

import { blogsData } from "@/lib/data/blogs";

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

  return (
    <section className="py-20 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col mb-12 items-center text-center max-w-3xl mx-auto">
          <span className="h-1 w-12 bg-brand-red inline-block mb-4"></span>
          <h2 className="text-3xl md:text-5xl font-extrabold font-cherith text-brand-blue tracking-tight">
            Latest Perspectives
          </h2>
          <p className="mt-4 text-gray-500 text-lg">
            Stay ahead with authoritative commentary from Kenya's leading spatial analysts.
          </p>
        </div>

        {/* Interactive Filters & Search */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 max-w-7xl mx-auto gap-6">
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all shadow-sm ${
                  activeCategory === cat
                    ? "bg-brand-red text-white"
                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="w-full md:w-72 relative">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-5 py-3 rounded-full border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-12 max-w-7xl mx-auto">
          <AnimatePresence mode="popLayout">
            {filteredBlogs.length > 0 ? (
              filteredBlogs.map((blog, idx) => {
                const isFeatured = idx === 0 && activeCategory === "All" && !searchQuery;

                return (
                  <motion.article
                    layout
                    key={blog.slug}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    className={`group flex flex-col bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-100 ${
                      isFeatured ? "md:col-span-2 lg:col-span-2 md:flex-row" : ""
                    }`}
                  >
                    {/* Image Wrap */}
                    <div className={`relative overflow-hidden cursor-pointer ${isFeatured ? "md:w-1/2" : "w-full aspect-[4/3]"} min-h-[250px]`}>
                      <Link href={`/blogs/${blog.slug}`} className="absolute inset-0 z-20" aria-label={`Read ${blog.title}`}></Link>
                      <Image
                        src={blog.image}
                        alt={blog.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-brand-blue/0 group-hover:bg-brand-blue/10 transition-colors duration-500 z-10 pointer-events-none"></div>
                      <div className="absolute top-4 left-4 bg-brand-red text-white text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded shadow-lg backdrop-blur text-shadow z-10 pointer-events-none">
                        {blog.category}
                      </div>
                    </div>

                    {/* Content Wrap */}
                    <div className={`flex flex-col flex-grow p-6 md:p-8 ${isFeatured ? "md:w-1/2 justify-center" : ""}`}>
                      <div className="flex items-center gap-4 text-xs font-medium text-gray-400 mb-4 uppercase tracking-wider">
                        <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{blog.date}</span>
                        <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                        <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{blog.readingTime}</span>
                      </div>

                      <h3 className={`font-bold font-cherith text-brand-blue mb-3 group-hover:text-brand-red transition-colors leading-tight ${isFeatured ? "text-3xl md:text-4xl" : "text-2xl"}`}>
                        <Link href={`/blogs/${blog.slug}`} className="focus:outline-none">
                          <span className="absolute inset-0 z-10" aria-hidden="true"></span>
                          {blog.title}
                        </Link>
                      </h3>

                      <p className={`text-gray-600 mb-6 leading-relaxed ${isFeatured ? "text-lg" : "text-base line-clamp-3"}`}>
                        {blog.excerpt}
                      </p>

                      <div className="mt-auto flex items-center justify-between pt-6 border-t border-gray-100 relative z-20">
                        <span className="text-sm font-semibold text-gray-900 border-l-2 border-brand-red pl-2">By {blog.author}</span>
                        <Link
                          href={`/blogs/${blog.slug}`}
                          className="text-brand-blue flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:text-brand-red transition-colors"
                        >
                          Read Article <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </motion.article>
                );
              })
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full py-20 text-center"
              >
                 <p className="text-xl text-gray-500 font-medium">No articles found matching your criteria.</p>
                 <button onClick={() => {setSearchQuery(""); setActiveCategory("All")}} className="mt-4 px-6 py-2 bg-brand-blue text-white rounded-full text-sm font-bold hover:bg-brand-red transition-colors">Clear Filters</button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
