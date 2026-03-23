"use client";

import { motion } from "framer-motion";
import { Compass, Lightbulb, Target } from "lucide-react";

export function AboutMissionVision() {
  const cards = [
    {
      title: "Our Mission",
      icon: Target,
      content:
        "To provide accurate, reliable, and innovative geospatial solutions that empower informed decision-making.",
      color: "blue",
    },
    {
      title: "Our Vision",
      icon: Lightbulb,
      content:
        "To be a leading geospatial solutions provider shaping sustainable development across Africa.",
      color: "red",
    },
    {
      title: "Our Approach",
      icon: Compass,
      content:
        "Utilizing advanced technology such as RTK GPS, Total Stations, and robust GIS platforms to deliver unmatched precision.",
      color: "gray",
    },
  ];

  return (
    <section className="py-24 bg-gray-50 relative">
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
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-extrabold font-cherith text-brand-blue mb-4"
          >
            Purpose <span className="text-brand-red">&amp;</span> Direction
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-600"
          >
            Guided by precision, driven by innovation.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow border border-gray-100 relative overflow-hidden group"
              >
                {/* Accent border top */}
                <div
                  className={`absolute top-0 left-0 w-full h-1 ${
                    card.color === "blue"
                      ? "bg-brand-blue"
                      : card.color === "red"
                      ? "bg-brand-red"
                      : "bg-gray-400"
                  }`}
                />
                
                <div
                  className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${
                    card.color === "blue"
                      ? "bg-brand-blue/10 text-brand-blue"
                      : card.color === "red"
                      ? "bg-brand-red/10 text-brand-red"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  <Icon className="w-8 h-8" />
                </div>
                
                <h3 className="text-2xl font-bold font-cherith text-brand-blue mb-4">
                  {card.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed text-lg">
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
