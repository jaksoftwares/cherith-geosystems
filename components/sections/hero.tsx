"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronRight, ChevronLeft } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";

const heroImages = [
  {
    src: "/images/panoramic-landmapping.png",
    alt: "Aerial view mapping",
  },
  {
    src: "/images/drone-mapping.jpg",
    alt: "Advanced drone surveys",
  },
  {
    src: "/images/infrastructureproject.png",
    alt: "Infrastructure development",
  },
  {
    src: "/images/urban-engineering-survey.jpg",
    alt: "Urban engineering precision",
  },
  {
    src: "/images/roadconstructionsurveys.jpg",
    alt: "Road construction surveying",
  }
];

export function Hero() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % heroImages.length);
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + heroImages.length) % heroImages.length);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 md:pt-32 pb-20 overflow-hidden bg-black">
      {/* Background Carousel */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImage}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <Image
              src={heroImages[currentImage].src}
              alt={heroImages[currentImage].alt}
              fill
              priority
              className="object-cover object-center"
            />
          </motion.div>
        </AnimatePresence>
        
        {/* Layered Overlays for better readability with reduced blue */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/80 via-brand-blue/30 to-transparent z-[1]"></div>
        <div className="absolute inset-0 bg-black/50 z-[1]"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/60 via-transparent to-transparent z-[1]"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 md:px-8 relative z-20">
        <div className="flex flex-col gap-6 md:gap-8 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-3"
          >
            <div className="w-8 md:w-12 h-[2px] bg-brand-red"></div>
            <span className="text-white font-bold tracking-[0.15em] md:tracking-[0.2em] uppercase text-xs md:text-sm">
              Strategic Geospatial Intelligence
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold font-cherith text-white leading-[1.15] md:leading-[1.1]"
          >
            Mapping <span className="text-brand-red">Possibilities.</span><br />
            Defining <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/40">Precision.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-2xl text-gray-100 leading-relaxed max-w-2xl drop-shadow-md"
          >
            Transforming complex spatial data into accurate, actionable insights that power critical decisions across the region.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 md:gap-6 mt-4 md:mt-6"
          >
            <Link
              href="/contact"
              className="bg-brand-red text-white px-8 md:px-10 py-4 md:py-5 rounded-xl font-bold hover:bg-red-700 transition-all flex items-center justify-center gap-3 shadow-2xl shadow-brand-red/40 group text-lg md:text-xl"
            >
              Request a Survey
              <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/about"
              className="bg-white/10 backdrop-blur-xl border border-white/20 text-white px-8 md:px-10 py-4 md:py-5 rounded-xl font-bold hover:bg-white hover:text-brand-blue transition-all flex items-center justify-center gap-3 text-lg md:text-xl group"
            >
              Talk to an Expert
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-3 gap-4 md:gap-12 mt-10 md:mt-12 pt-8 md:pt-10 border-t border-white/10"
          >
            <div className="group cursor-default">
              <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-white font-cherith group-hover:text-brand-red transition-colors">19+</p>
              <p className="text-[10px] sm:text-xs md:text-sm text-gray-400 font-medium uppercase tracking-wider mt-1">Experience</p>
            </div>
            <div className="group cursor-default">
              <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-white font-cherith group-hover:text-brand-red transition-colors">47</p>
              <p className="text-[10px] sm:text-xs md:text-sm text-gray-400 font-medium uppercase tracking-wider mt-1">Counties</p>
            </div>
            <div className="group cursor-default">
              <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-white font-cherith group-hover:text-brand-red transition-colors">400+</p>
              <p className="text-[10px] sm:text-xs md:text-sm text-gray-400 font-medium uppercase tracking-wider mt-1">Projects</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Carousel Controls - Updated for better mobile visibility */}
      <div className="absolute bottom-10 right-4 md:right-12 z-30 flex items-center gap-4">
        <div className="hidden lg:flex gap-2 mr-8">
          {heroImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentImage(idx)}
              className={`h-1.5 transition-all duration-500 rounded-full ${
                currentImage === idx ? "w-12 bg-brand-red" : "w-6 bg-white/30 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button 
            onClick={prevImage}
            className="p-3 md:p-4 rounded-full bg-white/5 hover:bg-brand-red text-white border border-white/10 transition-all backdrop-blur-md"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>
          <button 
            onClick={nextImage}
            className="p-3 md:p-4 rounded-full bg-white/5 hover:bg-brand-red text-white border border-white/10 transition-all backdrop-blur-md"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>
      </div>

      {/* Dynamic Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 pointer-events-none"
      >
        <div className="w-5 h-8 rounded-full border-2 border-white/20 flex justify-center p-1">
          <div className="w-1 h-1.5 bg-brand-red rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}
