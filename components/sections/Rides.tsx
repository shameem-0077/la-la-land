"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";

const activityTypes = [
  {
    title: "Water Rides",
    image: "/water_activities_image_1778049553201.png",
    color: "text-secondary",
    link: "/rides?category=water"
  },
  {
    title: "Outdoor Rides",
    image: "/park_hero_image_1778049530668.png",
    color: "text-accent",
    link: "/rides?category="
  },
  {
    title: "Kids Rides",
    image: "/rides_kids_activities_1778055058230.png",
    color: "text-primary",
    link: "/rides?category=kids"
  },
  {
    title: "Add-ons",
    image: "/amusement_activities_image_1778049573930.png",
    color: "text-secondary",
    link: "/rides?category=amusement"
  },
];

interface RidesProps {
  initialCategories?: any[];
}

const Rides = ({ initialCategories = [] }: RidesProps) => {

  return (
    <section id="rides" className="relative py-12 md:py-16 bg-white overflow-hidden">
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
          <p className="text-base md:text-xl text-zinc-500 px-4">
            Fun. Splash. Laughter. Repeat.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          {initialCategories.length > 0 ? (
            initialCategories.map((activity, i) => (
              <motion.div
                key={activity.id || i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group"
              >
                <Link href={`/rides?category=${activity.slug}`} className="block h-full px-2 md:px-0">
                  <div className="bg-white rounded-[40px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.06)] border border-zinc-50 flex flex-col h-full transition-all duration-500 hover:shadow-[0_40px_80px_rgba(0,0,0,0.12)] hover:-translate-y-2">
                    {/* Image Top */}
                    <div className="relative h-[220px] md:h-[280px] w-full">
                      <Image
                        src={activity.cover_image || activity.image}
                        alt={activity.name || activity.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>

                    {/* Content Box - Integrated style */}
                    <div className="p-6 md:p-8 flex items-center gap-4 md:gap-6">
                      <div className="flex flex-col">
                        <h3 className={`text-lg md:text-xl font-black ${activity.color || 'text-secondary'} leading-none mb-2`}>
                          {activity.name || activity.title}
                        </h3>
                        <div className="flex items-center gap-2 text-xs text-zinc-400 group-hover:text-primary transition-all">
                          View All 
                          <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-20 bg-zinc-50 rounded-[40px] border-2 border-dashed border-zinc-100">
              <p className="text-zinc-400 uppercase tracking-widest text-[10px]">No categories found</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Rides;
