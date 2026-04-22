"use client";

import Image from "next/image";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useAnimationControls } from "framer-motion";
import { useState, useEffect, useCallback, useRef } from "react";

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
  },
  {
    name: "Dr. Linda Amenya",
    role: "Environmental Consultant, GreenEarth Africa",
    content: "Their remote sensing and drone mapping capabilities are top-tier. We've used their insights for several environmental impact assessments with great success.",
    avatar: "/images/testimonial_4.png",
    rating: 5
  }
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const nextTestimonial = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prevTestimonial = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  // Auto-play logic
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(nextTestimonial, 5000);
    return () => clearInterval(timer);
  }, [nextTestimonial, isPaused]);

  return (
    <section className="py-12 md:py-16 bg-gray-50/50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(17,66,128,0.05),transparent_70%)]"></div>
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center justify-center gap-2 text-brand-red font-semibold tracking-wider uppercase text-xs mb-3"
          >
            <span className="w-6 h-[2px] bg-brand-red block"></span>
            Testimonials
            <span className="w-6 h-[2px] bg-brand-red block"></span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl lg:text-4xl font-bold font-cherith text-brand-blue leading-[1.2]"
          >
             Precision Trusted by <span className="text-brand-red">Professionals</span>
          </motion.h2>
        </div>

        {/* Sliding Row Container */}
        <div 
          className="relative max-w-5xl mx-auto overflow-hidden px-4"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Controls - more visible and industrial look */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-2 md:px-0 z-30 pointer-events-none">
            <button 
              onClick={prevTestimonial}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-brand-blue hover:bg-brand-blue hover:text-white transition-all pointer-events-auto border border-gray-100"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={nextTestimonial}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-brand-blue hover:bg-brand-blue hover:text-white transition-all pointer-events-auto border border-gray-100"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="relative overflow-hidden pt-8 pb-8">
            <motion.div 
              className="flex items-center"
              initial={false}
              animate={{ 
                x: `-${currentIndex * 100}%` 
              }}
              transition={{ 
                type: "spring", 
                stiffness: 100, 
                damping: 20,
                mass: 0.8
              }}
            >
              {testimonials.map((testimonial, idx) => (
                <div 
                  key={idx} 
                  className="min-w-full px-2"
                >
                  <div className="bg-white rounded-[24px] p-6 md:p-10 shadow-xl border border-gray-100 relative group">
                    {/* Industrial accents */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-brand-blue opacity-[0.02] -mr-12 -mt-12 rounded-full group-hover:opacity-[0.05] transition-opacity"></div>
                    
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-10 relative z-10">
                      {/* Avatar with status circle */}
                      <div className="shrink-0 relative">
                        <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden border-2 border-brand-red/20 shadow-md">
                          <Image 
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-brand-red rounded-lg flex items-center justify-center text-white shadow-lg">
                          <Quote className="w-3 h-3 fill-white" />
                        </div>
                      </div>

                      <div className="flex-1 text-center md:text-left">
                        <div className="flex justify-center md:justify-start gap-1 mb-3">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                        
                        <p className="text-base md:text-lg text-gray-700 font-medium leading-relaxed mb-4 italic">
                          "{testimonial.content}"
                        </p>
                        
                        <div className="pt-4 border-t border-gray-100">
                          <h4 className="text-lg font-bold text-brand-blue">{testimonial.name}</h4>
                          <p className="text-[10px] font-semibold text-brand-red uppercase tracking-widest mt-0.5">
                            {testimonial.role}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Refined Progress Bar */}
        <div className="flex justify-center gap-2 mt-12">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className="h-2 rounded-full transition-all duration-500 overflow-hidden bg-gray-200"
              style={{ width: idx === currentIndex ? "48px" : "12px" }}
            >
              <div 
                className={`h-full bg-brand-blue transition-all duration-500 ${
                  idx === currentIndex ? "w-full" : "w-0"
                }`} 
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
