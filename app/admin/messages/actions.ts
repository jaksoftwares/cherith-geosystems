"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

function getTableName(type: string): string {
  switch (type) {
    case "General Inquiry": return "contacts";
    case "Survey Request": return "survey_requests";
    case "Quote Request": return "quote_requests";
    case "Consultation": return "consultations";
    default: return "contacts";
  }
}

export async function deleteLead(id: string, type: string) {
  const supabase = await createClient();
  const table = getTableName(type);

  const { error } = await supabase.from(table).delete().eq("id", id);
  if (error) {
    console.error(`Failed to delete lead from ${table}:`, error);
    return { error: error.message };
  }

  revalidatePath("/admin/messages/contacts");
  return { success: true };
}

export async function updateLeadStatus(id: string, type: string, newStatus: string) {
  const supabase = await createClient();
  const table = getTableName(type);

  const { error } = await supabase.from(table).update({ status: newStatus }).eq("id", id);
  if (error) {
    console.error(`Failed to update lead status in ${table}:`, error);
    return { error: error.message };
  }

  revalidatePath("/admin/messages/contacts");
  return { success: true };
}

export async function replyToLead(id: string, email: string, message: string, type: string) {
  try {
    // 1. Send the email via Resend
    await resend.emails.send({
      from: "Cherith GeoSystems <onboarding@resend.dev>", // Replace with verified domain
      to: email,
      subject: `Response to your Cherith GeoSystems ${type}`,
      html: `
        <div style="font-family: sans-serif; color: #333;">
          <p>${message.replace(/\n/g, '<br />')}</p>
          <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;" />
          <p style="font-size: 12px; color: #999;">
            <strong>Cherith GeoSystems</strong><br/>
            Olympic House, Nairobi, Kenya<br/>
            info@cherith.co.ke
          </p>
        </div>
      `,
    });

    // 2. Automatically mark the lead as 'Resolved'
    return await updateLeadStatus(id, type, "Resolved");
  } catch (error) {
    console.error("Failed to send reply email:", error);
    return { error: "Failed to send email. Please check your Resend API configuration." };
  }
}
