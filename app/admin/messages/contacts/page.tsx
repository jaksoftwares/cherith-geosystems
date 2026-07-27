import { AdminSectionHeader, AdminBadge } from "@/components/admin/ui";
import { 
  Search, 
  Filter, 
  Calendar, 
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { InboxView } from "@/components/admin/inbox-view";

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

export default async function LeadsPage() {
  const allLeads = await getLeads();
  const newLeadsCount = allLeads.filter(l => l.status === 'New').length;
  
  return (
    <div className="space-y-6">
      <AdminSectionHeader 
        title="Inbox" 
        description="Monitor and process inbound inquiries from potential clients and partners."
        actions={
          <div className="flex gap-2">
            <AdminBadge variant="red" className="px-4 py-2 font-bold">{newLeadsCount} Unread</AdminBadge>
          </div>
        }
      />

      {/* Leads Inbox View */}
      <InboxView leads={allLeads as any} />
    </div>
  );
}


