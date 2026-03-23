"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function ProjectsHero() {
  return (
    <section className="relative min-h-[50vh] flex items-center justify-center pt-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1541888126131-ab7bb7fb54ac?auto=format&fit=crop&q=80"
          alt="Surveying team on massive project site"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-brand-blue/80 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-block px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-sm font-semibold tracking-wider uppercase mb-6 backdrop-blur-sm"
        >
          Our Portfolio
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-7xl font-extrabold font-cherith text-white leading-tight mb-6 max-w-4xl"
        >
          Mapping of <span className="text-brand-red">Distinction</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed font-light"
        >
          Our portfolio reflects an unwavering commitment to precision, reliability, and excellence across high-stakes geospatial and structural engineering projects.
        </motion.p>
      </div>
    </section>
  );
}
