import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";

export function AboutSnapshot() {
  return (
    <section className="py-12 md:py-16 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          
          {/* Images / Visuals */}
          <div className="relative group px-4 sm:px-0">
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl z-10 border border-gray-100">
              <Image 
                src="/images/Experts-working.jpeg"
                alt="Surveyors in action"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            {/* Experience Badge - Simplified for mobile */}
            <div className="absolute -bottom-3 -right-1 sm:-bottom-4 sm:-right-4 md:-bottom-6 md:-right-6 bg-brand-blue text-white p-3 sm:p-5 md:p-6 rounded-xl shadow-2xl z-20 border-b-4 border-brand-red">
              <span className="block text-2xl sm:text-3xl md:text-4xl font-bold font-cherith mb-0.5 text-brand-red">19+</span>
              <span className="block text-[8px] sm:text-[10px] md:text-xs font-semibold uppercase tracking-wider leading-tight">Years Of<br/>Expertise</span>
            </div>
            {/* Decorative background element */}
            <div className="absolute -top-4 -left-2 sm:-left-4 w-full h-full border-2 border-brand-red/10 rounded-2xl z-0 pointer-events-none"></div>
          </div>

          {/* Text Content */}
          <div className="flex flex-col gap-4 mt-6 lg:mt-0">
            <div className="inline-flex items-center gap-2 text-brand-red font-semibold tracking-wider uppercase text-xs">
              <span className="w-6 h-[2px] bg-brand-red block"></span>
              About Cherith GeoSystems
            </div>
            
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold font-cherith text-brand-blue leading-tight">
              Transforming <span className="text-brand-red">Land Data</span> Into Powerful Insights
            </h2>
            
            <div className="space-y-3">
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                Cherith GeoSystems is a premier geospatial and land surveying firm delivering precision-driven solutions in cadastral surveying, engineering surveys, GIS, and remote sensing.
              </p>
              
              <p className="text-gray-600 text-sm md:text-base leading-relaxed opacity-90">
                With over 19 years of operational excellence, we partner with governments, developers, and financial institutions to deliver reliable, data-driven results that mitigate risks in property and infrastructure development.
              </p>
            </div>

            <ul className="flex flex-col gap-4 mt-2">
              {[
                " geospatial intelligence partners",
                "Converting physical land to digital intelligence",
                "Reducing risk in property & infrastructure projects"
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-4 text-gray-800 font-medium text-sm md:text-base">
                  <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-brand-red flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 pt-8 border-t border-gray-100">
              <Link 
                href="/about"
                className="inline-flex items-center gap-3 font-bold text-brand-blue hover:text-brand-red uppercase tracking-widest text-xs md:text-sm transition-all group"
              >
                Learn More About Us
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
