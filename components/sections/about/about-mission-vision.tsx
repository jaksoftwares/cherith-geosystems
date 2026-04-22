"use client";

import { motion } from "framer-motion";
import { Compass, Lightbulb, Target } from "lucide-react";

export function AboutMissionVision() {
  const cards = [
    {
      title: "Our Mission",
      content:
        "To provide accurate, reliable, and innovative geospatial solutions that empower informed decision-making.",
      color: "blue",
    },
    {
      title: "Our Vision",
      content:
        "To be a leading geospatial solutions provider shaping sustainable development across Africa.",
      color: "red",
    },
    {
      title: "Our Approach",
      content:
        "Utilizing advanced technology such as RTK GPS, Total Stations, and robust GIS platforms to deliver unmatched precision.",
      color: "gray",
    },
  ];

  return (
    <section className="py-12 md:py-16 bg-gray-50 relative">
      {/* Decorative hexagonal mesh background (subtle) */}
      <div className="absolute inset-0 z-0">
        <svg
          className="absolute h-full w-full stroke-gray-200 [mask-image:linear-gradient(to_bottom_right,white,transparent)]"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="grid-pattern"
              width="200"
              height="200"
              x="50%"
              y="-1"
              patternUnits="userSpaceOnUse"
            >
              <path d="M.5 200V.5H200" fill="none" />
            </pattern>
          </defs>
          <rect
            width="100%"
            height="100%"
            strokeWidth="0"
            fill="url(#grid-pattern)"
          />
        </svg>
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-12">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl md:text-3xl lg:text-4xl font-extrabold font-cherith text-brand-blue mb-3"
          >
            Purpose <span className="text-brand-red">&amp;</span> Direction
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base text-gray-600"
          >
            Guided by precision, driven by innovation.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {cards.map((card, idx) => {
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className="bg-white rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-xl transition-shadow border border-gray-100 relative overflow-hidden group"
              >
                <h3 className="text-xl font-bold font-cherith text-brand-blue mb-3">
                  {card.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                  {card.content}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
