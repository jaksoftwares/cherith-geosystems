import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { blogsData } from "@/lib/data/blogs";

export function LatestUpdates() {
  // Get the latest 3 activities/updates/blogs to show on home page
  const updates = blogsData
    .filter(post => ["Field Activity", "Industry Event", "Workshops"].includes(post.category))
    .slice(0, 3);

  return (
    <section className="py-16 md:py-24 bg-zinc-50 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-brand-blue/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-8">
          <div className="max-w-2xl text-center md:text-left">
            <div className="inline-flex items-center gap-2 text-brand-red font-semibold tracking-wider uppercase text-sm mb-4">
              <span className="w-8 h-[2px] bg-brand-red block"></span>
              Stay Informed
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-cherith text-brand-blue leading-[1.2]">
              Latest Updates & Activities
            </h2>
            <p className="mt-6 text-gray-600 text-base md:text-lg">
              Explore our recent events, field activities, and the groundbreaking projects currently shaping the future of geospatial engineering.
            </p>
          </div>
          <Link 
            href="/blogs"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-blue text-white hover:bg-brand-blue/90 rounded-full font-bold shadow-xl shadow-brand-blue/20 transition-all active:scale-95 group sm:w-auto w-full"
          >
            All Updates
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {updates.map((update, idx) => (
            <div 
              key={idx} 
              className="group bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col h-full"
            >
              {/* Image Container */}
              <div className="relative h-60 sm:h-72 md:h-64 overflow-hidden">
                <Image 
                  src={update.image}
                  alt={update.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 z-20">
                  <div className="bg-brand-red/90 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full backdrop-blur-md shadow-lg">
                    {update.category}
                  </div>
                </div>
              </div>
              
              {/* Content Container */}
              <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-4 text-[10px] md:text-xs font-medium text-gray-400 mb-4">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {update.date}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold font-cherith text-brand-blue mb-4 leading-tight group-hover:text-brand-red transition-colors min-h-[56px] flex items-center">
                    {update.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-6">
                    {update.excerpt}
                  </p>
                </div>
                
                <Link 
                  href={`/blogs/${update.slug}`}
                  className="text-brand-blue font-bold text-sm inline-flex items-center gap-2 hover:gap-3 transition-all underline decoration-brand-blue/20 decoration-2 underline-offset-4"
                >
                  Read More
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
