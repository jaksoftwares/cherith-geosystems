import { createClient } from "@/lib/supabase/server";

export interface TechnicalSpec {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  full_description: string;
  location: string;
  client: string;
  year: string;
  completion_date?: string;
  image_url: string;
  image_public_id?: string;
  gallery?: { url: string; public_id?: string }[];
  technical_specs?: TechnicalSpec[];
  category: string;
  featured: boolean;
  created_at?: string;
  updated_at?: string;
}

export async function getProjects(): Promise<Project[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching projects:", error);
    return [];
  }

  return data as Project[];
}

export async function getProjectById(id: string): Promise<Project | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching project by ID:", error);
    return null;
  }

  return data as Project;
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("Error fetching project by slug:", error);
    return null;
  }

  return data as Project;
}
