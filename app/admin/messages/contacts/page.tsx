import { AdminSectionHeader, AdminBadge } from "@/components/admin/ui";
import { 
  Search, 
  Filter, 
  Calendar, 
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { LeadsTable } from "@/components/admin/leads-table";

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
    ...(quotes || []).map(l => ({ ...l, type: "Quote Request", subject: l.service })),
    ...(consultations || []).map(l => ({ ...l, type: "Consultation", subject: l.topic }))
  ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  return combined;
}

export default async function LeadsPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ type?: string }> 
}) {
  const { type: filterType } = await searchParams;
  const allLeads = await getLeads();
  
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

      {/* Leads Table Wrapper */}
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-6">
           <div className="relative group max-w-sm w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-brand-red transition-colors" />
            <input 
              type="text" 
              placeholder="Filter by name or email..." 
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-100 rounded-2xl text-xs font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-red/10 focus:border-brand-red shadow-sm transition-all"
            />
          </div>
          <div className="flex items-center gap-3">
             <button className="p-3 bg-white text-gray-400 hover:text-brand-blue rounded-xl transition-all border border-gray-100 shadow-sm">
               <Filter className="w-5 h-5" />
             </button>
          </div>
        </div>

        <LeadsTable leads={leads as any} />

        <div className="p-8 bg-white/50 flex items-center justify-between rounded-3xl border border-gray-100">
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


