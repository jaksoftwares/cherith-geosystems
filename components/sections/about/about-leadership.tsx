"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function AboutLeadership() {
  const leaders = [
    {
      name: "Okusimba George Omusotsi",
      role: "Director",
      qualifications: [
        "BSc (Surveying)",
        "MSc (GIS)",
        "PhD (Environmental Planning)"
      ],
      memberships: "Full Member, ISK",
      image: "https://ui-avatars.com/api/?name=Okusimba+George+Omusotsi&background=263678&color=fff&size=512" 
    },
    {
      name: "Ilavonga Amos Shibutse",
      role: "Lead Consultant",
      qualifications: [
        "BSc (Surveying)",
        "MSc (GIS)"
      ],
      memberships: "Associate Member, ISK",
      image: "https://ui-avatars.com/api/?name=Ilavonga+Amos+Shibutse&background=E31B23&color=fff&size=512"
    }
  ];

  return (
    <section className="py-12 md:py-16 bg-white relative">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-12">
          <div className="inline-flex items-center justify-center gap-2 mb-3">
            <span className="h-0.5 w-8 bg-brand-red inline-block"></span>
            <span className="text-brand-red font-semibold uppercase tracking-wider text-xs">Leadership</span>
            <span className="h-0.5 w-8 bg-brand-red inline-block"></span>
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl md:text-3xl lg:text-4xl font-extrabold font-cherith text-brand-blue mb-4"
          >
            Guided by <span className="text-brand-red">Experience</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base text-gray-600 max-w-2xl mx-auto leading-relaxed"
          >
            Together, they bring over 38 years of combined experience in cadastral surveying, engineering surveys, and GIS analysis.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-12 max-w-4xl mx-auto">
          {leaders.map((leader, idx) => (
            <motion.div
              key={leader.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.3 }}
              className="flex flex-col items-center group text-center"
            >
              <div className="relative w-44 h-44 sm:w-52 sm:h-52 md:w-56 md:h-56 mb-6 rounded-full overflow-hidden shadow-xl ring-4 ring-offset-4 ring-brand-blue/10 group-hover:ring-brand-red/30 transition-all duration-500">
                <Image
                  src={leader.image}
                  alt={leader.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-brand-blue/0 group-hover:bg-brand-blue/10 transition-colors duration-500"></div>
              </div>
              
              <h3 className="text-xl md:text-2xl font-bold font-cherith text-brand-blue mb-1">
                {leader.name}
              </h3>
              <p className="text-brand-red font-bold uppercase tracking-widest text-[10px] md:text-xs mb-3">
                {leader.role}
              </p>
              
              <div className="flex flex-wrap justify-center gap-2 mb-3">
                {leader.qualifications.map((qual, qIdx) => (
                  <span
                    key={qIdx}
                    className="bg-gray-50 text-gray-700 text-[9px] md:text-[10px] font-bold px-2.5 py-1 rounded-full border border-gray-100 shadow-sm"
                  >
                    {qual}
                  </span>
                ))}
              </div>
              
              <p className="text-gray-500 font-medium italic text-[10px] md:text-xs">
                {leader.memberships}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
