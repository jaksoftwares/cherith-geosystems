import { supabase } from "@/lib/supabase";

export interface SupabaseBlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  image: string;
  author: string;
  reading_time: string;
  featured: boolean;
  published_at: string;
}

export type BlogPost = {
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
};

export async function getBlogs(): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .lte("published_at", new Date().toISOString())
    .order("published_at", { ascending: false });

  if (error) {
    console.error("Error fetching blogs from Supabase", error);
    return [];
  }

  return (data as SupabaseBlogPost[]).map((blog) => ({
    slug: blog.slug,
    title: blog.title,
    excerpt: blog.excerpt,
    category: blog.category || "General",
    image: blog.image || "/images/placeholder.jpg",
    author: blog.author || "Cherith Team",
    date: new Date(blog.published_at).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
    readingTime: blog.reading_time || "5 min read",
    featured: blog.featured || false,
    content: blog.content || "",
  }));
}

export async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("slug", slug)
    .lte("published_at", new Date().toISOString())
    .single();

  if (error || !data) {
    return null;
  }

  const blog = data as SupabaseBlogPost;

  return {
    slug: blog.slug,
    title: blog.title,
    excerpt: blog.excerpt,
    category: blog.category || "General",
    image: blog.image || "/images/placeholder.jpg",
    author: blog.author || "Cherith Team",
    date: new Date(blog.published_at).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
    readingTime: blog.reading_time || "5 min read",
    featured: blog.featured || false,
    content: blog.content || "",
  };
}
