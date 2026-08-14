import { AdminSectionHeader, AdminBadge } from "@/components/admin/ui";
import { createClient } from "@/lib/supabase/server";
import { InboxView } from "@/components/admin/inbox-view";
import { NormalizedMessage } from "./types";

async function getLeads(): Promise<NormalizedMessage[]> {
  const supabase = await createClient();
  
  // Fetch from all 4 tables with a strict limit to prevent memory/performance issues
  const [
    { data: contacts },
    { data: surveys },
    { data: quotes },
    { data: consultations }
  ] = await Promise.all([
    supabase.from("contacts").select("*").order("created_at", { ascending: false }).limit(100),
    supabase.from("survey_requests").select("*").order("created_at", { ascending: false }).limit(100),
    supabase.from("quote_requests").select("*").order("created_at", { ascending: false }).limit(100),
    supabase.from("consultations").select("*").order("created_at", { ascending: false }).limit(100)
  ]);

  // Combine and rigidly normalize to the NormalizedMessage type
  const combined: NormalizedMessage[] = [
    ...(contacts || []).map(l => ({ 
      id: l.id, name: l.name, email: l.email, phone: l.phone, status: l.status, created_at: l.created_at,
      type: "General Inquiry" as const, 
      message: l.message 
    })),
    ...(surveys || []).map(l => ({ 
      id: l.id, name: l.name, email: l.email, phone: l.phone, status: l.status, created_at: l.created_at,
      type: "Survey Request" as const, 
      location: l.location, survey_type: l.survey_type, details: l.details
    })),
    ...(quotes || []).map(l => ({ 
      id: l.id, name: l.name, email: l.email, phone: l.phone, status: l.status, created_at: l.created_at,
      type: "Quote Request" as const, 
      service: l.service, details: l.details 
    })),
    ...(consultations || []).map(l => ({ 
      id: l.id, name: l.name, email: l.email, phone: l.phone, status: l.status, created_at: l.created_at,
      type: "Consultation" as const, 
      topic: l.topic, description: l.description 
    }))
  ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  return combined.slice(0, 300); // Return up to 300 total newest leads across all types
}

export default async function InboxPage() {
  const allLeads = await getLeads();
  const newLeadsCount = allLeads.filter(l => l.status === 'New').length;
  
  return (
    <div className="space-y-6 h-[calc(100vh-140px)] flex flex-col">
      <AdminSectionHeader 
        title="Inbox" 
        description="Monitor and process inbound inquiries from potential clients and partners."
        actions={
          <div className="flex gap-2">
            {newLeadsCount > 0 ? (
              <AdminBadge variant="red" className="px-4 py-2 font-bold animate-pulse">{newLeadsCount} Unread</AdminBadge>
            ) : (
              <AdminBadge variant="gray" className="px-4 py-2 font-bold text-gray-500">Inbox Zero</AdminBadge>
            )}
          </div>
        }
      />

      {/* Leads Inbox View */}
      <InboxView leads={allLeads} />
    </div>
  );
}
