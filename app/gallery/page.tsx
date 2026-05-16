import { supabase } from "@/lib/supabase";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Gallery from "@/components/sections/Gallery";
import PageHero from "@/components/sections/PageHero";
import CTA from "@/components/sections/CTA";

async function getGalleryData() {
  const { data } = await supabase
    .from('Gallery')
    .select('*')
    .order('created_at', { ascending: false });
  
  return (data || []).map((item, i) => ({
    ...item,
    size: (i % 5 === 0) ? 'lg' : 'sm'
  }));
}

export default async function GalleryPage() {
  const galleryItems = await getGalleryData();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <PageHero
          title={<>The Captured Magic of <br className="hidden md:block" /> <span className="text-[#005EFE]">La La Park</span></>}
          subtitle="Explore our visual journey through laughter, thrills, and unforgettable family moments in the heart of Wayanad's nature."
          bgImage="/images/rides-page-hero.png" // Using an existing image or fallback
          badgeText="Our Photo Gallery"
          primaryBtnText="Book Your Visit"
          primaryBtnLink="/book"
        />
        
        <div className="bg-[#FFF6E7]">
          <Gallery initialItems={galleryItems} />
        </div>

        <CTA />
      </main>
      <Footer />
    </div>
  );
}
