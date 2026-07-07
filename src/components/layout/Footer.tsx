import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";

const QUICK_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/about' },
  { name: 'Products', path: '/products' },
  { name: 'Trade Activities', path: '/trade-activities' }, // Corrected path
  { name: 'Blog', path: '/blog' },
  { name: 'Contact', path: '/contact' }
];

const CORE_TRADE_LINKS = [
  { name: 'Export - India - Global Markets', path: '/export' },
  { name: 'Import  Global Markets - India', path: '/import' },
  { name: 'Agro Commodities', path: '/products' },
  { name: 'Electric Mobility', path: '/products' },
  { name: 'Industrial Chemicals', path: '/products' }
];

export default function Footer() {
  return (
    <footer className="bg-brand-green-deep text-brand-off-white pt-16 lg:pt-20 pb-10 text-center md:text-left relative z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-16">
        {/* Column 1: Company Info */}
        <div className="flex flex-col items-center md:items-start">
           <div className="mb-6 text-center md:text-left">
              <span className="text-xl font-display font-bold tracking-widest text-white block leading-none">
                SHIVAA OM GLOBE TRADE
              </span>
              <span className="text-xs font-medium tracking-[0.2em] text-brand-gold block mt-2 uppercase">
                Private Limited · EXIM
              </span>
           </div>
           <p className="text-sm text-brand-off-white/60 leading-relaxed max-w-xs">
             Connecting India to the world through trusted global trade solutions across agro commodities, electric mobility, chemicals, and more.
           </p>
        </div>

        {/* Column 2: Quick Links */}
        <div className="flex flex-col items-center md:items-start">
          <h4 className="font-display text-lg mb-8 uppercase tracking-widest text-brand-gold">Quick Links</h4>
          <ul className="space-y-4">
            {QUICK_LINKS.map(link => (
              <li key={link.name}>
                <Link to={link.path} className="text-sm text-brand-off-white/60 hover:text-brand-gold transition-colors duration-300 flex items-center justify-center md:justify-start gap-2 group py-1">
                  <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Core Trade */}
        <div className="flex flex-col items-center md:items-start">
          <h4 className="font-display text-lg mb-8 uppercase tracking-widest text-brand-gold">Core Trade</h4>
          <ul className="space-y-4">
            {CORE_TRADE_LINKS.map(link => (
              <li key={link.name}>
                <Link to={link.path} className="text-sm text-brand-off-white/60 hover:text-brand-gold transition-colors duration-300 block py-1">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Contact Us */}
        <div className="flex flex-col items-center md:items-start">
           <h4 className="font-display text-lg mb-8 uppercase tracking-widest text-brand-gold">Contact Us</h4>
           <div className="space-y-5">
              <a href="https://www.google.com/maps/search/?api=1&query=19.0262789,73.0903117" target="_blank" rel="noopener noreferrer" className="flex gap-4 text-left hover:opacity-80 transition-opacity duration-300">
                 <div className="w-10 h-10 bg-brand-green-forest rounded-lg flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-brand-gold" />
                 </div>
                 <div className="text-sm">
                    <p className="font-semibold text-white">Head Office</p>
                    <p className="text-brand-off-white/60 max-w-xs">Office Number 9, Jay Ganesh Ji CHS, Plot No. 34, Sector 36, Kamothe, Panvel, Navi Mumbai – 410209</p>
                 </div>
              </a>
              <a href="tel:+919152573356" className="flex gap-4 text-left hover:opacity-80 transition-opacity duration-300">
                 <div className="w-10 h-10 bg-brand-green-forest rounded-lg flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-brand-gold" />
                 </div>
                 <div className="text-sm">
                    <p className="font-semibold text-white">Phone</p>
                    <p className="text-brand-off-white/60 hover:text-brand-gold transition-colors duration-300">+91 9152573356</p>
                 </div>
              </a>
              <a href="mailto:ops@shivaaomglobetrade.com" className="flex gap-4 text-left hover:opacity-80 transition-opacity duration-300">
                 <div className="w-10 h-10 bg-brand-green-forest rounded-lg flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-brand-gold" />
                 </div>
                  <div className="text-sm">
                    <p className="font-semibold text-white">Email</p>
                    <p className="text-brand-off-white/60 hover:text-brand-gold transition-colors duration-300">ops@shivaaomglobetrade.com</p>
                  </div>
              </a>
           </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start gap-3 text-center md:text-left">
          <p className="text-xs text-brand-off-white/40">
            © {new Date().getFullYear()} Shivaa Om Globe Trade Private Limited. All rights reserved. Registered IEC Company.
          </p>
          <p className="text-xs text-brand-off-white/40">
            Design & Developed by <a href="https://www.innovexxa.com/" target="_blank" rel="noopener noreferrer" className="text-brand-off-white/60 hover:text-brand-gold hover:underline transition-colors duration-300">Innovexxa</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
