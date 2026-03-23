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

  // Inject content for the blog since blogsData initially only has the excerpt for the grid
  const fullContentMap: Record<string, string> = {
    "accurate-land-surveys-property-investment": "When significant real estate capital shifts hands, assuming boundary assumptions is a massive liability. Cadastral surveys definitively establish borders. In East Africa, rapid urbanization constantly pushes infrastructure boundaries against existing real estate limits. A meticulously precise survey prevents legal overlaps, defines zoning limitations rigorously, and secures the raw physical value of uncompromised development tracts.\n\nAt Cherith GeoSystems, our methodology eliminates these ambiguities. Every corner mapped is backed by legally defensible data.",
    "role-of-gis-in-infrastructure": "Geographic Information Systems (GIS) go far beyond just cartography—they are absolute lifelines for modern architectural and structural planning. Using multi-layered spatial data, ministries and private contractors can visualize environmental constraints, structural histories, and hidden utilities prior to ground-breaking.\n\nA unified geospatial strategy drastically mitigates unforeseen engineering costs. The future of African infrastructure lies directly in the capacity to interact with land data well before cement is poured.",
    "understanding-boundary-disputes": "Boundary disputes are expensive, emotionally exhaustive, and extremely detrimental to ongoing development schedules. Over 40% of civil property clashes originate from outdated or poorly executed survey maps inherited from preceding generations.\n\nThe initial step to resolution is forensic geospatial evaluation. Modern RTK alignment combined with historical map digitization can definitively reconstruct exact, uncontestable boundaries. Do not rely on physical markers—trust the unchangeable geographic coordinates.",
    "drone-mapping-transforming-surveying": "The introduction of autonomous aerial technology armed with high-fidelity LiDAR and photogrammetry has completely shifted the engineering landscape. A survey that previously took a 5-man crew three weeks through treacherous terrain can now be completed autonomously in under 48 hours.\n\nDrone mapping is not merely an alternative; it is the new standard for topographic rendering, delivering thousands of measurable points per square meter as opposed to localized traditional stakes."
  };

  const blogWithContent = {
    ...blog,
    content: fullContentMap[blog.slug] || blog.excerpt
  };

  return (
    <main className="flex flex-col min-h-screen bg-white">
      <BlogReadingUI blog={blogWithContent} />
      {/* Footer CTA */}
      <CTA />
    </main>
  );
}
