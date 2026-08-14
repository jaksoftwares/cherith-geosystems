import { BlogForm } from "@/components/admin/blog-form";
import { AdminSectionHeader, AdminBackButton } from "@/components/admin/ui";

export default function NewBlogPage() {
  return (
    <div className="space-y-8">
      <AdminSectionHeader 
        title="Create Post" 
        description="Write a new article for the blog."
        actions={<AdminBackButton href="/admin/blog" label="Back to Blog" />}
      />
      <BlogForm />
    </div>
  );
}
