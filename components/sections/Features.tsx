"use client";

import React from "react";
import { ShieldCheck, MapPin, Users, Zap, Leaf, Castle } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: <Castle className="w-8 h-8 text-orange-500" />,
    title: "50+ Attractions",
    subtitle: "Under One Roof",
    bg: "bg-orange-50",
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-teal-500" />,
    title: "Safe & Supervised",
    subtitle: "Rides",
    bg: "bg-teal-50",
  },
  {
    icon: <Users className="w-8 h-8 text-blue-500" />,
    title: "Perfect for Families",
    subtitle: "& Groups",
    bg: "bg-blue-50",
  },
  {
    icon: <Leaf className="w-8 h-8 text-green-500" />,
    title: "Clean Facilities",
    subtitle: "& Local Food",
    bg: "bg-green-50",
  },
];

const Features = () => {
  return (
    <section className="py-16 bg-white relative">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`p-6 rounded-[2.5rem] ${feature.bg} flex items-center gap-5 border border-transparent hover:border-zinc-200 transition-all hover:shadow-lg group cursor-default`}
            >
              <div className="w-16 h-16 rounded-[1.5rem] bg-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <div className="flex flex-col">
                <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider leading-none">
                  {feature.title}
                </h3>
                <p className="text-lg font-black text-[#1a365d] leading-tight">
                  {feature.subtitle}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
