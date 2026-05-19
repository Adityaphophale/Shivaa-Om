import { motion } from "motion/react";
import { Calendar, MapPin, Tag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const ACTIVITIES = [
  { id: 1, title: "Successful Shipment of ENA to West Africa", date: "May 10, 2026", type: "Shipment", location: "Mumbai Port", desc: "Successfully completed the export of 1.2 million liters of Extra Neutral Alcohol (ENA) to strategic partners across Tanzania, Kenya, Rwanda, and the Democratic Republic of Congo." },
  { id: 2, title: "Trade Delegation Visit - China Chemicals Expo", date: "April 22, 2026", type: "Exhibition", location: "Shanghai, China", desc: "Our sourcing team visited the Shanghai Chemicals Expo to strengthen ties with food-grade acid manufacturers." },
  { id: 3, title: "New Partnership for E-Rickshaw Distribution", date: "March 15, 2026", type: "Partnership", location: "Navi Mumbai", desc: "Signed a distribution agreement to expand Indian E-Rickshaw technology across key East and Central African urban centers." }
];

export default function TradeActivities() {
  return (
    <div className="pt-32 pb-24">
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="magazine-header">
           <span>Global Operations</span>
           <span>Activity Feed</span>
        </div>

        <div className="flex flex-col gap-12">
           {ACTIVITIES.map((activity, i) => (
             <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ delay: i * 0.1 }}
               key={activity.id} 
               className="grid lg:grid-cols-12 gap-8 border-b border-brand-green-forest/10 pb-12 group"
             >
                <div className="lg:col-span-3">
                   <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-green-forest/40 mb-4">
                      <Calendar className="w-3 h-3" />
                      {activity.date}
                   </div>
                   <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-gold mb-2">
                      <Tag className="w-3 h-3" />
                      {activity.type}
                   </div>
                   <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-brand-green-forest">
                      <MapPin className="w-3 h-3" />
                      {activity.location}
                   </div>
                </div>
                
                <div className="lg:col-span-6">
                   <h2 className="text-3xl font-display font-medium text-brand-green-deep mb-6 group-hover:text-brand-green-forest transition-colors">
                     {activity.title}
                   </h2>
                   <p className="text-brand-green-deep/60 leading-relaxed">
                     {activity.desc}
                   </p>
                </div>

                <div className="lg:col-span-3 flex items-center justify-end">
                   <div className="w-24 h-24 bg-brand-beige border border-brand-green-forest/5 flex items-center justify-center grayscale group-hover:grayscale-0 group-hover:bg-brand-gold group-hover:border-brand-gold transition-all duration-500">
                      <ArrowRight className="w-8 h-8 text-brand-green-forest group-hover:text-brand-green-deep" />
                   </div>
                </div>
             </motion.div>
           ))}
        </div>

        <div className="mt-20 text-center">
           <Button variant="outline" className="border-brand-green-forest text-brand-green-forest hover:bg-brand-green-forest hover:text-white px-8 h-12 rounded-none uppercase text-[10px] tracking-widest font-bold">
             Load More Activities
           </Button>
        </div>
      </section>

      {/* Subscription Call to Action */}
      <section className="bg-brand-green-forest mt-24 py-20 text-white">
         <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-3xl font-display mb-6">Stay Updated On Global Trade</h2>
            <p className="text-brand-off-white/60 mb-10 max-w-xl mx-auto text-sm leading-relaxed">
              Get monthly insights on agro commodity prices, trade regulations, and market trends directly to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
               <input 
                 type="email" 
                 placeholder="Enter Email Address" 
                 className="flex-grow bg-white/10 border border-white/20 px-6 h-12 text-sm focus:outline-none focus:border-brand-gold font-display uppercase tracking-widest text-[10px]" 
               />
               <Button className="bg-brand-gold text-brand-green-deep hover:bg-white h-12 px-8 rounded-none uppercase text-[10px] font-bold tracking-widest">
                 Subscribe
               </Button>
            </div>
         </div>
      </section>
    </div>
  );
}
