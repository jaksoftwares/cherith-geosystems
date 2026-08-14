import { getProjectBySlug } from "@/lib/api/projects";
import { ProjectForm } from "@/components/admin/project-form";
import { AdminSectionHeader, AdminBackButton } from "@/components/admin/ui";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Edit Project | Cherith Admin",
};

export default async function EditProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const project = await getProjectBySlug(resolvedParams.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <AdminSectionHeader 
        title="Edit Project" 
        description={`Editing details for ${project.title}`}
        actions={<AdminBackButton href="/admin/projects" label="Back to Projects" />}
      />
      <ProjectForm project={project} />
    </div>
  );
}
