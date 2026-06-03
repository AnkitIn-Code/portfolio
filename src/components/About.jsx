import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useCountUp } from '../hooks/useCountUp';
import { Code2, Briefcase, Award, Zap } from 'lucide-react';

export default function About() {
  const containerRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.2 }
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

  const yearsExp = useCountUp(1.5, 1500, isInView);
  const projectsDone = useCountUp(10, 1500, isInView);
  const techsCount = useCountUp(20, 1500, isInView);

  const stats = [
    { value: `${yearsExp}+`, label: 'Month Intern Experience', desc: 'React & Full-stack', icon: Briefcase, color: 'text-brand-green border-brand-green/20 bg-brand-green/5' },
    { value: `${projectsDone}+`, label: 'Projects Completed', desc: 'Full Stack Web App,Spring Boot, APIs', icon: Code2, color: 'text-white border-white/20 bg-white/5' },
    { value: `${techsCount}+`, label: 'Technologies Mastered', desc: 'Languages & frameworks', icon: Award, color: 'text-brand-green border-brand-green/20 bg-brand-green/5' }
  ];

  return (
    <section 
      id="about" 
      ref={containerRef}
      className="py-24 px-6 md:px-12 max-w-7xl mx-auto scroll-mt-10"
    >
      {/* Section Header */}
      <div className="text-center mb-16">
        <h3 className="text-xs font-semibold tracking-widest text-brand-green uppercase mb-2">Get To Know Me</h3>
        <h2 className="text-3xl md:text-5xl font-bold font-display text-white">
          About Me
        </h2>
        <div className="w-16 h-1 bg-gradient-to-r from-white to-brand-green mx-auto mt-4 rounded-full" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Side: Biography text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7 space-y-6 text-left"
        >
          <div className="space-y-4 text-slate-300 leading-relaxed text-base md:text-lg">
            <p>
              I am a <strong className="text-white font-semibold">Computer Science Engineering</strong> student with expertise in Full Stack Web Development, React, Spring Boot, REST APIs, and AI-assisted development workflows.
            </p>
            <p>
              I enjoy building scalable applications, solving complex problems, optimizing user experiences, and transforming ideas into real-world software solutions.
            </p>
            <p>
              With a strong foundation in Data Structures and Algorithms and hands-on experience in frontend and backend development, I continuously strive to learn and create impactful digital products.
            </p>
          </div>

          <div className="flex items-center space-x-3 bg-white/5 border border-white/10 p-4 rounded-xl max-w-lg">
            <div className="p-2 rounded-lg bg-brand-green/20 text-brand-green">
              <Zap size={20} className="animate-bounce" />
            </div>
            <p className="text-xs md:text-sm text-slate-400">
              <strong className="text-white">Currently exploring:</strong>Advanced system design patterns, event-driven microservices, distributed caching, and scalable backend architectures.
            </p>
          </div>
        </motion.div>

        {/* Right Side: Statistics counts */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-5 grid grid-cols-1 gap-6 w-full"
        >
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.03, y: -2 }}
                className={`glass p-6 rounded-2xl border flex items-center space-x-6 relative overflow-hidden group ${stat.color.split(' ')[1]}`}
              >
                {/* Glowing subtle hover layer */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Icon wrapper */}
                <div className={`p-4 rounded-xl border ${stat.color}`}>
                  <Icon size={24} />
                </div>

                {/* Counter text */}
                <div className="text-left">
                  <h4 className="text-3xl md:text-4xl font-extrabold font-display text-white tracking-tight leading-none mb-1">
                    {stat.value}
                  </h4>
                  <p className="text-sm font-semibold text-slate-200">
                    {stat.label}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {stat.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
