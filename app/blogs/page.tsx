"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, User, ArrowRight, Search, Tag } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CTA from "@/components/sections/CTA";
import PageHero from "@/components/sections/PageHero";

const blogPosts = [
  {
    id: 1,
    title: "Top 5 Thrilling Rides at La La Land  Park",
    excerpt: "Looking for an adrenaline rush? From high-speed coasters to gravity-defying drops, here are the top 5 rides you absolutely cannot miss on your next visit.",
    image: "/images/blogs/thrilling-rides.png",
    category: "Thrills",
    date: "May 15, 2026",
    author: "Aditi Sharma",
    slug: "top-5-thrilling-rides"
  },
  {
    id: 2,
    title: "Planning Your Perfect Family Day Out: A Complete Guide",
    excerpt: "Make the most of your family trip! We've compiled the ultimate guide covering everything from what to pack to the best times for kids' shows.",
    image: "/images/blogs/family-day.png",
    category: "Family",
    date: "May 10, 2026",
    author: "Rahul Verma",
    slug: "family-day-out-guide"
  },
  {
    id: 3,
    title: "The Ultimate Guide to Our Water Park: Beat the Heat!",
    excerpt: "Dive into fun! Discover our wave pools, giant slides, and lazy rivers. Plus, tips on swimwear and safety for all age groups.",
    image: "/images/blogs/water-park.png",
    category: "Water Park",
    date: "May 05, 2026",
    author: "Sneha Kapur",
    slug: "water-park-guide"
  },
  {
    id: 4,
    title: "Safety First: Our Commitment to Your Well-being",
    excerpt: "Your safety is our top priority. Learn about our rigorous ride maintenance, staff training, and health protocols designed to keep you safe.",
    image: "/images/blogs/safety-first.png",
    category: "Safety",
    date: "April 28, 2026",
    author: "Capt. Rajesh",
    slug: "safety-first-commitment"
  },
  {
    id: 5,
    title: "Delicious Eats: A Foodie's Tour of La La Land",
    excerpt: "From gourmet burgers to traditional treats, explore the culinary delights waiting for you. We have options for every palate and dietary need.",
    image: "/images/blogs/foodie-tour.png",
    category: "Food",
    date: "April 22, 2026",
    author: "Chef Vikram",
    slug: "foodie-tour"
  },
  {
    id: 6,
    title: "Exclusive Events: Birthday Parties and Corporate Retreats",
    excerpt: "Host your next big event with us! Discover our custom packages for birthday parties, team-building retreats, and school excursions.",
    image: "/images/blogs/exclusive-events.png",
    category: "Events",
    date: "April 15, 2026",
    author: "Priya Menon",
    slug: "exclusive-events-guide"
  }
];

