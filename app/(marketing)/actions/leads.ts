"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function submitLead(type: "inquiry" | "survey" | "quote" | "consultation", formData: FormData) {
  const supabase = await createClient();

  const data: any = {
    full_name: formData.get("name") as string,
    email: formData.get("email") as string,
    phone: formData.get("phone") as string,
    message: formData.get("message") as string,
  };

  try {
    let error;

    if (type === "inquiry") {
      const { error: err } = await supabase.from("contacts").insert([{
        ...data,
        subject: formData.get("subject") as string,
      }]);
      error = err;
    } else if (type === "survey") {
      const { error: err } = await supabase.from("survey_requests").insert([{
        ...data,
        location: formData.get("location") as string,
        survey_type: formData.get("survey_type") as string,
      }]);
      error = err;
    } else if (type === "quote") {
      const { error: err } = await supabase.from("quote_requests").insert([{
        ...data,
        service_required: formData.get("service") as string,
        budget_estimate: formData.get("budget") as string,
      }]);
      error = err;
    } else if (type === "consultation") {
      const { error: err } = await supabase.from("consultations").insert([{
        ...data,
        preferred_date: formData.get("date") as string,
        topic: formData.get("message") as string,
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
