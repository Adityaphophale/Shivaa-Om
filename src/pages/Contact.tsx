import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Contact() {
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
          if (!data.country) newErrors.country = "Please select your country.";
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

  return (
    <div className="pt-24 lg:pb-0">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-12">
        <div className="magazine-header">
          <span>Connect With Us</span>
          <span>Global Inquiries</span>
        </div>

        <div className="editorial-split bg-white border border-brand-green-forest/10 p-0">
          
          {/* Left Side */}
          <div className="p-8 sm:p-12 lg:p-20 flex flex-col justify-between">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-8xl font-medium leading-[0.9] mb-12">
                Get In <br />
                <span className="text-brand-green-forest font-display">
                  Touch
                </span>
              </h1>

              <p className="text-brand-green-deep/70 mb-12 max-w-sm">
                Whether you're looking to source agro commodities or import
                industrial chemicals, our trade desk is ready to assist.
              </p>
            </div>

            <div className="space-y-8">
              
              {/* Address */}
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-brand-beige flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-brand-green-forest" />
                </div>

                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-brand-green-forest/40 mb-2">
                    Registered Office
                  </h4>

                  <p className="text-sm font-semibold text-brand-green-deep">
                    Office Number 9, Jay Ganesh Ji CHS, Plot No. 34, Sector 36,
                    Kamothe, Panvel, Navi Mumbai – 410209
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-brand-beige flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6 text-brand-green-forest" />
                </div>

                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-brand-green-forest/40 mb-2">
                    Primary Line
                  </h4>

                  <p className="text-sm font-semibold text-brand-green-deep">
                    +91 9152573356
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-brand-beige flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6 text-brand-green-forest" />
                </div>

                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-brand-green-forest/40 mb-2">
                    Email Desk
                  </h4>

                  <p className="text-sm font-semibold text-brand-green-deep">
                    ops@shivaaomglobetrade.com
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side Form */}
          <div className="bg-brand-green-deep p-8 sm:p-12 lg:p-20 text-white">
            <div className="flex items-center gap-4 mb-12 border-b border-white/10 pb-6 uppercase tracking-widest text-[10px] font-bold text-brand-gold">
              <Send className="w-4 h-4" />
              Direct Message
            </div>

            {success ? (
              <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-12">
                 <div className="w-20 h-20 bg-brand-gold rounded-full flex items-center justify-center mx-auto mb-8">
                    <CheckCircle2 className="w-10 h-10 text-brand-green-deep" />
                 </div>
                 <h2 className="text-3xl font-display font-medium text-white mb-6">Message Sent</h2>
                 <p className="text-white/60 text-sm leading-relaxed mb-8">
                   Thank you for reaching out to Shivaa Om Globe Trade. Your message has been sent via WhatsApp and a representative will contact you shortly.
                 </p>
                 <Button className="bg-brand-gold text-brand-green-deep hover:bg-white h-12 px-8 rounded-none uppercase text-xs font-bold tracking-widest transition-all" onClick={() => setSuccess(false)}>
                    Send Another Message
                 </Button>
              </motion.div>
            ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              
              <div className="grid md:grid-cols-2 gap-8">
                
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-white/40">
                    Full Name *
                  </label>

                  <Input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} onBlur={() => validate('name')} className={`bg-transparent text-white border-0 border-b rounded-none focus:border-brand-gold focus:ring-0 px-0 h-10 ${errors.name ? 'border-red-500' : 'border-white/20'}`} />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-white/40">
                    Organization *
                  </label>

                  <Input value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} onBlur={() => validate('company')} className={`bg-transparent text-white border-0 border-b rounded-none focus:border-brand-gold focus:ring-0 px-0 h-10 ${errors.company ? 'border-red-500' : 'border-white/20'}`} />
                  {errors.company && <p className="text-red-500 text-xs mt-1">{errors.company}</p>}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-white/40">
                    Email Address *
                  </label>

                  <Input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} onBlur={() => validate('email')} className={`bg-transparent text-white border-0 border-b rounded-none focus:border-brand-gold focus:ring-0 px-0 h-10 ${errors.email ? 'border-red-500' : 'border-white/20'}`} />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-white/40">
                    Phone Number
                  </label>

                  <Input value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} onBlur={() => validate('phone')} className={`bg-transparent text-white border-0 border-b rounded-none focus:border-brand-gold focus:ring-0 px-0 h-10 ${errors.phone ? 'border-red-500' : 'border-white/20'}`} />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-white/40">
                    Country *
                  </label>

                  <Input value={formData.country} onChange={e => setFormData({...formData, country: e.target.value})} onBlur={() => validate('country')} className={`bg-transparent text-white border-0 border-b rounded-none focus:border-brand-gold focus:ring-0 px-0 h-10 ${errors.country ? 'border-red-500' : 'border-white/20'}`} />
                  {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-white/40">
                    Product Interest *
                  </label>

                  <Select
                    value={formData.productInterest}
                    onValueChange={(value) => setFormData({ ...formData, productInterest: value })}
                  >
                    <SelectTrigger onBlur={() => validate('productInterest')} className={`bg-transparent text-white border-0 border-b rounded-none focus:border-brand-gold focus:ring-0 px-0 h-10 w-full ${errors.productInterest ? 'border-red-500' : 'border-white/20'}`}>
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
                  {errors.productInterest && <p className="text-red-500 text-xs mt-1">{errors.productInterest}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-widest text-white/40">
                  Message / Requirements *
                </label>

                <Textarea value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} onBlur={() => validate('message')} className={`bg-transparent text-white border-0 border-b rounded-none focus:border-brand-gold focus:ring-0 px-0 min-h-[100px] resize-none ${errors.message ? 'border-red-500' : 'border-white/20'}`} />
                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
              </div>

              <Button type="submit" disabled={isSubmitting} className="w-full h-16 bg-brand-gold text-brand-green-deep hover:bg-white rounded-none uppercase text-xs font-bold tracking-[0.2em] transition-all group disabled:opacity-70">
                {isSubmitting ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Redirecting...</>
                ) : (
                  <>Initialize Inquiry <Send className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" /></>
                )}
              </Button>
            </form>
            )}
          </div>
        </div>
      </section>

      {/* Quick Action Bar */}
      <section className="bg-brand-beige py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
          
          {/* WhatsApp */}
          <div className="flex items-center gap-6 group cursor-pointer">
            <div className="w-16 h-16 bg-white border border-brand-green-forest/10 flex items-center justify-center group-hover:bg-brand-green-forest group-hover:text-white transition-all">
              <MessageSquare className="w-8 h-8" />
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest mb-1">
                WhatsApp Chat
              </h4>

              <p className="text-[10px] text-brand-green-deep/40 mb-1 tracking-wider uppercase font-semibold">
                Instant Response
              </p>

              <p className="text-sm font-semibold">
                +91 9152573356
              </p>
            </div>
          </div>

          {/* Working Hours */}
          <div className="flex items-center gap-6 group cursor-pointer">
            <div className="w-16 h-16 bg-white border border-brand-green-forest/10 flex items-center justify-center group-hover:bg-brand-green-forest group-hover:text-white transition-all">
              <Clock className="w-8 h-8" />
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest mb-1">
                Working Hours
              </h4>

              <p className="text-[10px] text-brand-green-deep/40 mb-1 tracking-wider uppercase font-semibold">
                Standard IST
              </p>

              <p className="text-sm font-semibold">
                Mon – Sat: 10AM – 7PM
              </p>
            </div>
          </div>

          {/* Website */}
          <div className="flex items-center gap-6 group cursor-pointer">
            <div className="w-16 h-16 bg-white border border-brand-green-forest/10 flex items-center justify-center group-hover:bg-brand-green-forest group-hover:text-white transition-all">
              <Send className="w-8 h-8" />
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest mb-1">
                Official Site
              </h4>

              <p className="text-[10px] text-brand-green-deep/40 mb-1 tracking-wider uppercase font-semibold">
                Secure Portal
              </p>

              <p className="text-sm font-semibold">
                shivaaomglobetrade.com
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Colorful Google Map */}
      <div className="w-full h-[450px] overflow-hidden">
        <iframe
          src="https://maps.google.com/maps?q=19.0262789,73.0903117&z=17&output=embed"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full"
        ></iframe>
      </div>
    </div>
  );
}