import { motion } from "framer-motion";
import { Target, Eye, ShieldCheck, Zap, Handshake, Globe2 } from "lucide-react";

export default function About() {
  return (
    <div className="pt-32 pb-24">
      {/* Editorial Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-24">
          <div className="magazine-header mb-6">
            <span className="text-xs uppercase tracking-widest text-brand-gold">The Company</span>
          </div>

          <p className="max-w-3xl text-lg text-brand-green-deep/80 mb-8">
           Connecting producers and buyers across continents with integrity, market expertise, and dependable logistics — delivering value across agro, industrial chemicals, and electric mobility sectors.
          </p>
        <div className="editorial-split">
          <div className="py-12 lg:pr-24">
            <h1 className="text-4xl sm:text-5xl lg:text-8xl font-medium leading-[0.9] mb-12">
              Driven By <span className="text-brand-green-forest">Integrity</span>, <br />
              Powered By <span className="text-brand-gold font-display">Global Reach</span>
            </h1>
          </div>
          <div className="py-12 flex flex-col justify-center">
            <p className="text-xl text-brand-green-deep/80 leading-relaxed mb-8">
              Shivaa Om Globe Trade Private Limited is a dynamic international trading and export-import company engaged in the global supply of agricultural commodities, industrial chemicals, polymers, and electric mobility products.
            </p>
            <p className="text-sm text-brand-green-deep/60 leading-relaxed">
              With a strategic focus on cross-border trade between India, Africa, and China, the company delivers reliable sourcing, competitive pricing, and efficient logistics solutions to customers worldwide. Our operations are built on long-term business partnerships, enabling us to create sustainable value across multiple industries.
            </p>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="bg-brand-green-deep text-white py-24 mb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-24">
          <div>
            <div className="flex items-center gap-4 mb-8">
              <Eye className="w-8 h-8 text-brand-gold" />
              <h2 className="text-3xl uppercase tracking-widest text-brand-gold">Our Vision</h2>
            </div>
            <p className="text-2xl font-light leading-relaxed">
              "To become a globally recognized trading company delivering sustainable growth through trusted international partnerships, quality products, and efficient global trade solutions."
            </p>
          </div>
          <div>
            <div className="flex items-center gap-4 mb-8">
              <Target className="w-8 h-8 text-brand-gold" />
              <h2 className="text-3xl uppercase tracking-widest text-brand-gold">Our Mission</h2>
            </div>
            <ul className="space-y-6">
              {[
                "To provide high-quality products at competitive prices",
                "To establish strong and transparent business relationships worldwide",
                "To expand trade opportunities between India, Africa, and Asia",
                "To contribute to sustainable and innovative trade practices"
              ].map((item, i) => (
                <li key={i} className="flex gap-4 items-start group">
                  <div className="w-6 h-6 rounded-full border border-brand-gold/30 flex items-center justify-center shrink-0 mt-1 group-hover:bg-brand-gold group-hover:border-brand-gold transition-colors">
                     <div className="w-1.5 h-1.5 bg-brand-gold group-hover:bg-brand-green-deep rounded-full" />
                  </div>
                  <span className="text-lg text-brand-off-white/80">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
         <div className="magazine-header">
           <span>The Advantage</span>
           <span>Excellence in EXIM</span>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border border-brand-green-forest/10">
            {[
              { icon: ShieldCheck, title: "Quality Assured", desc: "Every product is verified and compliant before shipment, ensuring you get exactly what was promised." },
              { icon: Zap, title: "Efficient Logistics", desc: "Timely delivery is at our core. We optimize routes and handle documentation for seamless transitions." },
              { icon: Handshake, title: "Trust & Ethics", desc: "Built on transparency, our relationships with verified suppliers and buyers are designed for the long term." },
              { icon: Globe2, title: "Global Network", desc: "A trusted worldwide network enabling seamless sourcing, distribution, and trade across international markets." },
              { icon: Target, title: "Market Expertise", desc: "Deep understanding of agro commodities, industrial chemicals, and electric mobility solutions enables us to navigate markets effectively." },
              { icon: Globe2, title: "Customized Solutions", desc: "Flexible trade solutions tailored to meet specific industrial requirements and manufacturing needs." }
            ].map((feature, i) => (
              <div key={i} className="premium-card min-h-75">
                 <feature.icon className="w-10 h-10 text-brand-gold mb-8" />
                {feature.title === "Trust & Ethics" ? (
                  <h3 className="text-xl mb-4 font-display font-bold text-brand-green-forest uppercase">
                    <span className="font-bold uppercase">TRUST</span> &amp; ETHICS
                  </h3>
                ) : (
                  <h3 className="text-xl mb-4 font-display font-medium text-brand-green-forest">{feature.title}</h3>
                )}
                 <p className="text-sm text-brand-green-deep/60 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
         </div>
      </section>

      {/* Future Expansion */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-24">
         <div className="bg-brand-beige p-8 sm:p-12 lg:p-24 border border-brand-green-forest/5 flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
               <h2 className="text-4xl lg:text-5xl font-medium mb-8 text-brand-green-forest">The Road <br /><span className="font-display">Ahead</span></h2>
               <p className="text-brand-green-deep/70 mb-8 leading-relaxed">
                 As part of our long-term growth strategy, Shivaa Om Globe Trade plans to expand into additional sectors to serve our global clientele better.
               </p>
            </div>
            <div className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
               {[
                 "Petrochemicals", "Specialty Chemicals", "Advanced EVs", "Industrial Raw Materials", "Energy Commodities", "Allied Trading"
               ].map(item => (
                 <div key={item} className="bg-white p-4 border border-brand-green-forest/5 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-brand-green-forest flex items-center gap-3">
                    <div className="w-1.5 h-1.5 bg-brand-gold rounded-full shrink-0" />
                    <span className="leading-tight">{item}</span>
                 </div>
               ))}
            </div>
         </div>
      </section>
    </div>
  );
}
