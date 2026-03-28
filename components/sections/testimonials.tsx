"use client";

import Image from "next/image";
import { Star, Quote } from "lucide-react";
import { motion, Variants } from "framer-motion";

const testimonials = [
  {
    name: "Eng. Samuel Kojo",
    role: "Senior Project Manager, BuildRight Construction",
    content: "Cherith GeoSystems provided exceptional accuracy in our latest infrastructure project. Their topographic surveys and underground mapping were critical for our foundation planning.",
    avatar: "/images/testimonial_1.png",
    rating: 5
  },
  {
    name: "Sarah Mwangi",
    role: "Lead Architect, Urban Design Studio",
    content: "The level of detail in their GIS analysis and 3D terrain models has transformed our site planning phase. They are truly professional and always deliver on time.",
    avatar: "/images/testimonial_2.png",
    rating: 5
  },
  {
    name: "James Odhiambo",
    role: "CEO, Eastlands Real Estate Developers",
    content: "Working with Cherith for our large-scale land subdivision was seamless. Their cadastral survey expertise and handling of government documentation save us months of delays.",
    avatar: "/images/testimonial_3.png",
    rating: 5
  }
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

export function Testimonials() {
  return (
    <section className="py-20 md:py-28 bg-white relative overflow-hidden">
      {/* Background decoration - subtle gradient and circles */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
        <motion.div 
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 0.2 }}
          transition={{ duration: 1.5 }}
          className="absolute -top-24 -left-24 w-96 h-96 bg-brand-blue/20 rounded-full blur-3xl"
        ></motion.div>
        <motion.div 
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 0.2 }}
          transition={{ duration: 1.5 }}
          className="absolute -bottom-24 -right-24 w-96 h-96 bg-brand-red/20 rounded-full blur-3xl"
        ></motion.div>
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16 md:mb-20"
        >
          <div className="inline-flex items-center justify-center gap-2 text-brand-red font-semibold tracking-wider uppercase text-sm mb-4">
            <span className="w-8 h-[2px] bg-brand-red block"></span>
            Client Testimonials
            <span className="w-8 h-[2px] bg-brand-red block"></span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold font-cherith text-brand-blue leading-[1.2]">
            What Our Clients <span className="text-brand-red">Say About Us</span>
          </h2>
          <p className="mt-6 text-gray-600 text-lg">
            We take pride in delivering precision and reliable geospatial intelligence that empowers our clients' projects across the region.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10"
        >
          {testimonials.map((testimonial, idx) => (
            <motion.div 
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="bg-white p-8 md:p-10 rounded-3xl shadow-lg border border-gray-100 hover:border-brand-blue/30 transition-all duration-300 relative group flex flex-col"
            >
              <div className="absolute -top-6 left-10 w-12 h-12 bg-brand-red text-white rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                <Quote className="w-6 h-6 fill-white" />
              </div>
              
              <div className="flex gap-1 mb-6 mt-2">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>

              <blockquote className="text-gray-700 text-lg leading-relaxed mb-8 flex-1 italic">
                "{testimonial.content}"
              </blockquote>

              <div className="flex items-center gap-4 border-t border-gray-50 pt-8 mt-auto">
                <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-brand-blue/10 shrink-0">
                  <Image 
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-brand-blue text-lg mb-1">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500 font-medium">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
