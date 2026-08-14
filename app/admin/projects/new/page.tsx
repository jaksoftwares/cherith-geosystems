import { ProjectForm } from "@/components/admin/project-form";

export const metadata = {
  title: "Create Project | Cherith Admin",
};

export default function NewProjectPage() {
  return (
    <div className="space-y-8">
      <ProjectForm />
    </div>
  );
}
