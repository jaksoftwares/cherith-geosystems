"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Share2, Facebook, Twitter, Linkedin, Bookmark } from "lucide-react";

type BlogItem = {
  title: string;
  category: string;
  author: string;
  date: string;
  readingTime: string;
  image: string;
  content: string;
};

export function BlogReadingUI({ blog }: { blog: BlogItem }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const paragraphs = blog.content.split("\n\n");

  return (
    <>
      {/* Top Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-brand-red z-50 origin-left"
        style={{ scaleX }}
      />

      {/* Blog Article Hero Header */}
      <section className="relative min-h-[60vh] flex items-center justify-center pt-24 pb-12 overflow-hidden bg-gray-900 group">
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            priority
            className="object-cover object-center opacity-40 blur-[2px] transition-all duration-700 group-hover:blur-none group-hover:opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-gray-900/60 to-brand-blue/90 transition-colors duration-700"></div>
        </motion.div>

        <div className="container mx-auto px-4 md:px-8 relative z-10 max-w-4xl pt-10">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-gray-300 hover:text-white mb-8 uppercase tracking-wider text-sm font-semibold transition-colors focus:ring-2 focus:ring-brand-red rounded-lg px-2 py-1 -ml-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blogs
          </Link>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <span className="bg-brand-red text-white text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded shadow-lg backdrop-blur cursor-pointer hover:bg-brand-blue transition-colors">
              {blog.category}
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-cherith text-white leading-tight mb-8"
          >
            {blog.title}
          </motion.h1>

          <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ duration: 0.6, delay: 0.3 }}
             className="flex flex-wrap items-center gap-6 text-sm font-medium text-gray-300 uppercase tracking-wider border-t border-gray-100/20 pt-6"
          >
            <span className="flex items-center gap-2 border-r border-gray-600 pr-6">
              By {blog.author}
            </span>
            <span className="flex items-center gap-1.5 border-r border-gray-600 pr-6">
              <Calendar className="w-4 h-4 text-brand-red" /> {blog.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-brand-red" /> {blog.readingTime}
            </span>
          </motion.div>
        </div>
      </section>

      {/* Reading Container with Sticky Socials */}
      <section className="py-20 bg-white relative">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl flex flex-col lg:flex-row gap-12 relative">
          
          {/* Left Sticky Sidebar (Desktop) */}
          <div className="hidden lg:block w-16 flex-shrink-0 relative">
            <div className="sticky top-40 flex flex-col gap-4 text-gray-400">
               <button className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-brand-blue hover:text-white hover:border-brand-blue transition-all group relative">
                 <Bookmark className="w-5 h-5 group-hover:scale-110 transition-transform" />
               </button>
               <button className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-all group">
                 <svg className="w-5 h-5 group-hover:scale-110 transition-transform fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
               </button>
               <button className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all group">
                 <Facebook className="w-5 h-5 group-hover:scale-110 transition-transform" />
               </button>
               <button className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-blue-700 hover:text-white hover:border-blue-700 transition-all group">
                 <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform" />
               </button>
            </div>
          </div>

          {/* Main Article Content */}
          <div className="max-w-3xl flex-grow">
            <div className="prose prose-lg md:prose-xl prose-blue max-w-none">
              {paragraphs.map((paragraph, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                >
                  <p className="text-gray-700 leading-relaxed font-light mb-8 font-sans">
                    {paragraph}
                  </p>
                  
                  {/* Inline visual break to satisfy the request for interactive/image-heavy layout */}
                  {idx === 0 && paragraphs.length > 2 && (
                    <div className="relative w-full h-[400px] md:h-[500px] mb-8 rounded-2xl overflow-hidden shadow-2xl group cursor-pointer border border-gray-100">
                       <Image 
                         src={blog.image + "&fit=crop&blur=1"} 
                         alt="Mid-article interactive visual" 
                         fill 
                         className="object-cover group-hover:scale-105 transition-transform duration-1000"
                       />
                       <div className="absolute inset-0 bg-brand-blue/10 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="bg-white text-brand-blue font-bold px-6 py-3 rounded-full shadow-2xl flex items-center gap-2">
                             View details <ArrowLeft className="w-4 h-4 rotate-180" />
                          </span>
                       </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Author Block */}
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="mt-16 pt-8 border-t border-gray-200 flex flex-col sm:flex-row gap-6 items-center justify-between bg-gray-50 p-6 md:p-8 rounded-2xl border"
            >
              <div className="flex items-center gap-4">
                 <div className="w-16 h-16 bg-brand-blue rounded-full flex items-center justify-center text-white font-extrabold font-cherith text-2xl shadow-lg ring-4 ring-brand-blue/20">
                   {blog.author.charAt(0)}
                 </div>
                 <div>
                    <p className="text-xs font-bold text-brand-red uppercase tracking-widest leading-none mb-1">Author</p>
                    <p className="text-brand-blue font-bold text-xl font-cherith mb-1">{blog.author}</p>
                    <p className="text-gray-500 text-sm">Mapping Specialist & Lead Consultant</p>
                 </div>
              </div>
              <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-gray-300 shadow-sm text-gray-700 hover:text-white hover:bg-brand-blue hover:border-brand-blue transition-all font-medium text-sm w-full sm:w-auto justify-center group">
                <Share2 className="w-4 h-4 group-hover:rotate-12 transition-transform" /> Share Article
              </button>
            </motion.div>
          </div>
          
        </div>
      </section>
    </>
  );
}
