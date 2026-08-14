import { createClient } from "@/lib/supabase/server";
import { BlogForm } from "@/components/admin/blog-form";
import { AdminSectionHeader, AdminBackButton } from "@/components/admin/ui";
import { notFound } from "next/navigation";

export default async function EditBlogPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createClient();
  
  const { data: post, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !post) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <AdminSectionHeader 
        title="Edit Post" 
        description={`Editing details for ${post.title}`}
        actions={<AdminBackButton href="/admin/blog" label="Back to Blog" />}
      />
      <BlogForm post={post} />
    </div>
  );
}
