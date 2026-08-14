"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

// Automated SEO & Content Helpers
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

function calculateReadingTime(text: string): string {
  const wordsPerMinute = 200;
  const wordCount = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min read`;
}

function generateMetaDescription(text: string): string {
  // Strip markdown/html tags simply
  const plainText = text.replace(/<[^>]*>?/gm, '').replace(/[#*_\[\]()]/g, '');
  return plainText.length > 155 ? plainText.substring(0, 155).trim() + "..." : plainText.trim();
}

import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function saveBlogPost(formData: FormData, id?: string) {
  const supabase = await createClient();

  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  
  // Auto-generate missing fields
  let slug = formData.get("slug") as string;
  if (!slug) slug = generateSlug(title);
  
  let excerpt = formData.get("excerpt") as string;
  if (!excerpt) excerpt = generateMetaDescription(content);

  let meta_description = formData.get("meta_description") as string;
  if (!meta_description) meta_description = excerpt;

  let reading_time = formData.get("reading_time") as string;
  if (!reading_time) reading_time = calculateReadingTime(content);

  const category = formData.get("category") as string;
  const author = formData.get("author") as string;
  
  // Handle deferred cover image upload
  let cover_image_url = formData.get("cover_image_url") as string;
  const cover_image_file = formData.get("cover_image_file") as File;
  
  if (cover_image_file && cover_image_file.size > 0) {
    try {
      const bytes = await cover_image_file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const base64Data = `data:${cover_image_file.type};base64,${buffer.toString("base64")}`;
      
      const result: any = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload(base64Data, { folder: "cherith_blogs" }, (error, res) => {
          if (error) reject(error);
          else resolve(res);
        });
      });
      cover_image_url = result.secure_url;
    } catch (e) {
      console.error("Failed to upload cover image server-side:", e);
      return { error: "Failed to upload cover image. Please try again." };
    }
  }

  const featured = formData.get("featured") === "on";
  
  // Publishing state
  const statusStr = formData.get("status") as string; // draft, published, scheduled
  const published = statusStr === "published";
  const scheduled_for = statusStr === "scheduled" ? (formData.get("scheduled_for") as string) : null;
  
  const seo_title = formData.get("seo_title") as string || title;
  
  // Parse tags
  const tagsStr = formData.get("tags") as string;
  const tags = tagsStr ? tagsStr.split(",").map(t => t.trim()).filter(Boolean) : [];

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
    scheduled_for,
    seo_title,
    meta_description,
    tags,
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
  revalidatePath("/blogs");
  return { success: true };
}
