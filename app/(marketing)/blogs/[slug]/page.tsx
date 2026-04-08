import { Metadata } from "next";
import { notFound } from "next/navigation";
import { CTA } from "@/components/sections/cta";
import { BlogReadingUI } from "@/components/sections/blogs/blog-reading-ui";
import { blogsData } from "@/lib/data/blogs";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const blog = blogsData.find((b) => b.slug === resolvedParams.slug);

  if (!blog) {
    return { title: "Blog Not Found" };
  }

  return {
    title: `${blog.title} | Cherith GeoSystems`,
    description: blog.excerpt || blog.title,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const resolvedParams = await params;
  const blog = blogsData.find((b) => b.slug === resolvedParams.slug);

  if (!blog) {
    notFound();
  }

  return (
    <main className="flex flex-col min-h-screen bg-white">
      <BlogReadingUI blog={blog} />
      {/* Footer CTA */}
      <CTA />
    </main>
  );
}
