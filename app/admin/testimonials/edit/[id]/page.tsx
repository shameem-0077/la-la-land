"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Save, Star, User, Quote, Trash2, Camera, UploadCloud, X } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function EditTestimonialPage() {
  const router = useRouter();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
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

  useEffect(() => {
    if (id) fetchTestimonial();
  }, [id]);

  const fetchTestimonial = async () => {
    try {
      const { data, error } = await supabase
        .from("Testimonial")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      if (data) setFormData(data);
    } catch (err: any) {
      alert(err.message || "Failed to fetch testimonial");
      router.push("/admin/testimonials");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const { error } = await supabase
        .from("Testimonial")
        .update(formData)
        .eq("id", id);

      if (error) throw error;
      
      router.push("/admin/testimonials");
      router.refresh();
    } catch (err: any) {
      alert(err.message || "Failed to update testimonial");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this testimonial?")) {
      try {
        const { error } = await supabase
          .from("Testimonial")
          .delete()
          .eq("id", id);
        
        if (error) throw error;
        router.push("/admin/testimonials");
      } catch (err: any) {
        alert(err.message || "Failed to delete testimonial");
      }
    }
  };

  if (isLoading) return <div className="flex items-center justify-center min-h-[400px] text-xs uppercase tracking-widest text-slate-400">Loading Testimonial...</div>;

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

        <button 
          onClick={handleDelete}
          className="flex items-center gap-2 text-red-400 hover:text-red-600 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
          <span className="text-[10px] font-black uppercase tracking-widest">Delete Review</span>
        </button>
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight mb-2">Edit Testimonial</h1>
          <p className="text-slate-500 text-sm">Update the guest review details</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 md:p-10 rounded-[32px] md:rounded-[40px] shadow-sm border border-slate-200">
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] text-slate-400 uppercase tracking-widest ml-1 font-bold">Reviewer Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.author_name}
                  onChange={(e) => setFormData({ ...formData, author_name: e.target.value })}
                  className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-sm"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] text-slate-400 uppercase tracking-widest ml-1 font-bold">Role / Designation</label>
                  <input 
                    type="text" 
                    value={formData.author_designation}
                    onChange={(e) => setFormData({ ...formData, author_designation: e.target.value })}
                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] text-slate-400 uppercase tracking-widest ml-1 font-bold">Rating</label>
                  <div className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFormData({ ...formData, rating: star })}
                        className="transition-transform hover:scale-125"
                      >
                        <Star className={`w-5 h-5 ${star <= formData.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] text-slate-400 uppercase tracking-widest ml-1 font-bold">Testimonial Content</label>
                <textarea 
                  required
                  rows={6}
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
              <div className="flex flex-col items-center gap-4">
                <div className="relative group w-32 h-32">
                  <div className="w-full h-full rounded-full bg-slate-50 border-2 border-dashed border-slate-200 flex items-center justify-center overflow-hidden transition-all group-hover:border-blue-400">
                    {isUploading ? (
                      <UploadCloud className="w-8 h-8 text-blue-500 animate-bounce" />
                    ) : formData.author_profile ? (
                      <img src={formData.author_profile} className="w-full h-full object-cover" />
                    ) : (
                      <Camera className="w-8 h-8 text-slate-300" />
                    )}
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="absolute inset-0 opacity-0 cursor-pointer" 
                    />
                  </div>
                  {formData.author_profile && (
                    <button 
                      type="button"
                      onClick={() => setFormData({ ...formData, author_profile: "" })}
                      className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <div className="text-center">
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest leading-relaxed">
                    {isUploading ? "Uploading..." : "Tap to upload profile"}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] text-slate-400 uppercase tracking-widest ml-1 font-bold">Or Profile URL</label>
              <input 
                type="url" 
                value={formData.author_profile}
                onChange={(e) => setFormData({ ...formData, author_profile: e.target.value })}
                className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-sm"
              />
            </div>

            <div className="pt-4 border-t border-slate-50">
               <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-4 font-bold">Preview</p>
               <div className="p-6 rounded-2xl bg-slate-900 text-white relative overflow-hidden">
                  <Quote className="absolute -top-2 -left-2 w-10 h-10 text-white/10 -rotate-12" />
                  <p className="text-[10px] italic mb-4 line-clamp-3">"{formData.content}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center overflow-hidden">
                       {formData.author_profile ? <img src={formData.author_profile} className="w-full h-full object-cover" /> : <User className="w-4 h-4" />}
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase">{formData.author_name}</p>
                      <p className="text-[8px] text-primary">{formData.author_designation}</p>
                    </div>
                  </div>
               </div>
            </div>
          </div>

          <button 
            type="submit"
            disabled={isSaving || isUploading}
            className="w-full py-5 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-300 text-white rounded-[24px] text-xs font-black uppercase tracking-widest shadow-xl shadow-blue-600/20 transition-all flex items-center justify-center gap-3 group"
          >
            {isSaving ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Save className="w-4 h-4 group-hover:scale-110 transition-transform" />
                Update Changes
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
