import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Globe, FileCheck, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


export default function Enquiry() {
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
  const [errors, setErrors] = useState<Partial<typeof formData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (field?: keyof typeof formData) => {
    const newErrors: Partial<typeof formData> = { ...errors };
    const data = { ...formData };

    // Trim all string values
    for (const key in data) {
      if (typeof data[key as keyof typeof data] === 'string') {
        data[key as keyof typeof data] = data[key as keyof typeof data].trim();
      }
    }

    const validateField = (key: keyof typeof formData) => {
      switch (key) {
        case 'name':
          if (!data.name) newErrors.name = "Please enter a valid full name.";
          else if (data.name.length < 2 || data.name.length > 50) newErrors.name = "Please enter a valid full name.";
          else if (!/^[a-zA-Z\s]+$/.test(data.name)) newErrors.name = "Please enter a valid full name.";
          else delete newErrors.name;
          break;
        case 'company':
          if (!data.company) newErrors.company = "Please enter your organization name.";
          else if (data.company.length < 2 || data.company.length > 100) newErrors.company = "Please enter your organization name.";
          else if (!/^[a-zA-Z0-9\s&.,-]+$/.test(data.company)) newErrors.company = "Please enter your organization name.";
          else delete newErrors.company;
          break;
        case 'email':
          if (!data.email) newErrors.email = "Please enter a valid email address.";
          else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) newErrors.email = "Please enter a valid email address.";
          else delete newErrors.email;
          break;
        case 'phone':
          if (data.phone && !/^\+?[0-9]{7,15}$/.test(data.phone)) newErrors.phone = "Please enter a valid phone number.";
          else delete newErrors.phone;
          break;
        case 'country':
          if (!data.country) newErrors.country = "Please enter your country.";
          else delete newErrors.country;
          break;
        case 'productInterest':
          if (!data.productInterest) newErrors.productInterest = "Please select a product category.";
          else delete newErrors.productInterest;
          break;
        case 'message':
          if (!data.message) newErrors.message = "Please provide your requirements (minimum 20 characters).";
          else if (data.message.length < 20 || data.message.length > 1000) newErrors.message = "Please provide your requirements (minimum 20 characters).";
          else delete newErrors.message;
          break;
        default:
          break;
      }
    };

    if (field) {
      validateField(field);
    } else {
      (Object.keys(data) as Array<keyof typeof formData>).forEach(key => validateField(key));
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (validate()) {
      setIsSubmitting(true);

      // Sanitize and build WhatsApp message
      const message = `Hello Shivaa Om Globe Trade Team,

I would like to make an enquiry.

Full Name: ${formData.name.trim()}
Organization: ${formData.company.trim()}
Email Address: ${formData.email.trim()}
Phone Number: ${formData.phone.trim() || "N/A"}
Country: ${formData.country.trim()}
Product Interest: ${formData.productInterest.trim()}
Requirements / Message:
${formData.message.trim()}

Please contact me regarding my enquiry.

Thank you.`;

      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/919152573356?text=${encodedMessage}`;
      
      window.open(whatsappUrl, "_blank");
      setSuccess(true);
    }
  };

  if (success) {
    return (
      <div className="pt-40 pb-24 text-center max-w-2xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
           <div className="w-24 h-24 bg-brand-green-forest rounded-full flex items-center justify-center mx-auto mb-12">
              <CheckCircle2 className="w-12 h-12 text-brand-gold" />
           </div>
           <h1 className="text-4xl lg:text-6xl font-display font-medium text-brand-green-deep mb-8">Inquiry Submitted</h1>
           <p className="text-brand-green-deep/60 leading-relaxed mb-12">
             Thank you for reaching out to Shivaa Om Globe Trade. Your inquiry has been sent to our WhatsApp. Our trade desk will respond to you shortly.
           </p>
           <Button className="bg-brand-green-forest text-white h-14 px-10 rounded-none uppercase text-xs font-bold tracking-widest" onClick={() => setSuccess(false)}>
              Send Another Enquiry
           </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 lg:pt-32 lg:pb-24">
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
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
                       <Input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} onBlur={() => validate('name')} className={`h-12 border-brand-green-forest/10 focus:border-brand-green-forest bg-brand-off-white/50 rounded-none ${errors.name ? 'border-red-500' : ''}`} />
                       {errors.name && <p className="text-red-500 text-xs mt-1 ml-1">{errors.name}</p>}
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] uppercase font-bold tracking-widest text-brand-green-forest/40 ml-1">Organization *</label>
                       <Input value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} onBlur={() => validate('company')} className={`h-12 border-brand-green-forest/10 focus:border-brand-green-forest bg-brand-off-white/50 rounded-none ${errors.company ? 'border-red-500' : ''}`} />
                       {errors.company && <p className="text-red-500 text-xs mt-1 ml-1">{errors.company}</p>}
                    </div>
                 </div>
                 <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-[10px] uppercase font-bold tracking-widest text-brand-green-forest/40 ml-1">Email Address *</label>
                       <Input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} onBlur={() => validate('email')} className={`h-12 border-brand-green-forest/10 focus:border-brand-green-forest bg-brand-off-white/50 rounded-none ${errors.email ? 'border-red-500' : ''}`} />
                       {errors.email && <p className="text-red-500 text-xs mt-1 ml-1">{errors.email}</p>}
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] uppercase font-bold tracking-widest text-brand-green-forest/40 ml-1">Phone Number</label>
                       <Input value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} onBlur={() => validate('phone')} className={`h-12 border-brand-green-forest/10 focus:border-brand-green-forest bg-brand-off-white/50 rounded-none ${errors.phone ? 'border-red-500' : ''}`} />
                       {errors.phone && <p className="text-red-500 text-xs mt-1 ml-1">{errors.phone}</p>}
                    </div>
                 </div>
                 <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-[10px] uppercase font-bold tracking-widest text-brand-green-forest/40 ml-1">Country *</label>
                       <Input value={formData.country} onChange={e => setFormData({...formData, country: e.target.value})} onBlur={() => validate('country')} className={`h-12 border-brand-green-forest/10 focus:border-brand-green-forest bg-brand-off-white/50 rounded-none ${errors.country ? 'border-red-500' : ''}`} />
                       {errors.country && <p className="text-red-500 text-xs mt-1 ml-1">{errors.country}</p>}
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] uppercase font-bold tracking-widest text-brand-green-forest/40 ml-1">Product Interest *</label>
                       <Select value={formData.productInterest} onValueChange={(val) => {
                         setFormData({...formData, productInterest: val || ""});
                         // We need to validate on change for Select
                         if (val) {
                           setErrors(prev => {
                             const newErrors = {...prev};
                             delete newErrors.productInterest;
                             return newErrors;
                           });
                         }
                       }}>
                          <SelectTrigger onBlur={() => validate('productInterest')} className={`h-12 border-brand-green-forest/10 focus:border-brand-green-forest bg-brand-off-white/50 rounded-none ${errors.productInterest ? 'border-red-500' : ''}`}>
                            <SelectValue placeholder="Select Category" />
                          </SelectTrigger>
                          <SelectContent className="bg-white border-brand-green-forest/10 rounded-none">
                            <SelectItem value="Agro Commodities">Agro Commodities</SelectItem>
                            <SelectItem value="Electric Mobility">Electric Mobility</SelectItem>
                            <SelectItem value="Industrial Products">Industrial Products</SelectItem>
                            <SelectItem value="Chemicals">Chemicals</SelectItem>
                            <SelectItem value="Polymers">Polymers</SelectItem>
                            <SelectItem value="Merchant Trading">Merchant Trading</SelectItem>
                          </SelectContent>
                       </Select>
                       {errors.productInterest && <p className="text-red-500 text-xs mt-1 ml-1">{errors.productInterest}</p>}
                    </div>
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold tracking-widest text-brand-green-forest/40 ml-1">Requirements / Message *</label>
                    <Textarea value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} onBlur={() => validate('message')} className={`min-h-30 border-brand-green-forest/10 focus:border-brand-green-forest bg-brand-off-white/50 rounded-none resize-none ${errors.message ? 'border-red-500' : ''}`} placeholder="Specify quantity, origin, or other technical details..." />
                    {errors.message && <p className="text-red-500 text-xs mt-1 ml-1">{errors.message}</p>}
                 </div>
                 
                 <Button type="submit" disabled={isSubmitting} className="w-full h-16 bg-brand-green-forest text-white hover:bg-brand-green-deep rounded-none uppercase text-xs font-bold tracking-[0.3em] transition-all group disabled:opacity-70">
                    {isSubmitting ? (
                      <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Redirecting...</>
                    ) : (
                      <>Submit Inquiry <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" /></>
                    )}
                 </Button>
              </form>
           </div>
        </div>
      </section>
    </div>
  );
}
