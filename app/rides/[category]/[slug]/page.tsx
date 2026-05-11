"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CTA from "@/components/sections/CTA";
import { MessageCircle, Ticket, Users, Clock, ShieldCheck, Waves, Info, ChevronLeft, ChevronRight, Star, Zap, Activity, Heart, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams } from "next/navigation";

const ridesData: Record<string, any> = {
  "swimming-pool": {
    title: "Swimming Pool",
    category: "Water Fun",
    tagline: "Dive. Relax. Refresh. Fun for Everyone!",
    desc: "Take a refreshing break and dive into fun at our sparkling swimming pool. Perfect for all ages and every mood!",
    heroImage: "/swimming_pool_hero.png",
    details: "Dive into pure relaxation and joy at our Swimming Pool, a refreshing retreat set amidst a lively and natural atmosphere. Perfect for families, friends, and solo visitors alike, the pool offers a space to unwind, cool off, and enjoy carefree moments away from routine life.",
    extraText: "Whether you prefer a calm soak, playful splashing, or simply lounging by the water, the experience is designed to suit all moods and age groups. The soothing environment and cheerful vibe make it an ideal spot to relax after a day of  or to spend quality time with loved ones.",
    thrillLevel: "High Fun",
    heightReq: "Min 36\"",
    intensity: "Moderate",
    duration: "9:30 AM - 6:30 PM",
    highlights: [
      { label: "Family Friendly", icon: <Users className="w-5 h-5" /> },
      { label: "Crystal Clear", icon: <Waves className="w-5 h-5" /> },
      { label: "Supervised", icon: <ShieldCheck className="w-5 h-5" /> },
      { label: "Refreshing", icon: <Star className="w-5 h-5" /> },
    ],
    specs: [
      { label: "Thrill Level", value: "High Fun", icon: <Zap className="w-6 h-6 text-primary" /> },
      { label: "Height Req", value: "Min 36\"", icon: <Info className="w-6 h-6 text-primary" /> },
      { label: "Duration", value: "Unlimited", icon: <Clock className="w-6 h-6 text-primary" /> },
      { label: "Safety", value: "Supervised", icon: <ShieldCheck className="w-6 h-6 text-primary" /> },
    ],
    gallery: [
      { title: "Family Fun", image: "/water_activities_image_1778049553201.png" },
      { title: "Kids Splash Zone", image: "/rides_kids_activities_1778055058230.png" },
      { title: "The Main Pool", image: "/swimming_pool_hero.png" },
      { title: "Evening Relax", image: "/amusement_activities_image_1778049573930.png" },
      { title: "Park View", image: "/park_hero_image_1778049530668.png" },
    ]
  }
};

