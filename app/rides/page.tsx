import { supabase } from "@/lib/supabase";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CTA from "@/components/sections/CTA";
import RidesClient from "./RidesClient";

async function getCategories() {
  const { data } = await supabase
    .from('RideCategory')
    .select('slug, name')
    .order('created_at', { ascending: true });
  
  return data || [];
}

async function getRides() {
  const { data } = await supabase
    .from('Ride')
    .select('title, age_category, cover_image, slug, RideCategory(slug)')
    .order('created_at', { ascending: false });
  
  return (data || []).map((r: any) => ({
    title: r.title,
    category: r.RideCategory?.slug,
    age: r.age_category,
    image: r.cover_image,
    slug: r.slug
  }));
}

export default async function RidesPage() {
  const [categories, rides] = await Promise.all([
    getCategories(),
    getRides()
  ]);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-grow">
        <RidesClient initialCategories={categories} initialRides={rides} />
      </main>
      <CTA />
      <Footer />
    </div>
  );
}
