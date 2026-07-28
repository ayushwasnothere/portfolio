import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, ChevronRight, Cpu } from 'lucide-react';

export const ExperienceTimeline: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const experienceDetails = [
    {
      title: 'ROS 2 & MoveIt Control Algorithms',
      description:
        'Engineered and simulated advanced motion planning algorithms for 7DOF and OpenManipulator-X robotic arms using ROS 2 and MoveIt Task Constructor (MTC).',
    },
    {
      title: 'Path Planning & Kinematics Optimization',
      description:
        'Optimized kinematics, collision avoidance, and trajectory execution pipelines in Gazebo simulations, significantly improving path generation accuracy for automated pick-and-place tasks.',
    },
    {
      title: 'Sensor Integration & Real-time Feedback',
      description:
        'Integrated real-time sensor feedback loops with ROS 2 nodes to enhance spatial manipulation and automated target detection capabilities.',
    },
  ];

  return (
    <section id="experience" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="space-y-3 mb-16 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel text-xs font-mono text-indigo-400">
            <Briefcase className="w-3.5 h-3.5" />
            <span>// EXPERIENCE & INDUSTRY</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            WHERE I HAVE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-200 to-indigo-400">
              BUILT & INNOVATED.
            </span>
          </h2>
        </div>

        {/* Timeline Container */}
        <div className="relative pl-6 md:pl-10 border-l-2 border-indigo-500/30 space-y-12">
          
          {/* Timeline Node 1: Roboparadigm */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative group"
          >
            {/* Glowing Node Dot */}
            <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-6 h-6 rounded-full bg-[#08090d] border-2 border-indigo-500 flex items-center justify-center shadow-lg shadow-indigo-500/40">
              <div className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
            </div>

            <div className="rounded-3xl glass-panel glass-panel-hover p-8 border border-white/10 space-y-6">
              
              {/* Header Info */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 mb-1">
                    <Cpu className="w-4 h-4" />
                    <span>ROBOTICS & DEEP TECH</span>
                  </div>
                  <h3 className="text-2xl font-extrabold font-mono text-white">
                    Robotics / Systems Software Intern
                  </h3>
                  <div className="text-lg font-mono text-indigo-300 mt-0.5">
                    Roboparadigm
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                    <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                    <span>2025 — PRESENT</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                    <span>HYDERABAD, INDIA</span>
                  </div>
                </div>
              </div>

              {/* Interactive Tabs */}
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {experienceDetails.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveTab(idx)}
                      data-cursor="SELECT"
                      className={`px-4 py-2 rounded-xl text-xs font-mono transition-all ${
                        activeTab === idx
                          ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 font-bold'
                          : 'text-slate-400 hover:text-white bg-white/5'
                      }`}
                    >
                      0{idx + 1}. {item.title.split(' ')[0]}
                    </button>
                  ))}
                </div>

                <div className="p-5 rounded-2xl bg-[#06070a] border border-white/10 space-y-2">
                  <h4 className="font-mono font-bold text-sm text-white flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-indigo-400" />
                    <span>{experienceDetails[activeTab].title}</span>
                  </h4>
                  <p className="text-slate-300 text-sm leading-relaxed pl-6">
                    {experienceDetails[activeTab].description}
                  </p>
                </div>
              </div>

              {/* Tech Badges */}
              <div className="flex flex-wrap gap-2 pt-2">
                {['ROS 2', 'MoveIt Task Constructor', 'C++', 'Gazebo', 'Docker', 'Kinematics'].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-full text-xs font-mono glass-pill text-slate-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
