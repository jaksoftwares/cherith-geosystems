"use server";

import { createClient } from "@/lib/supabase/server";

export type NotificationType = "General Inquiry" | "Survey Request" | "Quote Request" | "Consultation";

export interface Notification {
  id: string;
  title: string;
  type: NotificationType;
  created_at: string;
}

export async function getUnreadNotifications(): Promise<Notification[]> {
  const supabase = await createClient();

  // Fetch unread (status === 'New') items from all 4 tables
  const [
    { data: contacts },
    { data: surveys },
    { data: quotes },
    { data: consultations }
  ] = await Promise.all([
    supabase.from("contacts").select("id, name, created_at").eq("status", "New").limit(10),
    supabase.from("survey_requests").select("id, name, created_at").eq("status", "New").limit(10),
    supabase.from("quote_requests").select("id, name, created_at").eq("status", "New").limit(10),
    supabase.from("consultations").select("id, name, created_at").eq("status", "New").limit(10)
  ]);

  const combined: Notification[] = [
    ...(contacts || []).map(l => ({ id: l.id, title: `New Inquiry from ${l.name}`, type: "General Inquiry" as NotificationType, created_at: l.created_at })),
    ...(surveys || []).map(l => ({ id: l.id, title: `New Survey Request from ${l.name}`, type: "Survey Request" as NotificationType, created_at: l.created_at })),
    ...(quotes || []).map(l => ({ id: l.id, title: `New Quote Request from ${l.name}`, type: "Quote Request" as NotificationType, created_at: l.created_at })),
    ...(consultations || []).map(l => ({ id: l.id, title: `New Consultation from ${l.name}`, type: "Consultation" as NotificationType, created_at: l.created_at }))
  ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  return combined.slice(0, 10);
}
