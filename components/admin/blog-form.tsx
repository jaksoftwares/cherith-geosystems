"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { saveBlogPost } from "@/app/admin/blog/actions";
import { 
  Save, 
  X, 
  Image as ImageIcon, 
  Type, 
  Link as LinkIcon, 
  AlignLeft,
  Tag,
  User,
  Clock,
  ChevronLeft,
  Loader2,
  CheckCircle2
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export function BlogForm({ post }: { post?: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const result = await saveBlogPost(formData, post?.id);

    if (result.error) {
      setError(result.error);
      setLoading(false);
    } else {
      setSuccess(true);
      setTimeout(() => {
        router.push("/admin/blog");
      }, 1500);
    }
  }

  return (
    <div className="max-w-5xl mx-auto pb-20">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link 
            href="/admin/blog" 
            className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-brand-blue transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-brand-blue font-cherith">
              {post ? "Edit Blog Post" : "Create New Article"}
            </h1>
            <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mt-1">
              {post ? `Editing: ${post.title}` : "Draft your next industry insight"}
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content (2/3) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-brand-blue uppercase tracking-widest px-1">Article Title</label>
              <div className="relative group">
                <Type className="absolute left-4 top-4 w-4 h-4 text-gray-400 group-focus-within:text-brand-red transition-colors" />
                <input 
                  name="title"
                  defaultValue={post?.title}
                  required
                  placeholder="Enter a compelling title..."
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-red/10 focus:border-brand-red transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-brand-blue uppercase tracking-widest px-1">Custom Slug (Optional)</label>
              <div className="relative group">
                <LinkIcon className="absolute left-4 top-4 w-4 h-4 text-gray-400" />
                <input 
                  name="slug"
                  defaultValue={post?.slug}
                  placeholder="auto-generated-if-blank"
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-blue/10 focus:border-brand-blue transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-brand-blue uppercase tracking-widest px-1">Short Excerpt</label>
              <div className="relative group">
                <AlignLeft className="absolute left-4 top-4 w-4 h-4 text-gray-400" />
                <textarea 
                  name="excerpt"
                  defaultValue={post?.excerpt}
                  required
                  rows={3}
                  placeholder="A brief summary for the blog listing page..."
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-red/10 focus:border-brand-red transition-all resize-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-brand-blue uppercase tracking-widest px-1">Full Content (HTML/Markdown)</label>
              <textarea 
                name="content"
                defaultValue={post?.content}
                required
                rows={15}
                placeholder="Write your article content here..."
                className="w-full px-6 py-5 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-red/10 focus:border-brand-red transition-all font-mono"
              />
            </div>
          </div>
        </div>

        {/* Sidebar Settings (1/3) */}
        <div className="space-y-6">
          <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm space-y-6">
            <h3 className="text-sm font-bold text-brand-blue uppercase tracking-widest border-b border-gray-50 pb-4">Publishing</h3>
            
            <div className="space-y-4">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center">
                  <input 
                    type="checkbox" 
                    name="published" 
                    defaultChecked={post?.published}
                    className="sr-only peer" 
                  />
                  <div className="w-10 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-red"></div>
                </div>
                <span className="text-xs font-bold text-gray-600 group-hover:text-brand-blue transition-colors">Publish Article</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center">
                  <input 
                    type="checkbox" 
                    name="featured" 
                    defaultChecked={post?.featured}
                    className="sr-only peer" 
                  />
                  <div className="w-10 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-blue"></div>
                </div>
                <span className="text-xs font-bold text-gray-600 group-hover:text-brand-blue transition-colors">Featured Post</span>
              </label>
            </div>

            <div className="space-y-2 pt-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Category</label>
              <div className="relative group">
                <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <select 
                  name="category" 
                  defaultValue={post?.category || "News"}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-xs font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-blue/10 appearance-none"
                >
                  <option value="News">General News</option>
                  <option value="Geospatial">Geospatial Intelligence</option>
                  <option value="Surveying">Technical Surveying</option>
                  <option value="Drone">Drone Analytics</option>
                  <option value="Case Study">Case Study</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Author Name</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  name="author"
                  defaultValue={post?.author || "Cherith Team"}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-xs font-semibold text-gray-900 focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Reading Time</label>
              <div className="relative group">
                <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  name="reading_time"
                  defaultValue={post?.reading_time || "5 min read"}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-xs font-bold text-brand-blue focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-brand-blue uppercase tracking-widest border-b border-gray-50 pb-4 flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-brand-red" /> Cover Image
            </h3>
            
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Image URL</label>
              <input 
                name="cover_image_url"
                defaultValue={post?.cover_image_url}
                placeholder="https://..."
                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-xs font-medium text-gray-900 focus:outline-none"
              />
            </div>
            
            <p className="text-[9px] text-gray-400 font-medium italic">
              Upload feature coming soon. For now, please use a direct image link.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <button 
              type="submit"
              disabled={loading || success}
              className="w-full py-5 bg-brand-blue text-white rounded-2xl font-bold text-xs uppercase tracking-[0.2em] shadow-xl shadow-brand-blue/20 hover:bg-brand-red hover:shadow-brand-red/20 transition-all flex items-center justify-center gap-3 active:scale-95 disabled:opacity-70"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : success ? (
                <CheckCircle2 className="w-5 h-5" />
              ) : (
                <Save className="w-5 h-5" />
              )}
              {loading ? "Saving Changes..." : success ? "Article Saved!" : "Save Article"}
            </button>

            <Link 
              href="/admin/blog"
              className="w-full py-4 bg-gray-50 text-gray-400 hover:text-brand-blue rounded-2xl font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all"
            >
              <X className="w-4 h-4" />
              Cancel
            </Link>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-[10px] font-bold uppercase tracking-widest"
            >
              {error}
            </motion.div>
          )}
        </div>
      </form>
    </div>
  );
}
