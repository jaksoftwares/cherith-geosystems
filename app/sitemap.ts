import { MetadataRoute } from 'next';
import { getBlogs } from '@/lib/api/blogs';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 
                (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://cherith.co.ke");

  const staticRoutes = [
    '',
    '/services',
    '/services/land-cadastral-surveys',
    '/services/engineering-topographical-surveys',
    '/services/gis-data-integration',
    '/services/remote-sensing',
    '/services/underground-utility-mapping',
    '/services/geoportal-development',
    '/services/project-planning',
    '/projects',
    '/about',
    '/contact',
    '/blogs',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  const blogs = await getBlogs();
  const blogRoutes = blogs.map((blog) => ({
    url: `${baseUrl}/blogs/${blog.slug}`,
    lastModified: new Date(blog.date).toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...blogRoutes];
}
