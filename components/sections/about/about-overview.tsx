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
    <section className="py-20 md:py-32 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left: Image Grid/Collage */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative h-[600px] w-full rounded-2xl overflow-hidden shadow-2xl group"
        >
          <Image
            src="https://images.unsplash.com/photo-1503708928676-1cb796a0891e?auto=format&fit=crop&q=80"
            alt="Surveying equipment on site"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-brand-blue/20 group-hover:bg-transparent transition-colors duration-500"></div>
          
          {/* Floating stat card */}
          <div className="absolute bottom-6 left-6 right-6 md:left-auto md:right-auto md:-bottom-10 md:-left-10 bg-brand-blue text-white p-8 rounded-xl shadow-xl flex items-center gap-6 z-20 md:w-[320px]">
            <div className="text-brand-red text-6xl font-extrabold font-cherith">19+</div>
            <div>
              <p className="text-xl font-bold font-cherith leading-tight mb-1">Years of</p>
              <p className="text-gray-300">Industry Excellence</p>
            </div>
          </div>
        </motion.div>

        {/* Right: Content */}
        <div className="flex flex-col gap-6 lg:pl-10">
          <div className="inline-flex items-center gap-2">
            <span className="h-0.5 w-10 bg-brand-red inline-block"></span>
            <span className="text-brand-red font-semibold uppercase tracking-wider text-sm">Who We Are</span>
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-5xl font-extrabold font-cherith text-brand-blue leading-tight"
          >
            Transforming Complex Data into Clear <span className="text-brand-red">Insights</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg text-gray-600 leading-relaxed mt-2"
          >
            At Cherith GeoSystems, we specialize in transforming complex land and spatial data into clear, actionable insights that support infrastructure development, environmental management, and land administration.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg text-gray-600 leading-relaxed mb-4"
          >
            We partner with governments, developers, financial institutions, and individuals to deliver reliable, data-driven results backed by advanced technology and decades of expertise.
          </motion.p>

          {/* Bullet points */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4"
          >
            {points.map((point, index) => (
              <div key={index} className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-brand-red flex-shrink-0" />
                <span className="text-brand-blue font-semibold">{point}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
