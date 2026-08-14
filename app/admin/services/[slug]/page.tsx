import { getCategories, getServiceBySlug } from "@/lib/api/services";
import { ServiceForm } from "@/components/admin/service-form";
import { AdminSectionHeader, AdminBackButton } from "@/components/admin/ui";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Edit Service | Cherith Admin",
};

export default async function EditServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const [categories, service] = await Promise.all([
    getCategories(),
    getServiceBySlug(resolvedParams.slug)
  ]);

  if (!service) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <AdminSectionHeader 
        title="Edit Service" 
        description={`Editing details for ${service.title}`}
        actions={<AdminBackButton href="/admin/services" label="Back to Services" />}
      />
      <ServiceForm service={service} categories={categories} />
    </div>
  );
}
