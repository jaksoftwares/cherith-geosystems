"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function ContactHero() {
  return (
    <section className="relative min-h-[35vh] flex items-center justify-center pt-24 pb-8 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/satellitegis-visual concept.jpg"
          alt="Satellite Mapping Contact Background"
          fill
          priority
          className="object-cover object-center grayscale opacity-80"
        />
        <div className="absolute inset-0 bg-brand-blue/90 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-50 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-block px-4 py-1 rounded-full bg-brand-red/90 border border-brand-red text-white text-xs font-bold tracking-wider uppercase mb-5 shadow-lg"
        >
          Contact Us
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl md:text-4xl lg:text-5xl font-extrabold font-cherith text-white leading-tight mb-5"
        >
          Let's <span className="text-white/80">Talk</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base md:text-lg text-gray-200 max-w-2xl mx-auto leading-relaxed font-light"
        >
          Expert geospatial intelligence and rapid-response surveying across East Africa.
        </motion.p>
      </div>
    </section>
  );
}
