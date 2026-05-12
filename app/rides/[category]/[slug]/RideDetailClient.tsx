"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle, Ticket, Users, Clock, ShieldCheck, Waves, Info, ChevronLeft, ChevronRight, Star, Zap, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import PageHero from "@/components/sections/PageHero";

interface RideDetailClientProps {
  ride: any;
}

const defaultIcons: Record<string, React.ReactNode> = {
  users: <Users className="w-5 h-5" />,
  waves: <Waves className="w-5 h-5" />,
  shield: <ShieldCheck className="w-5 h-5" />,
  star: <Star className="w-5 h-5" />,
  zap: <Zap className="w-6 h-6 text-primary" />,
  clock: <Clock className="w-6 h-6 text-primary" />,
  info: <Info className="w-6 h-6 text-primary" />,
  water: <Waves className="w-5 h-5" />,
  thrill: <Zap className="w-5 h-5" />,
  kids: <Star className="w-5 h-5" />,
  all: <Ticket className="w-5 h-5" />,
};

export default function RideDetailClient({ ride }: RideDetailClientProps) {
  const [activeSlide, setActiveSlide] = useState(0);

  const nextSlide = () => setActiveSlide((prev) => (prev + 1) % ride.gallery.length);
  const prevSlide = () => setActiveSlide((prev) => (prev - 1 + ride.gallery.length) % ride.gallery.length);

  return (
    <>
      <PageHero 
        badgeText={ride.category}
        title={
          <>
            {ride.title.split(' ')[0]} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              {ride.title.split(' ').slice(1).join(' ')}
            </span>
          </>
        }
        subtitle={ride.tagline}
        bgImage={ride.heroImage}
        primaryBtnText="Secure Passes"
        primaryBtnLink="/book"
        secondaryBtnText="Quick Chat"
        secondaryBtnLink="https://wa.me/yournumber"
      />

      {/* Feature Spec Bar */}
      <section className="-mt-12 relative z-30 mb-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap md:flex-nowrap gap-4 md:gap-0 bg-secondary/90 backdrop-blur-2xl rounded-[40px] md:rounded-full p-4 md:p-2 border border-white/10 shadow-2xl">
            {ride.highlights.map((spec: any, i: number) => (
              <div key={i} className={`flex-1 flex items-center gap-6 px-8 py-4 ${i !== ride.highlights.length - 1 ? 'md:border-r border-white/10' : ''}`}>
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 text-primary">
                  {defaultIcons[spec.icon] || (spec.icon && (spec.icon.startsWith('http') || spec.icon.includes('/')) ? <img src={spec.icon} alt="" className="w-6 h-6 object-contain" /> : <Star className="w-6 h-6" />)}
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-white/50 mb-1">Highlight</p>
                  <p className="text-sm text-white font-black uppercase">{spec.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Narrative Section */}
      <section className="py-32 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-12"
            >
              <div>
                {/* <span className="text-primary font-black uppercase tracking-[0.4em] text-xs mb-6 block">{ride.aboutTitle || `The Experience`}</span> */}
                <h2 className="text-6xl md:text-8xl font-black text-secondary leading-[0.85] tracking-tighter uppercase mb-10">
                  {ride.aboutTitle}
                </h2>
                <div className="space-y-8 text-xl text-muted-foreground leading-relaxed">
                  <p className="font-medium text-secondary">
                    {ride.details}
                  </p>
                </div>
              </div>
            </motion.div>

            <div className="relative group">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="rounded-[80px] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.4)] relative z-10 aspect-[3/4]"
              >
                {ride.gallery.length > 0 ? (
                  <>
                    <div className="absolute inset-0 flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${activeSlide * 100}%)` }}>
                      {ride.gallery.map((item: any, i: number) => (
                        <div key={i} className="min-w-full h-full relative">
                          <Image 
                            src={item.image} 
                            alt={item.title} 
                            fill 
                            className="object-cover" 
                          />
                        </div>
                      ))}
                    </div>

                    {ride.gallery.length > 1 && (
                      <>
                        <div className="absolute inset-0 flex items-center justify-between px-6 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                          <button onClick={prevSlide} className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-primary transition-all">
                            <ChevronLeft className="w-6 h-6" />
                          </button>
                          <button onClick={nextSlide} className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-primary transition-all">
                            <ChevronRight className="w-6 h-6" />
                          </button>
                        </div>
                        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                          {ride.gallery.map((_: any, i: number) => (
                            <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${i === activeSlide ? "w-8 bg-primary" : "w-2 bg-white/40"}`} />
                          ))}
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <div className="w-full h-full bg-muted flex items-center justify-center">
                    <p className="text-zinc-400 uppercase tracking-widest text-xs">No gallery images</p>
                  </div>
                )}
              </motion.div>
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-primary/20 rounded-full blur-3xl -z-10" />
              <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Quick Book Footer */}
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-4xl"
      >
        <div className="bg-secondary/90 backdrop-blur-2xl rounded-full p-2 pl-8 border border-white/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] flex items-center justify-between">
           <div className="hidden sm:block">
              <p className="text-white text-sm font-black uppercase tracking-widest leading-none">Ready to Play?</p>
              <p className="text-white/60 text-[10px] uppercase tracking-widest">Book tickets for {ride.title}</p>
           </div>
           <Link href="/book" className="bg-primary text-white py-4 px-10 rounded-full font-black uppercase tracking-widest text-xs hover:scale-105 transition-all shadow-xl">
              Get Tickets
           </Link>
        </div>
      </motion.div>
    </>
  );
}
