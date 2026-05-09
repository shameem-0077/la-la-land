"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Edit2, Camera, Calendar, Tag, Maximize2, ShieldCheck, Layout } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";

export default function ViewGalleryItemPage() {
  const router = useRouter();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [item, setItem] = useState<any>(null);

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
      setItem(data);
    } catch (err: any) {
      console.error("Error fetching gallery item:", err);
      router.push("/admin/gallery");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <div className="flex items-center justify-center min-h-[400px] text-xs uppercase tracking-widest text-slate-400">Loading Details...</div>;
  if (!item) return null;

  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-20">
      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Link 
          href="/admin/gallery" 
          className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors group"
        >
          <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center group-hover:-translate-x-1 transition-transform">
            <ArrowLeft className="w-5 h-5" />
          </div>
          <span className="text-xs font-black uppercase tracking-widest">Back to Media</span>
        </Link>

        <Link 
          href={`/admin/gallery/edit/${item.id}`}
          className="flex items-center gap-3 bg-slate-900 text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10"
        >
          <Edit2 className="w-4 h-4" />
          Edit Image
        </Link>
      </div>

      {/* Main Preview Container */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
         {/* Image Display */}
         <div className="lg:col-span-2 space-y-6">
            <div className="relative rounded-[40px] overflow-hidden bg-slate-900 aspect-video shadow-2xl border border-slate-800 group">
               <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
               <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex flex-col justify-end p-12">
                  <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-white text-[10px] uppercase tracking-widest mb-4 border border-white/10 w-fit">
                    <Camera className="w-3 h-3" />
                    Park Collection
                  </span>
                  <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight leading-tight">
                    {item.title}
                  </h1>
               </div>
               
               <button className="absolute top-8 right-8 w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all">
                  <Maximize2 className="w-5 h-5" />
               </button>
            </div>
         </div>

         {/* Sidebar Info */}
         <div className="space-y-6">
            <div className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100 space-y-8">
               <div>
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest font-black mb-6">File Details</p>
                  
                  <div className="space-y-6">
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                           <Tag className="w-5 h-5" />
                        </div>
                        <div>
                           <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Sub Title</p>
                           <p className="text-sm font-black text-slate-900 uppercase">{item.sub_title || 'General'}</p>
                        </div>
                     </div>

                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
                           <Calendar className="w-5 h-5" />
                        </div>
                        <div>
                           <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Uploaded On</p>
                           <p className="text-sm font-black text-slate-900">{new Date(item.created_at).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="pt-8 border-t border-slate-50">
                  <div className="flex items-center gap-3 text-emerald-500 mb-4">
                     <ShieldCheck className="w-5 h-5" />
                     <p className="text-[10px] font-black uppercase tracking-widest">Public Asset</p>
                  </div>
                  <p className="text-[10px] text-slate-400 leading-relaxed uppercase tracking-widest font-medium">
                     This image is currently visible on the live gallery section of your website.
                  </p>
               </div>
            </div>

            <Link 
              href={`/admin/gallery/edit/${item.id}`}
              className="w-full py-5 bg-slate-50 hover:bg-blue-50 text-slate-400 hover:text-blue-600 rounded-[24px] text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-3 border border-slate-100 border-dashed"
            >
              Update Metadata
            </Link>
         </div>
      </div>
    </div>
  );
}
