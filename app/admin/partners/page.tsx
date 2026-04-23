import { AdminSectionHeader, AdminBadge } from "@/components/admin/ui";
import { Plus, Users, Building2, Trash2, Edit } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import Image from "next/image";

export default async function PartnersAdminPage() {
  const supabase = await createClient();
  
  const { data: partners } = await supabase.from("partners").select("*").order("position");
  const { data: leadership } = await supabase.from("leadership").select("*").order("position");

  return (
    <div className="space-y-12 pb-20">
      <AdminSectionHeader 
        title="Partners & Teams" 
        description="Manage company leadership profiles and strategic partner logos."
        actions={
          <button className="flex items-center gap-2 px-6 py-3 bg-brand-blue text-white rounded-2xl font-bold text-sm shadow-lg shadow-brand-blue/20 hover:bg-brand-red transition-all">
            <Plus className="w-4 h-4" />
            Add Entry
          </button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Leadership Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between px-4">
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-brand-red" />
              <h3 className="text-xl font-bold font-cherith text-brand-blue">Leadership Team</h3>
            </div>
            <AdminBadge variant="blue">{(leadership || []).length} Members</AdminBadge>
          </div>

          <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50/50">
                  <th className="px-6 py-4 text-[10px] font-semibold text-gray-500 uppercase tracking-widest border-b border-gray-100">Member</th>
                  <th className="px-6 py-4 text-[10px] font-semibold text-gray-500 uppercase tracking-widest border-b border-gray-100 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {(!leadership || leadership.length === 0) ? (
                   <tr>
                     <td colSpan={2} className="px-6 py-10 text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">No members found</td>
                   </tr>
                ) : (
                  leadership.map((member) => (
                  <tr key={member.id} className="hover:bg-gray-50/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden relative">
                          {member.image_url ? (
                            <Image src={member.image_url} alt={member.name || "Member"} fill className="object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400 font-bold">{(member.name || "M")[0]}</div>
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-brand-blue">{member.name || "Unnamed Member"}</p>
                          <p className="text-[10px] font-semibold text-gray-500 uppercase">{member.role || "No Role"}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 text-gray-400 hover:text-brand-blue transition-colors"><Edit className="w-4 h-4" /></button>
                        <button className="p-2 text-gray-400 hover:text-brand-red transition-colors"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                )))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Partners Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between px-4">
            <div className="flex items-center gap-3">
              <Building2 className="w-5 h-5 text-brand-red" />
              <h3 className="text-xl font-bold font-cherith text-brand-blue">Strategic Partners</h3>
            </div>
            <AdminBadge variant="gray">{(partners || []).length} Logos</AdminBadge>
          </div>

          <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50/50">
                  <th className="px-6 py-4 text-[10px] font-semibold text-gray-500 uppercase tracking-widest border-b border-gray-100">Partner</th>
                  <th className="px-6 py-4 text-[10px] font-semibold text-gray-500 uppercase tracking-widest border-b border-gray-100 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {(!partners || partners.length === 0) ? (
                   <tr>
                     <td colSpan={2} className="px-6 py-10 text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">No partners found</td>
                   </tr>
                ) : (
                  partners.map((partner) => (
                  <tr key={partner.id} className="hover:bg-gray-50/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="h-8 w-20 relative grayscale hover:grayscale-0 transition-all">
                          {partner.logo_url && <Image src={partner.logo_url} alt={partner.name || "Partner"} fill className="object-contain" />}
                        </div>
                        <span className="text-sm font-bold text-brand-blue">{partner.name || "Unnamed Partner"}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 text-gray-400 hover:text-brand-blue transition-colors"><Edit className="w-4 h-4" /></button>
                        <button className="p-2 text-gray-400 hover:text-brand-red transition-colors"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                )))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
