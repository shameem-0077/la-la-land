import { supabase } from "@/lib/supabase";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import AboutSection from "@/components/sections/AboutSection";
import Rides from "@/components/sections/Rides";
import PackagesPreview from "@/components/sections/PackagesPreview";
import Gallery from "@/components/sections/Gallery";
import Testimonials from "@/components/sections/Testimonials";
import CTA from "@/components/sections/CTA";

async function getGalleryData() {
  const { data } = await supabase
    .from('Gallery')
    .select('*')
    .order('created_at', { ascending: false });
  
  return (data || []).map((item, i) => ({
    ...item,
    size: (i % 4 === 0) ? 'lg' : 'sm'
  }));
}

async function getRidesData() {
  const { data } = await supabase
    .from('RideCategory')
    .select('*')
    .order('created_at', { ascending: true });
  return data || [];
}

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
    color: pkg.slug?.includes('kids') ? 'bg-accent' : 'bg-secondary',
  }));
}

async function getTestimonialsData() {
  const { data } = await supabase
    .from('Testimonial')
    .select('*')
    .order('created_at', { ascending: false });
  
  return (data || []).map(t => ({
    name: t.author_name,
    role: t.author_designation,
    text: t.content,
    avatar: t.author_profile || `https://ui-avatars.com/api/?name=${encodeURIComponent(t.author_name)}&background=random`,
  }));
}

export default async function Home() {
  // Fetch all data in parallel
  const [galleryItems, rides, packages, testimonials] = await Promise.all([
    getGalleryData(),
    getRidesData(),
    getPackagesData(),
    getTestimonialsData(),
  ]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Hero />
        <AboutSection />
        <Rides initialCategories={rides} />
        <PackagesPreview initialPackages={packages} />
        <Gallery initialItems={galleryItems} />
        <Testimonials initialItems={testimonials} />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
