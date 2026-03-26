import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";

export function AboutSnapshot() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Images / Visuals */}
          <div className="relative group">
            <div className="relative w-full aspect-square md:aspect-video lg:aspect-square rounded-2xl overflow-hidden shadow-2xl z-10">
              <Image 
                src="/images/Experts-working.jpeg"
                alt="Surveyors in action"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            {/* Experience Badge */}
            <div className="absolute -bottom-6 -right-6 md:-bottom-8 md:-right-8 bg-brand-blue text-white p-6 md:p-8 rounded-xl shadow-xl z-20 hidden sm:block">
              <span className="block text-4xl md:text-5xl font-bold font-cherith mb-1 text-brand-red">19+</span>
              <span className="block text-sm md:text-base font-semibold uppercase tracking-wider">Years of<br/>Expertise</span>
            </div>
            {/* Decorative background element */}
            <div className="absolute -top-6 -left-6 w-full h-full border-2 border-gray-100 rounded-2xl z-0 rounded-tl-3xl"></div>
          </div>

          {/* Text Content */}
          <div className="flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 text-brand-red font-semibold tracking-wider uppercase text-sm">
              <span className="w-8 h-[2px] bg-brand-red block"></span>
              About Cherith GeoSystems
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-cherith text-brand-blue leading-tight">
              Transforming <span className="text-brand-red">Land Data</span> Into Powerful Insights
            </h2>
            
            <p className="text-gray-600 text-lg leading-relaxed">
              Cherith GeoSystems is a premier geospatial and land surveying firm delivering precision-driven solutions in cadastral surveying, engineering surveys, GIS, and remote sensing.
            </p>
            
            <p className="text-gray-600 leading-relaxed">
              With over 19 years of experience and leadership expertise spanning nearly four decades, we partner with governments, developers, financial institutions, and individuals to deliver reliable, data-driven results.
            </p>

            <ul className="flex flex-col gap-4 mt-4">
              {[
                "Strategic geospatial intelligence partners",
                "Converting physical land to digital intelligence",
                "Reducing risk in property & infrastructure projects"
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-3 text-gray-800 font-medium">
                  <CheckCircle2 className="w-6 h-6 text-brand-red flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-8 pt-6 border-t border-gray-100 flex items-center gap-6">
              <Link 
                href="/about"
                className="inline-flex items-center gap-2 font-bold text-brand-blue hover:text-brand-red uppercase tracking-wider transition-colors group"
              >
                Learn More About Us
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
