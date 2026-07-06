import {
  ArrowRight,
  Plane,
  Ship,
  ShieldCheck,
  Search,
  FileText,
  CheckCircle2,
} from "lucide-react";

const WORKFLOW = [
  {
    id: "01",
    title: "Strategic Sourcing",
    desc:
      "Collaborating with verified tier-1 manufacturers in global markets to secure high-purity industrial chemicals.",
  },
  {
    id: "02",
    title: "Quality Verification",
    desc:
      "Batch testing and food-grade compliance checks before movement from factory.",
  },
  {
    id: "03",
    title: "Logistics Optimization",
    desc:
      "Streamlined shipping from major global ports to Indian hubs with real-time tracking.",
  },
  {
    id: "04",
    title: "Customs Clearance",
    desc:
      "Handling complete documentation, duties, and regulatory compliance at Indian ports.",
  },
];

export default function Import() {
  return (
    <div className="pt-32 pb-24">

      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-24">

        <div className="magazine-header">
          <span>Core Trade Mode</span>
          <span>Global Market - India</span>
        </div>

        <div className="editorial-split text-brand-green-deep">

          {/* LEFT CONTENT */}
          <div className="py-12 lg:pr-24">

            <h1 className="text-4xl sm:text-5xl lg:text-8xl font-medium leading-[0.9] mb-12">
              Bridging{" "}
              <span className="text-brand-green-forest">
                Global
              </span>{" "}
              Supply Chains
            </h1>

            <p className="text-xl leading-relaxed text-brand-green-deep/80 mb-12">
              We import high-quality industrial raw materials and food-grade chemicals to support domestic manufacturing and industrial operations. Our reliable global supply network also enables us to serve international markets, ensuring consistent quality, timely delivery, and dependable supply across multiple industries.
            </p>

            {/* PRODUCT LIST */}
            <div className="space-y-5">

              {[
                "Citric Acid (Anhydrous/Monohydrate)",
                "Malic Acid",
                "Sorbic Acid",
                "Xanthan Gum",
              ].map((product) => (
                <div
                  key={product}
                  className="flex items-center gap-4 text-xs font-bold uppercase tracking-[0.2em] text-brand-green-forest"
                >
                  <CheckCircle2 className="w-4 h-4 text-brand-gold" />

                  {product}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="bg-brand-green-deep p-8 sm:p-12 lg:p-20 text-white flex flex-col justify-center">

            {/* BOX 1 */}
            <div className="mb-12">

              <Search className="w-12 h-12 text-brand-gold mb-8" />

              <h2 className="text-3xl mb-4 font-display">
                Specialized Sourcing
              </h2>

              <p className="text-sm text-brand-off-white/60 leading-relaxed">
                Our global team ensures that every batch
                matches requested specifications. We navigate
                the complexities of international sourcing so
                you don't have to.
              </p>
            </div>

            {/* BOX 2 */}
            <div>

              <Ship className="w-12 h-12 text-brand-gold mb-8" />

              <h2 className="text-3xl mb-4 font-display">
                Seamless Logistics
              </h2>

              <p className="text-sm text-brand-off-white/60 leading-relaxed">
                From factory floor to your warehouse, we manage
                the entire multi-modal logistics chain with
                focus on minimizing lead times.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WORKFLOW SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24 border-t border-brand-green-forest/10">

        <div className="magazine-header">
          <span>The Process</span>
          <span>Step-By-Step</span>
        </div>

        {/* WORKFLOW GRID */}
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8 mt-16">

          {WORKFLOW.map((step) => (
            <div
              key={step.id}
              className="relative group bg-white border border-brand-green-forest/10 p-10 min-h-[320px] transition-all duration-500 overflow-hidden"
            >

              {/* STEP BADGE */}
              <div className="relative z-10 w-16 h-16 rounded-full border border-brand-gold/30 bg-brand-green-forest flex items-center justify-center mb-10">

                <span className="text-white text-lg font-bold">
                  {step.id}
                </span>
              </div>

              {/* TITLE */}
              <h3 className="relative z-10 text-2xl font-display font-semibold mb-6 text-brand-green-deep">
                {step.title}
              </h3>

              {/* DESCRIPTION */}
              <p className="relative z-10 text-sm leading-relaxed text-brand-green-deep/70 max-w-full xl:max-w-[260px]">
                {step.desc}
              </p>

              {/* ARROW */}
              {step.id !== "04" && (
                <ArrowRight className="hidden xl:block absolute bottom-8 right-8 w-6 h-6 text-brand-gold opacity-70 group-hover:translate-x-1 transition-all duration-300" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* EXPERTISE SECTION */}
      <section className="bg-brand-beige py-24">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-3 gap-8">

          {[
            {
              icon: FileText,
              title: "Documentation Support",
              desc:
                "Full assistance with Bill of Lading, Certificate of Analysis, and Import Declarations.",
            },

            {
              icon: ShieldCheck,
              title: "Quality Assurance",
              desc:
                "Rigorous vendor audits and pre-shipment inspections for every commodity.",
            },

            {
              icon: Plane,
              title: "Compliance Management",
              desc:
                "Ensuring all imports adhere to FSSAI and Indian customs regulations.",
            },
          ].map((box, i) => (
            <div
              key={i}
              className="bg-white p-12 border border-brand-green-forest/5 transition-all duration-500"
            >

              <box.icon className="w-10 h-10 text-brand-green-forest mb-8" />

              <h3 className="text-xl font-display font-medium mb-4">
                {box.title}
              </h3>

              <p className="text-sm text-brand-green-deep/60 leading-relaxed">
                {box.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}