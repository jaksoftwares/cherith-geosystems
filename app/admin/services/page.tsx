"use client";

import { AdminSectionHeader, AdminBadge } from "@/components/admin/ui";
import { 
  Plus, 
  Search, 
  Map, 
  MoreVertical, 
  Edit2, 
  Trash2, 
  Eye,
  Layers,
  Database,
  Cpu
} from "lucide-react";
import Image from "next/image";

const mockServices = [
  { id: 1, title: "Land (Cadastral) Surveys", category: "Surveying", subCount: 4, icon: Map, image: "/images/services/land-cadastral/land-demarcation1.png" },
  { id: 2, title: "Engineering & Topo Surveys", category: "Surveying", subCount: 4, icon: Map, image: "/images/services/engineering%26topographical/topographicalmapping2.png" },
  { id: 3, title: "GIS & Spatial Analysis", category: "GIS", subCount: 3, icon: Database, image: "/images/services/gis%26spatial-analysis/spatial-modelling2.png" },
  { id: 4, title: "Remote Sensing & Monitoring", category: "GIS", subCount: 4, icon: Database, image: "/images/services/remote-sensing%26enviroment/remote-sensing-enviroment-hero.png" },
  { id: 5, title: "Underground Utility (GPR)", category: "Surveying", subCount: 3, icon: Map, image: "/images/services/underground-utility-gpr/hidden-infrastructure1.png" },
  { id: 6, title: "Geoportal & Web GIS", category: "Tech", subCount: 3, icon: Cpu, image: "/images/services/geo-portal%26gis/geoportal-main.png" },
  { id: 7, title: "Planning & Reporting", category: "Tech", subCount: 4, icon: Cpu, image: "/images/services/planning%26technicalreporting/planning%26reporting-hero.png" },
];

export default function ServicesAdminPage() {
  return (
    <div className="space-y-8">
      <AdminSectionHeader 
        title="Services Management" 
        description="Configure your core service offerings, sub-services, and associated imagery."
        actions={
          <button className="flex items-center gap-2 px-6 py-3 bg-brand-blue text-white rounded-2xl font-bold text-sm shadow-lg shadow-brand-blue/20 hover:bg-brand-blue/90 transition-all active:scale-95">
            <Plus className="w-4 h-4" />
            Create Service
          </button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockServices.map((service) => (
          <div key={service.id} className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden group hover:shadow-xl transition-all duration-500">
            <div className="relative h-40">
              <Image 
                src={service.image} 
                alt={service.title} 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-brand-blue/20 group-hover:bg-brand-blue/10 transition-colors"></div>
              <div className="absolute top-4 left-4">
                <AdminBadge variant={service.category === 'Surveying' ? 'red' : service.category === 'GIS' ? 'blue' : 'gray'}>
                  {service.category}
                </AdminBadge>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-zinc-50 flex items-center justify-center text-brand-blue border border-gray-100">
                  <service.icon className="w-5 h-5" />
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-gray-50 rounded-lg text-gray-400 hover:text-brand-blue transition-colors">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button className="p-2 hover:bg-gray-50 rounded-lg text-gray-400 hover:text-red-600 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <h3 className="text-lg font-bold font-cherith text-brand-blue mb-2 group-hover:text-brand-red transition-colors">
                {service.title}
              </h3>
              
              <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                <Layers className="w-3.5 h-3.5 text-brand-red" />
                {service.subCount} Functional Offerings
              </div>

              <div className="mt-6 pt-6 border-t border-gray-50">
                 <button className="w-full py-3 bg-gray-50 hover:bg-brand-blue hover:text-white text-brand-blue rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all flex items-center justify-center gap-2">
                    <Eye className="w-3.5 h-3.5" />
                    Preview Details
                 </button>
              </div>
            </div>
          </div>
        ))}

        {/* Empty State / Add Card */}
        <button className="border-2 border-dashed border-gray-100 rounded-[32px] p-8 flex flex-col items-center justify-center gap-4 hover:border-brand-red/30 hover:bg-brand-red/[0.02] transition-all group min-h-[300px]">
           <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center group-hover:scale-110 transition-transform">
             <Plus className="w-8 h-8 text-gray-300 group-hover:text-brand-red transition-colors" />
           </div>
           <div className="text-center">
             <span className="block text-sm font-bold text-gray-400 group-hover:text-brand-blue transition-colors">Add New Category</span>
             <span className="block text-[10px] font-medium text-gray-400 mt-1 uppercase tracking-widest">Expand your offerings</span>
           </div>
        </button>
      </div>
    </div>
  );
}
