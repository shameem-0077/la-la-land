"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check, Ticket, Star } from "lucide-react";
import Link from "next/link";

interface PackagesContentProps {
  packages: any[];
  inclusions: any[];
}

/* Carnival colour palette per card */
const cardThemes = [
  { bg: "#FD2B12", accent: "#FFBB00", text: "#fff", stub: "#c4210c" },
  { bg: "#005EFE", accent: "#A6CA46", text: "#fff", stub: "#0047c4" },
  { bg: "#FFBB00", accent: "#FD2B12", text: "#142127", stub: "#e6a800" },
  { bg: "#06331E", accent: "#76A700", text: "#fff", stub: "#041f12" },
];

/* Zig-zag perforated edge (SVG) */
const ZigZag = ({ color }: { color: string }) => (
  <svg viewBox="0 0 400 16" className="w-full" preserveAspectRatio="none" style={{ display: "block" }}>
    <path
      d="M0,8 L10,0 L20,8 L30,0 L40,8 L50,0 L60,8 L70,0 L80,8 L90,0 L100,8 L110,0 L120,8 L130,0 L140,8 L150,0 L160,8 L170,0 L180,8 L190,0 L200,8 L210,0 L220,8 L230,0 L240,8 L250,0 L260,8 L270,0 L280,8 L290,0 L300,8 L310,0 L320,8 L330,0 L340,8 L350,0 L360,8 L370,0 L380,8 L390,0 L400,8 L400,16 L0,16 Z"
      fill={color}
    />
  </svg>
);

