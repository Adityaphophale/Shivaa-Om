import { motion } from "motion/react";
import { Target, Eye, ShieldCheck, Zap, Handshake, Globe2, ChevronRight, Award } from "lucide-react";

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100 } },
  };

  return (
    <div className="pt-24 pb-16 bg-brand-off-white overflow-hidden">
      {/* Editorial Header Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-20 lg:mb-28">
        <div className="magazine-header !mb-12">
          <span className="text-xs uppercase tracking-[0.3em] text-brand-green-forest font-bold">The Company</span>
          <span className="text-xs uppercase tracking-[0.2em] text-brand-gold font-bold">Est. 2026</span>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            <span className="text-[10px] uppercase tracking-[0.35em] text-brand-gold font-black mb-4">
              ABOUT SHIVAA OM GLOBE TRADE
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-display font-medium leading-[1.05] text-brand-green-deep mb-8 tracking-tighter">
              Driven By <span className="text-brand-green-forest font-bold">Integrity</span>,<br />
              Powered By <span className="text-brand-gold font-bold">Global Reach</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-brand-green-deep/80 leading-relaxed font-light mb-6 border-l-4 border-brand-gold pl-6 py-1">
              Shivaa Om Globe Trade Private Limited facilitates the seamless movement of agro commodities, industrial chemicals, polymers, sustainable mobility solutions, lifestyle products, apparel, and consumer essentials across international markets. With a commitment to quality, reliability, and operational excellence, we provide end-to-end sourcing, procurement, and trade solutions tailored to the evolving needs of global businesses.
            </p>
            
            <p className="text-sm sm:text-base text-brand-green-deep/70 leading-relaxed mb-8">
              Driven by integrity and powered by global reach, we build lasting partnerships through transparent business practices, efficient logistics, and dependable service. Our focus on quality, compliance, and customer satisfaction enables us to create sustainable value while supporting the growth of businesses worldwide.
            </p>
          </motion.div>

          {/* Right Column: Image Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative group overflow-hidden border border-brand-green-forest/10 p-2 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500">
              <div className="overflow-hidden rounded-xl">
                <img
                  src="/global_trade_editorial.png"
                  alt="Global Trade networks"
                  className="w-full h-auto object-cover group-hover:scale-105 transition-all duration-1000"
                />
              </div>
              {/* Decorative Border Layer */}
              <div className="absolute inset-0 border-2 border-brand-gold/0 group-hover:border-brand-gold/30 rounded-2xl transition-all duration-500 pointer-events-none"></div>
            </div>
            
            {/* Absolute Decorative elements */}
            <div className="absolute -top-6 -right-6 w-20 h-20 bg-brand-gold/10 rounded-full blur-2xl pointer-events-none"></div>
            <div className="absolute -bottom-6 -left-6 w-28 h-28 bg-brand-green-forest/10 rounded-full blur-3xl pointer-events-none"></div>
          </motion.div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="bg-brand-green-deep text-white py-20 lg:py-24 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(212,160,23,0.1),transparent_50%)]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
            
            {/* Vision Card */}
            <motion.div
              initial={{ opacity: 0, y: 45 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white/5 backdrop-blur-md border border-white/10 p-8 sm:p-10 rounded-2xl shadow-xl flex flex-col justify-between hover:border-brand-gold/30 transition-all duration-500"
            >
              <div>
                <div className="w-16 h-16 rounded-2xl bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center mb-8">
                  <Eye className="w-8 h-8 text-brand-gold" />
                </div>
                <span className="text-[10px] uppercase tracking-[0.3em] text-brand-gold font-bold mb-3 block">Perspective</span>
                <h2 className="text-3xl font-display font-medium mb-6">Our Vision</h2>
                <p className="text-xl sm:text-2xl font-light leading-relaxed text-brand-off-white/90">
                  "To become a globally recognized trading company delivering sustainable growth through trusted international partnerships, quality products, and efficient global trade solutions."
                </p>
              </div>
              <div className="mt-8 border-t border-white/10 pt-6 text-brand-gold text-xs uppercase tracking-widest font-bold">
                Connecting Markets · Empowering Trade
              </div>
            </motion.div>

            {/* Mission Card */}
            <motion.div
              initial={{ opacity: 0, y: 45 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="bg-white/5 backdrop-blur-md border border-white/10 p-8 sm:p-10 rounded-2xl shadow-xl hover:border-brand-gold/30 transition-all duration-500"
            >
              <div className="w-16 h-16 rounded-2xl bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center mb-8">
                <Target className="w-8 h-8 text-brand-gold" />
              </div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-brand-gold font-bold mb-3 block">Objective</span>
              <h2 className="text-3xl font-display font-medium mb-6">Our Mission</h2>
              
              <ul className="space-y-4 sm:space-y-5">
                {[
  "To provide premium-quality products and reliable global sourcing solutions",
  "To build long-term partnerships through integrity, transparency, and trust",
  "To facilitate seamless international trade by connecting global buyers and suppliers",
  "To promote sustainable, innovative, and responsible trade practices"
].map((item, i) => (
                  <li key={i} className="flex gap-4 items-start group">
                    <div className="w-6 h-6 rounded-full border border-brand-gold/30 flex items-center justify-center shrink-0 mt-1 group-hover:bg-brand-gold group-hover:border-brand-gold transition-colors duration-300">
                       <ChevronRight className="w-3.5 h-3.5 text-brand-gold group-hover:text-brand-green-deep transition-colors duration-300" />
                    </div>
                    <span className="text-base sm:text-lg text-brand-off-white/80 group-hover:text-white transition-colors duration-300">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24 lg:py-32">
        <div className="magazine-header !mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-brand-green-forest font-bold">The Advantage</span>
          <span className="text-xs uppercase tracking-[0.2em] text-brand-gold font-bold">Excellence in EXIM</span>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {[
            { icon: ShieldCheck, title: "Quality Assured", desc: "Every product is verified and compliant before shipment, ensuring you get exactly what was promised." },
            { icon: Zap, title: "Efficient Logistics", desc: "Timely delivery is at our core. We optimize routes and handle documentation for seamless transitions." },
            { icon: Handshake, title: "Trust & Ethics", desc: "Built on transparency, our relationships with verified suppliers and buyers are designed for the long term." },
            { icon: Globe2, title: "Global Network", desc: "A trusted worldwide network enabling seamless sourcing, distribution, and trade across international markets." },
            { icon: Target, title: "Market Expertise", desc: "Deep understanding of agro commodities, industrial chemicals, and electric mobility solutions enables us to navigate markets effectively." },
            { icon: Award, title: "Customized Solutions", desc: "Flexible trade solutions tailored to meet specific industrial requirements and manufacturing needs." }
          ].map((feature, i) => (
            <motion.div
              variants={itemVariants}
              key={i}
              className="bg-white border border-brand-green-forest/10 p-8 hover:border-brand-gold/40 hover:shadow-lg transition-all duration-500 rounded-xl relative overflow-hidden group flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-lg bg-brand-beige flex items-center justify-center mb-8 group-hover:bg-brand-gold group-hover:text-white transition-all duration-500">
                  <feature.icon className="w-6 h-6 text-brand-green-forest group-hover:text-white transition-colors duration-500" />
                </div>
                
                {feature.title === "Trust & Ethics" ? (
                  <h3 className="text-xl mb-4 font-display font-bold text-brand-green-deep uppercase tracking-wide">
                    <span className="text-brand-gold font-black">TRUST</span> &amp; ETHICS
                  </h3>
                ) : (
                  <h3 className="text-xl mb-4 font-display font-medium text-brand-green-deep tracking-wide">{feature.title}</h3>
                )}
                
                <p className="text-sm text-brand-green-deep/60 leading-relaxed">{feature.desc}</p>
              </div>
              
              {/* Bottom decorative bar */}
              <div className="w-full h-1 bg-brand-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left mt-8"></div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Future Expansion Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-brand-beige p-8 sm:p-12 lg:p-20 border border-brand-green-forest/5 rounded-3xl flex flex-col lg:flex-row items-center gap-12 relative overflow-hidden"
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none"></div>

          <div className="lg:w-1/2 relative z-10">
            <span className="text-[10px] uppercase tracking-[0.3em] text-brand-gold font-black mb-4 block">GROWTH STRATEGY</span>
            <h2 className="text-4xl lg:text-5xl font-display font-medium leading-tight text-brand-green-deep mb-6">
              The Road <br /><span className="text-brand-green-forest font-bold">Ahead</span>
            </h2>
            <p className="text-brand-green-deep/70 leading-relaxed text-sm sm:text-base">
              As part of our long-term growth strategy, Shivaa Om Globe Trade plans to expand into additional sectors to serve our global partners better. We are actively establishing infrastructure and supplier networks for these high-demand industries.
            </p>
          </div>

          <div className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
            {[
              "Petrochemicals", 
              "Specialty Chemicals", 
              "Advanced EVs", 
              "Industrial Raw Materials", 
              "Energy Commodities", 
              "Allied Trading"
            ].map((item, index) => (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ scale: 1.02, y: -2 }}
                key={item}
                className="bg-white p-5 border border-brand-green-forest/5 rounded-xl shadow-sm text-xs font-bold uppercase tracking-widest text-brand-green-deep flex items-center gap-4 hover:border-brand-gold/30 hover:shadow-md transition-all duration-300 cursor-default"
              >
                <div className="w-2.5 h-2.5 bg-brand-gold rounded-full shrink-0" />
                <span className="leading-tight">{item}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
}
