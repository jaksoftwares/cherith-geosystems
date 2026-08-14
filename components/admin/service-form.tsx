"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { saveService } from "@/app/admin/services/actions";
import { Service, ServiceCategory, SubService } from "@/lib/api/services";
import { 
  Save, X, Image as ImageIcon, Map, Loader2, 
  ChevronLeft, Plus, Trash2 
} from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";
import Image from "next/image";

const MDEditor = dynamic(
  () => import("@uiw/react-md-editor").then((mod) => mod.default),
  { ssr: false, loading: () => <div className="h-[500px] bg-gray-50 flex items-center justify-center text-gray-400">Loading Editor...</div> }
);

interface ServiceFormProps {
  service?: Service;
  categories: ServiceCategory[];
}

export function ServiceForm({ service, categories }: ServiceFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState(service?.title || "");
  const [slug, setSlug] = useState(service?.slug || "");
  const [categoryId, setCategoryId] = useState(service?.category_id || (categories.length > 0 ? categories[0].id : ""));
  const [shortDescription, setShortDescription] = useState(service?.short_description || "");
  const [content, setContent] = useState<string>(service?.content || "");
  const [position, setPosition] = useState(service?.position || 0);

  // Main Cover Image
  const [coverImage, setCoverImage] = useState(service?.image_url || "");
  const [coverFile, setCoverFile] = useState<File | null>(null);
  
  // Sub Services
  const [subServices, setSubServices] = useState<(SubService & { file?: File | null })[]>(
    service?.sub_services || []
  );

  const generateSlug = (text: string) => {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    if (!service) {
      setSlug(generateSlug(e.target.value));
    }
  };

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverFile(file);
      setCoverImage(URL.createObjectURL(file)); // local preview
    }
  };

  const handleSubServiceChange = (index: number, field: keyof SubService, value: string) => {
    const updated = [...subServices];
    updated[index] = { ...updated[index], [field]: value };
    setSubServices(updated);
  };

  const handleSubServiceFileChange = (index: number, file: File) => {
    const updated = [...subServices];
    updated[index] = { 
      ...updated[index], 
      file,
      image: URL.createObjectURL(file) // local preview
    };
    setSubServices(updated);
  };

  const addSubService = () => {
    setSubServices([...subServices, { name: "", image: "" }]);
  };

  const removeSubService = (index: number) => {
    const updated = [...subServices];
    updated.splice(index, 1);
    setSubServices(updated);
  };

  // Deferred Upload Function
  const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });
    if (!res.ok) throw new Error("Upload failed");
    const data = await res.json();
    return data.url;
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // 1. Upload Main Cover Image if changed
      let finalCoverImage = coverImage;
      if (coverFile) {
        finalCoverImage = await uploadFile(coverFile);
      }

      // 2. Upload Sub-Service Images if changed
      const finalSubServices = await Promise.all(
        subServices.map(async (sub) => {
          let finalImage = sub.image;
          if (sub.file) {
            finalImage = await uploadFile(sub.file);
          }
          return { name: sub.name, image: finalImage };
        })
      );

      // 3. Submit Data via Server Action
      const submitData = new FormData();
      if (service?.id) submitData.set("id", service.id);
      submitData.set("title", title);
      submitData.set("slug", slug);
      submitData.set("category_id", categoryId);
      submitData.set("short_description", shortDescription);
      submitData.set("content", content);
      submitData.set("image_url", finalCoverImage);
      submitData.set("position", position.toString());
      submitData.set("sub_services", JSON.stringify(finalSubServices));

      const result = await saveService(submitData);

      if (result.error) {
        setError(result.error);
        setLoading(false);
      } else {
        router.push("/admin/services");
        router.refresh();
      }
    } catch (err: any) {
      console.error(err);
      setError("Failed to save the service. Check image uploads.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-6xl mx-auto pb-20">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link href="/admin/services" className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-brand-blue transition-all">
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-brand-blue font-cherith">
              {service ? "Edit Service" : "Create Service"}
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/admin/services" className="px-6 py-3 rounded-xl font-bold text-sm text-gray-500 hover:bg-white hover:text-brand-blue transition-all">
            Cancel
          </Link>
          <button 
            type="submit" 
            disabled={loading}
            className="flex items-center gap-2 px-6 py-3 bg-brand-blue text-white rounded-xl font-bold text-sm shadow-lg shadow-brand-blue/20 hover:bg-brand-red hover:shadow-brand-red/20 transition-all disabled:opacity-70"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {loading ? "Saving..." : "Save Service"}
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-8 p-4 bg-red-50 text-red-600 rounded-2xl text-sm font-medium border border-red-100">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Form Fields */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-sm space-y-6">
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Service Title</label>
              <input 
                type="text" required value={title} onChange={handleTitleChange}
                className="w-full mt-2 px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-medium text-brand-blue focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red"
                placeholder="e.g. Land (Cadastral) Surveys"
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
               <div>
                 <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">URL Slug</label>
                 <input 
                   type="text" required value={slug} onChange={(e) => setSlug(e.target.value)}
                   className="w-full mt-2 px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-medium text-brand-blue focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red"
                 />
               </div>
               <div>
                 <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Category</label>
                 <select 
                   value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required
                   className="w-full mt-2 px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-medium text-brand-blue focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red appearance-none"
                 >
                   {categories.map((cat) => (
                     <option key={cat.id} value={cat.id}>{cat.name}</option>
                   ))}
                 </select>
               </div>
            </div>

            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Short Description</label>
              <textarea 
                required value={shortDescription} onChange={(e) => setShortDescription(e.target.value)}
                className="w-full mt-2 px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-medium text-brand-blue focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red min-h-[100px]"
                placeholder="A brief summary for the services grid..."
              />
            </div>
          </div>

          <div className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-sm">
             <div className="flex items-center justify-between mb-6">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Sub-Services / Functional Offerings</label>
                <button type="button" onClick={addSubService} className="text-xs font-bold text-brand-blue hover:text-brand-red flex items-center gap-1 transition-colors">
                  <Plus className="w-3 h-3" /> Add Item
                </button>
             </div>
             
             <div className="space-y-4">
               {subServices.map((sub, index) => (
                 <div key={index} className="flex gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100 relative group">
                    {/* Image Preview/Upload */}
                    <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-white border border-gray-200 shrink-0">
                      {sub.image ? (
                        <Image src={sub.image.startsWith('blob:') ? sub.image : sub.image} alt={sub.name} fill className="object-cover" />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-gray-300">
                           <ImageIcon className="w-6 h-6" />
                        </div>
                      )}
                      <input 
                        type="file" accept="image/*" 
                        onChange={(e) => e.target.files?.[0] && handleSubServiceFileChange(index, e.target.files[0])}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        required={!sub.image}
                      />
                    </div>
                    
                    {/* Details */}
                    <div className="flex-1 space-y-2">
                       <input 
                         type="text" value={sub.name} onChange={(e) => handleSubServiceChange(index, "name", e.target.value)}
                         placeholder="Sub-service Name" required
                         className="w-full px-4 py-2 bg-white border border-gray-100 rounded-xl text-sm font-medium text-brand-blue focus:outline-none focus:border-brand-red"
                       />
                       <p className="text-[10px] text-gray-400">Click the image box to upload a unique image for this offering.</p>
                    </div>

                    {/* Delete Button */}
                    <button type="button" onClick={() => removeSubService(index)} className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white border border-gray-200 text-gray-400 hover:text-red-500 shadow-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                      <X className="w-3 h-3" />
                    </button>
                 </div>
               ))}
               {subServices.length === 0 && (
                 <div className="text-center py-8 text-sm text-gray-400">No sub-services added. Add some offerings to showcase your expertise.</div>
               )}
             </div>
          </div>

          <div className="bg-white rounded-[32px] overflow-hidden border border-gray-100 shadow-sm" data-color-mode="light">
            <div className="p-6 border-b border-gray-50">
               <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Detailed Content</label>
            </div>
            <MDEditor
              value={content}
              onChange={(val) => setContent(val || "")}
              height={500}
              preview="edit"
              className="!border-0 rounded-b-[32px] !shadow-none font-sans"
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Main Cover Image */}
          <div className="bg-white rounded-[32px] p-6 border border-gray-100 shadow-sm">
             <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1 mb-4 block">Main Cover Image</label>
             <div className="relative aspect-video rounded-2xl overflow-hidden bg-gray-50 border-2 border-dashed border-gray-200 hover:border-brand-red/30 transition-colors group">
               {coverImage ? (
                 <>
                   <Image src={coverImage.startsWith('blob:') ? coverImage : coverImage} alt="Cover" fill className="object-cover" />
                   <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                     <span className="text-white text-xs font-bold uppercase tracking-widest">Change Image</span>
                   </div>
                 </>
               ) : (
                 <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                    <ImageIcon className="w-8 h-8 mb-2 opacity-50" />
                    <span className="text-xs font-medium">Upload Image</span>
                 </div>
               )}
               <input 
                 type="file" accept="image/*" onChange={handleCoverChange} required={!coverImage}
                 className="absolute inset-0 opacity-0 cursor-pointer"
               />
             </div>
          </div>

          <div className="bg-white rounded-[32px] p-6 border border-gray-100 shadow-sm">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1 mb-4 block">Settings</label>
            <div>
               <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Display Position</label>
               <input 
                 type="number" value={position} onChange={(e) => setPosition(parseInt(e.target.value) || 0)}
                 className="w-full mt-2 px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-medium text-brand-blue focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red"
               />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
