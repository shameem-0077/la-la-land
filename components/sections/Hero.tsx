"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Ticket, MessageCircle, Droplets, Mountain, Baby, Tag, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const badges = [
  { icon: <Droplets className="w-8 h-8 text-secondary" />, title: "Fun & Splash", sub: "Water Rides" },
  { icon: <Mountain className="w-8 h-8 text-secondary" />, title: "Nature & Thrill", sub: "Outdoor Adventure" },
  { icon: <Baby className="w-8 h-8 text-secondary" />, title: "Safe & Play", sub: "Kids Activities" },
  { icon: <Tag className="w-8 h-8 text-secondary" />, title: "Best Value", sub: "Affordable Packages" },
];

const Hero = () => {
  return (
    <>
      <section className="relative min-h-screen flex flex-col pt-32 overflow-hidden bg-secondary">
      {/* Immersive Background Layer */}
      <div className="absolute inset-0 z-0">
        {/* Main Park Image - Using standard img for guaranteed visibility */}
        <img
          src="/images/hero-bg-image.png"
          alt="La La Land Adventure Park"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        {/* Sky Color Fallback (if image fails to load) */}
        <div className="absolute inset-0 bg-secondary -z-10" />
        
        {/* Soft atmospheric overlays */}
        {/* <div className="absolute inset-0 bg-gradient-to-r from-[#2d31fa] via-[#2d31fa]/40 to-transparent lg:w-1/2 z-10" /> */}
        <div className="absolute inset-0 bg-white/5 backdrop-blur-[1px] z-10" />
      </div>

      <div className="container mx-auto px-4 flex-grow flex items-center relative z-10 pb-40 lg:pb-0">
        {/* Content Overlay */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl text-center lg:text-left flex flex-col gap-8 md:gap-10"
        >
          <div className="flex flex-col gap-6">
            <h1 className="text-4xl md:text-6xl lg:text-[86px] font-black text-white leading-[0.95] tracking-tight">
              Best Adventure Park in
              <span className="text-accent"> Wayanad.</span>
            </h1>
            <p className="text-lg md:text-2xl text-white/80 font-bold max-w-xl mx-auto lg:mx-0">
              Adventures for all ages. Memories for a lifetime.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6 justify-center lg:justify-start">
            <Link
              href="/book"
              className="w-full sm:w-auto flex items-center justify-center gap-4 px-8 py-4 md:px-10 md:py-5 bg-primary text-white rounded-full font-black text-xs md:text-sm uppercase tracking-widest hover:bg-primary-dark transition-all shadow-2xl"
            >
              Book Tickets
              <Ticket className="w-5 h-5 fill-current" />
            </Link>
            <Link
              href="/rides"
              className="w-full sm:w-auto flex items-center justify-center gap-4 px-8 py-4 md:px-10 md:py-5 bg-white text-secondary rounded-full font-black text-xs md:text-sm uppercase tracking-widest hover:bg-muted transition-all shadow-xl shadow-black/5 group"
            >
              Explore Rides
              <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Wave Divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-20">
        <svg viewBox="0 0 1440 160" className="relative block w-full h-[60px] md:h-[140px]" preserveAspectRatio="none">
          <path 
            fill="#ffffff" 
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,106.7C960,117,1056,139,1152,138.7C1248,139,1344,117,1392,106.7L1440,96L1440,160L1392,160C1344,160,1248,160,1152,160C1056,160,960,160,864,160C768,160,672,160,576,160C480,160,384,160,288,160C192,160,96,160,48,160L0,160Z"
          ></path>
        </svg>
      </div>
    </section>

    {/* Badges Section */}
    <div className="bg-white py-4 md:py-12 relative z-30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-0">
          {badges.map((badge, i) => (
            <React.Fragment key={i}>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4 px-6 md:px-8 py-2 lg:py-0 w-full max-w-xs lg:w-auto mx-auto lg:mx-0"
              >
                <div className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center shrink-0 shadow-sm border-2 md:border-4 border-white ${
                  i === 0 ? 'bg-primary/10' : 
                  i === 1 ? 'bg-secondary/10' : 
                  i === 2 ? 'bg-accent/10' : 
                  'bg-success/10'
                }`}>
                  {badge.icon}
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[10px] md:text-[11px] font-bold text-zinc-400 uppercase tracking-tight leading-none mb-1">{badge.title}</span>
                  <span className="text-xs md:text-sm font-black text-secondary leading-tight">{badge.sub}</span>
                </div>
              </motion.div>
              
              {/* Dotted Divider */}
              {i < badges.length - 1 && (
                <div className="hidden lg:block w-[1px] h-12 border-l-2 border-dotted border-zinc-200 mx-4" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
</>
  );
};

export default Hero;
