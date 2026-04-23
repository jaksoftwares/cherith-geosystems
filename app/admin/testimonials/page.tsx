import { AdminSectionHeader, AdminBadge } from "@/components/admin/ui";
import { Plus, Quote, Star, Trash2, Edit } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export default async function TestimonialsAdminPage() {
  const supabase = await createClient();
  const { data: testimonials } = await supabase.from("testimonials").select("*").order("position");

  return (
    <div className="space-y-8 pb-20">
      <AdminSectionHeader 
        title="Testimonials" 
        description="Manage client feedback and success stories displayed on the public site."
        actions={
          <button className="flex items-center gap-2 px-6 py-3 bg-brand-blue text-white rounded-2xl font-bold text-sm shadow-lg shadow-brand-blue/20 hover:bg-brand-red transition-all">
            <Plus className="w-4 h-4" />
            Add Testimonial
          </button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {(!testimonials || testimonials.length === 0) ? (
          <div className="col-span-2 py-20 text-center bg-white rounded-[2.5rem] border border-gray-100 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            No testimonials found
          </div>
        ) : (
          testimonials.map((t) => (
          <div key={t.id} className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 group relative">
            <div className="absolute top-8 right-8 flex items-center gap-2">
              <button className="p-2 text-gray-400 hover:text-brand-blue transition-colors"><Edit className="w-4 h-4" /></button>
              <button className="p-2 text-gray-400 hover:text-brand-red transition-colors"><Trash2 className="w-4 h-4" /></button>
            </div>

            <div className="flex items-center gap-1 text-amber-400 mb-6">
              {[...Array(t.rating || 5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>

            <Quote className="w-10 h-10 text-brand-red/10 mb-4" />
            
            <p className="text-gray-600 italic text-sm leading-relaxed mb-8">
              "{t.content || "No content provided."}"
            </p>

            <div className="flex items-center gap-4 border-t border-gray-50 pt-6">
              <div className="w-12 h-12 rounded-2xl bg-brand-blue/5 text-brand-blue flex items-center justify-center font-bold text-lg">
                {(t.name || "C")[0]}
              </div>
              <div>
                <p className="font-bold text-brand-blue">{t.name || "Client"}</p>
                <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest">{t.role || "Partner"}</p>
              </div>
            </div>
          </div>
        )))}
      </div>
    </div>
  );
}
