"use client";

import React from "react";
import { ShieldCheck, Users, Leaf, BadgePercent, Zap } from "lucide-react";
import { motion } from "framer-motion";

const reasons = [
  { 
    title: "50+ Thrilling", 
    subtitle: "Rides & Activities", 
    icon: <Zap className="w-10 h-10" />, 
    color: "text-accent", 
    bgColor: "bg-accent-soft" 
  },
  { 
    title: "Safe &", 
    subtitle: "Supervised Rides", 
    icon: <ShieldCheck className="w-10 h-10" />, 
    color: "text-secondary", 
    bgColor: "bg-secondary-soft" 
  },
  { 
    title: "Perfect for", 
    subtitle: "Families & Groups", 
    icon: <Users className="w-10 h-10" />, 
    color: "text-primary", 
    bgColor: "bg-primary-soft" 
  },
  { 
    title: "Clean Facilities &", 
    subtitle: "Local Food", 
    icon: <Leaf className="w-10 h-10" />, 
    color: "text-success", 
    bgColor: "bg-success-soft" 
  },
  { 
    title: "Special Offers for", 
    subtitle: "Schools & Groups", 
    icon: <BadgePercent className="w-10 h-10" />, 
    color: "text-primary", 
    bgColor: "bg-primary-soft" 
  },
];

const WhyChoose = () => {
  return (
    <section className="py-12 md:py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-6 mb-4">
            <div className="flex items-center gap-1 opacity-40">
              <div className="w-3 h-3 rounded-full bg-primary rotate-45" />
              <div className="w-4 h-1 bg-accent rounded-full" />
              <div className="w-2 h-2 bg-secondary rounded-full" />
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-primary leading-none uppercase">
              Why Choose La La Land?
            </h2>
            <div className="flex items-center gap-1 opacity-40">
              <div className="w-2 h-2 bg-secondary rounded-full" />
              <div className="w-4 h-1 bg-accent rounded-full" />
              <div className="w-3 h-3 rounded-full bg-primary rotate-45" />
            </div>
          </div>
          <p className="text-lg text-zinc-500 max-w-2xl mx-auto">
            We combine the thrill of  with the comfort of world-class facilities to ensure your day is perfect.
          </p>
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {reasons.map((item, i) => (
            <motion.div
              key={item.subtitle}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center text-center"
            >
              <div className={`w-24 h-24 rounded-3xl ${item.bgColor} flex items-center justify-center ${item.color} mb-6 shadow-sm border border-white`}>
                {item.icon}
              </div>
              <span className="text-sm text-zinc-400 uppercase tracking-widest mb-1">
                {item.title}
              </span>
              <h3 className={`text-base font-black ${item.color} leading-tight`}>
                {item.subtitle}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
