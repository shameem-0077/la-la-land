import { supabase } from "@/lib/supabase";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/sections/PageHero";
import AboutSection from "@/components/sections/AboutSection";
import Rides from "@/components/sections/Rides";
import PackagesPreview from "@/components/sections/PackagesPreview";
import Gallery from "@/components/sections/Gallery";
import Testimonials from "@/components/sections/Testimonials";
import CTA from "@/components/sections/CTA";
import ScrollingPark from "@/components/sections/ScrollingPark";

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
    rating: t.rating,
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
        <PageHero
          title={<>Your ultimate destination for thrills, smiles &amp; celebration</>}
          subtitle="Step into a place where every moment is filled with joy, color, and adventure. Rides, splashes & laughter for every age — all in the heart of Wayanad."
          bgImage="/images/hero-bg-image-4.webp"
          badgeText="Welcome To A World Of Wonder"
          primaryBtnText="Explore Rides"
          primaryBtnLink="/rides"
          secondaryBtnText="View Packages"
          secondaryBtnLink="/packages"
        />
        <AboutSection />
        <Rides initialCategories={rides} />
        <PackagesPreview initialPackages={packages} />
        <Gallery initialItems={galleryItems} />
        <Testimonials initialItems={testimonials} />
        {/* <ScrollingPark /> */}
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
