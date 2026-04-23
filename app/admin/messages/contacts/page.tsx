import { AdminSectionHeader, AdminBadge } from "@/components/admin/ui";
import { 
  Search, 
  Filter, 
  Mail, 
  Phone, 
  Calendar, 
  CheckCircle2,
  Trash2,
  Eye
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";

async function getLeads() {
  const supabase = await createClient();
  
  // Fetch from all 4 tables
  const [
    { data: contacts },
    { data: surveys },
    { data: quotes },
    { data: consultations }
  ] = await Promise.all([
    supabase.from("contacts").select("*").order("created_at", { ascending: false }),
    supabase.from("survey_requests").select("*").order("created_at", { ascending: false }),
    supabase.from("quote_requests").select("*").order("created_at", { ascending: false }),
    supabase.from("consultations").select("*").order("created_at", { ascending: false })
  ]);

  // Combine and normalize
  const combined = [
    ...(contacts || []).map(l => ({ ...l, type: "General Inquiry", subject: l.subject })),
    ...(surveys || []).map(l => ({ ...l, type: "Survey Request", subject: `${l.survey_type} at ${l.location}` })),
    ...(quotes || []).map(l => ({ ...l, type: "Quote Request", subject: l.service_required })),
    ...(consultations || []).map(l => ({ ...l, type: "Consultation", subject: l.topic }))
  ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  return combined;
}

export default async function LeadsPage() {
  const leads = await getLeads();
  const newLeadsCount = leads.filter(l => l.status === 'New').length;
  return (
    <div className="space-y-8">
      <AdminSectionHeader 
        title="CRM & Leads" 
        description="Monitor and process inbound inquiries from potential clients and partners."
        actions={
          <div className="flex gap-2">
            <AdminBadge variant="red" className="px-4 py-2">{newLeadsCount} New Leads</AdminBadge>
          </div>
        }
      />

      {/* Tabs */}
      <div className="flex items-center gap-1 bg-white p-1 rounded-2xl border border-gray-100 shadow-sm w-fit">
        {["All Messages", "Survey Requests", "Quote Requests", "Consultations"].map((tab, idx) => (
          <button 
            key={idx}
            className={`px-6 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${
              idx === 0 ? "bg-brand-blue text-white shadow-lg shadow-brand-blue/20" : "text-gray-400 hover:text-brand-blue hover:bg-gray-50"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-gray-50 flex items-center justify-between">
           <div className="relative group max-w-sm w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-brand-red transition-colors" />
            <input 
              type="text" 
              placeholder="Filter by name or email..." 
              className="w-full pl-12 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-brand-red/10 focus:border-brand-red transition-all"
            />
          </div>
          <div className="flex items-center gap-3">
             <button className="p-2.5 text-gray-400 hover:text-brand-blue hover:bg-gray-50 rounded-xl transition-all border border-transparent hover:border-gray-100">
               <Filter className="w-4 h-4" />
             </button>
          </div>
        </div>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50">
              <th className="px-8 py-4 text-[9px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50">Lead Source</th>
              <th className="px-8 py-4 text-[9px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50">Contact Info</th>
              <th className="px-8 py-4 text-[9px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50">Type</th>
              <th className="px-8 py-4 text-[9px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50">Status</th>
              <th className="px-8 py-4 text-[9px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 text-sm">
            {leads.map((lead) => (
              <tr key={lead.id} className="hover:bg-gray-50/30 transition-colors group">
                <td className="px-8 py-6">
                  <div className="flex flex-col gap-1">
                    <span className="font-bold text-brand-blue">{lead.full_name}</span>
                    <span className="text-[10px] font-medium text-gray-400 line-clamp-1">{lead.subject}</span>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2 text-[11px] font-medium text-gray-600">
                      <Mail className="w-3 h-3 text-brand-red" />
                      {lead.email}
                    </div>
                    <div className="flex items-center gap-2 text-[11px] font-medium text-gray-600">
                      <Phone className="w-3 h-3 text-brand-red" />
                      {lead.phone}
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <span className="text-[10px] font-bold text-brand-blue bg-zinc-50 px-2.5 py-1 rounded-lg border border-gray-100">
                    {lead.type}
                  </span>
                </td>
                <td className="px-8 py-6">
                  <AdminBadge variant={
                    lead.status === 'New' ? 'red' : 
                    lead.status === 'Processing' ? 'blue' : 
                    'green'
                  }>
                    {lead.status}
                  </AdminBadge>
                </td>
                <td className="px-8 py-6 text-right">
                   <div className="flex items-center justify-end gap-2">
                    <button className="p-2.5 hover:bg-white rounded-xl transition-all border border-transparent hover:border-gray-100 text-gray-400 hover:text-brand-blue">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2.5 hover:bg-white rounded-xl transition-all border border-transparent hover:border-gray-100 text-gray-400 hover:text-emerald-600">
                      <CheckCircle2 className="w-4 h-4" />
                    </button>
                    <button className="p-2.5 hover:bg-white rounded-xl transition-all border border-transparent hover:border-gray-100 text-gray-400 hover:text-red-600">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="p-8 bg-gray-50/50 flex items-center justify-between border-t border-gray-50">
           <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
             <Calendar className="w-3.5 h-3.5" />
             Data as of {new Date().toLocaleDateString()}
           </span>
           <div className="flex gap-2">
             <button className="px-4 py-2 bg-white border border-gray-100 text-[10px] font-bold text-gray-400 uppercase tracking-widest rounded-xl hover:bg-gray-50 transition-all">Previous</button>
             <button className="px-4 py-2 bg-white border border-gray-100 text-[10px] font-bold text-brand-blue uppercase tracking-widest rounded-xl hover:bg-brand-blue hover:text-white transition-all shadow-sm">Next</button>
           </div>
        </div>
      </div>
    </div>
  );
}
