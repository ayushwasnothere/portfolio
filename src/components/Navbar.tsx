import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, Clock } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [time, setTime] = useState('');

  // Live Hyderabad Time (IST: UTC+5:30)
  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setTime(new Intl.DateTimeFormat('en-US', options).format(new Date()));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { label: 'About', id: 'about' },
    { label: 'Experience', id: 'experience' },
    { label: 'Projects', id: 'projects' },
    { label: 'Skills', id: 'skills' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 pt-4 pb-2 transition-all duration-300 pointer-events-none"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
          {/* Logo & Status Badge */}
          <div className="flex items-center gap-4">
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('hero');
              }}
              data-cursor="AYUSH"
              className="flex items-center gap-2 group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-500 p-[1px] shadow-lg shadow-purple-500/20 group-hover:scale-105 transition-transform duration-300">
                <div className="w-full h-full bg-[#08090d] rounded-[11px] flex items-center justify-center font-mono font-black text-sm text-white">
                  AS
                </div>
              </div>
              <span className="font-mono font-bold text-sm tracking-tight text-white hidden sm:inline-block">
                AYUSH <span className="text-purple-400">SHAH</span>
              </span>
            </a>

            {/* Live Status Pill */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel text-[11px] font-mono text-neutral-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>AVAILABLE FOR WORK</span>
            </div>
          </div>

          {/* Floating Navigation Menu Pill */}
          <nav
            className={`hidden md:flex items-center gap-1 px-4 py-2 rounded-full transition-all duration-300 ${
              scrolled
                ? 'bg-[#0a0b10]/85 backdrop-blur-xl border border-white/10 shadow-2xl shadow-purple-950/20'
                : 'bg-white/[0.03] backdrop-blur-md border border-white/[0.06]'
            }`}
          >
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                data-cursor="GO"
                className="px-4 py-1.5 rounded-full text-xs font-mono text-neutral-400 hover:text-white hover:bg-white/[0.08] transition-all duration-200"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right Action Bar (Time & Resume Button) */}
          <div className="flex items-center gap-3">
            {/* Live Local Time */}
            <div className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-panel font-mono text-[11px] text-neutral-400">
              <Clock className="w-3.5 h-3.5 text-purple-400" />
              <span>HYD {time}</span>
            </div>

            {/* Resume Button */}
            <a
              href="https://github.com/ayushwasnothere/terminal-portfolio/raw/main/resume.tex"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="PDF"
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 text-white font-mono font-semibold text-xs hover:shadow-lg hover:shadow-purple-500/25 hover:scale-105 transition-all duration-300"
            >
              <span>RESUME</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-xl glass-panel text-white"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[#040508]/95 backdrop-blur-2xl flex flex-col justify-center px-8 md:hidden"
          >
            <div className="space-y-6">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="block w-full text-left font-mono font-bold text-2xl text-white hover:text-purple-400 transition-colors"
                >
                  // {link.label.toUpperCase()}
                </button>
              ))}
            </div>

            <div className="mt-12 pt-6 border-t border-neutral-800 font-mono text-xs text-neutral-400 space-y-2">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-purple-400" />
                <span>HYDERABAD, INDIA ({time})</span>
              </div>
              <div>ayushwasnothere@gmail.com</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
