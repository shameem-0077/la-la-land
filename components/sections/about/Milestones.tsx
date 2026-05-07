"use client";

import React from "react";
import { Flag, Rocket, PartyPopper } from "lucide-react";
import { motion } from "framer-motion";

const milestones = [
  {
    date: "March 2021",
    title: "Foundation",
    desc: "The dream began with a vision to create a sustainable yet thrilling destination. The foundation was laid to transform this landscape into an adventure haven.",
    icon: <Flag className="w-8 h-8" />,
    color: "text-success",
    bgColor: "bg-success-soft"
  },
  {
    date: "September 2022",
    title: "Soft Launching",
    desc: "After careful planning and testing, we initiated our soft launch to ensure operational excellence and a great guest experience.",
    icon: <Rocket className="w-8 h-8" />,
    color: "text-secondary",
    bgColor: "bg-secondary-soft"
  },
  {
    date: "November 2022",
    title: "Grand Opening",
    desc: "We officially opened our gates to the world, bringing world-class fun, safety & excitement to visitors of all ages in Wayanad.",
    icon: <PartyPopper className="w-8 h-8" />,
    color: "text-primary",
    bgColor: "bg-primary-soft"
  }
];

const Milestones = () => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="text-secondary font-black uppercase tracking-widest text-sm mb-4 block">
            Our Journey
          </span>
          <div className="flex items-center justify-center gap-6 mb-4">
            <div className="flex items-center gap-1 opacity-40">
              <div className="w-3 h-3 rounded-full bg-primary rotate-45" />
              <div className="w-4 h-1 bg-accent rounded-full" />
              <div className="w-2 h-2 bg-secondary rounded-full" />
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-primary leading-none uppercase">
              Milestones of Growth
            </h2>
            <div className="flex items-center gap-1 opacity-40">
              <div className="w-2 h-2 bg-secondary rounded-full" />
              <div className="w-4 h-1 bg-accent rounded-full" />
              <div className="w-3 h-3 rounded-full bg-primary rotate-45" />
            </div>
          </div>
          <p className="text-lg text-zinc-500 font-bold max-w-2xl mx-auto">
            Tracing our path from a visionary concept to becoming Wayanad's most trusted adventure park.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="relative">
          {/* Horizontal Line - Hidden on Mobile */}
          <div className="absolute top-[60px] left-0 w-full h-0.5 bg-zinc-100 hidden lg:block z-0" />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative z-10">
            {milestones.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="flex flex-col items-center text-center lg:items-start lg:text-left"
              >
                {/* Icon & Connector */}
                <div className={`w-32 h-32 rounded-full ${item.bgColor} flex items-center justify-center ${item.color} mb-8 shadow-xl border-8 border-white`}>
                  {item.icon}
                </div>
                
                <span className={`text-sm font-black uppercase tracking-widest ${item.color} mb-2`}>
                  {item.date}
                </span>
                <h3 className="text-2xl font-black text-primary uppercase mb-4">
                  {item.title}
                </h3>
                <p className="text-zinc-500 font-bold leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Milestones;
