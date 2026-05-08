"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CTA from "@/components/sections/CTA";
import { MessageCircle, Ticket, Users, Clock, ShieldCheck, Waves, Info, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";

const ridesData: Record<string, any> = {
  "swimming-pool": {
    title: "Swimming Pool",
    category: "Water Fun",
    tagline: "Dive. Relax. Refresh. Fun for Everyone!",
    desc: "Take a refreshing break and dive into fun at our sparkling swimming pool. Perfect for all ages and every mood!",
    heroImage: "/swimming_pool_hero.png",
    details: "Dive into pure relaxation and joy at our Swimming Pool, a refreshing retreat set amidst a lively and natural atmosphere. Perfect for families, friends, and solo visitors alike, the pool offers a space to unwind, cool off, and enjoy carefree moments away from routine life.",
    extraText: "Whether you prefer a calm soak, playful splashing, or simply lounging by the water, the experience is designed to suit all moods and age groups. The soothing environment and cheerful vibe make it an ideal spot to relax after a day of adventure or to spend quality time with loved ones.",
    highlights: [
      { label: "All Ages Welcome", icon: <Users className="w-5 h-5" /> },
      { label: "Crystal Clear Water", icon: <Waves className="w-5 h-5" /> },
      { label: "Safe & Supervised", icon: <ShieldCheck className="w-5 h-5" /> },
      { label: "Perfect for Families", icon: <Users className="w-5 h-5" /> },
      { label: "Relax & Unwind", icon: <Star className="w-5 h-5" /> },
    ],
    specs: [
      { label: "Timings", value: "9:30 AM - 6:30 PM", icon: <Clock className="w-6 h-6 text-primary" /> },
      { label: "Best For", value: "Families, Kids & Groups", icon: <Users className="w-6 h-6 text-primary" /> },
      { label: "Depth", value: "Kid Zone | 2.5 ft\nMain Pool | 4.5 ft", icon: <Waves className="w-6 h-6 text-primary" /> },
      { label: "Safety First", value: "Lifeguards & Safety Gear Available", icon: <ShieldCheck className="w-6 h-6 text-primary" /> },
    ],
    gallery: [
      { title: "Fun with Friends", image: "/water_activities_image_1778049553201.png" },
      { title: "Kids Splash Zone", image: "/rides_kids_activities_1778055058230.png" },
      { title: "Relax & Unwind", image: "/swimming_pool_hero.png" },
    ]
  }
};

export default function RideDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const category = params.category as string;
  const ride = ridesData[slug] || ridesData["swimming-pool"]; // Fallback for demo

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center pt-20 overflow-hidden bg-secondary">
        <div className="absolute inset-0 z-0">
          <Image
            src={ride.heroImage}
            alt={ride.title}
            fill
            className="object-cover"
          />
          {/* Atmosphere Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/60 via-secondary/30 to-transparent" />
          <div className="absolute inset-0 backdrop-blur-[2px] opacity-30" />
        </div> 

        <div className="container mx-auto px-4 relative z-10 pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#ff7d00] text-white text-[10px] uppercase tracking-[0.2em] mb-6 shadow-xl">
              <Waves className="w-3 h-3 fill-white" />
              {ride.category}
            </span>
            <h1 className="text-6xl md:text-8xl font-black text-white leading-[0.95] mb-6 tracking-tighter">
              {ride.title}
            </h1>
            <div className="mb-8">
               <p className="text-xl md:text-2xl text-[#fbbf24] uppercase tracking-wider mb-2">{ride.tagline}</p>
               <p className="text-lg text-white/90 max-w-xl leading-relaxed">{ride.desc}</p>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Link href="#tickets" className="flex items-center gap-3 bg-[#2d31fa] hover:bg-rose-600 text-white py-4 px-10 rounded-full shadow-2xl transition-all text-xs tracking-widest uppercase">
                Book Tickets <Ticket className="w-5 h-5 fill-white" />
              </Link>
              <Link href="#whatsapp" className="flex items-center gap-3 bg-white hover:bg-zinc-100 text-[#ff7d00] py-4 px-10 rounded-full shadow-2xl transition-all text-xs tracking-widest uppercase">
                Chat on WhatsApp <MessageCircle className="w-5 h-5 fill-[#22c55e] text-[#22c55e]" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Signature Wave Divider */}
        <div className="absolute -bottom-[1px] left-0 w-full overflow-hidden leading-[0] z-20">
          <svg viewBox="0 0 1440 160" className="relative block w-full h-[100px] md:h-[150px]" preserveAspectRatio="none">
            <path 
              fill="#ffffff" 
              d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,106.7C960,117,1056,139,1152,138.7C1248,139,1344,117,1392,106.7L1440,96L1440,160L1392,160C1344,160,1248,160,1152,160C1056,160,960,160,864,160C768,160,672,160,576,160C480,160,384,160,288,160C192,160,96,160,48,160L0,160Z"
            ></path>
            {/* Subtle sprinkles to match main Hero */}
            <circle cx="50" cy="80" r="3" fill="#02a1a8" fillOpacity="0.3" />
            <circle cx="200" cy="100" r="2" fill="#ffb902" fillOpacity="0.3" />
            <circle cx="800" cy="90" r="4" fill="#fd4b01" fillOpacity="0.2" />
          </svg>
        </div>
      </section>

      {/* Quick Info Bar */}
      <section className="bg-white py-12 relative z-30">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {ride.highlights.map((item: any, i: number) => (
              <div key={i} className="flex items-center gap-4 group">
                <div className="w-14 h-14 rounded-2xl bg-zinc-50 flex items-center justify-center text-primary shadow-sm group-hover:bg-primary group-hover:text-white transition-all">
                  {item.icon}
                </div>
                <span className="text-sm text-zinc-500 uppercase tracking-widest">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Info */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-8 h-1 bg-secondary rounded-full" />
                <h2 className="text-4xl md:text-5xl font-black text-primary leading-tight uppercase">
                  A Splash of Joy <br />
                  for Every Moment
                </h2>
              </div>
              <div className="space-y-8 text-lg text-zinc-500 leading-relaxed">
                <p>{ride.details}</p>
                <p>{ride.extraText}</p>
                <p className="text-secondary italic">
                  With fun, refreshment, and leisure coming together, the {ride.title} promises moments of happiness, rejuvenation, and memorable downtime during your visit to the park.
                </p>
              </div>
            </div>
            <div className="flex-1 relative">
              <div className="rounded-[50px] overflow-hidden shadow-2xl border-8 border-muted">
                 <Image src="/water_activities_image_1778049553201.png" alt="Detail" width={800} height={600} className="w-full object-cover" />
              </div>
              {/* Decorative Elements */}
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-accent rounded-full opacity-10 blur-2xl" />
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-secondary rounded-full opacity-10 blur-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Spec Bar */}
      <section className="py-12 bg-[#f0f9ff]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
             {ride.specs.map((spec: any, i: number) => (
               <div key={i} className="bg-white p-8 rounded-[30px] shadow-sm border border-white flex items-center gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-muted/30 flex items-center justify-center">
                    {spec.icon}
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-zinc-400 block mb-1">{spec.label}</span>
                    <span className="text-sm text-primary whitespace-pre-line">{spec.value}</span>
                  </div>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Moments Gallery */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4 text-center">
           <span className="text-secondary uppercase tracking-widest text-sm mb-4 block">Experience Moments</span>
           <h2 className="text-4xl md:text-5xl font-black text-primary mb-16 uppercase">Memories That Make a Splash</h2>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {ride.gallery.map((item: any, i: number) => (
                <div key={i} className="group relative rounded-[40px] overflow-hidden shadow-xl aspect-[4/3]">
                   <Image src={item.image} alt={item.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-8">
                      <span className="text-white uppercase tracking-widest text-sm bg-white/20 backdrop-blur-md px-6 py-2 rounded-full border border-white/30">
                        {item.title}
                      </span>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </section>

      <CTA />
      <Footer />
    </div>
  );
}
