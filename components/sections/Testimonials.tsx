"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    name: "Preetha Sidharth",
    role: "Visitor",
    text: "An excellent choice for kids and adults to spend a day in nature and for playing. Staff were very friendly and helpful. The food in the restaurant was top quality as well as the service. God sure was in a good mood when he made this Adventures theme park.",
    avatar: "https://i.pravatar.cc/150?u=preetha",
  },
  {
    name: "Jimish Bathia",
    role: "Visitor",
    text: "Nice place for the kids. We entered the park for 1 hour but ended up spending 5 hours. Kids loved all the adventures and the staff is super polite and helpful. Nice customized food prepared thanks to the park manager Mr. Sajid. Definitely a must stop place if you go with kids.",
    avatar: "https://i.pravatar.cc/150?u=jimish",
  },
  {
    name: "Rahul Verma",
    role: "Visitor",
    text: "The giant swing and the tower activities are a must try! The safety measures are top-notch which gave us peace of mind while enjoying the thrills. Great value for money and a perfect weekend getaway for groups.",
    avatar: "https://i.pravatar.cc/150?u=rahul",
  },
  {
    name: "Ananya Nair",
    role: "Visitor",
    text: "Loved the clean facilities and the infant room was so helpful for my baby. It's rare to find such well-maintained parks. The rope course was challenging but fun. We will definitely be coming back next month!",
    avatar: "https://i.pravatar.cc/150?u=ananya",
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-play
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1 >= testimonials.length ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <section id="testimonials" className="py-12 md:py-16 relative overflow-hidden bg-gradient-to-br from-secondary via-secondary to-purple-800">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#ff7d00]/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/4" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-4 md:mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white text-[10px] uppercase tracking-[0.2em] mb-4 border border-white/10">
                <Star className="w-3 h-3 fill-[#adff00] text-[#adff00]" />
                Real Stories
              </span>
              <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
                What Our <span className="text-primary">Visitors</span> Say
              </h2>
            </motion.div>
          </div>

          {/* Main Review Display */}
          <div className="relative min-h-[300px] flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.98, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.02, y: -10 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full"
              >
                <div className="relative bg-white/[0.02] backdrop-blur-md border border-white/10 rounded-[40px] md:rounded-[50px] p-6 md:p-14 overflow-hidden group">
                  {/* Big Quote Mark Icon */}
                  <Quote className="absolute -top-6 -left-6 w-32 h-32 text-white/5 -rotate-12" />
                  
                  <div className="relative z-10 flex flex-col items-center text-center">
                    {/* Stars */}
                    <div className="flex gap-1 mb-6">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-[#adff00] text-[#adff00]" />
                      ))}
                    </div>

                    <p className="text-xl md:text-2xl text-white leading-tight md:leading-snug mb-10 italic">
                      "{testimonials[currentIndex].text}"
                    </p>

                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/10 mb-4 shadow-xl">
                        <img 
                          src={testimonials[currentIndex].avatar} 
                          alt={testimonials[currentIndex].name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h4 className="text-lg font-black text-white mb-0.5 uppercase tracking-wider">
                        {testimonials[currentIndex].name}
                      </h4>
                      <span className="text-[10px] text-[#adff00] uppercase tracking-widest opacity-80">
                        {testimonials[currentIndex].role}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Controls */}
            <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between pointer-events-none px-4 md:-px-10 lg:-mx-20">
              <button 
                onClick={() => setCurrentIndex((prev) => (prev - 1 < 0 ? testimonials.length - 1 : prev - 1))}
                className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-[#ff7d00] transition-all pointer-events-auto"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button 
                onClick={() => setCurrentIndex((prev) => (prev + 1 >= testimonials.length ? 0 : prev + 1))}
                className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-[#ff7d00] transition-all pointer-events-auto"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Progress Indicators */}
          <div className="flex justify-center items-center gap-4 mt-16">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-2 rounded-full transition-all duration-500 ${
                  i === currentIndex ? "bg-[#ff7d00] w-12" : "bg-white/20 w-4 hover:bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
