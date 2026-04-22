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
    <section className="py-12 md:py-16 bg-zinc-50 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-brand-blue/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-10 gap-6">
          <div className="max-w-2xl text-center md:text-left">
            <div className="inline-flex items-center gap-2 text-brand-red font-semibold tracking-wider uppercase text-xs mb-3">
              <span className="w-6 h-[2px] bg-brand-red block"></span>
              Stay Informed
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold font-cherith text-brand-blue leading-[1.2]">
              Latest Updates & Activities
            </h2>
            <p className="mt-4 text-gray-600 text-sm md:text-base">
              Explore our recent events, field activities, and the groundbreaking projects currently shaping the future of geospatial engineering.
            </p>
          </div>
          <Link 
            href="/blogs"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-blue text-white hover:bg-brand-blue/90 rounded-full font-bold shadow-lg shadow-brand-blue/20 transition-all active:scale-95 group sm:w-auto w-full text-sm"
          >
            All Updates
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {updates.map((update, idx) => (
            <div 
              key={idx} 
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-100 flex flex-col h-full"
            >
              {/* Image Container */}
              <div className="relative h-48 sm:h-56 md:h-52 overflow-hidden">
                <Image 
                  src={update.image}
                  alt={update.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-3 left-3 z-20">
                  <div className="bg-brand-red/90 text-white text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full backdrop-blur-md shadow-md">
                    {update.category}
                  </div>
                </div>
              </div>
              
              {/* Content Container */}
              <div className="p-5 md:p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-[9px] md:text-xs font-medium text-gray-400 mb-3">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3 h-3" />
                      {update.date}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold font-cherith text-brand-blue mb-3 leading-tight group-hover:text-brand-red transition-colors min-h-[48px] flex items-center">
                    {update.title}
                  </h3>
                  <p className="text-gray-600 text-xs md:text-sm leading-relaxed line-clamp-3 mb-4">
                    {update.excerpt}
                  </p>
                </div>
                
                <Link 
                  href={`/blogs/${update.slug}`}
                  className="text-brand-blue font-bold text-xs inline-flex items-center gap-2 hover:gap-3 transition-all underline decoration-brand-blue/20 decoration-2 underline-offset-4"
                >
                  Read More
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
