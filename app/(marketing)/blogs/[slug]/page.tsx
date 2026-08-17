import { Metadata } from "next";
import { notFound } from "next/navigation";
import { CTA } from "@/components/sections/cta";
import { BlogReadingUI } from "@/components/sections/blogs/blog-reading-ui";
import { getBlogBySlug } from "@/lib/api/blogs";
import { optimizeImage } from "@/lib/utils";
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

  const ogImageUrl = `${baseUrl}/api/og-image?slug=${blog.slug}`;

  return {
    title: blog.seo_title || `${blog.title} | Cherith GeoSystems`,
    description: blog.meta_description || blog.excerpt || blog.title,
    openGraph: {
      title: blog.seo_title || blog.title,
      description: blog.meta_description || blog.excerpt,
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: blog.title }],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: blog.seo_title || blog.title,
      description: blog.meta_description || blog.excerpt,
      images: [ogImageUrl],
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
    image: `${baseUrl}/api/og-image?slug=${blog.slug}`,
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
