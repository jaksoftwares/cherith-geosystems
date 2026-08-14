import { NextRequest, NextResponse } from "next/server";
import { getBlogBySlug } from "@/lib/api/blogs";
import { optimizeImage } from "@/lib/utils";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");

    if (!slug) {
      return new NextResponse("Missing slug parameter", { status: 400 });
    }

    const blog = await getBlogBySlug(slug);

    if (!blog || !blog.image) {
      return new NextResponse("Blog or image not found", { status: 404 });
    }

    // Optimize the image for OG (1200px wide)
    const imageUrl = blog.image.startsWith('http') ? optimizeImage(blog.image, 1200) : blog.image;
    
    // If it's a local image, we can just redirect to it or fetch it locally
    if (!imageUrl.startsWith('http')) {
       // Just redirect to the local asset, which masks nothing but it's already local
       const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_APP_URL || "https://cherith.co.ke";
       return NextResponse.redirect(`${baseUrl}${imageUrl}`);
    }

    // Proxy the remote image (Cloudinary/Unsplash) to mask the provider URL
    const imageResponse = await fetch(imageUrl);
    
    if (!imageResponse.ok) {
      return new NextResponse("Failed to fetch image from provider", { status: 500 });
    }

    const buffer = await imageResponse.arrayBuffer();
    const headers = new Headers();
    
    // Forward the content type (e.g., image/webp, image/jpeg)
    const contentType = imageResponse.headers.get("content-type") || "image/jpeg";
    headers.set("Content-Type", contentType);
    
    // Cache the proxied image aggressively (1 year on CDN, 1 hour on browser)
    headers.set("Cache-Control", "public, max-age=3600, s-maxage=31536000, immutable");

    return new NextResponse(buffer, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error("Error generating OG image:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
