"use client";

import React from "react";
import Image from "next/image";
import { Camera, Maximize2 } from "lucide-react";
import { motion } from "framer-motion";

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const galleryItems = [
  { title: "Epic Giant Swing", image: "/rides_tower_activities_1778054789676.png", size: "lg" },
  { title: "Water Park Fun", image: "/water_activities_image_1778049553201.png", size: "sm" },
  { title: "Kids Adventure Zone", image: "/rides_kids_activities_1778055058230.png", size: "sm" },
  { title: "Rain Dance Party", image: "/amusement_activities_image_1778049573930.png", size: "sm" },
  { title: "Thrilling Rope Course", image: "/rides_rope_activities_1778054766682.png", size: "lg" },
  { title: "Sunset at the Park", image: "/park_hero_image_1778049530668.png", size: "sm" },
];

const Gallery = () => {
  return (
    <section id="gallery" className="py-8 md:py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-6 md:gap-8 mb-6 md:mb-16 text-center md:text-left">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-secondary text-[10px] uppercase tracking-[0.2em] mb-4 border border-primary/10">
                Visual Tour
              </span>
              <h2 className="text-3xl md:text-5xl font-black text-secondary leading-tight">
                Adventure in <span className="text-primary-dark">Frames</span>
              </h2>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-4"
          >
            <div className="text-right hidden sm:block">
              <p className="text-[10px] text-[#0f172a] uppercase tracking-wider">Follow our Journey</p>
              <p className="text-[10px] text-zinc-400">@lalalandwayanad</p>
            </div>
            <a 
              href="https://instagram.com" 
              className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] flex items-center justify-center text-white shadow-xl hover:scale-110 transition-transform"
            >
              <InstagramIcon className="w-5 h-5 md:w-6 md:h-6" />
            </a>
          </motion.div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {galleryItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`group relative rounded-[30px] md:rounded-[40px] overflow-hidden cursor-pointer shadow-xl aspect-square md:aspect-auto ${
                item.size === 'lg' 
                  ? 'lg:col-span-2 lg:row-span-2 md:h-[600px]' 
                  : 'lg:col-span-1 lg:row-span-1 md:h-[290px]'
              }`}
            >
              <Image 
                src={item.image} 
                alt={item.title} 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="text-[10px] text-white/70 uppercase tracking-[0.2em] mb-2 block">La La Land Moments</span>
                  <h3 className="text-2xl font-black text-white leading-tight mb-4">{item.title}</h3>
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30">
                    <Maximize2 className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Callout */}
        <div className="mt-16 text-center">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-zinc-400 text-sm uppercase tracking-[0.15em]"
          >
            Tag your memories with <span className="text-[#ff7d00]">#LaLaLandWayanad</span> to get featured!
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
