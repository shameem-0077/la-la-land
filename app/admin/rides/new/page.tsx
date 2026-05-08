"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { 
  ArrowLeft, 
  Save, 
  Image as ImageIcon, 
  Plus, 
  Trash2, 
  Type,
  Layout,
  Info,
  ShieldCheck,
  Star,
  Camera,
  X,
  UploadCloud
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";

export default function RideFormPage() {
  const router = useRouter();
  const params = useParams();
  const isEdit = !!params.id;
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");

  const [categories, setCategories] = useState<any[]>([]);

  // Main Ride Data
  const [formData, setFormData] = useState({
    title: "",
    sub_title: "",
    slug: "",
    category_id: "", // Added foreign key
    age_category: "",
    about_title: "",
    about_description: "",
    ride_tag: "",
    cover_image: "" 
  });

  // Related Data (Features & Images)
  const [features, setFeatures] = useState<any[]>([]);
  const [rideImages, setRideImages] = useState<any[]>([]); // Gallery Images

  useEffect(() => {
    fetchCategories();
    if (isEdit) {
      fetchRideData();
    }
  }, [isEdit]);

  const fetchCategories = async () => {
    const { data } = await supabase.from("RideCategory").select("id, name").order("name");
    if (data) setCategories(data);
  };

  const fetchRideData = async () => {
    setIsLoading(true);
    const { data: rideData, error: rideError } = await supabase
      .from("Ride")
      .select("*")
      .eq("id", params.id)
      .single();

    if (!rideError && rideData) {
      setFormData(rideData);
      
      const { data: featureData } = await supabase
        .from("RideFeature")
        .select("*")
        .eq("ride_id", params.id);
      if (featureData) setFeatures(featureData);

      const { data: imageData } = await supabase
        .from("RideImage")
        .select("*")
        .eq("ride_id", params.id);
      if (imageData) setRideImages(imageData.map(img => ({ ...img, url: img.image })));
    }
    setIsLoading(false);
  };

  // Helper to upload to Supabase Storage
  const uploadToStorage = async (file: File) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `rides/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('ride-images')
      .upload(filePath, file);

    if (uploadError) {
      throw uploadError;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('ride-images')
      .getPublicUrl(filePath);

    return publicUrl;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (name === "title" && !isEdit) {
      const slug = value.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
      setFormData(prev => ({ ...prev, slug }));
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: string, isCollection: boolean = false, index?: number) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    try {
      if (field === "gallery") {
        const uploadPromises = Array.from(files).map(file => uploadToStorage(file));
        const urls = await Promise.all(uploadPromises);
        setRideImages(prev => [...prev, ...urls.map(url => ({ image: url, url }))]);
      } else {
        const file = files[0];
        const url = await uploadToStorage(file);
        
        if (field === "cover_image") {
          setFormData(prev => ({ ...prev, cover_image: url }));
        } else if (isCollection && field === "feature_icon" && index !== undefined) {
          const newFeatures = [...features];
          newFeatures[index].icon = url;
          setFeatures(newFeatures);
        }
      }
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
      const { data: savedRide, error: rideError } = isEdit 
        ? await supabase.from("Ride").update(formData).eq("id", params.id).select().single()
        : await supabase.from("Ride").insert([formData]).select().single();

      if (rideError) throw rideError;
      const rideId = savedRide.id;

      if (isEdit) {
        await supabase.from("RideFeature").delete().eq("ride_id", rideId);
        await supabase.from("RideImage").delete().eq("ride_id", rideId);
      }

      if (features.length > 0) {
        const featuresToSave = features.map(f => ({ 
          name: f.name, 
          icon: f.icon, 
          ride_id: rideId 
        }));
        await supabase.from("RideFeature").insert(featuresToSave);
      }

      if (rideImages.length > 0) {
        const imagesToSave = rideImages.map(img => ({ 
          image: img.image, 
          ride_id: rideId 
        }));
        await supabase.from("RideImage").insert(imagesToSave);
      }

      router.push("/admin/rides");
    } catch (error: any) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const addFeature = () => setFeatures([...features, { name: "", icon: "" }]);
  const removeFeature = (idx: number) => setFeatures(features.filter((_, i) => i !== idx));
  const removeGalleryImage = (idx: number) => setRideImages(rideImages.filter((_, i) => i !== idx));

  const tabs = [
    { id: "basic", label: "Basic Info", icon: <Type className="w-4 h-4" /> },
    { id: "about", label: "About Section", icon: <Layout className="w-4 h-4" /> },
    { id: "features", label: "Features & Gallery", icon: <Info className="w-4 h-4" /> },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/admin/rides" className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-600 transition-all shadow-sm">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight">
              {isEdit ? "Edit Ride" : "New Ride"}
            </h1>
            <p className="text-slate-500 text-xs uppercase tracking-widest mt-1">Storage-Enabled Manager</p>
          </div>
        </div>
        <button onClick={handleSubmit} disabled={isLoading || isUploading} className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-300 text-white px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-xl shadow-blue-600/20">
          {isLoading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
          {isEdit ? "Update Ride" : "Save Ride"}
        </button>
      </div>

      <div className="flex gap-2 p-1.5 bg-slate-100 rounded-[24px] w-fit">
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-3 px-6 py-3 rounded-[18px] text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab.id ? "bg-white text-blue-600 shadow-sm" : "text-slate-400 hover:text-slate-600"}`}>
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      <div className="space-y-8">
        {activeTab === "basic" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-200 space-y-6">
               <div className="space-y-2">
                 <label className="text-[10px] text-slate-400 uppercase tracking-widest ml-1">Ride Title</label>
                 <input name="title" value={formData.title} onChange={handleInputChange} className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 text-sm font-medium" placeholder="Title" />
               </div>
               <div className="space-y-2">
                 <label className="text-[10px] text-slate-400 uppercase tracking-widest ml-1">Sub Title</label>
                 <input name="sub_title" value={formData.sub_title} onChange={handleInputChange} className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 text-sm font-medium" placeholder="Sub Title" />
               </div>
               <div className="space-y-2">
                 <label className="text-[10px] text-slate-400 uppercase tracking-widest ml-1">Slug</label>
                 <input name="slug" value={formData.slug} onChange={handleInputChange} className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 text-sm font-medium" />
               </div>
            </div>
            <div className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-200 space-y-6">
               <div className="space-y-2">
                 <label className="text-[10px] text-slate-400 uppercase tracking-widest ml-1">Ride Category</label>
                 <select 
                   name="category_id" 
                   value={formData.category_id} 
                   onChange={handleInputChange} 
                   className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/50 appearance-none cursor-pointer"
                 >
                   <option value="">Select Category</option>
                   {categories.map(cat => (
                     <option key={cat.id} value={cat.id}>{cat.name}</option>
                   ))}
                 </select>
               </div>
               <div className="space-y-2">
                 <label className="text-[10px] text-slate-400 uppercase tracking-widest ml-1">Age Category</label>
                 <input name="age_category" value={formData.age_category} onChange={handleInputChange} className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 text-sm font-medium" placeholder="e.g. Kids, Adults" />
               </div>
               <div className="space-y-2">
                 <label className="text-[10px] text-slate-400 uppercase tracking-widest ml-1">Ride Tag</label>
                 <input name="ride_tag" value={formData.ride_tag} onChange={handleInputChange} className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 text-sm font-medium" placeholder="e.g. Popular, New" />
               </div>
               <div className="space-y-2">
                 <label className="text-[10px] text-slate-400 uppercase tracking-widest ml-1">Cover Image</label>
                 <div className="flex items-center gap-4">
                   <div className="relative group">
                    <div className="w-20 h-20 rounded-2xl bg-slate-50 border border-dashed border-slate-300 flex items-center justify-center overflow-hidden">
                        {isUploading ? <UploadCloud className="w-6 h-6 text-blue-500 animate-bounce" /> : formData.cover_image ? <img src={formData.cover_image} className="w-full h-full object-cover" /> : <Camera className="w-6 h-6 text-slate-300" />}
                        <input type="file" onChange={(e) => handleFileUpload(e, "cover_image")} className="absolute inset-0 opacity-0 cursor-pointer" />
                    </div>
                   </div>
                   <div className="text-[10px] text-slate-400 uppercase tracking-widest leading-relaxed">
                     {isUploading ? "Uploading..." : "Click to upload Ride Cover"}
                   </div>
                 </div>
               </div>
            </div>
          </motion.div>
        )}

        {activeTab === "about" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-200 space-y-6">
             <div className="space-y-2">
               <label className="text-[10px] text-slate-400 uppercase tracking-widest ml-1">About Title</label>
               <input name="about_title" value={formData.about_title} onChange={handleInputChange} className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 text-sm font-medium" />
             </div>
             <div className="space-y-2">
               <label className="text-[10px] text-slate-400 uppercase tracking-widest ml-1">About Description</label>
               <textarea name="about_description" value={formData.about_description} onChange={handleInputChange} rows={6} className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 text-sm font-medium resize-none leading-relaxed" />
             </div>
          </motion.div>
        )}

        {activeTab === "features" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            {/* Features Section */}
            <div className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-200">
               <div className="flex items-center justify-between mb-8">
                 <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-900">Ride Features</h3>
                 <button type="button" onClick={addFeature} className="text-blue-600 hover:text-blue-700 flex items-center gap-2 text-[10px] uppercase font-black">
                   <Plus className="w-4 h-4" /> Add Feature
                 </button>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {features.map((f, i) => (
                   <div key={i} className="flex gap-4 p-6 bg-slate-50 rounded-[30px] border border-slate-100 relative group">
                     <div className="w-12 h-12 bg-white rounded-xl border border-slate-200 flex items-center justify-center shrink-0 relative overflow-hidden">
                       {f.icon ? <img src={f.icon} className="w-full h-full object-cover" /> : <Star className="w-5 h-5 text-slate-300" />}
                       <input type="file" onChange={(e) => handleFileUpload(e, "feature_icon", true, i)} className="absolute inset-0 opacity-0 cursor-pointer" />
                     </div>
                     <input value={f.name} onChange={(e) => {
                       const newF = [...features];
                       newF[i].name = e.target.value;
                       setFeatures(newF);
                     }} placeholder="Feature Name" className="bg-transparent border-none focus:outline-none text-sm font-bold uppercase tracking-tight flex-grow" />
                     <button type="button" onClick={() => removeFeature(i)} className="text-red-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                       <Trash2 className="w-4 h-4" />
                     </button>
                   </div>
                 ))}
               </div>
            </div>

            {/* Gallery Section */}
            <div className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-200">
               <div className="flex items-center justify-between mb-8">
                 <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-900">Image Gallery</h3>
                 <div className="relative">
                   <button type="button" className="text-blue-600 hover:text-blue-700 flex items-center gap-2 text-[10px] uppercase font-black">
                     {isUploading ? <UploadCloud className="w-4 h-4 animate-bounce" /> : <Plus className="w-4 h-4" />}
                     {isUploading ? "Uploading..." : "Add Images"}
                   </button>
                   <input type="file" multiple onChange={(e) => handleFileUpload(e, "gallery")} className="absolute inset-0 opacity-0 cursor-pointer" />
                 </div>
               </div>
               
               <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                 <AnimatePresence>
                   {rideImages.map((img, i) => (
                     <motion.div 
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="relative aspect-square rounded-3xl overflow-hidden group border border-slate-100"
                     >
                        <img src={img.url} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button 
                            type="button" 
                            onClick={() => removeGalleryImage(i)}
                            className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                     </motion.div>
                   ))}
                 </AnimatePresence>
                 
                 {rideImages.length === 0 && !isUploading && (
                   <div className="col-span-full py-12 border-2 border-dashed border-slate-100 rounded-[30px] flex flex-col items-center justify-center text-slate-300">
                     <ImageIcon className="w-10 h-10 mb-2" />
                     <p className="text-[10px] uppercase tracking-widest">No images in gallery</p>
                   </div>
                 )}
               </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
