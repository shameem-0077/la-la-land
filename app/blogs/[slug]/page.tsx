"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, User, ArrowLeft, Share2, Clock, Tag } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CTA from "@/components/sections/CTA";
import { useParams } from "next/navigation";

// Custom SVG Icons for Social Media (Lucide doesn't include social icons in some versions)
const Instagram = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);

const Facebook = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);

const TwitterX = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z"/><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"/></svg>
);

const blogPosts = [
  {
    id: 1,
    title: "Top 5 Thrilling Rides at La La Land Adventure Park",
    content: `
      <p>Are you ready for the ultimate adrenaline rush? La La Land is home to some of the most heart-pumping, gravity-defying rides in the region. Whether you're a seasoned thrill-seeker or just looking to step out of your comfort zone, these five attractions are guaranteed to leave you breathless.</p>
      
      <h2>1. The Sky Screamer</h2>
      <p>Our flagship roller coaster reaches speeds of up to 120km/h and features a terrifying 90-degree vertical drop. It's not for the faint of heart, but the view from the top is absolutely unbeatable before you plummet towards the earth!</p>
      
      <blockquote>"The Sky Screamer is hands down the best coaster I've ever been on. That first drop is purely magical!" - John D., Frequent Visitor</blockquote>
      
      <h2>2. Gravity Vortex</h2>
      <p>Experience 4Gs of force as you spin through multiple inversions in complete darkness. The synchronized lights and sound effects add an extra layer of intensity that makes this a crowd favorite.</p>
      
      <h2>3. The Tidal Wave</h2>
      <p>Prepare to get soaked! This giant water flume ride features a 20-meter drop into a massive splash pool. It's the perfect way to cool down while keeping the excitement levels high.</p>
      
      <h2>4. Cliffhanger Drop Tower</h2>
      <p>There's nothing quite like the feeling of free-fall. We pull you up slowly to 80 meters, hold you there for a few agonizing seconds of silence, and then release you into a pure 3-second free-fall.</p>
      
      <h2>5. The Cyclone Spinner</h2>
      <p>A unique combination of a swinging pendulum and a spinning disk. You'll never know which way is up as you swing high above the park while spinning at 30 revolutions per minute.</p>
    `,
    image: "/images/blogs/thrilling-rides.png",
    category: "Thrills",
    date: "May 15, 2026",
    author: "Aditi Sharma",
    slug: "top-5-thrilling-rides",
    readTime: "6 min read"
  },
  {
    id: 2,
    title: "Planning Your Perfect Family Day Out: A Complete Guide",
    content: `
      <p>Taking the whole family to an adventure park can be a daunting task, but with a little planning, it can be the highlight of your year. At La La Land, we've designed our park to be inclusive and fun for all ages. Here's how to make your visit seamless.</p>
      
      <h2>Start Early</h2>
      <p>The best way to beat the crowds and the heat is to arrive at least 30 minutes before the gates open. This gives you a head start on the most popular rides and allows you to find a good 'home base' in our shaded seating areas.</p>
      
      <h2>Check the Height Requirements</h2>
      <p>Nothing spoils a child's day like waiting in line only to find out they're too short. Download our app ahead of time to check height requirements for every ride and plan your route accordingly.</p>
      
      <h2>Stay Hydrated</h2>
      <p>We have water stations located throughout the park. Bring a reusable bottle and keep everyone drinking regularly. We also have designated 'Quiet Zones' if the stimulation becomes too much for younger children.</p>
    `,
    image: "/images/blogs/family-day.png",
    category: "Family",
    date: "May 10, 2026",
    author: "Rahul Verma",
    slug: "family-day-out-guide",
    readTime: "8 min read"
  },
  {
    id: 3,
    title: "The Ultimate Guide to Our Water Park: Beat the Heat!",
    content: `
      <p>When the sun is blazing, there's only one place to be: the La La Land Water Park. With over 15 world-class water attractions, we offer the perfect blend of relaxation and excitement.</p>
      
      <h2>The Lazy River</h2>
      <p>Perfect for those who just want to chill. Grab a tube and let the gentle current take you through our lush tropical landscape, under waterfalls, and through misty tunnels. It's a 400-meter journey of pure relaxation.</p>
      
      <h2>Extreme Slides</h2>
      <p>For the brave, our 'Kamikaze' and 'Black Hole' slides offer high-speed turns and sudden drops that will get your heart racing. Proper swimwear is a must, and we recommend removing any loose jewelry before you take the plunge.</p>

      <h2>Wave Pool Party</h2>
      <p>Every hour, our massive wave pool comes alive with rhythmic waves that mimic the ocean. It's the perfect spot for families to gather and enjoy the water together in a safe, supervised environment.</p>
    `,
    image: "/images/blogs/water-park.png",
    category: "Water Park",
    date: "May 05, 2026",
    author: "Sneha Kapur",
    slug: "water-park-guide",
    readTime: "5 min read"
  },
  {
    id: 4,
    title: "Safety First: Our Commitment to Your Well-being",
    content: `
      <p>At La La Land, your safety is our absolute priority. We believe that the best adventure is a safe one. Here's a look behind the scenes at how we keep our park running safely every single day.</p>
      
      <h2>Daily Inspections</h2>
      <p>Every single ride in our park undergoes a rigorous multi-point inspection every morning before the first guest arrives. Our team of certified engineers checks mechanical, electrical, and hydraulic systems to ensure everything is in perfect working order.</p>
      
      <h2>Staff Training</h2>
      <p>Our ride operators and lifeguards undergo over 100 hours of intensive training before they are allowed to manage an attraction. They are trained in emergency procedures, first aid, and guest management to ensure they can handle any situation with professionalism and care.</p>

      <h2>Global Standards</h2>
      <p>We pride ourselves on meeting and exceeding international safety standards for amusement parks. We host regular third-party audits to ensure our protocols remain world-class.</p>
    `,
    image: "/images/blogs/safety-first.png",
    category: "Safety",
    date: "April 28, 2026",
    author: "Capt. Rajesh",
    slug: "safety-first-commitment",
    readTime: "7 min read"
  },
  {
    id: 5,
    title: "Delicious Eats: A Foodie's Tour of La La Land",
    content: `
      <p>Adventure works up an appetite! We've curated a diverse range of dining options that go far beyond standard park fare. From gourmet burgers to traditional street food, there's something for every palate.</p>
      
      <h2>The Grand Food Court</h2>
      <p>Our central hub features international cuisines including Italian, Mexican, and Asian. Don't miss our signature 'Adventure Burger' – a towering masterpiece that's a favorite among our regular visitors.</p>
      
      <h2>Sweet Treats</h2>
      <p>Need a quick energy boost? Visit 'Sugar Rush' for colorful cotton candy, artisanal ice creams, and our world-famous churros. Our dessert chefs are always coming up with new, seasonal treats to surprise you.</p>

      <h2>Healthy Options</h2>
      <p>We also offer a variety of fresh salads, fruit platters, and gluten-free options. Just look for the 'Green Leaf' symbol on our menus!</p>
    `,
    image: "/images/blogs/foodie-tour.png",
    category: "Food",
    date: "April 22, 2026",
    author: "Chef Vikram",
    slug: "foodie-tour",
    readTime: "5 min read"
  },
  {
    id: 6,
    title: "Exclusive Events: Birthday Parties and Corporate Retreats",
    content: `
      <p>Looking for a venue that's truly unforgettable? La La Land offers bespoke event planning for everything from magical birthday parties to high-impact corporate retreats.</p>
      
      <h2>Birthday Bashes</h2>
      <p>Let us handle the stress! Our birthday packages include a dedicated host, themed decorations, customized meals, and priority access to select rides. Every birthday child gets a special 'King of the Park' badge!</p>
      
      <h2>Corporate Team Building</h2>
      <p>Take your team out of the office and into the adventure. We offer private meeting spaces followed by tailored team-building activities that utilize our park's unique attractions to foster collaboration and fun.</p>

      <h2>School Excursions</h2>
      <p>We provide educational tours that focus on the physics of our rides and the biology of our landscaped zones, making it the perfect 'fun-learning' day out for students of all ages.</p>
    `,
    image: "/images/blogs/exclusive-events.png",
    category: "Events",
    date: "April 15, 2026",
    author: "Priya Menon",
    slug: "exclusive-events-guide",
    readTime: "9 min read"
  }
];

