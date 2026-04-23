import { AdminSectionHeader, AdminBadge } from "@/components/admin/ui";
import { Plus, Globe, MapPin, Trash2, Edit } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export default async function RegionalAdminPage() {
  const supabase = await createClient();
  const { data: regions } = await supabase.from("regional_experience").select("*").order("position");

  return (
    <div className="space-y-8 pb-20">
      <AdminSectionHeader 
        title="Regional Reach" 
        description="Manage the company's international project footprint and local expertise."
        actions={
          <button className="flex items-center gap-2 px-6 py-3 bg-brand-blue text-white rounded-2xl font-bold text-sm shadow-lg shadow-brand-blue/20 hover:bg-brand-red transition-all">
            <Plus className="w-4 h-4" />
            Add Country
          </button>
        }
      />

      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50/50">
              <th className="px-8 py-5 text-[10px] font-semibold text-gray-500 uppercase tracking-widest border-b border-gray-100">Country</th>
              <th className="px-8 py-5 text-[10px] font-semibold text-gray-500 uppercase tracking-widest border-b border-gray-100">Projects</th>
              <th className="px-8 py-5 text-[10px] font-semibold text-gray-500 uppercase tracking-widest border-b border-gray-100">Expertise</th>
              <th className="px-8 py-5 text-[10px] font-semibold text-gray-500 uppercase tracking-widest border-b border-gray-100 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {(regions || []).map((region) => (
              <tr key={region.id} className="hover:bg-gray-50/30 transition-colors">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-brand-blue/5 flex items-center justify-center text-brand-blue">
                      <Globe className="w-4 h-4" />
                    </div>
                    <span className="text-[15px] font-bold text-brand-blue">{region.country}</span>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <AdminBadge variant="gray">{region.projects_count} Projects</AdminBadge>
                </td>
                <td className="px-8 py-6">
                  <div className="flex flex-wrap gap-2">
                    {region.expertise?.map((skill: string) => (
                      <span key={skill} className="px-2 py-0.5 bg-zinc-100 text-[10px] font-semibold text-gray-600 rounded-md uppercase tracking-wider">
                        {skill}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-8 py-6 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-3 text-gray-400 hover:text-brand-blue transition-colors rounded-xl hover:bg-white border border-transparent hover:border-gray-100 shadow-sm"><Edit className="w-4 h-4" /></button>
                    <button className="p-3 text-gray-400 hover:text-brand-red transition-colors rounded-xl hover:bg-white border border-transparent hover:border-gray-100 shadow-sm"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
