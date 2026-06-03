import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Briefcase, ChevronRight } from 'lucide-react';

const experiences = [
  {
    role: 'Frontend Developer Intern',
    company: 'Edu Revamp Infotech Private Limited',
    period: 'May 2025 - July 2025',
    location: 'Noida, India',
    responsibilities: [
      'Developed a feature-rich To-Do web application using React for task management.',
      'Implemented secure user authentication workflows and protected routes.',
      'Designed highly responsive user interfaces ensuring consistency across device screens.',
      'Utilized React Hooks (useState, useEffect, useContext, useMemo) and modern React architecture.'
    ]
  }
];

export default function Experience() {
  const sectionRef = useRef(null);
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
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      id="experience" 
      ref={sectionRef}
      className="py-24 px-6 md:px-12 max-w-7xl mx-auto scroll-mt-10"
    >
      {/* Section Header */}
      <div className="text-center mb-16">
        <h3 className="text-xs font-semibold tracking-widest text-brand-green uppercase mb-2">Professional Path</h3>
        <h2 className="text-3xl md:text-5xl font-bold font-display text-white">
          Work Experience
        </h2>
        <div className="w-16 h-1 bg-gradient-to-r from-white to-brand-green mx-auto mt-4 rounded-full" />
      </div>

      <div className="relative max-w-3xl mx-auto mt-12">
        {/* Central timeline line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-white via-brand-green to-brand-green/10 -translate-x-1/2 pointer-events-none" />

        {/* Milestone Node */}
        {experiences.map((exp, idx) => {
          return (
            <div key={idx} className="relative mb-12 flex flex-col md:flex-row items-stretch">
              
              {/* Timeline Center Point Icon */}
              <div className="absolute left-4 md:left-1/2 w-8 h-8 rounded-full bg-slate-900 border-2 border-brand-green shadow-[0_0_15px_rgba(0,255,102,0.4)] flex items-center justify-center -translate-x-1/2 z-10 top-0">
                <Briefcase size={14} className="text-brand-green" />
              </div>

              {/* Left Column (Empty on Desktop, holds timeline info on Mobile) */}
              <div className="hidden md:flex md:w-1/2 pr-12 justify-end items-start text-right">
                <motion.div 
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: idx * 0.2 }}
                  className="space-y-1.5"
                >
                  <span className="inline-flex items-center space-x-1 text-brand-green text-xs font-bold uppercase tracking-wider bg-brand-green/10 px-3 py-1 rounded-full border border-brand-green/20">
                    <Calendar size={12} />
                    <span>{exp.period}</span>
                  </span>
                  <p className="text-sm font-semibold text-slate-400 font-display mt-2">{exp.location}</p>
                </motion.div>
              </div>

              {/* Right Column: Card content */}
              <div className="w-full md:w-1/2 pl-12 md:pl-12 text-left">
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: idx * 0.2 }}
                  className="glass p-6 md:p-8 rounded-2xl border border-white/10 hover:border-brand-green/30 shadow-xl transition-all duration-300 relative group bg-[#030303]"
                >
                  {/* Glowing hover backdrop */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-brand-green/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />

                  {/* Header Mobile Info */}
                  <div className="md:hidden flex items-center justify-between mb-4">
                    <span className="inline-flex items-center space-x-1 text-brand-green text-[10px] font-bold uppercase tracking-wider bg-brand-green/10 px-2 py-0.5 rounded-full border border-brand-green/20">
                      <Calendar size={10} />
                      <span>{exp.period}</span>
                    </span>
                    <span className="text-[10px] font-semibold text-slate-400">{exp.location}</span>
                  </div>

                  <h4 className="text-xl md:text-2xl font-bold text-white font-display leading-tight">
                    {exp.role}
                  </h4>
                  <h5 className="text-sm font-semibold text-brand-green-light mt-1">
                    {exp.company}
                  </h5>

                  {/* Responsibilities bullet checklist */}
                  <ul className="mt-6 space-y-3.5">
                    {exp.responsibilities.map((resp, bIdx) => (
                      <li key={bIdx} className="flex items-start text-sm text-slate-300 leading-relaxed">
                        <ChevronRight size={16} className="text-brand-green mr-2 mt-1 shrink-0" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>

            </div>
          );
        })}

        {/* Milestone Cap End (End marker for Timeline path) */}
        <div className="relative flex justify-center items-center">
          <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-slate-800 border border-white/10 -translate-x-1/2 z-10" />
        </div>
      </div>
    </section>
  );
}
