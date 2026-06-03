import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useCountUp } from '../hooks/useCountUp';
import { Cpu, Terminal, Target, Trophy } from 'lucide-react';

const achievementsList = [
  {
    title: 'Full Stack Developer',
    targetNumber: 100,
    suffix: '%',
    label: 'Deployment & Integration Rate',
    desc: 'Seamless integration of React frontend client interfaces with Java Spring Boot backend services.',
    icon: Terminal,
    accent: 'text-brand-green border-brand-green/20 shadow-green-500/5'
  },
  {
    title: 'AI Project Builder',
    targetNumber: 4,
    suffix: '+',
    label: 'AI & LLM API Systems Built',
    desc: 'Integrating NLP, LLM, and Machine Learning models to build intelligent systems like Resume Analyzers.',
    icon: Cpu,
    accent: 'text-white border-white/20 shadow-white/5'
  },
  {
    title: 'Strong DSA Foundation',
    targetNumber: 350,
    suffix: '+',
    label: 'Data Structures Problems Solved',
    desc: 'Deep analytical understanding of arrays, dynamic programming, search patterns, trees, and logic grids.',
    icon: Trophy,
    accent: 'text-brand-green border-brand-green/20 shadow-green-500/5'
  },
  {
    title: 'Problem Solver',
    targetNumber: 15,
    suffix: '+',
    label: 'Hackathons & Active Labs',
    desc: 'Quickly learning and applying new tools, APIs, and micro-configurations to solve technical challenges.',
    icon: Target,
    accent: 'text-white border-white/20 shadow-white/5'
  }
];

export default function Achievements() {
  const containerRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <section 
      id="achievements" 
      ref={containerRef}
      className="py-24 px-6 md:px-12 max-w-7xl mx-auto scroll-mt-10 bg-slate-950/20 rounded-[40px] border border-white/5"
    >
      {/* Section Header */}
      <div className="text-center mb-16">
        <h3 className="text-xs font-semibold tracking-widest text-brand-green uppercase mb-2">Track Record</h3>
        <h2 className="text-3xl md:text-5xl font-bold font-display text-white">
          Achievements & Stats
        </h2>
        <div className="w-16 h-1 bg-gradient-to-r from-white to-brand-green mx-auto mt-4 rounded-full" />
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {achievementsList.map((ach, idx) => {
          const count = useCountUp(ach.targetNumber, 1500, isInView);
          const Icon = ach.icon;
          const borderStyle = ach.accent.split(' ')[1];
          const shadowStyle = ach.accent.split(' ')[2];
          
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className={`glass p-6 rounded-2xl border border-white/10 hover:${borderStyle} hover:${shadowStyle} bg-[#030303] transition-all duration-300 text-left flex flex-col justify-between h-full group`}
            >
              <div>
                {/* Icon row */}
                <div className="flex justify-between items-start">
                  <div className={`p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-400 group-hover:text-white transition-colors duration-300`}>
                    <Icon size={20} />
                  </div>
                  
                  {/* Glowing small badge */}
                  <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500">
                    Verified
                  </span>
                </div>

                {/* Big number counter */}
                <h4 className="text-4xl font-extrabold font-display text-white mt-6 tracking-tight">
                  {count}
                  <span className="text-brand-green">{ach.suffix}</span>
                </h4>
                
                {/* Metric label */}
                <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wide mt-2">
                  {ach.title}
                </h5>
                <p className="text-[11px] font-semibold text-brand-green tracking-wider mt-0.5">
                  {ach.label}
                </p>
              </div>

              {/* Description paragraph */}
              <p className="text-xs text-slate-400 leading-relaxed mt-4 border-t border-white/5 pt-4">
                {ach.desc}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
