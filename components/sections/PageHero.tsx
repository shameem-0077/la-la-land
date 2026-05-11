"use client";

import React from "react";
import Link from "next/link";
import { Ticket, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

interface PageHeroProps {
  title: React.ReactNode;
  subtitle: string;
  bgImage: string;
  badgeText: string;
  primaryBtnText?: string;
  primaryBtnLink?: string;
  secondaryBtnText?: string;
  secondaryBtnLink?: string;
}

const PageHero = ({
  title,
  subtitle,
  bgImage,
  badgeText,
  primaryBtnText = "Book Tickets",
  primaryBtnLink = "/book",
  secondaryBtnText,
  secondaryBtnLink
}: PageHeroProps) => {
  return (
    <section className="relative h-screen min-h-[600px] w-full flex flex-col pt-32 overflow-hidden bg-secondary">
      {/* Immersive Background Layer */}
      <div className="absolute inset-0 z-0 w-full">
        <img
          src={bgImage}
          alt={badgeText}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-secondary/30 -z-10" />
        {/* <div className="absolute inset-0 bg-gradient-to-r from-secondary/60 via-secondary/30 to-transparent z-0" /> */}
      </div>

      <div className="container mx-auto px-4 flex-grow flex items-center relative z-10 pb-40 lg:pb-0">
        {/* Content Overlay */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl text-center lg:text-left flex flex-col gap-8 md:gap-10"
        >
          <div className="flex flex-col gap-6">
            <span className="inline-block px-5 py-2 rounded-full bg-accent text-foreground text-[10px] uppercase tracking-[0.2em] mb-6 shadow-xl shadow-accent/20 w-fit mx-auto lg:mx-0">
              {badgeText}
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-[86px] font-black text-white leading-[0.95] tracking-tight uppercase">
              {title}
            </h1>
            <p className="text-lg md:text-2xl text-white/80 max-w-xl mx-auto lg:mx-0">
              {subtitle}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6 justify-center lg:justify-start">
            <Link
              href={primaryBtnLink}
              className="w-full sm:w-auto flex items-center justify-center gap-4 px-8 py-4 md:px-10 md:py-5 bg-primary text-white rounded-full text-xs md:text-sm uppercase tracking-widest hover:bg-primary-dark transition-all shadow-2xl"
            >
              {primaryBtnText}
              <Ticket className="w-5 h-5 fill-current" />
            </Link>
            {secondaryBtnText && secondaryBtnLink && (
              <Link
                href={secondaryBtnLink}
                className="w-full sm:w-auto flex items-center justify-center gap-4 px-8 py-4 md:px-10 md:py-5 bg-white text-secondary rounded-full text-xs md:text-sm uppercase tracking-widest hover:bg-muted transition-all shadow-xl shadow-black/5 group"
              >
                {secondaryBtnText}
                <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
            )}
          </div>
        </motion.div>
      </div>

      {/* Wave Divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-20">
        <svg viewBox="0 0 1440 160" className="relative block w-full h-[60px] md:h-[140px]" preserveAspectRatio="none">
          <path 
            fill="#ffffff" 
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,106.7C960,117,1056,139,1152,138.7C1248,139,1344,117,1392,106.7L1440,96L1440,160L1392,160C1344,160,1248,160,1152,160C1056,160,960,160,864,160C768,160,672,160,576,160C480,160,384,160,288,160C192,160,96,160,48,160L0,160Z"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default PageHero;
