import { Mail, Phone, MapPin, Send, MessageSquare, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function Contact() {
  return (
    <div className="pt-24 pb-16 lg:pb-0">
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
                    Office No. 24, Jay Ganesh Ji CHS, Plot No. 34, Sector 36,
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

            <form className="space-y-8">
              
              <div className="grid md:grid-cols-2 gap-8">
                
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-white/40">
                    Full Name
                  </label>

                  <Input className="bg-transparent border-0 border-b border-white/20 rounded-none focus:border-brand-gold focus:ring-0 px-0 h-10" />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-white/40">
                    Email Address
                  </label>

                  <Input className="bg-transparent border-0 border-b border-white/20 rounded-none focus:border-brand-gold focus:ring-0 px-0 h-10" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-widest text-white/40">
                  Organization
                </label>

                <Input className="bg-transparent border-0 border-b border-white/20 rounded-none focus:border-brand-gold focus:ring-0 px-0 h-10" />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-widest text-white/40">
                  Message / Requirements
                </label>

                <Textarea className="bg-transparent border-0 border-b border-white/20 rounded-none focus:border-brand-gold focus:ring-0 px-0 min-h-[100px] resize-none" />
              </div>

              <Button className="w-full h-16 bg-brand-gold text-brand-green-deep hover:bg-white rounded-none uppercase text-xs font-bold tracking-[0.2em] transition-all">
                Initialize Inquiry
                <Send className="ml-2 w-4 h-4" />
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Quick Action Bar */}
      <section className="bg-brand-beige py-16 mb-0">
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