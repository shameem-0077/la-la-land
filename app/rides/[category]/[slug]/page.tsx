import { supabase } from "@/lib/supabase";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CTA from "@/components/sections/CTA";
import RideDetailClient from "./RideDetailClient";
import { notFound } from "next/navigation";

async function getRideData(slug: string) {
  const { data: ride, error } = await supabase
    .from('Ride')
    .select('*, RideCategory(name)')
    .eq('slug', slug)
    .single();

  if (error || !ride) return null;

  const [features, images] = await Promise.all([
    supabase.from('RideFeature').select('*').eq('ride_id', ride.id),
    supabase.from('RideImage').select('*').eq('ride_id', ride.id)
  ]);

  return {
    title: ride.title,
    category: ride.RideCategory?.name || "Attraction",
    tagline: ride.sub_title || "Experience the magic of La La Park",
    details: ride.about_description,
    aboutTitle: ride.about_title,
    heroImage: ride.cover_image,
    specs: [
      { label: "Age Group", value: ride.age_category || "All Ages", icon: "users" },
      ...(features.data || []).map((f: any) => ({
        label: "Feature",
        value: f.name,
        icon: f.icon || "star"
      })).slice(0, 3) // Limiting to 3 features + age group for layout balance
    ],
    highlights: (features.data || []).map((f: any) => ({
      label: f.name,
      icon: f.icon || "star"
    })),
    gallery: (images.data || []).map((img: any) => ({
      title: ride.title,
      image: img.image
    }))
  };
}

export default async function RideDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const ride = await getRideData(slug);

  if (!ride) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-grow">
        <RideDetailClient ride={ride} />
      </main>
      <CTA />
      <Footer />
    </div>
  );
}

