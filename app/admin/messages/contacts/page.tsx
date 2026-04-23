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
import Link from "next/link";

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
    ...(contacts || []).map(l => ({ ...l, type: "General Inquiry", subject: "New Inquiry" })),
    ...(surveys || []).map(l => ({ ...l, type: "Survey Request", subject: `${l.survey_type} at ${l.location}` })),
    ...(quotes || []).map(l => ({ ...l, type: "Quote Request", subject: l.service_required })),
    ...(consultations || []).map(l => ({ ...l, type: "Consultation", subject: l.topic }))
  ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  return combined;
}

export default async function LeadsPage({ 
  searchParams 
}: { 
  searchParams: { type?: string } 
}) {
  const allLeads = await getLeads();
  const filterType = searchParams.type;
  
  const leads = filterType 
    ? allLeads.filter(l => l.type.toLowerCase().includes(filterType.toLowerCase())) 
    : allLeads;

  const newLeadsCount = allLeads.filter(l => l.status === 'New').length;
  
  const tabs = [
    { name: "All Messages", filter: "" },
    { name: "Survey Requests", filter: "survey" },
    { name: "Quote Requests", filter: "quote" },
    { name: "Consultations", filter: "consultation" }
  ];

  return (
    <div className="space-y-8">
      <AdminSectionHeader 
        title="CRM & Leads" 
        description="Monitor and process inbound inquiries from potential clients and partners."
        actions={
          <div className="flex gap-2">
            <AdminBadge variant="red" className="px-4 py-2 font-bold">{newLeadsCount} New Leads</AdminBadge>
          </div>
        }
      />

      {/* Tabs */}
      <div className="flex items-center gap-1 bg-white p-1.5 rounded-2xl border border-gray-100 shadow-sm w-fit">
        {tabs.map((tab) => {
          const isActive = (filterType || "") === tab.filter;
          return (
            <Link 
              key={tab.name}
              href={tab.filter ? `/admin/messages/contacts?type=${tab.filter}` : `/admin/messages/contacts`}
              className={`px-6 py-3 rounded-xl text-[11px] font-bold uppercase tracking-widest transition-all ${
                isActive ? "bg-brand-blue text-white shadow-lg shadow-brand-blue/20" : "text-gray-400 hover:text-brand-blue hover:bg-gray-50"
              }`}
            >
              {tab.name}
            </Link>
          );
        })}
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-gray-50 flex items-center justify-between">
           <div className="relative group max-w-sm w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-brand-red transition-colors" />
            <input 
              type="text" 
              placeholder="Filter by name or email..." 
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl text-xs font-bold text-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-red/10 focus:border-brand-red transition-all"
            />
          </div>
          <div className="flex items-center gap-3">
             <button className="p-3 text-gray-400 hover:text-brand-blue hover:bg-gray-50 rounded-xl transition-all border border-transparent hover:border-gray-100">
               <Filter className="w-5 h-5" />
             </button>
          </div>
        </div>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50">
              <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50">Lead Source</th>
              <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50">Contact Info</th>
              <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50">Type</th>
              <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50">Status</th>
              <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 text-[13px]">
            {leads.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-8 py-20 text-center text-gray-400 font-bold uppercase tracking-widest text-[10px]">
                  No leads found for this category
                </td>
              </tr>
            ) : (
              leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50/30 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex flex-col gap-1">
                      <span className="font-bold text-brand-blue text-[15px]">{lead.name}</span>
                      <span className="text-[11px] font-bold text-gray-400 line-clamp-1 uppercase tracking-wider">{lead.subject || lead.type}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2 text-[12px] font-bold text-gray-600">
                        <Mail className="w-3.5 h-3.5 text-brand-red" />
                        {lead.email}
                      </div>
                      <div className="flex items-center gap-2 text-[12px] font-bold text-gray-600">
                        <Phone className="w-3.5 h-3.5 text-brand-red" />
                        {lead.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-[10px] font-bold text-brand-blue bg-blue-50 px-3 py-1 rounded-lg border border-blue-100 uppercase tracking-widest">
                      {lead.type}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <AdminBadge variant={
                      lead.status === 'New' ? 'red' : 
                      lead.status === 'Processing' ? 'blue' : 
                      'green'
                    } className="font-bold">
                      {lead.status}
                    </AdminBadge>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-3 hover:bg-white rounded-xl transition-all border border-transparent hover:border-gray-100 text-gray-400 hover:text-brand-blue">
                        <Eye className="w-5 h-5" />
                      </button>
                      <button className="p-3 hover:bg-white rounded-xl transition-all border border-transparent hover:border-gray-100 text-gray-400 hover:text-emerald-600">
                        <CheckCircle2 className="w-5 h-5" />
                      </button>
                      <button className="p-3 hover:bg-white rounded-xl transition-all border border-transparent hover:border-gray-100 text-gray-400 hover:text-red-600">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div className="p-8 bg-gray-50/50 flex items-center justify-between border-t border-gray-50">
           <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
             <Calendar className="w-4 h-4" />
             Data as of {new Date().toLocaleDateString()}
           </span>
           <div className="flex gap-2">
             <button className="px-5 py-2.5 bg-white border border-gray-100 text-[11px] font-bold text-gray-400 uppercase tracking-widest rounded-xl hover:bg-gray-50 transition-all">Previous</button>
             <button className="px-5 py-2.5 bg-white border border-gray-100 text-[11px] font-bold text-brand-blue uppercase tracking-widest rounded-xl hover:bg-brand-blue hover:text-white transition-all shadow-sm">Next</button>
           </div>
        </div>
      </div>
    </div>
  );
}

