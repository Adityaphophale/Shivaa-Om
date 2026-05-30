import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { MessageSquare, Mail, Phone, CheckCircle } from "lucide-react";

export default function DashboardHome() {
  const [stats, setStats] = useState({
    totalInquiries: 0,
    newInquiries: 0,
    contactedInquiries: 0,
    closedInquiries: 0,
    recentEnquiries: [] as any[]
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || '';
        const res = await fetch(`${API_URL}/api/dashboard`, { credentials: 'same-origin' });
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        if (!mounted) return;
        setStats(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const STATS = [
    { label: "Total Enquiries", val: stats.totalInquiries.toString(), icon: MessageSquare, color: "text-brand-green-deep" },
    { label: "New Enquiries", val: stats.newInquiries.toString(), icon: Mail, color: "text-brand-green-forest" },
    { label: "Contacted Enquiries", val: stats.contactedInquiries.toString(), icon: Phone, color: "text-blue-600" },
    { label: "Closed Enquiries", val: stats.closedInquiries.toString(), icon: CheckCircle, color: "text-gray-600" },
  ];

  if (loading) return <div className="p-8 text-center font-display uppercase tracking-widest text-brand-green-forest/40">Loading Stats...</div>;

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
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
               </div>
            </div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-green-deep/40 mb-1">{stat.label}</p>
            <h3 className={`text-3xl font-display font-medium ${stat.color}`}>{stat.val}</h3>
          </motion.div>
        ))}
      </div>

      <div className="bg-white p-8 border border-brand-green-forest/5 shadow-sm">
        <h3 className="text-lg font-display font-medium text-brand-green-forest uppercase tracking-widest mb-8 border-b border-brand-green-forest/5 pb-4">Recent Enquiries</h3>
        <div className="space-y-6">
           {stats.recentEnquiries.length === 0 ? (
             <p className="text-sm text-brand-green-deep/50 text-center py-8">No recent inquiries.</p>
           ) : stats.recentEnquiries.map((item, i) => (
             <div key={i} className="flex items-center justify-between group p-4 hover:bg-brand-beige/20 transition-colors border border-transparent hover:border-brand-green-forest/5">
                <div>
                   <p className="text-sm font-semibold text-brand-green-deep">{item.full_name || item.organization}</p>
                   <p className="text-[10px] uppercase font-bold text-brand-green-deep/40 mt-1">{item.email}</p>
                </div>
                <div className="text-right">
                   <p className="text-[10px] uppercase font-bold text-brand-green-deep/30 mb-2">{new Date(item.created_at).toLocaleDateString()}</p>
                   <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-1 border transition-all ${item.status === 'New' ? 'bg-red-50 text-red-600 border-red-100' : item.status === 'Contacted' ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-gray-50 text-gray-600 border-gray-100'}`}>
                      {item.status}
                   </span>
                </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}