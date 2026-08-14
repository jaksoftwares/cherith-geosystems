import { createClient } from "@/lib/supabase/server";

export type SubService = {
  name: string;
  image: string;
};

export type ServiceCategory = {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon_name: string;
  position: number;
};

export type Service = {
  id: string;
  category_id: string;
  title: string;
  slug: string;
  short_description: string;
  content: string;
  sub_services: SubService[];
  image_url: string;
  featured: boolean;
  position: number;
  created_at: string;
  service_categories?: ServiceCategory;
};

export async function getCategories(): Promise<ServiceCategory[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("service_categories")
    .select("*")
    .order("position", { ascending: true });

  if (error) {
    console.error("Error fetching service categories:", error);
    return [];
  }

  return data as ServiceCategory[];
}

export async function getServices(): Promise<Service[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("services")
    .select(`
      *,
      service_categories (*)
    `)
    .order("position", { ascending: true });

  if (error) {
    console.error("Error fetching services:", error);
    return [];
  }

  return data as Service[];
}

export async function getServiceById(id: string): Promise<Service | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("services")
    .select(`
      *,
      service_categories (*)
    `)
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching service by id:", error);
    return null;
  }

  return data as Service;
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("services")
    .select(`
      *,
      service_categories (*)
    `)
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("Error fetching service by slug:", error);
    return null;
  }

  return data as Service;
}
