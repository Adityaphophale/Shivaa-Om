﻿import { useState } from "react";
import { motion } from "motion/react";
import {
  ArrowRight,
  User,
  ChevronRight,
} from "lucide-react";

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { POSTS } from "@/lib/content";

export default function Blog() {
  const [blogs] = useState<any[]>(
    POSTS.map((b) => ({
      ...b,
      content: b.excerpt,
      publish_date: b.date,
      slug: b.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, ""),
    }))
  );

  const featuredBlog = blogs.length > 0 ? blogs[0] : null;
  const regularBlogs = blogs.length > 1 ? blogs.slice(1) : [];

  return (
    <div className="pt-32 pb-24 bg-white">
      <section className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="magazine-header mb-16">
          <span>Insights & News</span>
          <span>Merchant Ledger</span>
        </div>

        {blogs.length === 0 ? (
          <div className="text-center py-24 font-display uppercase tracking-widest text-brand-green-forest/40">No publications available at the moment.</div>
        ) : (
          <>
            {/* FEATURED BLOG */}
            {featuredBlog && (
              <div className="editorial-split mb-24 border border-brand-green-forest/10 bg-white overflow-hidden rounded-sm shadow-sm">
                {/* LEFT IMAGE */}
                <div className="relative min-h-[550px] overflow-hidden group">
                  <img
                    src={featuredBlog.featured_image || "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=2070&auto=format&fit=crop"}
                    alt={featuredBlog.title}
                    className="absolute inset-0 w-full h-full object-cover brightness-75 group-hover:scale-105 transition-all duration-1000"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  {/* Hero Content */}
                  <div className="absolute bottom-12 left-10 right-10">
                    <div className="uppercase tracking-[0.35em] text-[10px] font-bold text-brand-gold mb-5">
                      Featured Article
                    </div>
                    <h1 className="text-4xl lg:text-6xl font-black leading-tight text-white max-w-2xl">
                      {featuredBlog.title}
                    </h1>
                  </div>
                </div>

                {/* RIGHT CONTENT */}
                <div className="p-10 lg:p-20 flex flex-col justify-center bg-brand-beige">
                  <div className="uppercase tracking-[0.35em] text-[10px] font-bold text-brand-green-forest mb-6">
                    {featuredBlog.category}
                  </div>
                  <p className="text-brand-green-deep/70 mb-8 leading-relaxed text-[15px] line-clamp-6 whitespace-pre-wrap">
                    {featuredBlog.content}
                  </p>
                  
                  {/* AUTHOR */}
                  <div className="border-t border-brand-green-forest/10 pt-6">
                    <h4 className="text-lg font-bold text-brand-green-forest">
                      {featuredBlog.author}
                    </h4>
                    <p className="uppercase tracking-[0.25em] text-[10px] font-bold text-brand-green-deep/50 mt-2">
                       {new Date(featuredBlog.publish_date).toLocaleDateString()}
                    </p>
                  </div>
                  
                  <Link to={"/blog/" + featuredBlog.slug}>
                    <Button
                      variant="link"
                      className="text-brand-green-forest p-0 h-auto self-start uppercase text-[10px] tracking-[0.3em] font-bold mt-10 group"
                    >
                      Read Full Publication
                      <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            )}

            {/* BLOG GRID */}
            {regularBlogs.length > 0 && (
              <div className="grid md:grid-cols-3 gap-12 mb-24">
                {regularBlogs.map((post: any, i: number) => (
                  <motion.article
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    key={post.id}
                    className="group border border-brand-green-forest/10 p-8 hover:shadow-xl transition-all duration-500 bg-white"
                  >
                    <div className="uppercase tracking-widest text-[9px] font-bold text-brand-gold mb-6 border-b border-brand-green-forest/10 pb-3 flex justify-between">
                      <span>{post.category}</span>
                      <span>{new Date(post.publish_date).toLocaleDateString()}</span>
                    </div>
                    <Link to={"/blog/" + post.slug}>
                      <h3 className="text-2xl font-display font-medium mb-5 group-hover:text-brand-green-forest transition-colors leading-snug line-clamp-3">
                        {post.title}
                      </h3>
                    </Link>
                    <p className="text-sm text-brand-green-deep/60 leading-relaxed mb-8 line-clamp-4 whitespace-pre-wrap">
                      {post.content}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-[10px] text-brand-green-deep/40 font-bold uppercase tracking-widest">
                        <User className="w-3 h-3" />
                        {post.author}
                      </div>
                      <Link
                        to={"/blog/" + post.slug}
                        className="w-11 h-11 bg-brand-green-forest/5 flex items-center justify-center hover:bg-brand-green-forest hover:text-white transition-all rounded-full"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </motion.article>
                ))}
              </div>
            )}
          </>
        )}

        {/* CATEGORY SECTION */}
        <div className="bg-brand-green-deep p-12 text-white flex flex-col md:flex-row justify-between items-center gap-8 border-t border-brand-gold">
          <div>
            <h4 className="text-xl font-display uppercase tracking-widest text-brand-gold mb-2">
              Explore By Category
            </h4>
            <p className="text-xs text-brand-off-white/40">
              Filter insights by industry focus and trade sectors.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              "Agro Commodities",
              "Electric Mobility",
              "Chemicals",
              "Logistics",
              "Market Trends",
            ].map((cat) => (
              <button
                key={cat}
                className="px-6 py-3 border border-white/10 hover:border-brand-gold hover:text-brand-gold text-[10px] uppercase font-bold tracking-widest transition-all"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