const BlogDetailPage = () => {
  const params = useParams();
  const slug = params?.slug;

  const post = blogPosts.find((p) => p.slug === slug) || blogPosts[0];
  const relatedPosts = blogPosts.filter((p) => p.id !== post.id).slice(0, 3);

  return (
    <main className="min-h-screen flex flex-col bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <img 
            src={post.image} 
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-secondary/60 backdrop-blur-[2px]" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="inline-block px-6 py-2 bg-accent text-foreground font-black text-xs uppercase tracking-widest rounded-full mb-8 shadow-xl">
              {post.category}
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] mb-8 uppercase tracking-tight">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 text-white/80 font-bold uppercase tracking-widest text-[10px] md:text-xs">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                {post.date}
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-primary" />
                By {post.author}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                {post.readTime}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-20">
          <svg viewBox="0 0 1440 160" className="relative block w-full h-[60px] md:h-[120px]" preserveAspectRatio="none">
            <path 
              fill="#ffffff" 
              d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,106.7C960,117,1056,139,1152,138.7C1248,139,1344,117,1392,106.7L1440,96L1440,160L1392,160C1344,160,1248,160,1152,160C1056,160,960,160,864,160C768,160,672,160,576,160C480,160,384,160,288,160C192,160,96,160,48,160L0,160Z"
            ></path>
          </svg>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-12">
              {/* Main Content */}
              <div className="lg:w-3/4">
                <Link 
                  href="/blogs" 
                  className="inline-flex items-center gap-2 text-secondary font-black text-xs uppercase tracking-widest mb-10 hover:text-primary transition-colors group"
                >
                  <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                  Back to All Stories
                </Link>

                <div 
                  className="prose prose-xl prose-zinc max-w-none 
                    prose-headings:font-black prose-headings:text-secondary prose-headings:uppercase prose-headings:tracking-tight
                    prose-p:text-zinc-500 prose-p:font-bold prose-p:leading-relaxed
                    prose-strong:text-secondary prose-strong:font-black
                    prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-zinc-50 prose-blockquote:p-8 prose-blockquote:rounded-2xl prose-blockquote:text-secondary prose-blockquote:font-black prose-blockquote:italic"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />

                <div className="mt-16 pt-10 border-t border-zinc-100 flex flex-wrap items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <span className="text-secondary font-black text-xs uppercase tracking-widest">Share this story:</span>
                    <div className="flex gap-2">
                      <button className="w-10 h-10 rounded-full bg-zinc-50 flex items-center justify-center text-secondary hover:bg-primary hover:text-white transition-all"><Facebook /></button>
                      <button className="w-10 h-10 rounded-full bg-zinc-50 flex items-center justify-center text-secondary hover:bg-primary hover:text-white transition-all"><TwitterX /></button>
                      <button className="w-10 h-10 rounded-full bg-zinc-50 flex items-center justify-center text-secondary hover:bg-primary hover:text-white transition-all"><Instagram /></button>
                      <button className="w-10 h-10 rounded-full bg-zinc-50 flex items-center justify-center text-secondary hover:bg-primary hover:text-white transition-all"><Share2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {["Adventure", "Family Fun", "Water Park"].map((tag) => (
                      <span key={tag} className="px-4 py-2 bg-zinc-50 rounded-lg text-zinc-400 font-black text-[10px] uppercase tracking-widest">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:w-1/4">
                <div className="sticky top-32 space-y-10">
                  <div className="bg-secondary rounded-[30px] p-8 text-white">
                    <h4 className="text-xl font-black uppercase mb-4 leading-tight">Ready for your own adventure?</h4>
                    <p className="text-white/70 font-bold text-sm mb-6">Book your tickets online and save up to 20% on group bookings!</p>
                    <Link 
                      href="/packages"
                      className="block w-full py-4 bg-primary text-white text-center rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform"
                    >
                      View Packages
                    </Link>
                  </div>

                  <div>
                    <h4 className="text-sm font-black text-secondary uppercase tracking-[0.2em] mb-6 border-b border-zinc-100 pb-4">Recent Stories</h4>
                    <div className="space-y-6">
                      {relatedPosts.map((rp) => (
                        <Link key={rp.id} href={`/blogs/${rp.slug}`} className="group block">
                          <span className="text-[10px] font-black text-primary uppercase tracking-widest mb-1 block">{rp.category}</span>
                          <h5 className="text-sm font-black text-secondary leading-tight group-hover:text-primary transition-colors line-clamp-2">
                            {rp.title}
                          </h5>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts Section */}
      <section className="py-20 bg-zinc-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-secondary uppercase mb-4 tracking-tight">More Adventures</h2>
            <div className="w-20 h-2 bg-primary mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {relatedPosts.map((p, i) => (
              <motion.article
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-[40px] overflow-hidden shadow-xl border border-zinc-50 group hover:shadow-2xl transition-all duration-500"
              >
                <div className="relative h-48 overflow-hidden">
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <div className="p-8">
                  <span className="text-[10px] font-black text-primary uppercase tracking-widest mb-2 block">{p.category}</span>
                  <h3 className="text-xl font-black text-secondary mb-4 leading-tight group-hover:text-primary transition-colors line-clamp-2">
                    {p.title}
                  </h3>
                  <Link 
                    href={`/blogs/${p.slug}`}
                    className="inline-flex items-center gap-2 text-secondary font-black text-[10px] uppercase tracking-widest group/link"
                  >
                    Read More
                    <ArrowLeft className="w-4 h-4 rotate-180 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <CTA />
      <Footer />
    </main>
  );
};

export default BlogDetailPage;
