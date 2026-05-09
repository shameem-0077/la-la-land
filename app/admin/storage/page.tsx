"use client";

import React, { useState, useEffect } from "react";
import { HardDrive, Search, Shield, ShieldOff, Calendar, ArrowRight, ExternalLink } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";
import { getRealBuckets } from "./actions";
import Link from "next/link";

export default function StorageBucketsPage() {
  const [buckets, setBuckets] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchBuckets();
  }, []);

  const fetchBuckets = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getRealBuckets();
      setBuckets(data || []);
    } catch (err: any) {
      console.error("Error fetching buckets:", err);
      setError(err.message || "Failed to fetch buckets from server.");
    } finally {
      setIsLoading(false);
    }
  };

  const filteredBuckets = buckets.filter(b => 
    b.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 uppercase tracking-tight mb-2">Storage Explorer</h1>
          <p className="text-slate-500 text-sm">Manage your Supabase storage buckets and assets</p>
        </div>
      </div>

      <div className="bg-white rounded-[32px] md:rounded-[40px] shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 md:p-8 border-b border-slate-100 flex flex-col md:flex-row gap-6 items-center justify-between">
          <div className="relative w-full md:w-96 group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
            <input 
              type="text" 
              placeholder="Search buckets by name..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-16 pr-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-sm"
            />
          </div>
          
          <button 
            onClick={fetchBuckets}
            className="text-[10px] font-black uppercase tracking-widest text-blue-600 hover:text-blue-700 transition-colors"
          >
            Refresh Buckets
          </button>
        </div>

        <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            <div className="col-span-full py-20 text-center">
              <div className="w-8 h-8 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin mx-auto mb-4" />
              <p className="text-xs uppercase tracking-widest text-slate-400">Scanning Storage...</p>
            </div>
          ) : error ? (
            <div className="col-span-full py-20 text-center space-y-4">
              <div className="w-12 h-12 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-2">
                 <ShieldOff className="w-6 h-6" />
              </div>
              <p className="text-sm font-bold text-slate-900 uppercase tracking-tight">Access Denied / Error</p>
              <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                {error}
                <br /><br />
                <span className="italic">Note: Listing buckets requires appropriate API permissions. If you are using the 'anon' key, you may need to enable bucket access in your Supabase dashboard.</span>
              </p>
              <button onClick={fetchBuckets} className="text-blue-600 text-[10px] font-black uppercase tracking-widest hover:underline">Try Again</button>
            </div>
          ) : buckets.length === 0 ? (
            <div className="col-span-full py-20 text-center space-y-4">
              <Shield className="w-12 h-12 text-slate-200 mx-auto" />
              <p className="text-sm font-bold text-slate-900 uppercase tracking-tight">No Buckets Found</p>
              <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed uppercase tracking-widest font-bold">
                The storage API returned an empty list. Please ensure you have created buckets in your Supabase dashboard.
              </p>
            </div>
          ) : filteredBuckets.length === 0 ? (
            <div className="col-span-full py-20 text-center text-slate-400 text-sm uppercase tracking-widest font-bold">
              No matching buckets found
            </div>
          ) : (
            filteredBuckets.map((bucket) => (
              <motion.div 
                key={bucket.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="group p-8 rounded-[32px] bg-slate-50 border border-slate-100 hover:border-blue-200 hover:bg-white hover:shadow-xl hover:shadow-blue-900/5 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-slate-400 group-hover:text-blue-600 transition-colors">
                      <HardDrive className="w-6 h-6" />
                    </div>
                    {bucket.public ? (
                      <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">
                        <Shield className="w-3 h-3" />
                        <span className="text-[8px] font-black uppercase tracking-widest">Public</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-600 border border-amber-100">
                        <ShieldOff className="w-3 h-3" />
                        <span className="text-[8px] font-black uppercase tracking-widest">Private</span>
                      </div>
                    )}
                  </div>

                   <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight mb-2 truncate group-hover:text-blue-600 transition-colors">
                    {bucket.name}
                  </h3>
                  
                  <div className="flex items-center gap-3 text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-6">
                    <Calendar className="w-3 h-3" />
                    Created {new Date(bucket.created_at).toLocaleDateString()}
                  </div>

                  <div className="space-y-4 mb-8 bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm">
                    <div className="flex justify-between items-end">
                      <div className="space-y-1">
                        <p className="text-[8px] text-slate-400 uppercase tracking-widest font-black">Storage Used</p>
                        <p className="text-lg font-black text-slate-900">{(bucket.totalSize / (1024 * 1024)).toFixed(1)} <span className="text-[10px] text-slate-400">MB</span></p>
                      </div>
                      <div className="text-right space-y-1">
                        <p className="text-[8px] text-slate-400 uppercase tracking-widest font-black">Assets</p>
                        <p className="text-lg font-black text-blue-600">{bucket.fileCount}</p>
                      </div>
                    </div>
                    
                    <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden border border-slate-100">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(100, (bucket.totalSize / (100 * 1024 * 1024)) * 100)}%` }}
                        className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full"
                      />
                    </div>
                    <div className="flex justify-between text-[8px] text-slate-400 font-black uppercase tracking-widest">
                       <span>0 MB</span>
                       <span>100 MB Limit</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-slate-200/50">
                   <div className="flex flex-col">
                      <span className="text-[8px] text-slate-400 uppercase tracking-widest font-bold mb-0.5">Visibility</span>
                      <span className={`text-[10px] font-black uppercase tracking-tight ${bucket.public ? 'text-emerald-500' : 'text-amber-500'}`}>
                        {bucket.public ? 'Public Access' : 'Private'}
                      </span>
                   </div>
                   
                   <Link 
                     href={`/admin/storage/${bucket.name}`}
                     className="w-12 h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-blue-600 group-hover:border-blue-100 transition-all shadow-sm group-hover:scale-110 active:scale-95"
                     title="View Details"
                   >
                     <ArrowRight className="w-5 h-5" />
                   </Link>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
