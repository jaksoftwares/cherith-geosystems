"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function ServicesHero() {
  return (
    <section className="relative min-h-[40vh] flex items-center justify-center pt-24 pb-12 overflow-hidden">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/large-scale landmapping.jpg"
          alt="Surveying site landscape"
          fill
          priority
          className="object-cover object-bottom"
        />
        <div className="absolute inset-0 bg-brand-blue/80 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-block px-4 py-1 rounded-full bg-white/10 border border-white/20 text-white text-xs font-semibold tracking-wider uppercase mb-5 backdrop-blur-sm"
        >
          Our Services
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl md:text-4xl lg:text-6xl font-extrabold font-cherith text-white leading-tight mb-5"
        >
          Mapping the <span className="text-brand-red">Future</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base md:text-lg text-gray-200 max-w-2xl mx-auto leading-relaxed"
        >
          We offer a comprehensive range of precision geospatial and surveying solutions tailored to meet the sophisticated demands of diverse industries.
        </motion.p>
      </div>
    </section>
  );
}
