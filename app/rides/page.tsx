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
import PageHero from "@/components/sections/PageHero";
import { supabase } from "@/lib/supabase";

const categories = [
  { id: "all", label: "All", icon: <Filter className="w-4 h-4" /> },
  { id: "water", label: "Water", icon: <Droplets className="w-4 h-4" /> },
  { id: "", label: "", icon: <Mountain className="w-4 h-4" /> },
  { id: "thrill", label: "Thrill", icon: <Zap className="w-4 h-4" /> },
  { id: "family", label: "Family", icon: <Users className="w-4 h-4" /> },
  { id: "kids", label: "Kids", icon: <Baby className="w-4 h-4" /> },
  { id: "amusement", label: "Amusement", icon: <Ghost className="w-4 h-4" /> },
];

const ridesData = [
  { title: "Swimming Pool", category: "water", age: "All Ages", image: "/water_activities_image_1778049553201.png" },
  { title: "Rain Dance", category: "water", age: "All Ages", image: "/water_activities_image_1778049553201.png" },
  { title: "360° Cycle", category: "thrill", age: "8+ Years", image: "/park_hero_image_1778049530668.png" },
  { title: "Rope Course", category: "", age: "8+ Years", image: "/rides_rope_activities_1778054766682.png" },
  { title: "Giant Swing", category: "", age: "12+ Years", image: "/rides_tower_activities_1778054789676.png" },
  { title: "Couple Zip Line", category: "", age: "12+ Years", image: "/about_zipline.png" },
  { title: "Wall Climbing", category: "thrill", age: "8+ Years", image: "/park_hero_image_1778049530668.png" },
  { title: "Rock Climbing", category: "", age: "8+ Years", image: "/rides_rope_activities_1778054766682.png" },
  { title: "Rope Bridge", category: "", age: "8+ Years", image: "/rides_rope_activities_1778054766682.png" },
  { title: "Multi Lane Slide", category: "water", age: "All Ages", image: "/water_activities_image_1778049553201.png" },
  { title: "Pendulum Slide", category: "water", age: "All Ages", image: "/water_activities_image_1778049553201.png" },
  { title: "Bumper Cars", category: "amusement", age: "All Ages", image: "/amusement_activities_image_1778049573930.png" },
  { title: "Zero Gravity", category: "", age: "8+ Years", image: "/rides_tower_activities_1778054789676.png" },
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
  const [dynamicCategories, setDynamicCategories] = useState(categories);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data, error } = await supabase
          .from('RideCategory')
          .select('slug, name')
          .order('created_at', { ascending: true });

        if (error) throw error;
        if (data && data.length > 0) {
          const mapped = data.map(cat => ({
            id: cat.slug,
            label: cat.name,
            icon: <Star className="w-4 h-4" /> // Default icon for dynamic cats
          }));
          setDynamicCategories([categories[0], ...mapped]);
        }
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (categoryParam && dynamicCategories.some(cat => cat.id === categoryParam)) {
      setActiveTab(categoryParam);
    }
  }, [categoryParam, dynamicCategories]);

  const filteredRides = activeTab === "all" 
    ? ridesData 
    : ridesData.filter(ride => ride.category === activeTab);

  return (
    <>
      <PageHero 
        title={<>Endless Fun <br /> Unforgettable Memories.</>}
        subtitle="Explore 50+ thrilling rides, water fun, activities & kids' favorites for all ages."
        bgImage="/images/rides-page-hero.png"
        badgeText="Rides & Attractions"
        secondaryBtnText="Explore More"
        secondaryBtnLink="#all"
      />

      {/* Filter Bar */}
      <section className="py-4 md:py-12 bg-white sticky top-16 z-30 shadow-sm border-b border-zinc-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-start md:justify-center overflow-x-auto no-scrollbar gap-4 pb-2 md:pb-0 scroll-smooth">
            {dynamicCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`flex items-center shrink-0 gap-2 px-6 py-3 rounded-full text-xs uppercase tracking-widest transition-all ${
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
                        <span className={`px-4 py-1.5 rounded-full text-[10px] uppercase tracking-widest text-white shadow-lg ${
                          ride.category === 'water' ? 'bg-primary' :
                          ride.category === '' ? 'bg-success' :
                          ride.category === 'thrill' ? 'bg-secondary' :
                          ride.category === 'amusement' ? 'bg-secondary' :
                          'bg-accent text-foreground'
                        }`}>
                          {ride.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-8">
                      <div className="flex items-center gap-2 text-zinc-400 text-[10px] uppercase tracking-widest mb-2">
                        <Users className="w-3 h-3" />
                        {ride.age}
                      </div>
                      <h3 className="text-xl font-black text-primary leading-tight group-hover:text-secondary transition-colors mb-6">
                        {ride.title}
                      </h3>
                      
                      <div className="flex items-center justify-between pt-6 border-t border-zinc-50">
                        <span className="text-[10px] text-secondary uppercase tracking-[0.2em] group-hover:translate-x-1 transition-transform inline-flex items-center gap-2">
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
            <button className="inline-flex items-center gap-3 px-12 py-4 bg-white border border-zinc-100 rounded-full text-xs text-zinc-500 hover:text-primary hover:border-primary transition-all uppercase tracking-widest group">
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
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] uppercase tracking-widest mb-4">
                Guest Favorites
              </span>
              <h2 className="text-4xl md:text-6xl font-black text-secondary leading-tight uppercase tracking-tight">
                Most Popular <br />
                Rides This Week
              </h2>
            </div>
            <Link href="#all" className="text-xs text-primary uppercase tracking-widest hover:translate-x-2 transition-transform flex items-center gap-2 mb-4">
              View All Rides <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Giant Swing", category: "", desc: "Experience 360 degrees of pure adrenaline.", img: "/rides_tower_activities_1778054789676.png" },
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
                  <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/30 text-white text-[10px] uppercase tracking-widest">
                    <Star className="w-3 h-3 fill-accent text-accent" />
                    Top Rated
                  </div>
                </div>

                <div className="absolute bottom-10 left-10 right-10">
                  <p className="text-primary text-[10px] uppercase tracking-widest mb-2">{ride.category}</p>
                  <h3 className="text-3xl font-black text-white uppercase leading-none mb-4">{ride.title}</h3>
                  <p className="text-white/70 text-sm mb-6 line-clamp-2">{ride.desc}</p>
                    <Link href="/book" className="inline-flex items-center gap-3 px-6 py-3 bg-primary text-white rounded-full text-[10px] uppercase tracking-widest hover:bg-primary-dark transition-all shadow-xl shadow-primary/20">
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
                    <p className="text-[10px] uppercase tracking-[0.2em] opacity-70 mb-1">Starting from</p>
                    <p className="text-3xl italic tracking-tighter leading-none">₹399.00</p>
                  </div>
                </div>
              </div>
              
              {/* Right Side: Content */}
              <div className="lg:w-1/2 p-12 md:p-20 flex flex-col justify-center">
                <span className="text-primary text-xs uppercase tracking-widest mb-6 block">Exclusive Deals</span>
                <h2 className="text-4xl md:text-5xl font-black text-secondary leading-[1.1] uppercase tracking-tight mb-8">
                  Unlock More Fun <br />
                  With Our Passes
                </h2>
                <p className="text-zinc-500 text-lg mb-10 leading-relaxed">
                  Get the best value for your visit with our specially curated packages. 
                  Whether you're visiting with family, friends, or a large group, 
                  we have the perfect plan to make your day unforgettable.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link 
                    href="/packages" 
                    className="px-10 py-5 bg-primary text-white rounded-full text-xs uppercase tracking-widest shadow-xl hover:bg-primary-dark transition-all text-center"
                  >
                    View All Packages
                  </Link>
                  <Link 
                    href="/book" 
                    className="px-10 py-5 bg-muted text-secondary rounded-full text-xs uppercase tracking-widest hover:bg-zinc-100 transition-all text-center border border-zinc-100"
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
