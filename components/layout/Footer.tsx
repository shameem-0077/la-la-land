"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

// Custom SVG Icons for Social Media
const Instagram = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);

const Facebook = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);

const Youtube = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2C5.12 19.5 12 19.5 12 19.5s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
);

const Footer = () => {
  return (
    <footer className="bg-[#111c44] text-white py-16 md:py-20 relative overflow-hidden">
      {/* Decorative background circle */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand & Mission */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="inline-block group">
              <img 
                src="/images/header-logo.png" 
                alt="La La Land Logo" 
                width={180} 
                height={80} 
                className="h-16 md:h-20 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </Link>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              La La Land Adventure Park - Wayanad's ultimate destination for thrills, laughter, and family-friendly adventures.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-6 md:gap-8">
            <h4 className="text-lg font-black uppercase tracking-widest text-primary">Quick Links</h4>
            <div className="flex flex-col gap-4 text-white/70 text-[13px] uppercase tracking-wider">
              <Link href="#about" className="hover:text-primary transition-colors">About Us</Link>
              <Link href="#rides" className="hover:text-primary transition-colors">Rides & Activities</Link>
              <Link href="#packages" className="hover:text-primary transition-colors">Packages</Link>
              <Link href="#gallery" className="hover:text-primary transition-colors">Gallery</Link>
              <Link href="#contact" className="hover:text-primary transition-colors">Contact Us</Link>
            </div>
          </div>

          {/* Visitor Info */}
          <div className="flex flex-col gap-6 md:gap-8">
            <h4 className="text-lg font-black uppercase tracking-widest text-primary">Visitor Info</h4>
            <div className="flex flex-col gap-4 text-white/70 text-[13px] uppercase tracking-wider">
              <Link href="#timings" className="hover:text-primary transition-colors">Park Timings</Link>
              <Link href="#tickets" className="hover:text-primary transition-colors">Ticket Info</Link>
              <Link href="#group" className="hover:text-primary transition-colors">Group Bookings</Link>
              <Link href="#faq" className="hover:text-primary transition-colors">FAQs</Link>
              <Link href="#reach" className="hover:text-primary transition-colors">How to Reach</Link>
            </div>
          </div>

          {/* Follow Us */}
          <div className="flex flex-col gap-6 md:gap-8">
            <h4 className="text-lg font-black uppercase tracking-widest text-primary">Follow Us</h4>
            <div className="flex gap-4">
              <Link href="#" className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:text-secondary transition-all group">
                <Instagram />
              </Link>
              <Link href="#" className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:text-secondary transition-all group">
                <Facebook />
              </Link>
              <Link href="#" className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:text-secondary transition-all group">
                <Youtube />
              </Link>
            </div>
            <div className="mt-4">
              <p className="text-white/40 text-[10px] uppercase tracking-[0.2em] mb-4">Subscribe for Updates</p>
              <div className="flex bg-white/5 rounded-full p-1 border border-white/10">
                <input 
                  type="email" 
                  placeholder="Your Email" 
                  className="bg-transparent border-none focus:outline-none px-4 text-sm w-full"
                />
                <button className="bg-primary p-3 rounded-full hover:bg-white transition-colors text-secondary">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 md:mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] text-white/30 uppercase tracking-[0.2em]">
          <p>© 2024 La La Land Adventure Park. All Rights Reserved.</p>
          <div className="flex gap-8">
            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
