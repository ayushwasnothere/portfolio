import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Terminal, Cpu, Mail, MessageSquare, Sparkles, Code2 } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  category: 'AI & CLI' | 'Robotics' | 'Systems & Rust' | 'Web Apps';
  tagline: string;
  description: string;
  stack: string[];
  repoLink: string;
  liveLink?: string;
  accent: string;
  badgeText: string;
  previewType: 'terminal' | 'robotics' | 'cloud' | 'mail' | 'chat' | 'link' | 'chess' | 'extension';
}

const projectsData: Project[] = [
  {
    id: 'forge',
    name: 'Forge',
    category: 'AI & CLI',
    tagline: 'AI Terminal Coding Agent',
    description: 'An autonomous CLI AI agent capable of multi-file code editing, AST context building, shell execution, and pair programming directly inside your terminal window.',
    stack: ['TypeScript', 'Node.js', 'LLMs', 'CLI', 'TailwindCSS'],
    repoLink: 'https://github.com/ayushwasnothere/forge',
    liveLink: 'https://forge.citxruzz.tech',
    accent: '#a855f7',
    badgeText: 'FEATURED AI AGENT',
    previewType: 'terminal',
  },
  {
    id: '7dof_mtc',
    name: '7DOF MTC Arm Control',
    category: 'Robotics',
    tagline: 'ROS 2 MoveIt Robotic Arm Pipeline',
    description: 'MoveIt Task Constructor (MTC) package for 7-degree-of-freedom robotic arms, featuring multi-stage trajectory planning, collision avoidance, and containerized ROS 2 Gazebo simulations.',
    stack: ['C++', 'ROS 2', 'MoveIt', 'Robotics', 'Docker'],
    repoLink: 'https://github.com/ayushwasnothere/7dof_mtc',
    accent: '#06b6d4',
    badgeText: 'ROS 2 ROBOTICS',
    previewType: 'robotics',
  },
  {
    id: 'cloud-it',
    name: 'Cloud-It',
    category: 'Systems & Rust',
    tagline: 'Cloud Infrastructure Automation Framework',
    description: 'TypeScript infrastructure deployment utility and automation framework for managing cloud workloads, container orchestration, and serverless infrastructure on AWS.',
    stack: ['TypeScript', 'Node.js', 'AWS', 'Docker', 'DevOps'],
    repoLink: 'https://github.com/ayushwasnothere/cloud-it',
    accent: '#f97316',
    badgeText: 'DEVOPS & CLOUD',
    previewType: 'cloud',
  },
  {
    id: 'rust-smtp',
    name: 'rust-smtp & TempMail',
    category: 'Systems & Rust',
    tagline: 'Async Rust SMTP Engine & Disposable Mail',
    description: 'High-performance asynchronous SMTP server written in Rust with Tokio for raw MIME mail parsing. Powers TempMail — a disposable real-time inbox platform.',
    stack: ['Rust', 'Tokio', 'Bun', 'PostgreSQL', 'React', 'Nginx'],
    repoLink: 'https://github.com/ayushwasnothere/rust-smtp',
    liveLink: 'https://tmail.citxruzz.tech',
    accent: '#ec4899',
    badgeText: 'RUST SYSTEMS',
    previewType: 'mail',
  },
  {
    id: 'raven',
    name: 'Raven',
    category: 'Web Apps',
    tagline: 'Real-Time High-Concurrency Chat Platform',
    description: 'Scalable messaging platform combining WebSockets for instant message delivery with Redis pub/sub channels for sub-100ms multi-instance data updates.',
    stack: ['Next.js', 'TypeScript', 'WebSockets', 'Redis', 'PostgreSQL', 'Prisma'],
    repoLink: 'https://github.com/ayushwasnothere/chat-app',
    liveLink: 'https://raven.citxruzz.tech',
    accent: '#10b981',
    badgeText: 'REALTIME WEBSOCKETS',
    previewType: 'chat',
  },
  {
    id: 'shrty',
    name: 'shrty',
    category: 'Systems & Rust',
    tagline: 'Low-Latency Go Link Shortener',
    description: 'Microsecond-latency URL shortening microservice using Go and optimized PostgreSQL indexing, protected against bot abuse with Cloudflare Turnstile.',
    stack: ['Go', 'PostgreSQL', 'React', 'Vite', 'Cloudflare Turnstile'],
    repoLink: 'https://github.com/ayushwasnothere/shrty',
    liveLink: 'https://shrty.citxruzz.tech',
    accent: '#eab308',
    badgeText: 'GO MICROSERVICE',
    previewType: 'link',
  },
  {
    id: 'ts-chess',
    name: 'TS-Chess',
    category: 'Web Apps',
    tagline: 'Multiplayer Web Chess & Stockfish AI',
    description: 'Full-featured web chess engine built with TypeScript & React, offering local play, online multiplayer over WebSockets, and Stockfish AI integration.',
    stack: ['React', 'TypeScript', 'WebSockets', 'Stockfish.js', 'TailwindCSS'],
    repoLink: 'https://github.com/ayushwasnothere/ts-chess',
    liveLink: 'https://chess.citxruzz.tech',
    accent: '#8b5cf6',
    badgeText: 'GAME ENGINE',
    previewType: 'chess',
  },
  {
    id: 'pwmgr',
    name: 'Pwmgr',
    category: 'Web Apps',
    tagline: 'Client-Side Encrypted Password Extension',
    description: 'Bitwarden-like Chrome password manager extension featuring client-side encryption, zero-knowledge architecture, and local vault storage.',
    stack: ['React', 'TypeScript', 'Chrome API', 'LocalStorage'],
    repoLink: 'https://github.com/ayushwasnothere/pwmgr',
    accent: '#14b8a6',
    badgeText: 'SECURITY EXTENSION',
    previewType: 'extension',
  },
];

