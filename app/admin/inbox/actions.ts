"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const fromEmail = process.env.NEXT_PUBLIC_SITE_EMAIL || "info@cherith.co.ke";

export type MessageType = "General Inquiry" | "Survey Request" | "Quote Request" | "Consultation";

export interface MessageReply {
  id: string;
  message_id: string;
  message_type: string;
  reply_text: string;
  sent_to: string;
  sent_at: string;
}

function getTableName(type: MessageType): string {
  switch (type) {
    case "General Inquiry": return "contacts";
    case "Survey Request": return "survey_requests";
    case "Quote Request": return "quote_requests";
    case "Consultation": return "consultations";
  }
}

export async function deleteLead(id: string, type: MessageType) {
  const supabase = await createClient();
  const table = getTableName(type);

  const { error } = await supabase.from(table).delete().eq("id", id);
  if (error) {
    console.error(`Failed to delete lead from ${table}:`, error);
    return { error: error.message };
  }

  revalidatePath("/admin/inbox");
  return { success: true };
}

export async function updateLeadStatus(id: string, type: MessageType, newStatus: string) {
  const supabase = await createClient();
  const table = getTableName(type);

  const { error } = await supabase.from(table).update({ status: newStatus }).eq("id", id);
  if (error) {
    console.error(`Failed to update lead status in ${table}:`, error);
    return { error: error.message };
  }

  revalidatePath("/admin/inbox");
  return { success: true };
}

export async function getMessageReplies(messageId: string): Promise<{ replies: MessageReply[] | null; error?: string }> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("message_replies")
    .select("*")
    .eq("message_id", messageId)
    .order("sent_at", { ascending: true });

  if (error) {
    console.error("Failed to fetch replies:", error);
    return { replies: null, error: error.message };
  }

  return { replies: data };
}

export async function replyToLead(id: string, email: string, message: string, type: MessageType) {
  const supabase = await createClient();

  try {
    // 1. Send the email via Resend
    await resend.emails.send({
      from: `Cherith GeoSystems <${fromEmail}>`,
      to: email,
      subject: `Response to your Cherith GeoSystems ${type}`,
      html: `
        <div style="font-family: 'Helvetica Neue', sans-serif; color: #1a1a2e; max-width: 560px; margin: 0 auto;">
          <div style="background: #002147; padding: 24px 32px; border-radius: 12px 12px 0 0;">
            <h2 style="color: #fff; font-size: 20px; margin: 0;">Cherith GeoSystems</h2>
            <p style="color: rgba(255,255,255,0.6); font-size: 12px; margin: 4px 0 0 0; text-transform: uppercase; letter-spacing: 2px;">Response to your inquiry</p>
          </div>
          <div style="padding: 32px; background: #f9fafb; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
            <p style="font-size: 15px; line-height: 1.8; color: #374151;">${message.replace(/\n/g, '<br />')}</p>
            <hr style="margin: 28px 0; border: none; border-top: 1px solid #e5e7eb;" />
            <p style="font-size: 11px; color: #9ca3af;">
              <strong style="color: #6b7280;">Cherith GeoSystems</strong><br/>
              Olympic House, Nairobi, Kenya<br/>
              ${fromEmail}
            </p>
          </div>
        </div>
      `,
    });

    // 2. Persist the reply to the database
    const { error: insertError } = await supabase
      .from("message_replies")
      .insert({
        message_id: id,
        message_type: type,
        reply_text: message,
        sent_to: email,
      });

    if (insertError) {
      console.error("Reply sent but failed to persist to DB:", insertError);
      // Don't fail the whole action - email was sent. Just log the db error.
    }

    // 3. Mark the lead as resolved
    return await updateLeadStatus(id, type, "Resolved");
  } catch (error) {
    console.error("Failed to send reply email:", error);
    return { error: "Failed to send email. Please check your Resend API configuration." };
  }
}
