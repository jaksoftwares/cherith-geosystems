"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Factory, Globe2, MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";

export function ProjectsExperience() {
  const miles = [
    {
      value: "400+",
      label: "Cadastral Survey Assignments",
      desc: "Delivered rigorously validated boundary operations nationwide.",
      icon: MapPin,
    },
    {
      value: "8+",
      label: "Countries Reached",
      desc: "GIS deployments spanning Kenya, Rwanda, Uganda, Eritrea, Ethiopia, and beyond.",
      icon: Globe2,
    },
    {
      value: "Multi-Sector",
      label: "Industries Served",
      desc: "Supporting vast infrastructure & real estate development securely.",
      icon: Factory,
    },
  ];

  return (
    <section className="py-12 md:py-16 bg-brand-blue relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-10">
        <svg
          className="absolute h-full w-full stroke-white/20 [mask-image:linear-gradient(to_bottom,white,transparent)]"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="geo-dots"
              width="20"
              height="20"
              x="50%"
              y="0"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="2" cy="2" r="1.5" fill="currentColor" />
            </pattern>
          </defs>
          <rect
            width="100%"
            height="100%"
            strokeWidth="0"
            fill="url(#geo-dots)"
          />
        </svg>
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10 text-center">
        <div className="flex flex-col items-center justify-center max-w-2xl mx-auto mb-10 md:mb-12">
           <span className="bg-brand-red/10 text-brand-red px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase backdrop-blur-sm mb-4 flex items-center gap-2">
             <CheckCircle2 className="w-3.5 h-3.5" />
             Broad Footprint
           </span>
           <motion.h2 
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6 }}
             className="text-2xl lg:text-3xl font-extrabold font-cherith text-white leading-tight mb-4"
           >
              Experience Beyond <br className="hidden md:block" /> the Horizon
           </motion.h2>
           <p className="text-gray-300 text-sm md:text-base mb-8 max-w-xl">
            Our geospatial reach extends across the African continent, delivering precision engineering and GIS solutions to diverse nations and industries.
           </p>
           
           <Link 
             href="/experience"
             className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-brand-red text-white hover:bg-brand-red/90 rounded-xl font-bold shadow-xl shadow-brand-red/20 transition-all active:scale-95 group text-sm"
           >
             Explore Global Reach
             <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
           </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {miles.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group flex flex-col items-center justify-center p-6 md:p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 transition-colors"
            >
              <item.icon className="w-8 h-8 text-gray-400 group-hover:text-brand-red transition-colors mb-4" />
              <div className="text-3xl md:text-4xl font-extrabold font-cherith text-brand-red mb-2">
                {item.value}
              </div>
              <p className="text-lg font-bold font-cherith text-white mb-1.5">
                {item.label}
              </p>
              <p className="text-xs text-gray-300">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
