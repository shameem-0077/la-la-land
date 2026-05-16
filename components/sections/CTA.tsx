"use client";

import React from "react";
import Link from "next/link";
import { MessageCircle, ArrowRight, Ticket, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import ScrollingPark from "./ScrollingPark";

const CTA = () => {
  return (
    <section className=" bg-[#FFF6E7]">
      <div className="mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden bg-[#FD2B12] py-8 px-10 md:py-12 md:px-16 lg:py-14 lg:px-20 shadow-[0_24px_50px_rgba(253,43,18,0.25)]"
        >
          {/* Ambient glows (Carnival Lights) */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FFBB00]/30 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#005EFE]/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4 pointer-events-none" />
          
          {/* Faint polka dot overlay (classic festive texture) */}
          <div className="absolute inset-0 opacity-[0.06] pointer-events-none"
            style={{ backgroundImage: "radial-gradient(white 2.5px, transparent 2.5px)", backgroundSize: "36px 36px" }} />

          {/* Decorative Giant Ticket SVG Watermark */}
          <div className="absolute -top-16 -right-12 hidden md:block pointer-events-none opacity-10 transform rotate-12">
            <Ticket className="w-96 h-96 text-white" strokeWidth={1} />
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 md:gap-16 text-center lg:text-left">

            {/* Left Area */}
            <div className="flex-1 max-w-2xl">
              <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/20 border border-white/20 text-white text-[10px] uppercase tracking-[0.25em] mb-6 font-black backdrop-blur-sm shadow-sm">
                <Sparkles className="w-3 h-3 text-[#FFBB00]" />
                Start Your Adventure
              </span>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.05] tracking-tighter mb-6 drop-shadow-md">
                Plan Your <br className="hidden md:block" />
                <span className="text-[#FFBB00] drop-shadow-[3px_3px_0_rgba(181,25,8,0.8)]">
                  Perfect Day
                </span>{" "}
                at La La Park
              </h2>
              
              <p className="text-white/90 text-base md:text-lg leading-relaxed font-medium max-w-xl mx-auto lg:mx-0">
                The rides are ready and the lights are on! Reach out on WhatsApp for instant answers on rides, packages, group bookings, and more.
              </p>
            </div>

            {/* Right Area: Clean, Premium Buttons */}
            <div className="flex flex-col gap-5 w-full sm:w-[320px] lg:w-auto lg:min-w-[320px] items-center">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="w-full">
                <Link
                  href="https://wa.me/your-number"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-4 bg-white text-[#142127] py-4 md:py-5 px-8 rounded-full shadow-xl text-xs md:text-sm tracking-[0.15em] uppercase font-black w-full hover:bg-[#FFBB00] hover:text-[#142127] transition-all group"
                >
                  Chat on WhatsApp
                  <div className="w-8 h-8 bg-[#25D366] rounded-full flex items-center justify-center shadow-sm">
                    <MessageCircle className="w-4 h-4 fill-white text-white" />
                  </div>
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="w-full">
                <Link
                  href="/packages"
                  className="flex items-center justify-center gap-4 bg-transparent text-white border-[3px] border-white/30 py-4 md:py-5 px-8 rounded-full text-xs md:text-sm tracking-[0.15em] uppercase font-black w-full hover:bg-white/10 hover:border-white transition-all group"
                >
                  View Packages
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
            </div>
            
          </div>
        </motion.div>
        <ScrollingPark />
      </div>
    </section>
  );
};

export default CTA;
