"use client";

import React, { useState, useEffect } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getOptimizedImage } from "@/lib/utils";

interface TestimonialsProps {
  initialItems?: any[];
}

const Testimonials = ({ initialItems = [] }: TestimonialsProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (initialItems.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1 >= initialItems.length ? 0 : prev + 1));
    }, 8000);
    return () => clearInterval(timer);
  }, [currentIndex, initialItems.length]);

  if (initialItems.length === 0) return null;

  const prev = () => setCurrentIndex((p) => (p - 1 < 0 ? initialItems.length - 1 : p - 1));
  const next = () => setCurrentIndex((p) => (p + 1 >= initialItems.length ? 0 : p + 1));

  // Indices for the desktop arc
  const prevIndex = (currentIndex - 1 + initialItems.length) % initialItems.length;
  const nextIndex = (currentIndex + 1) % initialItems.length;

  return (
    <section id="testimonials" className="relative py-12 md:py-16 bg-white overflow-hidden">
      
      {/* Background Subtle Gradient */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FD2B12]/[0.02] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#FFBB00]/[0.02] rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* --- Section Title --- */}
        <div className="text-center mb-12 md:mb-24">
           <span className="inline-block px-5 py-2 rounded-full bg-[#142127]/5 text-[#142127] text-[10px] uppercase tracking-[0.22em] mb-5 font-bold border border-[#142127]/10">
              Guest Experiences
           </span>
           <h2 className="text-3xl md:text-5xl lg:text-[62px] font-black text-[#142127] leading-tight tracking-tighter uppercase">
              Words From Our <span className="text-[#FD2B12]">Visitors</span>
           </h2>
        </div>

        {/* --- MOBILE LAYOUT (Simple & Clean) --- */}
        <div className="lg:hidden flex flex-col items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full text-center"
            >
              <div className="w-24 h-24 rounded-full mx-auto mb-6 border-4 border-white shadow-xl overflow-hidden p-1 bg-white">
                <img src={getOptimizedImage(initialItems[currentIndex]?.avatar)} alt="" className="w-full h-full rounded-full object-cover" />
              </div>
              
              <h4 className="text-xl font-black text-[#142127] mb-2">{initialItems[currentIndex]?.name}</h4>
              <div className="flex justify-center items-center gap-1.5 mb-8">
                 <div className="flex">
                    {[...Array(Math.floor(initialItems[currentIndex]?.rating || 5))].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#76A700] text-[#76A700]" />
                    ))}
                 </div>
                 <span className="text-xs font-bold text-[#142127]/40 uppercase tracking-widest">
                    {initialItems[currentIndex]?.rating || "5.0"} Rated
                 </span>
              </div>

              <div className="relative px-4">
                 <Quote className="w-8 h-8 text-[#142127]/10 mx-auto mb-4" />
                 <p className="text-lg font-medium text-[#142127]/80 leading-relaxed italic">
                    {initialItems[currentIndex]?.text}
                 </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Mobile Nav */}
          <div className="flex items-center gap-6 mt-12">
            <button onClick={prev} className="w-12 h-12 rounded-full border border-zinc-200 flex items-center justify-center">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              {initialItems.map((_, i) => (
                <div key={i} className={`w-2 h-2 rounded-full ${i === currentIndex ? 'bg-[#FD2B12]' : 'bg-zinc-200'}`} />
              ))}
            </div>
            <button onClick={next} className="w-12 h-12 rounded-full border border-zinc-200 flex items-center justify-center">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* --- DESKTOP LAYOUT (The Arc Slider) --- */}
        <div className="hidden lg:flex flex-row items-center justify-between gap-20">
          
          {/* Left: Arc */}
          <div className="relative w-full max-w-[500px] aspect-square flex items-center justify-center">
            <div className="absolute left-0 w-[150%] h-[150%] border-l border-zinc-100 rounded-full translate-x-[-70%] pointer-events-none" />
            <div className="relative w-full h-full">
              
              {/* Previous */}
              <motion.div 
                key={`prev-${prevIndex}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                className="absolute top-[15%] left-[10%] flex items-center gap-4 cursor-pointer"
                onClick={() => setCurrentIndex(prevIndex)}
              >
                <div className="w-16 h-16 rounded-full overflow-hidden grayscale border border-zinc-200 p-1 bg-white">
                  <img src={getOptimizedImage(initialItems[prevIndex]?.avatar)} alt="" className="w-full h-full rounded-full object-cover" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-[#142127]">{initialItems[prevIndex]?.name}</p>
                </div>
              </motion.div>

              {/* Current */}
              <motion.div 
                key={`curr-${currentIndex}`}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="absolute top-1/2 left-[35%] -translate-y-1/2 flex items-center gap-6 z-20"
              >
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-[0_20px_50px_rgba(0,0,0,0.15)] p-1.5 bg-white">
                  <img src={getOptimizedImage(initialItems[currentIndex]?.avatar)} alt="" className="w-full h-full rounded-full object-cover" />
                </div>
                <div className="text-left">
                  <h4 className="text-2xl font-black text-[#142127] mb-1">{initialItems[currentIndex]?.name}</h4>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-0.5">
                      {[...Array(Math.floor(initialItems[currentIndex]?.rating || 5))].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#76A700] text-[#76A700]" />
                      ))}
                    </div>
                    <span className="text-sm font-bold text-[#142127]/60">
                      {initialItems[currentIndex]?.rating || "5.0"} rated
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Next */}
              <motion.div 
                key={`next-${nextIndex}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                className="absolute bottom-[15%] left-[10%] flex items-center gap-4 cursor-pointer"
                onClick={() => setCurrentIndex(nextIndex)}
              >
                <div className="w-16 h-16 rounded-full overflow-hidden grayscale border border-zinc-200 p-1 bg-white">
                  <img src={getOptimizedImage(initialItems[nextIndex]?.avatar)} alt="" className="w-full h-full rounded-full object-cover" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-[#142127]">{initialItems[nextIndex]?.name}</p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right: Text */}
          <div className="flex-1 lg:pl-20 relative text-left">
            <Quote className="w-10 h-10 text-[#142127]/10 mb-8" />
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="relative"
              >
                <p className="text-2xl lg:text-[28px] font-medium text-[#142127]/80 leading-[1.6] relative italic first-letter:text-7xl first-letter:font-black first-letter:float-left first-letter:mr-4 first-letter:mt-2 first-letter:text-[#142127] first-letter:not-italic">
                  {initialItems[currentIndex]?.text}
                </p>
                <div className="mt-12 pt-8 border-t border-zinc-100 flex items-center gap-6">
                   <div className="flex -space-x-3">
                      {initialItems.slice(0, 4).map((item, i) => (
                        <div key={i} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden">
                           <img src={getOptimizedImage(item.avatar)} alt="" className="w-full h-full object-cover" />
                        </div>
                      ))}
                   </div>
                   <p className="text-xs font-bold uppercase tracking-widest text-[#142127]/40">
                      Join {initialItems.length}+ happy visitors this season
                   </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Testimonials;
