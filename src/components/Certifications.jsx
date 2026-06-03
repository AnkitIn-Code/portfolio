import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Award, ShieldCheck, Cpu, Library } from 'lucide-react';

const certifications = [
  {
    title: 'Career Essentials in Cybersecurity',
    issuer: 'Microsoft & LinkedIn',
    icon: ShieldCheck,
    date: '2024',
    accent: 'hover:shadow-green-500/10 hover:border-brand-green/40 text-brand-green bg-brand-green/5'
  },
  {
    title: 'Infosys Springboard Certifications',
    issuer: 'Infosys',
    icon: Cpu,
    date: '2024',
    accent: 'hover:shadow-white/5 hover:border-white/40 text-white bg-white/5'
  },
  {
    title: 'Cybersecurity Training Certification',
    issuer: 'Industry Standard Training',
    icon: Award,
    date: '2024',
    accent: 'hover:shadow-green-500/10 hover:border-brand-green/40 text-brand-green bg-brand-green/5'
  },
  {
    title: 'Coursera Professional Certifications',
    issuer: 'Coursera (Various Universities)',
    icon: Library,
    date: '2023 - 2024',
    accent: 'hover:shadow-white/5 hover:border-white/40 text-white bg-white/5'
  }
];

export default function Certifications() {
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
      id="certifications" 
      ref={containerRef}
      className="py-24 px-6 md:px-12 max-w-7xl mx-auto scroll-mt-10"
    >
      {/* Section Header */}
      <div className="text-center mb-16">
        <h3 className="text-xs font-semibold tracking-widest text-brand-green uppercase mb-2">Qualifications</h3>
        <h2 className="text-3xl md:text-5xl font-bold font-display text-white">
          Certifications
        </h2>
        <div className="w-16 h-1 bg-gradient-to-r from-white to-brand-green mx-auto mt-4 rounded-full" />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {certifications.map((cert, idx) => {
          const Icon = cert.icon;
          const bgStyle = cert.accent.split(' ')[2];
          const textStyle = cert.accent.split(' ')[3];
          
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className={`glass p-6 rounded-2xl border border-white/10 ${cert.accent.split(' ').slice(0, 2).join(' ')} bg-[#030303] transition-all duration-300 flex flex-col justify-between text-left relative overflow-hidden group`}
            >
              {/* Corner certificate ribbon graphic */}
              <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none overflow-hidden">
                <div className="absolute top-[-5px] right-[-25px] w-20 h-5 bg-white/5 border-b border-white/10 rotate-45" />
              </div>

              <div>
                {/* Header Icon */}
                <div className={`w-10 h-10 rounded-xl border border-white/5 bg-white/5 flex items-center justify-center mb-6 group-hover:${bgStyle} group-hover:${textStyle} transition-colors duration-300`}>
                  <Icon size={20} />
                </div>

                <h4 className="text-base font-bold font-display text-white group-hover:text-white leading-snug">
                  {cert.title}
                </h4>
              </div>

              <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">
                  {cert.issuer}
                </span>
                
                <span className="text-[10px] font-semibold text-slate-500">
                  {cert.date}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
