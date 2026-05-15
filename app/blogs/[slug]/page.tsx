"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, User, ArrowLeft, Share2, Clock, Tag } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CTA from "@/components/sections/CTA";
import PageHero from "@/components/sections/PageHero";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { getOptimizedImage } from "@/lib/utils";

// Custom SVG Icons for Social Media
const Instagram = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);

const Facebook = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);

const TwitterX = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z"/><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"/></svg>
);

const BlogDetailPage = () => {
  const params = useParams();
  const slug = params?.slug;
  const [post, setPost] = useState<any>(null);
  const [relatedPosts, setRelatedPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      fetchPost();
    }
  }, [slug]);

  const fetchPost = async () => {
    setIsLoading(true);
    
    // Fetch the post by slug
    const { data, error } = await supabase
      .from("Blog")
      .select(`
        *,
        BlogCategory (
          name
        )
      `)
      .eq("slug", slug)
      .maybeSingle();

    if (data) {
      setPost({
        ...data,
        category_name: data.BlogCategory?.name || "Uncategorized"
      });

      // Fetch related posts from the same category
      const { data: related } = await supabase
        .from("Blog")
        .select(`
          *,
          BlogCategory (
            name
          )
        `)
        .eq("category_id", data.category_id)
        .neq("id", data.id)
        .limit(3);
      
      if (related) {
        setRelatedPosts(related.map(r => ({
          ...r,
          category_name: r.BlogCategory?.name || "Uncategorized"
        })));
      }
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4 text-center">
        <h2 className="text-3xl font-black text-secondary mb-4 uppercase tracking-tight">Story Not Found</h2>
        <p className="text-zinc-500 mb-8 max-w-md mx-auto">The article you're looking for doesn't exist or has been moved.</p>
        <Link href="/blogs" className="bg-primary text-white px-10 py-5 rounded-full text-xs uppercase tracking-widest font-black shadow-xl">Back to Journal</Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen flex flex-col bg-white">
      <Header />

      <PageHero 
        title={post.title}
        subtitle={post.sub_description}
        bgImage={getOptimizedImage(post.cover_image)}
        badgeText={post.category_name}
        primaryBtnText="Share Story"
        primaryBtnLink="#"
        secondaryBtnText="Back to Blog"
        secondaryBtnLink="/blogs"
      />

      {/* Content Section */}
      <section className="py-20 bg-white relative z-30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Meta Row */}
            <div className="flex flex-wrap items-center gap-8 mb-12 pb-8 border-b border-zinc-100 text-zinc-400 text-xs uppercase tracking-widest font-bold">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                {new Date(post.created_at).toLocaleDateString()}
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-primary" />
                By {post.author}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                {post.read_time || "5 min read"}
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-12">
              {/* Main Content */}
              <div className="lg:w-3/4">
                <div 
                  className="prose prose-xl prose-zinc max-w-none 
                    prose-headings:font-black prose-headings:text-secondary prose-headings:uppercase prose-headings:tracking-tight
                    prose-p:text-zinc-500 prose-p:leading-relaxed
                    prose-strong:text-secondary
                    prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-zinc-50 prose-blockquote:p-8 prose-blockquote:rounded-2xl prose-blockquote:text-secondary prose-blockquote:italic"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />

                <div className="mt-16 pt-10 border-t border-zinc-100 flex flex-wrap items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <span className="text-secondary text-xs uppercase tracking-widest font-black">Share this story:</span>
                    <div className="flex gap-2">
                      <button className="w-10 h-10 rounded-full bg-zinc-50 flex items-center justify-center text-secondary hover:bg-primary hover:text-white transition-all"><Facebook /></button>
                      <button className="w-10 h-10 rounded-full bg-zinc-50 flex items-center justify-center text-secondary hover:bg-primary hover:text-white transition-all"><TwitterX /></button>
                      <button className="w-10 h-10 rounded-full bg-zinc-50 flex items-center justify-center text-secondary hover:bg-primary hover:text-white transition-all"><Instagram /></button>
                      <button className="w-10 h-10 rounded-full bg-zinc-50 flex items-center justify-center text-secondary hover:bg-primary hover:text-white transition-all"><Share2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {post.tags?.split(',').map((tag: string) => (
                      <span key={tag} className="px-4 py-2 bg-zinc-50 rounded-lg text-zinc-400 text-[10px] uppercase tracking-widest font-bold">
                        #{tag.trim()}
                      </span>
                    ))}
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
            <h2 className="text-3xl md:text-5xl font-black text-secondary uppercase mb-4 tracking-tight">More Stories</h2>
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
                  <img src={getOptimizedImage(p.cover_image)} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <div className="p-8">
                  <span className="text-[10px] text-primary uppercase tracking-widest mb-2 block font-bold">{p.category_name}</span>
                  <h3 className="text-xl font-black text-secondary mb-4 leading-tight group-hover:text-primary transition-colors line-clamp-2 uppercase">
                    {p.title}
                  </h3>
                  <Link 
                    href={`/blogs/${p.slug}`}
                    className="inline-flex items-center gap-2 text-secondary text-[10px] uppercase tracking-widest group/link font-black"
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
