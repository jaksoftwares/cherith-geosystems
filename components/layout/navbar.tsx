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
  const logoSrc = isScrolled ? "/cherith-logo/1_cherith_master.svg" : "/cherith-logo/4_cherith_monochrome_white.svg";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-md border-gray-200 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 z-50 relative group">
           <div className="relative w-56 h-14 md:w-80 md:h-20 lg:w-[360px] lg:h-24 transition-transform duration-300 group-hover:scale-105">
             <Image 
               src={isScrolled ? "/cherith-logo/1_cherith_master.svg" : "/cherith-logo/4_cherith_monochrome_white.svg"} 
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
                    className={`text-sm font-semibold transition-colors relative group ${
                      isScrolled ? "text-gray-700 hover:text-brand-red" : "text-white/90 hover:text-white"
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
            className={`px-6 py-2.5 rounded hover:opacity-90 font-semibold transition-all shadow-lg active:scale-95 ${
              isScrolled 
                ? "bg-brand-red text-white hover:shadow-brand-red/20" 
                : "bg-white text-brand-blue hover:shadow-white/20"
            }`}
          >
            Request a Survey
          </Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden z-50 relative p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6 text-brand-blue" />
          ) : (
            <Menu className={`w-6 h-6 ${isScrolled ? "text-brand-blue" : "text-white"}`} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-0 left-0 right-0 bg-white shadow-xl border-b border-gray-100 pt-20 px-4 pb-6 h-screen flex flex-col"
          >
            <ul className="flex flex-col gap-2 mt-4 flex-1">
              {navLinks.map((link) => (
                <motion.li 
                  key={link.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block py-3 px-4 rounded-lg text-lg font-semibold transition-colors ${
                      pathname === link.href 
                        ? "bg-brand-blue/5 text-brand-blue" 
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <div className="mt-8 pb-8">
              <Link
                href="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full text-center py-4 rounded bg-brand-red text-white font-semibold hover:opacity-90 transition-opacity shadow-lg"
              >
                Request a Survey
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
