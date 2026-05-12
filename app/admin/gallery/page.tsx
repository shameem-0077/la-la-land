"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Search, Edit2, Trash2, Image as ImageIcon, Eye } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { getOptimizedImage } from "@/lib/utils";

export default function GalleryListingPage() {
  const [images, setImages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    setIsLoading(true);
    // Note: Assuming table name 'Gallery'. Adjust if different.
    try {
      const { data, error } = await supabase
        .from("Gallery")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error) {
        setImages(data || []);
      }
    } catch (err) {
      console.error("Error fetching gallery:", err);
    }
    setIsLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this image?")) {
      const { error } = await supabase.from("Gallery").delete().eq("id", id);
      if (!error) {
        setImages(images.filter(img => img.id !== id));
      }
    }
  };

  const filteredImages = images.filter(img => 
    img.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    img.sub_title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 uppercase tracking-tight mb-2">Media Gallery</h1>
          <p className="text-slate-500 text-sm">Manage photos and visual content for the park</p>
        </div>
        <Link 
          href="/admin/gallery/new"
          className="inline-flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-500 text-white px-6 py-4 rounded-2xl text-[10px] md:text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-blue-600/20 w-full md:w-auto"
        >
          <Plus className="w-4 h-4" />
          Upload Image
        </Link>
      </div>

      <div className="bg-white rounded-[32px] md:rounded-[40px] shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 md:p-8 border-b border-slate-100">
          <div className="relative w-full md:w-96 group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
            <input 
              type="text" 
              placeholder="Search by title or category..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-16 pr-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-sm"
            />
          </div>
        </div>

        <div className="p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading ? (
             <div className="col-span-full py-20 text-center">
                <div className="w-8 h-8 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin mx-auto mb-4" />
                <p className="text-xs uppercase tracking-widest text-slate-400">Loading Gallery...</p>
             </div>
          ) : filteredImages.length === 0 ? (
            <div className="col-span-full py-20 text-center text-slate-400 text-sm">
              No images found in the gallery.
            </div>
          ) : (
            filteredImages.map((img) => (
              <div key={img.id} className="group relative aspect-square rounded-3xl overflow-hidden bg-slate-100 border border-slate-200">
                 <img src={getOptimizedImage(img.image)} alt={img.title} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                 <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                    <p className="text-white font-bold text-xs uppercase tracking-tight mb-4">{img.title}</p>
                    <div className="flex items-center gap-2">
                       <Link href={`/admin/gallery/edit/${img.id}`} className="flex-1 py-2 bg-white/20 backdrop-blur-md rounded-xl text-white text-[10px] uppercase font-bold text-center hover:bg-white/30">Edit</Link>
                       <button onClick={() => handleDelete(img.id)} className="flex-1 py-2 bg-red-500/80 backdrop-blur-md rounded-xl text-white text-[10px] uppercase font-bold text-center hover:bg-red-600">Delete</button>
                    </div>
                 </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
