import { ShieldCheck, Crosshair, Users, Map as MapIcon } from "lucide-react";

export function Features() {
  const features = [
    {
      title: "Proven Expertise",
      description: "Over 19 years of delivering high-quality geospatial solutions across East Africa.",
      icon: ShieldCheck
    },
    {
      title: "Advanced Technology",
      description: "We utilize industry-leading tools including RTK GPS, Total Stations, and GIS platforms.",
      icon: Crosshair
    },
    {
      title: "Trusted Partners",
      description: "We’ve worked with organizations such as UN agencies, IGAD, and leading private sector clients.",
      icon: Users
    },
    {
      title: "Nationwide Coverage",
      description: "Serving clients across all 47 counties in Kenya with rapid deployment.",
      icon: MapIcon
    }
  ];

  return (
    <section className="py-12 md:py-16 bg-brand-blue text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/images/satellitegis-visual%20concept.jpg')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {features.map((feature, idx) => (
            <div key={idx} className="flex flex-col gap-3 text-center items-center justify-center p-6 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 group">
              <div className="w-12 h-12 rounded-xl bg-brand-red flex items-center justify-center mb-1 shadow-lg shadow-brand-red/20 -rotate-3 group-hover:rotate-0 transition-transform">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold font-cherith">{feature.title}</h3>
              <p className="text-gray-300 text-xs md:text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
