"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Search, Edit2, Trash2, MessageSquare, Star, User, Eye } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { getOptimizedImage } from "@/lib/utils";

export default function TestimonialsListingPage() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("Testimonial")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error) {
        setTestimonials(data || []);
      }
    } catch (err) {
      console.error("Error fetching testimonials:", err);
    }
    setIsLoading(false);
  };

  const handleDelete = async (id: any) => {
    if (confirm("Are you sure you want to delete this testimonial?")) {
      try {
        const { data, error } = await supabase
          .from("Testimonial")
          .delete()
          .eq("id", id)
          .select();

        if (error) {
          alert("Failed to delete: " + error.message);
          return;
        }

        if (!data || data.length === 0) {
          alert("The record could not be found in the database. It might have been already deleted.");
          // Still remove from UI to stay in sync
          setTestimonials(prev => prev.filter(t => t.id !== id));
          return;
        }

        // Successfully deleted
        setTestimonials(prev => prev.filter(t => t.id !== id));
      } catch (err: any) {
        alert("An unexpected error occurred: " + err.message);
      }
    }
  };

  const filteredTestimonials = testimonials.filter(t => 
    t.author_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.content?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 uppercase tracking-tight mb-2">Guest Testimonials</h1>
          <p className="text-slate-500 text-sm">Manage reviews and stories from your visitors</p>
        </div>
        <Link 
          href="/admin/testimonials/new"
          className="inline-flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-500 text-white px-6 py-4 rounded-2xl text-[10px] md:text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-blue-600/20 w-full md:w-auto"
        >
          <Plus className="w-4 h-4" />
          Add Testimonial
        </Link>
      </div>

      <div className="bg-white rounded-[32px] md:rounded-[40px] shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 md:p-8 border-b border-slate-100 flex flex-col md:flex-row gap-6 items-center justify-between">
          <div className="relative w-full md:w-96 group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
            <input 
              type="text" 
              placeholder="Search by name or content..." 
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
                <th className="px-8 py-5 text-[10px] uppercase tracking-widest text-slate-400 font-bold">Reviewer</th>
                <th className="px-8 py-5 text-[10px] uppercase tracking-widest text-slate-400 font-bold">Role</th>
                <th className="px-8 py-5 text-[10px] uppercase tracking-widest text-slate-400 font-bold">Rating</th>
                <th className="px-8 py-5 text-[10px] uppercase tracking-widest text-slate-400 font-bold">Comment</th>
                <th className="px-8 py-5 text-[10px] uppercase tracking-widest text-slate-400 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-8 py-20 text-center">
                    <div className="w-8 h-8 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-xs uppercase tracking-widest text-slate-400">Loading Reviews...</p>
                  </td>
                </tr>
              ) : filteredTestimonials.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-8 py-20 text-center text-slate-400 text-sm">
                    No testimonials found.
                  </td>
                </tr>
              ) : (
                filteredTestimonials.map((t) => (
                  <tr key={t.id} className="group hover:bg-slate-50/50 transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-slate-100 overflow-hidden relative shrink-0 border border-slate-200">
                          {t.author_profile ? (
                            <img src={getOptimizedImage(t.author_profile)} alt={t.author_name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-300">
                              <User className="w-6 h-6" />
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-black text-slate-900 uppercase tracking-tight">{t.author_name || 'Anonymous'}</p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">{new Date(t.created_at).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-[10px] text-blue-600 font-black uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">
                        {t.author_designation || 'Visitor'}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-3 h-3 ${i < (t.rating || 5) ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`} />
                        ))}
                      </div>
                    </td>
                    <td className="px-8 py-6 max-w-xs">
                      <p className="text-xs text-slate-600 line-clamp-2">{t.content}</p>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center justify-end gap-2">
                        <Link 
                          href={`/admin/testimonials/${t.id}`}
                          className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all flex items-center justify-center"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <Link 
                          href={`/admin/testimonials/edit/${t.id}`}
                          className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 hover:text-amber-600 hover:bg-amber-50 transition-all flex items-center justify-center"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Link>
                        <button 
                          onClick={() => handleDelete(t.id)}
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
