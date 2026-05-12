"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Filter, Zap, Droplets, Mountain, Users, Star, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import PageHero from "@/components/sections/PageHero";

const defaultIcons: Record<string, React.ReactNode> = {
  all: <Filter className="w-4 h-4" />,
  water: <Droplets className="w-4 h-4" />,
  thrill: <Zap className="w-4 h-4" />,
  adventure: <Mountain className="w-4 h-4" />,
  kids: <Star className="w-4 h-4" />,
};

interface RidesClientProps {
  initialCategories: any[];
  initialRides: any[];
}

export default function RidesClient({ initialCategories, initialRides }: RidesClientProps) {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const [activeTab, setActiveTab] = useState("all");

  const categories = [
    { id: "all", label: "All", icon: defaultIcons.all },
    ...initialCategories.map(cat => ({
      id: cat.slug,
      label: cat.name,
      icon: defaultIcons[cat.slug] || <Star className="w-4 h-4" />
    }))
  ];

  useEffect(() => {
    if (categoryParam && categories.some(cat => cat.id === categoryParam)) {
      setActiveTab(categoryParam);
    }
  }, [categoryParam]);

  const filteredRides = activeTab === "all" 
    ? initialRides 
    : initialRides.filter(ride => ride.category === activeTab);

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
      <section id="all" className="py-4 md:py-12 bg-white sticky top-16 z-30 shadow-sm border-b border-zinc-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-start md:justify-center overflow-x-auto no-scrollbar gap-4 pb-2 md:pb-0 scroll-smooth">
            {categories.map((cat) => (
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
                    href={`/rides/${ride.category}/${ride.slug}`} 
                    className="block bg-white rounded-[40px] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-white hover:shadow-[0_20px_60px_rgba(0,0,0,0.1)] transition-all duration-500 h-full"
                  >
                    <div className="relative h-[220px] w-full">
                      <Image src={ride.image} alt={ride.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute top-4 left-4">
                        <span className={`px-4 py-1.5 rounded-full text-[10px] uppercase tracking-widest text-white shadow-lg ${
                          ride.category === 'water' ? 'bg-primary' :
                          ride.category === 'thrill' ? 'bg-secondary' :
                          'bg-accent text-foreground'
                        }`}>
                          {ride.category || 'Park Ride'}
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

          {filteredRides.length === 0 && (
            <div className="text-center py-20">
              <p className="text-zinc-400 uppercase tracking-widest text-xs">No rides found in this category</p>
            </div>
          )}

          <div className="mt-16 text-center">
            <button className="inline-flex items-center gap-3 px-12 py-4 bg-white border border-zinc-100 rounded-full text-xs text-zinc-500 hover:text-primary hover:border-primary transition-all uppercase tracking-widest group">
              Load More Attractions
              <ChevronDown className="w-4 h-4 transition-transform group-hover:translate-y-1" />
            </button>
          </div>
        </div>
      </section>

        {/* Package Promotion Section */}
        {/* <section className="py-24 bg-secondary relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="bg-white rounded-[60px] overflow-hidden shadow-2xl flex flex-col lg:flex-row">
              <div className="lg:w-1/2 relative h-[300px] lg:h-auto min-h-[400px]">
                <Image src="/packages_promo.png" alt="Packages" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-secondary/40 to-transparent" />
              </div>
              
              <div className="lg:w-1/2 p-12 md:p-20 flex flex-col justify-center">
                <span className="text-primary text-xs uppercase tracking-widest mb-6 block">Exclusive Deals</span>
                <h2 className="text-4xl md:text-5xl font-black text-secondary leading-[1.1] uppercase tracking-tight mb-8">
                  Unlock More Fun <br />
                  With Our Passes
                </h2>
                <p className="text-zinc-500 text-lg mb-10 leading-relaxed">
                  Get the best value for your visit with our specially curated packages. 
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/packages" className="px-10 py-5 bg-primary text-white rounded-full text-xs uppercase tracking-widest shadow-xl hover:bg-primary-dark transition-all text-center">
                    View All Packages
                  </Link>
                  <Link href="/book" className="px-10 py-5 bg-muted text-secondary rounded-full text-xs uppercase tracking-widest hover:bg-zinc-100 transition-all text-center border border-zinc-100">
                    Book Tickets
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section> */}
      </>
  );
}
