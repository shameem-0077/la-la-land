"use client";

import { useState, useEffect } from "react";
import NextLink from "next/link";
import { MessageCircle, Ticket, Menu, X, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { name: "About Us", href: "/about" },
  { 
    name: "Rides", 
    href: "/rides",
    dropdown: [
      { name: "All Rides", href: "/rides" },
      { name: "Water Rides", href: "/rides?category=water" },
      { name: "Outdoor Rides", href: "/rides?category=adventure" },
      { name: "Kids Rides", href: "/rides?category=kids" },
      { name: "Add-ons", href: "/rides?category=amusement" },
    ]
  },
  { name: "Packages", href: "/packages" },
  { name: "Blogs", href: "/blogs" },
  { name: "Contact Us", href: "/contact" }
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showRidesDropdown, setShowRidesDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
      scrolled || isMobileMenuOpen
        ? "bg-white shadow-lg shadow-primary/5 py-2 md:py-3" 
        : "bg-transparent py-4 md:py-6"
    }`}>
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <NextLink href="/" className="flex items-center group relative z-[110]" onClick={() => setIsMobileMenuOpen(false)}>
          <img 
            src="/images/header-logo.png" 
            alt="La La Land Logo" 
            className="h-12 md:h-20 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </NextLink>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-10">
          {navItems.map((item) => (
            <div 
              key={item.name} 
              className="relative group py-4"
              onMouseEnter={() => item.dropdown && setShowRidesDropdown(true)}
              onMouseLeave={() => item.dropdown && setShowRidesDropdown(false)}
            >
              <NextLink 
                href={item.href} 
                className={`text-[13px] font-black transition-colors uppercase tracking-widest flex items-center gap-1 ${
                  scrolled || isMobileMenuOpen ? 'text-secondary hover:text-primary' : 'text-white hover:text-primary'
                }`}
              >
                {item.name}
                {item.dropdown && (
                  <svg width="8" height="6" viewBox="0 0 8 6" fill="none" className="group-hover:rotate-180 transition-transform">
                    <path d="M1 1L4 4L7 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                )}
              </NextLink>

              {item.dropdown && (
                <AnimatePresence>
                  {showRidesDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 min-w-[200px] bg-white rounded-2xl shadow-2xl border border-zinc-50 p-4 z-50"
                    >
                      <div className="flex flex-col gap-2">
                        {item.dropdown.map((sub) => (
                          <NextLink
                            key={sub.name}
                            href={sub.href}
                            className="px-4 py-2 text-[11px] font-black text-primary hover:text-secondary hover:bg-muted rounded-lg transition-all uppercase tracking-wider"
                          >
                            {sub.name}
                          </NextLink>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}
        </nav>

        {/* Actions & Hamburger */}
        <div className="flex items-center gap-3 md:gap-5 relative z-[110]">
          {/* WhatsApp - Only visible on Desktop or when menu closed */}
          {!isMobileMenuOpen && (
            <NextLink
              href="https://wa.me/your-number"
              className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-success text-primary hover:scale-110 transition-transform shadow-lg shadow-success/20"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
            </NextLink>
          )}

          {/* Book Button */}
          <NextLink
            href="/book"
            className={`flex items-center gap-2 md:gap-3 px-5 md:px-10 py-2.5 md:py-4 rounded-full font-black text-[9px] md:text-xs transition-all shadow-xl uppercase tracking-widest group ${
              scrolled || isMobileMenuOpen
                ? 'bg-primary text-white hover:bg-primary-dark' 
                : 'bg-white text-primary hover:bg-primary hover:text-white'
            }`}
          >
            <span className="hidden xs:inline">Book Tickets</span>
            <span className="xs:hidden">Book</span>
            <Ticket className="w-4 h-4 group-hover:rotate-12 transition-transform fill-current" />
          </NextLink>

          {/* Hamburger Menu Toggle */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden w-10 h-10 flex items-center justify-center rounded-xl transition-all ${
              scrolled || isMobileMenuOpen ? 'bg-muted text-primary' : 'bg-white/10 text-white backdrop-blur-md'
            }`}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-white z-[105] lg:hidden flex flex-col pt-32 pb-10 px-6 overflow-y-auto"
          >
            <nav className="flex flex-col gap-6">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                >
                  <NextLink
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between group"
                  >
                    <span className="text-3xl font-black text-secondary uppercase tracking-tighter group-hover:text-primary transition-colors">
                      {item.name}
                    </span>
                    <ChevronRight className="w-6 h-6 text-zinc-200" />
                  </NextLink>
                  {item.dropdown && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {item.dropdown.map((sub) => (
                        <NextLink
                          key={sub.name}
                          href={sub.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="px-4 py-2 bg-muted rounded-full text-[10px] font-black text-primary uppercase tracking-wider"
                        >
                          {sub.name}
                        </NextLink>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </nav>

            <div className="mt-auto pt-10">
              <NextLink
                href="/book"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center gap-4 w-full py-5 bg-primary text-white rounded-[25px] font-black uppercase tracking-widest shadow-2xl shadow-primary/30 mb-6"
              >
                Book Your Adventure Now
                <Ticket className="w-5 h-5 fill-white" />
              </NextLink>
              
              <div className="flex items-center justify-center gap-6">
                <NextLink href="#" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-primary"><MessageCircle className="w-5 h-5 fill-current" /></NextLink>
                <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">Follow the Fun</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
