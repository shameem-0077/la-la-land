"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Phone, MapPin, Mail, Send, Star, Navigation } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CTA from "@/components/sections/CTA";

const ContactPage = () => {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section - Replicated from Hero.tsx */}
      <section className="relative min-h-screen flex flex-col pt-32 overflow-hidden bg-secondary">
        {/* Immersive Background Layer */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero-bg-image.png"
            alt="La La Land Adventure Park"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-secondary/20 -z-10" />
          <div className="absolute inset-0 bg-white/5 backdrop-blur-[1px] z-10" />
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
              <h1 className="text-4xl md:text-6xl lg:text-[86px] font-black text-white leading-[0.95] tracking-tight uppercase">
                Contact Us
              </h1>
              <div className="inline-block bg-accent text-foreground px-6 py-2 rounded-full text-sm md:text-base w-fit mx-auto lg:mx-0">
                We'd Love to Hear From You!
              </div>
              <p className="text-lg md:text-2xl text-white/80 max-w-xl mx-auto lg:mx-0">
                Have questions, need help, or want to plan your perfect day at La La Land? We're here to make it easy!
              </p>
            </div>
          </motion.div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-50">
          <svg viewBox="0 0 1440 160" className="relative block w-full h-[60px] md:h-[140px]" preserveAspectRatio="none">
            <path 
              fill="#ffffff" 
              d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,106.7C960,117,1056,139,1152,138.7C1248,139,1344,117,1392,106.7L1440,96L1440,160L1392,160C1344,160,1248,160,1152,160C1056,160,960,160,864,160C768,160,672,160,576,160C480,160,384,160,288,160C192,160,96,160,48,160L0,160Z"
            ></path>
          </svg>
        </div>
      </section>

      {/* Info Cards */}
      <section className="bg-white py-12 md:py-20 relative z-30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            {/* Call Us */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-[30px] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-zinc-50 flex items-start gap-6"
            >
              <div className="w-14 h-14 rounded-2xl bg-success/10 flex items-center justify-center shrink-0">
                <Phone className="w-7 h-7 text-success" />
              </div>
              <div>
                <h3 className="text-xl font-black text-secondary mb-2 uppercase">Call Us</h3>
                <div className="flex flex-col gap-1 text-zinc-500 text-sm">
                  <p>+91 7511183000</p>
                  <p>+91 7511159000</p>
                  <p>04936 292219</p>
                </div>
              </div>
            </motion.div>

            {/* Visit Us */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white p-8 rounded-[30px] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-zinc-50 flex items-start gap-6"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                <MapPin className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-black text-secondary mb-2 uppercase">Visit Us</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">
                  La La Land Adventure Park, <br />
                  Vythiri, Wayanad - 673576 <br />
                  Kerala, India
                </p>
              </div>
            </motion.div>

            {/* Email Us */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white p-8 rounded-[30px] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-zinc-50 flex items-start gap-6"
            >
              <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center shrink-0">
                <Mail className="w-7 h-7 text-secondary" />
              </div>
              <div>
                <h3 className="text-xl font-black text-secondary mb-2 uppercase">Email Us</h3>
                <div className="flex flex-col gap-1 text-zinc-500 text-sm">
                  <p>info@lalalandpark.com</p>
                  <p>reservation@lalalandpark.com</p>
                  <p>marketing@lalalandpark.com</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Form & Gallery Section */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="mb-10">
                <span className="text-accent uppercase tracking-widest text-sm mb-4 block">
                  &gt; Send Us A Message &lt;
                </span>
                <h2 className="text-4xl md:text-5xl font-black text-secondary mb-4">
                  We Are Here to Help!
                </h2>
                <p className="text-zinc-500">
                  Fill out the form and our team will get back to you as soon as possible.
                </p>
              </div>

              <form className="space-y-4">
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Your Name" 
                    className="w-full bg-zinc-50 border border-zinc-100 rounded-full px-8 py-4 focus:outline-none focus:border-primary text-secondary"
                  />
                </div>
                <div className="relative">
                  <input 
                    type="email" 
                    placeholder="Your Email" 
                    className="w-full bg-zinc-50 border border-zinc-100 rounded-full px-8 py-4 focus:outline-none focus:border-primary text-secondary"
                  />
                </div>
                <div className="relative">
                  <input 
                    type="tel" 
                    placeholder="Your Phone" 
                    className="w-full bg-zinc-50 border border-zinc-100 rounded-full px-8 py-4 focus:outline-none focus:border-primary text-secondary"
                  />
                </div>
                <div className="relative">
                  <textarea 
                    placeholder="Your Message" 
                    rows={4}
                    className="w-full bg-zinc-50 border border-zinc-100 rounded-[30px] px-8 py-4 focus:outline-none focus:border-primary text-secondary resize-none"
                  ></textarea>
                </div>
                <button className="bg-primary text-white px-10 py-5 rounded-full uppercase tracking-widest hover:bg-primary-dark transition-all flex items-center gap-3 shadow-xl shadow-primary/20">
                  Send Message
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </motion.div>

            {/* Image Grid */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="space-y-4">
                <div className="rounded-[30px] overflow-hidden aspect-square relative shadow-xl">
                  <Image src="/park_hero_image_1778049530668.png" alt="Ride" fill className="object-cover" />
                </div>
                <div className="rounded-[30px] overflow-hidden aspect-[4/3] relative shadow-xl">
                  <Image src="/water_activities_image_1778049553201.png" alt="Splash" fill className="object-cover" />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="rounded-[30px] overflow-hidden aspect-[3/4] relative shadow-xl">
                  <Image src="/rides_tower_activities_1778054789676.png" alt="Thrill" fill className="object-cover" />
                </div>
                <div className="rounded-[30px] overflow-hidden aspect-square relative shadow-xl">
                  <Image src="/amusement_activities_image_1778049573930.png" alt="Fun" fill className="object-cover" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-zinc-50">
        <div className="container mx-auto px-4">
          <div className="relative rounded-[40px] overflow-hidden h-[600px] shadow-2xl">
            {/* Mock Map Image or iframe */}
            <div className="absolute inset-0 bg-[#e5e7eb] flex items-center justify-center">
              <p className="text-zinc-400">Google Maps Integration Here</p>
            </div>
            
            {/* Map Info Overlay */}
            <div className="absolute top-8 left-8 md:top-12 md:left-12 max-w-sm w-full">
              <div className="bg-white p-8 rounded-[40px] shadow-2xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-secondary/5 flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-secondary" />
                  </div>
                  <h3 className="text-2xl font-black text-secondary uppercase">Find Us Here</h3>
                </div>
                
                <div className="mb-6">
                  <p className="text-secondary mb-1">La La Land Adventure Park</p>
                  <p className="text-zinc-500 text-sm leading-relaxed">
                    Vythiri, Wayanad - 673576 <br />
                    Kerala, India
                  </p>
                </div>

                <div className="flex items-center gap-2 mb-8">
                  <p className="text-secondary">4.8</p>
                  <div className="flex gap-1 text-accent">
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                  </div>
                  <p className="text-zinc-400 text-xs">(19,401)</p>
                </div>

                <div className="space-y-3">
                  <button className="w-full bg-primary text-white py-4 rounded-full text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl shadow-primary/20 hover:bg-primary-dark transition-all">
                    <Navigation className="w-4 h-4" />
                    Get Directions
                  </button>
                  <button className="w-full bg-white border-2 border-zinc-100 text-secondary py-4 rounded-full text-xs uppercase tracking-widest flex items-center justify-center gap-2">
                    View in Google Maps
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <CTA />

      <Footer />
    </main>
  );
};

export default ContactPage;
