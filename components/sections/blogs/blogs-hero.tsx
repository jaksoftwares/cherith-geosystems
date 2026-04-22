"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function BlogsHero() {
  return (
    <section className="relative min-h-[35vh] flex items-center justify-center pt-24 pb-8 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/gis-web-portal.jpg"
          alt="Abstract global networking and spatial mapping"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-brand-blue/80 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-50 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-block px-4 py-1 rounded-full bg-brand-red/90 border border-brand-red text-white text-xs font-bold tracking-wider uppercase mb-5 shadow-lg"
        >
          Company Blogs
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl md:text-4xl lg:text-5xl font-extrabold font-cherith text-white leading-tight mb-5"
        >
          Mapping <span className="text-white/80">Blogs</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base md:text-lg text-gray-200 max-w-2xl mx-auto leading-relaxed font-light"
        >
          Explore expert perspectives, technical breakdowns, and the latest innovations transforming surveying, GIS, and geospatial engineering.
        </motion.p>
      </div>
    </section>
  );
}
