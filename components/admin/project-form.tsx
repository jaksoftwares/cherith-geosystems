"use client";

import { useState, useTransition } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { ImagePlus, Loader2, Save, X, Plus, GripVertical, ImageIcon, XCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { saveProject } from "@/app/admin/projects/actions";
import { Project } from "@/lib/api/projects";
import { optimizeImage } from "@/lib/utils";

interface ProjectFormProps {
  project?: Project;
}

export function ProjectForm({ project }: ProjectFormProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string>("");
  
  // Image states
  const [coverImage, setCoverImage] = useState<string | File>(project?.image_url || "");
  const [coverPreview, setCoverPreview] = useState<string>(project?.image_url || "");
  
  // Gallery states
  const [galleryImages, setGalleryImages] = useState<Array<{ url: string | File, preview: string, public_id?: string }>>(
    (project?.gallery || []).map(g => ({ url: g.url, preview: g.url, public_id: g.public_id }))
  );

  const { register, control, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      title: project?.title || "",
      slug: project?.slug || "",
      description: project?.description || "",
      full_description: project?.full_description || "",
      location: project?.location || "",
      client: project?.client || "",
      year: project?.year || new Date().getFullYear().toString(),
      category: project?.category || "Infrastructure",
      featured: project?.featured ?? false,
      technical_specs: project?.technical_specs || [{ label: "", value: "" }],
    }
  });

  const { fields: techFields, append: appendTech, remove: removeTech } = useFieldArray({
    control,
    name: "technical_specs"
  });

  // Watch title to auto-generate slug if not editing
  const title = watch("title");
  
  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setCoverImage(file);
      setCoverPreview(URL.createObjectURL(file));
    }
  };

  const handleGalleryImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map(file => ({
        url: file,
        preview: URL.createObjectURL(file)
      }));
      setGalleryImages(prev => [...prev, ...newFiles]);
    }
  };

  const removeGalleryImage = (index: number) => {
    setGalleryImages(prev => prev.filter((_, i) => i !== index));
  };

  const uploadToCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    
    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });
    
    if (!res.ok) throw new Error("Failed to upload image");
    const data = await res.json();
    return { url: data.url, public_id: data.public_id };
  };

  const onSubmit = async (data: any) => {
    setError("");
    startTransition(async () => {
      try {
        let finalCoverUrl = project?.image_url || "";
        let finalCoverPublicId = project?.image_public_id || "";

        // 1. Upload Cover Image if changed
        if (coverImage instanceof File) {
          const uploaded = await uploadToCloudinary(coverImage);
          finalCoverUrl = uploaded.url;
          finalCoverPublicId = uploaded.public_id;
        }

        if (!finalCoverUrl) {
          throw new Error("Cover image is required");
        }

        // 2. Upload any new gallery images concurrently
        const galleryPromises = galleryImages.map(async (g) => {
          if (g.url instanceof File) {
            const up = await uploadToCloudinary(g.url);
            return { url: up.url, public_id: up.public_id };
          }
          return { url: g.url as string, public_id: g.public_id };
        });

        const finalGallery = await Promise.all(galleryPromises);

        // 3. Filter out empty technical specs
        const filteredSpecs = data.technical_specs.filter((s: any) => s.label.trim() !== "" && s.value.trim() !== "");

        // 4. Construct payload
        const payload = {
          ...data,
          id: project?.id,
          image_url: finalCoverUrl,
          image_public_id: finalCoverPublicId,
          gallery: finalGallery,
          technical_specs: filteredSpecs,
          // Generate slug if new
          slug: data.slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
        };

        await saveProject(payload);
        
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Something went wrong saving the project.");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-5xl mx-auto space-y-8">
      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-bold">
          {error}
        </div>
      )}

      {/* Main Details Section */}
      <div className="bg-white p-6 md:p-8 rounded-[32px] border border-gray-100 shadow-sm space-y-6">
        <h2 className="text-xl font-bold font-cherith text-brand-blue border-b border-gray-100 pb-4">Primary Details</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Project Title</label>
            <input 
              {...register("title", { required: "Title is required" })}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red outline-none transition-all"
              placeholder="e.g. JKIA Topographical Survey"
            />
            {errors.title && <span className="text-red-500 text-xs">{errors.title.message as string}</span>}
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">URL Slug</label>
            <input 
              {...register("slug")}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-500 outline-none"
              placeholder="Auto-generated if empty"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Category</label>
            <select 
              {...register("category")}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red outline-none bg-white transition-all"
            >
              <option value="Infrastructure">Infrastructure</option>
              <option value="GIS">GIS</option>
              <option value="Remote Sensing">Remote Sensing</option>
              <option value="Engineering">Engineering</option>
              <option value="Cadastral">Cadastral</option>
              <option value="GPR">GPR</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Year</label>
            <input 
              {...register("year")}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red outline-none transition-all"
              placeholder="e.g. 2026"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Client</label>
            <input 
              {...register("client")}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red outline-none transition-all"
              placeholder="e.g. Kenya Airports Authority"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Location</label>
            <input 
              {...register("location")}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red outline-none transition-all"
              placeholder="e.g. Nairobi, Kenya"
            />
          </div>
        </div>

        <div className="flex items-center gap-3 pt-4">
          <input 
            type="checkbox" 
            id="featured" 
            {...register("featured")}
            className="w-5 h-5 rounded text-brand-red focus:ring-brand-red"
          />
          <label htmlFor="featured" className="text-sm font-bold text-gray-700 cursor-pointer">
            Mark as Flagship/Featured Project
          </label>
        </div>
      </div>

      {/* Content Section */}
      <div className="bg-white p-6 md:p-8 rounded-[32px] border border-gray-100 shadow-sm space-y-6">
        <h2 className="text-xl font-bold font-cherith text-brand-blue border-b border-gray-100 pb-4">Project Description</h2>
        
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Short Description (Card View)</label>
          <textarea 
            {...register("description", { required: "Description is required" })}
            rows={2}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red outline-none transition-all resize-none"
            placeholder="Brief 1-2 sentence summary for project cards..."
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Full Markdown Description (Detailed View)</label>
          <textarea 
            {...register("full_description")}
            rows={8}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red outline-none transition-all font-mono text-sm"
            placeholder="Use markdown to write the comprehensive project case study..."
          />
        </div>
      </div>

      {/* Technical Specs Builder */}
      <div className="bg-white p-6 md:p-8 rounded-[32px] border border-gray-100 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <h2 className="text-xl font-bold font-cherith text-brand-blue">Technical Specs</h2>
          <button 
            type="button"
            onClick={() => appendTech({ label: "", value: "" })}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-brand-blue/5 text-brand-blue rounded-lg text-xs font-bold hover:bg-brand-blue/10 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Spec
          </button>
        </div>
        
        <div className="space-y-3">
          {techFields.map((field, index) => (
            <div key={field.id} className="flex items-center gap-3 bg-gray-50 p-2 pr-4 rounded-xl group border border-transparent hover:border-gray-200 transition-colors">
              <div className="p-2 text-gray-300 cursor-move">
                <GripVertical className="w-4 h-4" />
              </div>
              <input 
                {...register(`technical_specs.${index}.label`)}
                className="flex-1 px-3 py-2 rounded-lg border border-gray-200 text-sm focus:border-brand-red outline-none"
                placeholder="Label (e.g. Area Covered)"
              />
              <input 
                {...register(`technical_specs.${index}.value`)}
                className="flex-1 px-3 py-2 rounded-lg border border-gray-200 text-sm focus:border-brand-red outline-none"
                placeholder="Value (e.g. 450 Hectares)"
              />
              <button 
                type="button" 
                onClick={() => removeTech(index)}
                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
          {techFields.length === 0 && (
            <p className="text-sm text-gray-400 text-center py-4">No technical specifications added yet.</p>
          )}
        </div>
      </div>

      {/* Media Section */}
      <div className="bg-white p-6 md:p-8 rounded-[32px] border border-gray-100 shadow-sm space-y-6">
        <h2 className="text-xl font-bold font-cherith text-brand-blue border-b border-gray-100 pb-4">Media & Images</h2>
        
        <div className="space-y-6">
          {/* Main Cover Image */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Main Cover Image</label>
            <div className="flex items-start gap-6">
              <div className="relative w-48 h-32 rounded-xl overflow-hidden bg-gray-100 border border-gray-200 flex-shrink-0">
                {coverPreview ? (
                  <Image src={coverPreview.startsWith('http') ? optimizeImage(coverPreview, 400) : coverPreview} alt="Cover" fill className="object-cover" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                    <ImageIcon className="w-8 h-8 opacity-50" />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <label className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors font-semibold text-sm shadow-sm">
                  <ImagePlus className="w-4 h-4 text-brand-blue" />
                  Choose Cover Image
                  <input type="file" accept="image/*" onChange={handleCoverImageChange} className="hidden" />
                </label>
                <p className="text-xs text-gray-400 mt-2">Recommended: 1920x1080px (16:9). This represents the project on cards and the hero section.</p>
              </div>
            </div>
          </div>

          {/* Project Gallery (Future proofing) */}
          <div className="space-y-3 pt-6 border-t border-gray-50">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Project Gallery</label>
              <label className="inline-flex items-center gap-2 px-3 py-1.5 bg-brand-blue/5 text-brand-blue border border-brand-blue/10 rounded-lg cursor-pointer hover:bg-brand-blue/10 transition-colors font-bold text-xs">
                <Plus className="w-3.5 h-3.5" />
                Add Photos
                <input type="file" accept="image/*" multiple onChange={handleGalleryImagesChange} className="hidden" />
              </label>
            </div>
            
            {galleryImages.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {galleryImages.map((img, idx) => (
                  <div key={idx} className="relative aspect-square rounded-xl overflow-hidden border border-gray-200 group">
                    <Image src={img.preview.startsWith('http') ? optimizeImage(img.preview, 300) : img.preview} alt={`Gallery ${idx}`} fill className="object-cover" />
                    <button 
                      type="button" 
                      onClick={() => removeGalleryImage(idx)}
                      className="absolute top-2 right-2 p-1.5 bg-white/90 text-red-500 rounded-lg shadow-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500 hover:text-white"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 border-2 border-dashed border-gray-100 rounded-2xl text-center">
                <p className="text-sm text-gray-400">No gallery images added. Uploading additional photos is optional.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Submit */}
      <div className="sticky bottom-8 flex justify-end gap-4 z-40">
        <Link 
          href="/admin/projects"
          className="flex items-center gap-2 px-6 py-4 bg-white text-gray-600 border border-gray-200 rounded-2xl font-bold hover:bg-gray-50 transition-all shadow-sm active:scale-95 hover:-translate-y-1"
        >
          <XCircle className="w-5 h-5" />
          Cancel
        </Link>
        <button 
          type="submit" 
          disabled={isPending}
          className="flex items-center gap-2 px-8 py-4 bg-brand-blue text-white rounded-2xl font-bold shadow-xl shadow-brand-blue/30 hover:bg-brand-red hover:shadow-brand-red/30 transition-all disabled:opacity-70 disabled:cursor-not-allowed hover:-translate-y-1"
        >
          {isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
          {isPending ? "Saving Project..." : "Save Project"}
        </button>
      </div>
    </form>
  );
}
