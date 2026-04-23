"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function saveBlogPost(formData: FormData, id?: string) {
  const supabase = await createClient();

  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string || title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
  const excerpt = formData.get("excerpt") as string;
  const content = formData.get("content") as string;
  const category = formData.get("category") as string;
  const author = formData.get("author") as string;
  const reading_time = formData.get("reading_time") as string;
  const cover_image_url = formData.get("cover_image_url") as string;
  const featured = formData.get("featured") === "on";
  const published = formData.get("published") === "on";

  const postData = {
    title,
    slug,
    excerpt,
    content,
    category,
    author,
    reading_time,
    cover_image_url,
    featured,
    published,
    published_at: published ? new Date().toISOString() : null,
    updated_at: new Date().toISOString(),
  };

  let error;
  if (id) {
    const { error: err } = await supabase
      .from("blog_posts")
      .update(postData)
      .eq("id", id);
    error = err;
  } else {
    const { error: err } = await supabase
      .from("blog_posts")
      .insert([postData]);
    error = err;
  }

  if (error) {
    console.error("Error saving blog post:", error);
    return { error: error.message };
  }

  revalidatePath("/admin/blog");
  revalidatePath("/blogs");
  return { success: true };
}

export async function deleteBlogPost(id: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("blog_posts")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting blog post:", error);
    return { error: error.message };
  }

  revalidatePath("/admin/blog");
  revalidatePath("/blogs");
  return { success: true };
}

export async function togglePublishStatus(id: string, currentStatus: boolean) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("blog_posts")
    .update({ 
      published: !currentStatus,
      published_at: !currentStatus ? new Date().toISOString() : null 
    })
    .eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/blog");
  return { success: true };
}
