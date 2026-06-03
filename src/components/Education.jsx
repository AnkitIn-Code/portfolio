import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Landmark, BookOpen } from 'lucide-react';

const educationData = [
  {
    degree: 'Bachelor of Engineering in Computer Science',
    institution: 'Chandigarh University',
    location: 'Chandigarh, India',
    score: 'CGPA: 8.26/10',
    duration: '2022 - 2026',
    accent: 'border-brand-green shadow-green-500/5 text-brand-green bg-brand-green/5'
  },
  {
    degree: 'Senior Secondary Education (Class XII)',
    institution: 'St Xavier\'s School',
    location: 'India',
    score: 'Percentage: 87.46%',
    duration: '2020 - 2022',
    accent: 'border-white shadow-white/5 text-white bg-white/5'
  },
  {
    degree: 'Matriculation Education (Class X)',
    institution: 'St Xavier\'s School',
    location: 'India',
    score: 'Percentage: 81.00%',
    duration: '2018 - 2020',
    accent: 'border-brand-green shadow-green-500/5 text-brand-green bg-brand-green/5'
  }
];

export default function Education() {
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
      id="education" 
      ref={containerRef}
      className="py-24 px-6 md:px-12 max-w-7xl mx-auto scroll-mt-10"
    >
      {/* Section Header */}
      <div className="text-center mb-16">
        <h3 className="text-xs font-semibold tracking-widest text-brand-green uppercase mb-2">Academic Foundation</h3>
        <h2 className="text-3xl md:text-5xl font-bold font-display text-white">
          Education History
        </h2>
        <div className="w-16 h-1 bg-gradient-to-r from-white to-brand-green mx-auto mt-4 rounded-full" />
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {educationData.map((edu, idx) => {
          const borderStyle = edu.accent.split(' ')[0];
          const shadowStyle = edu.accent.split(' ')[1];
          const textStyle = edu.accent.split(' ')[2];
          const bgStyle = edu.accent.split(' ')[3];
          
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className={`glass p-6 md:p-8 rounded-2xl border border-white/10 hover:${borderStyle} hover:${shadowStyle} transition-all duration-300 flex flex-col items-start text-left relative overflow-hidden bg-[#030303] group`}
            >
              {/* Backglow element */}
              <div className={`absolute top-0 right-0 w-24 h-24 rounded-full bg-gradient-to-br from-white/0 to-white/5 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              
              {/* Cap Icon wrapper */}
              <div className={`p-3 rounded-xl border border-white/5 mb-6 flex items-center justify-center bg-white/5 group-hover:${bgStyle} group-hover:${textStyle} transition-colors duration-300`}>
                <GraduationCap size={24} />
              </div>

              {/* Title & info */}
              <span className="text-xs font-bold text-slate-400 font-display uppercase tracking-widest">
                {edu.duration}
              </span>
              <h4 className="text-lg md:text-xl font-bold font-display text-white mt-2 group-hover:text-white leading-snug">
                {edu.degree}
              </h4>
              
              {/* Institution Row */}
              <div className="flex items-center space-x-2 text-slate-300 mt-3 text-sm">
                <Landmark size={14} className="text-slate-400" />
                <span className="font-medium">{edu.institution}</span>
              </div>

              <div className="mt-6 pt-5 border-t border-white/10 w-full flex items-center justify-between mt-auto">
                <span className="text-[11px] font-semibold text-slate-400 tracking-wider flex items-center space-x-1 uppercase">
                  <BookOpen size={12} />
                  <span>{edu.location}</span>
                </span>
                
                {/* Score badge */}
                <span className={`px-2.5 py-1 rounded-lg text-xs font-bold tracking-wider ${bgStyle} ${textStyle}`}>
                  {edu.score}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
