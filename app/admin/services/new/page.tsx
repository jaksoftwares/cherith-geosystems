import { getCategories } from "@/lib/api/services";
import { ServiceForm } from "@/components/admin/service-form";
import { AdminSectionHeader, AdminBackButton } from "@/components/admin/ui";

export const metadata = {
  title: "Create Service | Cherith Admin",
};

export default async function NewServicePage() {
  const categories = await getCategories();

  return (
    <div className="space-y-8">
      <AdminSectionHeader 
        title="Create Service" 
        description="Add a new service offering to your portfolio."
        actions={<AdminBackButton href="/admin/services" label="Back to Services" />}
      />
      <ServiceForm categories={categories} />
    </div>
  );
}
