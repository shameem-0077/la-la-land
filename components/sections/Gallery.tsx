"use client";

import React from "react";
import Image from "next/image";
import { Camera, Maximize2, Star, Image as ImageIcon } from "lucide-react";
import { motion } from "framer-motion";
import { getOptimizedImage } from "@/lib/utils";

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

interface GalleryProps {
  initialItems?: any[];
}

const rotations = [-2, 3, -4, 2, -1, 4, -3, 1];
const pinColors = ["#FD2B12", "#005EFE", "#FFBB00", "#76A700"];

const Gallery = ({ initialItems = [] }: GalleryProps) => {
  return (
    <section id="gallery" className="relative py-20 md:py-28 overflow-hidden" style={{ background: "#FFF6E7" }}>
      {/* Decorative background polka dots */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none z-0"
        style={{ backgroundImage: "radial-gradient(#142127 2px, transparent 2px)", backgroundSize: "28px 28px" }}
      />

      {/* Festive banner strings (Blue & Green to contrast with Packages' Red & Yellow) */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden h-16 pointer-events-none opacity-20 z-0">
        <svg viewBox="0 0 1440 64" preserveAspectRatio="none" className="w-full h-full">
          <path d="M0,10 Q180,50 360,10 Q540,50 720,10 Q900,50 1080,10 Q1260,50 1440,10" fill="none" stroke="#005EFE" strokeWidth="2" />
          {[60,180,300,420,540,660,780,900,1020,1140,1260,1380].map((x) => (
            <polygon key={x} points={`${x},14 ${x-10},38 ${x+10},38`} fill={x%2===0?"#005EFE":"#76A700"} opacity="0.9" />
          ))}
        </svg>
      </div>

      <div className="container mx-auto px-6 lg:px-10 relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12 md:mb-16"
        >
          <div>
            <span className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#005EFE] text-white text-[10px] uppercase tracking-[0.25em] mb-5 font-black shadow-lg shadow-[#005EFE]/30">
              <Star className="w-3 h-3 fill-[#FFBB00] text-[#FFBB00]" />
              Captured Memories
              <Star className="w-3 h-3 fill-[#FFBB00] text-[#FFBB00]" />
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-[62px] font-black text-[#142127] leading-tight tracking-tighter">
              Park Life in{" "}
              <span className="text-[#005EFE]">Frames</span>
            </h2>
          </div>

          {/* Instagram CTA */}
          <motion.a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, rotate: 2 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-3 px-7 py-4 rounded-2xl bg-[#142127] text-white shadow-xl shadow-[#142127]/20 hover:shadow-2xl transition-all shrink-0 border-b-4 border-black/30"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] flex items-center justify-center shrink-0">
              <InstagramIcon className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <p className="text-[11px] uppercase tracking-widest font-black">@lalalandwayanad</p>
              <p className="text-[10px] text-white/60">Follow Our Journey</p>
            </div>
          </motion.a>
        </motion.div>

        {/* Polaroid Grid */}
        {initialItems.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 auto-rows-[220px] md:auto-rows-[280px]">
            {initialItems.map((item, i) => {
              const rotation = rotations[i % rotations.length];
              const pinColor = pinColors[i % pinColors.length];
              const isLarge = item.size === "lg";

              return (
                <motion.div
                  key={item.id || i}
                  initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: rotation }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, type: "spring", stiffness: 100 }}
                  whileHover={{ scale: 1.05, rotate: 0, zIndex: 30 }}
                  className={`group relative bg-white p-3 md:p-4 shadow-xl border border-[#E5DCCB] cursor-pointer flex flex-col ${
                    isLarge ? "col-span-2 row-span-2 pb-12 md:pb-16" : "col-span-1 row-span-1 pb-10 md:pb-12"
                  }`}
                  style={{ zIndex: 10 + (i % 5) }}
                >
                  {/* Push Pin */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 z-20 flex flex-col items-center">
                    <div className="w-4 h-4 rounded-full shadow-md" style={{ backgroundColor: pinColor }} />
                    <div className="w-1 h-3 bg-zinc-300 -mt-1 shadow-sm" />
                  </div>

                  {/* Image container */}
                  <div className="relative w-full flex-grow overflow-hidden bg-zinc-100 mb-2 border border-zinc-100">
                    <Image
                      src={getOptimizedImage(item.image)}
                      alt={item.title || "Gallery"}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110 filter saturate-[1.1] contrast-[1.05]"
                    />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-[#005EFE]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                      <div className="w-12 h-12 rounded-full bg-[#FFBB00] text-[#142127] flex items-center justify-center transform scale-50 group-hover:scale-100 transition-transform duration-300 ease-out shadow-lg">
                        <Maximize2 className="w-5 h-5 font-bold" />
                      </div>
                    </div>
                  </div>

                  {/* Caption */}
                  <div className="absolute bottom-2 md:bottom-3 left-0 right-0 text-center px-4">
                    {item.title ? (
                      <p className="text-xs md:text-sm font-black text-[#142127] uppercase tracking-wider truncate">
                        {item.title}
                      </p>
                    ) : (
                      <p className="text-[10px] md:text-xs font-bold text-[#B9BEC1] uppercase tracking-widest">
                        La La Park
                      </p>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 bg-white/80 backdrop-blur-sm rounded-[32px] border-2 border-dashed border-[#E5DCCB]">
            <ImageIcon className="w-12 h-12 text-[#E5DCCB] mb-4" />
            <p className="text-[#B9BEC1] uppercase tracking-widest text-[10px] font-bold">No moments captured yet</p>
            <p className="text-[#B9BEC1] text-xs mt-1">Check back soon for park memories!</p>
          </div>
        )}

        {/* Hashtag footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center justify-center gap-3 px-6 py-3 bg-white rounded-full border border-[#E5DCCB] shadow-sm transform -rotate-1">
            <Camera className="w-4 h-4 text-[#FD2B12]" />
            <p className="text-[#142127] text-xs md:text-sm uppercase tracking-widest font-bold">
              Tag <span className="text-[#005EFE]">#LaLaParkWayanad</span> to get featured!
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Gallery;
