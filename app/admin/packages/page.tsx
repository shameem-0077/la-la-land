"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Search, Edit2, Trash2, Ticket, Eye } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function PackagesListingPage() {
  const [packages, setPackages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("Package")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) {
      setPackages(data || []);
    }
    setIsLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this package?")) {
      const { error } = await supabase.from("Package").delete().eq("id", id);
      if (!error) {
        setPackages(packages.filter(p => p.id !== id));
      }
    }
  };

  const filteredPackages = packages.filter(pkg => 
    pkg.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 uppercase tracking-tight mb-2">Park Packages</h1>
          <p className="text-slate-500 text-sm">Manage ticket pricing and entry bundles</p>
        </div>
        <Link 
          href="/admin/packages/new"
          className="inline-flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-500 text-white px-6 py-4 rounded-2xl text-[10px] md:text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-blue-600/20 w-full md:w-auto"
        >
          <Plus className="w-4 h-4" />
          Create Package
        </Link>
      </div>

      <div className="bg-white rounded-[32px] md:rounded-[40px] shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 md:p-8 border-b border-slate-100">
          <div className="relative w-full md:w-96 group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
            <input 
              type="text" 
              placeholder="Search packages..." 
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
                <th className="px-8 py-5 text-[10px] uppercase tracking-widest text-slate-400 font-bold">Package Details</th>
                <th className="px-8 py-5 text-[10px] uppercase tracking-widest text-slate-400 font-bold">Route Slug</th>
                <th className="px-8 py-5 text-[10px] uppercase tracking-widest text-slate-400 font-bold">Amount</th>
                <th className="px-8 py-5 text-[10px] uppercase tracking-widest text-slate-400 font-bold">Created</th>
                <th className="px-8 py-5 text-[10px] uppercase tracking-widest text-slate-400 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-8 py-20 text-center">
                    <div className="w-8 h-8 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-xs uppercase tracking-widest text-slate-400">Syncing Packages...</p>
                  </td>
                </tr>
              ) : filteredPackages.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-8 py-20 text-center text-slate-400 text-sm">
                    No packages found.
                  </td>
                </tr>
              ) : (
                filteredPackages.map((pkg) => (
                  <tr key={pkg.id} className="group hover:bg-slate-50/50 transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center text-slate-400 bg-slate-100 border border-slate-200">
                          <Ticket className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="font-black text-slate-900 uppercase tracking-tight">{pkg.title}</p>
                          <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mt-0.5">{pkg.tag_title || 'Standard'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <p className="text-[10px] text-blue-500 font-mono tracking-tighter">/{pkg.slug}</p>
                    </td>
                    <td className="px-8 py-6">
                      <p className="text-sm font-black text-slate-900">₹{pkg.amount}</p>
                    </td>
                    <td className="px-8 py-6">
                       <p className="text-[10px] text-slate-400 uppercase font-bold">{new Date(pkg.created_at).toLocaleDateString()}</p>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center justify-end gap-2">
                        <Link 
                          href={`/admin/packages/${pkg.id}`}
                          className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all flex items-center justify-center"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <Link 
                          href={`/admin/packages/edit/${pkg.id}`}
                          className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 hover:text-amber-600 hover:bg-amber-50 transition-all flex items-center justify-center"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Link>
                        <button 
                          onClick={() => handleDelete(pkg.id)}
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
