"use client";

import React, { useState, useEffect, Suspense } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CTA from "@/components/sections/CTA";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle, Ticket, ChevronDown, Filter, Zap, Droplets, Mountain, ShieldCheck, Users, Baby, Ghost, Star, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";

const categories = [
  { id: "all", label: "All", icon: <Filter className="w-4 h-4" /> },
  { id: "water", label: "Water", icon: <Droplets className="w-4 h-4" /> },
  { id: "adventure", label: "Adventure", icon: <Mountain className="w-4 h-4" /> },
  { id: "thrill", label: "Thrill", icon: <Zap className="w-4 h-4" /> },
  { id: "family", label: "Family", icon: <Users className="w-4 h-4" /> },
  { id: "kids", label: "Kids", icon: <Baby className="w-4 h-4" /> },
  { id: "amusement", label: "Amusement", icon: <Ghost className="w-4 h-4" /> },
];

const ridesData = [
  { title: "Swimming Pool", category: "water", age: "All Ages", image: "/water_activities_image_1778049553201.png" },
  { title: "Rain Dance", category: "water", age: "All Ages", image: "/water_activities_image_1778049553201.png" },
  { title: "360° Cycle", category: "thrill", age: "8+ Years", image: "/park_hero_image_1778049530668.png" },
  { title: "Rope Course", category: "adventure", age: "8+ Years", image: "/rides_rope_activities_1778054766682.png" },
  { title: "Giant Swing", category: "adventure", age: "12+ Years", image: "/rides_tower_activities_1778054789676.png" },
  { title: "Couple Zip Line", category: "adventure", age: "12+ Years", image: "/about_zipline.png" },
  { title: "Wall Climbing", category: "thrill", age: "8+ Years", image: "/park_hero_image_1778049530668.png" },
  { title: "Rock Climbing", category: "adventure", age: "8+ Years", image: "/rides_rope_activities_1778054766682.png" },
  { title: "Rope Bridge", category: "adventure", age: "8+ Years", image: "/rides_rope_activities_1778054766682.png" },
  { title: "Multi Lane Slide", category: "water", age: "All Ages", image: "/water_activities_image_1778049553201.png" },
  { title: "Pendulum Slide", category: "water", age: "All Ages", image: "/water_activities_image_1778049553201.png" },
  { title: "Bumper Cars", category: "amusement", age: "All Ages", image: "/amusement_activities_image_1778049573930.png" },
  { title: "Zero Gravity", category: "adventure", age: "8+ Years", image: "/rides_tower_activities_1778054789676.png" },
  { title: "Kids Play Room", category: "kids", age: "3+ Years", image: "/rides_kids_activities_1778055058230.png" },
  { title: "Ferris Wheel", category: "amusement", age: "All Ages", image: "/amusement_activities_image_1778049573930.png" },
  { title: "Sky Roller", category: "thrill", age: "10+ Years", image: "/rides_tower_activities_1778054789676.png" },
  { title: "Viking Ship", category: "amusement", age: "All Ages", image: "/amusement_activities_image_1778049573930.png" },
  { title: "Water Roller", category: "water", age: "All Ages", image: "/water_activities_image_1778049553201.png" },
];

export default function RidesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
        <RidesContent />
      </Suspense>
      <CTA />
      <Footer />
    </div>
  );
}

function RidesContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    if (categoryParam && categories.some(cat => cat.id === categoryParam)) {
      setActiveTab(categoryParam);
    }
  }, [categoryParam]);

  const filteredRides = activeTab === "all" 
    ? ridesData 
    : ridesData.filter(ride => ride.category === activeTab);

  return (
    <>
      {/* Rides Hero */}
      <section className="relative h-screen min-h-[600px] flex items-center pt-20 overflow-hidden bg-secondary">
        <div className="absolute inset-0 z-0">
          <img
            src="/rides_hero_v2.png"
            alt="Endless Adventures"
            className="w-full h-full object-cover"
          />
          {/* Atmosphere Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/60 via-secondary/30 to-transparent" />
          <div className="absolute inset-0 backdrop-blur-[2px] opacity-30" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="inline-block px-5 py-2 rounded-full bg-accent text-foreground text-[10px] font-black uppercase tracking-[0.2em] mb-6 shadow-xl shadow-accent/20">
              Rides & Attractions
            </span>
            <h1 className="text-5xl md:text-8xl font-black text-white leading-[0.95] mb-8 tracking-tighter">
              Endless Adventures.<br />
              Unforgettable Memories.
            </h1>
            <p className="text-lg md:text-xl text-white/90 font-bold mb-10 max-w-lg leading-relaxed">
              Explore 50+ thrilling rides, water fun, adventure activities & kids' favorites for all ages.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link 
                  href="/book" 
                  className="flex items-center gap-3 bg-primary hover:bg-primary-dark text-white font-black py-4 px-10 rounded-full shadow-2xl shadow-primary/40 transition-all text-xs tracking-widest uppercase"
                >
                  Book Tickets
                  <Ticket className="w-5 h-5 fill-white" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link 
                  href="#whatsapp" 
                  className="flex items-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 font-black py-4 px-10 rounded-full transition-all text-xs tracking-widest uppercase"
                >
                  Chat on WhatsApp
                  <MessageCircle className="w-5 h-5" />
                </Link>
              </motion.div>
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
            <circle cx="50" cy="80" r="3" fill="#2d31fa" fillOpacity="0.3" />
            <circle cx="200" cy="100" r="2" fill="#fbbf24" fillOpacity="0.3" />
            <circle cx="800" cy="90" r="4" fill="#ff7d00" fillOpacity="0.2" />
          </svg>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="py-12 bg-white sticky top-16 z-30 shadow-sm border-b border-zinc-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center flex-wrap gap-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-black text-xs uppercase tracking-widest transition-all ${
                  activeTab === cat.id 
                    ? "bg-primary text-white shadow-lg" 
                    : "bg-muted text-zinc-400 hover:bg-zinc-100"
                }`}
              >
                {cat.icon}
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Rides Grid */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredRides.map((ride, i) => (
                <motion.div
                  key={ride.title}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="group"
                >
                  <Link 
                    href={`/rides/${ride.category}/${ride.title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')}`} 
                    className="block bg-white rounded-[40px] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-white hover:shadow-[0_20px_60px_rgba(0,0,0,0.1)] transition-all duration-500 h-full"
                  >
                    <div className="relative h-[220px] w-full">
                      <Image src={ride.image} alt={ride.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute top-4 left-4">
                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-white shadow-lg ${
                          ride.category === 'water' ? 'bg-primary' :
                          ride.category === 'adventure' ? 'bg-success' :
                          ride.category === 'thrill' ? 'bg-secondary' :
                          ride.category === 'amusement' ? 'bg-secondary' :
                          'bg-accent text-foreground'
                        }`}>
                          {ride.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-8">
                      <div className="flex items-center gap-2 text-zinc-400 text-[10px] font-black uppercase tracking-widest mb-2">
                        <Users className="w-3 h-3" />
                        {ride.age}
                      </div>
                      <h3 className="text-xl font-black text-primary leading-tight group-hover:text-secondary transition-colors mb-6">
                        {ride.title}
                      </h3>
                      
                      <div className="flex items-center justify-between pt-6 border-t border-zinc-50">
                        <span className="text-[10px] font-black text-secondary uppercase tracking-[0.2em] group-hover:translate-x-1 transition-transform inline-flex items-center gap-2">
                          View Details
                          <ChevronDown className="w-3 h-3 -rotate-90" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          <div className="mt-16 text-center">
            <button className="inline-flex items-center gap-3 px-12 py-4 bg-white border border-zinc-100 rounded-full font-black text-xs text-zinc-500 hover:text-primary hover:border-primary transition-all uppercase tracking-widest group">
              Load More Attractions
              <ChevronDown className="w-4 h-4 transition-transform group-hover:translate-y-1" />
            </button>
          </div>
        </div>
      </section>

      {/* Popular Rides Section */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-end justify-between gap-6 mb-16">
            <div className="max-w-2xl">
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest mb-4">
                Guest Favorites
              </span>
              <h2 className="text-4xl md:text-6xl font-black text-secondary leading-tight uppercase tracking-tight">
                Most Popular <br />
                Rides This Week
              </h2>
            </div>
            <Link href="#all" className="text-xs font-black text-primary uppercase tracking-widest hover:translate-x-2 transition-transform flex items-center gap-2 mb-4">
              View All Rides <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Giant Swing", category: "Adventure", desc: "Experience 360 degrees of pure adrenaline.", img: "/rides_tower_activities_1778054789676.png" },
              { title: "Couple Zip Line", category: "Thrill", desc: "Soar across the park with your partner.", img: "/about_zipline.png" },
              { title: "Pendulum Slide", category: "Water", desc: "The ultimate water gravity experience.", img: "/water_activities_image_1778049553201.png" }
            ].map((ride, i) => (
              <motion.div 
                key={ride.title}
                whileHover={{ y: -10 }}
                className="relative group h-[500px] rounded-[50px] overflow-hidden shadow-2xl"
              >
                <Image src={ride.img} alt={ride.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                <div className="absolute top-8 left-8">
                  <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/30 text-white text-[10px] font-black uppercase tracking-widest">
                    <Star className="w-3 h-3 fill-accent text-accent" />
                    Top Rated
                  </div>
                </div>

                <div className="absolute bottom-10 left-10 right-10">
                  <p className="text-primary text-[10px] font-black uppercase tracking-widest mb-2">{ride.category}</p>
                  <h3 className="text-3xl font-black text-white uppercase leading-none mb-4">{ride.title}</h3>
                  <p className="text-white/70 text-sm font-bold mb-6 line-clamp-2">{ride.desc}</p>
                    <Link href="/book" className="inline-flex items-center gap-3 px-6 py-3 bg-primary text-white rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-primary-dark transition-all shadow-xl shadow-primary/20">
                      Fast Pass Booking
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Package Promotion Section */}
        <section className="py-24 bg-secondary relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="bg-white rounded-[60px] overflow-hidden shadow-2xl flex flex-col lg:flex-row">
              {/* Left Side: Image/Visual */}
              <div className="lg:w-1/2 relative h-[300px] lg:h-auto min-h-[400px]">
                <Image src="/packages_promo.png" alt="Packages" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-secondary/40 to-transparent" />
                <div className="absolute bottom-10 left-10">
                  <div className="bg-accent text-foreground px-6 py-4 rounded-3xl shadow-xl">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-70 mb-1">Starting from</p>
                    <p className="text-3xl font-black italic tracking-tighter leading-none">₹399.00</p>
                  </div>
                </div>
              </div>
              
              {/* Right Side: Content */}
              <div className="lg:w-1/2 p-12 md:p-20 flex flex-col justify-center">
                <span className="text-primary text-xs font-black uppercase tracking-widest mb-6 block">Exclusive Deals</span>
                <h2 className="text-4xl md:text-5xl font-black text-secondary leading-[1.1] uppercase tracking-tight mb-8">
                  Unlock More Fun <br />
                  With Our Passes
                </h2>
                <p className="text-zinc-500 font-bold text-lg mb-10 leading-relaxed">
                  Get the best value for your visit with our specially curated packages. 
                  Whether you're visiting with family, friends, or a large group, 
                  we have the perfect plan to make your day unforgettable.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link 
                    href="/packages" 
                    className="px-10 py-5 bg-primary text-white rounded-full font-black text-xs uppercase tracking-widest shadow-xl hover:bg-primary-dark transition-all text-center"
                  >
                    View All Packages
                  </Link>
                  <Link 
                    href="/book" 
                    className="px-10 py-5 bg-muted text-secondary rounded-full font-black text-xs uppercase tracking-widest hover:bg-zinc-100 transition-all text-center border border-zinc-100"
                  >
                    Book Tickets
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