export const ProjectsShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('All');

  const categories = ['All', 'AI & CLI', 'Robotics', 'Systems & Rust', 'Web Apps'];

  const filteredProjects = activeTab === 'All'
    ? projectsData
    : projectsData.filter((p) => p.category === activeTab);

  return (
    <section id="projects" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel text-xs font-mono text-cyan-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>// SELECTED WORKS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              FEATURED <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
                ENGINEERING PROJECTS.
              </span>
            </h2>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl glass-panel self-start md:self-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                data-cursor="FILTER"
                className={`px-4 py-2 rounded-xl text-xs font-mono transition-all duration-300 ${
                  activeTab === cat
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold shadow-lg shadow-purple-500/20'
                    : 'text-neutral-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group relative rounded-3xl glass-panel glass-panel-hover p-7 flex flex-col justify-between overflow-hidden border border-white/10"
              >
                {/* Accent Highlight Bar on Top */}
                <div
                  className="absolute top-0 left-0 right-0 h-1 opacity-80 group-hover:opacity-100 transition-opacity"
                  style={{ backgroundColor: project.accent }}
                />

                <div className="space-y-6">
                  {/* Top Bar: Badge & Links */}
                  <div className="flex items-center justify-between">
                    <span
                      className="px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase border"
                      style={{
                        backgroundColor: `${project.accent}15`,
                        color: project.accent,
                        borderColor: `${project.accent}40`,
                      }}
                    >
                      {project.badgeText}
                    </span>

                    <div className="flex items-center gap-2">
                      <a
                        href={project.repoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor="GIT"
                        className="p-2 rounded-xl glass-panel hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
                        title="View GitHub Repository"
                      >
                        <Code2 className="w-4 h-4" />
                      </a>
                      {project.liveLink && (
                        <a
                          href={project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-cursor="LIVE"
                          className="p-2 rounded-xl glass-panel hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
                          title="Open Live Demo"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Project Title & Tagline */}
                  <div>
                    <h3 className="text-2xl font-bold font-mono text-white group-hover:text-purple-300 transition-colors">
                      {project.name}
                    </h3>
                    <p className="text-xs font-mono text-neutral-400 mt-1">{project.tagline}</p>
                  </div>

                  {/* Description */}
                  <p className="text-neutral-300 text-sm leading-relaxed">{project.description}</p>

                  {/* Interactive Visual Preview Mockup Box */}
                  <div className="rounded-2xl bg-[#06070a] border border-white/10 p-4 font-mono text-xs overflow-hidden">
                    {project.previewType === 'terminal' && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-1.5 text-neutral-500 text-[11px] pb-2 border-b border-white/5">
                          <Terminal className="w-3.5 h-3.5 text-purple-400" />
                          <span>forge-agent exec --multi-file</span>
                        </div>
                        <div className="text-purple-300">❯ Analyzing workspace files...</div>
                        <div className="text-emerald-400">✓ 4 modifications applied cleanly</div>
                      </div>
                    )}

                    {project.previewType === 'robotics' && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-[11px] text-cyan-400 pb-2 border-b border-white/5">
                          <span className="flex items-center gap-1.5">
                            <Cpu className="w-3.5 h-3.5" />
                            <span>MOVEIT TASK CONSTRUCTOR</span>
                          </span>
                          <span className="text-emerald-400">STATUS: GAZEBO SIM</span>
                        </div>
                        <div className="text-neutral-400 text-[11px]">
                          Joint 1..7 trajectories calculated | Collision check: PASS
                        </div>
                      </div>
                    )}

                    {project.previewType === 'mail' && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-[11px] text-pink-400 pb-2 border-b border-white/5">
                          <span className="flex items-center gap-1.5">
                            <Mail className="w-3.5 h-3.5" />
                            <span>TOKIO SMTP SERVER</span>
                          </span>
                          <span className="text-white font-bold">PORT 25 / SSL</span>
                        </div>
                        <div className="text-neutral-400 text-[11px]">
                          Asynchronous MIME stream processing... 100% Rust
                        </div>
                      </div>
                    )}

                    {project.previewType === 'chat' && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-[11px] text-emerald-400 pb-2 border-b border-white/5">
                          <span className="flex items-center gap-1.5">
                            <MessageSquare className="w-3.5 h-3.5" />
                            <span>WEBSOCKETS + REDIS</span>
                          </span>
                          <span className="text-neutral-400">&lt;10ms LATENCY</span>
                        </div>
                        <div className="text-neutral-300 text-[11px]">
                          Raven WebSocket connected. Real-time pub/sub ready.
                        </div>
                      </div>
                    )}

                    {['cloud', 'link', 'chess', 'extension'].includes(project.previewType) && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-[11px] text-amber-400 pb-2 border-b border-white/5">
                          <span className="flex items-center gap-1.5">
                            <Code2 className="w-3.5 h-3.5" />
                            <span>SYSTEM ENGINE</span>
                          </span>
                          <span className="text-emerald-400 font-bold">OPTIMIZED</span>
                        </div>
                        <div className="text-neutral-400 text-[11px]">
                          High-throughput backend architecture active.
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom Tech Pills */}
                <div className="pt-6 mt-6 border-t border-white/10 flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-lg text-[11px] font-mono glass-pill text-neutral-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
