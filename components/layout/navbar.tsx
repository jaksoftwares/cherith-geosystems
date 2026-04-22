"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Projects", href: "/projects" },
  { name: "Experience", href: "/experience" },
  { name: "Blogs", href: "/blogs" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Use the master logo when not dark, monochrome white when dark background is needed.
  // For now, depending on the scroll, we might toggle between logo variations if desired.

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        isScrolled || isMobileMenuOpen
          ? "bg-white/95 backdrop-blur-md shadow-md border-gray-200 py-1.5 md:py-2"
          : "bg-transparent border-transparent py-3 md:py-4"
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 z-50 relative group">
           <div className="relative w-38 h-15 sm:w-44 sm:h-16 md:w-54 md:h-20 lg:w-68 lg:h-22 transition-transform duration-300 group-hover:scale-105 active:scale-95">
             <Image 
               src={isScrolled || isMobileMenuOpen ? "/logos/cherith1.png" : "/logos/white monochrome.png"} 
               alt="Cherith GeoSystems Master Logo" 
               fill
               className="object-contain object-left"
               priority
             />
           </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className={`text-sm font-bold transition-all relative group py-1.5 ${
                      isScrolled ? "text-brand-blue hover:text-brand-red" : "text-white/90 hover:text-white"
                    }`}
                  >
                    {link.name}
                    <span 
                      className={`absolute -bottom-1 left-0 h-0.5 bg-brand-red transition-all duration-300 ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`} 
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
          
          <Link
            href="/contact"
            className={`px-6 py-2 rounded-lg hover:opacity-90 font-bold transition-all shadow-lg active:scale-95 text-sm ${
              isScrolled 
                ? "bg-brand-red text-white hover:shadow-brand-red/20 outline outline-transparent" 
                : "bg-white text-brand-blue hover:shadow-white/20 outline outline-white/10"
            }`}
          >
            Request a Survey
          </Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden z-[60] relative p-3 -mr-2 bg-transparent hover:bg-gray-100/10 rounded-full transition-colors active:scale-95 overflow-hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          <div className="relative w-6 h-6">
             <motion.div
               animate={isMobileMenuOpen ? { opacity: 0, rotate: 90 } : { opacity: 1, rotate: 0 }}
               className="absolute inset-0 flex items-center justify-center font-bold"
             >
               <Menu className={`w-6 h-6 ${isScrolled || isMobileMenuOpen ? "text-brand-blue" : "text-white"}`} />
             </motion.div>
             <motion.div
               initial={{ opacity: 0, rotate: -90 }}
               animate={isMobileMenuOpen ? { opacity: 1, rotate: 0 } : { opacity: 0, rotate: -90 }}
               className="absolute inset-0 flex items-center justify-center"
             >
               <X className={`w-6 h-6 ${isScrolled || isMobileMenuOpen ? "text-brand-blue" : "text-brand-red"}`} />
             </motion.div>
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="md:hidden fixed top-0 right-0 w-[80%] sm:w-[350px] bg-white shadow-2xl z-50 h-[100dvh] flex flex-col pointer-events-auto"
            >
              <div className="p-6 pt-24 space-y-2 overflow-y-auto flex-1">
                {navLinks.map((link, idx) => {
                  const isActive = pathname === link.href;
                  return (
                    <motion.div 
                      key={link.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + (idx * 0.05) }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`block py-4 px-5 rounded-2xl text-xl font-bold transition-all ${
                          isActive 
                            ? "bg-brand-blue text-white shadow-lg shadow-brand-blue/20" 
                            : "text-gray-900 bg-gray-50 active:bg-gray-100"
                        }`}
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
              
              <div className="p-6 border-t border-gray-100 bg-gray-50/50">
                <Link
                  href="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full text-center py-5 rounded-2xl bg-brand-red text-white font-bold hover:shadow-xl hover:shadow-brand-red/20 transition-all active:scale-95 text-lg shadow-lg"
                >
                  Request a Survey
                </Link>
                
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}