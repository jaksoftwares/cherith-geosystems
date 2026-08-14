"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function saveService(formData: FormData) {
  const supabase = await createClient();

  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const category_id = formData.get("category_id") as string;
  const short_description = formData.get("short_description") as string;
  const content = formData.get("content") as string;
  const image_url = formData.get("image_url") as string;
  const position = parseInt(formData.get("position") as string) || 0;
  
  // Parse the JSON array of sub-services from the hidden input field
  const subServicesRaw = formData.get("sub_services") as string;
  let sub_services = [];
  try {
    if (subServicesRaw) {
      sub_services = JSON.parse(subServicesRaw);
    }
  } catch (e) {
    console.error("Failed to parse sub_services JSON", e);
    return { success: false, error: "Invalid sub-services data format" };
  }

  if (!title || !slug || !category_id) {
    return { success: false, error: "Title, slug, and category are required fields." };
  }

  const payload = {
    title,
    slug,
    category_id,
    short_description,
    content,
    image_url,
    sub_services,
    position,
  };

  if (id) {
    // Update existing service
    const { error } = await supabase
      .from("services")
      .update(payload)
      .eq("id", id);

    if (error) {
      console.error("Error updating service:", error);
      return { success: false, error: error.message };
    }
  } else {
    // Insert new service
    const { error } = await supabase
      .from("services")
      .insert([payload]);

    if (error) {
      console.error("Error creating service:", error);
      return { success: false, error: error.message };
    }
  }

  revalidatePath("/admin/services");
  revalidatePath("/services");
  revalidatePath(`/services/${slug}`);

  return { success: true };
}

export async function deleteService(id: string) {
  const supabase = await createClient();
  
  const { error } = await supabase
    .from("services")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting service:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/admin/services");
  revalidatePath("/services");

  return { success: true };
}
