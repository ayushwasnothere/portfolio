import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Terminal as TerminalIcon, Sparkles, Code2, Cpu, Bot, ShieldCheck } from 'lucide-react';

export const Hero: React.FC = () => {
  const [terminalText, setTerminalText] = useState('');
  const fullCommand = 'forge init --agent="Autonomous Developer" --target="Robotics & Web Systems"';

  // Typing effect for the simulated terminal line
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullCommand.length) {
        setTerminalText(fullCommand.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 45);

    return () => clearInterval(interval);
  }, []);

  const techBadges = [
    { label: 'AI Agents', icon: Bot, color: 'from-purple-500/20 to-purple-500/5 text-purple-300 border-purple-500/30' },
    { label: 'ROS 2 & MoveIt', icon: Cpu, color: 'from-cyan-500/20 to-cyan-500/5 text-cyan-300 border-cyan-500/30' },
    { label: 'Rust & Tokio', icon: ShieldCheck, color: 'from-pink-500/20 to-pink-500/5 text-pink-300 border-pink-500/30' },
    { label: 'Go Systems', icon: Code2, color: 'from-amber-500/20 to-amber-500/5 text-amber-300 border-amber-500/30' },
  ];

  return (
    <section id="hero" className="relative min-h-screen pt-28 pb-16 flex flex-col justify-between overflow-hidden">
      {/* Dynamic Glowing Mesh Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/15 rounded-full blur-[140px] pointer-events-none animate-pulse-slow" />
      <div className="absolute top-1/3 right-[-10%] w-[500px] h-[500px] bg-pink-600/15 rounded-full blur-[140px] pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-10 left-[-5%] w-[450px] h-[450px] bg-cyan-600/15 rounded-full blur-[120px] pointer-events-none animate-pulse-slow" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 w-full relative z-10 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Text Content */}
          <div className="lg:col-span-7 space-y-8 text-left">
            
            {/* Top Eyebrow Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border-purple-500/30 text-xs font-mono text-purple-300"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-spin" />
              <span>SOFTWARE ENGINEER @ ROBOPARADIGM</span>
            </motion.div>

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="space-y-2"
            >
              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-[1.05]">
                ENGINEERING <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
                  AUTONOMOUS AGENTS
                </span> <br />
                & SYSTEMS.
              </h1>
            </motion.div>

            {/* Subtitle / Bio */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-neutral-400 text-base sm:text-lg max-w-2xl leading-relaxed"
            >
              I build terminal-native AI coding tools, high-throughput backend services in <strong className="text-white">Rust & Go</strong>, and precision control algorithms for <strong className="text-white">ROS 2 robotics arms</strong>.
            </motion.p>

            {/* Tech Badges Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-wrap gap-2.5"
            >
              {techBadges.map((badge, i) => {
                const Icon = badge.icon;
                return (
                  <div
                    key={i}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-r ${badge.color} border text-xs font-mono font-medium shadow-sm`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{badge.label}</span>
                  </div>
                );
              })}
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                }}
                data-cursor="EXPLORE"
                className="group relative inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 text-white font-mono font-bold text-sm shadow-xl shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-105 transition-all duration-300"
              >
                <span>EXPLORE PROJECTS</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#about"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                }}
                data-cursor="ABOUT"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full glass-panel glass-panel-hover font-mono text-sm text-neutral-300 hover:text-white"
              >
                <span>ABOUT ME</span>
              </a>
            </motion.div>
          </div>

          {/* Right Column: Interactive Simulated Terminal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="lg:col-span-5"
          >
            <div className="rounded-2xl glass-panel border border-white/10 overflow-hidden shadow-2xl shadow-purple-950/40">
              
              {/* Terminal Window Header */}
              <div className="bg-[#0b0c12] px-4 py-3 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="flex items-center gap-1.5 text-xs font-mono text-neutral-400">
                  <TerminalIcon className="w-3.5 h-3.5 text-purple-400" />
                  <span>forge-agent ~ zsh</span>
                </div>
                <div className="w-12" />
              </div>

              {/* Terminal Body */}
              <div className="p-5 font-mono text-xs space-y-3 bg-[#06070a]/90 text-neutral-300 min-h-[320px] flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="text-neutral-500">// Initialize Forge Terminal AI Agent</div>
                  <div className="flex items-center gap-2 text-purple-400">
                    <span>$</span>
                    <span className="text-emerald-400">{terminalText}</span>
                    <span className="w-2 h-4 bg-purple-400 animate-pulse" />
                  </div>

                  {terminalText.length > 20 && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="pt-2 space-y-1.5 text-neutral-400"
                    >
                      <div className="text-cyan-400">✓ Context loaded: 23 repositories parsed</div>
                      <div className="text-emerald-400">✓ ROS 2 MoveIt 7DOF pipeline: ACTIVE</div>
                      <div className="text-pink-400">✓ Tokio Async Mail Engine: READY</div>
                      <div className="text-amber-400">✓ WebSockets Realtime Engine: ONLINE</div>
                    </motion.div>
                  )}
                </div>

                {/* Simulated Live System Output Pill */}
                <div className="pt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-neutral-500">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>AGENT STATUS: ACTIVE</span>
                  </div>
                  <span>LATENCY: 12ms</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Infinite Tech Marquee Ticker */}
      <div className="mt-16 py-4 border-y border-white/5 bg-[#06070a]/60 backdrop-blur-md overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee-left font-mono text-xs font-semibold text-neutral-400 tracking-wider">
          {['TYPESCRIPT', 'RUST', 'GO', 'C++', 'ROS 2', 'MOVEIT', 'TOKIO', 'NEXT.JS', 'WEBSOCKETS', 'POSTGRESQL', 'REDIS', 'DOCKER', 'AWS', 'GAZEBO'].map((item, idx) => (
            <div key={idx} className="flex items-center gap-8 mx-6">
              <span className="text-purple-400">✦</span>
              <span className="hover:text-white transition-colors">{item}</span>
            </div>
          ))}
          {['TYPESCRIPT', 'RUST', 'GO', 'C++', 'ROS 2', 'MOVEIT', 'TOKIO', 'NEXT.JS', 'WEBSOCKETS', 'POSTGRESQL', 'REDIS', 'DOCKER', 'AWS', 'GAZEBO'].map((item, idx) => (
            <div key={`dup-${idx}`} className="flex items-center gap-8 mx-6">
              <span className="text-purple-400">✦</span>
              <span className="hover:text-white transition-colors">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
