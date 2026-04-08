"use client";

import { projectsData } from "@/lib/data/projects";
import { notFound, useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
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
import { motion } from "framer-motion";
import { CTA } from "@/components/sections/cta";

export default function ProjectDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  
  const project = projectsData.find((p) => p.slug === slug);

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
          src={project.image} 
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
                    {project.fullDescription.split('\n\n').map((paragraph, i) => (
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
                  {project.technicalSpecs?.map((spec, idx) => {
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
