"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  HardDrive, 
  File, 
  Clock, 
  Database, 
  PieChart, 
  Info, 
  ExternalLink,
  Shield,
  Search,
  Download,
  Trash2,
  Eye,
  X
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { getBucketDetails } from "../actions";
import { supabase } from "@/lib/supabase";

export default function BucketDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [supabaseClient] = useState(() => supabase);

  useEffect(() => {
    if (id) fetchDetails();
  }, [id]);

  const fetchDetails = async () => {
    setIsLoading(true);
    try {
      const result = await getBucketDetails(id as string);
      setData(result);
    } catch (err: any) {
      console.error("Error fetching bucket details:", err);
      // router.push("/admin/storage");
    } finally {
      setIsLoading(false);
    }
  };

  const isImage = (fileName: string) => {
    const ext = fileName.split('.').pop()?.toLowerCase();
    return ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(ext || '');
  };

  const handleView = (file: any) => {
    const { data: { publicUrl } } = supabaseClient.storage.from(id as string).getPublicUrl(file.fullPath || file.name);
    setPreviewImage(publicUrl);
  };

  if (isLoading) return <div className="flex items-center justify-center min-h-screen text-xs uppercase tracking-widest text-slate-400">Analyzing Bucket...</div>;
  if (!data) return <div className="p-20 text-center uppercase tracking-widest text-slate-400">Bucket not found</div>;

  const filteredFiles = data.files.filter((f: any) => 
    f.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Link href="/admin/storage" className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors group">
          <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center group-hover:-translate-x-1 transition-transform">
            <ArrowLeft className="w-5 h-5" />
          </div>
          <span className="text-xs font-black uppercase tracking-widest">Storage Explorer</span>
        </Link>

        <div className="flex items-center gap-4">
           <div className={`flex items-center gap-2 px-4 py-2 rounded-full border text-[10px] font-black uppercase tracking-widest ${data.public ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'}`}>
              <Shield className="w-3 h-3" />
              {data.public ? 'Public Bucket' : 'Private Bucket'}
           </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-xl shadow-blue-600/20">
               <HardDrive className="w-6 h-6" />
            </div>
            <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight">{data.name}</h1>
          </div>
          <p className="text-slate-500 text-sm ml-16">Detailed insights and asset management</p>
        </div>
      </div>

      {/* Insights Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Usage Stats */}
         <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-200">
               <div className="flex items-center justify-between mb-6">
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Total Usage</p>
                  <Database className="w-4 h-4 text-blue-600" />
               </div>
               <h2 className="text-4xl font-black text-slate-900 mb-2">{formatSize(data.stats.totalSize)}</h2>
               <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-6">of 100 MB Allocation</p>
               
               <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden mb-2">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, (data.stats.totalSize / (100 * 1024 * 1024)) * 100)}%` }}
                    className="h-full bg-blue-600 rounded-full shadow-lg shadow-blue-600/20"
                  />
               </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-slate-900 p-8 rounded-[40px] shadow-xl text-white">
               <div className="flex items-center justify-between mb-6">
                  <p className="text-[10px] text-white/40 font-black uppercase tracking-widest">Asset Count</p>
                  <File className="w-4 h-4 text-blue-400" />
               </div>
               <h2 className="text-4xl font-black text-white mb-2">{data.stats.fileCount}</h2>
               <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest mb-6">Managed Files</p>
               
               <div className="flex gap-1">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                       <motion.div 
                         initial={{ height: 0 }}
                         animate={{ height: "100%" }}
                         transition={{ delay: i * 0.05 }}
                         className="w-full bg-blue-500"
                       />
                    </div>
                  ))}
               </div>
            </motion.div>
         </div>

         {/* Distribution */}
         <div className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-8">
               <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">MIME Types</p>
               <PieChart className="w-4 h-4 text-slate-400" />
            </div>
            <div className="space-y-4">
               {Object.entries(data.stats.types).map(([type, count]: any, i) => (
                 <div key={type} className="space-y-2">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                       <span className="text-slate-900">{type}</span>
                       <span className="text-slate-400">{count} files</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-50 rounded-full overflow-hidden">
                       <motion.div 
                         initial={{ width: 0 }}
                         animate={{ width: `${(count / data.stats.fileCount) * 100}%` }}
                         className={`h-full rounded-full ${i === 0 ? 'bg-blue-600' : i === 1 ? 'bg-emerald-500' : 'bg-slate-300'}`}
                       />
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </div>

      {/* File Browser */}
      <div className="bg-white rounded-[40px] shadow-sm border border-slate-200 overflow-hidden">
         <div className="p-8 border-b border-slate-100 flex flex-col md:flex-row gap-6 items-center justify-between">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-900">File Browser</h3>
            <div className="relative w-full md:w-96 group">
               <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
               <input 
                 type="text" 
                 placeholder="Search files..." 
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
                 className="w-full pl-16 pr-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-sm"
               />
            </div>
         </div>

         <div className="overflow-x-auto">
            <table className="w-full">
               <thead>
                  <tr className="border-b border-slate-50">
                     <th className="px-8 py-6 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Name</th>
                     <th className="px-8 py-6 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Size</th>
                     <th className="px-8 py-6 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Created</th>
                     <th className="px-8 py-6 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">Action</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-50">
                  {filteredFiles.map((file: any, i: number) => (
                    <tr key={i} className="hover:bg-slate-50/50 transition-colors group">
                       <td className="px-8 py-6">
                          <div className="flex items-center gap-4">
                             <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-all">
                                <File className="w-5 h-5" />
                             </div>
                             <span className="text-sm font-bold text-slate-900 max-w-[300px] truncate">{file.name}</span>
                          </div>
                       </td>
                       <td className="px-8 py-6 text-sm font-medium text-slate-500">{formatSize(file.metadata?.size || 0)}</td>
                       <td className="px-8 py-6 text-sm font-medium text-slate-500">{new Date(file.created_at).toLocaleDateString()}</td>
                       <td className="px-8 py-6 text-right">
                          <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                             {isImage(file.name) && (
                               <button 
                                 onClick={() => handleView(file)}
                                 className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-600 transition-all shadow-sm"
                                 title="View Image"
                               >
                                  <Eye className="w-4 h-4" />
                               </button>
                             )}
                             <button className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-600 transition-all">
                                <Download className="w-4 h-4" />
                             </button>
                             <button className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-red-600 transition-all">
                                <Trash2 className="w-4 h-4" />
                             </button>
                          </div>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>

      {/* Image Preview Modal */}
      {previewImage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
           <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             onClick={() => setPreviewImage(null)}
             className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm" 
           />
           <motion.div 
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             className="relative max-w-5xl max-h-full bg-white rounded-[40px] overflow-hidden shadow-2xl z-10"
           >
              <button 
                onClick={() => setPreviewImage(null)}
                className="absolute top-6 right-6 w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-all flex items-center justify-center z-20 border border-white/20"
              >
                 <X className="w-6 h-6" />
              </button>
              <img src={previewImage} className="max-w-full max-h-[80vh] object-contain block" alt="Preview" />
              <div className="p-8 bg-white flex items-center justify-between">
                 <div>
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest font-black mb-1">Asset Link</p>
                    <p className="text-sm font-bold text-slate-900 truncate max-w-md">{previewImage}</p>
                 </div>
                 <a 
                   href={previewImage} 
                   target="_blank" 
                   className="px-6 py-3 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2"
                 >
                    <ExternalLink className="w-4 h-4" />
                    Open Full
                 </a>
              </div>
           </motion.div>
        </div>
      )}
    </div>
  );
}
