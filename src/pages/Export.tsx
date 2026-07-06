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
              Empowering <span className="text-brand-green-forest">Global markets</span> With Indian Quality
            </h1>
            <p className="text-xl leading-relaxed text-brand-green-deep/80 mb-12">
              Shivaa Om Globe Trade specializes in exporting high-demand agricultural and industrial products from India to dynamic global markets.
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
                <h3
      className="text-4xl md:text-5xl font-black uppercase tracking-[0.3em] text-white"
      style={{
        textShadow: `
          0 0 8px rgba(0,0,0,1),
          0 0 16px rgba(0,0,0,0.9),
          0 4px 24px rgba(0,0,0,1),
          2px 2px 6px rgba(0,0,0,1)
        `
      }}
    >
    Voyage Of Trust
    </h3>
              </div>
            </div>
          </div>
        </div>
      </section>

{/* Stats / Highlights */}
<section className="bg-brand-green-deep py-20 mb-24">
  <div className="max-w-7xl mx-auto px-4 sm:px-6">
    <div className="flex flex-col sm:flex-row justify-center items-center gap-16 lg:gap-32">
      {[
        { val: "100%", label: "Compliance Rate" },
        { val: "24/7", label: "Trade Support" },
      ].map((stat, i) => (
        <div key={i} className="text-center">
          <div className="text-4xl lg:text-6xl font-display font-medium text-brand-gold mb-2">
            {stat.val}
          </div>
          <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-off-white/40">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
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
                { icon: Truck, title: "Multimodal Transport", desc: "Coordinated rail and road logistics to major Indian Ports" },
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
            <div className="premium-card">
              <div className="w-16 h-16 bg-white border border-brand-green-forest/10 rounded-lg flex items-center justify-center mb-8">
                <Globe className="w-8 h-8 text-brand-green-forest" />
              </div>
              <h3 className="text-2xl font-display font-medium mb-4">Market Focus</h3>
              <p className="text-sm text-brand-green-deep/70 mb-8 leading-relaxed">
                Focused on global markets, we facilitate the supply of agro commodities, industrial chemicals, industrial raw materials, and sustainable mobility solutions worldwide.
              </p>
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
