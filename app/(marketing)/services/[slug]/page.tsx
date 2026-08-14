import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { CTA } from "@/components/sections/cta";
import { getServiceBySlug, getServices } from "@/lib/api/services";
import { optimizeImage } from "@/lib/utils";

import { createClient } from "@supabase/supabase-js";

type Props = {
  params: Promise<{ slug: string }>;
};

// Generate static params for ISR and SEO without invoking Next.js cookies()
export async function generateStaticParams() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  
  const { data } = await supabase.from("services").select("slug");
  
  return (data || []).map((service) => ({
    slug: service.slug,
  }));
}


export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const service = await getServiceBySlug(resolvedParams.slug);
  
  if (!service) return { title: "Service Not Found" };

  // Advanced automated metadata 
  return {
    title: `${service.title} in Kenya | Cherith GeoSystems`,
    description: service.short_description,
    openGraph: {
      title: `${service.title} | Cherith GeoSystems`,
      description: service.short_description,
      images: [service.image_url],
    }
  };
}

export default async function ServiceDetailsPage({ params }: Props) {
  const resolvedParams = await params;
  const service = await getServiceBySlug(resolvedParams.slug);

  if (!service) {
    notFound();
  }

  return (
    <main className="flex flex-col min-h-screen">
      {/* Dynamic Hero */}
      <section className="relative min-h-[45vh] flex items-center justify-center pt-24 pb-12 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={service.image_url.startsWith('http') ? optimizeImage(service.image_url, 1920) : service.image_url}
            alt={service.title}
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-brand-blue/90 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-4 md:px-8 relative z-10 text-center flex flex-col items-center mt-6">
          <Link 
            href="/services" 
            className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-5 uppercase tracking-wider text-xs font-semibold transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            All Services
          </Link>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold font-cherith text-white leading-tight mb-4 max-w-4xl">
            {service.title}
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl font-light">
            {service.short_description}
          </p>
        </div>
      </section>

      {/* Media-rich Sub-services Grid Layout */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col items-center mb-10 text-center">
            <span className="h-0.5 w-10 bg-brand-red inline-block mb-3"></span>
            <h2 className="text-2xl md:text-3xl font-extrabold font-cherith text-brand-blue">
              Functional Offerings
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
            {service.sub_services?.map((sub, idx) => (
              <div 
                key={idx} 
                className="group relative h-[300px] md:h-[350px] rounded-2xl overflow-hidden shadow-lg border border-gray-200"
              >
                <div className="absolute inset-0 z-0">
                  <Image
                    src={sub.image.startsWith('http') ? optimizeImage(sub.image, 600) : sub.image}
                    alt={sub.name}
                    fill
                    className="object-cover group-hover:scale-110 group-hover:rotate-1 transition-all duration-700 ease-in-out"
                  />
                  {/* Harsh modern gradient overlay to keep text extremely readable */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 transition-opacity duration-500 group-hover:opacity-90"></div>
                </div>

                {/* Minimal Text Container */}
                <div className="absolute inset-0 z-10 p-6 md:p-8 flex flex-col justify-end">
                  <h3 className="text-xl font-bold font-cherith text-white leading-tight group-hover:text-brand-red transition-colors duration-300">
                    {sub.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTA />
    </main>
  );
}
