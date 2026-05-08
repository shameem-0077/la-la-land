"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Ticket, Zap, Sparkles, Star, Users, Clock, ShieldCheck } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CTA from "@/components/sections/CTA";

const packages = [
  {
    title: "Common Package",
    price: "540",
    description: "Our most popular choice for adults and teens. Access to the core adventure park experience.",
    features: [
      "All Dry Rides included",
      "Water Park Access",
      "Adventure Zone Access",
      "Standard Timings (10AM - 6PM)",
      "Safety Gear Included",
      "Access to Food Court"
    ],
    color: "bg-secondary",
    accent: "text-primary",
    badge: "Most Popular",
    icon: <Zap className="w-6 h-6" />,
    popular: true
  },
  {
    title: "Kids Package",
    price: "399",
    description: "Specially designed fun for our little adventurers. Focused on safety and gentle thrills.",
    features: [
      "Kids Zone Access",
      "Mini Water Slides",
      "Safe Play Area",
      "Carousel & Train Rides",
      "Soft Play Indoor Zone",
      "Complimentary Kids Snack"
    ],
    color: "bg-success",
    accent: "text-white",
    badge: "Kids Special",
    icon: <Sparkles className="w-6 h-6" />,
    popular: false
  },
  {
    title: "Group Adventure",
    price: "499",
    description: "Perfect for school trips, corporate outings, and large family gatherings (Min 15 people).",
    features: [
      "Priority Ride Access",
      "Dedicated Group Coordinator",
      "Reserved Seating Area",
      "Discounted Meal Vouchers",
      "Team Building Activities",
      "Group Photo Session"
    ],
    color: "bg-accent",
    accent: "text-foreground",
    badge: "Group Savings",
    icon: <Users className="w-6 h-6" />,
    popular: false
  }
];

const inclusions = [
  { icon: <Clock className="w-6 h-6" />, title: "Full Day Access", desc: "10:00 AM to 6:30 PM" },
  { icon: <ShieldCheck className="w-6 h-6" />, title: "Safe & Secure", desc: "Expert staff & safety gear" },
  { icon: <Star className="w-6 h-6" />, title: "Unlimited Fun", desc: "Multiple rides on all attractions" },
];

const PackagesPage = () => {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section - Replicated from Hero.tsx */}
      <section className="relative min-h-screen flex flex-col pt-32 overflow-hidden bg-secondary">
        {/* Immersive Background Layer */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero-bg-image.png"
            alt="La La Land Adventure Park"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-secondary/20 -z-10" />
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
              <h1 className="text-4xl md:text-6xl lg:text-[86px] font-black text-white leading-[0.95] tracking-tight uppercase">
                Adventure <br />
                <span className="text-primary">Packages</span>
              </h1>
              <p className="text-lg md:text-2xl text-white/80 max-w-xl mx-auto lg:mx-0">
                Choose the perfect plan for your squad. More thrills, better value, and memories that last forever.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Wave Divider - EXACT COPIED FROM Hero.tsx */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-50">
          <svg viewBox="0 0 1440 160" className="relative block w-full h-[60px] md:h-[140px]" preserveAspectRatio="none">
            <path 
              fill="#ffffff" 
              d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,106.7C960,117,1056,139,1152,138.7C1248,139,1344,117,1392,106.7L1440,96L1440,160L1392,160C1344,160,1248,160,1152,160C1056,160,960,160,864,160C768,160,672,160,576,160C480,160,384,160,288,160C192,160,96,160,48,160L0,160Z"
            ></path>
          </svg>
        </div>
      </section>

      {/* Inclusions Row */}
      <section className="bg-white py-12 relative z-30">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-[40px] shadow-xl border border-zinc-50 p-8 md:p-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-5xl mx-auto">
            {inclusions.map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-secondary/5 flex items-center justify-center text-secondary">
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-xl font-black text-secondary uppercase">{item.title}</h4>
                  <p className="text-zinc-500 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10">
            {packages.map((pkg, i) => (
              <motion.div
                key={pkg.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative bg-white rounded-[50px] p-8 md:p-10 border-2 ${pkg.popular ? 'border-primary shadow-2xl scale-105 z-10' : 'border-zinc-100 shadow-xl'} flex flex-col h-full`}
              >
                {pkg.popular && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-primary text-white px-6 py-2 rounded-full text-xs uppercase tracking-widest">
                    Best Choice
                  </div>
                )}
                
                <div className="mb-8">
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <span className={`inline-block px-4 py-1.5 rounded-full ${pkg.color} text-white text-[10px] uppercase tracking-widest`}>
                      {pkg.badge}
                    </span>
                    <div className={pkg.popular ? "text-primary" : "text-secondary"}>
                      {pkg.icon}
                    </div>
                  </div>
                  <h3 className="text-3xl font-black text-secondary leading-tight">
                    {pkg.title}
                  </h3>
                </div>

                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-2xl text-secondary">₹</span>
                  <span className="text-5xl text-primary leading-none">{pkg.price}</span>
                   <span className="text-zinc-400 text-sm ml-2">/ Person</span>
                </div>

                <p className="text-zinc-500 mb-8 leading-relaxed">
                  {pkg.description}
                </p>

                <div className="space-y-4 mb-10 flex-grow">
                  {pkg.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                        <Check className="w-4 h-4 stroke-[4]" />
                      </div>
                      <span className="text-sm text-secondary">{feature}</span>
                    </div>
                  ))}
                </div>

                <button className={`w-full py-5 rounded-full text-xs uppercase tracking-widest transition-all ${
                  pkg.popular ? 'bg-primary text-white shadow-xl hover:bg-primary-dark shadow-primary/20' : 'bg-secondary/5 text-secondary hover:bg-secondary hover:text-white'
                }`}>
                  Book This Package
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Ticket Details & FAQ placeholder section */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-secondary uppercase italic">Essential Information</h2>
            <p className="text-zinc-500 mt-2">Everything you need to know before you visit.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-[40px] shadow-sm border border-secondary/5">
              <h4 className="text-xl font-black text-secondary mb-4 uppercase">Entry Policies</h4>
              <ul className="space-y-3 text-zinc-500 text-sm">
                <li>• Free entry for children below 3ft height.</li>
                <li>• Senior citizen discounts available at counter.</li>
                <li>• Outside food & drinks are not permitted.</li>
                <li>• Proper swimwear required for water attractions.</li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-[40px] shadow-sm border border-secondary/5">
              <h4 className="text-xl font-black text-secondary mb-4 uppercase">Park Timings</h4>
              <ul className="space-y-3 text-zinc-500 text-sm">
                <li>• Monday - Friday: 10:00 AM - 6:00 PM</li>
                <li>• Saturday - Sunday: 10:00 AM - 7:00 PM</li>
                <li>• Water Park closes 30 mins prior to main park.</li>
                <li>• Counter bookings close at 4:30 PM.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <CTA />
      <Footer />
    </main>
  );
};

export default PackagesPage;
