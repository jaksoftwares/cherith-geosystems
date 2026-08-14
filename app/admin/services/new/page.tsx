import { getCategories } from "@/lib/api/services";
import { ServiceForm } from "@/components/admin/service-form";

export const metadata = {
  title: "Create Service | Cherith Admin",
};

export default async function NewServicePage() {
  const categories = await getCategories();

  return (
    <div className="space-y-8">
      <ServiceForm categories={categories} />
    </div>
  );
}
