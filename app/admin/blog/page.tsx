import { createClient } from "@/lib/supabase/server";
import { AdminSectionHeader, AdminBadge } from "@/components/admin/ui";
import { 
  Plus, 
  Search, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Eye, 
  FileText,
  Calendar,
  User,
  ExternalLink
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";

export default async function BlogAdminPage() {
  const supabase = await createClient();
  
  const { data: posts, error } = await supabase
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching blogs:", error);
  }

  return (
    <div className="space-y-8">
      <AdminSectionHeader 
        title="Blog Management" 
        description="Create, edit and manage your company news and industry insights."
        actions={
          <Link 
            href="/admin/blog/new"
            className="px-6 py-2.5 bg-brand-red text-white rounded-xl font-bold text-xs uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-brand-red/20 hover:bg-red-700 transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" />
            New Post
          </Link>
        }
      />

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Total Posts", value: posts?.length || 0, icon: FileText, color: "blue" },
          { label: "Published", value: posts?.filter(p => p.published).length || 0, icon: Eye, color: "green" },
          { label: "Featured", value: posts?.filter(p => p.featured).length || 0, icon: Plus, color: "red" },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-center gap-5">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-brand-${stat.color}/10`}>
              <stat.icon className={`w-6 h-6 text-brand-${stat.color}`} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
              <p className="text-2xl font-bold text-brand-blue">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Blog List Table */}
      <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-gray-50 flex items-center justify-between">
           <div className="relative group max-w-sm w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-brand-red transition-colors" />
            <input 
              type="text" 
              placeholder="Search posts..." 
              className="w-full pl-12 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-xs font-medium text-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-red/10 focus:border-brand-red transition-all"
            />
          </div>
        </div>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50">
              <th className="px-8 py-4 text-[9px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50">Article</th>
              <th className="px-8 py-4 text-[9px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50">Author & Category</th>
              <th className="px-8 py-4 text-[9px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50">Date</th>
              <th className="px-8 py-4 text-[9px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50">Status</th>
              <th className="px-8 py-4 text-[9px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 text-sm">
            {!posts || posts.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-8 py-20 text-center text-gray-400 font-medium">
                  No blog posts found. Create your first post to get started.
                </td>
              </tr>
            ) : (
              posts.map((post) => (
                <tr key={post.id} className="hover:bg-gray-50/30 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      {post.cover_image_url && (
                        <div className="relative w-16 h-10 rounded-lg overflow-hidden flex-shrink-0 border border-gray-100">
                          <Image 
                            src={post.cover_image_url} 
                            alt={post.title} 
                            fill 
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div className="flex flex-col gap-0.5">
                        <span className="font-bold text-brand-blue line-clamp-1">{post.title}</span>
                        <span className="text-[10px] text-gray-400 flex items-center gap-1">
                          <ExternalLink className="w-3 h-3" />
                          /{post.slug}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-2 text-[11px] font-bold text-gray-700">
                        <User className="w-3 h-3 text-brand-red" />
                        {post.author || "Cherith Team"}
                      </div>
                      <div className="text-[10px] text-brand-blue bg-blue-50 w-fit px-2 py-0.5 rounded-md font-bold uppercase tracking-wider">
                        {post.category}
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2 text-[11px] font-medium text-gray-500">
                      <Calendar className="w-3.5 h-3.5" />
                      {format(new Date(post.created_at), "MMM d, yyyy")}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex flex-col gap-2">
                      <AdminBadge variant={post.published ? "green" : "red"}>
                        {post.published ? "Published" : "Draft"}
                      </AdminBadge>
                      {post.featured && (
                        <span className="text-[8px] font-black uppercase text-brand-red tracking-widest flex items-center gap-1">
                          <Plus className="w-2 h-2" /> Featured
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link 
                        href={`/blogs/${post.slug}`} 
                        target="_blank"
                        className="p-2.5 hover:bg-white rounded-xl transition-all border border-transparent hover:border-gray-100 text-gray-400 hover:text-brand-blue"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <Link 
                        href={`/admin/blog/${post.id}/edit`}
                        className="p-2.5 hover:bg-white rounded-xl transition-all border border-transparent hover:border-gray-100 text-gray-400 hover:text-emerald-600"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button className="p-2.5 hover:bg-white rounded-xl transition-all border border-transparent hover:border-gray-100 text-gray-400 hover:text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
