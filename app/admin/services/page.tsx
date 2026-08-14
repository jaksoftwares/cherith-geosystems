import { AdminSectionHeader, AdminBadge } from "@/components/admin/ui";
import { 
  Plus, 
  Map, 
  Database,
  Cpu,
  Layers,
  Eye,
  Trash2,
  Edit2
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getServices } from "@/lib/api/services";
import { optimizeImage } from "@/lib/utils";
import { deleteService } from "@/app/admin/services/actions";
import { revalidatePath } from "next/cache";

export default async function ServicesAdminPage() {
  const services = await getServices();

  const totalServices = services.length;
  const totalSubServices = services.reduce((acc, curr) => acc + (curr.sub_services?.length || 0), 0);
  const uniqueCategories = new Set(services.map(s => s.category_id)).size;

  return (
    <div className="space-y-8 pb-20">
      <AdminSectionHeader 
        title="Services Management" 
        description="Configure your core service offerings, sub-services, and associated imagery."
        actions={
          <Link href="/admin/services/new" className="flex items-center gap-2 px-6 py-3 bg-brand-blue text-white rounded-2xl font-bold text-sm shadow-lg shadow-brand-blue/20 hover:bg-brand-blue/90 transition-all active:scale-95">
            <Plus className="w-4 h-4" />
            Create Service
          </Link>
        }
      />

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-[32px] p-6 border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-brand-blue/5 flex items-center justify-center text-brand-blue">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Services</p>
            <p className="text-3xl font-bold font-cherith text-brand-blue">{totalServices}</p>
          </div>
        </div>

        <div className="bg-white rounded-[32px] p-6 border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-brand-red/5 flex items-center justify-center text-brand-red">
            <Database className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Sub-Services</p>
            <p className="text-3xl font-bold font-cherith text-brand-blue">{totalSubServices}</p>
          </div>
        </div>

        <div className="bg-white rounded-[32px] p-6 border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-zinc-100 flex items-center justify-center text-gray-500">
            <Map className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Active Categories</p>
            <p className="text-3xl font-bold font-cherith text-brand-blue">{uniqueCategories}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => {
          const categoryName = service.service_categories?.name || "Uncategorized";
          const Icon = service.service_categories?.slug === 'surveying' ? Map : service.service_categories?.slug === 'gis' ? Database : Cpu;
          
          return (
            <div key={service.id} className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden group hover:shadow-xl transition-all duration-500 flex flex-col h-full">
              <div className="relative h-48">
                <Image 
                  src={service.image_url.startsWith('http') ? optimizeImage(service.image_url, 600) : service.image_url} 
                  alt={service.title} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-brand-blue/20 group-hover:bg-brand-blue/10 transition-colors"></div>
                <div className="absolute top-4 left-4">
                  <AdminBadge variant={categoryName.includes('Engineering') ? 'red' : categoryName.includes('GIS') ? 'blue' : 'gray'}>
                    {categoryName}
                  </AdminBadge>
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-zinc-50 flex items-center justify-center text-brand-blue border border-gray-100">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Link href={`/admin/services/${service.slug}`} className="p-2 hover:bg-gray-50 rounded-lg text-gray-400 hover:text-brand-blue transition-colors">
                      <Edit2 className="w-4 h-4" />
                    </Link>
                    <form action={async () => {
                      "use server";
                      await deleteService(service.id);
                    }}>
                      <button type="submit" className="p-2 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-600 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </form>
                  </div>
                </div>
                
                <h3 className="text-lg font-bold font-cherith text-brand-blue mb-2 group-hover:text-brand-red transition-colors">
                  {service.title}
                </h3>
                
                <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-6">
                  <Layers className="w-3.5 h-3.5 text-brand-red" />
                  {service.sub_services?.length || 0} Functional Offerings
                </div>

                <div className="mt-auto pt-6 border-t border-gray-50">
                   <Link href={`/services/${service.slug}`} target="_blank" className="w-full py-3 bg-gray-50 hover:bg-brand-blue hover:text-white text-brand-blue rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all flex items-center justify-center gap-2">
                      <Eye className="w-3.5 h-3.5" />
                      Preview Details
                   </Link>
                </div>
              </div>
            </div>
          );
        })}

        {/* Add Card */}
        <Link href="/admin/services/new" className="border-2 border-dashed border-gray-100 rounded-[32px] p-8 flex flex-col items-center justify-center gap-4 hover:border-brand-red/30 hover:bg-brand-red/[0.02] transition-all group min-h-[350px]">
           <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center group-hover:scale-110 transition-transform">
             <Plus className="w-8 h-8 text-gray-300 group-hover:text-brand-red transition-colors" />
           </div>
           <div className="text-center">
             <span className="block text-sm font-bold text-gray-400 group-hover:text-brand-blue transition-colors">Add New Service</span>
             <span className="block text-[10px] font-medium text-gray-400 mt-1 uppercase tracking-widest">Expand your offerings</span>
           </div>
        </Link>
      </div>
    </div>
  );
}