const BlogPage = () => {
  const [activeCategory, setActiveCategory] = React.useState("All");
  const [searchQuery, setSearchQuery] = React.useState("");

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = activeCategory === "All" || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = filteredPosts.find(p => p.id === 1) || filteredPosts[0];
  const regularPosts = filteredPosts.filter(p => p.id !== featuredPost?.id);

  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      <PageHero 
        title={<>The <br /> Journal</>}
        subtitle="Stories, tips, and updates from the heart of La La Land. Stay tuned for the latest thrills and family fun."
        bgImage="/images/hero-bg-image-4.png"
        badgeText="La La Land Blog"
        primaryBtnText="Read Latest"
        primaryBtnLink="#featured"
        secondaryBtnText="Book Tickets"
        secondaryBtnLink="/book"
      />

      {/* Blog Search & Categories */}
      <section className="bg-white py-12 relative z-30">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-[40px] shadow-xl border border-zinc-50 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 max-w-6xl mx-auto -mt-20">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Search stories..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-6 py-4 rounded-2xl bg-muted/50 border-none focus:ring-2 focus:ring-primary text-secondary placeholder:text-zinc-400"
              />
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {["All", "Thrills", "Family", "Water Park", "Events", "Food"].map((cat) => (
                <button 
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-3 rounded-xl text-[10px] uppercase tracking-widest transition-all ${
                    activeCategory === cat 
                      ? "bg-primary text-white shadow-lg" 
                      : "bg-muted text-secondary hover:bg-secondary hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          {featuredPost && (
            <motion.article
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group relative flex flex-col lg:flex-row bg-white rounded-[50px] overflow-hidden shadow-2xl border border-zinc-50 mb-20 hover:shadow-primary/5 transition-all duration-700 min-h-[500px]"
            >
              <div className="lg:w-3/5 relative overflow-hidden">
                <img 
                  src={featuredPost.image} 
                  alt={featuredPost.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute top-8 left-8">
                  <span className="px-6 py-3 bg-primary text-white text-xs uppercase tracking-widest rounded-full shadow-2xl">
                    Featured Story
                  </span>
                </div>
              </div>
              <div className="lg:w-2/5 p-10 md:p-16 flex flex-col justify-center">
                <div className="flex items-center gap-6 mb-6">
                  <div className="flex items-center gap-2 text-zinc-400 text-xs uppercase tracking-widest">
                    <Calendar className="w-4 h-4 text-primary" />
                    {featuredPost.date}
                  </div>
                  <div className="flex items-center gap-2 text-zinc-400 text-xs uppercase tracking-widest">
                    <User className="w-4 h-4 text-primary" />
                    {featuredPost.author}
                  </div>
                </div>

                <h2 className="text-3xl md:text-5xl font-black text-secondary mb-6 leading-[1.1] group-hover:text-primary transition-colors uppercase">
                  {featuredPost.title}
                </h2>
                
                <p className="text-zinc-500 mb-10 text-lg leading-relaxed">
                  {featuredPost.excerpt}
                </p>

                <div>
                  <Link 
                    href={`/blogs/${featuredPost.slug}`}
                    className="inline-flex items-center gap-4 bg-primary text-white px-10 py-5 rounded-full text-xs uppercase tracking-[0.2em] hover:bg-primary-dark transition-all shadow-xl group/btn"
                  >
                    Read Featured Story
                    <ArrowRight className="w-5 h-5 transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                </div>
              </div>
            </motion.article>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12">
            {regularPosts.map((post, i) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group flex flex-col bg-white rounded-[40px] overflow-hidden shadow-xl border border-zinc-50 hover:shadow-2xl transition-all duration-500"
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-6 left-6">
                    <span className="px-4 py-2 bg-accent text-foreground text-[10px] uppercase tracking-widest rounded-full shadow-lg">
                      {post.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-8 md:p-10 flex flex-col flex-grow">
                  <div className="flex items-center gap-6 mb-4">
                    <div className="flex items-center gap-2 text-zinc-400 text-xs uppercase tracking-wider">
                      <Calendar className="w-4 h-4 text-primary" />
                      {post.date}
                    </div>
                    <div className="flex items-center gap-2 text-zinc-400 text-xs uppercase tracking-wider">
                      <User className="w-4 h-4 text-primary" />
                      {post.author}
                    </div>
                  </div>

                  <h3 className="text-2xl font-black text-secondary mb-4 leading-tight group-hover:text-primary transition-colors line-clamp-2 uppercase">
                    {post.title}
                  </h3>
                  
                  <p className="text-zinc-500 mb-8 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>

                  <div className="mt-auto">
                    <Link 
                      href={`/blogs/${post.slug}`}
                      className="inline-flex items-center gap-3 text-secondary text-xs uppercase tracking-[0.2em] group/btn"
                    >
                      Read Full Story
                      <div className="w-10 h-10 rounded-full bg-zinc-50 flex items-center justify-center group-hover/btn:bg-primary group-hover/btn:text-white transition-all duration-300">
                        <ArrowRight className="w-5 h-5 transition-transform group-hover/btn:translate-x-1" />
                      </div>
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Pagination Placeholder */}
          <div className="mt-20 flex justify-center items-center gap-4">
            <button className="w-14 h-14 rounded-2xl bg-zinc-50 flex items-center justify-center text-secondary hover:bg-primary hover:text-white transition-all">1</button>
            <button className="w-14 h-14 rounded-2xl bg-zinc-50 flex items-center justify-center text-secondary hover:bg-primary hover:text-white transition-all">2</button>
            <button className="w-14 h-14 rounded-2xl bg-zinc-100 flex items-center justify-center text-secondary hover:bg-primary hover:text-white transition-all">3</button>
            <span className="text-zinc-300">...</span>
            <button className="w-14 h-14 rounded-2xl bg-zinc-50 flex items-center justify-center text-secondary hover:bg-primary hover:text-white transition-all">10</button>
          </div>
        </div>
      </section>

      <CTA />
      <Footer />
    </main>
  );
};

export default BlogPage;
