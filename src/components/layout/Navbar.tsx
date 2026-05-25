import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  Menu,
  X,
  Phone,
  Mail,
  MessageSquare,
} from "lucide-react";

import { Button } from "@/components/ui/button";

const NAV_LINKS = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Products", path: "/products" },
  { name: "Import", path: "/import" },
  { name: "Export", path: "/export" },
  { name: "Trade Activities", path: "/trade-activities" },
  { name: "Blog", path: "/blog" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 border-b border-brand-green-forest/10 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm h-20"
          : "bg-white/90 backdrop-blur-sm h-24"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between gap-4">

        {/* LEFT SECTION */}
        <Link
          to="/"
          className="flex items-center gap-3 group shrink-0 min-w-0"
        >
          {/* LOGO */}
          <div className="relative shrink-0">
            <img
              src="/logo-1.png"
              alt="Shivaa Om Globe Trade"
              className="w-14 h-14 lg:w-16 lg:h-16 object-contain transition-all duration-300 group-hover:scale-105"
            />
          </div>

          {/* COMPANY NAME */}
          <div className="flex flex-col justify-center leading-none min-w-0">

            <span className="text-sm sm:text-base lg:text-2xl font-black tracking-[0.08em] uppercase text-brand-green-forest truncate transition-colors duration-300 group-hover:text-brand-gold">
              SHIVAA OM
            </span>

            <span className="text-sm sm:text-base lg:text-2xl font-black tracking-[0.08em] uppercase text-brand-green-forest truncate transition-colors duration-300 group-hover:text-brand-gold">
              GLOBE TRADE
            </span>

            <span className="text-[9px] sm:text-[10px] lg:text-[10px] tracking-[0.35em] uppercase text-brand-green-forest/60 mt-1 font-semibold truncate">
              Private Limited · EXIM
            </span>
          </div>
        </Link>

        {/* DESKTOP NAVIGATION */}
        <div className="hidden lg:flex items-center gap-5 flex-1 justify-end">
          <div className="hidden lg:flex items-center gap-4 overflow-x-auto no-scrollbar">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`whitespace-nowrap text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.18em] transition-all duration-300 hover:text-brand-gold ${
                  location.pathname === link.path
                    ? "text-brand-green-forest border-b border-brand-green-forest pb-1"
                    : "text-brand-green-deep/60"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="flex items-center gap-4 ml-3">

            <Link to="/enquiry" className="hidden lg:inline-flex">
              <Button
                variant="outline"
                size="sm"
                className="border-brand-green-forest text-brand-green-forest hover:bg-brand-green-forest hover:text-white rounded-full px-5 py-3 font-semibold tracking-wide transition-all"
              >
                Enquire Now
              </Button>
            </Link>

            {/* WhatsApp */}
            <a
              href="https://wa.me/919152573356"
              target="_blank"
              rel="noreferrer"
              className="text-brand-green-forest hover:text-brand-gold transition-colors duration-300"
            >
              <MessageSquare className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="lg:hidden text-brand-green-forest p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <X className="w-7 h-7" />
          ) : (
            <Menu className="w-7 h-7" />
          )}
        </button>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden absolute inset-x-0 top-full bg-white shadow-2xl py-6 px-5 flex flex-col gap-4 border-t border-brand-green-forest/10"
          >

            {/* MOBILE LINKS */}
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-lg font-semibold uppercase tracking-wider transition-all ${
                  location.pathname === link.path
                    ? "text-brand-green-forest pl-4 border-l-2 border-brand-green-forest"
                    : "text-brand-green-deep/60"
                }`}
              >
                {link.name}
              </Link>
            ))}

            <hr className="border-brand-green-forest/10" />

            {/* CONTACT */}
            <div className="flex flex-col gap-5">

              <a
                href="tel:+919152573356"
                className="flex items-center gap-3 text-brand-green-forest"
              >
                <Phone className="w-5 h-5" />

                <span className="font-medium">
                  +91 9152573356
                </span>
              </a>

              <a
                href="mailto:ops@shivaaomglobetrade.com"
                className="flex items-center gap-3 text-brand-green-forest"
              >
                <Mail className="w-5 h-5" />

                <span className="font-medium">
                  ops@shivaaomglobetrade.com
                </span>
              </a>
            </div>

            {/* MOBILE CTA */}
            <Link to="/enquiry" className="w-full">
              <Button className="bg-brand-green-forest text-white hover:bg-brand-green-deep w-full py-6 text-lg rounded-full">
                Enquire Now
              </Button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}