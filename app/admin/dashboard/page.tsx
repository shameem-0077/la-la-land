"use client";

import React from "react";
import Link from "next/link";
import { 
  Users, 
  Ticket, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight, 
  Map, 
  MessageSquare,
  ChevronRight,
  Plus,
  FileText
} from "lucide-react";
import { motion } from "framer-motion";

const AdminDashboard = () => {
  const stats = [
    { label: "Total Bookings", value: "1,284", change: "+12.5%", trending: "up", icon: <Ticket className="w-6 h-6 text-blue-600" />, bg: "bg-blue-50" },
    { label: "Total Visitors", value: "8,590", change: "+5.2%", trending: "up", icon: <Users className="w-6 h-6 text-emerald-600" />, bg: "bg-emerald-50" },
    { label: "Revenue", value: "₹4.2L", change: "-2.4%", trending: "down", icon: <TrendingUp className="w-6 h-6 text-purple-600" />, bg: "bg-purple-50" },
    { label: "New Reviews", value: "48", change: "+100%", trending: "up", icon: <MessageSquare className="w-6 h-6 text-orange-600" />, bg: "bg-orange-50" },
  ];

  const recentBookings = [
    { id: "LL-4029", user: "John Doe", type: "Full Day Pass", count: "3 Adults", date: "Today, 10:30 AM", status: "Paid", amount: "₹2,397" },
    { id: "LL-4028", user: "Sarah Smith", type: "Family Bundle", count: "2 Adults, 2 Kids", date: "Today, 09:45 AM", status: "Pending", amount: "₹1,898" },
    { id: "LL-4027", user: "Michael Ross", type: "Morning Pass", count: "1 Adult", date: "Yesterday", status: "Paid", amount: "₹799" },
    { id: "LL-4026", user: "Emma Wilson", type: "Senior Citizen", count: "2 Seniors", date: "Yesterday", status: "Cancelled", amount: "₹600" },
  ];

  return (
    <div className="space-y-10 pb-20">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Dashboard Overview</h1>
          <p className="text-slate-400 font-bold text-sm mt-1">Welcome back, Admin! Here's what's happening today.</p>
        </div>
        <div className="flex items-center gap-4">
           <button className="px-6 py-3 bg-white border border-slate-200 rounded-2xl font-black text-[10px] uppercase tracking-widest text-slate-600 hover:bg-slate-50 transition-all">
              Export Report
           </button>
           <button className="px-6 py-3 bg-blue-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-blue-600/20 hover:bg-blue-500 transition-all flex items-center gap-2">
              <Plus className="w-4 h-4" /> Add New Ride
           </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={stat.label}
            className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-50 group hover:shadow-xl hover:shadow-slate-200/50 transition-all"
          >
            <div className="flex items-center justify-between mb-6">
               <div className={`w-14 h-14 rounded-2xl ${stat.bg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  {stat.icon}
               </div>
               <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-black ${stat.trending === 'up' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                  {stat.trending === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {stat.change}
               </div>
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
            <h3 className="text-3xl font-black text-slate-900 tracking-tighter leading-none">{stat.value}</h3>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Bookings Table */}
        <div className="lg:col-span-2 bg-white rounded-[40px] shadow-sm border border-slate-50 overflow-hidden">
          <div className="p-8 border-b border-slate-50 flex items-center justify-between">
            <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Recent Bookings</h3>
            <button className="text-xs font-black text-blue-600 uppercase tracking-widest hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto text-left">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Order ID</th>
                  <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Customer</th>
                  <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Pass Type</th>
                  <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                  <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {recentBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-8 py-6 text-xs font-black text-slate-900">{booking.id}</td>
                    <td className="px-8 py-6">
                       <p className="text-xs font-black text-slate-900 leading-none">{booking.user}</p>
                       <p className="text-[9px] font-bold text-slate-400 mt-1">{booking.date}</p>
                    </td>
                    <td className="px-8 py-6">
                       <p className="text-xs font-black text-blue-600 leading-none">{booking.type}</p>
                       <p className="text-[9px] font-bold text-slate-400 mt-1">{booking.count}</p>
                    </td>
                    <td className="px-8 py-6">
                       <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                         booking.status === 'Paid' ? 'bg-emerald-50 text-emerald-600' :
                         booking.status === 'Pending' ? 'bg-orange-50 text-orange-600' :
                         'bg-red-50 text-red-600'
                       }`}>
                         {booking.status}
                       </span>
                    </td>
                    <td className="px-8 py-6 text-xs font-black text-slate-900 text-right">{booking.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Management Cards */}
        <div className="space-y-8">
           <div className="bg-gradient-to-br from-secondary to-indigo-700 rounded-[40px] p-10 text-white relative overflow-hidden group">
              <div className="relative z-10">
                <Map className="w-10 h-10 text-white/50 mb-6 group-hover:scale-110 transition-transform duration-500" />
                <h3 className="text-2xl font-black uppercase leading-tight mb-4">Manage <br /> Your Rides</h3>
                <p className="text-white/70 text-xs font-bold mb-8">Update pricing, status, and details for 50+ attractions.</p>
                <Link href="/admin/rides" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-secondary rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-50 transition-all">
                   Manage Rides <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
           </div>

           <div className="bg-white rounded-[40px] p-10 border border-slate-50 shadow-sm relative overflow-hidden group">
              <div className="relative z-10">
                <FileText className="w-10 h-10 text-slate-200 mb-6 group-hover:scale-110 transition-transform duration-500" />
                <h3 className="text-2xl font-black text-slate-900 uppercase leading-tight mb-4">Content <br /> Studio</h3>
                <p className="text-slate-400 text-xs font-bold mb-8">Publish news, park updates and blog stories for your visitors.</p>
                <Link href="/admin/blogs" className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-800 transition-all">
                   Write Blog <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
