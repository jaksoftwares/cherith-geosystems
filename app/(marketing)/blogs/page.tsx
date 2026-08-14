import { Metadata } from "next";
import { BlogsHero } from "@/components/sections/blogs/blogs-hero";
import { BlogsGrid } from "@/components/sections/blogs/blogs-grid";
import { CTA } from "@/components/sections/cta";
import { getBlogs } from "@/lib/api/blogs";

export const metadata: Metadata = {
  title: "Blogs & Knowledge Hub | Cherith GeoSystems",
  description: "Stay ahead with the latest perspectives on advanced geospatial analysis, cadastral surveying, GIS technologies, and structural mapping.",
};

export default async function BlogsPage() {
  const blogs = await getBlogs();

  return (
    <main className="flex flex-col min-h-screen bg-gray-50">
      <BlogsHero />
      <BlogsGrid blogs={blogs} />
      <CTA />
    </main>
  );
}
