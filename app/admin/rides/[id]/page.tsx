"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  Edit2, 
  Trash2, 
  Star,
  ImageIcon,
  Layout,
  Info,
  Maximize2
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";

export default function RideDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [ride, setRide] = useState<any>(null);
  const [features, setFeatures] = useState<any[]>([]);
  const [gallery, setGallery] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchRideData();
  }, []);

  const fetchRideData = async () => {
    setIsLoading(true);
    try {
      const { data: rideData, error: rideError } = await supabase
        .from("Ride")
        .select("*, RideCategory(name)")
        .eq("id", params.id)
        .single();

      if (rideError) throw rideError;
      setRide(rideData);
      
      const { data: featureData } = await supabase
        .from("RideFeature")
        .select("*")
        .eq("ride_id", params.id);
      if (featureData) setFeatures(featureData);

      const { data: imageData } = await supabase
        .from("RideImage")
        .select("*")
        .eq("ride_id", params.id);
      if (imageData) setGallery(imageData);
      
    } catch (error: any) {
      console.error("Error fetching ride:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this ride?")) {
      const { error } = await supabase.from("Ride").delete().eq("id", params.id);
      if (!error) {
        router.push("/admin/rides");
      }
    }
  };

  if (isLoading) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="w-8 h-8 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin" />
    </div>
  );

  if (!ride) return (
    <div className="text-center py-20">
      <p className="text-slate-500">Ride not found.</p>
      <Link href="/admin/rides" className="text-blue-600 hover:underline mt-4 inline-block">Back to list</Link>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="flex items-center gap-6">
          <Link href="/admin/rides" className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-600 transition-all shadow-sm">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight">{ride.title || 'Untitled'}</h1>
              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-bold uppercase tracking-widest">{ride.ride_tag || 'Standard'}</span>
              {ride.RideCategory && (
                <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-widest">{ride.RideCategory.name}</span>
              )}
            </div>
            <p className="text-slate-500 text-xs uppercase tracking-widest">
              ID: {ride.id} • Created {new Date(ride.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link href={`/admin/rides/edit/${ride.id}`} className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-amber-500/20">
            <Edit2 className="w-4 h-4" />
            Edit Ride
          </Link>
          <button onClick={handleDelete} className="w-14 h-14 rounded-2xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center">
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Main Info Card */}
          <div className="bg-white rounded-[40px] shadow-sm border border-slate-200 overflow-hidden">
            <div className="relative h-80 w-full bg-slate-100">
              {ride.cover_image ? (
                <img src={ride.cover_image} className="w-full h-full object-cover" alt="Cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-300">
                  <ImageIcon className="w-12 h-12" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
              <div className="absolute bottom-10 left-10 text-white">
                <p className="text-xs uppercase tracking-[0.3em] font-bold text-blue-400 mb-2">{ride.age_category}</p>
                <h2 className="text-4xl font-black uppercase tracking-tight leading-none">{ride.title}</h2>
              </div>
            </div>
            <div className="p-10 space-y-10">
              <div>
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-4 flex items-center gap-2">
                   <Layout className="w-3 h-3" /> Sub Title
                </h3>
                <p className="text-xl font-medium text-slate-900 italic">"{ride.sub_title}"</p>
              </div>

              <div>
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-4 flex items-center gap-2">
                  <Info className="w-3 h-3" /> About: {ride.about_title}
                </h3>
                <p className="text-slate-600 leading-relaxed whitespace-pre-line">{ride.about_description}</p>
              </div>
            </div>
          </div>

          {/* Gallery Section */}
          <div className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-200">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-900 mb-8 flex items-center gap-3">
              <ImageIcon className="w-4 h-4 text-blue-500" /> Image Gallery
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {gallery.map((img: any, i: number) => (
                <div key={i} className="aspect-square rounded-3xl overflow-hidden border border-slate-100 group relative">
                  <img src={img.image} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt={`Gallery ${i}`} />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Maximize2 className="w-6 h-6 text-white" />
                  </div>
                </div>
              ))}
              {gallery.length === 0 && (
                <div className="col-span-full py-20 border-2 border-dashed border-slate-100 rounded-[30px] flex flex-col items-center justify-center text-slate-300">
                  <ImageIcon className="w-10 h-10 mb-2" />
                  <p className="text-[10px] uppercase tracking-widest font-black">No gallery images</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-8">
           {/* Features Sidebar */}
           <div className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-200">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-900 mb-8 flex items-center gap-3">
                <Star className="w-4 h-4 text-amber-500" /> Ride Features
              </h3>
              <div className="space-y-4">
                {features.map((f: any, i: number) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 transition-all hover:bg-slate-100/50">
                    <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-blue-600 overflow-hidden border">
                      {f.icon ? <img src={f.icon} className="w-full h-full object-cover" alt={f.name} /> : <Star className="w-4 h-4" />}
                    </div>
                    <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">{f.name}</span>
                  </div>
                ))}
                {features.length === 0 && (
                  <p className="text-[10px] text-slate-400 text-center uppercase tracking-widest py-4">No features added</p>
                )}
              </div>
           </div>

           {/* Quick Stats/Metadata */}
           <div className="bg-slate-900 p-10 rounded-[40px] shadow-xl text-white">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-6">Internal Metadata</h3>
              <div className="space-y-6">
                <div>
                  <p className="text-[10px] uppercase text-slate-400 mb-1">Slug Reference</p>
                  <p className="text-sm font-mono text-blue-400">/rides/{ride.slug}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase text-slate-400 mb-1">Ride Category</p>
                  <p className="text-sm font-bold uppercase tracking-tight text-blue-400">{ride.RideCategory?.name || 'Uncategorized'}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase text-slate-400 mb-1">Target Audience</p>
                  <p className="text-sm font-bold uppercase tracking-tight">{ride.age_category}</p>
                </div>
                <div className="pt-6 border-t border-white/10">
                   <Link href={`/rides/all/${ride.slug}`} target="_blank" className="flex items-center justify-between group">
                      <span className="text-[10px] font-black uppercase tracking-widest">Live Preview</span>
                      <Maximize2 className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
                   </Link>
                </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
