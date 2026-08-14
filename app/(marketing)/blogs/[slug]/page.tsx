import { Metadata } from "next";
import { notFound } from "next/navigation";
import { CTA } from "@/components/sections/cta";
import { BlogReadingUI } from "@/components/sections/blogs/blog-reading-ui";
import { getBlogBySlug } from "@/lib/api/blogs";
import { JsonLd } from "@/components/json-ld";
import type { Article, WithContext } from "schema-dts";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const blog = await getBlogBySlug(resolvedParams.slug);

  if (!blog) {
    return { title: "Blog Not Found" };
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 
                process.env.NEXT_PUBLIC_APP_URL ||
                "https://cherith.co.ke";

  return {
    title: `${blog.title} | Cherith GeoSystems`,
    description: blog.excerpt || blog.title,
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      images: [{ url: blog.image.startsWith('http') ? blog.image : `${baseUrl}${blog.image}` }],
      type: "article",
    },
    alternates: {
      canonical: `/blogs/${blog.slug}`,
    }
  };
}

export default async function BlogPostPage({ params }: Props) {
  const resolvedParams = await params;
  const blog = await getBlogBySlug(resolvedParams.slug);

  if (!blog) {
    notFound();
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 
                process.env.NEXT_PUBLIC_APP_URL ||
                "https://cherith.co.ke";

  const articleSchema: WithContext<Article> = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: blog.title,
    description: blog.excerpt,
    image: blog.image.startsWith('http') ? blog.image : `${baseUrl}${blog.image}`,
    author: {
      "@type": "Person",
      name: blog.author,
    },
    publisher: {
      "@type": "Organization",
      name: "Cherith GeoSystems",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/icon.png`,
      },
    },
    datePublished: new Date(blog.date).toISOString(),
  };

  return (
    <main className="flex flex-col min-h-screen bg-white">
      <JsonLd schema={articleSchema} />
      <BlogReadingUI blog={blog} />
      {/* Footer CTA */}
      <CTA />
    </main>
  );
}
