"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function saveProject(data: any) {
  const supabase = await createClient();

  const payload = {
    title: data.title,
    slug: data.slug,
    description: data.description,
    full_description: data.full_description,
    location: data.location,
    client: data.client,
    year: data.year,
    category: data.category,
    featured: data.featured === true || data.featured === "true",
    image_url: data.image_url,
    image_public_id: data.image_public_id || null,
    gallery: data.gallery || [],
    technical_specs: data.technical_specs || [],
  };

  if (data.id) {
    const { error } = await supabase
      .from("projects")
      .update(payload)
      .eq("id", data.id);

    if (error) {
      console.error("Error updating project:", error);
      throw new Error(error.message);
    }
  } else {
    const { error } = await supabase
      .from("projects")
      .insert([payload]);

    if (error) {
      console.error("Error creating project:", error);
      throw new Error(error.message);
    }
  }

  revalidatePath("/admin/projects");
  revalidatePath("/projects");
  revalidatePath(`/projects/${data.slug}`);
  
  redirect("/admin/projects");
}

export async function deleteProject(id: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("projects")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting project:", error);
    throw new Error("Failed to delete project");
  }

  revalidatePath("/admin/projects");
  revalidatePath("/projects");
}
