"use client";

import React from "react";
import { 
  Wifi, HeartPulse, Baby, Church, UserCheck, 
  Car, Lock, Utensils, Building2, ShoppingBag, 
  Coffee, Calendar, Drumstick, Bath
} from "lucide-react";
import { motion } from "framer-motion";

const facilities = [
  { icon: <Wifi className="w-8 h-8" />, title: "Free Wi-Fi", desc: "Stay connected throughout the park.", color: "text-[#ff7d00]", bgColor: "bg-[#e0f2fe]" },
  { icon: <HeartPulse className="w-8 h-8" />, title: "First Aid Room", desc: "Fully equipped first aid room with trained staff.", color: "text-[#34d399]", bgColor: "bg-[#f0fdf4]" },
  { icon: <Baby className="w-8 h-8" />, title: "Infant & Mother Room", desc: "Private and comfortable space for mothers.", color: "text-[#2d31fa]", bgColor: "bg-[#fff1f2]" },
  { icon: <Church className="w-8 h-8" />, title: "Prayer Room", desc: "A calm and peaceful space for prayer.", color: "text-[#ff9800]", bgColor: "bg-[#fff7ed]" },
  { icon: <UserCheck className="w-8 h-8" />, title: "Senior Citizen Room", desc: "Quiet, comfortable area for senior guests.", color: "text-[#34d399]", bgColor: "bg-[#f0fdfa]" },
  { icon: <Car className="w-8 h-8" />, title: "Drivers' Room", desc: "Rest area for drivers to relax and unwind.", color: "text-[#6366f1]", bgColor: "bg-[#eef2ff]" },
  { icon: <Lock className="w-8 h-8" />, title: "Locker Facilities", desc: "Secure lockers to store your belongings.", color: "text-[#f97316]", bgColor: "bg-[#fff7ed]" },
  { icon: <Utensils className="w-8 h-8" />, title: "Multi-Cuisine Restaurant", desc: "Delicious cuisines, local & global flavours.", color: "text-[#eab308]", bgColor: "bg-[#fefce8]" },
  { icon: <Building2 className="w-8 h-8" />, title: "Banquet Hall", desc: "Spacious hall for events and celebrations.", color: "text-[#dc2626]", bgColor: "bg-[#fef2f2]" },
  { icon: <ShoppingBag className="w-8 h-8" />, title: "Handicraft Shop", desc: "Unique local handicrafts and souvenirs.", color: "text-[#06b6d4]", bgColor: "bg-[#ecfeff]" },
  { icon: <Coffee className="w-8 h-8" />, title: "Coffee & Ice Cream Parlours", desc: "Relax with coffee, refreshing treats.", color: "text-[#65a30d]", bgColor: "bg-[#f7fee7]" },
  { icon: <Calendar className="w-8 h-8" />, title: "Weekend Buffet Dinner", desc: "Special buffet experience every weekend.", color: "text-[#2d31fa]", bgColor: "bg-[#f5f3ff]" },
  { icon: <Drumstick className="w-8 h-8" />, title: "Broasted Chicken & Bun Special", desc: "Crispy, juicy and freshly served.", color: "text-[#ef4444]", bgColor: "bg-[#fef2f2]" },
  { icon: <Bath className="w-8 h-8" />, title: "Clean Restroom & Shower Areas", desc: "Well-maintained restrooms and shower facilities.", color: "text-[#a855f7]", bgColor: "bg-[#faf5ff]" },
];

const Facilities = () => {
  return (
    <section id="facilities" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Main Wrapper with soft background */}
        <div className="bg-[#fffcf5] rounded-[40px] p-8 md:p-16 border border-[#fef3c7]/30 shadow-sm">
          {/* Header */}
          <div className="text-center mb-16">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center justify-center gap-4 mb-4"
            >
              <span className="text-rose-300 text-2xl opacity-40">✦</span>
              <h2 className="text-4xl md:text-[54px] font-black text-[#ff7d00] leading-none">
                Facilities & Comfort
              </h2>
              <span className="text-rose-300 text-2xl opacity-40">✦</span>
            </motion.div>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-zinc-500 font-bold"
            >
              Everything you need for a perfect day out.
            </motion.p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {facilities.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-[32px] p-8 flex flex-col items-center text-center shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-white hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition-all duration-300"
              >
                <div className={`w-16 h-16 rounded-full ${item.bgColor} flex items-center justify-center mb-6 shadow-inner`}>
                  <div className={item.color}>
                    {item.icon}
                  </div>
                </div>
                <h3 className={`text-sm md:text-base font-black ${item.color} leading-tight mb-3`}>
                  {item.title}
                </h3>
                <p className="text-[11px] font-bold text-zinc-400 leading-relaxed max-w-[140px]">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Facilities;
