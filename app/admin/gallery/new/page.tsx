"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Image as ImageIcon, Camera, UploadCloud, X, Grid, Check } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";

export default function NewGalleryPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [showMediaLibrary, setShowMediaLibrary] = useState(false);
  const [libraryItems, setLibraryItems] = useState<any[]>([]);
  const [isLoadingLibrary, setIsLoadingLibrary] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    sub_title: "General",
    image: ""
  });

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

  const fetchLibraryItems = async () => {
    setIsLoadingLibrary(true);
    try {
      const { data, error } = await supabase.storage
        .from('la-la-gallery')
        .list('gallery', {
          limit: 100,
          offset: 0,
          sortBy: { column: 'name', order: 'desc' },
        });

      if (error) throw error;

      const itemsWithUrls = data.map(file => {
        const { data: { publicUrl } } = supabase.storage
          .from('la-la-gallery')
          .getPublicUrl(`gallery/${file.name}`);
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
      alert("Please upload an image first.");
      return;
    }
    setIsLoading(true);

    try {
      const { error } = await supabase
        .from("Gallery")
        .insert([formData]);

      if (error) throw error;
      router.push("/admin/gallery");
    } catch (err: any) {
      alert(err.message || "Failed to save image");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      <div className="flex items-center justify-between">
        <Link href="/admin/gallery" className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors group">
          <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center group-hover:-translate-x-1 transition-transform">
            <ArrowLeft className="w-5 h-5" />
          </div>
          <span className="text-xs font-black uppercase tracking-widest">Back to Gallery</span>
        </Link>
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight mb-2">Add to Gallery</h1>
          <p className="text-slate-500 text-sm">Upload a new moment for the visitor tour</p>
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
                    placeholder="e.g. Sunset at the Park"
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
                      placeholder="e.g. Rides & Fun"
                      value={formData.sub_title}
                      onChange={(e) => setFormData({ ...formData, sub_title: e.target.value })}
                      className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-sm"
                    />
                  </div>
                </div>
             </div>
          </div>

            <div className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-200 space-y-6">
               <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-900 flex items-center gap-2">
                 <Camera className="w-4 h-4 text-purple-500" /> Featured Image
               </h3>
               <div className="relative group aspect-[4/5] bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 overflow-hidden flex items-center justify-center">
                  {isUploading ? (
                    <div className="flex flex-col items-center gap-2 text-blue-500">
                       <UploadCloud className="w-8 h-8 animate-bounce" />
                       <p className="text-[10px] font-black uppercase">Uploading...</p>
                    </div>
                  ) : formData.image ? (
                    <>
                      <img src={formData.image} className="w-full h-full object-cover" />
                      <button type="button" onClick={() => setFormData(prev => ({ ...prev, image: "" }))} className="absolute top-4 right-4 w-8 h-8 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-red-500 shadow-lg opacity-0 group-hover:opacity-100 transition-all">
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
         </div>

        <div className="space-y-6">
           <div className="bg-slate-900 p-8 rounded-[40px] text-white space-y-6">
              <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Preview Card</p>
              <div className="relative rounded-3xl overflow-hidden bg-white/5 border border-white/10 aspect-square">
                 {formData.image && <img src={formData.image} className="w-full h-full object-cover opacity-60" />}
                 <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <span className="text-[8px] text-white/50 uppercase tracking-[0.2em] mb-1">{formData.sub_title}</span>
                    <h4 className="text-lg font-black uppercase tracking-tight">{formData.title || 'Your Title Here'}</h4>
                 </div>
              </div>
           </div>

           <button 
             type="submit"
             disabled={isLoading || isUploading}
             className="w-full py-5 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-300 text-white rounded-[24px] text-xs font-black uppercase tracking-widest shadow-xl shadow-blue-600/20 transition-all flex items-center justify-center gap-3"
           >
             {isLoading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
             Publish to Gallery
           </button>
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
                 <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Gallery Media Library</h2>
                 <p className="text-xs text-slate-500 uppercase tracking-widest mt-1">Select an existing photo or upload new</p>
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
                         setFormData(prev => ({ ...prev, image: item.url }));
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
