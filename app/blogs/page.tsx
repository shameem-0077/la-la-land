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

import { supabase } from "@/lib/supabase";
import { getOptimizedImage } from "@/lib/utils";

const BlogPage = () => {
  const [activeCategory, setActiveCategory] = React.useState("All");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [categories, setCategories] = React.useState<any[]>([]);
  const [blogPosts, setBlogPosts] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      
      // Fetch Categories
      const { data: catData } = await supabase
        .from("BlogCategory")
        .select("*")
        .order("name", { ascending: true });
      
      if (catData) setCategories(catData);

      // Fetch Posts with Category Name join
      const { data: postData } = await supabase
        .from("Blog")
        .select(`
          *,
          BlogCategory (
            name
          )
        `)
        .order("created_at", { ascending: false });
      
      if (postData) {
        // Flatten the category name for easier access
        const flattenedPosts = postData.map(post => ({
          ...post,
          category_name: post.BlogCategory?.name || "Uncategorized"
        }));
        setBlogPosts(flattenedPosts);
      }
      
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = activeCategory === "All" || post.category_name === activeCategory;
    const matchesSearch = (post.title?.toLowerCase() || "").includes(searchQuery.toLowerCase()) || 
                         (post.sub_description?.toLowerCase() || "").includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = filteredPosts[0];
  const regularPosts = filteredPosts.slice(1);

  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      <PageHero 
        title={<>The Journal</>}
        subtitle="Stories, tips, and updates from the heart of La La Park. Stay tuned for the latest thrills and family fun."
        bgImage={getOptimizedImage("/images/hero-bg-image-4.webp")}
        badgeText="La La Park Blog"
        primaryBtnText="Read Latest"
        primaryBtnLink="#featured"
        // secondaryBtnText="Book Tickets"
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
              {["All", ...categories.map(c => c.name)].map((cat) => (
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
          {filteredPosts.length === 0 && !isLoading ? (
            <div className="py-20 text-center">
              <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-10 h-10 text-zinc-300" />
              </div>
              <h3 className="text-2xl font-black text-secondary uppercase tracking-tight mb-2">No Stories Found</h3>
              <p className="text-zinc-500 max-w-md mx-auto">
                We couldn't find any articles matching your current search or category filter. Try clearing your filters or searching for something else.
              </p>
              <button 
                onClick={() => { setActiveCategory("All"); setSearchQuery(""); }}
                className="mt-8 text-primary font-black uppercase tracking-widest text-xs hover:underline"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <>
              {featuredPost && (
                <motion.article
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="group relative flex flex-col lg:flex-row bg-white rounded-[50px] overflow-hidden shadow-2xl border border-zinc-50 mb-20 hover:shadow-primary/5 transition-all duration-700 min-h-[500px]"
                >
                  <div className="lg:w-3/5 relative overflow-hidden">
                    <img 
                      src={getOptimizedImage(featuredPost.cover_image)} 
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
                        {new Date(featuredPost.created_at).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-2 text-zinc-400 text-xs uppercase tracking-widest">
                        <User className="w-4 h-4 text-primary" />
                        {featuredPost.author}
                      </div>
                    </div>

                    <h2 className="text-3xl md:text-5xl font-black text-secondary mb-6 leading-[1.1] group-hover:text-primary transition-colors uppercase">
                      {featuredPost.title}
                    </h2>
                    
                    <p className="text-zinc-500 mb-10 text-lg leading-relaxed line-clamp-4">
                      {featuredPost.sub_description}
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
                        src={getOptimizedImage(post.cover_image)} 
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute top-6 left-6">
                        <span className="px-4 py-2 bg-accent text-foreground text-[10px] uppercase tracking-widest rounded-full shadow-lg">
                          {post.category_name}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-8 md:p-10 flex flex-col flex-grow">
                      <div className="flex items-center gap-6 mb-4">
                        <div className="flex items-center gap-2 text-zinc-400 text-xs uppercase tracking-wider">
                          <Calendar className="w-4 h-4 text-primary" />
                          {new Date(post.created_at).toLocaleDateString()}
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
                        {post.sub_description}
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

              {filteredPosts.length > 9 && (
                <div className="mt-20 flex justify-center items-center gap-4">
                  <button className="w-14 h-14 rounded-2xl bg-zinc-50 flex items-center justify-center text-secondary hover:bg-primary hover:text-white transition-all">1</button>
                  <button className="w-14 h-14 rounded-2xl bg-zinc-50 flex items-center justify-center text-secondary hover:bg-primary hover:text-white transition-all">2</button>
                  <button className="w-14 h-14 rounded-2xl bg-zinc-100 flex items-center justify-center text-secondary hover:bg-primary hover:text-white transition-all">3</button>
                  <span className="text-zinc-300">...</span>
                  <button className="w-14 h-14 rounded-2xl bg-zinc-50 flex items-center justify-center text-secondary hover:bg-primary hover:text-white transition-all">10</button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <CTA />
      <Footer />
    </main>
  );
};

export default BlogPage;
