"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const Licenses = () => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-6 mb-4">
            <div className="flex items-center gap-1 opacity-40">
              <div className="w-3 h-3 rounded-full bg-primary rotate-45" />
              <div className="w-4 h-1 bg-accent rounded-full" />
              <div className="w-2 h-2 bg-secondary rounded-full" />
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-primary leading-none uppercase">
              Our Licenses & Certifications
            </h2>
            <div className="flex items-center gap-1 opacity-40">
              <div className="w-2 h-2 bg-secondary rounded-full" />
              <div className="w-4 h-1 bg-accent rounded-full" />
              <div className="w-3 h-3 rounded-full bg-primary rotate-45" />
            </div>
          </div>
          <p className="text-lg text-zinc-500 max-w-2xl mx-auto">
            View our official licenses and approvals that demonstrate our compliance with government regulations.
          </p>
        </div>

        {/* Certifications Row */}
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-80 hover:opacity-100 transition-opacity">
          {[1, 2, 3, 4, 5].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative w-32 h-44 md:w-48 md:h-64 rounded-xl overflow-hidden shadow-lg border border-zinc-100 bg-zinc-50 flex items-center justify-center group"
            >
              {/* Using a placeholder for certificates since we don't have the actual assets */}
              <div className="absolute inset-0 bg-white group-hover:bg-zinc-50 transition-colors" />
              <div className="relative z-10 flex flex-col items-center gap-4 text-zinc-300">
                <div className="w-12 h-16 border-2 border-zinc-200 rounded flex items-center justify-center">
                  <span className="text-[10px] uppercase tracking-tighter">Seal</span>
                </div>
                <span className="text-[10px] uppercase tracking-widest text-zinc-400">Certificate {i}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Licenses;
