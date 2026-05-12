"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Search, Filter, Edit2, Eye, Trash2, Map, Waves, Zap, Users, ImageIcon, Layers } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import { getOptimizedImage } from "@/lib/utils";

// Helper to convert bytea/Uint8Array to base64 URL
const getImageUrl = (data: any): string | undefined => {
  if (!data) return undefined;
  if (typeof data === 'string' && data.startsWith('http')) return getOptimizedImage(data);
  // If it's a buffer/Uint8Array from bytea
  try {
    const base64String = btoa(
      new Uint8Array(data).reduce((acc, byte) => acc + String.fromCharCode(byte), "")
    );
    return `data:image/png;base64,${base64String}`;
  } catch (e) {
    return undefined;
  }
};

export default function RidesListingPage() {
  const [rides, setRides] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchRides();
  }, []);

  const fetchRides = async () => {
    setIsLoading(true);
    setError(null);

    // Validate Environment Variables
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      setError("Supabase Environment Variables are missing. Please check your .env file.");
      setIsLoading(false);
      return;
    }

    console.log("INFO: Initializing fetch for table 'Ride'...");
    
    try {
      const { data, error: finalError } = await supabase
        .from("Ride")
        .select("id, title, slug, age_category, ride_tag, cover_image, created_at")
        .order("created_at", { ascending: false });

      if (finalError) {
        console.error("DEBUG: Supabase returned an error:", finalError);
        throw finalError;
      }
      
      console.log("INFO: Successfully fetched", data?.length, "rides.");
      setRides(data || []);
      
    } catch (err: any) {
      console.error("DEBUG: Full Fetch Error Details:", err);
      setError(err.message || "Failed to load rides from Supabase");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this ride? This will also remove all associated features and gallery images.")) {
      try {
        // 1. Delete related features
        const { error: featError } = await supabase.from("RideFeature").delete().eq("ride_id", id);
        if (featError) throw featError;

        // 2. Delete related images
        const { error: imgError } = await supabase.from("RideImage").delete().eq("ride_id", id);
        if (imgError) throw imgError;

        // 3. Delete the ride itself
        const { error: rideError } = await supabase.from("Ride").delete().eq("id", id);
        if (rideError) throw rideError;

        setRides(rides.filter(r => r.id !== id));
      } catch (error: any) {
        console.error("Delete error:", error);
        alert("Failed to delete ride: " + error.message);
      }
    }
  };

  const filteredRides = rides.filter(ride => 
    (ride.title?.toLowerCase().includes(searchTerm.toLowerCase()) || "") ||
    (ride.age_category?.toLowerCase().includes(searchTerm.toLowerCase()) || "")
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 uppercase tracking-tight mb-2">Park Rides</h1>
          <p className="text-slate-500 text-sm">Manage all attractions and categories</p>
        </div>
        <Link 
          href="/admin/rides/new"
          className="inline-flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-500 text-white px-6 py-4 rounded-2xl text-[10px] md:text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-blue-600/20 w-full md:w-auto"
        >
          <Plus className="w-4 h-4" />
          Add New Ride
        </Link>
      </div>

      <div className="flex gap-2 p-1.5 bg-slate-200/50 rounded-2xl md:rounded-[24px] w-full md:w-fit overflow-x-auto no-scrollbar whitespace-nowrap">
        <Link href="/admin/rides" className="flex items-center gap-3 px-6 md:px-8 py-3 rounded-xl md:rounded-[18px] text-[10px] font-black uppercase tracking-widest transition-all bg-white text-blue-600 shadow-sm shrink-0">
          <Map className="w-4 h-4" />
          All Rides
        </Link>
        <Link href="/admin/rides/categories" className="flex items-center gap-3 px-6 md:px-8 py-3 rounded-xl md:rounded-[18px] text-[10px] font-black uppercase tracking-widest transition-all text-slate-400 hover:text-slate-600 shrink-0">
          <Layers className="w-4 h-4" />
          Ride Categories
        </Link>
      </div>

      <div className="bg-white rounded-[32px] md:rounded-[40px] shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 md:p-8 border-b border-slate-100 flex flex-col md:flex-row gap-6 items-center justify-between">
          <div className="relative w-full md:w-96 group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
            <input 
              type="text" 
              placeholder="Search rides by title or age category..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-16 pr-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-sm"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-8 py-5 text-[10px] uppercase tracking-widest text-slate-400 font-bold">Ride Info</th>
                <th className="px-8 py-5 text-[10px] uppercase tracking-widest text-slate-400 font-bold">Age Category</th>
                <th className="px-8 py-5 text-[10px] uppercase tracking-widest text-slate-400 font-bold">Tag</th>
                <th className="px-8 py-5 text-[10px] uppercase tracking-widest text-slate-400 font-bold">Created At</th>
                <th className="px-8 py-5 text-[10px] uppercase tracking-widest text-slate-400 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-8 py-20 text-center">
                    <div className="w-8 h-8 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-xs uppercase tracking-widest text-slate-400">Syncing with Supabase...</p>
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={5} className="px-8 py-20 text-center text-red-500 bg-red-50/30">
                    <p className="text-sm font-bold uppercase tracking-widest mb-2">Fetch Error</p>
                    <p className="text-xs opacity-70">{error}</p>
                    <button 
                      onClick={() => fetchRides()}
                      className="mt-4 px-6 py-2 bg-red-500 text-white text-[10px] uppercase font-black rounded-lg hover:bg-red-600 transition-all"
                    >
                      Try Again
                    </button>
                  </td>
                </tr>
              ) : filteredRides.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-8 py-20 text-center">
                    <p className="text-slate-400 text-sm">No rides found in your "Ride" table.</p>
                  </td>
                </tr>
              ) : (
                filteredRides.map((ride) => (
                  <tr key={ride.id} className="group hover:bg-slate-50/50 transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-2xl bg-slate-100 overflow-hidden relative shrink-0 border border-slate-200">
                          {ride.cover_image ? (
                            <img src={getImageUrl(ride.cover_image)} alt={ride.title} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-300">
                              <ImageIcon className="w-6 h-6" />
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-black text-slate-900 uppercase tracking-tight mb-1">{ride.title || 'Untitled'}</p>
                          <p className="text-xs text-slate-500 italic">/{ride.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-widest">
                        {ride.age_category || 'N/A'}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                       <p className="text-xs font-medium text-slate-600 uppercase tracking-wide">{ride.ride_tag || 'No Tag'}</p>
                    </td>
                    <td className="px-8 py-6 text-xs text-slate-400">
                      {new Date(ride.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center justify-end gap-2">
                        <Link 
                          href={`/admin/rides/${ride.id}`}
                          className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all flex items-center justify-center"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <Link 
                          href={`/admin/rides/edit/${ride.id}`}
                          className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 hover:text-amber-600 hover:bg-amber-50 transition-all flex items-center justify-center"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Link>
                        <button 
                          onClick={() => handleDelete(ride.id)}
                          className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all flex items-center justify-center"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
