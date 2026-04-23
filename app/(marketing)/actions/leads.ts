"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

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

    revalidatePath("/admin/messages");
    return { success: true };
  } catch (err) {
    console.error("Lead submission exception:", err);
    return { error: "A system error occurred." };
  }
}
