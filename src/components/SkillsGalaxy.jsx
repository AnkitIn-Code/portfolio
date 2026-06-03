import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Layout, Server, Database, Wrench, Shield, CheckCircle2, Star, Sparkles } from 'lucide-react';

const categories = [
  { id: 'frontend', name: 'Frontend', icon: Layout },
  { id: 'backend', name: 'Backend', icon: Server },
  { id: 'database', name: 'Database', icon: Database },
  { id: 'tools', name: 'Tools & Env', icon: Wrench },
  { id: 'core', name: 'Core Skills', icon: Sparkles }
];

const skillsData = [
  // Frontend
  { name: 'React', cat: 'frontend', score: 85, level: 'Expert', icon: Cpu, desc: 'Component architecture, Hooks, Context API, state management, and performance tuning.' },
  { name: 'JavaScript', cat: 'frontend', score: 70, level: 'Expert', icon: Cpu, desc: 'ES6+ standards, asynchronous paradigms, closures, event loop, and DOM APIs.' },
  { name: 'Tailwind CSS', cat: 'frontend', score: 95, level: 'Expert', icon: Layout, desc: 'Utility-first styling systems, mobile-first responsive layouts, and custom configurations.' },
  { name: 'HTML & CSS', cat: 'frontend', score: 90, level: 'Advanced', icon: Layout, desc: 'Semantic layouts, accessibility standards, keyframe animations, and grid systems.' },

  // Backend
  { name: 'Spring Boot', cat: 'backend', score: 82, level: 'Advanced', icon: Server, desc: 'Building secure microservices, REST controllers, JPA repository integration, and MVC logic.' },
  { name: 'Java', cat: 'backend', score: 86, level: 'Advanced', icon: Server, desc: 'Object-oriented structures, collections, streams API, and runtime logic.' },
  { name: 'REST APIs', cat: 'backend', score: 88, level: 'Advanced', icon: Server, desc: 'API endpoint modeling, secure headers, CORS configurations, and payload routing.' },

  // Database
  { name: 'SQL', cat: 'database', score: 80, level: 'Advanced', icon: Database, desc: 'Relational database schema modeling, query optimization, joints, and indexes.' },

  // Tools
  { name: 'Git', cat: 'tools', score: 88, level: 'Advanced', icon: Wrench, desc: 'Local repository version controls, commits history, and branch management.' },
  { name: 'GitHub', cat: 'tools', score: 88, level: 'Advanced', icon: Wrench, desc: 'Remote collaboration, branch isolation, PR logic, actions, and code reviews.' },
  { name: 'Linux', cat: 'tools', score: 75, level: 'Proficient', icon: Wrench, desc: 'Shell interactions, terminal workflows, file system management, and commands.' },
  { name: 'VS Code', cat: 'tools', score: 90, level: 'Expert', icon: Wrench, desc: 'IDE configurations, debugging tools, extensions management, and workspace tuning.' },

  // Core
  { name: 'Data Structures & Algorithms', cat: 'core', score: 85, level: 'Advanced', icon: Shield, desc: 'Problem-solving, array layouts, trees, graphs, sorting, searching, and runtime optimizations.' },
  { name: 'Full Stack Dev', cat: 'core', score: 88, level: 'Advanced', icon: Shield, desc: 'Connecting front-end React clients to back-end Spring Boot servers seamlessly.' },
  { name: 'Responsive Design', cat: 'core', score: 92, level: 'Expert', icon: Shield, desc: 'Crafting UI layouts that scale perfectly across mobile, tablet, and desktop viewports.' },
  { name: 'Web Performance Optimization', cat: 'core', score: 84, level: 'Advanced', icon: Shield, desc: 'Optimizing bundle sizes, code splitting, asset caching, and page load speeds.' },
  { name: 'AI Assisted Development', cat: 'core', score: 95, level: 'Expert', icon: Shield, desc: 'Utilizing AI copilots, prompts, and review systems for accelerated coding workflows.' }
];

export default function SkillsGalaxy() {
  const [activeCat, setActiveCat] = useState('frontend');

  const filteredSkills = skillsData.filter((s) => s.cat === activeCat);

  return (
    <section id="skills" className="py-24 px-6 md:px-12 max-w-7xl mx-auto scroll-mt-10">
      {/* Section Header */}
      <div className="text-center mb-16">
        <h3 className="text-xs font-semibold tracking-widest text-brand-green uppercase mb-2">Technical Core</h3>
        <h2 className="text-3xl md:text-5xl font-bold font-display text-white">
          Skills & Expertise
        </h2>
        <div className="w-16 h-1 bg-gradient-to-r from-white to-brand-green mx-auto mt-4 rounded-full" />
        <p className="text-slate-400 text-sm md:text-base mt-4 max-w-md mx-auto">
          Explore my technical capabilities, languages, frameworks, and core methodologies.
        </p>
      </div>

      {/* Category Selection Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-16 max-w-4xl mx-auto">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCat === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCat(cat.id)}
              className={`px-5 py-3 rounded-xl text-xs md:text-sm font-semibold flex items-center space-x-2.5 border transition-all duration-300 cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-white to-brand-green text-slate-950 border-transparent shadow-lg shadow-green-500/10 scale-105'
                  : 'glass border-white/10 text-slate-300 hover:border-brand-green/30 hover:text-white'
              }`}
            >
              <Icon size={14} />
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto items-stretch">
        {filteredSkills.map((skill, idx) => {
          const SkillIcon = skill.icon;
          return (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              whileHover={{ y: -4 }}
              className="glass p-6 md:p-8 rounded-2xl border border-white/10 hover:border-brand-green/30 hover:shadow-[0_0_20px_rgba(0,255,102,0.08)] bg-[#030303] transition-all duration-300 flex flex-col justify-between text-left group relative"
            >
              <div>
                {/* Card Top: Icon and Proficiency Label */}
                <div className="flex justify-between items-center mb-6">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-slate-400 group-hover:text-brand-green group-hover:bg-brand-green/5 group-hover:border-brand-green/20 transition-all duration-300">
                    <SkillIcon size={18} />
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-md bg-white/5 text-slate-300 border border-white/10 flex items-center space-x-1">
                    <Star size={10} className="text-brand-green fill-current" />
                    <span>{skill.level}</span>
                  </span>
                </div>

                {/* Skill Name */}
                <h4 className="text-lg font-bold font-display text-white leading-none">
                  {skill.name}
                </h4>

                {/* Progress bar line */}
                <div className="mt-4 space-y-1.5">
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                    <span>Proficiency</span>
                    <span className="text-slate-300">{skill.score}%</span>
                  </div>
                  <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.score}%` }}
                      transition={{ duration: 0.8, delay: 0.1 }}
                      className="h-full bg-gradient-to-r from-white to-brand-green rounded-full"
                    />
                  </div>
                </div>
              </div>

              {/* Description info */}
              <p className="text-xs text-slate-400 leading-relaxed mt-6 border-t border-white/5 pt-4">
                {skill.desc}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
