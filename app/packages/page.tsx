import React from "react";
import { supabase } from "@/lib/supabase";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CTA from "@/components/sections/CTA";
import PageHero from "@/components/sections/PageHero";
import PackagesContent from "./PackagesContent";
import { Clock, ShieldCheck, Star } from "lucide-react";

async function getPackagesData() {
  const { data } = await supabase
    .from('Package')
    .select('*')
    .order('created_at', { ascending: true });
  
  return (data || []).map((pkg, i) => ({
    ...pkg,
    price: pkg.amount,
    badge: pkg.tag_title || (i === 0 ? "Most Popular" : "Special"),
    features: Array.isArray(pkg.features) ? pkg.features : [],
  }));
}

const inclusions = [
  { icon: <Clock className="w-6 h-6" />, title: "Full Day Access", desc: "10:00 AM to 6:30 PM" },
  { icon: <ShieldCheck className="w-6 h-6" />, title: "Safe & Secure", desc: "Expert staff & safety gear" },
  { icon: <Star className="w-6 h-6" />, title: "Unlimited Fun", desc: "Multiple rides on all attractions" },
];

export default async function PackagesPage() {
  const packages = await getPackagesData();

  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      <PageHero 
        title={<>Fun & Packages</>}
        subtitle="Choose the perfect plan for your squad. More thrills, better value, and memories that last forever."
        bgImage="/images/packages-hero-bg.png"
        badgeText="Adventure Packages"
        primaryBtnText="Book Package"
        primaryBtnLink="/book"
        secondaryBtnText="Explore Rides"
        secondaryBtnLink="/rides"
      />

      <PackagesContent packages={packages} inclusions={inclusions} />

      <CTA />
      <Footer />
    </main>
  );
}