export default function RideDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const ride = ridesData[slug] || ridesData["swimming-pool"];
  const [activeSlide, setActiveSlide] = useState(0);

  const nextSlide = () => setActiveSlide((prev) => (prev + 1) % ride.gallery.length);
  const prevSlide = () => setActiveSlide((prev) => (prev - 1 + ride.gallery.length) % ride.gallery.length);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      
      {/* Immersive Hero Section */}
      <section className="relative h-[90vh] min-h-[700px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={ride.heroImage}
            alt={ride.title}
            fill
            priority
            className="object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-secondary/40 via-secondary/20 to-secondary/90" />
        </div>

        <div className="container mx-auto px-4 relative z-10 pt-20">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-3 mb-8">
                <span className="w-12 h-[2px] bg-accent" />
                <span className="text-accent uppercase tracking-[0.4em] text-xs font-black">
                  {ride.category}
                </span>
              </div>
              <h1 className="text-8xl md:text-[140px] font-black text-white leading-[0.8] mb-8 tracking-tighter drop-shadow-2xl">
                {ride.title.split(' ')[0]} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                   {ride.title.split(' ').slice(1).join(' ')}
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 font-medium uppercase tracking-widest mb-12 max-w-2xl">
                {ride.tagline}
              </p>
              
              <div className="flex flex-wrap gap-6">
                <Link href="#tickets" className="group relative overflow-hidden bg-primary text-white py-5 px-14 rounded-full shadow-2xl transition-all">
                  <span className="relative z-10 flex items-center gap-4 text-sm font-black uppercase tracking-widest">
                    Secure Passes <Ticket className="w-5 h-5 transition-transform group-hover:rotate-12" />
                  </span>
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </Link>
                <Link href="#whatsapp" className="flex items-center gap-4 bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 text-white py-5 px-14 rounded-full shadow-2xl transition-all text-sm font-black uppercase tracking-widest">
                  Quick Chat <MessageCircle className="w-5 h-5 text-success" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Floating Spec Bar - World Class Style */}
        <div className="absolute bottom-16 left-0 w-full z-30">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap md:flex-nowrap gap-4 md:gap-0 bg-white/10 backdrop-blur-2xl rounded-[40px] md:rounded-full p-4 md:p-2 border border-white/20 shadow-2xl">
              {ride.specs.map((spec: any, i: number) => (
                <div key={i} className={`flex-1 flex items-center gap-6 px-8 py-4 ${i !== ride.specs.length - 1 ? 'md:border-r border-white/10' : ''}`}>
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
                    {spec.icon}
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-white/50 mb-1">{spec.label}</p>
                    <p className="text-sm text-white font-black uppercase">{spec.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Signature Wave Divider */}
        <div className="absolute -bottom-[1px] left-0 w-full overflow-hidden leading-[0] z-20">
          <svg viewBox="0 0 1440 160" className="relative block w-full h-[100px] md:h-[150px]" preserveAspectRatio="none">
            <path fill="#ffffff" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,106.7C960,117,1056,139,1152,138.7C1248,139,1344,117,1392,106.7L1440,96L1440,160L1392,160C1344,160,1248,160,1152,160C1056,160,960,160,864,160C768,160,672,160,576,160C480,160,384,160,288,160C192,160,96,160,48,160L0,160Z"></path>
          </svg>
        </div>
      </section>

      {/* Narrative Section - The Hook */}
      <section className="py-32 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-12"
            >
              <div>
                <span className="text-primary font-black uppercase tracking-[0.4em] text-xs mb-6 block">The Legend of {ride.title}</span>
                <h2 className="text-6xl md:text-8xl font-black text-secondary leading-[0.85] tracking-tighter uppercase mb-10">
                  Feel the <br />
                  <span className="italic text-primary">Pulse</span> of Joy
                </h2>
                <div className="space-y-8 text-xl text-muted-foreground leading-relaxed">
                  <p className="font-medium text-secondary">
                    {ride.details}
                  </p>
                  <p>{ride.extraText}</p>
                </div>
              </div>
            </motion.div>

            <div className="relative group">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="rounded-[80px] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.4)] relative z-10 aspect-[3/4]"
              >
                <div className="absolute inset-0 flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${activeSlide * 100}%)` }}>
                  {ride.gallery.map((item: any, i: number) => (
                    <div key={i} className="min-w-full h-full relative">
                      <Image 
                        src={item.image} 
                        alt={item.title} 
                        fill 
                        className="object-cover" 
                      />
                    </div>
                  ))}
                </div>

                {/* Slider Controls */}
                <div className="absolute inset-0 flex items-center justify-between px-6 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                  <button 
                    onClick={prevSlide}
                    className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-primary transition-all"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button 
                    onClick={nextSlide}
                    className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-primary transition-all"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>

                {/* Progress Indicators */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                  {ride.gallery.map((_: any, i: number) => (
                    <div 
                      key={i} 
                      className={`h-1.5 rounded-full transition-all duration-500 ${i === activeSlide ? "w-8 bg-primary" : "w-2 bg-white/40"}`}
                    />
                  ))}
                </div>
              </motion.div>
              
              {/* Decorative elements */}
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-primary/20 rounded-full blur-3xl -z-10" />
              <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -z-10" />
            </div>
          </div>
        </div>
      </section>

      <CTA />
      <Footer />

      {/* Sticky Quick Book Footer - Mobile & Desktop */}
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-4xl"
      >
        <div className="bg-secondary/90 backdrop-blur-2xl rounded-full p-2 pl-8 border border-white/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] flex items-center justify-between">
           <div className="hidden sm:block">
              <p className="text-white text-sm font-black uppercase tracking-widest leading-none">Ready to Play?</p>
              <p className="text-white/60 text-[10px] uppercase tracking-widest">Book tickets for {ride.title}</p>
           </div>
           <Link href="/book" className="bg-primary text-white py-4 px-10 rounded-full font-black uppercase tracking-widest text-xs hover:scale-105 transition-all shadow-xl">
              Get Tickets
           </Link>
        </div>
      </motion.div>
    </div>
  );
}
