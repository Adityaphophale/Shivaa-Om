import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2, Globe, FileCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// replaced Firebase with API POST to /api/enquiries
import { toast } from "sonner";

export default function Enquiry() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    country: "",
    productInterest: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const API_URL = import.meta.env.VITE_API_URL || '';
    try {
         const res = await fetch(`${API_URL}/api/enquiries`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
               full_name: formData.name,
               organization: formData.company,
               email: formData.email,
               phone: formData.phone,
               country: formData.country,
               product_interest: formData.productInterest,
               message: formData.message,
               source_page: window.location.href,
            })
         });
         
         if (!res.ok) {
            let errorMsg = 'Failed to submit';
            try {
               const errData = await res.json();
               errorMsg = errData.details || errData.error || errData.errors?.[0]?.msg || `HTTP ${res.status} ${res.statusText}`;
            } catch (e) {
               errorMsg = `Server returned ${res.status} ${res.statusText} (Not JSON)`;
            }
            throw new Error(errorMsg);
         }
         
         setSuccess(true);
         toast.success("Enquiry sent successfully. Our trade desk will contact you within 24 hours.");
    } catch (error: any) {
         toast.error(`Error: ${error.message}. Please try again or contact us via WhatsApp.`);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="pt-40 pb-24 text-center max-w-2xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
           <div className="w-24 h-24 bg-brand-green-forest rounded-full flex items-center justify-center mx-auto mb-12">
              <CheckCircle2 className="w-12 h-12 text-brand-gold" />
           </div>
           <h1 className="text-4xl lg:text-6xl font-display font-medium text-brand-green-deep mb-8">Submission Received</h1>
           <p className="text-brand-green-deep/60 leading-relaxed mb-12">
             Thank you for reaching out to Shivaa Om Globe Trade. Your inquiry has been logged in our system and assigned to a trade representative. You will receive a response at your registered email address shortly.
           </p>
           <Button className="bg-brand-green-forest text-white h-14 px-10 rounded-none uppercase text-xs font-bold tracking-widest" onClick={() => setSuccess(false)}>
              Send Another Enquiry
           </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 lg:pb-0">
      <section className="max-w-5xl mx-auto px-4 sm:px-6 mb-24">
        <div className="magazine-header">
           <span>Request For Quotation</span>
           <span>Global Trade Desk</span>
        </div>
        
        <div className="editorial-split text-brand-green-deep bg-white border border-brand-green-forest/10 p-0 shadow-2xl">
           <div className="p-10 lg:p-16 border-b lg:border-b-0 lg:border-r border-brand-green-forest/10">
              <h1 className="text-5xl font-medium leading-[1.1] mb-12">
                Begin Your <br /><span className="text-brand-green-forest font-display">Trade Voyage</span>
              </h1>
              <p className="text-brand-green-deep/70 mb-12 text-sm leading-relaxed">
                Provide your requirements below. Our sourcing experts specialized in agro commodities and chemicals will generate a formal quotation based on current market indices.
              </p>
              
              <div className="space-y-8">
                 <div className="flex items-center gap-6">
                    <Globe className="w-6 h-6 text-brand-gold" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Verified International Sourcing</span>
                 </div>
                 <div className="flex items-center gap-6">
                    <FileCheck className="w-6 h-6 text-brand-gold" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Documentation & Compliance Ready</span>
                 </div>
              </div>
           </div>

           <div className="p-10 lg:p-16">
              <form onSubmit={handleSubmit} className="space-y-6">
                 <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-[10px] uppercase font-bold tracking-widest text-brand-green-forest/40 ml-1">Full Name *</label>
                       <Input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="h-12 border-brand-green-forest/10 focus:border-brand-green-forest bg-brand-off-white/50 rounded-none" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] uppercase font-bold tracking-widest text-brand-green-forest/40 ml-1">Organization *</label>
                       <Input required value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} className="h-12 border-brand-green-forest/10 focus:border-brand-green-forest bg-brand-off-white/50 rounded-none" />
                    </div>
                 </div>
                 <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-[10px] uppercase font-bold tracking-widest text-brand-green-forest/40 ml-1">Email Address *</label>
                       <Input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="h-12 border-brand-green-forest/10 focus:border-brand-green-forest bg-brand-off-white/50 rounded-none" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] uppercase font-bold tracking-widest text-brand-green-forest/40 ml-1">Phone Number</label>
                       <Input value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="h-12 border-brand-green-forest/10 focus:border-brand-green-forest bg-brand-off-white/50 rounded-none" />
                    </div>
                 </div>
                 <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-[10px] uppercase font-bold tracking-widest text-brand-green-forest/40 ml-1">Country *</label>
                       <Input required value={formData.country} onChange={e => setFormData({...formData, country: e.target.value})} className="h-12 border-brand-green-forest/10 focus:border-brand-green-forest bg-brand-off-white/50 rounded-none" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] uppercase font-bold tracking-widest text-brand-green-forest/40 ml-1">Product Interest *</label>
                       <Select value={formData.productInterest} onValueChange={(val: string) => setFormData({...formData, productInterest: val})}>
                          <SelectTrigger className="h-12 border-brand-green-forest/10 focus:border-brand-green-forest bg-brand-off-white/50 rounded-none">
                            <SelectValue placeholder="Select Category" />
                          </SelectTrigger>
                          <SelectContent className="bg-white border-brand-green-forest/10 rounded-none">
                            <SelectItem value="Agro Commodities">Agro Commodities</SelectItem>
                            <SelectItem value="Electric Mobility">Electric Mobility</SelectItem>
                            <SelectItem value="Chemicals">Chemicals</SelectItem>
                            <SelectItem value="Polymers">Polymers</SelectItem>
                            <SelectItem value="Merchant Trading">Merchant Trading</SelectItem>
                          </SelectContent>
                       </Select>
                    </div>
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold tracking-widest text-brand-green-forest/40 ml-1">Requirements / Message *</label>
                    <Textarea required value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="min-h-[120px] border-brand-green-forest/10 focus:border-brand-green-forest bg-brand-off-white/50 rounded-none resize-none" placeholder="Specify quantity, origin, or other technical details..." />
                 </div>
                 
                 <Button disabled={loading} type="submit" className="w-full h-16 bg-brand-green-forest text-white hover:bg-brand-green-deep rounded-none uppercase text-xs font-bold tracking-[0.3em] transition-all group">
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Submit Inquiry <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" /></>}
                 </Button>
              </form>
           </div>
        </div>
      </section>
    </div>
  );
}
