"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Heart, Leaf, Trophy } from "lucide-react";
import { motion } from "framer-motion";

const pillars = [
  { icon: <ShieldCheck className="w-5 h-5" />, title: "Safety First",    desc: "ISO-certified protocols across every ride.",         bg: "bg-[#FD2B12]" },
  { icon: <Heart className="w-5 h-5" />,        title: "Family Heart",   desc: "Dedicated zones for every age group.",               bg: "bg-[#005EFE]" },
  { icon: <Leaf className="w-5 h-5" />,         title: "Eco-Friendly",   desc: "Surrounded by Wayanad's lush green nature.",         bg: "bg-[#76A700]" },
  { icon: <Trophy className="w-5 h-5" />,       title: "#1 in Wayanad",  desc: "Rated the best park experience in Kerala.",          bg: "bg-[#FFBB00]" },
];

const AboutSection = () => {
  return (
    <section id="about-preview" className="py-12 md:py-16 bg-[#FFF6E7] overflow-hidden">
      <div className="container mx-auto px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 xl:gap-24">

          {/* ── Left: Imagery Mosaic ── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex-1 relative w-full"
          >
            <div className="relative w-full h-[420px] sm:h-[480px] md:h-[600px] lg:h-[550px]">

              {/* Top-left: large image */}
              <div className="absolute top-0 left-0 w-[60%] sm:w-[55%] rounded-[24px] md:rounded-[28px] overflow-hidden shadow-xl border-4 border-[#E5DCCB] aspect-[4/5] z-10">
                <Image
                  src="/images/about-us-section.png"
                  alt="La La Park Experience"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Top-right: small blob-shaped image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.25 }}
                className="absolute top-4 right-0 w-[45%] sm:w-[40%] aspect-square overflow-hidden shadow-xl border-4 border-[#E5DCCB]"
                style={{
                  borderRadius: "50% 30% 50% 30% / 30% 50% 30% 50%",
                }}
              >
                <Image
                  src="/images/rides-page-hero.png"
                  alt="La La Park Rides"
                  fill
                  className="object-cover"
                />
              </motion.div>

              {/* Bottom-right: large overlapping image */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.35 }}
                className="absolute bottom-4 right-0 w-[65%] sm:w-[62%] aspect-[4/3] rounded-[24px] md:rounded-[28px] overflow-hidden shadow-2xl border-4 border-white z-20"
              >
                <Image
                  src="/images/hero-bg-image-4.webp"
                  alt="La La Park Adventures"
                  fill
                  className="object-cover"
                />
              </motion.div>

              {/* Ambient blobs */}
              <div className="absolute -top-6 -left-6 w-32 h-32 md:w-48 md:h-48 bg-[#FFBB00]/20 rounded-full blur-[60px] md:blur-[80px] pointer-events-none" />
              <div className="absolute -bottom-4 -right-4 w-32 h-32 md:w-40 md:h-40 bg-[#005EFE]/15 rounded-full blur-[50px] md:blur-[70px] pointer-events-none" />
            </div>
          </motion.div>

          {/* ── Right: Content ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex-1 text-center lg:text-left"
          >
            <span className="inline-block px-5 py-2 rounded-full bg-[#005EFE]/10 text-[#005EFE] text-[10px] uppercase tracking-[0.22em] mb-5 font-bold border border-[#005EFE]/20">
              Where Fun Meets Nature
            </span>

            <h2 className="text-4xl md:text-5xl lg:text-[60px] font-black text-[#142127] leading-[1.0] tracking-tighter mb-7">
              Discover the Heart <br className="hidden md:block" />
              of{" "}
              <span className="bg-clip-text">
                La La Park
              </span>
            </h2>

            <p className="text-base md:text-lg text-[#142127]/60 leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0">
              La La Park is more than just a park. It&apos;s a sanctuary of joy where thrilling rides, lush
              landscapes, and family moments come together in Wayanad&apos;s most beautiful setting.
            </p>

            {/* Pillars */}
            <div className="grid grid-cols-2 gap-3 md:gap-4 mb-10 text-left max-w-xl mx-auto lg:mx-0">
              {pillars.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-3 p-4 rounded-2xl bg-white border border-[#E5DCCB] hover:border-[#B9BEC1] transition-colors shadow-sm"
                >
                  <div className={`w-9 h-9 rounded-xl ${p.bg} flex items-center justify-center ${p.bg === 'bg-[#FFBB00]' ? 'text-[#142127]' : 'text-white'} shrink-0 mt-0.5`}>
                    {p.icon}
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-[#142127] uppercase tracking-wider mb-0.5">{p.title}</h4>
                    <p className="text-[10px] md:text-xs text-[#B9BEC1] leading-snug">{p.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <Link
              href="/about"
              className="inline-flex items-center gap-3 px-9 py-4 bg-[#142127] text-white rounded-full text-xs uppercase tracking-widest font-black hover:bg-[#FD2B12] transition-all duration-300 shadow-xl group"
            >
              Learn Our Full Story
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;
