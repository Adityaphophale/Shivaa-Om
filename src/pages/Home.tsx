import { motion } from "motion/react";
import { ArrowRight, Globe, Ship, Zap, FlaskConical, TrendingUp, ShieldCheck, Map, Box, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const STATS = [
  { label: "Active Markets", val: "Markets Across the Globe" },
  { label: "Business Type", val: "EXIM · Pvt. Ltd." },
  { label: "Response Time", val: "Within 24 Hours" },
  { label: "Global Partners", val: "50+ Verified" }
];

const CATEGORIES = [
  { title: "Agro Commodities", icon: Ship, items: ["White Refined Sugar (S30)", "Brown Sugar", "ZENITH MOLASSES", "Indian Spices & Masalas"] },
  { title: "Chemicals", icon: FlaskConical, items: ["ZENITH ENA (96% Alcohol)", "Globichem Citric Acid", "Globichem Malic Acid"] },
  { title: "Industrial Products", icon: Box, items: ["Shivaa Polymers (Resins)"] },
  { title: "Electric Mobility", icon: Zap, items: ["SHIVAA E-Rickshaws", "SHIVAA E-Bikes"] },
  { title: "Consumer Goods", icon: ShoppingBag, items: ["Premium Shoes & Apparel", "Travel Luggage", "Cosmetics & Perfumes"] }
];

export default function Home() {
  return (
    <div className="pt-24 overflow-hidden bg-brand-off-white">
      {/* Hero Section */}
      <section className="editorial-split bg-brand-green-forest min-h-[90vh]">
            <div className="p-8 sm:p-12 lg:p-24 flex flex-col justify-center items-start text-white relative">
            <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="z-10 w-full"
          >
            <div className="uppercase tracking-[0.4em] text-[10px] font-bold text-brand-gold mb-6 lg:mb-10 opacity-80 text-center lg:text-left">
              International Trade · Corporate Profile · India
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-9xl leading-tight lg:leading-[0.85] mb-8 font-medium tracking-tighter drop-shadow-lg text-center lg:text-left">
              Trading <br className="hidden lg:block" />
              With <span className="text-brand-gold font-bold uppercase tracking-wide">
  TRUST
</span> <br className="hidden lg:block" />
              Globally
            </h1>
            <p className="max-w-md mx-auto lg:mx-0 text-brand-off-white/70 text-sm md:text-base leading-relaxed mb-10 border-l border-brand-gold/30 pl-6 text-center lg:text-left">
              Shivaa Om Globe Trade Pvt. Ltd. facilitates the seamless flow of agro-commodities, industrial chemicals, sustainable mobility solutions, Lifestyle, Apparel & Consumer Essentials  across the world's most dynamic trade corridors.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap justify-center lg:justify-start gap-4">
              <Link to="/enquiry" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto bg-brand-gold text-brand-green-deep hover:bg-white px-10 h-16 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] rounded-none shadow-2xl transition-all">
                  Get Quote <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link to="/products" className="w-full sm:w-auto">
              
                <Button
                  variant="outline"
                  className="bg-transparent w-full sm:w-auto border-white text-brand-gold hover:bg-white hover:text-brand-green-deep px-10 h-16 text-sm sm:text-base font-bold uppercase tracking-[0.08em] sm:tracking-[0.15em] rounded-none transition-all"
                >
                  Catalog
                </Button>
              </Link>
            </div>
          </motion.div>
          
          <div className="absolute bottom-0 right-0 opacity-[0.03] pointer-events-none translate-x-1/4 translate-y-1/4 overflow-hidden max-w-full">
             <Globe className="max-w-full w-[260px] h-[260px] sm:w-[360px] sm:h-[360px] md:w-[520px] md:h-[520px] lg:w-[800px] lg:h-[800px]" />
          </div>
        </div>

        <div className="flex flex-col lg:grid lg:grid-rows-[1.2fr_0.8fr]">
          <div className="relative overflow-hidden group min-h-[400px] lg:min-h-0">
             <video
               src="/hero1.mp4"
               autoPlay
               loop
               muted
               playsInline
               className="object-cover absolute inset-0 h-full w-full group-hover:scale-110 transition-transform duration-1000"
             />
            <div className="absolute inset-0 bg-black/45 group-hover:bg-black/35 transition-colors" />

            <div className="absolute inset-0 p-8 sm:p-12 flex flex-col justify-end border-l border-white/10">
              <div className="inline-flex flex-col items-start">
                <span className="text-brand-gold text-[10px] font-bold uppercase tracking-[0.2em] whitespace-nowrap">
                  Core Connectivity
                </span>

                <div className="mt-2 mb-4 h-[2px] w-24 bg-brand-gold"></div>

                <h2 className="text-3xl sm:text-4xl text-white font-medium leading-tight uppercase font-display tracking-tight">
                  Connecting Global Markets
                </h2>
              </div>
            </div>
          </div>
          <div className="bg-brand-beige p-8 sm:p-12 border-l border-brand-green-forest/5">
             <div className="magazine-header !mb-6">
                <span>The Ledger</span>
                <span>Real-Time Stats</span>
             </div>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 sm:gap-x-12 gap-y-6">
                {STATS.map((stat, i) => (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    key={stat.label}
                    className="border-b border-brand-green-forest/10 pb-4"
                  >
                    <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-brand-green-forest/40 block mb-2">{stat.label}</span>
                    <span className="text-sm font-display font-medium text-brand-green-forest uppercase tracking-tight">{stat.val}</span>
                  </motion.div>
                ))}
             </div>
          </div>
        </div>
      </section>

      {/* Ticker */}
      <div className="ticker z-20">
        <div className="ticker-inner">
          <div className="ticker-track" aria-hidden="false">
            {[
  "IEC REGISTERED",
  "GLOBAL SOURCING",
  "IMPORT & EXPORT",
  "AGRO COMMODITIES",
  "INDUSTRIAL CHEMICALS",
  "CONSUMER GOODS"
].map((item, i) => (
              <div key={`a-${i}`} className="ticker-item">
                <ShieldCheck className="w-4 h-4 text-brand-green-deep" />
                <span className="text-[10px] sm:text-sm font-bold uppercase tracking-[0.25em] text-brand-green-deep">{item}</span>
                <span className="dot-sep text-brand-green-deep/20">×</span>
              </div>
            ))}

            {/* duplicate for continuous seamless scroll */}
            {[
              "IEC REGISTERED", "AGRO COMMODITIES", "ELECTRIC MOBILITY", "CHEMICALS", "MERCHANT TRADING", "NAVI MUMBAI HUB"
            ].map((item, i) => (
              <div key={`b-${i}`} className="ticker-item" aria-hidden="true">
                <ShieldCheck className="w-4 h-4 text-brand-green-deep" />
                <span className="text-[10px] sm:text-sm font-bold uppercase tracking-[0.25em] text-brand-green-deep">{item}</span>
                <span className="dot-sep text-brand-green-deep/20">×</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Focus Areas */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 lg:py-20">
        <div className="magazine-header">
           <span>Core Verticals</span>
           <span>Merchant Services</span>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-0 border border-brand-green-forest/10">
          {[
            { num: "01", title: "Export Logistics", desc: "Global Market Expertise, End-to-end management of Agro commodities, industrial polymers, and electric mobility solutions.", tag: "India to Global Markets", icon: Ship },
            { num: "02", title: "Global Sourcing Expertise", desc: "Sourcing food-grade chemicals and industrial raw materials with rigorous quality audits.", tag: "Global Markets to India", icon: FlaskConical },
            { num: "03", title: "Trade Advisory", desc: "Expert guidance on international trade compliance, documentation, and market-entry strategies for emerging economies.", tag: "GLOBAL REACH", icon: TrendingUp }
          ].map((service, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              key={i} 
              className="premium-card group min-h-[450px] flex flex-col justify-between"
            >
              <div>
                <div className="text-5xl font-display font-medium text-brand-green-forest/5 mb-10 group-hover:text-brand-gold transition-all duration-700">{service.num}</div>
                <div className="w-16 h-16 bg-brand-off-white flex items-center justify-center mb-8 border border-brand-green-forest/5 group-hover:bg-brand-green-forest transition-all">
                   <service.icon className="w-8 h-8 text-brand-gold group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-2xl font-display font-medium mb-4 group-hover:text-brand-green-forest transition-colors uppercase tracking-tight">{service.title}</h3>
                <p className="text-sm text-brand-green-deep/60 leading-relaxed font-light">{service.desc}</p>
              </div>
              <div className="mt-12 pt-6 border-t border-brand-green-forest/5 uppercase tracking-[0.3em] text-[10px] font-bold text-brand-green-forest/40 flex justify-between items-center group-hover:text-brand-green-forest transition-colors">
                {service.tag}
                <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Products Preview */}
      <section className="bg-brand-green-deep py-16 lg:py-20 text-white relative">
         <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col gap-6 lg:flex-row justify-between items-end mb-20 gap-8">
               <div className="lg:w-1/2">
                  <span className="text-brand-gold text-[10px] font-bold uppercase tracking-[0.4em] block mb-4">The Catalog</span>
                  <h2 className="text-3xl sm:text-4xl lg:text-7xl font-medium font-display leading-[1.1]">Featured <br /><span>Commodities</span></h2>
               </div>
               <div className="lg:w-1/3">
                  <p className="text-brand-off-white/50 text-sm leading-relaxed mb-8">
                    We maintain regular inventory of high-purity chemicals and agro products across our global distribution hubs.
                  </p>
                  <Link to="/products" className="text-xs font-bold uppercase tracking-widest text-brand-gold flex items-center gap-2 group">
                    View Full Inventory <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </Link>
               </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
               {CATEGORIES.map((cat, i) => (
                 <motion.div 
                   key={i} 
                   initial={{ opacity: 0, y: 40 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   transition={{ delay: i * 0.2 }}
                   className="bg-white/5 border border-white/10 p-10 backdrop-blur-sm group hover:bg-white hover:text-brand-green-deep transition-all duration-700"
                 >
                    <cat.icon className="w-12 h-12 text-brand-gold mb-8" />
                    <h4 className="text-2xl font-display font-medium mb-6 uppercase tracking-tight">{cat.title}</h4>
                    <ul className="space-y-4">
                       {cat.items.map(item => (
                         <li key={item} className="flex items-center gap-3 text-xs uppercase tracking-widest font-bold opacity-60">
                            <div className="w-1 h-1 bg-brand-gold rounded-full" />
                            {item}
                         </li>
                       ))}
                    </ul>
                 </motion.div>
               ))}
            </div>
         </div>
         <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-gold/5 blur-[150px] -z-10" />
      </section>

      {/* Global Reach Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 lg:py-20">
         <div className="editorial-split bg-white border border-brand-green-forest/10 p-0 overflow-hidden">
            <div className="p-12 lg:p-24 flex flex-col justify-center">
               <span className="text-brand-green-forest/40 text-[10px] font-bold uppercase tracking-[0.4em] block mb-8">Our Presence</span>
                  <h2 className="text-3xl sm:text-4xl lg:text-6xl font-medium mb-8 leading-tight">JNPT - Navi Mumbai  <br /><span className="text-brand-gold">Global Gateway</span></h2>
               <p className="text-brand-green-deep/60 text-sm leading-relaxed mb-12 max-w-md">
                 Strategically located in Navi Mumbai, we leverage India's extensive maritime infrastructure to connect with partners across the globe.
               </p>
               <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-4">

  <div className="bg-brand-beige p-6">
    <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-green-forest/40 mb-4">
      Regional Office
    </p>

    <p className="text-base font-bold text-brand-green-deep uppercase leading-relaxed">
      Navi Mumbai, India
    </p>
  </div>

  <div className="bg-brand-beige p-6">
    <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-green-forest/40 mb-4">
      Hub Focus
    </p>

    <p className="text-sm font-bold text-brand-green-deep uppercase leading-[2]">
      JNPT - Kandla - Mundra - Dar Es Salaam - Mombasa - Matadi
    </p>
  </div>

</div>
            </div>
            <div className="bg-brand-green-forest relative min-h-[600px]">
               <Map className="absolute inset-0 w-full h-full text-brand-gold/10 p-12 animate-pulse" />
               <div className="absolute inset-0 flex flex-col">
                  {/* Top - India to Global */}
                  <div className="flex-1 flex flex-col items-center justify-center text-white text-center p-8 md:p-12 border-b border-white/10">
                     <h3 className="text-2xl md:text-3xl font-display font-medium uppercase tracking-[0.2em] mb-4">INDIA → GLOBAL MARKETS</h3>
                     <div className="flex items-center gap-6 text-brand-gold">
                        <div className="w-8 h-0.5 bg-brand-gold/30"></div>
                        <Ship className="w-8 h-8" />
                        <div className="w-8 h-0.5 bg-brand-gold/30"></div>
                     </div>
                     <p className="mt-8 text-[10px] font-bold uppercase tracking-[0.4em] text-white/60">Verified Trade Routes</p>
                  </div>
                  
                  {/* Bottom - Global to India */}
                  <div className="flex-1 flex flex-col items-center justify-center text-white text-center p-8 md:p-12">
                     <h3 className="text-2xl md:text-3xl font-display font-medium uppercase tracking-[0.2em] mb-4">GLOBAL → INDIA</h3>
                     <div className="flex items-center gap-6 text-brand-gold">
                        <div className="w-8 h-0.5 bg-brand-gold/30"></div>
                        <Ship className="w-8 h-8" />
                        <div className="w-8 h-0.5 bg-brand-gold/30"></div>
                     </div>
                     <p className="mt-8 text-[10px] font-bold uppercase tracking-[0.4em] text-white/60">Strategic Sourcing & Procurement</p>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Unified CTA */}
      <section className="bg-brand-green-forest py-16 lg:py-20">
         <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-display font-medium text-brand-gold mb-8 leading-tight tracking-tight">
              Ready to Expand Your Global Business?
            </h2>
            <p className="text-brand-off-white/70 mb-12 max-w-2xl mx-auto text-sm leading-relaxed">
               Connect with our export specialists for customized sourcing solutions, international trade assistance, and competitive quotations tailored to your business needs.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
               <Link to="/enquiry">
                  <Button className="bg-brand-gold text-brand-green-deep hover:bg-white px-12 h-16 text-[10px] font-bold uppercase tracking-[0.2em] rounded-none w-full sm:w-auto">
                    Request a Quote
                  </Button>
               </Link>
               <Link to="/contact">
                  <Button variant="outline" className="bg-transparent border-white/30 text-white hover:bg-white hover:text-brand-green-deep px-12 h-16 text-[10px] font-bold uppercase tracking-[0.2em] rounded-none w-full sm:w-auto">
                    Contact Us
                  </Button>
               </Link>
            </div>
         </div>
      </section>
    </div>
  );
}
