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
    <section className="py-24 bg-brand-blue text-white relative">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {features.map((feature, idx) => (
            <div key={idx} className="flex flex-col gap-4 text-center items-center justify-center p-6 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors duration-300">
              <div className="w-16 h-16 rounded-full bg-brand-red flex items-center justify-center mb-2 shadow-lg shadow-brand-red/30">
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
