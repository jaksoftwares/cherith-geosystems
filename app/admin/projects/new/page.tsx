import { ProjectForm } from "@/components/admin/project-form";
import { AdminSectionHeader, AdminBackButton } from "@/components/admin/ui";

export const metadata = {
  title: "Create Project | Cherith Admin",
};

export default function NewProjectPage() {
  return (
    <div className="space-y-8">
      <AdminSectionHeader 
        title="Create Project" 
        description="Add a new project to your portfolio."
        actions={<AdminBackButton href="/admin/projects" label="Back to Projects" />}
      />
      <ProjectForm />
    </div>
  );
}
