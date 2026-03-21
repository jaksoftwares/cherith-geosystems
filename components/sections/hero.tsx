"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight, Globe, Map } from "lucide-react";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Image / Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1541888081622-c9ea15024446?auto=format&fit=crop&q=80"
          alt="Aerial view mapping"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/95 via-brand-blue/80 to-transparent"></div>
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 md:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col gap-6 max-w-3xl">
          {/* <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white w-max backdrop-blur-md"
          >
            <Globe className="w-4 h-4 text-brand-red" />
            <span className="text-sm font-semibold tracking-wide uppercase">Strategic Geospatial Intelligence Partners</span>
          </motion.div> */}

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold font-cherith text-white leading-tight"
          >
            Mapping <span className="text-brand-red">Possibilities.</span><br />
            Defining <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">Precision.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-200 leading-relaxed"
          >
            At Cherith GeoSystems, we transform land and spatial data into accurate, actionable insights that power smarter decisions across Kenya and beyond.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 mt-4"
          >
            <Link
              href="/contact"
              className="bg-brand-red text-white px-8 py-4 rounded-lg font-bold hover:bg-red-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand-red/30 group text-lg"
            >
              Request a Survey
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/about"
              className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-lg font-bold hover:bg-white hover:text-brand-blue transition-all flex items-center justify-center gap-2 text-lg group"
            >
              Talk to an Expert
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center gap-8 mt-6 pt-6 border-t border-white/20"
          >
            <div>
              <p className="text-3xl font-bold text-white font-cherith">19+</p>
              <p className="text-sm text-gray-300">Years Experience</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-white font-cherith">47</p>
              <p className="text-sm text-gray-300">Counties Covered</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-white font-cherith">400+</p>
              <p className="text-sm text-gray-300">Projects Delivered</p>
            </div>
          </motion.div>
        </div>

        {/* Right side floating elements - optional visual flair */}
        <div className="hidden lg:block">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative w-full h-[600px]"
          >
            {/* abstract mapping graphic could go here, or just leaving it empty relies on the background image */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 border-[40px] border-white/5 rounded-full blur-xl"></div>
            <div className="absolute right-20 top-1/4 w-64 h-64 border-[2px] border-brand-red/30 rounded-full animate-pulse"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
