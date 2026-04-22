import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Services() {
  const services = [
    {
      title: "Land & Cadastral Surveys",
      description: "Accurate boundary identification, subdivision, and land verification services you can trust.",
      image: "/images/services/land-cadastral/boundary-verification.png"
    },
    {
      title: "Engineering & Topo Surveys",
      description: "Precise mapping and site data for construction and infrastructure development.",
      image: "/images/services/engineering%26topographical/engineering%26topographicalsurvey.png"
    },
    {
      title: "GIS & Spatial Analysis",
      description: "Transforming geospatial data into powerful decision-support tools for strategic planning.",
      image: "/images/services/gis%26spatial-analysis/interactive-gis-dashboard.png"
    },
    {
      title: "Remote Sensing & Env. Monitoring",
      description: "Advanced satellite and drone-based environmental insights for large-scale management.",
      image: "/images/enviromentalmonitoring.png"
    },
    {
      title: "Underground Utility Mapping",
      description: "Locate hidden infrastructure safely and accurately using Ground Penetrating Radar (GPR).",
      image: "/images/services/underground-utility-gpr/undeground-detection-hero.png"
    },
    {
      title: "Geoportal & Web GIS Dev",
      description: "Custom digital mapping platforms for real-time geospatial access and visualization.",
      image: "/images/gis-web-portal.jpg"
    }
  ];

  return (
    <section className="py-12 md:py-16 bg-gray-50 relative overflow-hidden">
      {/* Decorative hex pattern background overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\\'60\\' height=\\'103.923\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cpath stroke=\\'%23000\\' stroke-width=\\'1\\' fill=\\'none\\' d=\\'M30 103.923L0 86.603V51.962L30 34.641l30 17.32v34.641L30 103.923zM0 17.32L30 0l30 17.32v34.64L30 69.282 0 51.96V17.32z\\'%3E%3C/path%3E%3C/svg%3E')", backgroundSize: "40px 69px" }}></div>
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
          <div className="inline-flex items-center justify-center gap-2 text-brand-red font-semibold tracking-wider uppercase text-xs mb-3">
            <span className="w-6 h-[2px] bg-brand-red block"></span>
            Our Core Services
            <span className="w-6 h-[2px] bg-brand-red block"></span>
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold font-cherith text-brand-blue leading-[1.2]">
            Our Mapping Solutions
          </h2>
          <p className="mt-4 text-gray-600 text-sm md:text-base lg:px-12">
            We offer a full suite of professional surveying and geospatial services designed to mitigate risks and support intelligent property planning.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {services.map((service, idx) => (
            <div 
              key={idx}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-brand-blue/5 border border-gray-100 transition-all duration-300 relative flex flex-col"
            >
              {/* Image Container */}
              <div className="relative h-40 sm:h-48 md:h-44 w-full overflow-hidden">
                <Image 
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-brand-blue/20 group-hover:bg-transparent transition-colors duration-500"></div>
              </div>
              
              <div className="p-5 md:p-6 relative z-10 flex-1 flex flex-col">
                <h3 className="text-lg font-bold font-cherith text-brand-blue mb-3 group-hover:text-brand-red transition-colors min-h-[48px] flex items-center">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed mb-4 text-xs md:text-sm">
                  {service.description}
                </p>
                
                <div className="mt-auto pt-2">
                  <Link 
                    href="/services" 
                    className="inline-flex items-center gap-2 text-xs font-bold text-brand-blue group-hover:text-brand-red transition-all"
                  >
                    Learn More 
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-2 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
