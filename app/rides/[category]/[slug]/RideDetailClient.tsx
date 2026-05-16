"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Users, 
  Clock, 
  ShieldCheck, 
  Waves, 
  Info, 
  ChevronLeft, 
  ChevronRight, 
  Star, 
  Zap, 
  ArrowRight,
  Target,
  Maximize,
  CheckCircle2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import PageHero from "@/components/sections/PageHero";
import { getOptimizedImage } from "@/lib/utils";

interface RideDetailClientProps {
  ride: any;
}

const defaultIcons: Record<string, React.ReactNode> = {
  users: <Users className="w-5 h-5" />,
  waves: <Waves className="w-5 h-5" />,
  shield: <ShieldCheck className="w-5 h-5" />,
  star: <Star className="w-5 h-5" />,
  zap: <Zap className="w-5 h-5" />,
  clock: <Clock className="w-5 h-5" />,
  info: <Info className="w-5 h-5" />,
  target: <Target className="w-5 h-5" />,
  maximize: <Maximize className="w-5 h-5" />,
};

export default function RideDetailClient({ ride }: RideDetailClientProps) {
  const [activeSlide, setActiveSlide] = useState(0);

  const nextSlide = () => setActiveSlide((prev) => (prev + 1) % ride.gallery.length);
  const prevSlide = () => setActiveSlide((prev) => (prev - 1 + ride.gallery.length) % ride.gallery.length);

  return (
    <div className="bg-[#FAFAFA] min-h-screen">
      <PageHero 
        badgeText={ride.category}
        title={ride.title}
        subtitle={ride.tagline}
        bgImage={ride.heroImage}
        primaryBtnText="Secure Passes"
        primaryBtnLink="/book"
        secondaryBtnText="Quick Chat"
        secondaryBtnLink="https://wa.me/yournumber"
      />

      {/* --- Elegant Specs Bar --- */}
      <section className="relative z-30 -mt-12 mb-8 px-4">
        <div className="container mx-auto max-w-5xl">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] rounded-[40px] border border-zinc-100 p-2 md:p-3 flex flex-wrap md:flex-nowrap items-stretch"
          >
            {ride.specs.map((spec: any, i: number) => (
              <React.Fragment key={i}>
                <div className="flex-1 min-w-[140px] px-8 py-6 md:py-8 flex flex-col items-center justify-center text-center group transition-all duration-500">
                  <div className="w-12 h-12 rounded-2xl bg-zinc-50 flex items-center justify-center text-primary mb-4 group-hover:scale-110 group-hover:bg-primary/5 transition-all duration-500">
                    {defaultIcons[spec.icon] || <Star className="w-5 h-5" />}
                  </div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-zinc-400 font-bold mb-1.5">{spec.label}</p>
                  <p className="text-sm text-dark font-black uppercase tracking-tight leading-none">{spec.value}</p>
                </div>
                {i < ride.specs.length - 1 && (
                  <div className="hidden md:block w-px bg-gradient-to-b from-transparent via-zinc-200 to-transparent my-8" />
                )}
              </React.Fragment>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- Narrative & Experience --- */}
      <section className="py-10 md:py-16">
        <div className="container mx-auto px-6 lg:px-10">
          <div className="max-w-4xl mx-auto text-center">
            
            {/* Content */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-10"
            >
              <div className="flex flex-col items-center">
                <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
                  The Experience
                </span>
                <h2 className="text-5xl md:text-8xl font-black text-dark leading-[1.0] tracking-tighter mb-8">
                  {ride.aboutTitle || `Unveiling the ${ride.title}`}
                </h2>
                <div className="text-lg md:text-2xl text-zinc-600 leading-relaxed max-w-3xl mx-auto">
                  {ride.details?.split('\n').map((para: string, i: number) => (
                    <p key={i} className="mb-6">{para}</p>
                  ))}
                </div>
              </div>

              {/* Quick Features List - Centered Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                {ride.highlights.slice(0, 4).map((h: any, i: number) => (
                  <div key={i} className="flex items-center gap-5 p-5 rounded-3xl bg-zinc-50 border border-zinc-100 shadow-sm text-left">
                    <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-primary shadow-sm">
                      {defaultIcons[h.icon] || <CheckCircle2 className="w-6 h-6" />}
                    </div>
                    <span className="text-sm font-bold text-dark uppercase tracking-wider">{h.label}</span>
                  </div>
                ))}
              </div>

              <div className="pt-8">
                <Link 
                  href="/book" 
                  className="inline-flex items-center gap-4 px-12 py-6 bg-dark text-white rounded-full text-sm font-black uppercase tracking-widest hover:bg-primary transition-all group shadow-2xl"
                >
                  Experience It Now
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- Mini Gallery / Grid --- */}
      {ride.gallery.length > 1 && (
        <section className="pb-12 px-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {ride.gallery.map((item: any, i: number) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setActiveSlide(i)}
                  className={`relative aspect-square rounded-[32px] overflow-hidden cursor-pointer transition-all duration-500 ${i === activeSlide ? 'ring-4 ring-primary ring-offset-4' : 'hover:scale-[1.02] opacity-70 hover:opacity-100'}`}
                >
                  <Image 
                    src={getOptimizedImage(item.image)} 
                    alt={item.title} 
                    fill 
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover" 
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
