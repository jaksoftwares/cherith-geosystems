import { AdminSectionHeader, AdminBadge } from "@/components/admin/ui";
import { Plus, HardHat, Package, Laptop, Trash2, Edit } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export default async function AssetsAdminPage() {
  const supabase = await createClient();
  const { data: assets } = await supabase.from("assets_inventory").select("*").order("created_at", { ascending: false });

  return (
    <div className="space-y-8 pb-20">
      <AdminSectionHeader 
        title="Assets Inventory" 
        description="Track company equipment, software licenses, and technical surveying tools."
        actions={
          <button className="flex items-center gap-2 px-6 py-3 bg-brand-blue text-white rounded-2xl font-bold text-sm shadow-lg shadow-brand-blue/20 hover:bg-brand-red transition-all">
            <Plus className="w-4 h-4" />
            Add Asset
          </button>
        }
      />

      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50/50">
              <th className="px-8 py-5 text-[10px] font-semibold text-gray-500 uppercase tracking-widest border-b border-gray-100">Asset Name</th>
              <th className="px-8 py-5 text-[10px] font-semibold text-gray-500 uppercase tracking-widest border-b border-gray-100">Type</th>
              <th className="px-8 py-5 text-[10px] font-semibold text-gray-500 uppercase tracking-widest border-b border-gray-100">Description</th>
              <th className="px-8 py-5 text-[10px] font-semibold text-gray-500 uppercase tracking-widest border-b border-gray-100 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 text-[14px]">
            {(assets || []).length === 0 ? (
              <tr>
                <td colSpan={4} className="px-8 py-20 text-center text-gray-400 font-bold uppercase tracking-widest text-[10px]">
                  No assets currently in inventory
                </td>
              </tr>
            ) : (
              assets.map((asset) => (
                <tr key={asset.id} className="hover:bg-gray-50/30 transition-colors">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${asset.type === 'equipment' ? 'bg-amber-50 text-amber-600' : 'bg-blue-50 text-blue-600'}`}>
                        {asset.type === 'equipment' ? <HardHat className="w-5 h-5" /> : <Laptop className="w-5 h-5" />}
                      </div>
                      <span className="font-bold text-brand-blue">{asset.name}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <AdminBadge variant={asset.type === 'equipment' ? 'orange' : 'blue'} className="capitalize">
                      {asset.type}
                    </AdminBadge>
                  </td>
                  <td className="px-8 py-6">
                    <p className="text-gray-600 max-w-md line-clamp-1">{asset.description || "No description provided."}</p>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-3 text-gray-400 hover:text-brand-blue transition-colors rounded-xl hover:bg-white border border-transparent hover:border-gray-100 shadow-sm"><Edit className="w-4 h-4" /></button>
                      <button className="p-3 text-gray-400 hover:text-brand-red transition-colors rounded-xl hover:bg-white border border-transparent hover:border-gray-100 shadow-sm"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
