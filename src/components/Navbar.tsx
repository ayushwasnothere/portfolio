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
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 via-blue-500 to-cyan-500 p-[1px] shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-300">
                <div className="w-full h-full bg-[#08090e] rounded-[11px] flex items-center justify-center font-mono font-black text-xs text-white">
                  AS
                </div>
              </div>
              <span className="font-mono font-bold text-xs tracking-tight text-white hidden sm:inline-block">
                AYUSH <span className="text-indigo-400">SHAH</span>
              </span>
            </a>

            {/* Live Status Pill */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel text-[11px] font-mono text-slate-300 border-emerald-500/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>AVAILABLE FOR WORK</span>
            </div>
          </div>

          {/* Floating Navigation Menu Pill */}
          <nav
            className={`hidden md:flex items-center gap-1 px-3 py-1.5 rounded-full transition-all duration-300 ${
              scrolled
                ? 'bg-[#090a0f]/90 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/60'
                : 'bg-white/[0.03] backdrop-blur-md border border-white/[0.06]'
            }`}
          >
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                data-cursor="GO"
                className="px-3.5 py-1 rounded-full text-xs font-mono text-slate-400 hover:text-white hover:bg-white/[0.08] transition-all duration-200"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right Action Bar (Time & Resume Button) */}
          <div className="flex items-center gap-3">
            {/* Live Local Time */}
            <div className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-panel font-mono text-[11px] text-slate-400">
              <Clock className="w-3.5 h-3.5 text-indigo-400" />
              <span>HYD {time}</span>
            </div>

            {/* Resume Button */}
            <a
              href="https://github.com/ayushwasnothere/terminal-portfolio/raw/main/resume.tex"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="PDF"
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-slate-950 font-mono font-semibold text-xs hover:bg-slate-200 hover:scale-105 transition-all duration-300 shadow-md shadow-white/10"
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
            className="fixed inset-0 z-40 bg-[#06070a]/95 backdrop-blur-2xl flex flex-col justify-center px-8 md:hidden"
          >
            <div className="space-y-6">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="block w-full text-left font-mono font-bold text-2xl text-white hover:text-indigo-400 transition-colors"
                >
                  // {link.label.toUpperCase()}
                </button>
              ))}
            </div>

            <div className="mt-12 pt-6 border-t border-slate-800 font-mono text-xs text-slate-400 space-y-2">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-indigo-400" />
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
