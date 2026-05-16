"use client";

import React from "react";
import { motion } from "framer-motion";

const Loader = ({ text = "Entering a World of Wonder" }: { text?: string }) => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#FFF6E7]">
      <div className="relative flex flex-col items-center gap-8">
        {/* Animated Rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <motion.div
            animate={{
              rotate: 360,
              scale: [1, 1.1, 1],
            }}
            transition={{
              rotate: { duration: 3, repeat: Infinity, ease: "linear" },
              scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
            }}
            className="w-48 h-48 rounded-full border-t-4 border-l-4 border-[#FD2B12] opacity-20"
          />
        </div>
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <motion.div
            animate={{
              rotate: -360,
              scale: [1, 1.2, 1],
            }}
            transition={{
              rotate: { duration: 4, repeat: Infinity, ease: "linear" },
              scale: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
            }}
            className="w-56 h-56 rounded-full border-b-4 border-r-4 border-[#005EFE] opacity-10"
          />
        </div>

        {/* Logo Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            y: [0, -10, 0]
          }}
          transition={{ 
            duration: 0.8,
            y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }}
          className="relative z-10"
        >
          <img
            src="/images/header-logo.png"
            alt="La La Park Loading"
            className="h-24 md:h-32 w-auto object-contain"
          />
        </motion.div>

        {/* Loading Text/Dots */}
        <div className="flex flex-col items-center gap-2">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[10px] font-black uppercase tracking-[0.4em] text-[#142127]/40 text-center"
          >
            {text}
          </motion.p>
          <div className="flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
                className={`w-1.5 h-1.5 rounded-full ${
                  i === 0 ? "bg-[#FD2B12]" : i === 1 ? "bg-[#FFBB00]" : "bg-[#005EFE]"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
