"use client";

import { motion } from "framer-motion";
import { Briefcase, Globe2, Network, ShieldCheck } from "lucide-react";

export function AboutExperience() {
  const experiences = [
    {
      title: "19+ Years",
      description: "of proven industry experience delivering precision solutions.",
      icon: Briefcase,
    },
    {
      title: "Regional Reach",
      description: "Successfully executing projects across Kenya and East Africa.",
      icon: Globe2,
    },
    {
      title: "Global Partners",
      description: "Trusted partnerships with UN agencies and regional organizations.",
      icon: Network,
    },
    {
      title: "Trusted Expertise",
      description: "Extensive work with banks, developers, and government institutions.",
      icon: ShieldCheck,
    },
  ];

  return (
    <section className="py-12 md:py-16 bg-brand-blue relative">
      <div className="absolute inset-0 z-0">
        <svg
          className="absolute h-full w-full stroke-white/5 [mask-image:linear-gradient(to_bottom,white,transparent)]"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="geo-pattern"
              width="100"
              height="100"
              x="50%"
              y="-1"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="50" cy="50" r="1.5" fill="currentColor" />
              <path d="M50 50L100 0M50 50h50M50 50V0M50 50L0 0" fill="none" />
            </pattern>
          </defs>
          <rect
            width="100%"
            height="100%"
            strokeWidth="1"
            fill="url(#geo-pattern)"
          />
        </svg>
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl md:text-3xl font-extrabold font-cherith text-white mb-4"
          >
            A Legacy of <span className="text-brand-red">Excellence</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm md:text-base text-gray-300"
          >
            Building trust through consistent, high-quality delivery across diverse sectors.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {experiences.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-5 md:p-6 border border-white/20 hover:bg-white/20 transition-all group text-center"
              >
                <div className="w-10 h-10 mx-auto bg-brand-red/20 text-brand-red rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg md:text-xl font-bold font-cherith text-white mb-2 tracking-wide">
                  {item.title}
                </h3>
                <p className="text-gray-300 text-[11px] md:text-xs leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
