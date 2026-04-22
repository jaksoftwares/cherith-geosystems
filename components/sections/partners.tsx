"use client";

import { motion } from "framer-motion";

const partners = [
  { name: "United Nations", subtitle: " Partner" },
  { name: "UNHCR", subtitle: "Regional GIS Support" },
  { name: "IGAD", subtitle: "Cross-border Surveys" },
  { name: "Kenya Airports Authority", subtitle: "Infrastructure Mapping" },
  { name: "Maasai Mara", subtitle: "Conservation Mapping" },
  { name: "Equity Bank", subtitle: "Financial Verification" },
  { name: "KCB Bank", subtitle: "Land Appraisal Data" },
  { name: "Nairobi City County", subtitle: "Urban Planning Support" },
  { name: "Isiolo County", subtitle: "Cadastral Development" },
];

export function Partners() {
  // Duplicating the list to ensure the marquee is full
  const duplicatedPartners = [...partners, ...partners, ...partners];

  return (
    <section className="py-10 md:py-12 bg-white border-y border-brand-grey/30 overflow-hidden relative">
      {/* Background soft glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-brand-blue/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-8 mb-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-brand-red font-bold tracking-widest uppercase text-[10px] md:text-xs mb-3 block">
            Our  Reach
          </span>
          <h2 className="text-xl md:text-3xl font-bold font-cherith text-brand-blue mb-4 tracking-tight">
            Trusted by Global Leaders & Institutions
          </h2>
          <div className="w-16 h-1 bg-brand-red mx-auto rounded-full"></div>
        </motion.div>
      </div>

      <div className="relative flex overflow-hidden py-2 group">
        <div className="flex animate-marquee whitespace-nowrap gap-10 md:gap-20 items-center">
          {duplicatedPartners.map((partner, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center justify-center min-w-max px-4 group/item cursor-default"
            >
               <span className="text-xl md:text-2xl font-extrabold font-cherith text-brand-blue/20 group-hover/item:text-brand-blue transition-all duration-500 tracking-tighter hover:scale-105 transform inline-block">
                {partner.name}
              </span>
              <span className="text-[9px] md:text-[10px] font-bold text-brand-red/30 group-hover/item:text-brand-red transition-all duration-500 uppercase tracking-[0.2em] mt-1.5">
                {partner.subtitle}
              </span>
            </div>
          ))}
        </div>

        {/* Gradient Overlays for smooth fading edges */}
        <div className="absolute inset-y-0 left-0 w-24 md:w-64 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-24 md:w-64 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none"></div>
      </div>

      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
