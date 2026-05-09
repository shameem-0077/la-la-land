"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  LayoutDashboard, 
  Map, 
  Ticket, 
  FileText, 
  Users, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  Bell,
  Search,
  ChevronRight,
  ShieldCheck,
  MessageSquare,
  Image as ImageIcon,
  HardDrive
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { supabase } from "@/lib/supabase";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  // Protect all admin routes except login
  useEffect(() => {
    if (pathname === "/admin/login") {
      setIsLoading(false);
      return;
    }

    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        router.push("/admin/login");
      } else {
        setIsAuthenticated(true);
      }
      setIsLoading(false);
    };

    checkAuth();
  }, [pathname, router]);

  if (pathname === "/admin/login") return <>{children}</>;
  if (isLoading) return <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center text-secondary uppercase tracking-widest">Authenticating...</div>;
  if (!isAuthenticated) return null;

  const menuItems = [
    { label: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" />, href: "/admin/dashboard" },
    { label: "Rides & Activities", icon: <Map className="w-5 h-5" />, href: "/admin/rides" },
    { label: "Packages", icon: <Ticket className="w-5 h-5" />, href: "/admin/packages" },
    { label: "Blog Posts", icon: <FileText className="w-5 h-5" />, href: "/admin/blogs" },
    { label: "Testimonials", icon: <MessageSquare className="w-5 h-5" />, href: "/admin/testimonials" },
    { label: "Gallery", icon: <ImageIcon className="w-5 h-5" />, href: "/admin/gallery" },
    { label: "Storage", icon: <HardDrive className="w-5 h-5" />, href: "/admin/storage" },
    { label: "Bookings", icon: <Users className="w-5 h-5" />, href: "/admin/bookings" },
    { label: "Settings", icon: <Settings className="w-5 h-5" />, href: "/admin/settings" },
  ];

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-[#f1f5f9] flex relative">
      {/* Mobile Backdrop */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#0f172a] text-white transition-transform duration-300 ease-in-out transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0`}>
        <div className="h-full flex flex-col p-8">
          <div className="flex items-center justify-between mb-12 px-2">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-white" />
              </div>
              <div className="leading-none">
                <p className="text-sm uppercase tracking-tighter">La La Land</p>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-1">Admin Panel</p>
              </div>
            </div>
            <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden p-2 hover:bg-slate-800 rounded-lg text-slate-400">
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="flex-grow space-y-2">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link 
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`flex items-center gap-4 px-4 py-4 rounded-2xl text-xs uppercase tracking-widest transition-all group ${
                    isActive ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <span className={`${isActive ? 'text-white' : 'text-slate-500 group-hover:text-blue-400'} transition-colors`}>
                    {item.icon}
                  </span>
                  {item.label}
                  {isActive && <motion.div layoutId="activeNav" className="ml-auto w-1.5 h-1.5 rounded-full bg-white" />}
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto pt-8 border-t border-slate-800">
            <button 
              onClick={handleLogout}
              className="flex items-center gap-4 px-4 py-4 w-full rounded-2xl text-xs uppercase tracking-widest text-red-400 hover:bg-red-500/10 transition-all group"
            >
              <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-8 shrink-0">
          <div className="flex items-center gap-4 lg:hidden">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-slate-100 rounded-lg">
              <Menu className="w-6 h-6 text-slate-600" />
            </button>
          </div>

          <div className="hidden md:flex items-center gap-4 bg-slate-50 px-6 py-2.5 rounded-full border border-slate-100 w-96 group focus-within:border-blue-500 focus-within:bg-white transition-all">
            <Search className="w-4 h-4 text-slate-400 group-focus-within:text-blue-500" />
            <input type="text" placeholder="Search orders, rides..." className="bg-transparent border-none focus:outline-none text-xs text-slate-600 w-full" />
          </div>

          <div className="flex items-center gap-6">
            <button className="relative w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 hover:bg-slate-100 transition-all group">
              <Bell className="w-5 h-5 text-slate-400 group-hover:text-blue-500" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </button>
            <div className="h-10 w-[1px] bg-slate-200" />
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-xs text-slate-900 uppercase tracking-tighter leading-none">Admin User</p>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-1">Super Admin</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 p-0.5 shadow-lg shadow-blue-500/20">
                <div className="w-full h-full rounded-[10px] bg-white flex items-center justify-center text-blue-600 text-xs">
                  AD
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <div className="flex-grow overflow-y-auto p-4 md:p-8 bg-[#f8fafc]">
          <div className="max-w-7xl mx-auto h-full">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
