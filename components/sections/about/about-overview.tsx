"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

export function AboutOverview() {
  const points = [
    "Precise Cadastral Surveying",
    "Engineering & Topographical Maps",
    "GIS Data Integration",
    "Underground Utility Mapping"
  ];

  return (
    <section className="py-12 md:py-16 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
        {/* Left: Image Grid/Collage */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative h-[250px] sm:h-[350px] md:h-[450px] lg:h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl group border border-gray-100"
        >
          <Image
            src="/images/corporate-office and consultation.jpg"
            alt="Surveying equipment on site"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-brand-blue/20 group-hover:bg-transparent transition-colors duration-500"></div>
          
          {/* Floating stat card - Adjusted for mobile */}
          <div className="absolute bottom-3 left-3 right-3 md:left-auto md:right-auto md:-bottom-8 md:-left-8 bg-brand-blue text-white p-5 md:p-6 rounded-xl shadow-2xl flex items-center gap-4 md:gap-5 z-20 md:w-[280px] border-b-4 border-brand-red">
            <div className="text-brand-red text-4xl md:text-5xl font-extrabold font-cherith leading-none">19+</div>
            <div>
              <p className="text-base md:text-lg font-bold font-cherith leading-tight mb-0.5">Years of</p>
              <p className="text-[10px] md:text-xs text-gray-300 uppercase tracking-widest font-semibold">Industry Excellence</p>
            </div>
          </div>
        </motion.div>

        {/* Right: Content */}
        <div className="flex flex-col gap-4 lg:pl-10 mt-8 lg:mt-0">
          <div className="inline-flex items-center gap-2">
            <span className="h-0.5 w-8 bg-brand-red inline-block"></span>
            <span className="text-brand-red font-semibold uppercase tracking-wider text-xs">Who We Are</span>
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-2xl md:text-3xl lg:text-4xl font-extrabold font-cherith text-brand-blue leading-tight"
          >
            Transforming Complex Data into Clear <span className="text-brand-red">Insights</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-sm md:text-base text-gray-600 leading-relaxed mt-1"
          >
            At Cherith GeoSystems, we specialize in transforming complex land and spatial data into clear, actionable insights that support infrastructure development, environmental management, and land administration.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-sm md:text-base text-gray-600 leading-relaxed mb-2"
          >
            We partner with governments, developers, financial institutions, and individuals to deliver reliable, data-driven results backed by advanced technology and decades of expertise.
          </motion.p>

          {/* Bullet points */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2"
          >
            {points.map((point, index) => (
              <div key={index} className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-brand-red flex-shrink-0" />
                <span className="text-brand-blue font-semibold text-sm">{point}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
