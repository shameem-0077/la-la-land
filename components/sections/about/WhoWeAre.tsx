"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Ticket } from "lucide-react";
import { motion } from "framer-motion";

const WhoWeAre = () => {
  return (
    <section className="py-12 md:py-16 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16 md:gap-24">
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1"
          >
            <span className="text-secondary uppercase tracking-widest text-sm mb-4 block">
              Who We Are
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-primary leading-tight mb-8 uppercase">
              Wayanad's Ultimate <br />
              Adventure Destination
            </h2>
            <div className="space-y-6 text-zinc-500 leading-relaxed">
              <p>
                We are Wayanad's most popular adventure & amusement park, offering over 50+ attractions for all age groups. From thrill-seekers to toddlers, we provide a complete day of joy in the heart of nature. Our park is designed to bring families together through shared experiences, laughter, and a touch of adrenaline.
              </p>
              <p>
                We operate in full compliance with all applicable government regulations and hold all required licenses and approvals. Our operations are regularly reviewed to meet safety, environmental, and quality standards. This ensures a secure, well-managed, and enjoyable experience for every visitor.
              </p>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="mt-10">
              <Link 
                href="/book" 
                className="inline-flex items-center gap-3 bg-primary hover:bg-primary-dark text-white py-4 px-10 rounded-full shadow-lg transition-all text-sm tracking-wider uppercase"
              >
                Book Tickets
                <Ticket className="w-5 h-5" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Image Cluster */}
          <div className="flex-1 relative w-full h-[400px] md:h-[600px]">
            {/* Top Image */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="absolute top-0 right-0 w-[60%] h-[55%] rounded-[30px] overflow-hidden shadow-2xl z-10"
            >
              <Image src="/about_zipline.png" alt="Adventure" fill className="object-cover" />
            </motion.div>
            
            {/* Left Image */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="absolute top-[15%] left-0 w-[55%] h-[50%] rounded-[30px] overflow-hidden shadow-2xl z-20"
            >
              <Image src="/about_kids.png" alt="Kids Fun" fill className="object-cover" />
            </motion.div>

            {/* Bottom Image */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="absolute bottom-0 right-[10%] w-[65%] h-[45%] rounded-[30px] overflow-hidden shadow-2xl z-0"
            >
              <Image src="/park_hero_image_1778049530668.png" alt="Family Park" fill className="object-cover" />
            </motion.div>

            {/* Decorative Dots */}
            <div className="absolute top-10 left-10 text-accent text-4xl opacity-40">✦</div>
            <div className="absolute bottom-20 left-20 text-secondary text-2xl opacity-40">✦</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;