const PackagesContent = ({ packages, inclusions }: PackagesContentProps) => {
  return (
    <div style={{ background: "#FFF6E7" }} className="relative overflow-hidden">
      
      {/* Decorative background polka dots */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{ backgroundImage: "radial-gradient(#142127 2px, transparent 2px)", backgroundSize: "28px 28px" }}
      />

      {/* Inclusions Row */}
      <section className="py-12 relative z-30">
        <div className="container mx-auto px-6">
          <div className="bg-white rounded-[40px] shadow-xl border border-[#E5DCCB] p-8 md:p-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-5xl mx-auto">
            {inclusions.map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#005EFE]/5 flex items-center justify-center text-[#005EFE]">
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-xl font-black text-[#142127] uppercase">{item.title}</h4>
                  <p className="text-[#142127]/50 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Grid - The Carnival Ticket Design */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {packages.map((pkg, i) => {
              const t = cardThemes[i % cardThemes.length];
              return (
                <motion.div
                  key={pkg.id || pkg.title}
                  initial={{ opacity: 0, y: 36, rotate: -1 }}
                  whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ y: -6, rotate: 0.5 }}
                  className="relative"
                >
                  {/* Main ticket body */}
                  <div className="rounded-2xl overflow-hidden shadow-2xl flex flex-col h-full" style={{ backgroundColor: t.bg }}>

                    {/* Top stub section */}
                    <div className="px-7 pt-7 pb-5 flex items-start justify-between">
                      {/* Badge */}
                      <div
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest"
                        style={{ backgroundColor: t.accent, color: t.text === "#fff" ? "#142127" : "#fff" }}
                      >
                        <Ticket className="w-3 h-3" />
                        {pkg.badge || pkg.tag_title}
                      </div>

                      {/* Stars */}
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, s) => (
                          <Star key={s} className="w-3.5 h-3.5 fill-current" style={{ color: t.accent }} />
                        ))}
                      </div>
                    </div>

                    {/* Title */}
                    <div className="px-7 pb-3">
                      <h3 className="text-2xl md:text-3xl font-black leading-tight" style={{ color: t.text }}>
                        {pkg.title}
                      </h3>
                    </div>

                    {/* Zig-zag perforation divider */}
                    <div className="relative" style={{ height: "16px" }}>
                      <ZigZag color={t.stub} />
                    </div>

                    {/* Price section — stub */}
                    <div
                      className="px-7 py-6 flex items-center justify-between"
                      style={{ backgroundColor: t.stub }}
                    >
                      <div>
                        <p className="text-xs uppercase tracking-widest font-black mb-1" style={{ color: t.accent }}>
                          Admission Price
                        </p>
                        <div className="flex items-baseline gap-1">
                          <span className="text-2xl font-black" style={{ color: t.text, opacity: 0.7 }}>₹</span>
                          <span className="text-5xl font-black leading-none" style={{ color: t.accent }}>
                            {pkg.price || pkg.amount}
                          </span>
                          <span className="text-sm ml-1 font-semibold" style={{ color: t.text, opacity: 0.6 }}>/ person</span>
                        </div>
                      </div>

                      {/* Circular hole decoration */}
                      <div
                        className="w-14 h-14 rounded-full border-4 flex items-center justify-center"
                        style={{ borderColor: t.accent, borderStyle: "dashed" }}
                      >
                        <Ticket className="w-5 h-5" style={{ color: t.accent }} />
                      </div>
                    </div>

                    {/* Zig-zag (flipped) */}
                    <div style={{ transform: "scaleY(-1)", height: "16px" }}>
                      <ZigZag color={t.stub} />
                    </div>

                    {/* Features */}
                    <div className="px-7 pt-5 pb-6 flex-grow">
                      {pkg.description && (
                        <p className="text-sm mb-5 leading-relaxed" style={{ color: t.text, opacity: 0.7 }}>
                          {pkg.description}
                        </p>
                      )}
                      <div className="space-y-3">
                        {(Array.isArray(pkg.features) ? pkg.features : []).map((feature: string) => (
                          <div key={feature} className="flex items-center gap-2.5">
                            <div
                              className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                              style={{ backgroundColor: t.accent }}
                            >
                              <Check className="w-3 h-3" style={{ color: t.stub }} />
                            </div>
                            <span className="text-sm font-medium" style={{ color: t.text, opacity: 0.85 }}>
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CTA button */}
                    <div className="px-7 pb-7">
                      <Link
                        href="/book"
                        className="block w-full text-center py-4 rounded-xl font-black text-sm uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-[0.98] shadow-xl"
                        style={{ backgroundColor: t.accent, color: t.text === "#fff" ? "#142127" : "#fff" }}
                      >
                        🎟 Grab This Pass
                      </Link>
                    </div>
                  </div>

                  {/* Decorative corner accents */}
                  <div className="absolute -top-3 -right-3 text-2xl pointer-events-none">⭐</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Essential Information */}
      <section className="py-24 relative z-20">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-[#142127] uppercase tracking-tighter">Essential Information</h2>
            <div className="w-20 h-1.5 bg-[#FD2B12] mx-auto mt-4 rounded-full" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="bg-white p-10 rounded-[40px] shadow-xl border border-[#E5DCCB]">
              <h4 className="text-xl font-black text-[#142127] mb-6 uppercase flex items-center gap-3">
                <div className="w-2 h-8 bg-[#FD2B12] rounded-full" />
                Entry Policies
              </h4>
              <ul className="space-y-4 text-[#142127]/60">
                <li className="flex items-start gap-3">
                  <span className="text-[#FD2B12] font-bold">•</span>
                  Free entry for children below 3ft height.
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#FD2B12] font-bold">•</span>
                  Senior citizen discounts available at counter.
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#FD2B12] font-bold">•</span>
                  Outside food & drinks are not permitted.
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#FD2B12] font-bold">•</span>
                  Proper swimwear required for water attractions.
                </li>
              </ul>
            </div>
            <div className="bg-white p-10 rounded-[40px] shadow-xl border border-[#E5DCCB]">
              <h4 className="text-xl font-black text-[#142127] mb-6 uppercase flex items-center gap-3">
                <div className="w-2 h-8 bg-[#005EFE] rounded-full" />
                Park Timings
              </h4>
              <ul className="space-y-4 text-[#142127]/60">
                <li className="flex items-start gap-3">
                  <span className="text-[#005EFE] font-bold">•</span>
                  Monday - Friday: 10:00 AM - 6:00 PM
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#005EFE] font-bold">•</span>
                  Saturday - Sunday: 10:00 AM - 7:00 PM
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#005EFE] font-bold">•</span>
                  Water Park closes 30 mins prior to main park.
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#005EFE] font-bold">•</span>
                  Counter bookings close at 4:30 PM.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PackagesContent;
