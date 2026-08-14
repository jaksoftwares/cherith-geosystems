
import { getProjectBySlug } from "@/lib/api/projects";
import { optimizeImage } from "@/lib/utils";
import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  User, 
  CheckCircle2, 
  ChevronRight,
  Database,
  Layers,
  Activity,
  Maximize
} from "lucide-react";
import { CTA } from "@/components/sections/cta";

type Props = {
  params: Promise<{ slug: string }>;
};

// Generate static params for ISR and SEO without invoking Next.js cookies()
export async function generateStaticParams() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  
  const { data } = await supabase.from("projects").select("slug");
  
  return (data || []).map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const project = await getProjectBySlug(resolvedParams.slug);
  
  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} | Cherith GeoSystems`,
    description: project.description,
    openGraph: {
      title: `${project.title} | Cherith GeoSystems`,
      description: project.description,
      images: [project.image_url],
    }
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const project = await getProjectBySlug(resolvedParams.slug);

  if (!project) {
    notFound();
  }

  // Icons for technical specs
  const specIcons = [Database, Layers, Maximize, Activity];

  return (
    <main className="flex flex-col min-h-screen bg-white">
      {/* Dynamic Project Hero */}
      <section className="relative h-[60vh] md:h-[75vh] min-h-[500px] w-full overflow-hidden">
        <Image 
          src={project.image_url.startsWith('http') ? optimizeImage(project.image_url, 1920) : project.image_url} 
          alt={project.title} 
          fill 
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-blue via-brand-blue/40 to-black/20"></div>
        
        <div className="absolute inset-0 flex flex-col justify-end pb-16 md:pb-24">
          <div className="container mx-auto px-4 md:px-8">
            <Link 
              href="/projects" 
              className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-8 group bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Portfolio
            </Link>
            
            <div className="max-w-4xl">
              <span className="bg-brand-red text-white text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] px-4 py-2 rounded mb-6 inline-block">
                {project.category}
              </span>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-cherith text-white leading-[1.1] mb-6">
                {project.title}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-white/80 text-sm md:text-base font-medium">
                <span className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-brand-red" />
                  {project.location}
                </span>
                <span className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-brand-red" />
                  {project.year}
                </span>
                <span className="flex items-center gap-2">
                  <User className="w-5 h-5 text-brand-red" />
                  {project.client}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Content */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24">
            
            {/* Main Content */}
            <div className="lg:col-span-12 max-w-5xl">
              <div className="mb-12">
                <h2 className="text-3xl md:text-4xl font-bold font-cherith text-brand-blue mb-8">Project Overview</h2>
                <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed font-sans">
                  <p className="text-xl md:text-2xl font-serif text-brand-blue/80 italic mb-8 border-l-4 border-brand-red pl-8">
                    {project.description}
                  </p>
                  <div className="space-y-6">
                    {project.full_description?.split('\n\n').map((paragraph, i) => (
                      <p key={i}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              </div>

              {/* Technical Specifications Grid */}
              <div className="mt-20">
                <h3 className="text-2xl font-bold font-cherith text-brand-blue mb-10 flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-brand-red" />
                  Technical Specifications
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {project.technical_specs?.map((spec, idx) => {
                    const Icon = specIcons[idx % specIcons.length];
                    return (
                      <div key={idx} className="bg-zinc-50 border border-gray-100 p-8 rounded-3xl group hover:bg-brand-blue transition-all duration-500">
                        <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                          <Icon className="w-6 h-6 text-brand-red" />
                        </div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 group-hover:text-white/60">
                          {spec.label}
                        </p>
                        <p className="text-lg font-bold text-brand-blue font-cherith group-hover:text-white">
                          {spec.value}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              {/* Project Gallery */}
              {project.gallery && project.gallery.length > 0 && (
                <div className="mt-20 pt-10 border-t border-gray-100">
                  <h3 className="text-2xl font-bold font-cherith text-brand-blue mb-10 flex items-center gap-3">
                    <Maximize className="w-6 h-6 text-brand-red" />
                    Project Gallery
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {project.gallery.map((img, idx) => (
                      <div key={idx} className="relative aspect-[4/3] rounded-3xl overflow-hidden group shadow-md hover:shadow-xl transition-shadow duration-500">
                        <Image
                          src={img.url.startsWith('http') ? optimizeImage(img.url, 800) : img.url}
                          alt={`${project.title} - Gallery Image ${idx + 1}`}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                          <p className="text-white font-bold text-sm tracking-widest uppercase">View Image</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </section>

      {/* Navigation for other projects */}
      <section className="py-20 bg-zinc-50 border-y border-gray-100">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <h2 className="text-2xl md:text-3xl font-bold font-cherith text-brand-blue">View More Projects</h2>
            <Link 
              href="/projects"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white border border-gray-200 text-brand-blue font-bold rounded-2xl hover:bg-brand-blue hover:text-white transition-all shadow-sm active:scale-95 group"
            >
              Back to Portfolio
              <ArrowLeft className="w-5 h-5 rotate-180 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      <CTA />
    </main>
  );
}
