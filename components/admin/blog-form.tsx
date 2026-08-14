"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { saveBlogPost } from "@/app/admin/blog/actions";
import { 
  Save, X, Type, Link as LinkIcon, AlignLeft,
  Tag, User, ChevronLeft, Loader2, CheckCircle2,
  Calendar, Eye, Image as ImageIcon
} from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useRef } from "react";

const MDEditor = dynamic(
  () => import("@uiw/react-md-editor").then((mod) => mod.default),
  { ssr: false, loading: () => <div className="h-[500px] bg-gray-50 flex items-center justify-center text-gray-400">Loading Editor...</div> }
);
import Image from "next/image";

export function BlogForm({ post }: { post?: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Form States for Previews & Automation
  const [title, setTitle] = useState(post?.title || "");
  const [content, setContent] = useState<string>(post?.content || "");
  const [excerpt, setExcerpt] = useState(post?.excerpt || "");
  const [seoTitle, setSeoTitle] = useState(post?.seo_title || "");
  const [metaDesc, setMetaDesc] = useState(post?.meta_description || "");
  const [coverImage, setCoverImage] = useState(post?.cover_image_url || "");
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [status, setStatus] = useState(post?.published ? "published" : (post?.scheduled_for ? "scheduled" : "draft"));
  const [inlineUploading, setInlineUploading] = useState(false);
  
  const coverInputRef = useRef<HTMLInputElement>(null);
  const inlineInputRef = useRef<HTMLInputElement>(null);

  // Computed Previews
  const previewTitle = seoTitle || title || "Your amazing article title";
  const previewDesc = metaDesc || excerpt || "Your automatically generated or custom meta description will appear here...";
  const previewUrl = `cherith.co.ke/blogs/${post?.slug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "") || "your-slug"}`;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    formData.set("content", content); // MD Editor content
    formData.set("cover_image_url", coverImage); // Old Cloudinary URL (if any)
    if (coverFile) {
      formData.set("cover_image_file", coverFile);
    }
    
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
    <div className="max-w-7xl mx-auto pb-20">
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
              Enterprise Publishing Engine
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content (3/4) */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm space-y-6">
            
            {/* Title & Slug */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-brand-blue uppercase tracking-widest px-1">Article Title *</label>
                <div className="relative group">
                  <Type className="absolute left-4 top-4 w-4 h-4 text-gray-400 group-focus-within:text-brand-red transition-colors" />
                  <input 
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    placeholder="Enter a compelling title..."
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-red/10 focus:border-brand-red transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-brand-blue uppercase tracking-widest px-1">URL Slug (Auto-generated if blank)</label>
                <div className="relative group">
                  <LinkIcon className="absolute left-4 top-4 w-4 h-4 text-gray-400" />
                  <input 
                    name="slug"
                    defaultValue={post?.slug}
                    placeholder="e.g. why-land-surveys-matter"
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-blue/10 focus:border-brand-blue transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Custom Cover Image Uploader (Deferred) */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-brand-blue uppercase tracking-widest px-1 flex items-center gap-2">
                 <ImageIcon className="w-3 h-3" /> Cover Image
              </label>
              
              <input 
                type="file" 
                accept="image/*" 
                ref={coverInputRef}
                className="hidden" 
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setCoverFile(file);
                    setCoverImage(URL.createObjectURL(file)); // Local preview immediately
                  }
                }}
              />
              
              <div 
                onClick={() => coverInputRef.current?.click()}
                className="w-full h-48 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-gray-50 hover:border-brand-blue transition-all relative overflow-hidden group"
              >
                {coverImage ? (
                  <>
                    <Image src={coverImage} alt="Cover" fill className="object-cover opacity-60 group-hover:opacity-40 transition-opacity" />
                    <span className="relative z-10 bg-white text-brand-blue font-bold text-xs px-4 py-2 rounded-full shadow-lg">Change Cover Image</span>
                  </>
                ) : (
                  <>
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
                       <ImageIcon className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-medium text-gray-500">Click to upload cover photo</span>
                  </>
                )}
              </div>
            </div>

            {/* Content Editor */}
            <div className="space-y-4" data-color-mode="light">
              <div className="flex items-center justify-between px-1">
                 <label className="text-[10px] font-bold text-brand-blue uppercase tracking-widest">Article Content</label>
                 
                 {/* Inline Image Uploader for Body (Immediate) */}
                 <input 
                  type="file" 
                  accept="image/*" 
                  ref={inlineInputRef}
                  className="hidden" 
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    
                    setInlineUploading(true);
                    try {
                      const data = new FormData();
                      data.append("file", file);
                      
                      const res = await fetch("/api/upload", {
                        method: "POST",
                        body: data,
                      });
                      
                      const result = await res.json();
                      if (result.success) {
                        setContent(prev => prev + `\n\n![Article Image](${result.url})\n\n`);
                      } else {
                        alert("Failed to upload inline image");
                      }
                    } catch (error) {
                      console.error(error);
                      alert("Error uploading image");
                    } finally {
                      setInlineUploading(false);
                      if (inlineInputRef.current) inlineInputRef.current.value = "";
                    }
                  }}
                 />

                 <button 
                  type="button"
                  disabled={inlineUploading}
                  onClick={(e) => { e.preventDefault(); inlineInputRef.current?.click(); }}
                  className="text-[10px] font-bold text-brand-red bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 disabled:opacity-50"
                 >
                  {inlineUploading ? <Loader2 className="w-3 h-3 animate-spin" /> : <ImageIcon className="w-3 h-3" />} 
                  {inlineUploading ? "Uploading..." : "Insert Image into Article"}
                 </button>
              </div>

              <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
                <style dangerouslySetInnerHTML={{__html: `
                  .w-md-editor-toolbar li > button {
                    padding: 4px !important;
                    min-width: 28px !important;
                    min-height: 28px !important;
                    display: flex !important;
                    align-items: center !important;
                    justify-content: center !important;
                    color: #475569 !important;
                  }
                  .w-md-editor-toolbar li > button svg {
                    width: 14px !important;
                    height: 14px !important;
                  }
                  .w-md-editor-toolbar li > button:hover {
                    background-color: #f1f5f9 !important;
                    color: #0ea5e9 !important;
                  }
                  .w-md-editor-toolbar-divider {
                    height: 16px !important;
                    margin: 0 8px !important;
                  }
                `}} />
                <MDEditor
                  value={content}
                  onChange={(val) => setContent(val || "")}
                  height={600}
                  className="w-full"
                  preview="live"
                  textareaProps={{
                    placeholder: "Start writing your article here... You can use the formatting toolbar above to make text bold, add lists, or headers."
                  }}
                />
              </div>
              <p className="text-[10px] text-gray-400 font-medium px-2">Reading time will be automatically calculated when you save.</p>
            </div>
          </div>

          {/* Real-time SEO Preview Panel */}
          <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm space-y-6">
            <h3 className="text-sm font-bold text-brand-blue uppercase tracking-widest border-b border-gray-50 pb-4 flex items-center gap-2">
              <Eye className="w-4 h-4 text-brand-red" /> Live SEO Preview
            </h3>
            
            <div className="bg-white border border-gray-200 rounded-xl p-6 max-w-2xl shadow-sm hover:shadow-md transition-shadow">
               <p className="text-sm text-[#202124] flex items-center gap-2 mb-1">
                 <span className="bg-gray-100 rounded-full w-6 h-6 flex items-center justify-center font-bold text-brand-blue text-[10px]">CG</span>
                 Cherith GeoSystems
               </p>
               <p className="text-[12px] text-[#4d5156] mb-2 truncate">https://{previewUrl}</p>
               <h4 className="text-xl text-[#1a0dab] hover:underline cursor-pointer mb-1 leading-tight">{previewTitle}</h4>
               <p className="text-sm text-[#4d5156] leading-snug line-clamp-2">{previewDesc}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-1">SEO Title (Overrides Title)</label>
                <input 
                  name="seo_title" value={seoTitle} onChange={(e) => setSeoTitle(e.target.value)}
                  placeholder="Optional SEO optimized title"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-xs font-medium focus:outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-1">Meta Description</label>
                <input 
                  name="meta_description" value={metaDesc} onChange={(e) => setMetaDesc(e.target.value)}
                  placeholder="Auto-generated if left blank"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-xs font-medium focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Settings (1/4) */}
        <div className="space-y-6">
          <div className="bg-white rounded-[2rem] p-6 border border-gray-100 shadow-sm space-y-6">
            <h3 className="text-sm font-bold text-brand-blue uppercase tracking-widest border-b border-gray-50 pb-4">Publishing</h3>
            
            <div className="space-y-4">
               <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Status</label>
               <select 
                  name="status" 
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-xs font-bold text-brand-blue focus:outline-none appearance-none"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published Live</option>
                  <option value="scheduled">Scheduled</option>
                </select>
            </div>

            {status === "scheduled" && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="space-y-2">
                <label className="text-[10px] font-bold text-brand-red uppercase tracking-widest px-1 flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> Scheduled Date
                </label>
                <input 
                  type="datetime-local"
                  name="scheduled_for"
                  defaultValue={post?.scheduled_for ? new Date(post.scheduled_for).toISOString().slice(0,16) : ""}
                  className="w-full px-4 py-3 bg-red-50 border border-red-100 rounded-xl text-xs font-medium text-red-900 focus:outline-none"
                />
              </motion.div>
            )}

            <label className="flex items-center gap-3 cursor-pointer group pt-4">
              <div className="relative flex items-center">
                <input type="checkbox" name="featured" defaultChecked={post?.featured} className="sr-only peer" />
                <div className="w-10 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-blue"></div>
              </div>
              <span className="text-xs font-bold text-gray-600 group-hover:text-brand-blue transition-colors">Featured Post</span>
            </label>
          </div>

          <div className="bg-white rounded-[2rem] p-6 border border-gray-100 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-brand-blue uppercase tracking-widest border-b border-gray-50 pb-4">Metadata</h3>
            
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Category</label>
              <div className="relative group">
                <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400" />
                <select name="category" defaultValue={post?.category || "News"} className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-xs font-semibold text-gray-900 focus:outline-none appearance-none">
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
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400" />
                <input name="author" defaultValue={post?.author || "Cherith Team"} className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-xs font-semibold focus:outline-none" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Tags (Comma separated)</label>
              <input name="tags" defaultValue={post?.tags?.join(", ")} placeholder="survey, gis, drone" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-xs font-medium focus:outline-none" />
            </div>
          </div>

          <div className="flex flex-col gap-3 sticky top-6">
            <button 
              type="submit"
              disabled={loading || success}
              className="w-full py-5 bg-brand-blue text-white rounded-2xl font-bold text-xs uppercase tracking-[0.2em] shadow-xl shadow-brand-blue/20 hover:bg-brand-red hover:shadow-brand-red/20 transition-all flex items-center justify-center gap-3 active:scale-95 disabled:opacity-70"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : success ? <CheckCircle2 className="w-5 h-5" /> : <Save className="w-5 h-5" />}
              {loading ? "Saving..." : success ? "Saved!" : "Save Article"}
            </button>
            <Link href="/admin/blog" className="w-full py-4 bg-gray-50 text-gray-400 hover:text-brand-blue rounded-2xl font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all">
              <X className="w-4 h-4" /> Cancel
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
