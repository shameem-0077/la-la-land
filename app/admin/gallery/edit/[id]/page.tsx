"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Save, Image as ImageIcon, Camera, UploadCloud, X, Trash2 } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function EditGalleryPage() {
  const router = useRouter();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: "",
    sub_title: "General",
    image: ""
  });

  useEffect(() => {
    if (id) fetchGalleryItem();
  }, [id]);

  const fetchGalleryItem = async () => {
    try {
      const { data, error } = await supabase
        .from("Gallery")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      if (data) setFormData(data);
    } catch (err: any) {
      alert(err.message || "Failed to fetch gallery item");
      router.push("/admin/gallery");
    } finally {
      setIsLoading(false);
    }
  };

  const uploadToStorage = async (file: File) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `gallery/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('la-la-gallery')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from('la-la-gallery')
      .getPublicUrl(filePath);

    return publicUrl;
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const url = await uploadToStorage(file);
      setFormData(prev => ({ ...prev, image: url }));
    } catch (err: any) {
      alert("Upload failed: " + err.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.image) {
      alert("Please upload an image.");
      return;
    }
    setIsSaving(true);

    try {
      const { error } = await supabase
        .from("Gallery")
        .update(formData)
        .eq("id", id);

      if (error) throw error;
      router.push("/admin/gallery");
      router.refresh();
    } catch (err: any) {
      alert(err.message || "Failed to update image");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this gallery item?")) {
      try {
        const { error } = await supabase
          .from("Gallery")
          .delete()
          .eq("id", id);
        
        if (error) throw error;
        router.push("/admin/gallery");
      } catch (err: any) {
        alert(err.message || "Failed to delete item");
      }
    }
  };

  if (isLoading) return <div className="flex items-center justify-center min-h-[400px] text-xs uppercase tracking-widest text-slate-400">Loading Image Data...</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      <div className="flex items-center justify-between">
        <Link href="/admin/gallery" className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors group">
          <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center group-hover:-translate-x-1 transition-transform">
            <ArrowLeft className="w-5 h-5" />
          </div>
          <span className="text-xs font-black uppercase tracking-widest">Back to Gallery</span>
        </Link>

        <button 
          onClick={handleDelete}
          className="flex items-center gap-2 text-red-400 hover:text-red-600 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
          <span className="text-[10px] font-black uppercase tracking-widest">Remove Item</span>
        </button>
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight mb-2">Edit Gallery Item</h1>
          <p className="text-slate-500 text-sm">Update the image details and layout</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 md:p-10 rounded-[32px] md:rounded-[40px] shadow-sm border border-slate-200">
             <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] text-slate-400 uppercase tracking-widest ml-1 font-bold">Image Title</label>
                  <input 
                    type="text" 
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-sm"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] text-slate-400 uppercase tracking-widest ml-1 font-bold">Sub Title / Category</label>
                    <input 
                      type="text"
                      value={formData.sub_title}
                      onChange={(e) => setFormData({ ...formData, sub_title: e.target.value })}
                      className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-sm"
                    />
                  </div>
                </div>
             </div>
          </div>

          <div className="bg-white p-8 md:p-10 rounded-[32px] md:rounded-[40px] shadow-sm border border-slate-200">
            <label className="text-[10px] text-slate-400 uppercase tracking-widest ml-1 font-bold mb-4 block">Update Media</label>
            <div className={`relative aspect-video rounded-3xl border-2 border-dashed transition-all flex flex-col items-center justify-center gap-4 overflow-hidden ${formData.image ? 'border-emerald-200 bg-emerald-50/10' : 'border-slate-200 bg-slate-50 hover:border-blue-400'}`}>
               {isUploading ? (
                 <div className="flex flex-col items-center gap-4">
                    <UploadCloud className="w-12 h-12 text-blue-500 animate-bounce" />
                    <p className="text-[10px] font-bold uppercase tracking-widest text-blue-500">Syncing to cloud...</p>
                 </div>
               ) : formData.image ? (
                 <>
                   <img src={formData.image} className="w-full h-full object-cover" />
                   <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="relative">
                         <button type="button" className="bg-white text-slate-900 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                            <Camera className="w-4 h-4" /> Change Image
                         </button>
                         <input type="file" onChange={handleFileUpload} className="absolute inset-0 opacity-0 cursor-pointer" />
                      </div>
                   </div>
                 </>
               ) : (
                 <>
                   <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-sm text-slate-300">
                      <Camera className="w-8 h-8" />
                   </div>
                   <input type="file" onChange={handleFileUpload} className="absolute inset-0 opacity-0 cursor-pointer" />
                 </>
               )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
           <div className="bg-slate-900 p-8 rounded-[40px] text-white space-y-6">
              <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Preview Card</p>
              <div className="relative rounded-3xl overflow-hidden bg-white/5 border border-white/10 aspect-square">
                 {formData.image && <img src={formData.image} className="w-full h-full object-cover opacity-60" />}
                 <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <span className="text-[8px] text-white/50 uppercase tracking-[0.2em] mb-1">{formData.sub_title}</span>
                    <h4 className="text-lg font-black uppercase tracking-tight">{formData.title}</h4>
                 </div>
              </div>
           </div>

           <button 
             type="submit"
             disabled={isSaving || isUploading}
             className="w-full py-5 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-300 text-white rounded-[24px] text-xs font-black uppercase tracking-widest shadow-xl shadow-blue-600/20 transition-all flex items-center justify-center gap-3"
           >
             {isSaving ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
             Update Changes
           </button>
        </div>
      </form>
    </div>
  );
}
