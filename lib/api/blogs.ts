import { supabase } from "@/lib/supabase";

export interface SupabaseBlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  cover_image_url: string;
  author: string;
  reading_time: string;
  featured: boolean;
  published: boolean;
  published_at: string;
  seo_title?: string;
  meta_description?: string;
  tags?: string[];
  scheduled_for?: string;
}

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  author: string;
  date: string;
  readingTime: string;
  featured: boolean;
  content: string;
  seo_title?: string;
  meta_description?: string;
  tags?: string[];
};

export async function getBlogs(): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("published", true)
    .lte("published_at", new Date().toISOString())
    .order("published_at", { ascending: false });

  if (error) {
    console.error("Error fetching blogs from Supabase", error);
    return [];
  }

  return (data as SupabaseBlogPost[]).map((blog) => ({
    id: blog.id,
    slug: blog.slug,
    title: blog.title,
    excerpt: blog.excerpt,
    category: blog.category || "General",
    image: blog.cover_image_url || "/images/placeholder.jpg",
    author: blog.author || "Cherith Team",
    date: new Date(blog.published_at || new Date()).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
    readingTime: blog.reading_time || "5 min read",
    featured: blog.featured || false,
    content: blog.content || "",
    seo_title: blog.seo_title,
    meta_description: blog.meta_description,
    tags: blog.tags,
  }));
}

export async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .lte("published_at", new Date().toISOString())
    .single();

  if (error || !data) {
    return null;
  }

  const blog = data as SupabaseBlogPost;

  return {
    id: blog.id,
    slug: blog.slug,
    title: blog.title,
    excerpt: blog.excerpt,
    category: blog.category || "General",
    image: blog.cover_image_url || "/images/placeholder.jpg",
    author: blog.author || "Cherith Team",
    date: new Date(blog.published_at || new Date()).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
    readingTime: blog.reading_time || "5 min read",
    featured: blog.featured || false,
    content: blog.content || "",
    seo_title: blog.seo_title,
    meta_description: blog.meta_description,
    tags: blog.tags,
  };
}
