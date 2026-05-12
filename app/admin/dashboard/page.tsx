"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Users, 
  Map, 
  MessageSquare,
  ChevronRight,
  Plus,
  FileText,
  Layers,
  ExternalLink
} from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";

const AdminDashboard = () => {
  const [stats, setStats] = useState([
    { label: "Total Rides", value: "0", icon: <Map className="w-6 h-6 text-blue-600" />, bg: "bg-blue-50", link: "/admin/rides" },
    { label: "Ride Categories", value: "0", icon: <Layers className="w-6 h-6 text-emerald-600" />, bg: "bg-emerald-50", link: "/admin/rides/categories" },
    { label: "Blog Stories", value: "0", icon: <FileText className="w-6 h-6 text-purple-600" />, bg: "bg-purple-50", link: "/admin/blogs" },
    { label: "Visitor Reviews", value: "0", icon: <MessageSquare className="w-6 h-6 text-orange-600" />, bg: "bg-orange-50", link: "/admin/testimonials" },
  ]);

  const [recentRides, setRecentRides] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      // Fetch Counts
      const [
        { count: ridesCount },
        { count: categoriesCount },
        { count: blogsCount },
        { count: reviewsCount }
      ] = await Promise.all([
        supabase.from("Ride").select("*", { count: 'exact', head: true }),
        supabase.from("RideCategory").select("*", { count: 'exact', head: true }),
        supabase.from("Blog").select("*", { count: 'exact', head: true }),
        supabase.from("Testimonial").select("*", { count: 'exact', head: true })
      ]);

      setStats([
        { label: "Total Rides", value: (ridesCount || 0).toString(), icon: <Map className="w-6 h-6 text-blue-600" />, bg: "bg-blue-50", link: "/admin/rides" },
        { label: "Ride Categories", value: (categoriesCount || 0).toString(), icon: <Layers className="w-6 h-6 text-emerald-600" />, bg: "bg-emerald-50", link: "/admin/rides/categories" },
        { label: "Blog Stories", value: (blogsCount || 0).toString(), icon: <FileText className="w-6 h-6 text-purple-600" />, bg: "bg-purple-50", link: "/admin/blogs" },
        { label: "Visitor Reviews", value: (reviewsCount || 0).toString(), icon: <MessageSquare className="w-6 h-6 text-orange-600" />, bg: "bg-orange-50", link: "/admin/testimonials" },
      ]);

      // Fetch Recent Rides
      const { data: rides } = await supabase
        .from("Ride")
        .select("id, title, age_category, RideCategory(name), created_at")
        .order("created_at", { ascending: false })
        .limit(5);
      
      setRecentRides(rides || []);

    } catch (error) {
      console.error("Dashboard data fetch error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-10 pb-20">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 uppercase tracking-tight">Management Console</h1>
          <p className="text-slate-400 text-sm mt-1">Direct access to your park's digital assets and content.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
           <Link href="/" target="_blank" className="flex-1 sm:flex-none px-4 md:px-6 py-3 bg-white border border-slate-200 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50 transition-all flex items-center gap-2">
              <ExternalLink className="w-4 h-4" /> View Site
           </Link>
           <Link href="/admin/rides/new" className="flex-1 sm:flex-none px-4 md:px-6 py-3 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-600/20 hover:bg-blue-500 transition-all flex items-center justify-center gap-2">
              <Plus className="w-4 h-4" /> Add New Ride
           </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <Link href={stat.link} key={stat.label}>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-6 md:p-8 rounded-[32px] md:rounded-[40px] shadow-sm border border-slate-50 group hover:shadow-xl hover:shadow-slate-200/50 transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between mb-6">
                 <div className={`w-14 h-14 rounded-2xl ${stat.bg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    {stat.icon}
                 </div>
                 <div className="text-slate-300 group-hover:text-blue-500 transition-colors">
                    <ChevronRight className="w-5 h-5" />
                 </div>
              </div>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-1 font-bold">{stat.label}</p>
              <h3 className="text-3xl font-black text-slate-900 tracking-tighter leading-none">
                {isLoading ? "..." : stat.value}
              </h3>
            </motion.div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recently Added Rides */}
        <div className="lg:col-span-2 bg-white rounded-[32px] md:rounded-[40px] shadow-sm border border-slate-50 overflow-hidden">
          <div className="p-6 md:p-8 border-b border-slate-50 flex items-center justify-between">
            <h3 className="text-lg md:text-xl font-black text-slate-900 uppercase tracking-tight">Recent Attractions</h3>
            <Link href="/admin/rides" className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline">View All</Link>
          </div>
          <div className="overflow-x-auto text-left">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-8 py-4 text-[10px] text-slate-400 uppercase tracking-widest font-bold">Ride Name</th>
                  <th className="px-8 py-4 text-[10px] text-slate-400 uppercase tracking-widest font-bold">Category</th>
                  <th className="px-8 py-4 text-[10px] text-slate-400 uppercase tracking-widest font-bold">Target Age</th>
                  <th className="px-8 py-4 text-[10px] text-slate-400 uppercase tracking-widest font-bold text-right">Added On</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {isLoading ? (
                  <tr>
                    <td colSpan={4} className="px-8 py-20 text-center">
                      <div className="w-8 h-8 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin mx-auto mb-4" />
                      <p className="text-[10px] uppercase tracking-widest text-slate-400">Loading Data...</p>
                    </td>
                  </tr>
                ) : recentRides.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-8 py-20 text-center text-slate-400 text-xs uppercase tracking-widest">No rides found.</td>
                  </tr>
                ) : (
                  recentRides.map((ride) => (
                    <tr key={ride.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-8 py-6">
                         <p className="text-xs font-black text-slate-900 uppercase tracking-tight">{ride.title}</p>
                      </td>
                      <td className="px-8 py-6">
                         <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[9px] uppercase tracking-widest font-bold">
                            {ride.RideCategory?.name || "General"}
                         </span>
                      </td>
                      <td className="px-8 py-6 text-xs text-slate-500 uppercase tracking-widest text-[10px]">
                        {ride.age_category || "All Ages"}
                      </td>
                      <td className="px-8 py-6 text-[10px] text-slate-400 text-right uppercase tracking-widest">
                        {new Date(ride.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Management Cards */}
        <div className="space-y-6 md:space-y-8">
           <div className="bg-gradient-to-br from-secondary to-indigo-900 rounded-[32px] md:rounded-[40px] p-8 md:p-10 text-white relative overflow-hidden group">
              <div className="relative z-10">
                <Map className="w-8 md:w-10 h-8 md:h-10 text-white/50 mb-6 group-hover:scale-110 transition-transform duration-500" />
                <h3 className="text-xl md:text-2xl font-black uppercase leading-tight mb-4">Content <br /> Inventory</h3>
                <p className="text-white/70 text-[10px] uppercase tracking-widest leading-relaxed mb-8">Maintain your park's digital presence by updating rides and galleries.</p>
                <Link href="/admin/rides" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-secondary rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-50 transition-all">
                   Manage Rides <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
           </div>

           <div className="bg-white rounded-[32px] md:rounded-[40px] p-8 md:p-10 border border-slate-100 shadow-sm relative overflow-hidden group">
              <div className="relative z-10">
                <FileText className="w-8 md:w-10 h-8 md:h-10 text-slate-200 mb-6 group-hover:scale-110 transition-transform duration-500" />
                <h3 className="text-xl md:text-2xl font-black text-slate-900 uppercase leading-tight mb-4">Journal <br /> Studio</h3>
                <p className="text-slate-400 text-[10px] uppercase tracking-widest leading-relaxed mb-8">Engage your audience with the latest news, updates and park stories.</p>
                <Link href="/admin/blogs" className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all">
                   Manage Blog <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
