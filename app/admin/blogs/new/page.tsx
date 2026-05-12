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
  X,
  Search,
  Check,
  Grid
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
  const [categories, setCategories] = useState<any[]>([]);
  const [showMediaLibrary, setShowMediaLibrary] = useState(false);
  const [libraryItems, setLibraryItems] = useState<any[]>([]);
  const [isLoadingLibrary, setIsLoadingLibrary] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    sub_description: "",
    content: "",
    cover_image: "",
    category_id: "",
    author: "",
    tags: ""
  });

  useEffect(() => {
    fetchCategories();
    if (isEdit) {
      fetchBlogData();
    }
  }, [isEdit]);

  const fetchCategories = async () => {
    const { data } = await supabase.from("BlogCategory").select("id, name").order("name");
    if (data) setCategories(data);
  };

  const fetchLibraryItems = async () => {
    setIsLoadingLibrary(true);
    try {
      const { data, error } = await supabase.storage
        .from('blog-media')
        .list('blogs', {
          limit: 100,
          offset: 0,
          sortBy: { column: 'name', order: 'desc' },
        });

      if (error) throw error;

      const itemsWithUrls = data.map(file => {
        const { data: { publicUrl } } = supabase.storage
          .from('blog-media')
          .getPublicUrl(`blogs/${file.name}`);
        return { ...file, url: publicUrl };
      });

      setLibraryItems(itemsWithUrls);
    } catch (error: any) {
      console.error("Error fetching library:", error.message);
    } finally {
      setIsLoadingLibrary(false);
    }
  };

  useEffect(() => {
    if (showMediaLibrary) {
      fetchLibraryItems();
    }
  }, [showMediaLibrary]);

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
      const generatedSlug = value.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
      setFormData(prev => ({ ...prev, title: value, slug: generatedSlug }));
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
            <p className="text-slate-500 text-xs uppercase tracking-widest mt-1"> Journal Content</p>
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
              <label className="text-[10px] text-slate-400 uppercase tracking-widest ml-1">Slug (URL friendly)</label>
              <input name="slug" value={formData.slug} onChange={handleInputChange} className="w-full px-6 py-4 rounded-2xl bg-slate-100 border border-slate-100 text-xs font-mono text-slate-500 focus:bg-white transition-all" placeholder="article-slug-here" />
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
                     <button type="button" onClick={() => setFormData(prev => ({ ...prev, cover_image: "" }))} className="absolute top-4 right-4 w-8 h-8 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-red-500 shadow-lg opacity-0 group-hover:opacity-100 transition-all">
                       <X className="w-4 h-4" />
                     </button>
                   </>
                 ) : (
                   <div className="w-full h-full flex flex-col items-center justify-center gap-4">
                      <button 
                        type="button"
                        onClick={() => setShowMediaLibrary(true)}
                        className="flex flex-col items-center gap-2 text-slate-400 hover:text-blue-600 transition-all"
                      >
                        <Grid className="w-8 h-8" />
                        <p className="text-[10px] font-black uppercase tracking-widest">Media Library</p>
                      </button>
                      <div className="w-12 h-px bg-slate-100" />
                      <label className="flex flex-col items-center gap-2 cursor-pointer text-slate-300 hover:text-blue-500 transition-all">
                        <UploadCloud className="w-8 h-8" />
                        <p className="text-[10px] font-black uppercase tracking-widest">Upload New</p>
                        <input type="file" onChange={handleFileUpload} className="hidden" accept="image/*" />
                      </label>
                   </div>
                 )}
              </div>
           </div>

           {/* Media Library Modal */}
           {showMediaLibrary && (
             <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
               <motion.div 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 onClick={() => setShowMediaLibrary(false)}
                 className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
               />
               <motion.div 
                 initial={{ opacity: 0, scale: 0.95, y: 20 }}
                 animate={{ opacity: 1, scale: 1, y: 0 }}
                 className="relative w-full max-w-5xl bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
               >
                 <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <div>
                      <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Media Library</h2>
                      <p className="text-xs text-slate-500 uppercase tracking-widest mt-1">Select an existing asset or upload new</p>
                    </div>
                    <button onClick={() => setShowMediaLibrary(false)} className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-red-500 transition-all">
                      <X className="w-5 h-5" />
                    </button>
                 </div>

                 <div className="flex-grow overflow-y-auto p-8">
                   {isLoadingLibrary ? (
                     <div className="h-64 flex flex-col items-center justify-center gap-4 text-blue-500">
                        <div className="w-12 h-12 border-4 border-blue-100 border-t-blue-500 rounded-full animate-spin" />
                        <p className="text-[10px] font-black uppercase tracking-widest">Loading assets...</p>
                     </div>
                   ) : (
                     <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {/* Upload Trigger in Grid */}
                        <label className="aspect-square rounded-3xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-slate-50 hover:border-blue-300 transition-all group">
                          <UploadCloud className="w-8 h-8 text-slate-300 group-hover:text-blue-500 transition-colors" />
                          <p className="text-[10px] font-black text-slate-400 group-hover:text-blue-600 uppercase tracking-widest">Upload New</p>
                          <input type="file" onChange={(e) => { handleFileUpload(e); setShowMediaLibrary(false); }} className="hidden" accept="image/*" />
                        </label>

                        {libraryItems.map((item, index) => (
                          <div 
                            key={index}
                            onClick={() => {
                              setFormData(prev => ({ ...prev, cover_image: item.url }));
                              setShowMediaLibrary(false);
                            }}
                            className="group relative aspect-square rounded-3xl overflow-hidden bg-slate-100 cursor-pointer border-4 border-transparent hover:border-blue-500 transition-all"
                          >
                            <img src={item.url} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/20 transition-all flex items-center justify-center">
                               <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100 shadow-xl">
                                  <Check className="w-5 h-5" />
                               </div>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
                               <p className="text-[8px] font-bold text-white uppercase truncate">{item.name}</p>
                            </div>
                          </div>
                        ))}
                     </div>
                   )}
                 </div>
               </motion.div>
             </div>
           )}

           {/* Metadata */}
           <div className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-200 space-y-6">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-900 flex items-center gap-2">
                <Tag className="w-4 h-4 text-emerald-500" /> Metadata
              </h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] text-slate-400 uppercase tracking-widest ml-1">Tags (Comma separated)</label>
                  <input name="tags" value={formData.tags} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 text-sm font-medium" placeholder=", Thrills, Family" />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] text-slate-400 uppercase tracking-widest ml-1">Category</label>
                  <select 
                    name="category_id" 
                    value={formData.category_id} 
                    onChange={handleInputChange} 
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 text-sm font-medium focus:bg-white transition-all outline-none appearance-none"
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
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
