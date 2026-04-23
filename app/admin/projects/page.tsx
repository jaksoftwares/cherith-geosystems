"use client";

import { AdminSectionHeader, AdminBadge } from "@/components/admin/ui";
import { projectsData } from "@/lib/data/projects";
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Edit2, 
  Trash2, 
  Eye,
  MapPin,
  Calendar,
  ExternalLink
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ProjectsAdminPage() {
  return (
    <div className="space-y-8">
      <AdminSectionHeader 
        title="Project Portfolio" 
        description="Manage your firm's featured work, technical specs, and case studies."
        actions={
          <button className="flex items-center gap-2 px-6 py-3 bg-brand-red text-white rounded-2xl font-bold text-sm shadow-lg shadow-brand-red/20 hover:bg-brand-red/90 transition-all active:scale-95">
            <Plus className="w-4 h-4" />
            Add New Project
          </button>
        }
      />

      {/* Table Controls */}
      <div className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative group flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-brand-red transition-colors" />
          <input 
            type="text" 
            placeholder="Search by title, client or location..." 
            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-brand-red/10 focus:border-brand-red transition-all"
          />
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-3 bg-white border border-gray-100 rounded-xl text-xs font-bold text-gray-500 hover:text-brand-blue transition-all">
            <Filter className="w-4 h-4" />
            Category
          </button>
          <button className="flex items-center gap-2 px-4 py-3 bg-white border border-gray-100 rounded-xl text-xs font-bold text-gray-500 hover:text-brand-blue transition-all">
            Sort by: Newest
          </button>
        </div>
      </div>

      {/* Projects Table */}
      <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50">
              <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50">Project Detail</th>
              <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50">Category</th>
              <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50">Client & Year</th>
              <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {projectsData.map((project) => (
              <tr key={project.slug} className="hover:bg-gray-50/30 transition-colors group">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-5">
                    <div className="relative w-16 h-12 rounded-lg overflow-hidden border border-gray-100 shadow-sm group-hover:scale-105 transition-transform duration-500">
                      <Image 
                        src={project.image} 
                        alt={project.title} 
                        fill 
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-brand-blue group-hover:text-brand-red transition-colors line-clamp-1">{project.title}</span>
                      <span className="text-[10px] font-bold text-gray-400 flex items-center gap-1 mt-1">
                        <MapPin className="w-3 h-3 text-brand-red" />
                        {project.location}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <AdminBadge variant={project.featured ? "red" : "blue"}>
                    {project.category}
                  </AdminBadge>
                </td>
                <td className="px-8 py-6">
                   <div className="flex flex-col">
                      <span className="text-xs font-bold text-brand-blue">{project.client}</span>
                      <span className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-widest">{project.year}</span>
                    </div>
                </td>
                <td className="px-8 py-6 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link href={`/projects/${project.slug}`} target="_blank" className="p-2 hover:bg-white rounded-lg transition-colors border border-transparent hover:border-gray-100 text-gray-400 hover:text-brand-blue shadow-sm">
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                    <button className="p-2 hover:bg-white rounded-lg transition-colors border border-transparent hover:border-gray-100 text-gray-400 hover:text-brand-red shadow-sm">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button className="p-2 hover:bg-white rounded-lg transition-colors border border-transparent hover:border-gray-100 text-gray-400 hover:text-red-600 shadow-sm">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {/* Pagination */}
        <div className="p-8 bg-gray-50/50 flex items-center justify-between border-t border-gray-50">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            Showing <span className="text-brand-blue">1 - {projectsData.length}</span> of <span className="text-brand-blue">{projectsData.length}</span> projects
          </p>
          <div className="flex gap-2">
            <button disabled className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-[10px] font-bold text-gray-300 uppercase tracking-widest">Previous</button>
            <button className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-[10px] font-bold text-brand-blue uppercase tracking-widest hover:bg-brand-blue hover:text-white transition-all shadow-sm">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
