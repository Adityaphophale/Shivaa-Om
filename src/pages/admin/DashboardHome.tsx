import { motion } from "motion/react";
import { TrendingUp, Users, MessageSquare, Package, ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function DashboardHome() {
  const STATS = [
    { label: "Total Inquiries", val: "128", icon: MessageSquare, change: "+12%", up: true },
    { label: "Active Products", val: "14", icon: Package, change: "Stable", up: true },
    { label: "Market Reach", val: "8 Countries", icon: TrendingUp, change: "+2", up: true },
    { label: "Lead Conversion", val: "42%", icon: Users, change: "-3%", up: false },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {STATS.map((stat, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={stat.label} 
            className="bg-white p-6 border border-brand-green-forest/5 shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex justify-between items-start mb-4">
               <div className="w-12 h-12 bg-brand-green-forest/5 flex items-center justify-center rounded-lg">
                  <stat.icon className="w-6 h-6 text-brand-green-forest" />
               </div>
               <div className={`flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded ${stat.up ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                  {stat.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {stat.change}
               </div>
            </div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-green-deep/40 mb-1">{stat.label}</p>
            <h3 className="text-3xl font-display font-medium text-brand-green-deep">{stat.val}</h3>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 bg-white p-8 border border-brand-green-forest/5 shadow-sm">
            <h3 className="text-lg font-display font-medium text-brand-green-forest uppercase tracking-widest mb-8 border-b border-brand-green-forest/5 pb-4">Recent Trade Traffic</h3>
            <div className="h-64 flex items-center justify-center bg-brand-beige/30 border border-dashed border-brand-green-forest/20 rounded-xl">
               <p className="text-xs uppercase tracking-widest text-brand-green-deep/40 font-bold">Analytics Engine Offline in Preview</p>
            </div>
         </div>
         <div className="bg-white p-8 border border-brand-green-forest/5 shadow-sm">
            <h3 className="text-lg font-display font-medium text-brand-green-forest uppercase tracking-widest mb-8 border-b border-brand-green-forest/5 pb-4">Urgent Ledgers</h3>
            <div className="space-y-6">
               {[
                 { name: "ENA Supply Africa", time: "2h ago", status: "Priority" },
                 { name: "Citric Acid Lot #42", time: "5h ago", status: "Processing" },
                 { name: "E-Bikes Kenya Order", time: "Yesterday", status: "Shipped" }
               ].map((item, i) => (
                 <div key={i} className="flex items-center justify-between group">
                    <div>
                       <p className="text-sm font-semibold text-brand-green-deep">{item.name}</p>
                       <p className="text-[10px] uppercase font-bold text-brand-green-deep/30">{item.time}</p>
                    </div>
                    <span className="text-[9px] font-bold uppercase tracking-widest px-2 py-1 bg-brand-beige border border-brand-green-forest/10 group-hover:bg-brand-gold group-hover:text-brand-green-deep transition-all">
                       {item.status}
                    </span>
                 </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
}
