import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, ArrowRight, Instagram, Linkedin, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-brand-green-deep text-brand-off-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
        <div>
           <div className="mb-6">
              <span className="text-xl font-display font-bold tracking-widest text-white block leading-none">
                SHIVAA OM GLOBE TRADE
              </span>
              <span className="text-xs font-medium tracking-[0.2em] text-brand-gold block mt-2 uppercase">
                Private Limited · EXIM
              </span>
           </div>
           <p className="text-sm text-brand-off-white/60 leading-relaxed mb-8">
             Connecting India to the world through trustworthy global trade solutions across Agro, EV, and Chemical sectors.
           </p>
           <div className="flex gap-4">
             <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-brand-gold hover:border-brand-gold transition-all">
                <Linkedin className="w-4 h-4" />
             </a>
             <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-brand-gold hover:border-brand-gold transition-all">
                <Instagram className="w-4 h-4" />
             </a>
             <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-brand-gold hover:border-brand-gold transition-all">
                <Facebook className="w-4 h-4" />
             </a>
           </div>
        </div>

        <div>
          <h4 className="font-display text-lg mb-8 uppercase tracking-widest text-brand-gold">Quick Links</h4>
          <ul className="space-y-4">
            {['Home', 'About Us', 'Products', 'Trade Activities', 'Blog', 'Contact'].map(link => (
              <li key={link}>
                <Link to={link === 'Home' ? '/' : `/${link.toLowerCase().replace(' ', '-')}`} className="text-sm text-brand-off-white/60 hover:text-brand-gold transition-colors flex items-center gap-2 group">
                  <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-lg mb-8 uppercase tracking-widest text-brand-gold">Core Trade</h4>
          <ul className="space-y-4">
            {[
              { name: 'Export: India → Africa', path: '/export' },
              { name: 'Import: China → India', path: '/import' },
              { name: 'Agro Commodities', path: '/products' },
              { name: 'Electric Mobility', path: '/products' },
              { name: 'Industrial Chemicals', path: '/products' }
            ].map(link => (
              <li key={link.name}>
                <Link to={link.path} className="text-sm text-brand-off-white/60 hover:text-brand-gold transition-colors block">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
           <h4 className="font-display text-lg mb-8 uppercase tracking-widest text-brand-gold">Contact Us</h4>
           <div className="space-y-6">
              <div className="flex gap-4">
                 <div className="w-10 h-10 bg-brand-green-forest rounded-lg flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-brand-gold" />
                 </div>
                 <div className="text-sm">
                    <p className="font-semibold text-white">Head Office</p>
                    <p className="text-brand-off-white/60">Office No. 24, Jay Ganesh Ji CHS, Plot No. 34, Sector 36, Kamothe, Panvel, Navi Mumbai – 410209</p>
                 </div>
              </div>
              <div className="flex gap-4">
                 <div className="w-10 h-10 bg-brand-green-forest rounded-lg flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-brand-gold" />
                 </div>
                 <div className="text-sm">
                    <p className="font-semibold text-white">Phone</p>
                    <p className="text-brand-off-white/60">+91 9152573356</p>
                 </div>
              </div>
              <div className="flex gap-4">
                 <div className="w-10 h-10 bg-brand-green-forest rounded-lg flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-brand-gold" />
                 </div>
                  <div className="text-sm">
                    <p className="font-semibold text-white">Email</p>
                    <p className="text-brand-off-white/60">ops@shivaaomglobetrade.com</p>
                  </div>
              </div>
           </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-xs text-brand-off-white/40">
          © {new Date().getFullYear()} Shivaa Om Globe Trade Private Limited. All rights reserved. Registered IEC Company.
        </p>
        <div className="flex gap-8 text-xs text-brand-off-white/40">
          <Link to="/privacy" className="hover:text-brand-gold transition-colors">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-brand-gold transition-colors">Terms of Service</Link>
          <Link to="/sitemap" className="hover:text-brand-gold transition-colors">Sitemap</Link>
        </div>
      </div>
    </footer>
  );
}
