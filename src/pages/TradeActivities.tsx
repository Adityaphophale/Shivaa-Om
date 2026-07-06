import { useState } from "react";
import { motion } from "motion/react";
import { Calendar, MapPin, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const INITIAL_DISPLAY_COUNT = 3;

const ACTIVITIES = [
  { id: 1, title: "Successful Shipment of ENA to West Africa", date: "May 10, 2026", type: "Shipment", location: "Mumbai Port", desc: "Successfully completed the export of 1.2 million liters of Extra Neutral Alcohol (ENA) to strategic partners across Tanzania, Kenya, Rwanda, and the Democratic Republic of Congo." },
  { id: 2, title: "Trade Delegation Visit - China Chemicals Expo", date: "April 22, 2026", type: "Exhibition", location: "Shanghai, China", desc: "Our sourcing team visited the Shanghai Chemicals Expo to strengthen ties with food-grade acid manufacturers." },
  { id: 3, title: "New Partnership for E-Rickshaw Distribution", date: "March 15, 2026", type: "Partnership", location: "Navi Mumbai", desc: "Signed a distribution agreement to expand Indian E-Rickshaw technology across key East and Central African urban centers." },
  { id: 4, title: "Agro Commodity Sourcing Trip to Brazil", date: "February 28, 2026", type: "Sourcing", location: "São Paulo, Brazil", desc: "Met with key sugar and soybean suppliers in Brazil to expand our sourcing network for the Indian and African markets." },
  { id: 5, title: "Chemical Logistics Partnership with Port of Mombasa", date: "January 19, 2026", type: "Logistics", location: "Mombasa, Kenya", desc: "Finalized a strategic partnership to streamline the import and distribution of industrial chemicals through the Port of Mombasa." },
  { id: 6, title: "Launch of 'Shivaa Polymers' in West African Market", date: "December 05, 2025", type: "Product Launch", location: "Lagos, Nigeria", desc: "Successfully launched our Shivaa Polymers brand, providing high-quality polymer resins for packaging and industrial use in Nigeria and surrounding regions." }
];

export default function TradeActivities() {
  const [visibleCount, setVisibleCount] = useState(INITIAL_DISPLAY_COUNT);

  const handleLoadMore = () => {
    setVisibleCount(prevCount => prevCount + INITIAL_DISPLAY_COUNT);
  };

  return (
    <div className="pt-32 pb-24">
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="magazine-header">
           <span>Global Operations</span>
           <span>Activity Feed</span>
        </div>

        <div className="flex flex-col gap-12">
           {ACTIVITIES.slice(0, visibleCount).map((activity, i) => (
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

                {/* placeholder removed to clean up layout */}
             </motion.div>
           ))}
        </div>

        {visibleCount < ACTIVITIES.length && (
          <div className="mt-20 text-center">
            <Button 
              onClick={handleLoadMore}
              variant="outline" 
              className="border-brand-green-forest text-brand-green-forest hover:bg-brand-green-forest hover:text-white px-8 h-12 rounded-none uppercase text-[10px] tracking-widest font-bold"
              aria-label="Load more trade activities"
            >
              Load More Activities
            </Button>
          </div>
        )}
      </section>

         {/* Contact / Quote Call to Action */}
         <section className="bg-brand-green-forest mt-24 py-20 text-white">
             <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
                  <h2 className="text-3xl sm:text-4xl font-display font-bold mb-6">Ready to Expand Your Global Business?</h2>
                  <p className="text-brand-off-white/90 mb-10 max-w-xl mx-auto text-sm leading-relaxed">
                     Connect with our export specialists for customized sourcing solutions, international trade assistance, and competitive quotations.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-6 max-w-md mx-auto">
                      <Link to="/enquiry" className="w-full sm:w-auto">
                         <Button aria-label="Request a Quote" className="bg-brand-green-deep text-white hover:bg-brand-green-forest h-14 px-10 rounded-none uppercase text-sm font-bold tracking-widest w-full sm:w-auto shadow-lg">
                            Request a Quote
                         </Button>
                      </Link>

                      <Link to="/contact" className="w-full sm:w-auto">
                         <Button aria-label="Contact Us" className="bg-white text-brand-green-deep hover:bg-white/95 h-14 px-10 rounded-none uppercase text-sm font-bold tracking-widest w-full sm:w-auto border border-white/10">
                            Contact Us
                         </Button>
                      </Link>
                  </div>
             </div>
         </section>
    </div>
  );
}
