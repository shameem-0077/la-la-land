"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { 
  ArrowLeft, 
  Save, 
  Plus, 
  Trash2, 
  Type,
  Layout,
  Info,
  Zap,
  Sparkles,
  Users,
  Star,
  CheckCircle2,
  DollarSign
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";

export default function PackageFormPage() {
  const router = useRouter();
  const params = useParams();
  const isEdit = !!params.id;
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    tag_title: "",
    description: "",
    amount: 0,
    features: [] as string[]
  });

  const [featuresText, setFeaturesText] = useState("");

  useEffect(() => {
    if (isEdit) {
      fetchPackageData();
    }
  }, [isEdit]);

  const fetchPackageData = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("Package")
      .select("*")
      .eq("id", params.id)
      .single();

    if (!error && data) {
      setFormData(data);
      if (Array.isArray(data.features)) {
        setFeaturesText(data.features.join("\n"));
      }
    }
    setIsLoading(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    let finalValue: any = value;
    
    if (name === "amount") {
      finalValue = value === "" ? 0 : parseFloat(value);
    }

    setFormData(prev => ({ ...prev, [name]: finalValue }));

    if (name === "title" && !isEdit) {
      const slug = value.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
      setFormData(prev => ({ ...prev, slug }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const featuresArray = featuresText.split("\n").filter(f => f.trim() !== "");
    const { ...submitData } = formData;
    const dataToSave = { ...submitData, features: featuresArray };

    try {
      const { error } = isEdit 
        ? await supabase.from("Package").update(dataToSave).eq("id", params.id)
        : await supabase.from("Package").insert([dataToSave]);

      if (error) throw error;
      router.push("/admin/packages");
    } catch (error: any) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const icons = [
    { name: "Zap", icon: <Zap className="w-4 h-4" /> },
    { name: "Sparkles", icon: <Sparkles className="w-4 h-4" /> },
    { name: "Users", icon: <Users className="w-4 h-4" /> },
    { name: "Star", icon: <Star className="w-4 h-4" /> },
  ];

  const colors = [
    { name: "Teal (Secondary)", class: "bg-secondary" },
    { name: "Orange (Primary)", class: "bg-primary" },
    { name: "Green (Success)", class: "bg-success" },
    { name: "Yellow (Accent)", class: "bg-accent" },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/admin/packages" className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-600 transition-all shadow-sm">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight">
              {isEdit ? "Edit Package" : "New Package"}
            </h1>
            <p className="text-slate-500 text-xs uppercase tracking-widest mt-1">Ticket & Bundle Manager</p>
          </div>
        </div>
        <button onClick={handleSubmit} disabled={isLoading} className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-300 text-white px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-xl shadow-blue-600/20">
          {isLoading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
          {isEdit ? "Update Package" : "Save Package"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
          <div className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-200 space-y-6">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-900 flex items-center gap-2">
              <Type className="w-4 h-4 text-blue-500" /> Basic Information
            </h3>
            <div className="space-y-2">
              <label className="text-[10px] text-slate-400 uppercase tracking-widest ml-1">Package Title</label>
              <input name="title" value={formData.title} onChange={handleInputChange} className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 text-sm font-medium" placeholder="e.g. Common Package" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] text-slate-400 uppercase tracking-widest ml-1">Slug</label>
              <input name="slug" value={formData.slug} onChange={handleInputChange} className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 text-sm font-medium" placeholder="slug-name" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] text-slate-400 uppercase tracking-widest ml-1">Amount (₹)</label>
              <div className="relative">
                <DollarSign className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input type="number" name="amount" value={formData.amount} onChange={handleInputChange} className="w-full pl-12 pr-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 text-sm font-medium" placeholder="540" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] text-slate-400 uppercase tracking-widest ml-1">Tag Title</label>
              <input name="tag_title" value={formData.tag_title} onChange={handleInputChange} className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 text-sm font-medium" placeholder="e.g. Most Popular" />
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="space-y-8">
          <div className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-200 space-y-6">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-900 flex items-center gap-2">
              <Info className="w-4 h-4 text-emerald-500" /> Description & Features
            </h3>
            <div className="space-y-2">
              <label className="text-[10px] text-slate-400 uppercase tracking-widest ml-1">Description</label>
              <textarea name="description" value={formData.description} onChange={handleInputChange} rows={3} className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 text-sm font-medium resize-none" placeholder="Short summary of the package..." />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between mb-2">
                <label className="text-[10px] text-slate-400 uppercase tracking-widest ml-1">Features (One per line)</label>
                <span className="text-[10px] font-black text-blue-500 uppercase">{featuresText.split('\n').filter(l => l.trim()).length} Features</span>
              </div>
              <textarea 
                value={featuresText} 
                onChange={(e) => setFeaturesText(e.target.value)} 
                rows={10} 
                className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 text-sm font-medium resize-none leading-relaxed" 
                placeholder="All Dry Rides included&#10;Water Park Access&#10;Adventure Zone Access..." 
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
