"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Ticket, Zap, Sparkles, Star, Users, Clock, ShieldCheck } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CTA from "@/components/sections/CTA";
import PageHero from "@/components/sections/PageHero";

const packages = [
  {
    title: "Common Package",
    price: "540",
    description: "Our most popular choice for adults and teens. Access to the core  park experience.",
    features: [
      "All Dry Rides included",
      "Water Park Access",
      " Zone Access",
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
    description: "Specially designed fun for our little rs. Focused on safety and gentle thrills.",
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
    title: "Group ",
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

      <PageHero 
        title={<>Fun & <br /> Packages</>}
        subtitle="Choose the perfect plan for your squad. More thrills, better value, and memories that last forever."
        bgImage="/images/packages-hero-bg.png"
        badgeText="Adventure Packages"
        primaryBtnText="Book Package"
        primaryBtnLink="/book"
        secondaryBtnText="Explore Rides"
        secondaryBtnLink="/rides"
      />

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
