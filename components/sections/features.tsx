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
    <section className="py-16 md:py-24 bg-brand-blue text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/images/satellitegis-visual%20concept.jpg')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-12">
          {features.map((feature, idx) => (
            <div key={idx} className="flex flex-col gap-4 text-center items-center justify-center p-8 border border-white/10 rounded-3xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:-translate-y-2 group">
              <div className="w-16 h-16 rounded-2xl bg-brand-red flex items-center justify-center mb-2 shadow-xl shadow-brand-red/30 -rotate-3 group-hover:rotate-0 transition-transform">
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold font-cherith">{feature.title}</h3>
              <p className="text-gray-300 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
