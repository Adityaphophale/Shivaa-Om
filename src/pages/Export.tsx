import { Ship, Globe, PackageCheck, Zap, ShieldCheck, ArrowRight, Truck } from "lucide-react";

export default function Export() {
  return (
    <div className="pt-32 pb-24">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-24">
        <div className="magazine-header">
          <span>Core Trade Mode</span>
          <span>India → Africa</span>
        </div>
        <div className="editorial-split text-brand-green-deep">
          <div className="py-12 lg:pr-24">
            <h1 className="text-4xl sm:text-5xl lg:text-8xl font-medium leading-[0.9] mb-12">
              Empowering <span className="text-brand-green-forest">Africa</span> With Indian Quality
            </h1>
            <p className="text-xl leading-relaxed text-brand-green-deep/80 mb-12">
              Shivaa Om Globe Trade specializes in exporting high-demand agricultural and industrial products from India to dynamic African markets.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {["Sugar S30 / Brown", "Extra Neutral Alcohol", "Molasses", "E-Rickshaws", "E-Bikes", "Polymers"].map(product => (
                <div key={product} className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-brand-green-forest">
                  <div className="w-1 h-1 bg-brand-gold rounded-full" />
                  {product}
                </div>
              ))}
            </div>
          </div>
          <div className="relative min-h-[400px] w-full overflow-hidden group">
  <img
    src="/industry.png"
    alt="Shipping container port"
    className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 z-0"
  />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center p-12">
                <div className="w-20 h-20 bg-brand-gold/90 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
                  <Ship className="w-10 h-10 text-brand-green-deep" />
                </div>
                <h3 className="text-2xl text-white font-display font-bold uppercase tracking-widest">Voyage Of TRUST</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats / Highlights */}
      <section className="bg-brand-green-deep py-20 mb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 md:grid-cols-4 gap-12">
          {[
            { val: "10+", label: "African Countries" },
            { val: "5000+", label: "Tons Exported" },
            { val: "100%", label: "Compliance Rate" },
            { val: "24/7", label: "Trade Support" }
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-4xl lg:text-6xl font-display font-medium text-brand-gold mb-2">{stat.val}</div>
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-off-white/40">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Logistics Excellence */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
        <div className="magazine-header">
          <span>Operational Strength</span>
          <span>Export Logistics</span>
        </div>
        <div className="grid lg:grid-cols-2 gap-24">
          <div>
            <h2 className="text-4xl font-medium mb-12 text-brand-green-forest leading-tight">
              Reliable Sourcing. <br />
              Global Distribution.
            </h2>
            <div className="space-y-12">
              {[
                { icon: ShieldCheck, title: "Pre-Shipment Inspection", desc: "Rigorous quality checks at source before cargo is port-bound." },
                { icon: Truck, title: "Multimodal Transport", desc: "Coordinated rail and road logistics to major Indian ports like JNPT and Kandla." },
                { icon: zap, title: "Swift Documentation", desc: "Ensuring all export permits, LC compliance, and shipping docs are handled with precision." }
              ].map((item, i) => (
                <div key={i} className="flex gap-6 group">
                  <div className="w-14 h-14 bg-brand-beige flex items-center justify-center shrink-0 group-hover:bg-brand-gold transition-colors">
                    {item.icon && <item.icon className="w-6 h-6 text-brand-green-forest" />}
                  </div>
                  <div>
                    <h4 className="text-lg font-display font-medium mb-2">{item.title}</h4>
                    <p className="text-sm text-brand-green-deep/60 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-8">
            <div className="premium-card bg-brand-beige border-none">
              <Globe className="w-12 h-12 text-brand-green-forest mb-8 opacity-20" />
              <h3 className="text-2xl font-display font-medium mb-4">Market Focus</h3>
              <p className="text-sm text-brand-green-deep/70 mb-8 leading-relaxed">
                Focused on Tanzania, Kenya, the Democratic Republic of Congo, and Rwanda, we facilitate the supply of agro commodities, industrial chemicals, industrial raw materials, and sustainable mobility solutions across key East and Central African markets.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Tanzania", "Kenya", "The Democratic Republic of Congo", "Rwanda"].map(c => (
                  <span key={c} className="px-3 py-1 bg-brand-green-forest text-white text-[10px] uppercase font-bold tracking-widest">{c}</span>
                ))}
              </div>
            </div>
            <div className="premium-card border-brand-gold/20">
              <PackageCheck className="w-12 h-12 text-brand-gold mb-8" />
              <h3 className="text-2xl font-display font-medium mb-4">Customized Packaging</h3>
              <p className="text-sm text-brand-green-deep/70 leading-relaxed">
                Standard and customized bulk packaging options for Sugar, ENA, and Polymers to ensure product integrity during long sea voyages.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
const zap = Zap;
