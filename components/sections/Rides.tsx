"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Ticket } from "lucide-react";
import { motion } from "framer-motion";
import { getOptimizedImage } from "@/lib/utils";

interface RidesProps {
  initialCategories?: any[];
}

const accentColors = [
  { bg: "bg-[#FD2B12]", text: "text-white" },
  { bg: "bg-[#005EFE]", text: "text-white" },
  { bg: "bg-[#76A700]", text: "text-white" },
  { bg: "bg-[#FFBB00]", text: "text-[#142127]" },
  { bg: "bg-[#FF7D01]", text: "text-white" },
  { bg: "bg-[#00A9BE]", text: "text-white" },
];

const Rides = ({ initialCategories = [] }: RidesProps) => {
  return (
    <section id="rides" className="relative py-12 md:py-16 bg-[#FFF6E7] overflow-hidden">
      
      {/* Absolute minimal background */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#FFBB00]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#005EFE]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-10 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20 md:mb-28"
        >
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white text-[#FD2B12] text-[10px] uppercase tracking-[0.2em] mb-5 font-bold border border-[#E5DCCB] shadow-sm">
            <Ticket className="w-3 h-3" />
            Park Attractions
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-[62px] font-black text-[#142127] leading-tight tracking-tighter">
            Choose Your{" "}
            <span className="text-[#005EFE]">Adventure</span>
          </h2>
          <p className="text-base md:text-lg text-[#142127]/50 mt-4 max-w-xl mx-auto">
            From high-speed thrills to cool splashes — there&apos;s something for everyone at La La Park.
          </p>
        </motion.div>

        {/* Circular Badge Grid */}
        {initialCategories.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16 md:gap-y-24">
            {initialCategories.map((cat, i) => {
              const accent = accentColors[i % accentColors.length];
              return (
                <motion.div
                  key={cat.id || i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, type: "spring", stiffness: 100 }}
                >
                  <Link href={`/rides?category=${cat.slug}`} className="block relative group w-full max-w-[280px] mx-auto">
                    
                    {/* The Circle */}
                    <div className="w-full aspect-square rounded-full border-[8px] border-white shadow-[0_12px_24px_rgba(20,33,39,0.08)] overflow-hidden relative group-hover:shadow-[0_20px_40px_rgba(20,33,39,0.15)] transition-all duration-500 group-hover:-translate-y-2">
                      <Image
                        src={getOptimizedImage(cat.cover_image || cat.image || "")}
                        alt={cat.name || "Ride Category"}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-[#142127]/10 group-hover:bg-transparent transition-colors duration-500" />
                    </div>

                    {/* The Badge Ribbon */}
                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[85%] z-10">
                      <div className={`py-3.5 px-4 rounded-full text-center shadow-lg border-4 border-white transition-transform duration-500 group-hover:scale-105 ${accent.bg}`}>
                        <h3 className={`text-xs md:text-sm font-black uppercase tracking-widest whitespace-nowrap overflow-hidden text-ellipsis ${accent.text}`}>
                          {cat.name}
                        </h3>
                      </div>
                    </div>

                  </Link>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 bg-white rounded-[32px] border-2 border-dashed border-[#E5DCCB]">
            <p className="text-[#B9BEC1] uppercase tracking-widest text-[10px] font-bold">No categories found</p>
          </div>
        )}

        {/* View All */}
        <div className="mt-20 md:mt-28 text-center">
          <Link
            href="/rides"
            className="inline-flex items-center gap-2 text-sm text-[#142127] hover:text-[#FD2B12] transition-colors uppercase tracking-widest font-black group"
          >
            Explore All Attractions
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Rides;
