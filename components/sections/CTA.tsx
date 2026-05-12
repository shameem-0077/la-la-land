"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle, Ticket } from "lucide-react";
import { motion } from "framer-motion";

const CTA = () => {
  return (
    <section className="py-12 md:py-14 px-4">
      <div className="container mx-auto">
        <div className="relative overflow-hidden rounded-[30px] md:rounded-[50px] bg-primary md:bg-gradient-to-r md:from-primary md:via-primary md:to-secondary p-8 md:p-16 lg:p-20 shadow-2xl">
          {/* Illustrative Tower Asset - Hidden on Mobile for Focus */}
          <div className="absolute right-0 bottom-0 w-[450px] h-[450px] pointer-events-none z-0 hidden md:block">
            <Image
              src="/cta_tower.png"
              alt=" Park Tower"
              fill
              className="object-contain object-bottom"
            />
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-12">
            {/* Left Content */}
            <div className="flex-1 text-center lg:text-left">
              <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 text-white text-[10px] uppercase tracking-[0.2em] mb-6">
                Direct Booking
              </span>
              <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
                Plan Your Fun <br className="hidden md:block" />
                 Today
              </h2>
              
              <p className="text-white text-lg md:text-xl mb-8">
                Book online now and get <br className="md:hidden" /> <span className="text-primary bg-accent px-2 py-0.5 rounded-lg italic">Instant Confirmation</span>
              </p>
            </div>

            {/* Right Buttons */}
            <div className="flex flex-col gap-3 md:gap-4 w-full md:min-w-[320px] lg:w-auto items-center">
              {/* <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full max-w-[280px]">
                <Link 
                  href="/book" 
                  className="flex items-center justify-center gap-3 bg-white text-primary hover:bg-muted py-3.5 md:py-5 px-8 md:px-10 rounded-xl md:rounded-full shadow-2xl transition-all text-xs md:text-sm tracking-wider uppercase w-full"
                >
                  Book Tickets Now
                  <Ticket className="w-4 h-4 md:w-5 md:h-5" />
                </Link>
              </motion.div> */}

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full max-w-[280px]">
                <Link 
                  href="https://wa.me/your-number" 
                  className="flex items-center justify-center gap-3 bg-white/10 backdrop-blur-md text-white border border-white/20 py-3.5 md:py-5 px-8 md:px-10 rounded-xl md:rounded-full shadow-xl transition-all text-xs md:text-sm tracking-wider uppercase w-full"
                >
                  Chat on WhatsApp
                  <div className="w-5 h-5 md:w-6 md:h-6 bg-success rounded-full flex items-center justify-center ml-2">
                    <MessageCircle className="w-3.5 h-3.5 md:w-4 md:h-4 fill-white text-white" />
                  </div>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
