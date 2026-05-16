"use client";

import React from "react";
import { Check, Ticket, Star } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

interface PackagesPreviewProps {
  initialPackages?: any[];
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

const PackagesPreview = ({ initialPackages = [] }: PackagesPreviewProps) => {
  return (
    <section
      id="packages"
      className="relative py-12 md:py-16 overflow-hidden"
      style={{ background: "#FFF6E7" }}
    >
      {/* Decorative background polka dots */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{ backgroundImage: "radial-gradient(#142127 2px, transparent 2px)", backgroundSize: "28px 28px" }}
      />

      {/* Festive banner strings */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden h-16 pointer-events-none opacity-20">
        <svg viewBox="0 0 1440 64" preserveAspectRatio="none" className="w-full h-full">
          <path d="M0,10 Q180,50 360,10 Q540,50 720,10 Q900,50 1080,10 Q1260,50 1440,10" fill="none" stroke="#FD2B12" strokeWidth="2" />
          {[60,180,300,420,540,660,780,900,1020,1140,1260,1380].map((x) => (
            <polygon key={x} points={`${x},14 ${x-10},38 ${x+10},38`} fill={x%2===0?"#FD2B12":"#FFBB00"} opacity="0.9" />
          ))}
        </svg>
      </div>

      <div className="container mx-auto px-6 lg:px-10 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14 md:mb-20"
        >
          <span className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#FD2B12] text-white text-[10px] uppercase tracking-[0.25em] mb-5 font-black shadow-lg shadow-[#FD2B12]/30">
            <Star className="w-3 h-3 fill-[#FFBB00] text-[#FFBB00]" />
            Step Right Up!
            <Star className="w-3 h-3 fill-[#FFBB00] text-[#FFBB00]" />
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-[62px] font-black text-[#142127] leading-tight tracking-tighter">
            Choose Your{" "}
            <span className="text-[#FD2B12]">Adventure</span>{" "}
            Pass
          </h2>
          <p className="text-base md:text-lg text-[#142127]/55 mt-4  mx-auto">
            More rides, more memories, more value. Pick the pass that suits your crew!
          </p>
        </motion.div>

        {/* Carnival Ticket Cards */}
        {initialPackages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {initialPackages.map((pkg, i) => {
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
                  <div className="rounded-2xl overflow-hidden shadow-2xl" style={{ backgroundColor: t.bg }}>

                    {/* Top stub section */}
                    <div className="px-7 pt-7 pb-5 flex items-start justify-between">
                      {/* Badge */}
                      <div
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest"
                        style={{ backgroundColor: t.accent, color: t.text === "#fff" ? "#142127" : "#fff" }}
                      >
                        <Ticket className="w-3 h-3" />
                        {pkg.badge || (i === 0 ? "Best Value" : "Family Fun")}
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
                      className="px-7 py-5 flex items-center justify-between"
                      style={{ backgroundColor: t.stub }}
                    >
                      <div>
                        <p className="text-xs uppercase tracking-widest font-black mb-1" style={{ color: t.accent }}>
                          Admission Price
                        </p>
                        <div className="flex items-baseline gap-1">
                          <span className="text-2xl font-black" style={{ color: t.text, opacity: 0.7 }}>₹</span>
                          <span className="text-5xl md:text-6xl font-black leading-none" style={{ color: t.accent }}>
                            {pkg.price || pkg.amount}
                          </span>
                          <span className="text-sm ml-1 font-semibold" style={{ color: t.text, opacity: 0.6 }}>/ person</span>
                        </div>
                      </div>

                      {/* Circular hole decoration */}
                      <div
                        className="w-16 h-16 rounded-full border-4 flex items-center justify-center"
                        style={{ borderColor: t.accent, borderStyle: "dashed" }}
                      >
                        <Ticket className="w-6 h-6" style={{ color: t.accent }} />
                      </div>
                    </div>

                    {/* Zig-zag (flipped) */}
                    <div style={{ transform: "scaleY(-1)", height: "16px" }}>
                      <ZigZag color={t.stub} />
                    </div>

                    {/* Features */}
                    <div className="px-7 pt-4 pb-5">
                      {pkg.description && (
                        <p className="text-sm mb-4 leading-relaxed" style={{ color: t.text, opacity: 0.7 }}>
                          {pkg.description}
                        </p>
                      )}
                      <div className="space-y-2.5">
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

                  {/* Decorative corner stars */}
                  <div className="absolute -top-3 -right-3 text-2xl pointer-events-none">⭐</div>
                  <div className="absolute -bottom-2 -left-2 text-xl pointer-events-none">🎪</div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 bg-white rounded-[24px] border-2 border-dashed border-[#E5DCCB] max-w-5xl mx-auto">
            <p className="text-[#B9BEC1] uppercase tracking-widest text-xs">No packages found</p>
          </div>
        )}

        {/* Footer link */}
        <div className="mt-14 text-center">
          <Link
            href="/packages"
            className="inline-flex items-center gap-2 text-[#142127]/50 hover:text-[#FD2B12] transition-colors text-sm uppercase tracking-widest group font-black"
          >
            🎡 View All Packages
            <Ticket className="w-4 h-4 transition-transform group-hover:rotate-12" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PackagesPreview;
