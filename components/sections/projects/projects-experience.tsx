"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Factory, Globe2, MapPin } from "lucide-react";

export function ProjectsExperience() {
  const miles = [
    {
      value: "400+",
      label: "Cadastral Survey Assignments",
      desc: "Delivered rigorously validated boundary operations nationwide.",
      icon: MapPin,
    },
    {
      value: "4+",
      label: "Countries Reached",
      desc: "GIS deployments spanning Kenya, Tanzania, Ethiopia, and Rwanda.",
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
    <section className="py-24 bg-brand-blue relative">
      <div className="absolute inset-0 z-0 opacity-10">
        {/* Subtle dot pattern */}
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
        <div className="flex flex-col items-center justify-center max-w-2xl mx-auto mb-16">
           <span className="bg-brand-red/10 text-brand-red px-4 py-1.5 rounded-full text-sm font-bold tracking-wider uppercase backdrop-blur-sm mb-6 flex items-center gap-2">
             <CheckCircle2 className="w-4 h-4" />
             Broad Footprint
           </span>
           <motion.h2 
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6 }}
             className="text-4xl lg:text-5xl font-extrabold font-cherith text-white leading-tight mb-4"
           >
              Experience Beyond <br className="hidden md:block" /> the Horizon
           </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {miles.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group flex flex-col items-center justify-center p-12 bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl hover:bg-white/10 transition-colors"
            >
              <item.icon className="w-10 h-10 text-gray-400 group-hover:text-brand-red transition-colors mb-6" />
              <div className="text-4xl md:text-5xl font-extrabold font-cherith text-brand-red mb-3">
                {item.value}
              </div>
              <p className="text-xl font-bold font-cherith text-white mb-2">
                {item.label}
              </p>
              <p className="text-sm text-gray-300">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
