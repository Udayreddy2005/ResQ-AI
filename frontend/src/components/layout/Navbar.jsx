import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll state to toggle glassmorphism and shadow depth
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Features', href: '#features' },
];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-neutral-950/75 backdrop-blur-md border-b border-neutral-800/50 shadow-lg shadow-black/20'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20">
          
          {/* Left: Brand Identity */}
          <div className="flex-shrink-0">
            <a 
              href="#home" 
              className="flex items-center gap-2.5 group focus:outline-none focus:ring-2 focus:ring-red-500/50 rounded-lg p-1"
              aria-label="ResQ AI Home"
            >
              <span className="text-2xl sm:text-3xl filter drop-shadow-[0_0_8px_rgba(239,68,68,0.5)] transition-transform duration-300 group-hover:scale-110">
                ResQ AI™

              </span>
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-neutral-50 via-neutral-100 to-red-500 bg-clip-text text-transparent">
                ResQ <span className="text-red-500">AI</span>
              </span>
            </a>
          </div>

          {/* Center: Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-1 bg-neutral-900/40 border border-neutral-800/60 rounded-full px-1.5 py-1 backdrop-blur-sm">
            {navLinks.map((link) => (
              <a
  key={link.label}
  href={link.href}
  onClick={(e) => {
    e.preventDefault();

    const section = document.querySelector(link.href);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    setIsMobileMenuOpen(false);
  }}
  className="relative px-4 py-2 text-sm font-medium text-neutral-400 hover:text-neutral-100 rounded-full transition-colors duration-250 focus:outline-none focus:ring-2 focus:ring-red-500/50"
>
  {link.label}
</a>
            ))}
          </nav>

          {/* Right: CTA & Mobile Toggle */}
          <div className="flex items-center gap-4">
            {/* Desktop Emergency CTA */}
            <a
              href="#triage"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-red-600 hover:bg-red-500 text-white shadow-[0_0_20px_rgba(220,38,38,0.3)] hover:shadow-[0_0_25px_rgba(220,38,38,0.5)] transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-neutral-950"
            >
              <span>🚨</span> Start Emergency
            </a>

            {/* Mobile Hamburger Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-xl bg-neutral-900/60 hover:bg-neutral-800/80 border border-neutral-800 focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-colors"
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              <span className={`block w-5 h-0.5 bg-neutral-200 transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-1'}`} />
              <span className={`block w-5 h-0.5 bg-neutral-200 transition-all duration-300 my-0.5 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
              <span className={`block w-5 h-0.5 bg-neutral-200 transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1'}`} />
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation (Slide overlay) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-neutral-950/80 backdrop-blur-sm md:hidden"
            />

            {/* Slide-out Menu */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-xs z-50 bg-neutral-950 border-l border-neutral-900 p-6 shadow-2xl flex flex-col justify-between md:hidden"
            >
              <div className="flex flex-col gap-8">
                {/* Mobile Header Inside Drawer */}
                <div className="flex items-center justify-between pb-6 border-b border-neutral-900">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🚑</span>
                    <span className="font-extrabold text-lg text-white">ResQ AI</span>
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white"
                    aria-label="Close menu"
                  >
                    ✕
                  </button>
                </div>

                {/* Navigation Links */}
                <nav className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-lg font-medium text-neutral-400 hover:text-neutral-100 py-2 border-b border-neutral-900/50 transition-colors"
                    >
                      {link.label}
                    </a>
                  ))}
                </nav>
              </div>

              {/* Sticky Emergency Button in Drawer */}
              <div className="pt-6 border-t border-neutral-900">
                <a
                  href="#triage"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-4 rounded-xl text-base font-bold bg-red-600 text-white shadow-[0_0_20px_rgba(220,38,38,0.2)] focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <span>🚨</span> Start Emergency
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}