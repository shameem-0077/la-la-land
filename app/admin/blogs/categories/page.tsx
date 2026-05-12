"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Search, Edit2, Trash2, FileText, Layers, Image as ImageIcon } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function BlogCategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("BlogCategory")
      .select("*")
      .order("name", { ascending: true });

    if (!error) {
      setCategories(data || []);
    }
    setIsLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this category?")) {
      const { error } = await supabase.from("BlogCategory").delete().eq("id", id);
      if (!error) {
        setCategories(categories.filter(c => c.id !== id));
      }
    }
  };

  const filteredCategories = categories.filter(cat => 
    cat.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 uppercase tracking-tight mb-2">Blog Categories</h1>
          <p className="text-slate-500 text-sm">Manage groups and classifications for your stories</p>
        </div>
        <Link 
          href="/admin/blogs/categories/new"
          className="inline-flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-500 text-white px-6 py-4 rounded-2xl text-[10px] md:text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-blue-600/20 w-full md:w-auto"
        >
          <Plus className="w-4 h-4" />
          Add Category
        </Link>
      </div>

      <div className="flex gap-2 p-1.5 bg-slate-200/50 rounded-2xl md:rounded-[24px] w-full md:w-fit overflow-x-auto no-scrollbar whitespace-nowrap">
        <Link href="/admin/blogs" className="flex items-center gap-3 px-6 md:px-8 py-3 rounded-xl md:rounded-[18px] text-[10px] font-black uppercase tracking-widest transition-all text-slate-400 hover:text-slate-600 shrink-0">
          <FileText className="w-4 h-4" />
          All Stories
        </Link>
        <Link href="/admin/blogs/categories" className="flex items-center gap-3 px-6 md:px-8 py-3 rounded-xl md:rounded-[18px] text-[10px] font-black uppercase tracking-widest transition-all bg-white text-blue-600 shadow-sm shrink-0">
          <Layers className="w-4 h-4" />
          Blog Categories
        </Link>
      </div>

      <div className="bg-white rounded-[32px] md:rounded-[40px] shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 md:p-8 border-b border-slate-100 flex flex-col md:flex-row gap-6 items-center justify-between">
          <div className="relative w-full md:w-96 group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
            <input 
              type="text" 
              placeholder="Search categories..." 
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
                <th className="px-8 py-5 text-[10px] uppercase tracking-widest text-slate-400 font-bold">Category Info</th>
                <th className="px-8 py-5 text-[10px] uppercase tracking-widest text-slate-400 font-bold">Slug</th>
                <th className="px-8 py-5 text-[10px] uppercase tracking-widest text-slate-400 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr>
                  <td colSpan={3} className="px-8 py-20 text-center">
                    <div className="w-8 h-8 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-xs uppercase tracking-widest text-slate-400">Loading Categories...</p>
                  </td>
                </tr>
              ) : filteredCategories.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-8 py-20 text-center text-slate-400 text-sm">
                    No categories found.
                  </td>
                </tr>
              ) : (
                filteredCategories.map((cat) => (
                  <tr key={cat.id} className="group hover:bg-slate-50/50 transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden relative shrink-0 border border-slate-200">
                          {cat.cover_image ? (
                            <img src={cat.cover_image} className="w-full h-full object-cover" alt={cat.name} />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-300">
                              <ImageIcon className="w-5 h-5" />
                            </div>
                          )}
                        </div>
                        <p className="font-black text-slate-900 uppercase tracking-tight">{cat.name}</p>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-xs font-mono text-slate-400">/{cat.slug}</span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center justify-end gap-2">
                        <Link 
                          href={`/admin/blogs/categories/edit/${cat.id}`}
                          className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 hover:text-amber-600 hover:bg-amber-50 transition-all flex items-center justify-center"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Link>
                        <button 
                          onClick={() => handleDelete(cat.id)}
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
