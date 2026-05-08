"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star, ShieldCheck, Heart } from "lucide-react";
import { motion } from "framer-motion";

const AboutSection = () => {
  return (
    <section id="about-preview" className="py-8 md:py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          {/* Left: Content */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-[10px] uppercase tracking-[0.2em] mb-6">
                Where Fun Meets Nature
              </span>
              <h2 className="text-3xl md:text-[54px] font-black text-secondary leading-[1.1] mb-8 uppercase tracking-tighter">
                Discover the Heart of <br className="hidden md:block" />
                <span className="text-primary italic">La La Land</span>
              </h2>
              <p className="text-base md:text-lg text-zinc-500 leading-relaxed mb-8 md:mb-10 max-w-2xl mx-auto lg:mx-0">
                La La Land is more than just an adventure park. It's a sanctuary of joy where 
                thrilling rides, lush landscapes, and family moments come together. From the 
                highest swings to the biggest splashes, we create memories that last a lifetime.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-8 md:mb-10 text-left max-w-xl mx-auto lg:mx-0">
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-black text-secondary text-[10px] md:text-sm uppercase tracking-wider mb-1">Safety First</h4>
                    <p className="text-[10px] md:text-xs text-zinc-400 leading-tight">ISO Certified safety protocols for all rides.</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary transition-colors group-hover:bg-secondary group-hover:text-white">
                    <Heart className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-black text-secondary text-[10px] md:text-sm uppercase tracking-wider mb-1">Family Heart</h4>
                    <p className="text-[10px] md:text-xs text-zinc-400 leading-tight">Dedicated zones for every age group.</p>
                  </div>
                </div>
              </div>

              <Link 
                href="/about" 
                className="inline-flex items-center gap-3 px-8 py-3.5 md:px-10 md:py-4 bg-primary text-white rounded-full text-[10px] md:text-xs uppercase tracking-widest hover:bg-primary-dark transition-all shadow-xl shadow-primary/20 group"
              >
                Learn Our Full Story
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>

          {/* Right: Fun Imagery */}
          <div className="flex-1 relative mt-10 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative z-10"
            >
              {/* Main Image with Premium Frame */}
              <div className="rounded-[40px] md:rounded-[60px] overflow-hidden border-[8px] md:border-[12px] border-zinc-50 shadow-2xl relative">
                <Image 
                  src="/about_hero_v2.png" 
                  alt="La La Land Park" 
                  width={600} 
                  height={700} 
                  className="w-full object-cover aspect-[4/5]"
                />
                
                {/* Floating Stat Badge */}
                <div className="absolute bottom-6 -left-4 md:bottom-10 md:-left-10 bg-[#ff7d00] text-white p-6 md:p-8 rounded-[30px] md:rounded-[40px] shadow-2xl">
                  <div className="text-2xl md:text-4xl font-black mb-1">10+</div>
                  <div className="text-[8px] md:text-[10px] uppercase tracking-[0.2em] opacity-80 leading-none">Years of Smiles</div>
                </div>
              </div>

              {/* Decorative Bursts */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#adff00] rounded-full blur-[80px] opacity-20 -z-10" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#ff7d00] rounded-full blur-[80px] opacity-20 -z-10" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
