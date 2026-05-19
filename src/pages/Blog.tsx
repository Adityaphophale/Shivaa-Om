import { motion } from "motion/react";
import {
  ArrowRight,
  User,
  ChevronRight,
} from "lucide-react";

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const POSTS = [
  {
    id: 1,
    title: "International Trade Built on Trust, Quality, and Commitment",
    excerpt:
      "At Shivaa Om Globe Trade Pvt. Ltd., we believe international trade is built on trust, quality, and commitment. As a dynamic global trading company, we provide reliable import-export solutions that meet international standards. We are committed to building long-term partnerships and connecting global markets through professionalism, integrity, and reliable trade solutions.",
    category: "Corporate Profile",
    date: "May 18, 2026",
    author: "Executive Director",
  },

  {
    id: 2,
    title: "The Rising Demand for Indian E-Rickshaws in Africa",
    excerpt:
      "Exploring how electric mobility is transforming last-mile transportation across African urban centers and why Indian E-Rickshaw technology is ideally suited to support this transition. ",
    category: "Electric Mobility",
    date: "May 08, 2026",
    author: "Shivaa Om Globe Trade Team",
  },

  {
    id: 3,
    title: "Understanding Extra Neutral Alcohol (ENA) Quality Parameters",
    excerpt:
      "A deep dive into why 96% purity is critical for industrial applications and how sourcing from India ensures consistent quality.",
    category: "Agro Commodities",
    date: "April 29, 2026",
    author: "Ops Team",
  },

  {
    id: 4,
    title: "Shipping Trends: JNPT - Navi Mumbai to East and Central Africa",
    excerpt:
      "Exploring the most efficient shipping routes and how JNPT - Navi Mumbai acts as a critical Hub for International merchant trading.",
    category: "Logistics",
    date: "April 15, 2026",
    author: "Trade News",
  },
];

export default function Blog() {
  return (
    <div className="pt-32 pb-24 bg-white">
      <section className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="magazine-header mb-16">
          <span>Insights & News</span>
          <span>Merchant Ledger</span>
        </div>

        {/* FEATURED BLOG */}
        <div className="editorial-split mb-24 border border-brand-green-forest/10 bg-white overflow-hidden rounded-sm shadow-sm">

          {/* LEFT IMAGE */}
          <div className="relative min-h-[550px] overflow-hidden group">
            <img
              src="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=2070&auto=format&fit=crop"
              alt="International Trade"
              className="absolute inset-0 w-full h-full object-cover brightness-75 group-hover:scale-105 transition-all duration-1000"
              referrerPolicy="no-referrer"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

            {/* Hero Content */}
            <div className="absolute bottom-12 left-10 right-10">

              <div className="uppercase tracking-[0.35em] text-[10px] font-bold text-brand-gold mb-5">
                Featured Article
              </div>

              <h1 className="text-4xl lg:text-6xl font-black leading-tight text-white max-w-2xl">
                International Trade Built on
                <span className="block text-brand-gold mt-3">
                  TRUST & COMMITMENT
                </span>
              </h1>
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="p-10 lg:p-20 flex flex-col justify-center bg-brand-beige">

            <div className="uppercase tracking-[0.35em] text-[10px] font-bold text-brand-green-forest mb-6">
              Corporate Profile
            </div>

            <p className="text-brand-green-deep/70 mb-8 leading-relaxed text-[15px]">
              At Shivaa Om Globe Trade Pvt. Ltd., we believe international trade
              is built on trust, quality, and commitment. As a dynamic global
              trading company, we provide reliable import-export solutions that
              meet international standards.
            </p>

            <p className="text-brand-green-deep/70 mb-8 leading-relaxed text-[15px]">
              In today’s competitive market, businesses expect consistency,
              timely delivery, transparent communication, and dependable
              service. Our team works closely with suppliers, logistics
              partners, and global clients to ensure smooth and efficient trade
              operations.
            </p>

            <p className="text-brand-green-deep/70 mb-10 leading-relaxed text-[15px]">
              We are committed to building long-term partnerships and connecting
              global markets through professionalism, integrity, and reliable
              trade solutions.
            </p>

            {/* AUTHOR */}
            <div className="border-t border-brand-green-forest/10 pt-6">

              <h4 className="text-lg font-bold text-brand-green-forest">
                Executive Director 
              </h4>

              <p className="uppercase tracking-[0.25em] text-[10px] font-bold text-brand-green-deep/50 mt-2">
                 Shivaa Om Globe Trade Pvt. Ltd.
              </p>
            </div>

            {/* BUTTON */}
            <Button
              variant="link"
              className="text-brand-green-forest p-0 h-auto self-start uppercase text-[10px] tracking-[0.3em] font-bold mt-10 group"
            >
              Read Full Publication

              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>

        {/* BLOG GRID */}
        <div className="grid md:grid-cols-3 gap-12 mb-24">

          {POSTS.map((post, i) => (
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              key={post.id}
              className="group border border-brand-green-forest/10 p-8 hover:shadow-xl transition-all duration-500 bg-white"
            >

              {/* TOP */}
              <div className="uppercase tracking-widest text-[9px] font-bold text-brand-gold mb-6 border-b border-brand-green-forest/10 pb-3 flex justify-between">
                <span>{post.category}</span>
                <span>{post.date}</span>
              </div>

              {/* TITLE */}
              <h3 className="text-2xl font-display font-medium mb-5 group-hover:text-brand-green-forest transition-colors leading-snug">
                {post.title}
              </h3>

              {/* EXCERPT */}
              <p className="text-sm text-brand-green-deep/60 leading-relaxed mb-8 line-clamp-4">
                {post.excerpt}
              </p>

              {/* FOOTER */}
              <div className="flex items-center justify-between">

                <div className="flex items-center gap-2 text-[10px] text-brand-green-deep/40 font-bold uppercase tracking-widest">
                  <User className="w-3 h-3" />
                  {post.author}
                </div>

                <Link
                  to={`/blog/${post.id}`}
                  className="w-11 h-11 bg-brand-green-forest/5 flex items-center justify-center hover:bg-brand-green-forest hover:text-white transition-all rounded-full"
                >
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

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
              "Market News",
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