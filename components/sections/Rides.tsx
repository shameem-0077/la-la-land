"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const activityTypes = [
  {
    title: "Water Activities",
    image: "/water_activities_image_1778049553201.png",
    color: "text-secondary",
    icon: (
      <svg viewBox="0 0 40 40" className="w-12 h-12">
        <circle cx="20" cy="20" r="18" fill="#e0f2fe" />
        <path d="M10 25 Q15 20 20 25 T30 25" stroke="#02a1a8" strokeWidth="2" fill="none" />
        <path d="M12 28 Q16 23 20 28 T28 28" stroke="#02a1a8" strokeWidth="2" fill="none" opacity="0.6" />
        <path d="M15 15 L25 15 L20 10 Z" fill="#02a1a8" />
      </svg>
    ),
    link: "/rides?category=water"
  },
  {
    title: "Outdoor Activities",
    image: "/park_hero_image_1778049530668.png",
    color: "text-accent",
    icon: (
      <svg viewBox="0 0 40 40" className="w-12 h-12">
        <circle cx="20" cy="20" r="18" fill="#fff3cc" />
        <path d="M20 10 L28 25 L12 25 Z" fill="#ffb902" />
        <rect x="18" y="25" width="4" height="5" fill="#ffb902" />
      </svg>
    ),
    link: "/rides?category=adventure"
  },
  {
    title: "Tower Activities",
    image: "/rides_tower_activities_1778054789676.png",
    color: "text-accent",
    icon: (
      <svg viewBox="0 0 40 40" className="w-12 h-12">
        <circle cx="20" cy="20" r="18" fill="#fff3cc" />
        <path d="M15 30 L20 10 L25 30" stroke="#ffb902" strokeWidth="2" fill="none" />
        <rect x="18" y="15" width="4" height="4" fill="#ffb902" />
        <line x1="12" y1="25" x2="28" y2="25" stroke="#ffb902" strokeWidth="1" />
      </svg>
    ),
    link: "/rides?category=thrill"
  },
  {
    title: "Kids Activities",
    image: "/rides_kids_activities_1778055058230.png",
    color: "text-primary",
    icon: (
      <svg viewBox="0 0 40 40" className="w-12 h-12">
        <circle cx="20" cy="20" r="18" fill="#edf7d8" />
        <circle cx="20" cy="20" r="8" stroke="#6ea001" strokeWidth="2" fill="none" />
        <circle cx="17" cy="18" r="1.5" fill="#6ea001" />
        <circle cx="23" cy="18" r="1.5" fill="#6ea001" />
        <path d="M17 23 Q20 26 23 23" stroke="#6ea001" strokeWidth="2" fill="none" />
      </svg>
    ),
    link: "/rides?category=kids"
  },
  {
    title: "Rope Activities",
    image: "/rides_rope_activities_1778054766682.png",
    color: "text-accent",
    icon: (
      <svg viewBox="0 0 40 40" className="w-12 h-12">
        <circle cx="20" cy="20" r="18" fill="#fff3cc" />
        <circle cx="20" cy="20" r="8" stroke="#ffb902" strokeWidth="2" fill="none" />
        <path d="M20 12 C24 12 28 16 28 20 C28 24 24 28 20 28 C16 28 12 24 12 20" stroke="#ffb902" strokeWidth="2" fill="none" />
      </svg>
    ),
    link: "/rides?category=adventure"
  },
  {
    title: "Amusement Activities",
    image: "/amusement_activities_image_1778049573930.png",
    color: "text-secondary",
    icon: (
      <svg viewBox="0 0 40 40" className="w-12 h-12">
        <circle cx="20" cy="20" r="18" fill="#e0f2fe" />
        <path d="M12 28 L20 12 L28 28 Z" stroke="#02a1a8" strokeWidth="2" fill="none" />
        <circle cx="15" cy="28" r="2" fill="#02a1a8" />
        <circle cx="25" cy="28" r="2" fill="#02a1a8" />
      </svg>
    ),
    link: "/rides?category=amusement"
  },
];

const Rides = () => {
  return (
    <section id="rides" className="relative py-8 md:py-24 bg-white overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-[10%] left-[5%] w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-60 -z-10" />
      
      {/* Long Paper Plane Trail */}
      <div className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-20 -z-10">
        <svg viewBox="0 0 1440 800" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path d="M1400,50 C1200,100 1300,300 1000,400 C700,500 800,700 400,800" stroke="#fd4b01" strokeWidth="2" strokeDasharray="8 8" />
          <g transform="translate(1400, 50) rotate(-15)">
            <path d="M0,0 L-20,5 -15,-10 Z" fill="#fd4b01" />
          </g>
        </svg>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center mb-6 md:mb-16">
          <div className="flex items-center gap-4 md:gap-6 mb-4">
            <h2 className="text-3xl md:text-[54px] font-black text-secondary leading-none uppercase tracking-tighter">
              Rides & Activities
            </h2>
          </div>
          <p className="text-base md:text-xl text-zinc-500 font-bold px-4">
            Adventure. Splash. Laughter. Repeat.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          {activityTypes.map((activity, i) => (
            <motion.div
              key={activity.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <Link href={activity.link} className="block h-full px-2 md:px-0">
                <div className="bg-white rounded-[40px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.06)] border border-zinc-50 flex flex-col h-full transition-all duration-500 hover:shadow-[0_40px_80px_rgba(0,0,0,0.12)] hover:-translate-y-2">
                  {/* Image Top */}
                  <div className="relative h-[220px] md:h-[280px] w-full">
                    <Image
                      src={activity.image}
                      alt={activity.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>

                  {/* Content Box - Integrated style */}
                  <div className="p-6 md:p-8 flex items-center gap-4 md:gap-6">
                    <div className="shrink-0 scale-75 md:scale-100">
                      {activity.icon}
                    </div>
                    <div className="flex flex-col">
                      <h3 className={`text-lg md:text-xl font-black ${activity.color} leading-none mb-2`}>
                        {activity.title}
                      </h3>
                      <div className="flex items-center gap-2 text-xs font-black text-zinc-400 group-hover:text-primary transition-all">
                        View All 
                        <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Rides;
