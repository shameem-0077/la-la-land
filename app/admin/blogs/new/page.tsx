"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import { 
  ArrowLeft, 
  Save, 
  Camera, 
  UploadCloud, 
  Type,
  Layout,
  Info,
  User,
  Tag,
  FileText,
  AlignLeft,
  X
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";

export default function BlogFormPage() {
  const router = useRouter();
  const params = useParams();
  const isEdit = !!params.id;
  const editorRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    sub_description: "",
    content: "",
    cover_image: "",
    category: "Thrills",
    author: "",
    tags: ""
  });

  useEffect(() => {
    if (isEdit) {
      fetchBlogData();
    }
  }, [isEdit]);

  const fetchBlogData = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("Blog")
      .select("*")
      .eq("id", params.id)
      .single();

    if (!error && data) {
      setFormData(data);
      if (editorRef.current) {
        editorRef.current.innerHTML = data.content || "";
      }
    }
    setIsLoading(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === "title" && !isEdit) {
      // Slug removed from schema
    }
  };

  const uploadToStorage = async (file: File) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `blog_${Math.random()}.${fileExt}`;
    const filePath = `blogs/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('blog-media')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from('blog-media')
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
        ? await supabase.from("Blog").update(formData).eq("id", params.id)
        : await supabase.from("Blog").insert([formData]);

      if (error) throw error;
      router.push("/admin/blogs");
    } catch (error: any) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/admin/blogs" className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-600 transition-all shadow-sm">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight">
              {isEdit ? "Edit Post" : "New Story"}
            </h1>
            <p className="text-slate-500 text-xs uppercase tracking-widest mt-1">Adventure Journal Content</p>
          </div>
        </div>
        <button onClick={handleSubmit} disabled={isLoading} className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-300 text-white px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-xl shadow-blue-600/20">
          {isLoading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
          {isEdit ? "Update Article" : "Publish Story"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Editor */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-200 space-y-6">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-900 flex items-center gap-2">
              <Type className="w-4 h-4 text-blue-500" /> Content Editor
            </h3>
            
            <div className="space-y-2">
              <label className="text-[10px] text-slate-400 uppercase tracking-widest ml-1">Article Title</label>
              <input name="title" value={formData.title} onChange={handleInputChange} className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 text-xl font-black uppercase tracking-tight focus:bg-white transition-all" placeholder="Enter a catchy title..." />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] text-slate-400 uppercase tracking-widest ml-1">Short Sub-Description</label>
              <textarea name="sub_description" value={formData.sub_description} onChange={handleInputChange} rows={3} className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 text-sm font-medium resize-none focus:bg-white transition-all" placeholder="Briefly describe what this article is about..." />
            </div>

            <div className="space-y-4">
              <label className="text-[10px] text-slate-400 uppercase tracking-widest ml-1">Main Content (Rich Text)</label>
              <div className="border border-slate-200 rounded-3xl overflow-hidden bg-slate-50 focus-within:bg-white transition-all">
                <div className="flex items-center gap-1 p-2 border-b border-slate-100 bg-slate-50/50">
                  <button type="button" onClick={() => document.execCommand('bold')} className="p-2 hover:bg-slate-200 rounded-lg text-slate-600"><span className="font-bold">B</span></button>
                  <button type="button" onClick={() => document.execCommand('italic')} className="p-2 hover:bg-slate-200 rounded-lg text-slate-600"><span className="italic">I</span></button>
                  <button type="button" onClick={() => document.execCommand('underline')} className="p-2 hover:bg-slate-200 rounded-lg text-slate-600"><span className="underline">U</span></button>
                  <div className="w-px h-4 bg-slate-200 mx-1" />
                  <button type="button" onClick={() => document.execCommand('insertUnorderedList')} className="p-2 hover:bg-slate-200 rounded-lg text-slate-600 text-xs font-bold">UL</button>
                  <button type="button" onClick={() => document.execCommand('insertOrderedList')} className="p-2 hover:bg-slate-200 rounded-lg text-slate-600 text-xs font-bold">OL</button>
                </div>
                <div 
                  ref={editorRef}
                  contentEditable 
                  suppressContentEditableWarning
                  onBlur={() => {
                    if (editorRef.current) {
                      setFormData(prev => ({ ...prev, content: editorRef.current?.innerHTML || "" }));
                    }
                  }}
                  className="w-full px-6 py-4 min-h-[400px] text-sm font-medium leading-relaxed focus:outline-none bg-white"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Settings */}
        <div className="space-y-8">
           {/* Image Upload */}
           <div className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-200 space-y-6">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-900 flex items-center gap-2">
                <Camera className="w-4 h-4 text-purple-500" /> Featured Image
              </h3>
              <div className="relative group aspect-video bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 overflow-hidden flex items-center justify-center">
                 {isUploading ? (
                   <div className="flex flex-col items-center gap-2 text-blue-500">
                      <UploadCloud className="w-8 h-8 animate-bounce" />
                      <p className="text-[10px] font-black uppercase">Uploading...</p>
                   </div>
                 ) : formData.cover_image ? (
                   <>
                     <img src={formData.cover_image} className="w-full h-full object-cover" />
                     <button onClick={() => setFormData(prev => ({ ...prev, cover_image: "" }))} className="absolute top-4 right-4 w-8 h-8 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-red-500 shadow-lg opacity-0 group-hover:opacity-100 transition-all">
                       <X className="w-4 h-4" />
                     </button>
                   </>
                 ) : (
                   <label className="w-full h-full flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-slate-100 transition-all">
                      <UploadCloud className="w-8 h-8 text-slate-300" />
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Click to upload</p>
                      <input type="file" onChange={handleFileUpload} className="hidden" accept="image/*" />
                   </label>
                 )}
              </div>
           </div>

           {/* Metadata */}
           <div className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-200 space-y-6">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-900 flex items-center gap-2">
                <Tag className="w-4 h-4 text-emerald-500" /> Metadata
              </h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] text-slate-400 uppercase tracking-widest ml-1">Tags (Comma separated)</label>
                  <input name="tags" value={formData.tags} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 text-sm font-medium" placeholder="Adventure, Thrills, Family" />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] text-slate-400 uppercase tracking-widest ml-1">Category</label>
                  <input 
                    name="category" 
                    value={formData.category} 
                    onChange={handleInputChange} 
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 text-sm font-medium" 
                    placeholder="e.g. Thrills, Family" 
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] text-slate-400 uppercase tracking-widest ml-1">Author Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input name="author" value={formData.author} onChange={handleInputChange} className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-100 text-sm font-medium" placeholder="Aditi Sharma" />
                  </div>
                </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
