"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Ticket } from "lucide-react";
import { motion } from "framer-motion";

const AboutHero = () => {
  return (
    <section className="relative h-screen min-h-[600px] flex items-center pt-20 overflow-hidden bg-secondary">
      {/* Background Image - Using standard img for immediate visibility like main Hero */}
      <div className="absolute inset-0 z-0">
        <img
          src="/about_hero_v2.png"
          alt="About La La Park"
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
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <span className="inline-block px-5 py-2 rounded-full bg-accent text-foreground text-[10px] uppercase tracking-[0.2em] mb-6 shadow-xl shadow-accent/20">
            Discover Our Story
          </span>
          <h1 className="text-5xl md:text-8xl font-black text-white leading-[0.95] mb-8 tracking-tighter">
            Fun & <br />
            Memories...
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-10 max-w-lg leading-relaxed">
            La La Park is Wayanad's most loved destination for thrill, joy and unforgettable experiences.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              {/* <Link 
                href="/book" 
                className="flex items-center gap-3 bg-primary hover:bg-primary-dark text-white py-4 px-10 rounded-full shadow-2xl shadow-primary/40 transition-all text-xs tracking-widest uppercase"
              >
                Book Tickets
                <Ticket className="w-5 h-5 fill-white" />
              </Link> */}
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Signature Wave Divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-20">
        <svg viewBox="0 0 1440 160" className="relative block w-full h-[100px] md:h-[150px]" preserveAspectRatio="none">
          <path 
            fill="#ffffff" 
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,106.7C960,117,1056,139,1152,138.7C1248,139,1344,117,1392,106.7L1440,96L1440,160L1392,160C1344,160,1248,160,1152,160C1056,160,960,160,864,160C768,160,672,160,576,160C480,160,384,160,288,160C192,160,96,160,48,160L0,160Z"
          ></path>
          {/* Subtle sprinkles to match main Hero */}
          <circle cx="50" cy="80" r="3" fill="#02a1a8" fillOpacity="0.3" />
          <circle cx="200" cy="100" r="2" fill="#ffb902" fillOpacity="0.3" />
          <circle cx="800" cy="90" r="4" fill="#fd4b01" fillOpacity="0.2" />
        </svg>
      </div>
    </section>
  );
};

export default AboutHero;
