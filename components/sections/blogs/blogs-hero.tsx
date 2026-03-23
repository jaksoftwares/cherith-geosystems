"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function BlogsHero() {
  return (
    <section className="relative min-h-[50vh] flex items-center justify-center pt-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80"
          alt="Abstract global networking and spatial mapping"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-brand-blue/80 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-50 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10 text-center flex flex-col items-center pb-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-block px-4 py-1.5 rounded-full bg-brand-red/90 border border-brand-red text-white text-sm font-bold tracking-wider uppercase mb-6 shadow-lg"
        >
          Company Blogs
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-7xl font-extrabold font-cherith text-white leading-tight mb-6"
        >
          Mapping <span className="text-white/80">Blogs</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed font-light"
        >
          Explore expert perspectives, technical breakdowns, and the latest innovations transforming surveying, GIS, and geospatial engineering.
        </motion.p>
      </div>
    </section>
  );
}
