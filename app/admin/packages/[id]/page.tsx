"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  Edit2, 
  Trash2, 
  Check, 
  Ticket,
  Clock,
  ShieldCheck,
  Info,
  Tag
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";

export default function PackageDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [pkg, setPkg] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPackageData();
  }, []);

  const fetchPackageData = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("Package")
      .select("*")
      .eq("id", params.id)
      .single();

    if (!error && data) {
      setPkg(data);
    }
    setIsLoading(false);
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this package?")) {
      const { error } = await supabase.from("Package").delete().eq("id", params.id);
      if (!error) {
        router.push("/admin/packages");
      }
    }
  };

  if (isLoading) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="w-8 h-8 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin" />
    </div>
  );

  if (!pkg) return (
    <div className="text-center py-20">
      <p className="text-slate-500">Package not found.</p>
      <Link href="/admin/packages" className="text-blue-600 hover:underline mt-4 inline-block">Back to list</Link>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="flex items-center gap-6">
          <Link href="/admin/packages" className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-600 transition-all shadow-sm">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight">{pkg.title}</h1>
              <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                <Tag className="w-3 h-3" /> {pkg.tag_title || 'Package'}
              </span>
            </div>
            <p className="text-slate-500 text-xs uppercase tracking-widest">
              ID: {pkg.id} • Slug: /{pkg.slug}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link href={`/admin/packages/edit/${pkg.id}`} className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-amber-500/20">
            <Edit2 className="w-4 h-4" />
            Edit Package
          </Link>
          <button onClick={handleDelete} className="w-14 h-14 rounded-2xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center">
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Preview Card Mockup */}
        <div className="lg:col-span-1">
          <div className="relative bg-white rounded-[50px] p-10 border-2 border-slate-100 shadow-xl flex flex-col h-fit">
            <div className="mb-8">
              <div className="flex items-center justify-between gap-4 mb-4">
                <span className="inline-block px-4 py-1.5 rounded-full bg-secondary text-white text-[10px] uppercase tracking-widest">
                  {pkg.tag_title || 'Standard'}
                </span>
                <div className="text-secondary">
                  <Ticket className="w-6 h-6" />
                </div>
              </div>
              <h3 className="text-3xl font-black text-secondary leading-tight">
                {pkg.title}
              </h3>
            </div>

            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-2xl text-secondary">₹</span>
              <span className="text-5xl text-primary leading-none">{pkg.amount}</span>
               <span className="text-zinc-400 text-sm ml-2">/ Person</span>
            </div>

            <p className="text-zinc-500 mb-8 leading-relaxed text-sm">
              {pkg.description}
            </p>

            <div className="space-y-4 mb-10">
              {pkg.features?.map((feature: string, i: number) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                    <Check className="w-4 h-4 stroke-[4]" />
                  </div>
                  <span className="text-sm text-secondary">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Detailed Breakdown */}
        <div className="lg:col-span-2 space-y-8">
           <div className="bg-white p-12 rounded-[50px] shadow-sm border border-slate-200">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-900 mb-10 flex items-center gap-3">
                <Info className="w-5 h-5 text-blue-600" /> Administrative Details
              </h3>
              
              <div className="space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="p-8 rounded-[30px] bg-slate-50 border border-slate-100">
                     <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4">Price & Tags</h4>
                     <div className="space-y-4">
                        <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                           <span className="text-xs text-slate-500">Amount</span>
                           <span className="text-sm font-black text-slate-900 font-mono">₹{pkg.amount}</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                           <span className="text-xs text-slate-500">Tag Title</span>
                           <span className="text-[10px] font-bold uppercase text-slate-400">
                             {pkg.tag_title || 'N/A'}
                           </span>
                        </div>
                     </div>
                  </div>
                  <div className="p-8 rounded-[30px] bg-slate-50 border border-slate-100">
                     <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4">Route Info</h4>
                     <div className="space-y-4">
                        <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                           <span className="text-xs text-slate-500">URL Slug</span>
                           <span className="text-[10px] font-mono bg-white px-2 py-1 rounded border border-slate-200">/{pkg.slug}</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                           <span className="text-xs text-slate-500">Created At</span>
                           <span className="text-[10px] font-mono">{new Date(pkg.created_at).toLocaleDateString()}</span>
                        </div>
                     </div>
                  </div>
                </div>

                <div>
                   <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6">Inclusion Features ({pkg.features?.length || 0})</h4>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {pkg.features?.map((f: string, i: number) => (
                        <div key={i} className="flex items-center gap-4 p-4 rounded-2xl border border-slate-100 bg-white">
                           <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                              <Check className="w-4 h-4" />
                           </div>
                           <span className="text-xs font-bold text-slate-700 uppercase tracking-tight">{f}</span>
                        </div>
                      ))}
                   </div>
                </div>
              </div>
           </div>

           <div className="bg-slate-900 p-12 rounded-[50px] shadow-2xl text-white relative overflow-hidden">
              <div className="relative z-10">
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-6">Security & Ownership</h4>
                <div className="space-y-4">
                   <div className="flex items-center justify-between border-b border-white/10 pb-4">
                      <span className="text-xs text-white/50">Owner User ID</span>
                      <span className="text-[10px] font-mono text-blue-400">{pkg.user_id || 'System Generated'}</span>
                   </div>
                </div>
                <div className="mt-8 flex gap-4">
                   <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-[10px] uppercase font-bold tracking-widest">
                     <Clock className="w-3 h-3" /> System Verified
                   </div>
                   <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-[10px] uppercase font-bold tracking-widest">
                     <ShieldCheck className="w-3 h-3" /> PG_DEFAULT Storage
                   </div>
                </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
