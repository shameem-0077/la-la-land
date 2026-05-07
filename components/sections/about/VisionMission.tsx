"use client";

import React from "react";
import { Eye, Target } from "lucide-react";
import { motion } from "framer-motion";

const VisionMission = () => {
  return (
    <section className="py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Our Vision */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-[40px] p-10 md:p-16 shadow-[0_20px_60px_rgba(0,0,0,0.03)] border border-white relative overflow-hidden group"
          >
            {/* Decorative Background Icon */}
            <div className="absolute bottom-0 left-0 w-32 h-32 opacity-[0.03] translate-y-1/4 -translate-x-1/4 group-hover:scale-110 transition-transform duration-700">
               <Eye className="w-full h-full" />
            </div>

            <div className="flex items-center gap-6 mb-8">
              <div className="w-20 h-20 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary">
                <Eye className="w-10 h-10" />
              </div>
              <h3 className="text-3xl font-black text-primary uppercase">Our Vision</h3>
            </div>
            <p className="text-xl text-zinc-500 font-bold leading-relaxed">
              To be Wayanad's most loved family adventure destination, creating joyful memories for every visitor through innovation, safety, and care.
            </p>
          </motion.div>

          {/* Our Mission */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-[40px] p-10 md:p-16 shadow-[0_20px_60px_rgba(0,0,0,0.03)] border border-white relative overflow-hidden group"
          >
            {/* Decorative Background Icon */}
            <div className="absolute bottom-0 right-0 w-32 h-32 opacity-[0.03] translate-y-1/4 translate-x-1/4 group-hover:scale-110 transition-transform duration-700">
               <Target className="w-full h-full" />
            </div>

            <div className="flex items-center gap-6 mb-8">
              <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                <Target className="w-10 h-10" />
              </div>
              <h3 className="text-3xl font-black text-primary uppercase">Our Mission</h3>
            </div>
            <ul className="space-y-4">
              {[
                "Deliver safe and exciting experiences",
                "Offer fun for all age groups",
                "Maintain clean and welcoming facilities",
                "Support local communities"
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-lg text-zinc-500 font-bold">
                  <div className="w-2 h-2 rounded-full bg-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default VisionMission;
