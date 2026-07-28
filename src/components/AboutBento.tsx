import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Globe, Cpu, Terminal, Zap, Code, ShieldCheck } from 'lucide-react';

export const AboutBento: React.FC = () => {
  const [timeString, setTimeString] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setTimeString(new Intl.DateTimeFormat('en-US', options).format(new Date()));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="about" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="space-y-3 mb-12 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel text-xs font-mono text-indigo-400">
            <span>// ABOUT & PHILOSOPHY</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            CRAFTING HIGH-PERFORMANCE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-200 to-indigo-400">
              SOFTWARE & ROBOTICS.
            </span>
          </h2>
        </div>

        {/* Bento Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Bento Card 1: Bio & Avatar (Spans 7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-7 rounded-3xl glass-panel glass-panel-hover p-8 relative overflow-hidden flex flex-col justify-between"
          >
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img
                    src="/pic.jpg"
                    alt="Ayush Shah"
                    className="w-16 h-16 rounded-2xl object-cover border border-indigo-500/40 shadow-xl shadow-indigo-500/10"
                  />
                  <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-[#090a0f] rounded-full" />
                </div>
                <div>
                  <h3 className="font-mono font-bold text-lg text-white">Ayush Shah</h3>
                  <p className="font-mono text-xs text-indigo-400">Software Engineer @ Roboparadigm</p>
                </div>
              </div>

              <p className="text-slate-300 text-base leading-relaxed">
                I am a passionate <strong className="text-white">Software Engineer</strong> based in Hyderabad, India. I specialize in building autonomous <strong className="text-indigo-300">AI coding agents</strong>, low-latency backend architectures in <strong className="text-cyan-300">Rust & Go</strong>, and high-precision kinematics pipelines for <strong className="text-blue-300">ROS 2 robotic arms</strong>.
              </p>

              <p className="text-slate-400 text-sm leading-relaxed">
                I live and breathe in the terminal — a passionate Linux enthusiast and Neovim power user. My setup is keyboard-driven, my workflow is fast, and my curiosity is relentless.
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-white/10 flex flex-wrap gap-4 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-1.5">
                <Terminal className="w-4 h-4 text-indigo-400" />
                <span>Neovim + Linux</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-cyan-400" />
                <span>ROS 2 / Gazebo</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-emerald-400" />
                <span>
                  Blog:{' '}
                  <a
                    href="https://citxruzz.tech"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-300 hover:underline"
                  >
                    citxruzz.tech
                  </a>
                </span>
              </div>
            </div>
          </motion.div>

          {/* Bento Card 2: Location & Live Time (Spans 5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:col-span-5 rounded-3xl glass-panel glass-panel-hover p-8 relative overflow-hidden flex flex-col justify-between bg-gradient-to-b from-indigo-950/20 via-transparent to-transparent"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono text-indigo-400">
                  <MapPin className="w-4 h-4 text-indigo-400" />
                  <span>LOCATION & TIMEZONE</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  IST (UTC+5:30)
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-extrabold text-white font-mono">HYDERABAD, INDIA</h3>
                <p className="text-xs font-mono text-slate-400 mt-1">17.3850° N, 78.4867° E</p>
              </div>

              {/* Dynamic Live Clock */}
              <div className="p-4 rounded-2xl bg-[#07080d] border border-white/10 font-mono text-center space-y-1">
                <div className="text-xs text-slate-500 uppercase tracking-widest">LOCAL TIME</div>
                <div className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-indigo-400">
                  {timeString || '12:00:00 AM'}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 text-xs font-mono text-slate-400 flex items-center justify-between">
              <span>Keshav Memorial College</span>
              <span className="text-emerald-400">Exp. Grad 2028</span>
            </div>
          </motion.div>

          {/* Bento Card 3: Metrics & Accomplishments (Spans 4 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-4 rounded-3xl glass-panel glass-panel-hover p-6 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="text-xs font-mono text-cyan-400 flex items-center gap-2">
                <Zap className="w-4 h-4" />
                <span>KEY METRICS</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-[#08090e] border border-white/5">
                  <div className="text-3xl font-black font-mono text-white">9+</div>
                  <div className="text-[11px] font-mono text-slate-400 mt-1">Production Projects</div>
                </div>
                <div className="p-4 rounded-2xl bg-[#08090e] border border-white/5">
                  <div className="text-3xl font-black font-mono text-indigo-400">23</div>
                  <div className="text-[11px] font-mono text-slate-400 mt-1">Public GitHub Repos</div>
                </div>
                <div className="p-4 rounded-2xl bg-[#08090e] border border-white/5">
                  <div className="text-3xl font-black font-mono text-blue-400">7DOF</div>
                  <div className="text-[11px] font-mono text-slate-400 mt-1">Robotic MTC Control</div>
                </div>
                <div className="p-4 rounded-2xl bg-[#08090e] border border-white/5">
                  <div className="text-3xl font-black font-mono text-emerald-400">sub-ms</div>
                  <div className="text-[11px] font-mono text-slate-400 mt-1">Go Microservices</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bento Card 4: Technical Spectrum (Spans 8 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="md:col-span-8 rounded-3xl glass-panel glass-panel-hover p-8 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="text-xs font-mono text-indigo-400 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                <span>TECHNICAL DOMAINS</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-[#07080d] border border-white/10 space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                    <Terminal className="w-4 h-4" />
                  </div>
                  <h4 className="font-mono font-bold text-sm text-white">AI Agents & CLI</h4>
                  <p className="text-xs text-slate-400 leading-normal">
                    Terminal-native coding agents, AST parsing, LLM context integration.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#07080d] border border-white/10 space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <h4 className="font-mono font-bold text-sm text-white">ROS 2 & Robotics</h4>
                  <p className="text-xs text-slate-400 leading-normal">
                    MoveIt Task Constructor, Gazebo simulation, kinematics algorithms.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#07080d] border border-white/10 space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <Code className="w-4 h-4" />
                  </div>
                  <h4 className="font-mono font-bold text-sm text-white">Rust & Go Systems</h4>
                  <p className="text-xs text-slate-400 leading-normal">
                    Tokio async SMTP engine, microservices, WebSockets & Redis realtime.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
