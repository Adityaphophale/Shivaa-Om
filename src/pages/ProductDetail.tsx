﻿import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink } from "lucide-react";

export default function ProductDetail() {
  const { slug } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch("/api/products/" + slug);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        if (mounted) {
          setProduct(data);
          setLoading(false);
        }
      } catch (err) {
        console.error(err);
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [slug]);

  if (loading) return <div className="pt-32 pb-24 text-center font-display uppercase tracking-widest text-brand-green-forest/40">Loading Product...</div>;

  if (!product) {
    return (
      <div className="pt-32 pb-24 text-center">
        <h1 className="text-2xl font-bold mb-4 font-display text-brand-green-deep">Product Not Found</h1>
        <p className="mb-6 text-brand-green-deep/60">We could not find a product matching this slug.</p>
        <Link to="/products">
          <Button variant="outline" className="rounded-none uppercase tracking-widest text-[10px] font-bold">Back to Products</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 min-h-screen bg-brand-off-white lg:pt-32 lg:pb-24">
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <Link to="/products" className="inline-flex items-center text-xs uppercase tracking-widest font-bold text-brand-green-deep/50 hover:text-brand-green-forest mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Catalog
        </Link>
        
        <div className="grid md:grid-cols-2 gap-12 bg-white border border-brand-green-forest/5 p-8 lg:p-12 shadow-sm">
           <div className="flex items-center justify-center bg-brand-beige border border-brand-green-forest/10 rounded-sm p-4 min-h-[300px]">
              {product.image ? (
                <img src={product.image} alt={product.name} className="w-full max-h-[400px] object-contain" />
              ) : (
                <div className="text-brand-green-deep/30 font-display uppercase tracking-widest text-sm">No Image Available</div>
              )}
           </div>
           
           <div className="flex flex-col justify-center">
              <div className="uppercase tracking-[0.2em] text-[10px] font-bold text-brand-gold mb-4 border-b border-brand-green-forest/10 pb-4">
                {product.category}
              </div>
              <h1 className="text-4xl lg:text-5xl font-display font-medium text-brand-green-deep mb-6 leading-tight">{product.name}</h1>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 bg-brand-beige/30 p-6 border border-brand-green-forest/5">
                 <div>
                    <span className="block text-[9px] uppercase tracking-widest font-bold text-brand-green-deep/50 mb-1">Origin</span>
                    <span className="text-sm font-semibold text-brand-green-deep">{product.origin || "Global"}</span>
                 </div>
                 <div>
                    <span className="block text-[9px] uppercase tracking-widest font-bold text-brand-green-deep/50 mb-1">Route</span>
                    <span className="text-sm font-semibold text-brand-green-deep flex items-center gap-1">{product.route || "Global Logistics"} <ExternalLink className="w-3 h-3 text-brand-gold"/></span>
                 </div>
              </div>

              <div className="mb-10">
                <span className="block text-[10px] uppercase tracking-widest font-bold text-brand-green-forest mb-3">Commodity Description</span>
                <p className="text-brand-green-deep/70 leading-relaxed text-sm whitespace-pre-wrap">{product.description}</p>
              </div>

              <div className="flex gap-4 mt-auto">
                <Link to="/enquiry" className="flex-1">
                   <Button className="w-full h-14 bg-brand-green-forest hover:bg-brand-green-deep text-white rounded-none uppercase text-[11px] tracking-widest font-bold transition-all">
                     Request Quotation
                   </Button>
                </Link>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
}
