"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { getOptimizedImage } from "@/lib/utils";

interface PageHeroProps {
  title: React.ReactNode;
  subtitle: string;
  bgImage: string;
  badgeText: string;
  primaryBtnText?: string;
  primaryBtnLink?: string;
  secondaryBtnText?: string;
  secondaryBtnLink?: string;
}

const PageHero = ({
  title,
  subtitle,
  bgImage,
  badgeText,
  primaryBtnText,
  primaryBtnLink,
  secondaryBtnText,
  secondaryBtnLink
}: PageHeroProps) => {
  return (
    <section className="relative w-full min-h-[100dvh] md:h-screen flex items-center justify-center overflow-hidden">
      
      {/* --- Background Image (No Blur on Mobile, High Quality) --- */}
      <div className="absolute inset-0 z-0">
        <img 
          src={getOptimizedImage(bgImage)} 
          alt="Lala Land Hero" 
          className="w-full h-full object-cover md:blur-[1px] md:scale-[1.01] brightness-[0.7] md:brightness-[0.65]" 
        />
      </div>

      {/* --- Content Area --- */}
      <div className="container mx-auto px-6 relative z-10 text-center flex flex-col items-center justify-center py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-5xl"
        >
          {/* Top Badge: Floating Pill */}
          <div className="mb-6 flex items-center justify-center">
             <span className="px-5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] md:text-[12px] font-black tracking-[0.3em] uppercase shadow-2xl">
                {badgeText}
             </span>
          </div>

          {/* Headline: Powerful & Cinematic */}
          <h1 
            className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-[1.05] md:leading-[1.1] mb-8 max-w-[1000px] mx-auto tracking-tighter"
            style={{ textShadow: "0 4px 30px rgba(0,0,0,0.5)" }}
          >
             {title}
          </h1>

          {/* Subtitle: High Contrast */}
          <p 
            className="text-sm md:text-lg text-white font-medium leading-relaxed max-w-[700px] mx-auto mb-10 px-4 opacity-90"
            style={{ textShadow: "0 2px 10px rgba(0,0,0,0.3)" }}
          >
             {subtitle}
          </p>

          {/* Buttons: High Impact */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full sm:w-auto">
            {primaryBtnText && primaryBtnLink && (
              <Link
                href={primaryBtnLink}
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-12 py-5 bg-[#FFBB00] text-[#142127] rounded-full text-xs md:text-sm font-black transition-all hover:bg-white hover:scale-105 active:scale-95 shadow-[0_20px_40px_rgba(255,187,0,0.3)] uppercase tracking-widest"
              >
                {primaryBtnText}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            )}
            
            {secondaryBtnText && secondaryBtnLink && (
              <Link
                href={secondaryBtnLink}
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-12 py-5 bg-white/10 backdrop-blur-xl border border-white/30 text-white rounded-full text-xs md:text-sm font-black transition-all hover:bg-white/20 uppercase tracking-widest"
              >
                {secondaryBtnText}
              </Link>
            )}
          </div>
        </motion.div>
      </div>

    </section>
  );
};

export default PageHero;
