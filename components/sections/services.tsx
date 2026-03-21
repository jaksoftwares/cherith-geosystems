import { 
  MapPin, 
  Map as MapIcon, 
  Globe2, 
  Mountain, 
  Wifi, 
  Laptop 
} from "lucide-react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Services() {
  const services = [
    {
      title: "Land & Cadastral Surveys",
      description: "Accurate boundary identification, subdivision, and land verification services you can trust.",
      icon: MapPin,
      color: "text-brand-red"
    },
    {
      title: "Engineering & Topo Surveys",
      description: "Precise mapping and site data for construction and infrastructure development.",
      icon: Mountain,
      color: "text-brand-blue"
    },
    {
      title: "GIS & Spatial Analysis",
      description: "Transforming geospatial data into powerful decision-support tools for strategic planning.",
      icon: Globe2,
      color: "text-emerald-500"
    },
    {
      title: "Remote Sensing & Env. Monitoring",
      description: "Advanced satellite and drone-based environmental insights for large-scale management.",
      icon: Wifi,
      color: "text-amber-500"
    },
    {
      title: "Underground Utility Mapping",
      description: "Locate hidden infrastructure safely and accurately using Ground Penetrating Radar (GPR).",
      icon: MapIcon,
      color: "text-purple-500"
    },
    {
      title: "Geoportal & Web GIS Dev",
      description: "Custom digital mapping platforms for real-time geospatial access and visualization.",
      icon: Laptop,
      color: "text-blue-500"
    }
  ];

  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden">
      {/* Decorative hex pattern background overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\\'60\\' height=\\'103.923\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cpath stroke=\\'%23000\\' stroke-width=\\'1\\' fill=\\'none\\' d=\\'M30 103.923L0 86.603V51.962L30 34.641l30 17.32v34.641L30 103.923zM0 17.32L30 0l30 17.32v34.64L30 69.282 0 51.96V17.32z\\'%3E%3C/path%3E%3C/svg%3E')", backgroundSize: "40px 69px" }}></div>
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center gap-2 text-brand-red font-semibold tracking-wider uppercase text-sm mb-4">
            <span className="w-8 h-[2px] bg-brand-red block"></span>
            Our Core Services
            <span className="w-8 h-[2px] bg-brand-red block"></span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-cherith text-brand-blue">
            Comprehensive Mapping Solutions
          </h2>
          <p className="mt-6 text-gray-600 text-lg">
            We offer a full suite of professional surveying and geospatial services designed to mitigate risks and support intelligent property planning.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <div 
              key={idx}
              className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl hover:shadow-brand-blue/5 border border-gray-100 transition-all duration-300 relative overflow-hidden"
            >
              {/* Subtle hover background sweep */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="relative z-10">
                <div className={`w-14 h-14 rounded-xl bg-gray-50 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-white transition-all duration-300 shadow-sm ${service.color}`}>
                  <service.icon className="w-7 h-7" />
                </div>
                
                <h3 className="text-xl font-bold font-cherith text-brand-blue mb-4 group-hover:text-brand-red transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed mb-6 h-20">
                  {service.description}
                </p>
                
                <Link 
                  href="/services" 
                  className="inline-flex items-center gap-2 text-sm font-semibold text-brand-blue group-hover:text-brand-red transition-colors"
                >
                  Learn More 
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
