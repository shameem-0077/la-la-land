"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Save, Camera, UploadCloud, Layers, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";

export default function CategoryFormPage() {
  const router = useRouter();
  const params = useParams();
  const isEdit = !!params.id;
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    cover_image: ""
  });

  useEffect(() => {
    if (isEdit) {
      fetchCategory();
    }
  }, [isEdit]);

  const fetchCategory = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("RideCategory")
      .select("*")
      .eq("id", params.id)
      .single();

    if (!error && data) {
      setFormData(data);
    }
    setIsLoading(false);
  };

  const uploadToStorage = async (file: File) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `cat_${Math.random()}.${fileExt}`;
    const filePath = `categories/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('ride-images')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from('ride-images')
      .getPublicUrl(filePath);

    return publicUrl;
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const url = await uploadToStorage(file);
      setFormData(prev => ({ ...prev, cover_image: url }));
    } catch (error: any) {
      alert("Upload failed: " + error.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = isEdit 
        ? await supabase.from("RideCategory").update(formData).eq("id", params.id)
        : await supabase.from("RideCategory").insert([formData]);

      if (error) throw error;
      router.push("/admin/rides/categories");
    } catch (error: any) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-20">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/admin/rides/categories" className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-600 transition-all shadow-sm">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight">
              {isEdit ? "Edit Category" : "New Category"}
            </h1>
            <p className="text-slate-500 text-xs uppercase tracking-widest mt-1">Classification Manager</p>
          </div>
        </div>
        <button onClick={handleSubmit} disabled={isLoading || isUploading} className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-300 text-white px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-xl shadow-blue-600/20">
          {isLoading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
          {isEdit ? "Update Category" : "Save Category"}
        </button>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-200 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] text-slate-400 uppercase tracking-widest ml-1">Category Name</label>
                <input 
                  value={formData.name} 
                  onChange={(e) => {
                    const name = e.target.value;
                    const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
                    setFormData(prev => ({ ...prev, name, slug: isEdit ? prev.slug : slug }));
                  }} 
                  className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 text-sm font-medium" 
                  placeholder="e.g. Roller Coasters" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] text-slate-400 uppercase tracking-widest ml-1">Slug</label>
                <input 
                  value={formData.slug} 
                  onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))} 
                  className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 text-sm font-medium" 
                />
              </div>
           </div>

           <div className="flex flex-col items-center justify-center p-8 bg-slate-50 rounded-[30px] border border-dashed border-slate-200 relative group min-h-[200px]">
              {isUploading ? (
                <div className="flex flex-col items-center">
                   <UploadCloud className="w-8 h-8 text-blue-500 animate-bounce mb-2" />
                   <p className="text-[10px] uppercase font-black tracking-widest text-slate-400">Uploading...</p>
                </div>
              ) : formData.cover_image ? (
                <div className="relative w-full h-full min-h-[160px] rounded-2xl overflow-hidden">
                   <img src={formData.cover_image} className="w-full h-full object-cover" />
                   <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                     <Camera className="w-8 h-8 text-white" />
                   </div>
                </div>
              ) : (
                <div className="flex flex-col items-center text-slate-300">
                   <ImageIcon className="w-10 h-10 mb-2" />
                   <p className="text-[10px] uppercase font-black tracking-widest text-center">Click to upload<br />Category Image</p>
                </div>
              )}
              <input type="file" onChange={handleFileUpload} className="absolute inset-0 opacity-0 cursor-pointer" />
           </div>
        </div>
      </motion.div>
    </div>
  );
}
