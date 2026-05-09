"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Edit2, Star, User, Quote, Calendar, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";

export default function ViewTestimonialPage() {
  const router = useRouter();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [testimonial, setTestimonial] = useState<any>(null);

  useEffect(() => {
    if (id) fetchTestimonial();
  }, [id]);

  const fetchTestimonial = async () => {
    try {
      const { data, error } = await supabase
        .from("Testimonial")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      setTestimonial(data);
    } catch (err: any) {
      console.error("Error fetching testimonial:", err);
      router.push("/admin/testimonials");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <div className="flex items-center justify-center min-h-[400px] text-xs uppercase tracking-widest text-slate-400">Loading Details...</div>;
  if (!testimonial) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-20">
      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Link 
          href="/admin/testimonials" 
          className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors group"
        >
          <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center group-hover:-translate-x-1 transition-transform">
            <ArrowLeft className="w-5 h-5" />
          </div>
          <span className="text-xs font-black uppercase tracking-widest">All Reviews</span>
        </Link>

        <Link 
          href={`/admin/testimonials/edit/${testimonial.id}`}
          className="flex items-center gap-3 bg-slate-900 text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10"
        >
          <Edit2 className="w-4 h-4" />
          Edit Testimonial
        </Link>
      </div>

      {/* Hero Card */}
      <div className="bg-white rounded-[40px] shadow-sm border border-slate-100 overflow-hidden">
        <div className="bg-slate-900 p-12 md:p-20 text-center relative overflow-hidden">
           {/* Decorative Background */}
           <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
           <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-emerald-600/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/4" />
           
           <Quote className="absolute top-10 left-10 w-20 h-20 text-white/5 -rotate-12" />
           
           <div className="relative z-10 flex flex-col items-center">
              <div className="w-24 h-24 rounded-full border-4 border-white/10 p-1 mb-8 shadow-2xl">
                 <div className="w-full h-full rounded-full overflow-hidden bg-slate-800 flex items-center justify-center">
                    {testimonial.author_profile ? (
                      <img src={testimonial.author_profile} alt={testimonial.author_name} className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-10 h-10 text-slate-600" />
                    )}
                 </div>
              </div>

              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-6 h-6 ${i < (testimonial.rating || 5) ? 'fill-amber-400 text-amber-400' : 'text-white/10'}`} />
                ))}
              </div>

              <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-4 max-w-2xl leading-tight">
                "{testimonial.content}"
              </h2>

              <div className="flex flex-col items-center gap-1">
                 <p className="text-xl font-black text-white uppercase tracking-wider">{testimonial.author_name}</p>
                 <span className="text-xs text-blue-400 font-bold uppercase tracking-[0.2em]">{testimonial.author_designation}</span>
              </div>
           </div>
        </div>

        {/* Metadata Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-100">
           <div className="p-8 flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
                 <Calendar className="w-6 h-6" />
              </div>
              <div>
                 <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Created On</p>
                 <p className="text-sm font-black text-slate-900">{new Date(testimonial.created_at).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
              </div>
           </div>
           <div className="p-8 flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                 <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                 <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Status</p>
                 <p className="text-sm font-black text-slate-900">Verified Review</p>
              </div>
           </div>
           <div className="p-8 flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600">
                 <Star className="w-6 h-6" />
              </div>
              <div>
                 <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Avg. Rating</p>
                 <p className="text-sm font-black text-slate-900">{testimonial.rating || 5.0} / 5.0</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
