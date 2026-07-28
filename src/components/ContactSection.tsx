import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Mail, Globe, Copy, Check, ArrowUp, Send, Code2 } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const email = 'ayushwasnothere@gmail.com';

  const copyToClipboard = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);

    // Blast confetti effect
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#a855f7', '#ec4899', '#06b6d4'],
    });

    setTimeout(() => setCopied(false), 2500);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socials = [
    {
      name: 'GitHub',
      label: 'github.com/ayushwasnothere',
      href: 'https://github.com/ayushwasnothere',
      icon: Code2,
      color: 'hover:border-purple-500/50 hover:shadow-purple-500/20',
    },
    {
      name: 'LinkedIn',
      label: 'linkedin.com/in/ayushwasnothere',
      href: 'https://linkedin.com/in/ayushwasnothere',
      icon: Globe,
      color: 'hover:border-cyan-500/50 hover:shadow-cyan-500/20',
    },
    {
      name: 'Technical Blog',
      label: 'citxruzz.tech',
      href: 'https://citxruzz.tech',
      icon: Globe,
      color: 'hover:border-pink-500/50 hover:shadow-pink-500/20',
    },
  ];

  return (
    <section id="contact" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Main CTA Card */}
        <div className="rounded-3xl glass-panel glass-panel-hover p-8 md:p-16 border border-white/10 relative overflow-hidden text-center space-y-8">
          
          {/* Background Glow Orbs */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel text-xs font-mono text-purple-300">
            <Send className="w-3.5 h-3.5" />
            <span>// LET'S CONNECT & COLLABORATE</span>
          </div>

          {/* Headline */}
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.05]">
            HAVE A PROJECT OR ROLE IN MIND? <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
              LET'S BUILD IT TOGETHER.
            </span>
          </h2>

          <p className="text-neutral-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Whether you want to build autonomous AI agents, develop ROS 2 robotics control systems, scale high-throughput backends in Rust/Go, or discuss engineering roles — my inbox is always open.
          </p>

          {/* Copy Email Button with Confetti */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={copyToClipboard}
              data-cursor="COPY"
              className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 text-white font-mono font-bold text-sm shadow-xl shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-105 transition-all duration-300"
            >
              <Mail className="w-4 h-4" />
              <span>{email}</span>
              {copied ? (
                <Check className="w-4 h-4 text-emerald-300" />
              ) : (
                <Copy className="w-4 h-4 text-neutral-300 group-hover:text-white transition-colors" />
              )}
            </button>
          </div>

          {copied && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-mono text-xs text-emerald-400 font-bold"
            >
              ✓ EMAIL COPIED TO CLIPBOARD!
            </motion.div>
          )}

          {/* Social Links Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-12 border-t border-white/10 text-left">
            {socials.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="OPEN"
                  className={`p-5 rounded-2xl glass-panel glass-panel-hover flex items-center justify-between group border border-white/5 ${social.color}`}
                >
                  <div className="space-y-1">
                    <div className="text-xs font-mono text-neutral-400">{social.name}</div>
                    <div className="text-sm font-mono font-bold text-white group-hover:text-purple-300 transition-colors">
                      {social.label.replace('https://', '')}
                    </div>
                  </div>
                  <Icon className="w-5 h-5 text-neutral-400 group-hover:text-white transition-colors" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-neutral-400">
          <div>
            © {new Date().getFullYear()} Ayush Shah. Built with React, TypeScript, Bun & Tailwind.
          </div>

          <button
            onClick={scrollToTop}
            data-cursor="TOP"
            className="flex items-center gap-2 px-4 py-2 rounded-full glass-panel hover:bg-white/10 text-white transition-all"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </footer>
      </div>
    </section>
  );
};
