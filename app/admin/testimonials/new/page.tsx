"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Star, User, Quote, Shield, Camera, UploadCloud, X, Grid, Check } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";

export default function NewTestimonialPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [showMediaLibrary, setShowMediaLibrary] = useState(false);
  const [libraryItems, setLibraryItems] = useState<any[]>([]);
  const [isLoadingLibrary, setIsLoadingLibrary] = useState(false);
  const [formData, setFormData] = useState({
    author_name: "",
    author_designation: "Visitor",
    content: "",
    rating: 5,
    author_profile: ""
  });

  const uploadToStorage = async (file: File) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `profiles/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('testimonial-profiles')
      .upload(filePath, file);

    if (uploadError) {
      throw uploadError;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('testimonial-profiles')
      .getPublicUrl(filePath);

    return publicUrl;
  };

  const fetchLibraryItems = async () => {
    setIsLoadingLibrary(true);
    try {
      const { data, error } = await supabase.storage
        .from('testimonial-profiles')
        .list('profiles', {
          limit: 100,
          offset: 0,
          sortBy: { column: 'name', order: 'desc' },
        });

      if (error) throw error;

      const itemsWithUrls = data.map(file => {
        const { data: { publicUrl } } = supabase.storage
          .from('testimonial-profiles')
          .getPublicUrl(`profiles/${file.name}`);
        return { ...file, url: publicUrl };
      });

      setLibraryItems(itemsWithUrls);
    } catch (error: any) {
      console.error("Error fetching library:", error.message);
    } finally {
      setIsLoadingLibrary(false);
    }
  };

  React.useEffect(() => {
    if (showMediaLibrary) {
      fetchLibraryItems();
    }
  }, [showMediaLibrary]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const url = await uploadToStorage(file);
      setFormData(prev => ({ ...prev, author_profile: url }));
    } catch (err: any) {
      alert("Upload failed: " + err.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase
        .from("Testimonial")
        .insert([formData]);

      if (error) throw error;
      
      router.push("/admin/testimonials");
      router.refresh();
    } catch (err: any) {
      alert(err.message || "Failed to create testimonial");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      <div className="flex items-center justify-between">
        <Link 
          href="/admin/testimonials" 
          className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors group"
        >
          <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center group-hover:-translate-x-1 transition-transform">
            <ArrowLeft className="w-5 h-5" />
          </div>
          <span className="text-xs font-black uppercase tracking-widest">Back to Listing</span>
        </Link>
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight mb-2">Add Testimonial</h1>
          <p className="text-slate-500 text-sm">Create a new visitor review for the website</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 md:p-10 rounded-[32px] md:rounded-[40px] shadow-sm border border-slate-200">
             <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] text-slate-400 uppercase tracking-widest ml-1 font-bold">Author Name</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. John Doe"
                      value={formData.author_name}
                      onChange={(e) => setFormData({ ...formData, author_name: e.target.value })}
                      className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] text-slate-400 uppercase tracking-widest ml-1 font-bold">Designation</label>
                    <input 
                      type="text"
                      placeholder="e.g. Visitor"
                      value={formData.author_designation}
                      onChange={(e) => setFormData({ ...formData, author_designation: e.target.value })}
                      className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] text-slate-400 uppercase tracking-widest ml-1 font-bold">Rating</label>
                  <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-2xl w-fit border border-slate-100">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setFormData({ ...formData, rating: num })}
                        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                          formData.rating >= num 
                            ? "bg-yellow-400 text-white shadow-lg shadow-yellow-400/30" 
                            : "bg-white text-slate-300 hover:text-slate-400"
                        }`}
                      >
                        <Star className={`w-5 h-5 ${formData.rating >= num ? "fill-current" : ""}`} />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] text-slate-400 uppercase tracking-widest ml-1 font-bold">Testimonial Content</label>
                  <textarea 
                    required
                    rows={6}
                    placeholder="What did they say about the park?"
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-sm resize-none"
                  />
                </div>
             </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm space-y-6">
            <div className="space-y-4">
              <label className="text-[10px] text-slate-400 uppercase tracking-widest ml-1 font-bold text-center block">Author Profile Image</label>
              <div className="flex flex-col items-center gap-6">
                <div className="relative group w-32 h-32 rounded-full bg-slate-50 border-2 border-dashed border-slate-200 overflow-hidden flex items-center justify-center">
                    {isUploading ? <UploadCloud className="w-8 h-8 text-blue-500 animate-bounce" /> : formData.author_profile ? <img src={formData.author_profile} className="w-full h-full object-cover" /> : <Camera className="w-8 h-8 text-slate-200" />}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                       <button type="button" onClick={() => setShowMediaLibrary(true)} className="w-8 h-8 rounded-full bg-white text-blue-600 flex items-center justify-center hover:scale-110 transition-transform"><Grid className="w-4 h-4" /></button>
                       <label className="w-8 h-8 rounded-full bg-white text-slate-600 flex items-center justify-center hover:scale-110 transition-transform cursor-pointer">
                          <UploadCloud className="w-4 h-4" />
                          <input type="file" onChange={handleFileUpload} className="hidden" accept="image/*" />
                       </label>
                    </div>
                </div>
                <div className="text-center">
                  <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest leading-relaxed mb-1">
                    {formData.author_profile ? "Photo Selected" : "No Photo"}
                  </p>
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest leading-relaxed">
                    {isUploading ? "Uploading..." : "Library or Upload"}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] text-slate-400 uppercase tracking-widest ml-1 font-bold">Or Profile URL</label>
              <input 
                type="url" 
                placeholder="https://..."
                value={formData.author_profile}
                onChange={(e) => setFormData({ ...formData, author_profile: e.target.value })}
                className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-sm"
              />
            </div>

            <div className="pt-4 border-t border-slate-50">
              <button 
                type="submit"
                disabled={isLoading || isUploading}
                className="w-full py-5 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-300 text-white rounded-[20px] text-xs font-black uppercase tracking-widest shadow-xl shadow-blue-600/20 transition-all flex items-center justify-center gap-3"
              >
                {isLoading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
                Publish Testimonial
              </button>
            </div>
          </div>
        </div>
      </form>

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
                 <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Testimonial Media Library</h2>
                 <p className="text-xs text-slate-500 uppercase tracking-widest mt-1">Select an existing profile photo or upload new</p>
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
                         setFormData(prev => ({ ...prev, author_profile: item.url }));
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
    </div>
  );
}
