import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, ArrowRight, ExternalLink, Box, ZoomIn, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { PRODUCTS } from "@/lib/content";

const CATEGORIES = ["All", "Agro Commodities", "Electric Mobility", "Industrial Products", "Chemicals"];

export default function Products() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch('/api/products?activeOnly=true');
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        if (mounted) {
          if (data && data.length > 0) {
            setProducts(data);
          } else {
            // Fallback to static content if DB is empty
            setProducts(PRODUCTS.map(p => ({
              ...p,
              description: p.desc,
              slug: p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
            })));
          }
          setLoading(false);
        }
      } catch (err) {
        console.error(err);
        if (mounted) {
          setProducts(PRODUCTS.map(p => ({ ...p, description: p.desc, slug: p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') })));
          setLoading(false);
        }
      }
    })();
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedImage(null);
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [selectedImage]);

  const filteredProducts = products.filter(p => {
    const matchesCategory = activeCategory === "All" || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-20 pb-24 min-h-screen bg-brand-off-white">
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
         <div className="mb-20">
         <div className="magazine-header !mb-6">
           <span>Product Catalog</span>
         </div>
          <h1 className="text-4xl sm:text-5xl lg:text-8xl font-display font-medium text-brand-green-forest tracking-tighter leading-tight mb-8">
            Trade <span className="text-brand-gold">Inventory</span>
          </h1>
          <p className="text-brand-green-deep/60 max-w-xl text-sm leading-relaxed border-l-2 border-brand-gold pl-6 uppercase tracking-widest font-bold">
            Verified Agro Commodities, Industrial Chemicals, and Sustainable Mobility Solutions.
          </p>
        </div>

        <div className="flex flex-col gap-6 lg:flex-row justify-between items-start lg:items-center mb-16">
           <div className="flex flex-wrap gap-2">
             {CATEGORIES.map(cat => (
               <button
                 key={cat}
                 onClick={() => setActiveCategory(cat)}
                 className={`px-4 py-2 text-[10px] uppercase font-bold tracking-widest border transition-all duration-300 ${
                   activeCategory === cat 
                   ? "bg-brand-green-forest text-white border-brand-green-forest shadow-md" 
                   : "bg-white text-brand-green-forest/60 border-brand-green-forest/10 hover:border-brand-green-forest hover:text-brand-green-forest"
                 }`}
               >
                 {cat}
               </button>
             ))}
           </div>
           <div className="relative w-full lg:w-96 shadow-sm">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-green-forest/40" />
             <Input 
               className="pl-10 h-11 border-brand-green-forest/10 focus:border-brand-green-forest focus:ring-1 focus:ring-brand-green-forest rounded-none bg-white font-display uppercase text-[10px] tracking-widest transition-all"
               placeholder="Search Commodities..."
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
             />
           </div>
        </div>

        {loading ? (
          <div className="text-center py-24 font-display uppercase tracking-widest text-brand-green-forest/40">Loading Catalog...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             <AnimatePresence mode="popLayout">
               {filteredProducts.map((product) => (
                 <motion.div
                   layout
                   initial={{ opacity: 0, scale: 0.95 }}
                   animate={{ opacity: 1, scale: 1 }}
                   exit={{ opacity: 0, scale: 0.95 }}
                   key={product.id}
                   className="group bg-white border border-brand-green-forest/5 p-8 hover:bg-brand-beige transition-all duration-500 flex flex-col justify-between"
                 >
                   <div>
                      <div className="flex justify-between items-start mb-6">
                         <div className="w-12 h-12 bg-brand-green-forest/5 flex items-center justify-center group-hover:bg-brand-gold group-hover:rotate-[360deg] transition-all duration-700">
                            <Box className="w-6 h-6 text-brand-green-forest group-hover:text-brand-green-deep" />
                         </div>
                         <Badge className="bg-brand-green-forest/5 text-brand-green-forest/60 border-none rounded-none text-[8px] uppercase tracking-wider px-2">
                           {product.category}
                         </Badge>
                      </div>

                      {product.image && (
                        <div 
                          className="group/image relative mb-8 w-full h-56 md:h-64 overflow-hidden bg-white border border-brand-green-forest/10 flex items-center justify-center cursor-pointer rounded-sm"
                          onClick={() => setSelectedImage(product.image!)}
                        >
                          <img 
                            src={product.image} 
                            alt={product.name} 
                            className="w-full h-full object-contain p-4 group-hover/image:scale-105 transition-transform duration-700 ease-out" 
                          />
                          <div className="absolute inset-0 bg-brand-green-deep/10 opacity-0 group-hover/image:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-[1px]">
                             <div className="flex items-center gap-2 text-white bg-brand-green-deep/90 px-5 py-2.5 rounded-sm transform translate-y-4 group-hover/image:translate-y-0 transition-transform duration-500 shadow-lg">
                               <ZoomIn className="w-4 h-4" />
                               <span className="text-[10px] uppercase font-bold tracking-widest">View Full Image</span>
                             </div>
                          </div>
                        </div>
                      )}

                      <Link to={`/products/${product.slug}`}>
                        <h3 className="text-xl lg:text-2xl font-display font-medium text-brand-green-deep mb-4 group-hover:text-brand-green-forest transition-colors">
                          {product.name}
                        </h3>
                      </Link>
                      <p className="text-sm text-brand-green-deep/70 leading-relaxed mb-8 line-clamp-3">
                        {product.description}
                      </p>
                   </div>
                   
                   <div className="space-y-5">
                      <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-widest border-t border-brand-green-forest/10 pt-6">
                         <span className="text-brand-green-forest/50">Sourcing Route</span>
                         <span className="text-brand-green-forest flex items-center gap-1.5">
                           {product.route || "Global"} <ExternalLink className="w-3.5 h-3.5" />
                         </span>
                      </div>
                      <Link to="/enquiry" className="block">
                        <Button variant="outline" className="w-full border-brand-green-forest/20 text-brand-green-deep hover:bg-brand-green-forest hover:text-white hover:border-brand-green-forest rounded-none uppercase text-[10px] tracking-widest font-bold h-12 transition-all duration-300">
                           Request Quotation <ArrowRight className="ml-2 w-3.5 h-3.5" />
                        </Button>
                      </Link>
                   </div>
                 </motion.div>
               ))}
             </AnimatePresence>
          </div>
        )}

        {!loading && filteredProducts.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="py-24 text-center border border-brand-green-forest/10 bg-white"
          >
             <p className="text-brand-green-deep/50 font-display text-xl mb-4">No products found matching your criteria.</p>
             <Button variant="outline" onClick={() => {setActiveCategory("All"); setSearchQuery("");}} className="text-brand-green-forest rounded-none uppercase text-[10px] tracking-widest font-bold">
               Clear Filters
             </Button>
          </motion.div>
        )}
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-32">
         <div className="bg-brand-green-deep p-8 sm:p-12 lg:p-20 text-white text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-green-forest/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-medium mb-8">Can't Find A Specific Product?</h2>
              <p className="text-brand-off-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
                Our merchant trading desk specializes in sourcing niche industrial chemicals and agro commodities globally. Speak with our experts for specialized requirements.
              </p>
              <Link to="/contact">
                <Button className="bg-brand-gold text-brand-green-deep hover:bg-white px-10 h-14 rounded-none uppercase text-[11px] font-bold tracking-widest gap-2 transition-colors duration-300">
                  Speak To An Expert <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
         </div>
      </section>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-green-deep/95 backdrop-blur-sm p-4 sm:p-8"
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 sm:top-8 sm:right-8 z-[110] p-3 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-all duration-300"
              aria-label="Close fullscreen image"
            >
              <X className="w-6 h-6" />
            </button>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-6xl max-h-[90vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage}
                alt="Fullscreen Product Preview"
                className="max-w-full max-h-[90vh] object-contain rounded-sm shadow-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}