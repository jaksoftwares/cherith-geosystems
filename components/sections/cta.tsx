import Link from "next/link";
import { ArrowRight, MessageSquare } from "lucide-react";

export function CTA() {
  return (
    <section className="py-24 bg-brand-blue relative overflow-hidden">
      {/* Background Graphic elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
         <div className="absolute -top-40 -right-40 w-96 h-96 border-[40px] border-brand-red rounded-full opacity-50 blur-3xl"></div>
         <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] border-[60px] border-white rounded-full opacity-50 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10 text-center text-white">
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-8">
          <div className="inline-flex items-center gap-2 text-brand-red font-semibold tracking-wider uppercase text-sm bg-black/20 px-4 py-2 rounded-full backdrop-blur-sm">
            Ready to get started?
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-cherith leading-tight">
            Need Accurate Survey Data You Can Trust?
          </h2>
          
          <p className="text-xl text-gray-300 max-w-2xl leading-relaxed">
            Partner with Cherith GeoSystems for precision, reliability, and expert insights. Transform your physical land data into confident mapping intelligence today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 mt-6 w-full sm:w-auto">
            <Link 
              href="/contact"
              className="px-8 py-4 rounded-xl bg-brand-red hover:bg-red-700 text-white font-bold text-lg shadow-xl shadow-brand-red/30 transition-all flex items-center justify-center gap-2 group w-full sm:w-auto"
            >
              Get a Quote
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link 
              href="/contact"
              className="px-8 py-4 rounded-xl bg-white/10 hover:bg-white hover:text-brand-blue border border-white/20 text-white font-bold text-lg backdrop-blur-md transition-all flex items-center justify-center gap-2 group w-full sm:w-auto"
            >
              Contact Us
              <MessageSquare className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
