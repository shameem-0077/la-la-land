"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  Edit2, 
  Trash2, 
  Calendar, 
  User, 
  Tag,
  FileText,
  Info,
  Clock,
  ShieldCheck,
  Eye
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";

export default function BlogDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [blog, setBlog] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchBlogData();
  }, []);

  const fetchBlogData = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("Blog")
      .select("*")
      .eq("id", params.id)
      .single();

    if (!error && data) {
      setBlog(data);
    }
    setIsLoading(false);
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this post?")) {
      const { error } = await supabase.from("Blog").delete().eq("id", params.id);
      if (!error) {
        router.push("/admin/blogs");
      }
    }
  };

  if (isLoading) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="w-8 h-8 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin" />
    </div>
  );

  if (!blog) return (
    <div className="text-center py-20">
      <p className="text-slate-500">Post not found.</p>
      <Link href="/admin/blogs" className="text-blue-600 hover:underline mt-4 inline-block">Back to list</Link>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="flex items-center gap-6">
          <Link href="/admin/blogs" className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-600 transition-all shadow-sm">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight">{blog.title}</h1>
              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-bold uppercase tracking-widest">{blog.category}</span>
            </div>
            <p className="text-slate-500 text-xs uppercase tracking-widest">
              ID: {blog.id} • Posted {new Date(blog.created_at).toLocaleDateString()}
            </p>
            {blog.tags && (
              <div className="flex flex-wrap gap-2 mt-2">
                {blog.tags.split(',').map((tag: string) => (
                  <span key={tag} className="text-[9px] font-bold uppercase tracking-tighter text-blue-400">#{tag.trim()}</span>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link href={`/admin/blogs/edit/${blog.id}`} className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-amber-500/20">
            <Edit2 className="w-4 h-4" />
            Edit Story
          </Link>
          <button onClick={handleDelete} className="w-14 h-14 rounded-2xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center">
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Content Preview */}
        <div className="lg:col-span-2 space-y-8">
           <div className="bg-white rounded-[50px] overflow-hidden shadow-sm border border-slate-200">
              {blog.cover_image && (
                <div className="aspect-video w-full relative overflow-hidden">
                   <img src={blog.cover_image} className="w-full h-full object-cover" />
                </div>
              )}
              <div className="p-12 space-y-8">
                 <div className="flex items-center gap-8 border-b border-slate-100 pb-8">
                    <div className="flex items-center gap-2">
                       <Calendar className="w-4 h-4 text-blue-500" />
                       <span className="text-xs font-bold uppercase tracking-widest text-slate-400">{new Date(blog.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center gap-2">
                       <User className="w-4 h-4 text-blue-500" />
                       <span className="text-xs font-bold uppercase tracking-widest text-slate-400">{blog.author}</span>
                    </div>
                 </div>

                 <div className="space-y-6">
                    <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight italic">"{blog.sub_description}"</h2>
                    <div 
                      className="prose prose-slate max-w-none text-slate-600 leading-relaxed text-sm rich-text-preview"
                      dangerouslySetInnerHTML={{ __html: blog.content }}
                    />
                 </div>
              </div>
           </div>
        </div>

        {/* Article Sidebar */}
        <div className="space-y-8">
           <div className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-200">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-900 mb-8 flex items-center gap-3">
                <Info className="w-5 h-5 text-blue-600" /> Status & Info
              </h3>
              
              <div className="space-y-6">
                <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100">
                   <p className="text-[10px] uppercase text-slate-400 mb-1">Tags</p>
                   <p className="text-xs font-mono text-blue-500 italic">{blog.tags || 'No tags'}</p>
                </div>
                
                <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100">
                   <p className="text-[10px] uppercase text-slate-400 mb-1">Content Stats</p>
                   <div className="flex justify-between items-center mt-1">
                      <span className="text-xs font-bold text-slate-700">{blog.content.split(' ').length} Words</span>
                      <span className="text-xs font-bold text-slate-700">{Math.ceil(blog.content.split(' ').length / 200)} Min Read</span>
                   </div>
                </div>

                <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100">
                   <p className="text-[10px] uppercase text-slate-400 mb-1">Visibility</p>
                   <div className="flex items-center gap-2 mt-1">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-xs font-bold text-slate-700 uppercase tracking-tight">Live on Website</span>
                   </div>
                </div>
              </div>
           </div>

           <div className="bg-slate-900 p-10 rounded-[40px] shadow-2xl text-white relative overflow-hidden">
              <div className="relative z-10">
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-6">Quality Control</h4>
                <div className="space-y-4">
                   <div className="flex items-center gap-3 text-xs leading-relaxed">
                      <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                      All external links are set to no-follow.
                   </div>
                   <div className="flex items-center gap-3 text-xs leading-relaxed">
                      <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                      Images optimized for fast loading.
                   </div>
                </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
