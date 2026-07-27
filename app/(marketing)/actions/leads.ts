"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const CONTACT_EMAIL = process.env.CONTACT_EMAIL || "info@cherith.co.ke";

export async function submitLead(type: "inquiry" | "survey" | "quote" | "consultation", formData: FormData) {
  const supabase = await createClient();

  // Map fields carefully to match each table's schema in Supabase
  try {
    let error;

    if (type === "inquiry") {
      const { error: err } = await supabase.from("contacts").insert([{
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        phone: formData.get("phone") as string,
        message: formData.get("message") as string,
        // 'subject' is not in the contacts table, so we omit it or could prepend to message
      }]);
      error = err;
    } else if (type === "survey") {
      const { error: err } = await supabase.from("survey_requests").insert([{
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        phone: formData.get("phone") as string,
        location: formData.get("location") as string,
        survey_type: formData.get("survey_type") as string,
        description: formData.get("message") as string,
      }]);
      error = err;
    } else if (type === "quote") {
      const { error: err } = await supabase.from("quote_requests").insert([{
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        phone: formData.get("phone") as string,
        service: formData.get("service") as string,
        budget: formData.get("budget") as string,
        details: formData.get("message") as string,
      }]);
      error = err;
    } else if (type === "consultation") {
      const { error: err } = await supabase.from("consultations").insert([{
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        phone: formData.get("phone") as string,
        preferred_date: formData.get("date") as string || null,
        message: formData.get("message") as string,
      }]);
      error = err;
    }

    if (error) {
      console.error(`Error submitting ${type}:`, error);
      return { error: "Failed to submit request. Please try again later." };
    }

    // Attempt to send email notification
    try {
      await resend.emails.send({
        from: "Cherith Website <onboarding@resend.dev>", // Replace with a verified domain later
        to: CONTACT_EMAIL,
        subject: `New Website Lead: ${type.toUpperCase()}`,
        html: `
          <h2>New Website Inquiry Received</h2>
          <p><strong>Type:</strong> ${type}</p>
          <p><strong>Name:</strong> ${formData.get("name")}</p>
          <p><strong>Email:</strong> ${formData.get("email")}</p>
          <p><strong>Phone:</strong> ${formData.get("phone")}</p>
          ${formData.get("location") ? `<p><strong>Location:</strong> ${formData.get("location")}</p>` : ""}
          ${formData.get("survey_type") ? `<p><strong>Survey Type:</strong> ${formData.get("survey_type")}</p>` : ""}
          ${formData.get("service") ? `<p><strong>Service:</strong> ${formData.get("service")}</p>` : ""}
          ${formData.get("budget") ? `<p><strong>Budget:</strong> ${formData.get("budget")}</p>` : ""}
          ${formData.get("date") ? `<p><strong>Preferred Date:</strong> ${formData.get("date")}</p>` : ""}
          <p><strong>Message / Details:</strong></p>
          <blockquote style="background: #f9fafb; padding: 15px; border-left: 4px solid #ef4444; margin-top: 10px;">
            ${(formData.get("message") as string)?.replace(/\n/g, '<br />')}
          </blockquote>
        `,
      });
    } catch (emailError) {
      console.error("Failed to send email notification (but lead was saved):", emailError);
      // We do not fail the request if the email fails, as the lead is already in the database
    }

    revalidatePath("/admin/messages");
    return { success: true };
  } catch (err) {
    console.error("Lead submission exception:", err);
    return { error: "A system error occurred." };
  }
}
