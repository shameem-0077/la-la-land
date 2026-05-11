"use client";

import React from "react";
import { Check, Ticket, Zap, Sparkles, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

const packages = [
  {
    title: "Common Package",
    price: "540",
    description: "Our most popular choice for adults and teens.",
    features: ["All Dry Rides included", "Water Park Access", " Zone Access", "Standard Timings"],
    color: "bg-secondary",
    accent: "text-primary",
    badge: "Most Popular",
    icon: <Zap className="w-6 h-6" />
  },
  {
    title: "Kids Package",
    price: "399",
    description: "Specially designed fun for our little rs.",
    features: ["Kids Zone Access", "Mini Water Slides", "Safe Play Area", "Complimentary Gift"],
    color: "bg-accent",
    accent: "text-white",
    badge: "Kids Special",
    icon: <Sparkles className="w-6 h-6" />
  }
];

interface PackagesPreviewProps {
  initialPackages?: any[];
}

const PackagesPreview = ({ initialPackages = [] }: PackagesPreviewProps) => {

  return (
    <section id="packages" className="py-12 md:py-16 bg-cream relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] -z-10" />

      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-secondary text-[10px] uppercase tracking-[0.2em] mb-4">
              Ticketing
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-secondary leading-tight">
               <span className="text-primary">Packages</span>
            </h2>
            <p className="text-lg text-secondary/60 max-w-2xl mx-auto mt-4">
              Choose the perfect plan for your group and save more with our bundled park packages.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {initialPackages.length > 0 ? (
            initialPackages.map((pkg, i) => (
              <motion.div
                key={pkg.id || pkg.title}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="group"
              >
                <div className="bg-white rounded-[40px] p-8 md:p-10 shadow-xl border-2 border-secondary transition-all duration-500 hover:border-accent hover:-translate-y-2 flex flex-col h-full group">
                  {/* Card Header */}
                  <div className="mb-8">
                    <div className="flex items-center justify-between gap-4 mb-4">
                      <span className={`inline-block px-4 py-1.5 rounded-full ${pkg.color} text-white text-[10px] uppercase tracking-widest`}>
                        {pkg.badge}
                      </span>
                      <div className="text-secondary">
                        {pkg.icon}
                      </div>
                    </div>
                    <h3 className="text-3xl font-black text-secondary leading-tight">
                      {pkg.title}
                    </h3>
                  </div>

                  {/* Pricing */}
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-2xl font-black text-secondary">₹</span>
                    <span className="text-4xl md:text-5xl font-black text-primary-dark leading-none">{pkg.price}</span>
                    <span className="text-secondary/40 text-sm ml-2">/ Person</span>
                  </div>

                  <p className="text-secondary/60 mb-8 leading-relaxed">
                    {pkg.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-4 mb-10 flex-grow">
                    {pkg.features.map((feature: string) => (
                      <div key={feature} className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-full bg-secondary/5 flex items-center justify-center text-secondary`}>
                          <Check className="w-4 h-4" />
                        </div>
                        <span className="text-sm text-secondary">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action */}
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Link
                      href="/book"
                      className={`block w-full text-center py-5 rounded-full text-xs uppercase tracking-widest transition-all ${
                        pkg.color === 'bg-accent' 
                          ? 'bg-accent hover:bg-accent/90 text-white shadow-xl shadow-accent/20' 
                          : 'bg-secondary hover:bg-secondary/90 text-white shadow-xl shadow-secondary/20'
                      }`}
                    >
                      Book This Package
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-20 bg-zinc-50 rounded-[40px] border-2 border-dashed border-zinc-100">
              <p className="text-zinc-400 uppercase tracking-widest text-[10px]">No packages found</p>
            </div>
          )}
        </div>

        <div className="mt-16 text-center">
          <Link 
            href="/packages" 
            className="inline-flex items-center gap-2 text-sm text-secondary hover:text-accent transition-colors uppercase tracking-widest group"
          >
            View All Specialized Packages
            <Ticket className="w-4 h-4 transition-transform group-hover:rotate-12" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PackagesPreview;
