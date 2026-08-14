import { AdminSectionHeader, AdminBadge } from "@/components/admin/ui";
import { Plus, Eye, Trash2, Edit2, Image as ImageIcon, MapPin, Calendar, Briefcase, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getProjects } from "@/lib/api/projects";
import { optimizeImage } from "@/lib/utils";
import { deleteProject } from "@/app/admin/projects/actions";
import { revalidatePath } from "next/cache";

export default async function ProjectsAdminPage() {
  const projects = await getProjects();
  
  const totalProjects = projects.length;
  const featuredProjects = projects.filter(p => p.featured).length;
  const uniqueCategories = new Set(projects.map(p => p.category)).size;

  return (
    <div className="space-y-8 pb-20">
      <AdminSectionHeader 
        title="Project Portfolio" 
        description="Manage your extensive project database, highlight flagship engineering tasks, and showcase your best technical work."
        actions={
          <Link href="/admin/projects/new" className="flex items-center gap-2 px-6 py-3 bg-brand-blue text-white rounded-2xl font-bold text-sm shadow-lg shadow-brand-blue/20 hover:bg-brand-blue/90 transition-all active:scale-95">
            <Plus className="w-4 h-4" />
            Add Project
          </Link>
        }
      />

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-[32px] p-6 border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-brand-blue/5 flex items-center justify-center text-brand-blue">
            <Briefcase className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Projects</p>
            <p className="text-3xl font-bold font-cherith text-brand-blue">{totalProjects}</p>
          </div>
        </div>

        <div className="bg-white rounded-[32px] p-6 border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-brand-red/5 flex items-center justify-center text-brand-red">
            <Tag className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Categories</p>
            <p className="text-3xl font-bold font-cherith text-brand-blue">{uniqueCategories}</p>
          </div>
        </div>

        <div className="bg-white rounded-[32px] p-6 border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-zinc-100 flex items-center justify-center text-gray-500">
            <ImageIcon className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Flagship/Featured</p>
            <p className="text-3xl font-bold font-cherith text-brand-blue">{featuredProjects}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden group hover:shadow-xl transition-all duration-500 flex flex-col h-full">
            
            <div className="relative h-48">
              <Image 
                src={project.image_url.startsWith('http') ? optimizeImage(project.image_url, 600) : project.image_url} 
                alt={project.title} 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-brand-blue/20 group-hover:bg-brand-blue/10 transition-colors"></div>
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                <AdminBadge variant="blue">
                  {project.category}
                </AdminBadge>
                {project.featured && (
                  <AdminBadge variant="red">
                    Featured
                  </AdminBadge>
                )}
              </div>
            </div>
            
            <div className="p-6 flex flex-col flex-1">
              <div className="flex items-center justify-between mb-4">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    <MapPin className="w-3 h-3 text-brand-red" />
                    {project.location}
                  </div>
                  <div className="flex items-center gap-1 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    <Calendar className="w-3 h-3 text-brand-red" />
                    {project.year}
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Link href={`/admin/projects/${project.slug}`} className="p-2 hover:bg-gray-50 rounded-lg text-gray-400 hover:text-brand-blue transition-colors">
                    <Edit2 className="w-4 h-4" />
                  </Link>
                  <form action={async () => {
                    "use server";
                    await deleteProject(project.id);
                  }}>
                    <button type="submit" className="p-2 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-600 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              </div>
              
              <h3 className="text-lg font-bold font-cherith text-brand-blue mb-2 group-hover:text-brand-red transition-colors line-clamp-2">
                {project.title}
              </h3>
              
              <p className="text-gray-500 text-xs line-clamp-2 mb-6">
                {project.description}
              </p>

              <div className="mt-auto pt-6 border-t border-gray-50 flex gap-2">
                 <Link href={`/projects/${project.slug}`} target="_blank" className="flex-1 py-3 bg-gray-50 hover:bg-brand-blue hover:text-white text-brand-blue rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all flex items-center justify-center gap-2">
                    <Eye className="w-3.5 h-3.5" />
                    Preview
                 </Link>
              </div>
            </div>
          </div>
        ))}

        {/* Add Card */}
        <Link href="/admin/projects/new" className="border-2 border-dashed border-gray-100 rounded-[32px] p-8 flex flex-col items-center justify-center gap-4 hover:border-brand-red/30 hover:bg-brand-red/[0.02] transition-all group min-h-[350px]">
           <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center group-hover:scale-110 transition-transform">
             <Plus className="w-8 h-8 text-gray-300 group-hover:text-brand-red transition-colors" />
           </div>
           <div className="text-center">
             <span className="block text-sm font-bold text-gray-400 group-hover:text-brand-blue transition-colors">Add New Project</span>
             <span className="block text-[10px] font-medium text-gray-400 mt-1 uppercase tracking-widest">Showcase your work</span>
           </div>
        </Link>
      </div>
    </div>
  );
}
