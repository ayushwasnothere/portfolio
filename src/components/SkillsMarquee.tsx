import React from 'react';
import { motion } from 'framer-motion';
import { Code, Terminal, Cpu, Database, Sparkles } from 'lucide-react';

interface SkillCategory {
  title: string;
  icon: any;
  color: string;
  items: string[];
}

const skillCategories: SkillCategory[] = [
  {
    title: 'Languages',
    icon: Code,
    color: 'text-indigo-400 border-indigo-500/30',
    items: ['TypeScript', 'Rust', 'Go', 'C/C++', 'Python', 'JavaScript', 'Bash', 'Lua'],
  },
  {
    title: 'AI & Robotics',
    icon: Cpu,
    color: 'text-cyan-400 border-cyan-500/30',
    items: ['AI Coding Agents', 'LLM Context Integration', 'ROS 2', 'MoveIt Task Constructor', 'Gazebo Sim', 'Kinematics'],
  },
  {
    title: 'Frameworks & Runtimes',
    icon: Terminal,
    color: 'text-blue-400 border-blue-500/30',
    items: ['React', 'Next.js', 'Tokio (Rust)', 'Actix Web', 'Express', 'Hono', 'Bun', 'WebSockets'],
  },
  {
    title: 'Infrastructure & Tools',
    icon: Database,
    color: 'text-emerald-400 border-emerald-500/30',
    items: ['PostgreSQL', 'Redis', 'Docker', 'AWS (EC2/S3)', 'Cloudflare Workers', 'Nginx', 'Linux', 'Neovim'],
  },
];

const marqueeRow1 = [
  'TypeScript', 'Rust', 'Go', 'C/C++', 'ROS 2', 'MoveIt', 'Tokio', 'React', 'Next.js', 'WebSockets', 'PostgreSQL', 'Redis', 'Docker', 'AWS'
];

const marqueeRow2 = [
  'AI Agents', 'Gazebo', 'Bun', 'Actix Web', 'Hono', 'Cloudflare', 'Nginx', 'Linux', 'Neovim', 'Prisma', 'TailwindCSS', 'Lua', 'Bash'
];

export const SkillsMarquee: React.FC = () => {
  return (
    <section id="skills" className="py-24 relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mb-16">
        
        {/* Section Header */}
        <div className="space-y-3 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel text-xs font-mono text-indigo-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>// TECH SPECTRUM & TOOLS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            TECHNOLOGIES & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-200 to-indigo-400">
              FRAMEWORKS I COMMAND.
            </span>
          </h2>
        </div>

        {/* Skill Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          {skillCategories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="rounded-3xl glass-panel glass-panel-hover p-7 space-y-5 border border-white/10"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-2xl bg-white/5 border ${cat.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-mono font-bold text-lg text-white">{cat.title}</h3>
                </div>

                <div className="flex flex-wrap gap-2.5">
                  {cat.items.map((item) => (
                    <span
                      key={item}
                      data-cursor="TECH"
                      className="px-3.5 py-1.5 rounded-xl font-mono text-xs text-slate-200 glass-pill hover:border-indigo-500/50 hover:text-white transition-all"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Bi-directional Infinite Marquee Section */}
      <div className="space-y-4 py-8 bg-[#06070a]/80 border-y border-white/5 backdrop-blur-md">
        {/* Row 1: Left Marquee */}
        <div className="flex whitespace-nowrap animate-marquee-left font-mono text-sm font-bold text-slate-400">
          {marqueeRow1.map((skill, i) => (
            <div key={i} className="flex items-center gap-8 mx-6">
              <span className="text-indigo-400">✦</span>
              <span className="hover:text-white transition-colors">{skill}</span>
            </div>
          ))}
          {marqueeRow1.map((skill, i) => (
            <div key={`dup1-${i}`} className="flex items-center gap-8 mx-6">
              <span className="text-indigo-400">✦</span>
              <span className="hover:text-white transition-colors">{skill}</span>
            </div>
          ))}
        </div>

        {/* Row 2: Right Marquee */}
        <div className="flex whitespace-nowrap animate-marquee-right font-mono text-sm font-bold text-slate-400">
          {marqueeRow2.map((skill, i) => (
            <div key={i} className="flex items-center gap-8 mx-6">
              <span className="text-cyan-400">✦</span>
              <span className="hover:text-white transition-colors">{skill}</span>
            </div>
          ))}
          {marqueeRow2.map((skill, i) => (
            <div key={`dup2-${i}`} className="flex items-center gap-8 mx-6">
              <span className="text-cyan-400">✦</span>
              <span className="hover:text-white transition-colors">{skill}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
